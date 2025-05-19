// app/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/hooks/useUser'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, BookOpen, UserPlus } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    if (user) {
      router.replace('/dashboard/create-exam')
    }
  }, [user, router])

  if (user) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center px-4 py-16">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="flex justify-center mb-2">
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-medium text-sm shadow-sm">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Potencia tu aprendizaje con IA
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Genera y corrige exámenes <span className="text-blue-600">automáticamente</span> con IA
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Crea exámenes personalizados sobre cualquier tema y recibe feedback instantáneo. Ideal para estudiantes, docentes y autodidactas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/auth/register" passHref>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transition">
                <UserPlus className="w-5 h-5 mr-2" />
                Regístrate gratis
              </Button>
            </Link>
            <Link href="/auth/login" passHref>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg rounded-full border-blue-600 text-blue-700 hover:bg-blue-50 transition">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 border-t border-blue-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
            ¿Por qué usar <span className="text-blue-600">AI Exams</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-blue-600" />}
              title="Exámenes personalizados"
              description="Genera exámenes únicos sobre cualquier tema, nivel o dificultad en segundos."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-blue-600" />}
              title="Corrección instantánea"
              description="Recibe feedback detallado y calificación automática gracias a la IA de OpenAI."
            />
            <FeatureCard
              icon={<ArrowRight className="w-8 h-8 text-blue-600" />}
              title="Aprende más rápido"
              description="Identifica tus áreas de mejora y acelera tu aprendizaje con evaluaciones inteligentes."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-100">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            ¿Listo para probarlo?
          </h3>
          <p className="text-lg text-gray-700">
            Únete gratis y comienza a crear tus propios exámenes en segundos.
          </p>
          <Link href="/auth/register" passHref>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transition">
              <Sparkles className="w-5 h-5 mr-2" />
              Empezar ahora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} AI Exams · Hecho con ❤️ y OpenAI
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center border border-blue-100 hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
