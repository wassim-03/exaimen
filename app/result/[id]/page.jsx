// app/result/[id]/page.jsx
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { generateId } from '@/lib/utils/ids'

export default function ResultadoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawResultado = searchParams.get("resultado");
  const tema = searchParams.get("tema");

  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    if (rawResultado) {
      try {
        const decoded = JSON.parse(decodeURIComponent(rawResultado));
        setResultado(decoded);
        console.log("Resultado decodificado:", decoded);
      } catch (e) {
        console.error("Error al parsear resultado:", e);
      }
    }
  }, [rawResultado]);

  if (!resultado) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-6">
        <p className="text-red-600 text-lg">No se pudo cargar el resultado.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Resultado del examen sobre: {tema}
      </h1>

      <div className="space-y-6">
        {Array.isArray(resultado?.correcciones) &&
          resultado.correcciones.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold mb-1">
                {i + 1}. {item.pregunta}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Tu respuesta: {item.respuesta}
              </p>
              <p className="text-sm italic text-green-700">
                💬 Feedback: {item.feedback}
              </p>
              <p className="text-sm mt-2">
                📝 Nota: <span className="font-semibold">{item.nota}/10</span>
              </p>
            </div>
          ))}
      </div>

      <div className="mt-10 border-t pt-6">
        <p className="text-xl font-semibold">
          🧠 Nota final: {resultado.nota_final.toFixed(2)}/10
        </p>
        <p className="text-gray-700 mt-2 italic">
          🧾 Evaluación general: {resultado.evaluacion}
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => {
              const encoded = encodeURIComponent(
                JSON.stringify(
                  resultado.correcciones.map((c) => ({
                    pregunta: c.pregunta,
                  }))
                )
              );
              router.push(
                `/exam/${generateId()}?tema=${encodeURIComponent(tema)}&preguntas=${encoded}`
              );
            }}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            🔁 Volver a intentar
          </button>
          <button
            onClick={async () => {
              const res = await fetch("/api/generate-exam", {
                method: "POST",
                body: JSON.stringify({ tema }),
              });
              const nuevoExamen = await res.json();
              const encoded = encodeURIComponent(
                JSON.stringify(nuevoExamen.preguntas)
              );
              router.push(
                `/exam/${nuevoExamen.id}?tema=${encodeURIComponent(tema)}&preguntas=${encoded}`
              );
            }}
            className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
          >
            ✍️ Otro examen
          </button>
        </div>
      </div>
    </main>
  );
}
