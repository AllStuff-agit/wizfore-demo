'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { getCategoryByEnglish } from '@/lib/utils/newsUtils'
import { TextAnimate } from '@/components/magicui/text-animate'
import { MagicCard } from '@/components/magicui/magic-card'
import type { NewsItem, CategoryItem } from '@/types'

interface NewsDetailMainSectionProps {
  newsItem: NewsItem & { category: string }
  categories: CategoryItem[]
}

const NewsDetailMainSection = ({ newsItem, categories }: NewsDetailMainSectionProps) => {
  const router = useRouter()
  
  // 영어 카테고리를 한글로 변환
  const categoryKorean = getCategoryByEnglish(categories, newsItem.category)?.korean || newsItem.category

  return (
    <div className="bg-gray-50">
      {/* 헤더 섹션 */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom mx-auto px-4 py-6">
          <motion.button
            onClick={() => router.push('/community/news')}
            className="inline-flex items-center text-wizfore-text-secondary hover:text-wizfore-coral-primary transition-colors mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </motion.button>
          
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
      <div className="container-custom mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MagicCard
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
            gradientColor="#f1f5f9"
            gradientFrom="#f97316"
            gradientTo="#fb7185"
            gradientOpacity={0.1}
          >
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
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </div>
  )
}

export default NewsDetailMainSection