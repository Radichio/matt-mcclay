import { useState } from 'react'

const NAV_LINKS = [
  { href: '/about',    label: 'About' },
  { href: '/packages', label: 'Packages' },
  { href: '/booking',  label: 'Book a Shoot', cta: true, active: true },
]

function Nav() {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 48px', borderBottom: '0.5px solid var(--gold-faint)', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,37,53,0.95)', backdropFilter: 'blur(12px)' }}>
      <a href="/">
        <img src="/logo-clean.png" alt="Matt McClay Drone + Design" style={{ height: '140px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
      </a>
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: l.cta ? 'var(--navy-dark)' : l.active ? 'var(--gold)' : 'var(--bone-dim)', background: l.cta ? 'var(--gold)' : 'transparent', padding: l.cta ? '9px 20px' : '0', borderRadius: l.cta ? '6px' : '0', fontWeight: l.cta ? 600 : 400 }}>{l.label}</a>
        ))}
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '0.5px solid var(--gold-faint)', padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
      <span style={{ fontSize: '11px', color: 'rgba(227,218,201,0.28)' }}>mattmcclay.com  ·  Lynchburg, VA  ·  FAA Part 107 Certified</span>
      <span style={{ fontSize: '11px', color: 'var(--gold-dim)', letterSpacing: '0.06em' }}>Commercial  ·  Construction  ·  Architecture</span>
    </footer>
  )
}

export default function Booking() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', address: '', pkg: 'Soar', date: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]   = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim())         e.name    = true
    if (!form.email.includes('@')) e.email   = true
    if (!form.address.trim())      e.address = true
    if (!form.date)                e.date    = true
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitted(true)
  }

  const field = (f) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `0.5px solid ${errors[f] ? '#f87171' : 'rgba(227,218,201,0.15)'}`,
    borderRadius: '8px',
    padding: '14px 16px',
    fontSize: '14px',
    color: 'var(--bone)',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: "'DM Sans', sans-serif",
  })

  const label = { fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pearl)', marginBottom: '7px', display: 'block' }

  if (submitted) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--navy-dark)' }}>
      <Nav />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', textAlign: 'center' }}>
        <div>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '1.5px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '24px', color: 'var(--gold)' }}>✓</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '38px', color: 'var(--bone)', marginBottom: '16px' }}>You're booked.</h1>
          <p style={{ fontSize: '16px', color: 'var(--bone-dim)', maxWidth: '360px', margin: '0 auto 36px', lineHeight: 1.8 }}>
            Matt will confirm within the hour.<br />Check your inbox for next steps.
          </p>
          <a href="/" style={{ background: 'var(--gold)', color: 'var(--navy-dark)', borderRadius: '8px', padding: '14px 32px', fontSize: '14px', fontWeight: 600 }}>Back to home</a>
        </div>
      </div>
      <Footer />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--navy-dark)' }}>
      <Nav />

      <main style={{ flex: 1, maxWidth: '680px', margin: '0 auto', padding: '72px 48px', width: '100%' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '18px' }}>Book a Shoot</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '42px', color: 'var(--bone)', marginBottom: '12px' }}>
          Let's fly your property.
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--bone-dim)', marginBottom: '52px', lineHeight: 1.8 }}>
          Fill in the details below. Matt confirms within the hour.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={label}>Your Name {errors.name && <span style={{ color: '#f87171' }}>*</span>}</label>
              <input style={field('name')} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Jane Smith" />
            </div>
            <div>
              <label style={label}>Email {errors.email && <span style={{ color: '#f87171' }}>*</span>}</label>
              <input style={field('email')} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="jane@brokerage.com" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={label}>Phone (optional)</label>
              <input style={field('phone')} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="434-555-0100" />
            </div>
            <div>
              <label style={label}>Preferred Date {errors.date && <span style={{ color: '#f87171' }}>*</span>}</label>
              <input type="date" style={field('date')} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
            </div>
          </div>

          <div>
            <label style={label}>Property Address {errors.address && <span style={{ color: '#f87171' }}>*</span>}</label>
            <input style={field('address')} value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="3200 Candlers Mountain Rd, Lynchburg, VA" />
          </div>

          <div>
            <label style={label}>Package</label>
            <select value={form.pkg} onChange={e => setForm(p => ({ ...p, pkg: e.target.value }))}
              style={{ ...field('pkg'), cursor: 'pointer' }}>
              <optgroup label="Residential / Mixed">
                <option value="Scout">Scout — $249 · Photos, 48-hr</option>
                <option value="Soar">Soar — $449 · Photos + video + social</option>
                <option value="Nest Builder">Nest Builder — $699 · Twilight + branded</option>
              </optgroup>
              <optgroup label="Commercial">
                <option value="Commercial Real Estate">Commercial Real Estate — from $1,000</option>
                <option value="Construction Documentation">Construction Documentation — from $2,500/mo</option>
                <option value="Architecture & Design">Architecture & Design — from $800</option>
                <option value="Territory Retainer">Territory Retainer — from $1,500/mo</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label style={label}>Notes (optional)</label>
            <textarea rows={4} style={{ ...field('notes'), resize: 'vertical' }}
              value={form.notes}
              onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
              placeholder="Access instructions, specific angles, deadlines, anything useful." />
          </div>

          {Object.keys(errors).length > 0 && (
            <p style={{ fontSize: '12px', color: '#f87171', textAlign: 'center' }}>Please fill in all required fields above.</p>
          )}

          <button onClick={handleSubmit} style={{ background: 'var(--gold)', color: 'var(--navy-dark)', border: 'none', borderRadius: '8px', padding: '17px', fontSize: '15px', fontWeight: 700, letterSpacing: '0.02em', marginTop: '6px' }}>
            Submit booking request
          </button>

          <p style={{ fontSize: '11px', color: 'rgba(227,218,201,0.28)', textAlign: 'center' }}>
            Matt confirms within the hour during business hours.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
