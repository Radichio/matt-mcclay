const NAV_LINKS = [
  { href: '/about',    label: 'About',       active: true },
  { href: '/packages', label: 'Packages' },
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

export default function About() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--navy-dark)' }}>
      <Nav />

      <main style={{ flex: 1, maxWidth: '760px', margin: '0 auto', padding: '80px 48px', width: '100%' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>About</p>
        <h1 style={{ fontSize: '46px', color: 'var(--bone)', lineHeight: 1.15, marginBottom: '36px' }}>
          Commercial aerial photography<br />done right, the first time.
        </h1>
        <p style={{ fontSize: '17px', color: 'var(--bone-dim)', lineHeight: 1.85, marginBottom: '24px' }}>
          Matt McClay is a FAA Part 107 certified commercial drone pilot and graphic designer
          based in Lynchburg, Virginia. He works with commercial real estate brokers, developers,
          architects, and construction companies across Central Virginia who need professional
          aerial media that moves listings and documents projects.
        </p>
        <p style={{ fontSize: '17px', color: 'var(--bone-dim)', lineHeight: 1.85, marginBottom: '56px' }}>
          The background in design is what separates the work. Matt approaches every shoot
          thinking about composition, story, and end use — not just airspace clearance.
          Fast turnaround, consistent quality, no travel fees across the region.
        </p>

        {/* Facts grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '28px', marginBottom: '64px' }}>
          {[
            { label: 'Based in',      value: 'Lynchburg, VA' },
            { label: 'Coverage',      value: 'Central Virginia' },
            { label: 'Certification', value: 'FAA Part 107' },
            { label: 'Insurance',     value: 'Fully insured' },
            { label: 'Turnaround',    value: '24 hrs standard' },
            { label: 'First shoot',   value: 'Complimentary' },
          ].map(f => (
            <div key={f.label} style={{ borderTop: '0.5px solid var(--gold-dim)', paddingTop: '14px' }}>
              <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--pearl)', marginBottom: '6px' }}>{f.label}</p>
              <p style={{ fontSize: '15px', color: 'var(--bone)', fontWeight: 500 }}>{f.value}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <h2 style={{ fontSize: '30px', color: 'var(--bone)', marginBottom: '32px' }}>How it works</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { step: '01', title: 'You reach out',           body: 'Email, call, or book through the site. Matt responds within the hour during business hours.' },
            { step: '02', title: 'We confirm the details',  body: 'Property address, preferred date, package. Simple and quick.' },
            { step: '03', title: 'Shoot day',               body: 'Matt arrives on time, flies the property, captures everything in the package. Typical shoot: 45–60 minutes.' },
            { step: '04', title: 'Delivered in 24 hours',  body: 'Photos, video, and social cuts in your download portal. Share the link directly with your client or seller.' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: '24px', padding: '28px 0', borderBottom: i < arr.length - 1 ? '0.5px solid var(--bone-faint)' : 'none' }}>
              <div style={{ flexShrink: 0, width: '34px', height: '34px', borderRadius: '50%', border: '0.5px solid var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--gold)' }}>{item.step}</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '17px', color: 'var(--bone)', marginBottom: '8px' }}>{item.title}</p>
                <p style={{ fontSize: '14px', color: 'var(--bone-dim)', lineHeight: 1.75 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '56px', padding: '40px', background: 'var(--gold-faint)', border: '0.5px solid var(--gold-dim)', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', color: 'var(--bone)', marginBottom: '12px' }}>Ready to see what your listing looks like from above?</p>
          <a href="/booking" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--navy-dark)', borderRadius: '8px', padding: '14px 32px', fontSize: '14px', fontWeight: 600, marginTop: '8px' }}>Book a shoot</a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
