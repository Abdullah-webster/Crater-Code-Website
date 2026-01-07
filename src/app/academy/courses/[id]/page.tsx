import CourseDetailsClient from './CourseDetailsClient'

// Generate static params - return at least one placeholder
export async function generateStaticParams() {
  // For static export, we need to provide at least one route
  // This creates a fallback page that can handle any course ID client-side
  return [{ id: 'placeholder' }]
}

export default function CourseDetailsPage() {
  return <CourseDetailsClient />
}