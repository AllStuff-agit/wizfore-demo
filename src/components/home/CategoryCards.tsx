'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { ProgramCategory } from '@/types'

// 각 카테고리별 fallback 그라데이션 매핑
const fallbackGradients = {
  'individual-therapy': 'bg-gradient-to-br from-wizfore-coral-primary to-wizfore-coral-secondary',
  'evaluation-counseling': 'bg-gradient-to-br from-wizfore-coral-secondary to-wizfore-coral-light',
  'afterschool-program': 'bg-gradient-to-br from-wizfore-coral-light to-wizfore-coral-accent',
  'adult-day-program': 'bg-gradient-to-br from-wizfore-coral-accent to-wizfore-soft-pink'
}

// 이미지 fallback을 처리하는 컴포넌트
interface CategoryImageProps {
  categoryImageUrl?: string
  defaultImageUrl: string
  alt: string
}

const CategoryImage = ({ categoryImageUrl, defaultImageUrl, alt }: CategoryImageProps) => {
  // 카테고리 이미지가 없으면 바로 기본 이미지 사용
  const initialImageUrl = categoryImageUrl && categoryImageUrl.trim() !== "" ? categoryImageUrl : defaultImageUrl
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(initialImageUrl)
  const [imageLoadFailed, setImageLoadFailed] = useState(false)

  const handleImageError = () => {
    if (currentImageUrl === categoryImageUrl && defaultImageUrl) {
      // 카테고리 이미지 실패 → 기본 이미지로 전환
      setCurrentImageUrl(defaultImageUrl)
    } else {
      // 기본 이미지도 실패 → 이미지 숨김
      setImageLoadFailed(true)
    }
  }

  // 카테고리 이미지 URL이 변경되면 초기화
  useEffect(() => {
    const newImageUrl = categoryImageUrl && categoryImageUrl.trim() !== "" ? categoryImageUrl : defaultImageUrl
    setCurrentImageUrl(newImageUrl)
    setImageLoadFailed(false)
  }, [categoryImageUrl, defaultImageUrl])

  if (imageLoadFailed) {
    return null // 그라데이션 배경만 표시
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <img 
        src={currentImageUrl}
        alt={alt}
        className="w-full h-full object-cover brightness-75 contrast-75 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-300"
        onError={handleImageError}
      />
    </div>
  )
}

const CategoryCards = () => {
  const [programCategories, setProgramCategories] = useState<ProgramCategory[]>([])
  const [defaultImageUrl, setDefaultImageUrl] = useState<string>('/images/programs/defaultImage.jpg')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgramCategories = async () => {
      try {
        const docRef = doc(db, 'programs', 'main')
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          const categories = data.categories || []
          const defaultImg = data.defaultImageUrl || '/images/programs/defaultImage.jpg'
          
          // 첫 4개 카테고리만 표시하고 순서대로 정렬
          const sortedCategories = categories
            .sort((a: ProgramCategory, b: ProgramCategory) => a.order - b.order)
            .slice(0, 4)
          
          setProgramCategories(sortedCategories)
          setDefaultImageUrl(defaultImg)
        }
      } catch (error) {
        console.error('Error fetching program categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgramCategories()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-mindstory-gray-light">
        <div className="container-custom mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="relative h-64 w-full shadow-md overflow-hidden rounded-2xl bg-gray-300 animate-pulse">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="h-6 bg-white/30 rounded w-3/4 mb-2 ml-2"></div>
                  <div className="h-4 bg-white/20 rounded w-5/6 ml-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-mindstory-gray-light">
      <div className="container-custom mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {programCategories.map((category, index) => {
            const fallbackGradient = fallbackGradients[category.id as keyof typeof fallbackGradients] || fallbackGradients['individual-therapy']
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={`/programs/${category.id}`}>
                  <div className={`relative h-64 w-full shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden rounded-2xl ${fallbackGradient}`}>
                    {/* 배경 이미지 */}
                    <CategoryImage 
                      categoryImageUrl={category.imageUrl}
                      defaultImageUrl={defaultImageUrl}
                      alt={`${category.title} 프로그램`}
                    />
                    {/* 어두운 필터 오버레이 */}
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-all duration-300 z-5"></div>
                    
                    {/* 왼쪽 하단 텍스트 오버레이 */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-10">
                      <h2 className="text-white text-lg font-bold mb-2 drop-shadow-lg ml-2">
                        {category.title}
                      </h2>
                      <p className="text-white/90 text-sm drop-shadow-md line-clamp-2 ml-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryCards
