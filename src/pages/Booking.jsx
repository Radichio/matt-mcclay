import { useState, useEffect, useRef } from 'react'

const C = { navy:'#133951',dark:'#0d2535',gold:'#DA9100',pearl:'#B0B7BE',bone:'#E3DAC9',clay:'#BD5C00' }
const gridBg = `linear-gradient(rgba(218,145,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(218,145,0,0.04) 1px, transparent 1px)`

// ── Regions ───────────────────────────────────────────────────────────────────
const REGIONS = {
  VA: { label:'Virginia',       city:'Lynchburg, VA',    lat:37.4138, lon:-79.1422 },
  WV: { label:'West Virginia',  city:'Charleston, WV',   lat:38.3498, lon:-81.6326 },
  NC: { label:'North Carolina', city:'Raleigh, NC',      lat:35.7796, lon:-78.6382 },
}

// ── Flight condition logic ────────────────────────────────────────────────────
function flightCondition(period) {
  if (!period) return 'unknown'
  const wind = parseInt(period.windSpeed) || 0
  const rain = period.probabilityOfPrecipitation?.value || 0
  const isDaytime = period.isDaytime
  if (!isDaytime) return 'night'
  if (wind > 20 || rain > 50) return 'bad'
  if (wind > 14 || rain > 25) return 'marginal'
  return 'good'
}

const COND_COLOR = { good:'#2d6a4f', marginal:'#BD5C00', bad:'rgba(180,40,40,0.8)', night:'rgba(176,183,190,0.2)', unknown:'rgba(176,183,190,0.2)' }
const COND_LABEL = { good:'Good', marginal:'Marginal', bad:'Poor', night:'—', unknown:'—' }

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 48px',background:'rgba(13,37,53,0.72)',backdropFilter:'blur(16px)',borderBottom:'0.5px solid rgba(218,145,0,0.15)'}}>
      <a href="/"><img src="/logo.svg" alt="Matt McClay + Associates" style={{width:'300px',height:'auto',opacity:1}}/></a>
      <div style={{display:'flex',gap:'32px',alignItems:'center'}}>
        <a href="/events" style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.bone,opacity:0.7}}>Events</a>
        <a href="/about"    style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.bone,opacity:0.7}}>About</a>
        <a href="/packages" style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.bone,opacity:0.7}}>Packages</a>
        <a href="/booking"  style={{background:C.gold,color:C.dark,borderRadius:'6px',padding:'10px 22px',fontSize:'11px',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase'}}>Book a flight</a>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer style={{borderTop:'0.5px solid rgba(218,145,0,0.1)',padding:'20px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'8px'}}>
      <span style={{fontSize:'11px',color:'rgba(227,218,201,0.25)'}}>mattmcclay.com  ·  Lynchburg, VA  </span>
      <span style={{fontSize:'11px',color:'rgba(218,145,0,0.5)',letterSpacing:'0.06em'}}>Virginia  ·  West Virginia  ·  North Carolina</span>
    </footer>
  )
}

