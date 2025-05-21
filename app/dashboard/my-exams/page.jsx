'use client'
import { useEffect, useState } from 'react'
import { useUser } from '../../../lib/hooks/useUser'
import { supabase } from '@/lib/supabase'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarDays, CheckCircle2, Hourglass, FileText } from 'lucide-react'
import Link from 'next/link'
import dayjs from 'dayjs'

export default function MyExamsPage() {
  const user = useUser()
  const [exams, setExams] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchData = async () => {
      setLoading(true)
      // Fetch exams
      const { data: examsData } = await supabase
        .from('exams')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      // Fetch results
      const { data: resultsData } = await supabase
        .from('results')
        .select('exam_id, score, created_at')
        .eq('user_id', user.id)

      setExams(examsData || [])
      setResults(resultsData || [])
      setLoading(false)
    }
    fetchData()
  }, [user])

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="text-lg text-gray-500 animate-pulse">Cargando usuario...</div>
      </main>
    )
  }

  // Map exam_id to result for quick lookup
  const resultMap = Object.fromEntries(
    results.map(r => [r.exam_id, r])
  )

  // Agrupar por corregidos y pendientes
  const corregidos = exams.filter(e => resultMap[e.id])
  const pendientes = exams.filter(e => !resultMap[e.id])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
          <FileText className="w-7 h-7 text-blue-600" />
          Mis exámenes
        </h1>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <>
            <Section
              title="Pendientes de corrección"
              icon={<Hourglass className="w-5 h-5 text-yellow-500" />}
              exams={pendientes}
              resultMap={resultMap}
              emptyText="No tienes exámenes pendientes."
            />
            <Section
              title="Corregidos"
              icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
              exams={corregidos}
              resultMap={resultMap}
              emptyText="No tienes exámenes corregidos aún."
              corregidos
            />
          </>
        )}
      </div>
    </main>
  )
}

function Section({ title, icon, exams, resultMap, emptyText, corregidos }) {
  if (!exams.length) {
    return (
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">{icon}{title}</h2>
        <p className="text-gray-500">{emptyText}</p>
      </div>
    )
  }
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">{icon}{title}</h2>
      <div className="space-y-4">
        {exams.map(exam => (
          <Card
            key={exam.id}
            className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-blue-100 hover:shadow-lg transition"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">{exam.topic}</span>
                <Badge variant="outline" className="ml-2">
                  {dayjs(exam.created_at).format('DD MMM YYYY')}
                </Badge>
              </div>
              <div className="text-gray-500 text-sm">
                {exam.questions.length} preguntas
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 md:mt-0">
              {corregidos && resultMap[exam.id] && (
                <span className="text-green-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Nota: {resultMap[exam.id].score ?? '-'}
                </span>
              )}
              <Link
                href={
                  corregidos
                    ? `/result/${exam.id}`
                    : `/exam/${exam.id}?tema=${encodeURIComponent(exam.topic)}&preguntas=${encodeURIComponent(JSON.stringify(exam.questions))}`
                }
                passHref
              >
                <Button size="sm" className="rounded-full">
                  {corregidos ? 'Ver resultado' : 'Continuar'}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 