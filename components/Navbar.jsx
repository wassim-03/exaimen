export default function Navbar() {
    return (
      <nav className="w-full border-b p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold">SaaS Starter</span>
          <div className="space-x-4 text-sm">
            <a href="/auth/login" className="hover:underline">Login</a>
            <a href="/dashboard" className="hover:underline">Dashboard</a>
          </div>
        </div>
      </nav>
    )
  }
  