// ── Weather strip ─────────────────────────────────────────────────────────────
function WeatherStrip({ region }) {
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!region) return
    const r = REGIONS[region]
    setLoading(true)
    setError(null)
    setDays([])

    fetch(`https://api.weather.gov/points/${r.lat},${r.lon}`, {
      headers: { 'User-Agent': 'MattMcClayDrone/1.0' }
    })
      .then(res => res.json())
      .then(data => fetch(data.properties.forecast, { headers: { 'User-Agent': 'MattMcClayDrone/1.0' } }))
      .then(res => res.json())
      .then(data => {
        const periods = data.properties.periods.filter(p => p.isDaytime).slice(0, 7)
        setDays(periods)
        setLoading(false)
      })
      .catch(() => {
        setError('Weather unavailable — check back closer to your date.')
        setLoading(false)
      })
  }, [region])

  if (!region) return null

  const wIcon = (period) => {
    const desc = (period.shortForecast || '').toLowerCase()
    if (desc.includes('sunny') || desc.includes('clear')) return '☀️'
    if (desc.includes('partly')) return '⛅'
    if (desc.includes('cloud') || desc.includes('overcast')) return '☁️'
    if (desc.includes('rain') || desc.includes('shower') || desc.includes('drizzle')) return '🌧️'
    if (desc.includes('storm') || desc.includes('thunder')) return '⛈️'
    if (desc.includes('snow')) return '🌨️'
    if (desc.includes('fog') || desc.includes('mist')) return '🌫️'
    if (desc.includes('wind')) return '💨'
    return '🌤️'
  }

  return (
    <div style={{marginBottom:'40px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px',flexWrap:'wrap',gap:'8px'}}>
        <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl}}>
          7-Day Forecast — {REGIONS[region].city}
        </p>
        <p style={{fontSize:'11px',color:'rgba(227,218,201,0.35)'}}>
          Matt monitors conditions 72 hrs before your shoot
        </p>
      </div>

      {loading && (
        <div style={{padding:'24px',textAlign:'center',background:'rgba(255,255,255,0.03)',borderRadius:'10px',border:'0.5px solid rgba(227,218,201,0.08)'}}>
          <p style={{fontSize:'13px',color:'rgba(227,218,201,0.4)'}}>Loading forecast…</p>
        </div>
      )}

      {error && (
        <div style={{padding:'16px',background:'rgba(255,255,255,0.03)',borderRadius:'10px',border:'0.5px solid rgba(227,218,201,0.08)'}}>
          <p style={{fontSize:'12px',color:'rgba(227,218,201,0.4)',textAlign:'center'}}>{error}</p>
        </div>
      )}

      {!loading && !error && days.length > 0 && (
        <div style={{display:'grid',gridTemplateColumns:`repeat(${days.length},1fr)`,gap:'6px'}}>
          {days.map((d, i) => {
            const cond = flightCondition(d)
            const date = new Date(d.startTime)
            const dayName = date.toLocaleDateString('en-US',{weekday:'short'})
            const dayNum  = date.toLocaleDateString('en-US',{month:'short',day:'numeric'})
            return (
              <div key={i} style={{
                background:'rgba(255,255,255,0.04)',
                border:`0.5px solid rgba(227,218,201,0.08)`,
                borderTop:`2px solid ${COND_COLOR[cond]}`,
                borderRadius:'8px',padding:'10px 6px',textAlign:'center',
                opacity: cond==='bad' ? 0.55 : 1,
              }}>
                <p style={{fontSize:'9px',fontWeight:700,color:C.pearl,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'2px'}}>{dayName}</p>
                <p style={{fontSize:'9px',color:'rgba(227,218,201,0.4)',marginBottom:'6px'}}>{dayNum}</p>
                <div style={{fontSize:'20px',marginBottom:'6px',lineHeight:1}}>{wIcon(d)}</div>
                <p style={{fontSize:'10px',color:C.bone,marginBottom:'4px'}}>{d.temperature}°{d.temperatureUnit}</p>
                <p style={{fontSize:'9px',color:'rgba(227,218,201,0.45)',marginBottom:'6px',lineHeight:1.3,minHeight:'24px'}}>{d.shortForecast}</p>
                <p style={{fontSize:'8px',color:C.pearl,marginBottom:'2px'}}>💨 {d.windSpeed}</p>
                <div style={{marginTop:'6px',padding:'3px 0',background:COND_COLOR[cond],borderRadius:'4px'}}>
                  <p style={{fontSize:'8px',fontWeight:700,color:'white',letterSpacing:'0.06em',textTransform:'uppercase'}}>{COND_LABEL[cond]}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <p style={{fontSize:'11px',color:'rgba(227,218,201,0.3)',marginTop:'10px',textAlign:'center'}}>
        Grayed days indicate poor flight conditions (wind &gt;20 mph or rain &gt;50%). For dates beyond 7 days, Matt confirms weather closer to your shoot.
      </p>
    </div>
  )
}

// ── Availability Calendar ─────────────────────────────────────────────────────
function AvailabilityCalendar({ availability, selectedDate, onSelectDate }) {
  const today = new Date()
  today.setHours(0,0,0,0)
  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y=>y-1) }
    else setViewMonth(m=>m-1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y=>y+1) }
    else setViewMonth(m=>m+1)
  }

  function dateStr(y,m,d) {
    return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
  }

  function dateStatus(y,m,d) {
    const ds = dateStr(y,m,d)
    if (availability.bookedDates?.includes(ds))      return 'booked'
    if (availability.holdDates?.includes(ds))        return 'hold'
    if (availability.unavailableDates?.includes(ds)) return 'unavailable'
    return 'available'
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate()
  const cells = []
  for (let i=0; i<firstDay; i++) cells.push(null)
  for (let d=1; d<=daysInMonth; d++) cells.push(d)

  const isPast = (d) => {
    const dt = new Date(viewYear, viewMonth, d)
    dt.setHours(0,0,0,0)
    return dt < today
  }

  const STATUS_STYLE = {
    available:   { bg:'rgba(45,106,79,0.25)',   border:'rgba(45,106,79,0.6)',   color:C.bone,  cursor:'pointer' },
    booked:      { bg:'rgba(180,40,40,0.25)',    border:'rgba(180,40,40,0.5)',   color:'rgba(227,218,201,0.4)', cursor:'not-allowed' },
    hold:        { bg:'rgba(189,92,0,0.25)',     border:'rgba(189,92,0,0.6)',    color:'rgba(227,218,201,0.4)', cursor:'not-allowed' },
    unavailable: { bg:'rgba(176,183,190,0.1)',   border:'rgba(176,183,190,0.2)', color:'rgba(227,218,201,0.3)', cursor:'not-allowed' },
    past:        { bg:'transparent',             border:'transparent',           color:'rgba(227,218,201,0.15)',cursor:'default' },
  }

  return (
    <div style={{marginBottom:'40px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
        <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl}}>
          Availability Calendar
        </p>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <button onClick={prevMonth} style={{background:'none',border:'none',color:C.gold,fontSize:'18px',cursor:'pointer',padding:'4px 8px',lineHeight:1}}>‹</button>
          <span style={{fontSize:'13px',color:C.bone,fontWeight:500,minWidth:'140px',textAlign:'center'}}>{MONTHS[viewMonth]} {viewYear}</span>
          <button onClick={nextMonth} style={{background:'none',border:'none',color:C.gold,fontSize:'18px',cursor:'pointer',padding:'4px 8px',lineHeight:1}}>›</button>
        </div>
      </div>

      {/* Day headers */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'4px',marginBottom:'4px'}}>
        {DAYS.map(d=>(
          <div key={d} style={{textAlign:'center',fontSize:'9px',color:'rgba(227,218,201,0.35)',letterSpacing:'0.08em',textTransform:'uppercase',padding:'4px 0'}}>{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'4px'}}>
        {cells.map((d,i)=>{
          if (!d) return <div key={`e${i}`}/>
          const past = isPast(d)
          const status = past ? 'past' : dateStatus(viewYear, viewMonth, d)
          const ss = STATUS_STYLE[status]
          const ds = dateStr(viewYear, viewMonth, d)
          const isSelected = ds === selectedDate

          return (
            <div key={d}
              onClick={()=>{ if(status==='available') onSelectDate(ds) }}
              style={{
                background: isSelected ? C.gold : ss.bg,
                border:`1px solid ${isSelected ? C.gold : ss.border}`,
                borderRadius:'6px', padding:'8px 4px',
                textAlign:'center', cursor: ss.cursor,
                transition:'all 0.15s',
                boxShadow: isSelected ? '0 0 12px rgba(218,145,0,0.4)' : 'none',
              }}
            >
              <span style={{fontSize:'12px',color:isSelected?C.dark:ss.color,fontWeight:isSelected?700:400}}>{d}</span>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{display:'flex',gap:'16px',marginTop:'14px',flexWrap:'wrap'}}>
        {[
          {color:'rgba(45,106,79,0.6)',   label:'Available'},
          {color:'rgba(180,40,40,0.5)',   label:'Booked'},
          {color:'rgba(189,92,0,0.6)',    label:'On Hold'},
          {color:'rgba(176,183,190,0.2)', label:'Unavailable'},
        ].map(l=>(
          <div key={l.label} style={{display:'flex',alignItems:'center',gap:'6px'}}>
            <div style={{width:'10px',height:'10px',borderRadius:'2px',background:l.color,border:`1px solid ${l.color}`}}/>
            <span style={{fontSize:'10px',color:'rgba(227,218,201,0.45)'}}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Booking() {
  const [region, setRegion] = useState('VA')
  const [availability, setAvailability] = useState({ bookedDates:[], holdDates:[], unavailableDates:[], bookedLabels:{} })
  const [selectedDate, setSelectedDate] = useState('')
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', pkg:'Soar', notes:'' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  // Load availability
  useEffect(() => {
    fetch('/availability.json')
      .then(r => r.json())
      .then(setAvailability)
      .catch(() => {})
  }, [])

  // When date selected scroll to form
  function handleSelectDate(ds) {
    setSelectedDate(ds)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior:'smooth', block:'start' })
    }, 100)
  }

  function validate() {
    const e = {}
    if (!form.name.trim())         e.name    = true
    if (!form.email.includes('@')) e.email   = true
    if (!form.address.trim())      e.address = true
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitted(true)
  }

  const field = (f) => ({
    width:'100%', background:'rgba(255,255,255,0.05)',
    border:`0.5px solid ${errors[f]?'#f87171':'rgba(227,218,201,0.15)'}`,
    borderRadius:'8px', padding:'14px 16px', fontSize:'14px',
    color:C.bone, outline:'none', boxSizing:'border-box',
    fontFamily:"'DM Sans',sans-serif",
  })

  const labelStyle = {fontSize:'10px',textTransform:'uppercase',letterSpacing:'0.12em',color:C.pearl,marginBottom:'7px',display:'block'}

  if (submitted) return (
    <div style={{minHeight:'100vh',background:C.dark,display:'flex',flexDirection:'column'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:inherit;text-decoration:none}`}</style>
      <Nav/>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'60px 40px',textAlign:'center',marginTop:'160px'}}>
        <div>
          <div style={{width:'64px',height:'64px',borderRadius:'50%',border:`2px solid ${C.gold}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 28px',fontSize:'26px',color:C.gold,boxShadow:'0 0 32px rgba(218,145,0,0.3)'}}>✓</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'42px',color:C.bone,marginBottom:'16px'}}>You're booked.</h1>
          <p style={{fontSize:'16px',color:'rgba(227,218,201,0.55)',maxWidth:'360px',margin:'0 auto 12px',lineHeight:1.8}}>Matt will confirm within the hour.</p>
          {selectedDate && <p style={{fontSize:'13px',color:C.gold,marginBottom:'28px'}}>Requested date: {new Date(selectedDate+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>}
          <a href="/" style={{background:C.gold,color:C.dark,borderRadius:'8px',padding:'14px 32px',fontSize:'14px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase'}}>Back to home</a>
        </div>
      </div>
      <Footer/>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:C.dark,fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} a{color:inherit;text-decoration:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes subtleZoom{from{transform:scale(1.04)}to{transform:scale(1.07)}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        input:focus,select:focus,textarea:focus{border-color:rgba(218,145,0,0.5)!important}
        option{background:#0d2535;color:#E3DAC9}
      `}</style>

      <Nav/>

      {/* HERO */}
      <section style={{position:'relative',height:'42vh',minHeight:'360px',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{position:'absolute',inset:0,zIndex:0,backgroundImage:'url(/property_aerial.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%',animation:'subtleZoom 20s ease infinite alternate'}}/>
        <div style={{position:'absolute',inset:0,zIndex:1,background:'linear-gradient(to bottom,rgba(13,37,53,0.85) 0%,rgba(13,37,53,0.65) 50%,rgba(13,37,53,1) 100%)'}}/>
        <div style={{position:'absolute',inset:0,zIndex:2,backgroundImage:gridBg,backgroundSize:'40px 40px',opacity:0.5,pointerEvents:'none'}}/>
        <div style={{position:'absolute',left:0,right:0,height:'1px',zIndex:3,background:'linear-gradient(to right,transparent,rgba(218,145,0,0.12),transparent)',animation:'scanline 10s linear infinite',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:10,textAlign:'center',padding:'160px 24px 0'}}>
          <div style={{fontSize:'10px',letterSpacing:'0.22em',textTransform:'uppercase',color:C.gold,marginBottom:'20px',animation:'fadeUp 0.8s ease 0.2s both'}}>Book a flight</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(30px,5vw,54px)',lineHeight:1.1,color:C.bone,animation:'fadeUp 0.8s ease 0.4s both'}}>
            Let's fly your<br/><em style={{color:C.gold}}>property.</em>
          </h1>
        </div>
      </section>

      <main style={{maxWidth:'760px',margin:'0 auto',padding:'64px 48px 80px',width:'100%'}}>

        {/* REGION SELECTOR */}
        <div style={{marginBottom:'36px'}}>
          <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl,marginBottom:'12px'}}>
            Your Location
          </p>
          <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
            {Object.entries(REGIONS).map(([key,r])=>(
              <button key={key} onClick={()=>setRegion(key)} style={{
                background: region===key ? C.gold : 'rgba(255,255,255,0.05)',
                color: region===key ? C.dark : C.bone,
                border:`0.5px solid ${region===key ? C.gold : 'rgba(227,218,201,0.15)'}`,
                borderRadius:'8px', padding:'12px 28px', fontSize:'13px',
                fontWeight: region===key ? 700 : 400, cursor:'pointer',
                transition:'all 0.2s',
              }}>
                {r.label}
              </button>
            ))}
          </div>
          <p style={{fontSize:'11px',color:'rgba(227,218,201,0.35)',marginTop:'8px'}}>
            Matt covers Virginia, West Virginia, and North Carolina.
          </p>
        </div>

        {/* WEATHER STRIP */}
        <WeatherStrip region={region}/>

        {/* AVAILABILITY CALENDAR */}
        <AvailabilityCalendar
          availability={availability}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
        />

        {/* FORM */}
        <div ref={formRef} style={{
          background:'rgba(218,145,0,0.04)',
          border:'0.5px solid rgba(218,145,0,0.15)',
          borderRadius:'16px', padding:'36px',
          backgroundImage:gridBg, backgroundSize:'40px 40px',
        }}>
          <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl,marginBottom:'6px'}}>Your Details</p>
          {selectedDate && (
            <p style={{fontSize:'13px',color:C.gold,marginBottom:'20px',fontWeight:500}}>
              Selected date: {new Date(selectedDate+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
              <button onClick={()=>setSelectedDate('')} style={{background:'none',border:'none',color:'rgba(227,218,201,0.4)',fontSize:'12px',cursor:'pointer',marginLeft:'12px'}}>✕ clear</button>
            </p>
          )}

          <div style={{display:'flex',flexDirection:'column',gap:'18px'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
              <div>
                <label style={labelStyle}>Name {errors.name&&<span style={{color:'#f87171'}}>*</span>}</label>
                <input style={field('name')} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Jane Smith"/>
              </div>
              <div>
                <label style={labelStyle}>Email {errors.email&&<span style={{color:'#f87171'}}>*</span>}</label>
                <input style={field('email')} value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="jane@brokerage.com"/>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
              <div>
                <label style={labelStyle}>Phone (optional)</label>
                <input style={field('phone')} value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="434-555-0100"/>
              </div>
              <div>
                <label style={labelStyle}>Package</label>
                <select value={form.pkg} onChange={e=>setForm(p=>({...p,pkg:e.target.value}))} style={{...field('pkg'),cursor:'pointer'}}>
                  <optgroup label="Residential / Mixed">
                    <option value="Scout">Scout — $299</option>
                    <option value="Soar">Soar — $449</option>
                    <option value="Nest Builder">Nest Builder — $699</option>
                  </optgroup>
                  <optgroup label="Commercial">
                    <option value="Commercial Real Estate">Commercial Real Estate — from $1,000</option>
                    <option value="Construction Documentation">Construction — from $2,500/mo</option>
                    <option value="Architecture & Design">Architecture & Design — from $800</option>
                    <option value="Territory Retainer">Territory Retainer — from $1,495/mo</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Property Address {errors.address&&<span style={{color:'#f87171'}}>*</span>}</label>
              <input style={field('address')} value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} placeholder="Full property address including city and state"/>
            </div>

            <div>
              <label style={labelStyle}>Notes (optional)</label>
              <textarea rows={3} style={{...field('notes'),resize:'vertical'}} value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Preferred shoot time, access instructions, specific angles, add-ons…"/>
            </div>

            {Object.keys(errors).length > 0 && (
              <p style={{fontSize:'12px',color:'#f87171',textAlign:'center'}}>Please fill in the required fields above.</p>
            )}

            <button onClick={handleSubmit} style={{background:C.gold,color:C.dark,border:'none',borderRadius:'8px',padding:'17px',fontSize:'15px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase',cursor:'pointer',boxShadow:'0 0 32px rgba(218,145,0,0.2)'}}>
              Submit booking request
            </button>

            <p style={{fontSize:'11px',color:'rgba(227,218,201,0.25)',textAlign:'center'}}>Matt confirms within the hour · No payment required to book</p>
          </div>
        </div>

        {/* WHAT HAPPENS NEXT */}
        <div style={{marginTop:'64px'}}>
          <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl,marginBottom:'28px',textAlign:'center'}}>What happens next</p>
          {[
            {n:'01',t:'Matt confirms within the hour',       b:'You receive a confirmation with shoot details, what to expect, and any questions about the property.',accent:C.gold},
            {n:'02',t:'Weather monitored 72 hours out',      b:'Matt checks conditions before your shoot and proactively reaches out if anything is marginal. No surprises.',accent:C.clay},
            {n:'03',t:'Shoot day',                           b:'Matt arrives on time, flies the property, captures everything needed for your package. Typical shoot: 45–60 minutes.',accent:C.pearl},
            {n:'04',t:'Edited and delivered in 24 hours',   b:'Photos, video, and social cuts delivered to your private portal. Download everything or share the link directly.',accent:C.bone},
          ].map((s,i,arr)=>(
            <div key={i} style={{display:'flex',gap:'20px',padding:'24px 0',borderBottom:i<arr.length-1?'0.5px solid rgba(227,218,201,0.07)':'none'}}>
              <div style={{flexShrink:0,width:'34px',height:'34px',borderRadius:'50%',border:`1.5px solid ${s.accent}`,display:'flex',alignItems:'center',justifyContent:'center',marginTop:'2px',boxShadow:`0 0 10px ${s.accent}44`}}>
                <span style={{fontSize:'9px',fontWeight:700,color:s.accent}}>{s.n}</span>
              </div>
              <div>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',color:C.bone,marginBottom:'6px'}}>{s.t}</p>
                <p style={{fontSize:'13px',color:'rgba(227,218,201,0.5)',lineHeight:1.75}}>{s.b}</p>
              </div>
            </div>
          ))}
        </div>

      </main>
      <Footer/>
    </div>
  )
}
