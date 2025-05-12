// app/page.jsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import InputTema from '@/components/InputTema'
import VistaPreviaExamen from '@/components/VistaPreviaExamen'
import { Skeleton } from '@/components/ui/skeleton'
import { generateExam } from '@/lib/services/exam'

export default function HomePage() {
  const [tema, setTema] = useState('')
  const [examen, setExamen] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const generarExamen = async () => {
    if (!tema.trim()) {
      toast.error('Por favor introduce un tema')
      return
    }

    setLoading(true)
    try {
      const data = await generateExam(tema)
      setExamen(data)
      toast.success('¡Examen generado correctamente!')
    } catch (error) {
      toast.error('Error al generar el examen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-xl mx-auto text-center space-y-6">
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
