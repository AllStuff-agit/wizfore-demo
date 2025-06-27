'use client'

import { motion } from 'framer-motion'
import { defaultSiteData } from '@/lib/data/defaultSiteData'
import { Play, Youtube, MessageCircle, Share2, Heart } from 'lucide-react'

export default function SNSPage() {
  const snsLinks = defaultSiteData.community.snsLinks
  
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
            SNS
          </motion.h1>
          <motion.p 
            className="text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            위즈포레의 생생한 활동 모습을 영상으로 만나보세요
          </motion.p>
        </div>
      </section>

      {/* 개요 섹션 */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-wizfore-text-primary mb-6">
              위즈포레와 함께하는 일상
            </h2>
            <p className="text-lg text-wizfore-text-secondary leading-relaxed">
              위즈포레 사회서비스센터의 다양한 프로그램 활동과 일상을 영상으로 확인하실 수 있습니다. 
              치료 프로그램, 방과후 활동, 성인 주간활동 등 센터에서 이루어지는 
              의미 있는 순간들을 함께 나누고 소통해보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* YouTube 섹션 */}
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
              위즈포레 YouTube
            </h2>
            <p className="text-wizfore-text-secondary">
              센터의 생생한 활동 모습을 영상으로 만나보세요
            </p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* YouTube 비디오 임베드 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative aspect-video">
                <iframe
                  src={snsLinks.youtube}
                  title="위즈포레 소개 영상"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              
              {/* 비디오 정보 */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-wizfore-text-primary mb-2">
                      위즈포레 사회서비스센터 소개
                    </h3>
                    <p className="text-wizfore-text-secondary mb-4">
                      위즈포레에서 제공하는 다양한 치료 프로그램과 서비스를 소개하는 영상입니다. 
                      센터의 시설과 전문가들, 그리고 이용자들의 모습을 통해 
                      위즈포레가 추구하는 가치를 확인해보세요.
                    </p>
                  </div>
                </div>
                
                {/* 영상 액션 버튼들 */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-wizfore-text-secondary hover:text-wizfore-warm-brown transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">좋아요</span>
                  </button>
                  <button className="flex items-center gap-2 text-wizfore-text-secondary hover:text-wizfore-warm-brown transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">댓글</span>
                  </button>
                  <button className="flex items-center gap-2 text-wizfore-text-secondary hover:text-wizfore-warm-brown transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">공유</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 소통 참여 섹션 */}
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
              함께 소통해요
            </h2>
            <p className="text-wizfore-text-secondary">
              위즈포레의 다양한 활동에 참여하고 소통해보세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "프로그램 참여 후기",
                description: "치료 프로그램이나 방과후 활동에 참여한 후기와 경험을 공유해주세요",
                icon: <MessageCircle className="w-8 h-8" />,
                color: "bg-blue-50 border-blue-200"
              },
              {
                title: "센터 활동 소식",
                description: "센터에서 진행되는 다양한 행사와 활동 소식을 실시간으로 확인하세요",
                icon: <Play className="w-8 h-8" />,
                color: "bg-green-50 border-green-200"
              },
              {
                title: "전문가 상담",
                description: "궁금한 점이나 상담이 필요한 경우 언제든지 문의해주세요",
                icon: <Heart className="w-8 h-8" />,
                color: "bg-pink-50 border-pink-200"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className={`p-8 rounded-lg border-2 ${item.color}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-wizfore-warm-brown mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-wizfore-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-wizfore-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube 채널 소개 섹션 */}
      <section className="py-16 bg-wizfore-warm-brown/5">
        <div className="container-custom mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Youtube className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-wizfore-text-primary">
                    위즈포레 YouTube 채널
                  </h2>
                  <p className="text-wizfore-text-secondary">
                    센터의 다양한 활동을 영상으로 만나보세요
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-wizfore-text-secondary leading-relaxed mb-6">
                  위즈포레 사회서비스센터의 YouTube 채널에서는 
                  치료 프로그램 소개, 센터 시설 안내, 전문가 인터뷰, 
                  이용자 활동 모습 등 다양한 콘텐츠를 제공합니다. 
                  구독과 좋아요로 함께 소통해주세요!
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-wizfore-warm-brown rounded-full flex items-center justify-center mr-4">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-wizfore-text-secondary">영상 콘텐츠</div>
                      <div className="text-lg font-semibold text-wizfore-text-primary">프로그램 소개</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-wizfore-warm-brown rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-wizfore-text-secondary">소통 채널</div>
                      <div className="text-lg font-semibold text-wizfore-text-primary">실시간 교류</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}