// app/page.jsx
'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import InputTema from '@/components/InputTema'
import VistaPreviaExamen from '@/components/VistaPreviaExamen'

export default function HomePage() {
  const [tema, setTema] = useState('')
  const [examen, setExamen] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const generarExamen = async () => {
    if (!tema.trim()) return
    setLoading(true)
    const res = await fetch('/api/generate-exam', {
      method: 'POST',
      body: JSON.stringify({ tema }),
    })
    const data = await res.json()
    setExamen(data)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <InputTema tema={tema} setTema={setTema} onSubmit={generarExamen} />
        {loading && <p className="text-gray-500">Generando examen...</p>}
        {examen && <VistaPreviaExamen examen={examen} />}
      </div>
    </main>
  )
}
