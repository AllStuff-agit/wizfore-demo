export interface Program {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  icon: string
  category: string
  featured: boolean
  order: number
  sessions?: Session[]
  materials?: Material[]
}

export interface Session {
  id: string
  name: string
  ageRange: string
  duration: number
  capacity: number
  description: string
}

export interface Material {
  id: string
  title: string
  description: string
  imageUrl: string
}

export interface Expert {
  id: string
  name: string
  position: string
  image: string
  introduction: string
  education: string[]
  certificates: string[]
  category: string
  featured: boolean
  order: number
  certifications?: Certification[]
  schedules?: Schedule[]
}

export interface Certification {
  id: string
  name: string
  issueDate: string
  issuer: string
  expiryDate?: string
  imageUrl?: string
}

export interface Schedule {
  id: string
  dayOfWeek: string
  availableHours: string[]
  isAvailable: boolean
}

export interface Facility {
  id: string
  title: string
  description: string
  images: string[]
  category: string
  featured: boolean
  order: number
  equipment?: Equipment[]
  features?: Feature[]
}

export interface Equipment {
  id: string
  name: string
  description: string
  imageUrl: string
}

export interface Feature {
  id: string
  name: string
  description: string
}

export interface Notice {
  id: string
  title: string
  content: string
  publishDate: string
  author: string
  featured: boolean
  status: 'published' | 'draft'
  attachments?: Attachment[]
  comments?: Comment[]
}

export interface Attachment {
  id: string
  fileName: string
  fileUrl: string
  fileSize: number
  uploadDate: string
}

export interface Comment {
  id: string
  author: string
  content: string
  date: string
  isVisible: boolean
}

export interface Inquiry {
  id: string
  name: string
  phone: string
  email: string
  category: string
  message: string
  createdAt: string
  status: 'unread' | 'replied'
  adminNote?: string
  replyContent?: string
  repliedAt?: string
  replies?: Reply[]
}

export interface Reply {
  id: string
  content: string
  replyDate: string
  repliedBy: string
  isVisible: boolean
}

export interface User {
  uid: string
  email: string
  displayName: string
  role: 'admin' | 'staff'
  lastLogin: string
  createdAt: string
  permissions?: Permission[]
  activities?: Activity[]
}

export interface Permission {
  id: string
  resource: string
  actions: string[]
}

export interface Activity {
  id: string
  action: string
  timestamp: string
  details?: string
  ipAddress: string
}

export interface SiteConfig {
  siteName: string
  logo: string
  favicon: string
  contact: {
    phone: string
    email: string
    address: string
    operatingHours: string
  }
  socialLinks: {
    instagram?: string
    facebook?: string
    blog?: string
    kakao?: string
  }
}

export interface HomeConfig {
  hero: {
    title: string
    subtitle: string
    backgroundImageURL: string
    buttonText: string
    buttonLink: string
    enabled: boolean
  }
  programs: {
    title: string
    subtitle: string
    description: string
    enabled: boolean
  }
  experts: {
    title: string
    subtitle: string
    description: string
    enabled: boolean
  }
  about: {
    title: string
    subtitle: string
    description: string
    image: string
    enabled: boolean
  }
  news: {
    title: string
    subtitle: string
    description: string
    enabled: boolean
  }
  facilities: {
    title: string
    subtitle: string
    description: string
    enabled: boolean
  }
  contact: {
    title: string
    subtitle: string
    description: string
    image: string
    enabled: boolean
  }
}

export interface AboutInfo {
  title: string
  milestones?: Milestone[]
  photos?: Photo[]
  vision?: string
  mission?: string
  coreValues?: string[]
  address?: string
  coordinates?: {
    lat: number
    lng: number
  }
  transportationInfo?: TransportationInfo[]
  parkingInfo?: string
  images?: LocationImage[]
}

export interface Milestone {
  year: string
  month: string
  event: string
}

export interface Photo {
  id: string
  title: string
  imageUrl: string
  description: string
  date: string
}

export interface TransportationInfo {
  type: string
  description: string
}

export interface LocationImage {
  id: string
  title: string
  imageUrl: string
}
