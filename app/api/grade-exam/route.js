// app/api/grade-exam/route.js
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req) {
  const { tema, preguntas, respuestas } = await req.json()

  // Creamos un prompt para la IA
  const prompt = `
Corrige el siguiente examen sobre el tema: "${tema}".

Para cada pregunta:
- Muestra la pregunta
- Muestra la respuesta del alumno
- Da un breve feedback (máx 2 frases)
- Asigna una puntuación del 0 al 10

Finalmente:
- Calcula la nota media del alumno
- Da una breve evaluación general (máx 3 frases)

Formato en JSON así:
{
  "correcciones": [
    {
      "pregunta": "...",
      "respuesta": "...",
      "feedback": "...",
      "nota": 7
    },
    ...
  ],
  "nota_final": 7.6,
  "evaluacion": "..."
}

Contenido del examen:
${preguntas.map((p, i) => `P: ${p.pregunta}\nR: ${respuestas[i]}`).join('\n\n')}
`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.4,
  })

  const output = completion.choices[0].message.content

  try {
    const resultado = JSON.parse(output)
    return new Response(JSON.stringify(resultado), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Error al analizar la corrección' }), { status: 500 })
  }
}
