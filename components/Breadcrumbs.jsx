import Link from 'next/link'

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:underline">{item.label}</Link>
            ) : (
              <span className="font-semibold text-gray-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
} 