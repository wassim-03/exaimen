'use client'

import { useState } from 'react'
import { useUser } from '@/lib/hooks/useUser'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProfilePage() {
  const user = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || '',
    avatar_url: user?.user_metadata?.avatar_url || '',
    website: user?.user_metadata?.website || '',
    bio: user?.user_metadata?.bio || ''
  })

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        data: formData
      })

      if (error) throw error
      toast.success('Perfil actualizado correctamente')
    } catch (error) {
      toast.error('Error al actualizar el perfil: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full p-2 border rounded-lg bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            URL del Avatar
          </label>
          <input
            type="url"
            name="avatar_url"
            value={formData.avatar_url}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Sitio web
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Biografía
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </form>
    </div>
  )
} 