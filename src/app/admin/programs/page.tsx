import { redirect } from 'next/navigation'

export default function ProgramsPage() {
  // 치료 프로그램 페이지로 리다이렉트
  redirect('/admin/programs/therapy')
}