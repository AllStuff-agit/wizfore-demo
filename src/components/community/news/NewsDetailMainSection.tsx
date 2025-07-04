'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { getCategoryByEnglish } from '@/lib/utils/newsUtils'
import { TextAnimate } from '@/components/magicui/text-animate'
import { MagicCard } from '@/components/magicui/magic-card'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { BorderBeam } from '@/components/magicui/border-beam'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { TextReveal } from '@/components/magicui/text-reveal'
import { cn } from '@/lib/utils'
import type { NewsItem, CategoryItem } from '@/types'

interface NewsDetailMainSectionProps {
  newsItem: NewsItem & { category: string }
  categories: CategoryItem[]
}

const NewsDetailMainSection = ({ newsItem, categories }: NewsDetailMainSectionProps) => {
  const router = useRouter()
  
  // 영어 카테고리를 한글로 변환
  const categoryKorean = getCategoryByEnglish(categories, newsItem.category)?.korean || newsItem.category

  // 본문이 긴 경우(200자 이상)를 체크
  const isLongContent = newsItem.content.length > 200

  return (
    <div className="relative bg-gray-50">
      {/* 배경 패턴 */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "absolute inset-0 opacity-20"
        )}
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
      />
      {/* 헤더 섹션 */}
      <div className="relative bg-white border-b border-gray-200 z-10">
        <div className="container-custom mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <ShimmerButton 
              onClick={() => router.push('/community/news')}
              className="bg-white border border-gray-200 text-wizfore-text-secondary hover:text-wizfore-coral-primary transition-colors"
              shimmerColor="#FF6B6B"
              shimmerSize="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로 돌아가기
            </ShimmerButton>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              delay={0.2}
              className="text-3xl font-bold text-wizfore-text-primary mb-4"
              as="h1"
            >
              {newsItem.title}
            </TextAnimate>
            
            <motion.div 
              className="flex flex-wrap items-center gap-4 text-sm text-wizfore-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                <TextAnimate
                  animation="slideLeft"
                  by="character"
                  delay={0.5}
                  className="inline-block"
                  as="span"
                >
                  {new Date(newsItem.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  }).replace(/\./g, '.').replace(/\s/g, '')}
                </TextAnimate>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Tag className="w-4 h-4 mr-2" />
                <span className="px-2 py-1 bg-wizfore-coral-primary text-white text-xs rounded-full">
                  <TextAnimate
                    animation="slideLeft"
                    by="character"
                    delay={0.6}
                    className="inline-block"
                    as="span"
                  >
                    {categoryKorean}
                  </TextAnimate>
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 본문 섹션 */}
      <div className="relative container-custom mx-auto px-4 py-8 z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MagicCard
            className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-8 overflow-hidden"
            gradientColor="#f1f5f9"
            gradientFrom="#f97316"
            gradientTo="#fb7185"
            gradientOpacity={0.1}
          >
            <BorderBeam 
              size={250}
              duration={12}
              borderWidth={1.5}
              colorFrom="#FF6B6B"
              colorTo="#FF8A80"
            />
            {newsItem.imageUrl && (
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <img
                  src={newsItem.imageUrl}
                  alt={newsItem.title}
                  className="w-full rounded-lg"
                />
              </motion.div>
            )}
            
            <div className="prose max-w-none">
              {isLongContent ? (
                <TextReveal className="text-lg leading-relaxed text-wizfore-text-primary">
                  {newsItem.content}
                </TextReveal>
              ) : (
                <TextAnimate
                  animation="fadeIn"
                  by="word"
                  delay={0.7}
                  duration={2}
                  className="text-lg leading-relaxed text-wizfore-text-primary whitespace-pre-wrap"
                  as="p"
                >
                  {newsItem.content}
                </TextAnimate>
              )}
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </div>
  )
}

export default NewsDetailMainSection