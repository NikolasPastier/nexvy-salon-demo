'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Dobrý deň! Som Bella, vaša AI asistentka 💛 Ako vám môžem pomôcť?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendQuickReply = (text: string) => {
    setShowQuickReplies(false)
    const userMessage = { role: 'user' as const, content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setIsLoading(true)
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
    })
      .then(r => r.json())
      .then(data => setMessages(prev => [...prev, { role: 'assistant', content: data.message }]))
      .catch(() => setMessages(prev => [...prev, { role: 'assistant', content: 'Ospravedlňujem sa, nastala chyba. Zavolajte nám na +421 950 504 171.' }]))
      .finally(() => setIsLoading(false))
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return
    setShowQuickReplies(false)

    const userMessage = { role: 'user' as const, content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })
      const data = await response.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Ospravedlňujem sa, nastala chyba. Zavolajte nám na +421 950 504 171.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          width: '340px',
          height: '480px',
          background: '#141210',
          border: '1px solid rgba(200,146,42,0.2)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9000,
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          overflow: 'hidden'
        }}>

          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: '#C8922A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px',
                borderRadius: '50%',
                background: '#0C0B09',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px'
              }}>
                💇
              </div>
              <div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#0C0B09'
                }}>
                  Bella — AI Asistentka
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  color: 'rgba(12,11,9,0.6)'
                }}>
                  <div style={{
                    width: '6px', height: '6px',
                    borderRadius: '50%',
                    background: '#2d6a2d'
                  }} />
                  Online 24/7
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none', border: 'none',
                color: '#0C0B09', cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user'
                    ? '16px 16px 4px 16px'
                    : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? '#C8922A'
                    : 'rgba(237,232,223,0.08)',
                  color: msg.role === 'user' ? '#0C0B09' : '#EDE8DF',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  lineHeight: 1.5,
                  border: msg.role === 'assistant'
                    ? '1px solid rgba(237,232,223,0.08)'
                    : 'none'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {showQuickReplies && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '4px 0 8px' }}>
                {['Aké sú vaše ceny?', 'Ako sa objednať?', 'Aké služby ponúkate?', 'Kedy ste otvorení?'].map(q => (
                  <button
                    key={q}
                    onClick={() => sendQuickReply(q)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(200,146,42,0.3)',
                      background: 'rgba(200,146,42,0.06)',
                      color: '#C8922A',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(200,146,42,0.15)'
                      e.currentTarget.style.borderColor = '#C8922A'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(200,146,42,0.06)'
                      e.currentTarget.style.borderColor = 'rgba(200,146,42,0.3)'
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(237,232,223,0.08)',
                  border: '1px solid rgba(237,232,223,0.08)'
                }}>
                  <Loader2
                    size={14}
                    style={{
                      color: '#C8922A',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid rgba(237,232,223,0.08)',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Napíšte správu..."
              style={{
                flex: 1,
                background: 'rgba(237,232,223,0.06)',
                border: '1px solid rgba(237,232,223,0.1)',
                borderRadius: '9999px',
                padding: '8px 16px',
                color: '#EDE8DF',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              style={{
                width: '36px', height: '36px',
                borderRadius: '50%',
                background: input.trim() ? '#C8922A' : 'rgba(200,146,42,0.2)',
                border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                transition: 'background 0.25s',
                flexShrink: 0
              }}
            >
              <Send size={14} style={{ color: '#0C0B09' }} />
            </button>
          </div>
        </div>
      )}

      {/* Floating bubble — sits left of the WhatsApp FAB (right: 88px) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '88px',
          width: '52px', height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(110deg,#C8922A 40%,#F0C060 50%,#C8922A 60%,#C8922A)',
          backgroundSize: '200% 100%',
          animation: 'shimmer2 2.5s infinite linear',
          border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9000,
          boxShadow: '0 8px 24px rgba(200,146,42,0.4)',
          transition: 'transform 0.25s'
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Chat s AI asistentkou"
      >
        {isOpen
          ? <X size={20} style={{ color: '#0C0B09' }} />
          : <MessageCircle size={20} style={{ color: '#0C0B09' }} />
        }
      </button>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
