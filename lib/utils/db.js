// utils/db.js
import { supabase } from '@/lib/supabase'

// Al generar un examen
export async function saveExam({ user_id, topic, questions, config }) {
  const { data, error } = await supabase
    .from('exams')
    .insert([{
      user_id,
      topic,
      questions,          // formato JSON: [{q, options, answer}, ...]
      ...config           // extrae filtros/dificultad/etc del form del usuario
    }])
    .select()
    .single()
  if (error) throw error
  return data
}

// Al guardar una respuesta
export async function saveAnswer({ user_id, exam_id, answers, score, feedback }) {
  const { data, error } = await supabase
    .from('results')
    .insert([{ user_id, exam_id, answers, score, feedback }])
    .select()
    .single()
  if (error) throw error
  return data
}

// Obtener todos los exámenes de un usuario
export async function getUserExams(user_id) {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  }


