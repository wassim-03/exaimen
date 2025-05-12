// components/VistaPreviaExamen.jsx
'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function VistaPreviaExamen({ examen }) {
  const router = useRouter()

  const iniciarExamen = () => {
    const preguntasStr = encodeURIComponent(JSON.stringify(examen.preguntas))
    router.push(`/exam/${examen.id}?tema=${encodeURIComponent(examen.tema)}&preguntas=${preguntasStr}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-black/10 rounded-2xl p-6 transition-all hover:shadow-md"
    >
      <p className="text-sm text-gray-700 mb-1">Examen generado sobre:</p>
      <h2 className="text-2xl font-semibold text-black mb-3">{examen.tema}</h2>

      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
        {examen.preguntas.slice(0, 3).map((p, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {p.pregunta}
          </motion.li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={iniciarExamen}
        className="text-sm px-4 py-2 border border-black rounded-xl hover:bg-black hover:text-white transition-colors"
      >
        👉 Examinarse
      </motion.button>
    </motion.div>
  )
}
