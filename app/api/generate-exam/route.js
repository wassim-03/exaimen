// app/api/generate-exam/route.js
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req) {
  const { tema } = await req.json()

  const prompt = `Crea 5 preguntas tipo examen (de respuesta abierta) sobre el tema: "${tema}". Devuélvelas en JSON con esta estructura:

[
  { "pregunta": "¿Cuál fue la principal característica de la civilización sumeria?" },
  ...
]`

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })

  const raw = response.choices[0].message.content

  try {
    const preguntas = JSON.parse(raw)
    return new Response(JSON.stringify({
      id: Date.now(), // puedes usar uuid si prefieres
      tema,
      preguntas,
    }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Error al generar examen' }), { status: 500 })
  }
}
