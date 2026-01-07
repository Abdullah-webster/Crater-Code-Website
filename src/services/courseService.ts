import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy 
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface TechStack {
  id: string
  text: string
  description: string
}

export interface Course {
  id: string
  name: string
  duration: string
  level: 'Beginner' | 'Beginner to Intermediate' | 'Intermediate' | 'Intermediate to Advanced' | 'Advanced' | 'Beginner to Advanced'
  description: string
  category: 'App' | 'Web' | 'Cross Platform' | 'Artificial Intelligence'
  techStack: TechStack[]
  createdAt?: any
}

const COURSES_COLLECTION = 'courses'

export const courseService = {
  // Add a new course
  async addCourse(courseData: Omit<Course, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, COURSES_COLLECTION), {
        ...courseData,
        createdAt: new Date()
      })
      return { success: true, id: docRef.id }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  // Get all courses
  async getCourses() {
    try {
      const q = query(collection(db, COURSES_COLLECTION), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const courses: Course[] = []
      
      querySnapshot.forEach((doc) => {
        courses.push({
          id: doc.id,
          ...doc.data()
        } as Course)
      })
      
      return { success: true, courses }
    } catch (error: any) {
      return { success: false, error: error.message, courses: [] }
    }
  },

  // Update a course
  async updateCourse(courseId: string, courseData: Partial<Course>) {
    try {
      const courseRef = doc(db, COURSES_COLLECTION, courseId)
      await updateDoc(courseRef, courseData)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  // Delete a course
  async deleteCourse(courseId: string) {
    try {
      await deleteDoc(doc(db, COURSES_COLLECTION, courseId))
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  // Listen to real-time course updates
  subscribeToCoursesUpdates(callback: (courses: Course[]) => void) {
    const q = query(collection(db, COURSES_COLLECTION), orderBy('createdAt', 'desc'))
    
    return onSnapshot(q, (querySnapshot) => {
      const courses: Course[] = []
      querySnapshot.forEach((doc) => {
        courses.push({
          id: doc.id,
          ...doc.data()
        } as Course)
      })
      callback(courses)
    })
  }
}