'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useUser } from '../../../lib/hooks/useUser'
import InputTema from '@/components/InputTema'
import VistaPreviaExamen from '@/components/VistaPreviaExamen'
import { Skeleton } from '@/components/ui/skeleton'
import { generateExam } from '@/lib/services/exam'
import { saveExam } from '@/lib/utils/db'

export default function DashboardCreateExam() {
  const user = useUser()
  const [tema, setTema] = useState('')
  const [examen, setExamen] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-lg text-gray-500">Cargando usuario...</div>
      </main>
    )
  }

  const generarExamen = async () => {
    if (!tema.trim()) {
      toast.error('Por favor introduce un tema')
      return
    }

    setLoading(true)
    try {
      const data = await generateExam(tema)
      // Guardar en Supabase
      const saved = await saveExam({
        user_id: user.id,
        topic: data.tema,
        questions: data.preguntas,
        config: {} // Puedes pasar filtros/dificultad si tienes
      })
      setExamen({ ...data, id: saved.id }) // Usa el id real de la BD
      toast.success('¡Examen generado y guardado!')
    } catch (error) {
      toast.error('Error al generar o guardar el examen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <h1 className="text-2xl font-bold mb-2">Crear nuevo examen</h1>
        <InputTema 
          tema={tema} 
          setTema={setTema} 
          onSubmit={generarExamen}
          disabled={loading}
        />
        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}
        {examen && <VistaPreviaExamen examen={examen} />}
      </div>
    </main>
  )
}
