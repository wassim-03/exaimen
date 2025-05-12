import { generateId } from '@/lib/utils/ids'

export async function generateExam(tema) {
  try {
    const res = await fetch('/api/generate-exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tema }),
    })
    
    if (!res.ok) {
      throw new Error('Error generando el examen')
    }
    
    const data = await res.json()
    return {
      ...data,
      id: generateId() // Generate ID client-side
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export async function gradeExam(tema, preguntas, respuestas) {
  try {
    const res = await fetch('/api/grade-exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tema, preguntas, respuestas }),
    })
    
    if (!res.ok) {
      throw new Error('Error calificando el examen')
    }
    
    return await res.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
} 