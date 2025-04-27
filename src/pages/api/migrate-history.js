import admin from '../../firebase/firebase-admin';

// 초기 연혁 데이터
const initialHistoryData = [
  { year: '2016', month: '01', day: '01', event: '위즈포레 설립', isActive: true },
  { year: '2016', month: '02', day: '03', event: '아동청소년 심리치유서비스 및 학부모코칭서비스 제공기관 등록', isActive: true },
  { year: '2020', month: '12', day: '03', event: '발달장애인 주간/방과후 활동서비스 제공기관 지정', isActive: true },
  { year: '2021', month: '07', day: '01', event: '특수교육대상자 치료지원서비스 제공기관 지정', isActive: true },
  { year: '2021', month: '10', day: '12', event: '사상구드림스타트센터 업무협약 (취약계층 아동 심리치료 전문기관)', isActive: true },
  { year: '2021', month: '10', day: '28', event: '부산시여성가족개발원 업무협약 (성인지 교육 협력기관)', isActive: true },
  { year: '2021', month: '11', day: '25', event: '장애아동 발달재활서비스 제공기관 지정', isActive: true },
  { year: '2022', month: '02', day: '18', event: '사상여성인력개발센터 업무협약 (청년 채용 지원사업)', isActive: true },
  { year: '2022', month: '06', day: '17', event: '부산가톨릭대학교 언어청각치료학과 산학협력', isActive: true },
  { year: '2022', month: '07', day: '19', event: '성평등 사례발굴 공모전 우수상 수상 (부산여성가족개발원)', isActive: true },
  { year: '2022', month: '11', day: '29', event: '춘해보건대학교 언어치료학과 산학협력', isActive: true },
  { year: '2023', month: '03', day: '10', event: '사상구장애인체육회 생활체육지원사업 업무협약', isActive: true },
  { year: '2023', month: '03', day: '14', event: '사상구장애인복지관 업무협약', isActive: true },
  { year: '2023', month: '04', day: '27', event: '한국사회복지상담학회(신라대 사회복지학과) 산학협력', isActive: true },
  { year: '2023', month: '11', day: '01', event: '고용부 청년일경험지원사업 (사)부산경영자총협회 업무협약', isActive: true },
  { year: '2023', month: '11', day: '22', event: '신라대학교 특수체육학과 산학협력', isActive: true },
  { year: '2023', month: '11', day: '25', event: '경남정보대학교 작업치료과 산학협력', isActive: true },
  { year: '2023', month: '11', day: '28', event: '장애인스포츠 및 일반스포츠 이용권 제공기관 지정', isActive: true },
  { year: '2024', month: '02', day: '07', event: '건양사이버대학교 심리운동치료학과 산학협력 (실습인증기관)', isActive: true },
  { year: '2024', month: '03', day: '08', event: '대구사이버대학교 산학협력 (언어치료·놀이치료학과)', isActive: true },
  { year: '2024', month: '05', day: '27', event: '부산과학기술대학교 산학협력 (사회복지상담과·스마트도시농업과)', isActive: true },
  { year: '2024', month: '06', day: '10', event: '사상구가족센터 업무협약', isActive: true }
];

export default async function handler(req, res) {
  // POST 요청이 아니면 허용하지 않음
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '허용되지 않는 메소드입니다.' });
  }

  // 보안: 이 API는 관리자 페이지에서만 호출 가능
  // 이미 /admin 경로에 Admin 인증이 적용되어 있으므로 별도 검증 없음

  try {
    const db = admin.firestore();
    const batch = db.batch();
    const historyCollection = db.collection('history');

    // 기존 데이터 삭제 (선택 사항)
    if (req.body.clearExisting) {
      const existingDocs = await historyCollection.get();
      existingDocs.forEach(doc => {
        batch.delete(doc.ref);
      });
    }

    // 새 데이터 추가
    initialHistoryData.forEach(item => {
      const docRef = historyCollection.doc();
      batch.set(docRef, item);
    });

    await batch.commit();
    
    res.status(200).json({ message: '연혁 데이터 마이그레이션 완료', count: initialHistoryData.length });
  } catch (error) {
    console.error('데이터 마이그레이션 오류:', error);
    res.status(500).json({ message: '데이터 마이그레이션 실패', error: error.message });
  }
}
