'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      toast.error('Error al registrarse: ' + error.message)
    } else {
      toast.success('¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.')
      setTimeout(() => {
        router.push('/auth/login')
      }, 1500)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Crear cuenta</h1>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="tucorreo@ejemplo.com"
        className="w-full p-2 border rounded"
        autoComplete="email"
        disabled={loading}
        aria-label="Correo electrónico"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="w-full p-2 border rounded"
        autoComplete="new-password"
        disabled={loading}
        aria-label="Contraseña"
      />
      <Button onClick={handleSignup} disabled={loading || !email || !password}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </Button>
      <div className="text-sm text-center">
        ¿Ya tienes cuenta?{' '}
        <Link href="/auth/login" className="underline hover:opacity-80">
          Inicia sesión
        </Link>
      </div>
    </div>
  )
} 