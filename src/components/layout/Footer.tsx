import { Facebook, Instagram, Youtube, Clock } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white text-mindstory-gray-text border-t border-gray-200">
      <div className="container-custom mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-mindstory-lime">Company Info</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>회사명:</strong> 위즈포레 사회서비스센터<br />
                <strong>대표:</strong> 홍길동<br />
                <strong>개인정보담당자:</strong> 홍길동<br />
                <strong>사업자등록번호:</strong> 123-45-67890<br />
                <strong>전화번호:</strong> 051-123-4567, 010-1234-5678<br />
                <strong>팩스:</strong> 051-123-4568<br />
                <strong>주소:</strong> 부산시 ...<br />
                <strong>이메일:</strong> info@wizfore.com<br />
                <strong>계좌번호:</strong> 농협 123-456-789012 위즈포레사회서비스센터
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-mindstory-lime">Working Hour (예약제)</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>월: 낮 12시 ~ 저녁 7시</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>화~금: 오전 10시 ~ 저녁 8시</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>토: 오전 10시 ~ 오후 4시</span>
              </div>
              <p className="mt-4 font-semibold text-mindstory-lime">
                예약 시 야간 및 휴일 상담 가능
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-mindstory-gray-text">소셜 미디어</h4>
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-mindstory-blue hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-mindstory-pink hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form - 마인드스토리 스타일 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-mindstory-lime">Contact Us</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="이름"
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-mindstory-gray-text placeholder-gray-500 focus:border-mindstory-lime focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  placeholder="연락처"
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-mindstory-gray-text placeholder-gray-500 focus:border-mindstory-lime focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="연령대"
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-mindstory-gray-text placeholder-gray-500 focus:border-mindstory-lime focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <select className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-mindstory-gray-text focus:border-mindstory-lime focus:outline-none transition-colors">
                  <option value="">통화가능시간 선택▼</option>
                  <option value="now">지금바로</option>
                  <option value="10">10시</option>
                  <option value="10:30">10시30분</option>
                  <option value="11">11시</option>
                  <option value="11:30">11시30분</option>
                  <option value="12">12시</option>
                  <option value="12:30">12시30분</option>
                  <option value="13">13시</option>
                  <option value="13:30">13시30분</option>
                  <option value="14">14시</option>
                  <option value="14:30">14시30분</option>
                  <option value="15">15시</option>
                  <option value="15:30">15시30분</option>
                  <option value="16">16시</option>
                  <option value="16:30">16시30분</option>
                  <option value="17">17시</option>
                  <option value="17:30">17시30분</option>
                  <option value="18">18시</option>
                  <option value="18:30">18시30분</option>
                  <option value="19">19시</option>
                  <option value="19:30">19시30분</option>
                  <option value="20">20시</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-mindstory-lime text-white py-3 rounded-lg font-semibold hover:bg-mindstory-lime-dark transition-colors"
              >
                상담 신청하기
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section - 마인드스토리 스타일 */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              © COPYRIGHT {currentYear} WIZFORE. ALL RIGHTS RESERVED.
            </p>
            <p className="text-lg font-semibold text-mindstory-lime">
              예약상담 문의전화 051-123-4567, 010-1234-5678
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
