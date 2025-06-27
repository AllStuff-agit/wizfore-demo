'use client'

import { motion } from 'framer-motion'
import { defaultSiteData } from '@/lib/data/defaultSiteData'
import { MapPin, Phone, Mail, Clock, Car, Train, Bus } from 'lucide-react'

export default function LocationPage() {
  const { siteInfo } = defaultSiteData
  const { contact } = siteInfo

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section 
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('/images/hero/defaultHero.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            오시는길
          </motion.h1>
          <motion.p 
            className="text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            위즈포레 사회서비스센터 위치 및 교통 안내
          </motion.p>
        </div>
      </section>

      {/* 지도 섹션 */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-wizfore-text-primary mb-4">
              센터 위치
            </h2>
            <p className="text-wizfore-text-secondary">
              부산광역시 사상구에 위치하고 있습니다
            </p>
          </motion.div>

          {/* 지도 영역 - 실제 구현시 카카오맵이나 구글맵 API 사용 */}
          <motion.div 
            className="bg-gray-200 h-96 rounded-lg flex items-center justify-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center text-gray-600">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">지도 API 연동 영역</p>
              <p className="text-sm">카카오맵 또는 구글맵 삽입 예정</p>
            </div>
          </motion.div>

          {/* 주소 정보 */}
          <motion.div 
            className="bg-wizfore-warm-brown/5 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-wizfore-warm-brown mr-2" />
              <h3 className="text-xl font-semibold text-wizfore-text-primary">주소</h3>
            </div>
            <p className="text-wizfore-text-secondary leading-relaxed">
              {contact.address}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 연락처 정보 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-wizfore-text-primary mb-4">
              연락처 정보
            </h2>
            <p className="text-wizfore-text-secondary">
              문의사항이 있으시면 언제든지 연락 주세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* 전화번호 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Phone className="w-12 h-12 text-wizfore-warm-brown mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-wizfore-text-primary mb-2">전화번호</h3>
              <p className="text-wizfore-text-secondary">{contact.phone}</p>
            </motion.div>

            {/* 팩스 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Phone className="w-12 h-12 text-wizfore-warm-brown mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-wizfore-text-primary mb-2">팩스</h3>
              <p className="text-wizfore-text-secondary">{contact.fax}</p>
            </motion.div>

            {/* 이메일 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Mail className="w-12 h-12 text-wizfore-warm-brown mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-wizfore-text-primary mb-2">이메일</h3>
              <p className="text-wizfore-text-secondary">{contact.email}</p>
            </motion.div>

            {/* 운영시간 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Clock className="w-12 h-12 text-wizfore-warm-brown mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-wizfore-text-primary mb-2">운영시간</h3>
              <div className="text-wizfore-text-secondary text-sm space-y-1">
                <p>평일: {contact.operatingHours.weekday}</p>
                <p>주말: {contact.operatingHours.weekend}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 교통편 안내 섹션 */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-wizfore-text-primary mb-4">
              교통편 안내
            </h2>
            <p className="text-wizfore-text-secondary">
              대중교통을 이용하여 편리하게 방문하실 수 있습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {contact.transportation.map((transport, index) => (
              <motion.div
                key={transport.type}
                className="bg-gray-50 p-8 rounded-lg"
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  {transport.type === '지하철' ? (
                    <Train className="w-8 h-8 text-wizfore-warm-brown mr-3" />
                  ) : (
                    <Bus className="w-8 h-8 text-wizfore-warm-brown mr-3" />
                  )}
                  <h3 className="text-xl font-semibold text-wizfore-text-primary">
                    {transport.type}
                  </h3>
                </div>
                <p className="text-wizfore-text-secondary leading-relaxed">
                  {transport.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* 주차 안내 */}
          <motion.div 
            className="bg-wizfore-warm-brown/5 p-8 rounded-lg text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-4">
              <Car className="w-8 h-8 text-wizfore-warm-brown mr-3" />
              <h3 className="text-xl font-semibold text-wizfore-text-primary">
                주차 안내
              </h3>
            </div>
            <p className="text-wizfore-text-secondary leading-relaxed">
              {contact.parking}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 추가 정보 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-wizfore-text-primary mb-6 text-center">
                방문 시 참고사항
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-wizfore-text-secondary">
                <div>
                  <h4 className="font-medium text-wizfore-text-primary mb-2">위치</h4>
                  <p>홈플러스 위 광명한의원 4층에 위치하고 있어 찾기 쉽습니다.</p>
                </div>
                <div>
                  <h4 className="font-medium text-wizfore-text-primary mb-2">접근성</h4>
                  <p>모라역에서 도보 5분 거리로 대중교통 이용이 편리합니다.</p>
                </div>
                <div>
                  <h4 className="font-medium text-wizfore-text-primary mb-2">주차</h4>
                  <p>센터 입구 도로공용주차장과 홈플러스 주차장을 이용하실 수 있습니다.</p>
                </div>
                <div>
                  <h4 className="font-medium text-wizfore-text-primary mb-2">문의</h4>
                  <p>방문 전 미리 연락주시면 더욱 정확한 안내를 받으실 수 있습니다.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}