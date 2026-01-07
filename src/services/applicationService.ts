import { 
  collection, 
  addDoc, 
  getDocs, 
  query,
  orderBy 
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface ApplicationCourse {
  courseId: string
  courseName: string
  category: string
}

export interface Application {
  id: string
  name: string
  email: string
  selectedCourses: ApplicationCourse[]
  questions: string
  submittedAt: any
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
}

const APPLICATIONS_COLLECTION = 'applications'

export const applicationService = {
  // Submit a new application
  async submitApplication(applicationData: {
    name: string
    email: string
    selectedCourses: ApplicationCourse[]
    questions: string
  }) {
    try {
      const docRef = await addDoc(collection(db, APPLICATIONS_COLLECTION), {
        ...applicationData,
        submittedAt: new Date(),
        status: 'pending'
      })
      return { success: true, id: docRef.id }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  // Get all applications (for admin)
  async getApplications() {
    try {
      const q = query(collection(db, APPLICATIONS_COLLECTION), orderBy('submittedAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const applications: Application[] = []
      
      querySnapshot.forEach((doc) => {
        applications.push({
          id: doc.id,
          ...doc.data()
        } as Application)
      })
      
      return { success: true, applications }
    } catch (error: any) {
      return { success: false, error: error.message, applications: [] }
    }
  }
}