'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Stethoscope, GraduationCap, Activity } from 'lucide-react'
import Link from 'next/link'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { ProgramCategory } from '@/types'

const iconMap = {
  'individual-therapy': BookOpen,
  'evaluation-counseling': Stethoscope,
  'afterschool-program': GraduationCap,
  'adult-day-program': Activity
}

const colorMap = {
  'individual-therapy': {
    bgColor: 'bg-blue-50',
    headerColor: 'bg-mindstory-blue',
    textColor: 'text-mindstory-blue'
  },
  'evaluation-counseling': {
    bgColor: 'bg-green-50',
    headerColor: 'bg-mindstory-green',
    textColor: 'text-mindstory-green'
  },
  'afterschool-program': {
    bgColor: 'bg-purple-50',
    headerColor: 'bg-mindstory-purple',
    textColor: 'text-mindstory-purple'
  },
  'adult-day-program': {
    bgColor: 'bg-orange-50',
    headerColor: 'bg-mindstory-orange',
    textColor: 'text-mindstory-orange'
  }
}

const CategoryCards = () => {
  const [programCategories, setProgramCategories] = useState<ProgramCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgramCategories = async () => {
      try {
        const docRef = doc(db, 'programs', 'main')
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          const categories = data.categories || []
          
          // 첫 4개 카테고리만 표시하고 순서대로 정렬
          const sortedCategories = categories
            .sort((a: ProgramCategory, b: ProgramCategory) => a.order - b.order)
            .slice(0, 4)
          
          setProgramCategories(sortedCategories)
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md h-80 animate-pulse">
                <div className="bg-gray-300 h-32 rounded-t-xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programCategories.map((category, index) => {
            const IconComponent = iconMap[category.id as keyof typeof iconMap] || BookOpen
            const colors = colorMap[category.id as keyof typeof colorMap] || colorMap['individual-therapy']
            
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
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                    {/* 헤더 - 마인드스토리 스타일 아이콘 영역 */}
                    <div className={`${colors.headerColor} p-6 text-center relative`}>
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {category.title}
                      </h3>
                    </div>
                    
                    {/* 콘텐츠 영역 */}
                    <div className="p-6">
                      <p className="text-mindstory-gray-text leading-relaxed text-sm mb-4">
                        {category.description}
                      </p>
                      
                      <div className={`flex items-center ${colors.textColor} font-medium group-hover:text-opacity-80 transition-colors`}>
                        <span className="text-sm">DETAIL VIEW &gt;&gt;</span>
                      </div>
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
