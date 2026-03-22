import { NextRequest, NextResponse } from 'next/server'
// Recommended: google/gemini-2.0-flash-exp:free (very fast and capable)
// Fallback could be: meta-llama/llama-3.3-70b-instruct:free
const MODEL = 'google/gemini-2.0-flash-exp:free'

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

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://bellastudio.sk', // Optional: for OpenRouter rankings
        'X-Title': 'Bella Studio AI',             // Optional: for OpenRouter rankings
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        max_tokens: 250,
        temperature: 0.7,
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenRouter error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    const text = data.choices[0]?.message?.content || 'Ospravedlňujem sa, neviem teraz odpovedať.'

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('OpenRouter error:', error)
    return NextResponse.json(
      { message: 'Ospravedlňujem sa, nastala chyba. Zavolajte nám na +421 950 504 171.' },
      { status: 500 }
    )
  }
}
