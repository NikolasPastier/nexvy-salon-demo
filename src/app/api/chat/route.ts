import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SYSTEM_PROMPT = `Si Bella, priateľská AI asistentka
prémiového kaderníctva Bella Studio v Bratislave.
Odpovedáš v slovenčine, stručne a priateľsky.
Vždy zakončíš odpoveď ponukou na rezerváciu.

Informácie o salóne:
- Adresa: Obchodná 12, 811 06 Bratislava
- Telefón: +421 950 504 171
- Email: info@bellastudio.sk
- Otváracie hodiny: Po-Pia 9:00-20:00, Sob 9:00-14:00,
  Ned zatvorené

Služby a ceny:
- Strihanie a styling: od €30 (45 min)
- Farbenie vlasov: od €55 (90 min)
- Melír a Balayage: od €75 (120 min)
- Keratin a regenerácia: od €65 (90 min)
- Svadobné účesy: od €85 (60-120 min)

Rezervácia: Online 24/7 cez web, WhatsApp alebo telefón.
Tím: Jana (balayage špecialistka, 8 r.),
     Marek (barber, 5 r.),
     Lucia (farbenie, 10 r.)
Hodnotenie: 4.9 ★ · 156+ spokojných klientov

Ak sa pýtajú na ceny, daj orientačnú cenu a povedz
že presná cena závisí od dĺžky a stavu vlasov.
Ak chcú rezervovať, nasmeruj ich na rezervačný formulár
alebo WhatsApp. Odpovedaj maximálne 2-3 vetami.`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-latest',
      systemInstruction: SYSTEM_PROMPT
    })

    // Convert messages to Gemini format (uses 'model' instead of 'assistant')
    // Skip messages until we hit the first 'user' message — Gemini requires
    // history to start with 'user', so we drop any leading assistant greeting.
    const allPrior: { role: string; content: string }[] = messages.slice(0, -1)
    const firstUserIdx = allPrior.findIndex((m) => m.role === 'user')
    const history = (firstUserIdx === -1 ? [] : allPrior.slice(firstUserIdx)).map(
      (m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      })
    )

    const chat = model.startChat({ history })

    const lastMessage = messages[messages.length - 1].content
    const result = await chat.sendMessage(lastMessage)
    const text = result.response.text()

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('Gemini error:', JSON.stringify(error, null, 2))
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
    return NextResponse.json(
      { message: `Ospravedlňujem sa, nastala chyba. Zavolajte nám na +421 950 504 171. (${errorMessage})` },
      { status: 500 }
    )
  }
}
