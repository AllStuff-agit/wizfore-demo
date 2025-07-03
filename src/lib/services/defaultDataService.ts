import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  query, 
  limit,
  writeBatch,
  getDoc
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { defaultSiteData } from '@/lib/data/defaultSiteData'
import type { DefaultSiteData } from '@/types'

type ProgramType = {
  title: string
  goal?: string
  order?: number
}

type CategoryType = {
  id: string
  title: string
  description: string
  order?: number
  programs?: ProgramType[]
}

type InquiryCategory = {
  value: string
  label: string
  order: number
}

/**
 * Firebase 컬렉션에 데이터가 존재하는지 확인
 */
export async function checkCollectionExists(collectionName: string): Promise<boolean> {
  try {
    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, limit(1))
    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error(`Error checking collection ${collectionName}:`, error)
    return false
  }
}

/**
 * 카테고리의 모든 관련 컬렉션에 데이터가 존재하는지 확인
 */
export async function checkCategoryDataExists(categoryId: string): Promise<boolean> {
  const categoryCollections = getCategoryCollections(categoryId)
  
  try {
    const results = await Promise.all(
      categoryCollections.map(collectionName => checkCollectionExists(collectionName))
    )
    
    // 하나라도 데이터가 있으면 true 반환
    return results.some(exists => exists)
  } catch (error) {
    console.error(`Error checking category ${categoryId}:`, error)
    return false
  }
}

/**
 * 카테고리별 관련 컬렉션 목록 반환
 */
function getCategoryCollections(categoryId: string): string[] {
  switch (categoryId) {
    case 'site-info':
      return ['siteInfo']
    case 'about-info':
      return ['aboutInfo']
    case 'programs':
      return ['programs']
    case 'team':
      return ['team']
    case 'community':
      return ['community']
    case 'home-config':
      return ['homeConfig']
    case 'site-assets':
      return ['siteAssets']
    default:
      return []
  }
}

/**
 * 사이트 기본 정보 데이터 추가
 */
