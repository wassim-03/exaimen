// components/VistaPreviaExamen.jsx
import { useRouter } from 'next/navigation'

export default function VistaPreviaExamen({ examen }) {
  const router = useRouter()

  const iniciarExamen = () => {
    const preguntasStr = encodeURIComponent(JSON.stringify(examen.preguntas))
    router.push(`/exam/${examen.id}?tema=${encodeURIComponent(examen.tema)}&preguntas=${preguntasStr}`)
  }


  return (
    <div
      className="border border-black/10 rounded-2xl p-6 transition-shadow hover:shadow-md"
    >
      <p className="text-sm text-gray-700 mb-1">Examen generado sobre:</p>
      <h2 className="text-2xl font-semibold text-black mb-3">{examen.tema}</h2>

      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
        {examen.preguntas.slice(0, 3).map((p, i) => (
          <li key={i}>{p.pregunta}</li>
        ))}
      </ul>

      <button
        onClick={iniciarExamen}
        className="text-sm px-4 py-2 border border-black rounded-xl hover:bg-black hover:text-white transition-colors"
      >
        👉 Examinarse
      </button>
    </div>
  )
}
