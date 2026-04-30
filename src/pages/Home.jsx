import { useState } from 'react'

const NAV_LINKS = [
  { href: '/about',    label: 'About' },
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
    <footer style={{
      borderTop: '0.5px solid var(--gold-faint)',
      padding: '20px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '8px',
    }}>
      <span style={{ fontSize: '11px', color: 'rgba(227,218,201,0.28)' }}>
        mattmcclay.com  ·  Lynchburg, VA  ·  FAA Part 107 Certified
      </span>
      <span style={{ fontSize: '11px', color: 'var(--gold-dim)', letterSpacing: '0.06em' }}>
        Commercial  ·  Construction  ·  Architecture
      </span>
    </footer>
  )
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--navy-dark)' }}>
      <Nav />

      {/* HERO */}
      <section style={{ padding: '100px 48px 80px', textAlign: 'center', maxWidth: '820px', margin: '0 auto', width: '100%' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '28px' }}>
          Lynchburg, VA  ·  Central Virginia
        </p>
        <h1 style={{ fontSize: '58px', lineHeight: 1.12, color: 'var(--bone)', marginBottom: '28px' }}>
          Aerial media for<br />
          real estate, development<br />
          <em style={{ color: 'var(--gold)' }}>&amp; architecture.</em>
        </h1>
        <p style={{ fontSize: '17px', color: 'var(--bone-dim)', maxWidth: '460px', margin: '0 auto 44px', lineHeight: 1.8 }}>
          Commercial photography, fast video, for agents, brokers,
          developers and designers — Lynchburg, Richmond, and surrounding areas.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <a href="/booking" style={{ background: 'var(--gold)', color: 'var(--navy-dark)', borderRadius: '8px', padding: '16px 38px', fontSize: '15px', fontWeight: 600, letterSpacing: '0.02em' }}>
            Book a shoot
          </a>
          <a href="/packages" style={{ background: 'transparent', color: 'var(--bone)', border: '0.5px solid var(--bone-faint)', borderRadius: '8px', padding: '16px 38px', fontSize: '15px' }}>
            See packages
          </a>
        </div>
        <p style={{ fontSize: '12px', color: 'rgba(227,218,201,0.3)' }}>
          First shoot complimentary — no strings, no obligation.
        </p>
      </section>

      {/* SERVICES STRIP */}
      <section style={{ borderTop: '0.5px solid var(--gold-faint)', borderBottom: '0.5px solid var(--gold-faint)', padding: '28px 48px', display: 'flex', justifyContent: 'center', gap: '56px', flexWrap: 'wrap' }}>
        {[
          { label: 'Commercial Real Estate', sub: 'Listings that close faster' },
          { label: 'Construction Progress',  sub: 'Document every stage' },
          { label: 'Architecture & Design',  sub: 'Showcase the build' },
          { label: 'FAA Part 107 Certified', sub: 'Fully insured' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>{s.label}</p>
            <p style={{ fontSize: '11px', color: 'var(--bone-dim)' }}>{s.sub}</p>
          </div>
        ))}
      </section>

      {/* AERIAL MAP DEMO */}
      <section style={{ padding: '88px 48px', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pearl)', marginBottom: '16px' }}>What you've been missing</p>
        <h2 style={{ fontSize: '40px', color: 'var(--bone)', marginBottom: '14px' }}>
          See what your listings<br />look like from above.
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--bone-dim)', maxWidth: '380px', margin: '0 auto 48px', lineHeight: 1.75 }}>
          One aerial shoot changes how a property is perceived before a buyer ever steps inside.
        </p>

        {/* Property card visual */}
        <div style={{ maxWidth: '700px', margin: '0 auto', background: 'rgba(255,255,255,0.04)', border: '0.5px solid var(--gold-dim)', borderRadius: '14px', overflow: 'hidden' }}>
          {/* Real aerial photo */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src="/property_aerial.jpg" alt="Commercial property aerial view" style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'var(--gold)', color: 'var(--navy-dark)', padding: '7px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>Aerial view</div>
          </div>
          <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--bone)', marginBottom: '3px' }}>3200 Candlers Mountain Rd</p>
              <p style={{ fontSize: '11px', color: 'var(--pearl)' }}>Lynchburg, VA  ·  Commercial</p>
            </div>
            <a href="/booking" style={{ background: 'var(--gold)', color: 'var(--navy-dark)', borderRadius: '6px', padding: '10px 20px', fontSize: '12px', fontWeight: 600 }}>Book this</a>
          </div>
        </div>
      </section>

      {/* WHY MATT */}
      <section style={{ padding: '0 48px 88px', maxWidth: '960px', margin: '0 auto', width: '100%' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pearl)', marginBottom: '16px', textAlign: 'center' }}>Not just a drone pilot</p>
        <h2 style={{ fontSize: '38px', color: 'var(--bone)', marginBottom: '52px', textAlign: 'center' }}>
          Beyond the listing photo.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '36px' }}>
          {[
            { title: 'Designer first. Pilot second.', body: 'Matt spent years in graphic design before earning Part 107. He thinks about composition, light, and story — not just airspace.' },
            { title: '24-hour turnaround. Guaranteed.', body: 'Every shoot is edited and delivered to your portal the next day. No follow-up emails. No chasing.' },
            { title: 'Branded on every asset.', body: 'Logo overlays, formatted for MLS, social, and print. Every package includes delivery-ready files.' },
            { title: 'Weather managed proactively.', body: 'Matt monitors conditions and contacts you if there\'s an issue — no last-minute scrambles on shoot day.' },
            { title: 'Every format, ready to use.', body: 'MLS-resolution photos, Lightroom-edited. Video for YouTube, Reels, TikTok. One package, nothing to figure out.' },
          ].map((c, i) => (
            <div key={i} style={{ borderTop: '1.5px solid var(--gold-dim)', paddingTop: '18px' }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '16px', color: 'var(--bone)', marginBottom: '9px', lineHeight: 1.3 }}>{c.title}</p>
              <p style={{ fontSize: '13px', color: 'var(--bone-dim)', lineHeight: 1.75 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK QUOTE BUILDER */}
      <section style={{ background: 'rgba(218,145,0,0.05)', borderTop: '0.5px solid var(--gold-faint)', borderBottom: '0.5px solid var(--gold-faint)', padding: '72px 48px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pearl)', marginBottom: '16px' }}>Build your shoot</p>
          <h2 style={{ fontSize: '36px', color: 'var(--bone)', marginBottom: '12px' }}>Every format. Delivered.</h2>
          <p style={{ fontSize: '14px', color: 'var(--bone-dim)', marginBottom: '40px', lineHeight: 1.7 }}>
            Every Soar and above package includes what you need — formatted for MLS, social, and print — straight from the download link.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['Photos', 'Aerial video', 'Social cuts', 'Branded files'].map(f => (
              <span key={f} style={{ background: 'var(--gold-faint)', border: '0.5px solid var(--gold-dim)', borderRadius: '20px', padding: '8px 18px', fontSize: '12px', color: 'var(--gold)', fontWeight: 500 }}>{f}</span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '32px', textAlign: 'left' }}>
            {[
              'Aerial + design feed',
              'YouTube / Shorts ready',
              'MLS-ready resolution',
              'Reels + TikTok cut',
              'Client download portal',
              'Print-ready versions',
            ].map(i => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: 'var(--gold)', fontSize: '14px' }}>·</span>
                <span style={{ fontSize: '13px', color: 'var(--bone-dim)' }}>{i}</span>
              </div>
            ))}
          </div>
          <a href="/packages" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--navy-dark)', borderRadius: '8px', padding: '14px 32px', fontSize: '14px', fontWeight: 600 }}>
            See all packages
          </a>
        </div>
      </section>

      {/* SHOOT STATUS STRIP */}
      <section style={{ padding: '72px 48px', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pearl)', marginBottom: '16px' }}>Shoot tracking</p>
        <h2 style={{ fontSize: '36px', color: 'var(--bone)', marginBottom: '12px' }}>Always know where your shoot stands.</h2>
        <p style={{ fontSize: '14px', color: 'var(--bone-dim)', maxWidth: '380px', margin: '0 auto 40px', lineHeight: 1.75 }}>
          Every shoot gets a status email. No chasing emails. No guessing.
        </p>
        <div style={{ display: 'flex', gap: '0', justifyContent: 'center', maxWidth: '600px', margin: '0 auto', flexWrap: 'wrap' }}>
          {[
            { label: 'Booked',    active: true  },
            { label: 'Confirmed', active: true  },
            { label: 'Shoot day', active: true  },
            { label: 'Editing',   active: false },
            { label: 'Delivered', active: false },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: s.active ? 'var(--gold)' : 'rgba(255,255,255,0.06)', border: `1.5px solid ${s.active ? 'var(--gold)' : 'var(--bone-faint)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.active && <span style={{ color: 'var(--navy-dark)', fontSize: '14px', fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ fontSize: '10px', color: s.active ? 'var(--gold)' : 'var(--bone-faint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</span>
              </div>
              {i < arr.length - 1 && <div style={{ width: '48px', height: '1px', background: s.active ? 'var(--gold-dim)' : 'var(--bone-faint)', margin: '0 4px', marginBottom: '24px' }} />}
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES PREVIEW */}
      <section style={{ padding: '0 48px 88px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pearl)', marginBottom: '16px', textAlign: 'center' }}>Packages</p>
          <h2 style={{ fontSize: '36px', color: 'var(--bone)', marginBottom: '44px', textAlign: 'center' }}>Beyond the listing photo.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '36px' }}>
            {[
              { name: 'Scout',        price: '$249',    sub: 'Photos only. 48-hr.', hot: false },
              { name: 'Soar',         price: '$449',    sub: 'Photos + video + social. 24-hr.', hot: true  },
              { name: 'Nest Builder', price: '$699',    sub: 'Twilight + branded one-pager.', hot: false },
              { name: 'Territory',    price: '$1,500+', sub: 'Commercial, construction, retainers.', hot: false },
            ].map(pkg => (
              <div key={pkg.name} style={{ background: pkg.hot ? 'rgba(218,145,0,0.07)' : 'rgba(255,255,255,0.03)', border: `0.5px solid ${pkg.hot ? 'var(--gold-dim)' : 'var(--bone-faint)'}`, borderRadius: '12px', padding: '22px 20px' }}>
                <p style={{ fontSize: '10px', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {pkg.name}{pkg.hot ? '  —  Popular' : ''}
                </p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '26px', color: 'var(--bone)', marginBottom: '8px' }}>{pkg.price}</p>
                <p style={{ fontSize: '12px', color: 'rgba(227,218,201,0.4)', lineHeight: 1.5 }}>{pkg.sub}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="/packages" style={{ fontSize: '13px', color: 'var(--gold)', letterSpacing: '0.06em', borderBottom: '0.5px solid var(--gold-dim)', paddingBottom: '2px' }}>
              See full package details →
            </a>
          </div>
        </div>
      </section>

      {/* TERRITORY CTA */}
      <section style={{ background: 'rgba(19,57,81,0.6)', border: '0.5px solid var(--navy-light)', margin: '0 48px 88px', borderRadius: '16px', padding: '56px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pearl)', marginBottom: '16px' }}>Territory</p>
          <h2 style={{ fontSize: '36px', color: 'var(--bone)', marginBottom: '16px', lineHeight: 1.2 }}>
            For clients who<br /><em style={{ color: 'var(--gold)' }}>need more.</em>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--bone-dim)', lineHeight: 1.8, marginBottom: '28px' }}>
            Territory is Matt McClay's ongoing relationship tier for commercial brokerages,
            construction firms, and architecture practices. Monthly aerial documentation,
            priority scheduling, and a permanent aerial presence for your portfolio.
          </p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', color: 'var(--bone)', marginBottom: '24px' }}>$1,500+</p>
          <a href="/booking" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--navy-dark)', borderRadius: '8px', padding: '14px 28px', fontSize: '14px', fontWeight: 600 }}>
            Request a consultation
          </a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            'Monthly progress documentation',
            'Priority scheduling — always first',
            'On-going project aerial library',
            'Architecture & design feed content',
            'Branded social content monthly',
            'Retainer pricing — fixed monthly cost',
          ].map(f => (
            <div key={f} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--gold)', marginTop: '1px', flexShrink: 0 }}>·</span>
              <span style={{ fontSize: '13px', color: 'var(--bone-dim)', lineHeight: 1.6 }}>{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '88px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '44px', color: 'var(--bone)', marginBottom: '16px', lineHeight: 1.2 }}>
          Every project deserves<br />to be <em style={{ color: 'var(--gold)' }}>seen properly.</em>
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--bone-dim)', maxWidth: '380px', margin: '0 auto 36px', lineHeight: 1.8 }}>
          Whether it's a listing, a development site, or long-term documentation — it starts with a single shoot.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/booking"  style={{ background: 'var(--gold)', color: 'var(--navy-dark)', borderRadius: '8px', padding: '16px 36px', fontSize: '15px', fontWeight: 600 }}>Book a shoot</a>
          <a href="/packages" style={{ background: 'transparent', color: 'var(--bone)', border: '0.5px solid var(--bone-faint)', borderRadius: '8px', padding: '16px 36px', fontSize: '15px' }}>See all packages</a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
