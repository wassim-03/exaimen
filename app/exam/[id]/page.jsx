// app/exam/[id]/page.jsx
'use client'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ExamenPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tema = searchParams.get('tema')
  const rawPreguntas = searchParams.get('preguntas')
  const preguntas = rawPreguntas ? JSON.parse(decodeURIComponent(rawPreguntas)) : []

  const [respuestas, setRespuestas] = useState(preguntas.map(() => ''))
  const [corrigiendo, setCorrigiendo] = useState(false)

  const handleChange = (index, value) => {
    const nuevas = [...respuestas]
    nuevas[index] = value
    setRespuestas(nuevas)
  }

  const corregirExamen = async () => {
    setCorrigiendo(true)
    const res = await fetch('/api/grade-exam', {
      method: 'POST',
      body: JSON.stringify({ tema, preguntas, respuestas }),
    })
    const data = await res.json()
    // Aquí podrías guardar resultado y redirigir a /result/:id
    const query = new URLSearchParams({
        resultado: encodeURIComponent(JSON.stringify(data)),
        tema,
      }).toString()
      
      router.push(`/result/${Date.now()}?${query}`)
    setCorrigiendo(false)
  }

  if (!tema || !preguntas.length) {
    return (
      <main className="min-h-screen bg-white p-6 flex items-center justify-center">
        <p className="text-red-600 text-lg">Datos del examen no válidos o incompletos.</p>
      </main>
    )
  }  

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Examen: {tema}</h1>

      <div className="space-y-6">
        {preguntas.map((p, i) => (
          <div key={i}>
            <p className="font-medium">{i + 1}. {p.pregunta}</p>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 mt-2"
              rows={4}
              value={respuestas[i]}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={corregirExamen}
        className="fixed right-6 bottom-6 bg-black text-white px-6 py-3 rounded-full shadow-xl hover:opacity-90"
        disabled={corrigiendo}
      >
        {corrigiendo ? 'Corrigiendo...' : 'Corregir'}
      </button>
    </main>
  )
}
