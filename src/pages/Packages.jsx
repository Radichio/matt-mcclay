import { useState } from 'react'

const NAV_LINKS = [
  { href: '/about',    label: 'About' },
  { href: '/packages', label: 'Packages', active: true },
  { href: '/booking',  label: 'Book a Shoot', cta: true },
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

const PACKAGES = [
  {
    name: 'Scout', price: 249, tag: 'Entry',
    border: 'var(--bone-faint)', bg: 'rgba(255,255,255,0.03)',
    includes: ['25 edited aerial photos','48-hour delivery','Digital download portal','MLS-ready resolution'],
    ideal: 'Residential listings, land parcels',
  },
  {
    name: 'Soar', price: 449, tag: 'Most Popular', hot: true,
    border: 'var(--gold-dim)', bg: 'rgba(218,145,0,0.06)',
    includes: ['40 edited aerial photos','Aerial walkthrough video (90 sec)','3 social media cut-downs','24-hour delivery','Digital download portal','Branded file set'],
    ideal: 'Commercial listings, mid-market residential',
  },
  {
    name: 'Nest Builder', price: 699, tag: 'Premium',
    border: 'var(--clay-dim)', bg: 'rgba(189,92,0,0.06)',
    includes: ['50 edited aerial photos','Twilight / golden hour session','Full video walkthrough','Social cuts + Reels','Branded one-pager PDF','24-hour delivery'],
    ideal: 'High-value listings, broker marketing',
  },
  {
    name: 'Territory', price: 1500, tag: 'Commercial', priceLabel: 'From $1,500',
    border: 'rgba(176,183,190,0.25)', bg: 'rgba(19,57,81,0.5)',
    includes: ['Commercial real estate packages','Construction progress documentation','Architecture & development sites','Monthly retainer options','Priority scheduling','Custom deliverables'],
    ideal: 'Brokers, developers, construction firms',
  },
]

const ADDONS = [
  { name: 'Extra photos (+15)',     price: 75  },
  { name: 'Rush delivery (6 hrs)', price: 100 },
  { name: 'Interior photography',  price: 149 },
  { name: 'Branded graphics',      price: 79  },
  { name: 'Extended video (3 min)',price: 100 },
  { name: 'Twilight add-on',       price: 149 },
]

export default function Packages() {
  const [base, setBase]     = useState('Soar')
  const [addons, setAddons] = useState([])

  const basePkg   = PACKAGES.find(p => p.name === base)
  const basePrice = basePkg?.price || 0
  const addonTotal= addons.reduce((s, a) => s + (ADDONS.find(x => x.name === a)?.price || 0), 0)
  const total     = basePrice + addonTotal

  function toggleAddon(name) {
    setAddons(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name])
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--navy-dark)' }}>
      <Nav />

      <main style={{ flex: 1, padding: '72px 48px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', textAlign: 'center' }}>Packages</p>
        <h1 style={{ fontSize: '44px', color: 'var(--bone)', textAlign: 'center', marginBottom: '12px' }}>Straightforward pricing.</h1>
        <p style={{ fontSize: '15px', color: 'var(--bone-dim)', textAlign: 'center', marginBottom: '60px' }}>No surprises. No hidden fees. Delivered on time.</p>

        {/* Package cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '72px' }}>
          {PACKAGES.map(pkg => (
            <div key={pkg.name} style={{ background: pkg.bg, border: `0.5px solid ${pkg.border}`, borderRadius: '14px', padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '18px' }}>
                <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold)', marginBottom: '7px' }}>{pkg.tag}</p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', color: 'var(--bone)', marginBottom: '5px' }}>{pkg.name}</p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '30px', color: 'var(--bone)' }}>{pkg.priceLabel || `$${pkg.price}`}</p>
              </div>
              <ul style={{ listStyle: 'none', flex: 1, marginBottom: '20px' }}>
                {pkg.includes.map(item => (
                  <li key={item} style={{ fontSize: '12px', color: 'var(--bone-dim)', lineHeight: 1.65, paddingLeft: '14px', position: 'relative', marginBottom: '5px' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ borderTop: '0.5px solid var(--bone-faint)', paddingTop: '12px' }}>
                <p style={{ fontSize: '10px', color: 'var(--pearl)', letterSpacing: '0.04em' }}>Ideal for: {pkg.ideal}</p>
              </div>
            </div>
          ))}
        </div>

        {/* QUOTE BUILDER */}
        <div style={{ background: 'rgba(218,145,0,0.05)', border: '0.5px solid var(--gold-faint)', borderRadius: '16px', padding: '48px', marginBottom: '72px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pearl)', marginBottom: '14px', textAlign: 'center' }}>Build your shoot</p>
          <h2 style={{ fontSize: '32px', color: 'var(--bone)', marginBottom: '36px', textAlign: 'center' }}>Get an instant quote.</h2>

          {/* Base selector */}
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pearl)', marginBottom: '12px' }}>1. Choose your base package</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {PACKAGES.filter(p => p.name !== 'Territory').map(pkg => (
              <button key={pkg.name} onClick={() => setBase(pkg.name)} style={{ background: base === pkg.name ? 'var(--gold)' : 'rgba(255,255,255,0.04)', color: base === pkg.name ? 'var(--navy-dark)' : 'var(--bone-dim)', border: `0.5px solid ${base === pkg.name ? 'var(--gold)' : 'var(--bone-faint)'}`, borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: base === pkg.name ? 600 : 400 }}>
                {pkg.name} — ${pkg.price}
              </button>
            ))}
          </div>

          {/* Add-ons */}
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pearl)', marginBottom: '12px' }}>2. Add extras (optional)</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
            {ADDONS.map(a => (
              <button key={a.name} onClick={() => toggleAddon(a.name)} style={{ background: addons.includes(a.name) ? 'var(--clay-dim)' : 'rgba(255,255,255,0.04)', color: addons.includes(a.name) ? 'var(--bone)' : 'var(--bone-dim)', border: `0.5px solid ${addons.includes(a.name) ? 'var(--clay)' : 'var(--bone-faint)'}`, borderRadius: '8px', padding: '9px 16px', fontSize: '12px' }}>
                {a.name} +${a.price}
              </button>
            ))}
          </div>

          {/* Total */}
          <div style={{ borderTop: '0.5px solid var(--gold-dim)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '11px', color: 'var(--pearl)', marginBottom: '4px' }}>Your estimate</p>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', color: 'var(--gold)' }}>${total}</p>
            </div>
            <a href={`/booking?pkg=${encodeURIComponent(base)}`} style={{ background: 'var(--gold)', color: 'var(--navy-dark)', borderRadius: '8px', padding: '16px 32px', fontSize: '15px', fontWeight: 600 }}>Book this shoot</a>
          </div>
        </div>

        {/* Add-ons detail grid */}
        <h2 style={{ fontSize: '28px', color: 'var(--bone)', marginBottom: '24px' }}>Add-ons</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '64px' }}>
          {ADDONS.map(a => (
            <div key={a.name} style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid var(--bone-faint)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--bone)' }}>{a.name}</p>
                <p style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 600 }}>+${a.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
