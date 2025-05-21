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
import { Sparkles, FilePlus2, Filter } from 'lucide-react'
import ExamFiltersDialog from '@/components/ExamFiltersDialog'
import { Button } from '@/components/ui/button'

export default function DashboardCreateExam() {
  const user = useUser()
  const [tema, setTema] = useState('')
  const [examen, setExamen] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    corrigeOrtografia: false,
    numPreguntas: 5,
    dificultad: 3,
    usarPrevExams: false,
    prevExams: [],
    tipoTest: false,
    numRespuestas: 4,
  })
  const router = useRouter()

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="text-lg text-gray-500 animate-pulse">Cargando usuario...</div>
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
      // Pasa los filtros a la API si lo necesitas
      const data = await generateExam(tema, filters)
      // Guardar en Supabase
      const saved = await saveExam({
        user_id: user.id,
        topic: data.tema,
        questions: data.preguntas,
        config: filters
      })
      setExamen({ ...data, id: saved.id })
      toast.success('¡Examen generado y guardado!')
    } catch (error) {
      toast.error('Error al generar o guardar el examen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center py-12 px-4">
      {/* Hero */}
      <div className="flex flex-col items-center mb-8 animate-fadeInUp">
        <div className="bg-blue-100 rounded-full p-4 mb-4 shadow-md">
          <FilePlus2 className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 text-center">
          Crear nuevo examen
        </h1>
        <p className="text-gray-600 text-lg text-center max-w-xl">
          Genera un examen personalizado sobre cualquier tema. ¡La IA se encarga de las preguntas!
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-blue-100 transition-all duration-200 hover:shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-between">
          <InputTema
            tema={tema}
            setTema={setTema}
            onSubmit={generarExamen}
            disabled={loading}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="ml-2"
            onClick={() => setFiltersOpen(true)}
            aria-label="Filtros"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>
        <ExamFiltersDialog
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          filters={filters}
          setFilters={setFilters}
        />

        {loading && (
          <div className="space-y-4 mt-6">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-24 w-full" />
            <div className="flex justify-center mt-4">
              <Sparkles className="w-6 h-6 text-blue-400 animate-spin-slow" />
              <span className="ml-2 text-blue-500 font-medium animate-pulse">Generando examen con IA...</span>
            </div>
          </div>
        )}

        {examen && (
          <div className="animate-fadeInUp">
            <VistaPreviaExamen examen={examen} />
          </div>
        )}
      </div>

      {/* Animaciones */}
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 1.2s both;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.2s both;
        }
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </main>
  )
}
