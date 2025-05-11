'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert('Error al enviar el enlace de acceso')
    } else {
      alert('Revisa tu correo para el enlace mágico de login.')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Iniciar sesión</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tucorreo@ejemplo.com"
        className="w-full p-2 border rounded"
      />
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar enlace mágico'}
      </Button>
    </div>
  )
}