async function addSiteInfoData() {
  const { siteInfo } = defaultSiteData
  
  // 통합된 사이트 정보 데이터 추가
  await setDoc(doc(db, 'siteInfo', 'main'), {
    ...siteInfo,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

/**
 * 센터 소개 데이터 추가
 */
async function addAboutInfoData() {
  const { aboutInfo } = defaultSiteData
  
  // 통합된 센터 소개 데이터 추가
  await setDoc(doc(db, 'aboutInfo', 'main'), {
    ...aboutInfo,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

/**
 * 프로그램 데이터 추가
 */
async function addProgramsData() {
  const { programs } = defaultSiteData
  
  // 통합된 프로그램 데이터 추가 (defaultImageUrl 포함)
  await setDoc(doc(db, 'programs', 'main'), {
    categories: programs,
    defaultImageUrl: '/images/programs/defaultImage.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

/**
 * 팀(직원) 데이터 추가
 */
async function addTeamData() {
  const { team } = defaultSiteData
  
  // 통합된 팀 데이터 추가
  await setDoc(doc(db, 'team', 'main'), {
    categories: team,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

/**
 * 커뮤니티 데이터 추가
 */
async function addCommunityData() {
  const { community } = defaultSiteData
  
  // 통합된 커뮤니티 데이터 추가
  await setDoc(doc(db, 'community', 'main'), {
    ...community,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

/**
 * 홈 설정 데이터 추가
 */
async function addHomeConfigData() {
  const { homeConfig } = defaultSiteData
  
  // 홈 설정 데이터 추가
  await setDoc(doc(db, 'homeConfig', 'main'), {
    ...homeConfig,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

/**
 * 사이트 에셋 데이터 추가
 */
async function addSiteAssetsData() {
  const { siteAssets } = defaultSiteData
  
  // 사이트 에셋 데이터 추가
  await setDoc(doc(db, 'siteAssets', 'main'), {
    assets: siteAssets,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

/**
 * 카테고리별 기본 데이터 추가 메인 함수
 */
export async function addDefaultDataByCategory(categoryId: string): Promise<void> {
  try {
    console.log(`Adding default data for category: ${categoryId}`)
    
    switch (categoryId) {
      case 'site-info':
        await addSiteInfoData()
        break
      case 'about-info':
        await addAboutInfoData()
        break
      case 'programs':
        await addProgramsData()
        break
      case 'team':
        await addTeamData()
        break
      case 'community':
        await addCommunityData()
        break
      case 'home-config':
        await addHomeConfigData()
        break
      case 'site-assets':
        await addSiteAssetsData()
        break
      default:
        throw new Error(`Unknown category: ${categoryId}`)
    }
    
    console.log(`Successfully added default data for category: ${categoryId}`)
  } catch (error) {
    console.error(`Error adding default data for category ${categoryId}:`, error)
    throw error
  }
}

/**
 * 모든 카테고리의 데이터 존재 여부 확인
 */
export async function checkAllCategoriesDataStatus(): Promise<Record<string, boolean>> {
  const categories = ['site-info', 'about-info', 'programs', 'team', 'community', 'home-config', 'site-assets']
  const results: Record<string, boolean> = {}
  
  for (const categoryId of categories) {
    results[categoryId] = await checkCategoryDataExists(categoryId)
  }
  
  return results
}

/**
 * 컬렉션의 모든 문서 삭제
 */
async function deleteCollection(collectionName: string): Promise<void> {
  const collectionRef = collection(db, collectionName)
  const snapshot = await getDocs(collectionRef)
  
  if (snapshot.empty) return
  
  const batch = writeBatch(db)
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref)
  })
  
  await batch.commit()
  console.log(`Deleted all documents from ${collectionName}`)
}

/**
 * 특정 카테고리의 모든 데이터 삭제
 */
export async function deleteCategoryData(categoryId: string): Promise<void> {
  try {
    console.log(`Deleting data for category: ${categoryId}`)
    const collections = getCategoryCollections(categoryId)
    
    for (const collectionName of collections) {
      await deleteCollection(collectionName)
    }
    
    console.log(`Successfully deleted data for category: ${categoryId}`)
  } catch (error) {
    console.error(`Error deleting data for category ${categoryId}:`, error)
    throw error
  }
}

/**
 * 모든 기본 데이터 삭제
 */
export async function deleteAllDefaultData(): Promise<void> {
  try {
    console.log('Starting to delete all default data')
    
    const allCollections = [
      'siteInfo', 'aboutInfo', 'programs', 'team', 'community', 'homeConfig', 'siteAssets'
    ]
    
    // 배치 처리로 성능 향상
    const batchPromises = allCollections.map(collectionName => deleteCollection(collectionName))
    await Promise.all(batchPromises)
    
    console.log('Successfully deleted all default data')
  } catch (error) {
    console.error('Error deleting all default data:', error)
    throw error
  }
}

/**
 * 모든 기본 데이터 추가
 */
export async function addAllDefaultData(onProgress?: (completed: number, total: number, current: string) => void): Promise<void> {
  try {
    console.log('Starting to add all default data')
    
    const categories = [
      { id: 'site-info', name: '사이트 기본 정보' },
      { id: 'about-info', name: '센터 소개' },
      { id: 'programs', name: '프로그램 정보' },
      { id: 'team', name: '전문가 정보' },
      { id: 'community', name: '커뮤니티' },
      { id: 'home-config', name: '홈페이지 설정' },
      { id: 'site-assets', name: '사이트 에셋' }
    ]
    
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      
      if (onProgress) {
        onProgress(i, categories.length, category.name)
      }
      
      await addDefaultDataByCategory(category.id)
    }
    
    if (onProgress) {
      onProgress(categories.length, categories.length, '완료')
    }
    
    console.log('Successfully added all default data')
  } catch (error) {
    console.error('Error adding all default data:', error)
    throw error
  }
}

/**
 * 사이트 기본 정보 조회
 */
export async function getSiteInfo() {
  try {
    const docRef = doc(db, 'siteInfo', 'main')
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      throw new Error('Site info not found in database')
    }
  } catch (error) {
    console.error('Error fetching site info:', error)
    throw error
  }
}

/**
 * 센터 소개 정보 조회
 */
export async function getAboutInfo() {
  try {
    const docRef = doc(db, 'aboutInfo', 'main')
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      throw new Error('About info not found in database')
    }
  } catch (error) {
    console.error('Error fetching about info:', error)
    throw error
  }
}

/**
 * AboutSection용 기본 사이트 데이터 조회 (사이트명 + 원장 정보)
 */
export async function getAboutSectionData(): Promise<{
  siteName: string
  director: DefaultSiteData['aboutInfo']['director']
}> {
  try {
    const [siteInfo, aboutInfo] = await Promise.all([
      getSiteInfo().catch(() => defaultSiteData.siteInfo),
      getAboutInfo().catch(() => defaultSiteData.aboutInfo)
    ])
    
    return {
      siteName: siteInfo.name || defaultSiteData.siteInfo.name,
      director: aboutInfo.director || defaultSiteData.aboutInfo.director
    }
  } catch (error) {
    console.error('Error fetching AboutSection data:', error)
    return {
      siteName: defaultSiteData.siteInfo.name,
      director: defaultSiteData.aboutInfo.director
    }
  }
}

/**
 * 프로그램 정보 조회
 */
export async function getPrograms() {
  try {
    const docRef = doc(db, 'programs', 'main')
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      return data.categories || defaultSiteData.programs
    } else {
      console.warn('Programs not found, returning default data')
      return defaultSiteData.programs
    }
  } catch (error) {
    console.error('Error fetching programs:', error)
    return defaultSiteData.programs
  }
}

/**
 * ProgramGrid용 모든 프로그램 데이터 조회 (모든 카테고리의 프로그램들을 플랫화)
 */
export async function getAllProgramsFlattened() {
  try {
    const categories = await getPrograms()
    const allPrograms: Array<{
      title: string
      description: string
      categoryTitle: string
      categoryId: string
      order: number
    }> = []

    categories.forEach((category: CategoryType) => {
      if (category.programs && category.programs.length > 0) {
        category.programs.forEach((program: ProgramType) => {
          allPrograms.push({
            title: program.title,
            description: program.goal || category.description,
            categoryTitle: category.title,
            categoryId: category.id,
            order: program.order || 0
          })
        })
      }
    })

    // 카테고리 순서, 그 다음 프로그램 순서로 정렬
    return allPrograms.sort((a, b) => {
      const categoryA = categories.find((c: CategoryType) => c.id === a.categoryId)
      const categoryB = categories.find((c: CategoryType) => c.id === b.categoryId)
      
      if (categoryA?.order !== categoryB?.order) {
        return (categoryA?.order || 0) - (categoryB?.order || 0)
      }
      
      return a.order - b.order
    })
  } catch (error) {
    console.error('Error fetching flattened programs:', error)
    return []
  }
}

/**
 * 자문위원 정보 조회
 */
export async function getAdvisors() {
  try {
    const aboutInfo = await getAboutInfo()
    return aboutInfo.advisors?.list || defaultSiteData.aboutInfo.advisors.list
  } catch (error) {
    console.error('Error fetching advisors:', error)
    return defaultSiteData.aboutInfo.advisors.list
  }
}

/**
 * 자문위원 소개 메시지 조회
 */
export async function getAdvisorsAboutMessage() {
  try {
    const aboutInfo = await getAboutInfo()
    return aboutInfo.advisors?.aboutMessage || defaultSiteData.aboutInfo.advisors.aboutMessage
  } catch (error) {
    console.error('Error fetching advisors about message:', error)
    return defaultSiteData.aboutInfo.advisors.aboutMessage
  }
}

/**
 * 자문위원 히어로 메시지 조회
 */
export async function getAdvisorsHeroMessage() {
  try {
    const aboutInfo = await getAboutInfo()
    return aboutInfo.advisors?.heroMessage || defaultSiteData.aboutInfo.advisors.heroMessage
  } catch (error) {
    console.error('Error fetching advisors hero message:', error)
    return defaultSiteData.aboutInfo.advisors.heroMessage
  }
}

/**
 * 히스토리 히어로 메시지 조회
 */
export async function getHistoryHeroMessage() {
  try {
    const aboutInfo = await getAboutInfo()
    return aboutInfo.history?.heroMessage || defaultSiteData.aboutInfo.history.heroMessage
  } catch (error) {
    console.error('Error fetching history hero message:', error)
    return defaultSiteData.aboutInfo.history.heroMessage
  }
}

/**
 * 위치 히어로 메시지 조회
 */
export async function getLocationHeroMessage() {
  try {
    const aboutInfo = await getAboutInfo()
    return aboutInfo.location?.heroMessage || defaultSiteData.aboutInfo.location.heroMessage
  } catch (error) {
    console.error('Error fetching location hero message:', error)
    return defaultSiteData.aboutInfo.location.heroMessage
  }
}

/**
 * 문의 히어로 메시지 조회
 */
export async function getInquiryHeroMessage() {
  try {
    const aboutInfo = await getAboutInfo()
    return aboutInfo.inquiry?.heroMessage || defaultSiteData.aboutInfo.inquiry.heroMessage
  } catch (error) {
    console.error('Error fetching inquiry hero message:', error)
    return defaultSiteData.aboutInfo.inquiry.heroMessage
  }
}

/**
 * 문의 소개 메시지 조회
 */
export async function getInquiryAboutMessage() {
  try {
    const aboutInfo = await getAboutInfo()
    return aboutInfo.inquiry?.aboutMessage || defaultSiteData.aboutInfo.inquiry.aboutMessage
  } catch (error) {
    console.error('Error fetching inquiry about message:', error)
    return defaultSiteData.aboutInfo.inquiry.aboutMessage
  }
}

/**
 * 문의 카테고리 조회
 */
export async function getInquiryCategories(): Promise<InquiryCategory[]> {
  try {
    const aboutInfo = await getAboutInfo()
    const categories = aboutInfo.inquiry?.categories || defaultSiteData.aboutInfo.inquiry.categories
    // 타입 안전성을 위해 명시적으로 타입 체크
    const validCategories = Array.isArray(categories) ? categories : defaultSiteData.aboutInfo.inquiry.categories
    // 타입 가드를 통한 안전한 정렬
    const typedCategories = validCategories.filter((item): item is InquiryCategory => 
      typeof item === 'object' && 
      item !== null && 
      'value' in item && 
      'label' in item && 
      'order' in item &&
      typeof item.order === 'number'
    )
    return typedCategories.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Error fetching inquiry categories:', error)
    return defaultSiteData.aboutInfo.inquiry.categories.sort((a, b) => a.order - b.order)
  }
}

/**
 * 팀(직원) 정보 조회
 */
export async function getTeam() {
  try {
    const docRef = doc(db, 'team', 'main')
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      return data.categories || defaultSiteData.team
    } else {
      console.warn('Team data not found, returning default data')
      return defaultSiteData.team
    }
  } catch (error) {
    console.error('Error fetching team data:', error)
    return defaultSiteData.team
  }
}

/**
 * 커뮤니티 정보 조회
 */
export async function getCommunity() {
  try {
    const docRef = doc(db, 'community', 'main')
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.warn('Community data not found, returning default data')
      return defaultSiteData.community
    }
  } catch (error) {
    console.error('Error fetching community data:', error)
    return defaultSiteData.community
  }
}

/**
 * 홈 설정 정보 조회
 */
export async function getHomeConfig() {
  try {
    const docRef = doc(db, 'homeConfig', 'main')
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.warn('Home config not found, returning default data')
      return defaultSiteData.homeConfig
    }
  } catch (error) {
    console.error('Error fetching home config:', error)
    return defaultSiteData.homeConfig
  }
}

/**
 * History 페이지용 데이터 조회 (DB에서만)
 */
export async function getHistoryData() {
  try {
    const aboutInfoData = await getAboutInfo()
    const siteInfoData = await getSiteInfo()
    
    return {
      milestones: aboutInfoData.history?.milestones || [],
      siteName: siteInfoData.name || ''
    }
  } catch (error) {
    console.error('Error fetching history data:', error)
    throw error
  }
}

/**
 * Location 페이지용 데이터 조회 (DB에서만)
 */
export async function getLocationData() {
  try {
    const [aboutInfoData, siteInfoData] = await Promise.all([
      getAboutInfo(),
      getSiteInfo()
    ])
    
    return {
      contact: siteInfoData.contact,
      transportation: aboutInfoData.location?.transportation || [],
      siteName: siteInfoData.name,
      address: aboutInfoData.address,
      coordinates: aboutInfoData.coordinates
    }
  } catch (error) {
    console.error('Error fetching location data:', error)
    throw error
  }
}