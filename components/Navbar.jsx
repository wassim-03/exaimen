"use client"
import Link from 'next/link'
import { useUser } from '../lib/hooks/useUser'
import { LogOut, PlusCircle, FileText, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { useRef, useEffect } from "react"
import { Badge } from '@/components/ui/badge'
import { Beaker } from 'lucide-react'
import { Button } from '@/components/ui/button'

const USER_ICON_URL = "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"

const navLinks = [
  { href: '/dashboard/create-exam', label: 'Crear examen', icon: <PlusCircle className="w-5 h-5" /> },
  { href: '/dashboard/my-exams', label: 'Mis exámenes', icon: <FileText className="w-5 h-5" /> },
]

export default function Navbar() {
  const user = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/logout', { method: 'POST' })
    await supabase.auth.signOut()
    setLoggingOut(false)
    router.push('/')
  }

  // Helper for fallback initials
  function getInitials(email) {
    if (!email) return 'U'
    return email[0].toUpperCase()
  }

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Link href="/" className="font-bold text-xl text-blue-700 flex items-center gap-2">
          exAImen
          <Badge variant="outline" className="ml-2 flex items-center gap-1">
            <Beaker className="w-3 h-3 text-blue-500" />
            beta
          </Badge>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {user && navLinks.map(link => (
          <Link key={link.href} href={link.href}>
            <Button
              variant={pathname.startsWith(link.href) ? "secondary" : "ghost"}
              className="flex items-center gap-2"
            >
              {link.icon}
              {link.label}
            </Button>
          </Link>
        ))}
        {!user && (
          <>
            <Link href="/auth/login">
              <Button variant="ghost">Iniciar sesión</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline">Registrarse</Button>
            </Link>
          </>
        )}
        {user && (
          <ProfileMenu user={user} onLogout={handleLogout} loggingOut={loggingOut} />
        )}
      </div>
    </nav>
  )
}

// --- Local subcomponent for the profile menu ---
function ProfileMenu({ user, onLogout, loggingOut }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 flex items-center justify-center rounded-full border bg-white hover:ring-2 ring-black/10 transition"
        aria-label="Abrir menú de perfil"
        type="button"
      >
        <img
          src={
            user?.user_metadata?.avatar_url ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`
          }
          alt={user?.email || "Usuario"}
          className="w-7 h-7 object-cover rounded-full"
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50 py-1 text-sm">
          {user ? (
            <>
              <div className="px-4 py-2 border-b">
                <p className="font-medium truncate">{user.email}</p>
                <p className="text-xs text-gray-500 truncate">
                  {user.user_metadata?.full_name || 'Usuario'}
                </p>
              </div>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  setOpen(false)
                  router.push("/dashboard/profile")
                  console.log("Cookies:", document.cookie);
                  console.log("Editando perfil")
                }}
              >
                <span>⚙️</span> Editar perfil
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  setOpen(false)
                  router.push("/dashboard/my-exams")
                }}
              >
                <span>📝</span> Mis exámenes
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                onClick={() => {
                  setOpen(false)
                  onLogout()
                }}
                disabled={loggingOut}
              >
                <span>🚪</span> {loggingOut ? "Saliendo..." : "Cerrar sesión"}
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  setOpen(false)
                  router.push("/auth/login")
                }}
              >
                <span>👋</span> Iniciar sesión
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  setOpen(false)
                  router.push("/auth/signup")
                }}
              >
                <span>✨</span> Registrarse
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}