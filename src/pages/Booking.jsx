import { useState } from 'react'

const C = { navy:'#133951',dark:'#0d2535',gold:'#DA9100',pearl:'#B0B7BE',bone:'#E3DAC9',clay:'#BD5C00' }
const gridBg = `linear-gradient(rgba(218,145,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(218,145,0,0.04) 1px, transparent 1px)`

function Nav() {
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 48px',background:'rgba(13,37,53,0.97)',backdropFilter:'blur(16px)',borderBottom:'0.5px solid rgba(218,145,0,0.15)'}}>
      <a href="/"><img src="/logo-clean.png" alt="Matt McClay" style={{height:'140px',width:'auto',filter:'brightness(0) invert(1)',opacity:0.95}}/></a>
      <div style={{display:'flex',gap:'32px',alignItems:'center'}}>
        <a href="/about" style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.bone,opacity:0.7}}>About</a>
        <a href="/packages" style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.bone,opacity:0.7}}>Packages</a>
        <a href="/booking" style={{background:C.gold,color:C.dark,borderRadius:'6px',padding:'10px 22px',fontSize:'11px',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase'}}>Book a Shoot</a>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer style={{borderTop:'0.5px solid rgba(218,145,0,0.1)',padding:'20px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'8px'}}>
      <span style={{fontSize:'11px',color:'rgba(227,218,201,0.25)'}}>mattmcclay.com  ·  Lynchburg, VA  ·  FAA Part 107 Certified</span>
      <span style={{fontSize:'11px',color:'rgba(218,145,0,0.5)',letterSpacing:'0.06em'}}>Commercial  ·  Construction  ·  Architecture</span>
    </footer>
  )
}

export default function Booking() {
  const [form, setForm] = useState({name:'',email:'',phone:'',address:'',pkg:'Soar',date:'',notes:''})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = true
    if (!form.email.includes('@')) e.email = true
    if (!form.address.trim()) e.address = true
    if (!form.date) e.date = true
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
    transition:'border-color 0.2s',
  })

  const label = {fontSize:'10px',textTransform:'uppercase',letterSpacing:'0.12em',color:C.pearl,marginBottom:'7px',display:'block'}

  if (submitted) return (
    <div style={{minHeight:'100vh',background:C.dark,display:'flex',flexDirection:'column'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap'); *{box-sizing:border-box;margin:0;padding:0} a{color:inherit;text-decoration:none}`}</style>
      <Nav />
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'60px 40px',textAlign:'center'}}>
        <div>
          <div style={{width:'64px',height:'140px',borderRadius:'50%',border:`2px solid ${C.gold}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 28px',fontSize:'26px',color:C.gold,boxShadow:'0 0 32px rgba(218,145,0,0.3)'}}>✓</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'42px',color:C.bone,marginBottom:'16px'}}>You're booked.</h1>
          <p style={{fontSize:'16px',color:'rgba(227,218,201,0.55)',maxWidth:'340px',margin:'0 auto 36px',lineHeight:1.8}}>Matt will confirm within the hour.<br/>Check your inbox for next steps.</p>
          <a href="/" style={{background:C.gold,color:C.dark,borderRadius:'8px',padding:'14px 32px',fontSize:'14px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase'}}>Back to home</a>
        </div>
      </div>
      <Footer />
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:C.dark,display:'flex',flexDirection:'column',fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} a{color:inherit;text-decoration:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes subtleZoom{from{transform:scale(1.04)}to{transform:scale(1.07)}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        input:focus, select:focus, textarea:focus { border-color: rgba(218,145,0,0.5) !important; }
        option { background: #0d2535; color: #E3DAC9; }
      `}</style>
      <Nav />

      {/* HERO */}
      <section style={{position:'relative',height:'40vh',minHeight:'440px',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{position:'absolute',inset:0,zIndex:0,backgroundImage:'url(/property_aerial.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%',animation:'subtleZoom 20s ease infinite alternate'}}/>
        <div style={{position:'absolute',inset:0,zIndex:1,background:'linear-gradient(to bottom,rgba(13,37,53,0.85) 0%,rgba(13,37,53,0.65) 50%,rgba(13,37,53,1) 100%)'}}/>
        <div style={{position:'absolute',inset:0,zIndex:2,backgroundImage:gridBg,backgroundSize:'40px 40px',opacity:0.5,pointerEvents:'none'}}/>
        <div style={{position:'absolute',left:0,right:0,height:'1px',zIndex:3,background:'linear-gradient(to right,transparent,rgba(218,145,0,0.12),transparent)',animation:'scanline 10s linear infinite',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:10,textAlign:'center',padding:'140px 24px 0'}}>
          <div style={{fontSize:'10px',letterSpacing:'0.22em',textTransform:'uppercase',color:C.gold,marginBottom:'20px',animation:'fadeUp 0.8s ease 0.2s both'}}>Book a Shoot</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(30px,5vw,54px)',lineHeight:1.1,color:C.bone,animation:'fadeUp 0.8s ease 0.4s both'}}>
            Let's fly your<br/><em style={{color:C.gold}}>property.</em>
          </h1>
        </div>
      </section>

      {/* FORM */}
      <main style={{maxWidth:'680px',margin:'0 auto',padding:'64px 48px 80px',width:'100%',flex:1}}>
        <p style={{fontSize:'15px',color:'rgba(227,218,201,0.55)',marginBottom:'48px',lineHeight:1.8,textAlign:'center'}}>
          Fill in the details below. Matt confirms within the hour.
        </p>

        <div style={{display:'flex',flexDirection:'column',gap:'22px'}}>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>
              <label style={label}>Your Name {errors.name&&<span style={{color:'#f87171'}}>*</span>}</label>
              <input style={field('name')} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Jane Smith"/>
            </div>
            <div>
              <label style={label}>Email {errors.email&&<span style={{color:'#f87171'}}>*</span>}</label>
              <input style={field('email')} value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="jane@brokerage.com"/>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>
              <label style={label}>Phone (optional)</label>
              <input style={field('phone')} value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="434-555-0100"/>
            </div>
            <div>
              <label style={label}>Preferred Date {errors.date&&<span style={{color:'#f87171'}}>*</span>}</label>
              <input type="date" style={field('date')} value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}/>
            </div>
          </div>

          <div>
            <label style={label}>Property Address {errors.address&&<span style={{color:'#f87171'}}>*</span>}</label>
            <input style={field('address')} value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} placeholder="3200 Candlers Mountain Rd, Lynchburg, VA"/>
          </div>

          <div>
            <label style={label}>Package</label>
            <select value={form.pkg} onChange={e=>setForm(p=>({...p,pkg:e.target.value}))} style={{...field('pkg'),cursor:'pointer'}}>
              <optgroup label="Residential / Mixed">
                <option value="Scout">Scout — $249 · Photos, 48hr</option>
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
            <textarea rows={4} style={{...field('notes'),resize:'vertical'}} value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Access instructions, specific angles, deadlines, anything useful."/>
          </div>

          {Object.keys(errors).length > 0 && (
            <p style={{fontSize:'12px',color:'#f87171',textAlign:'center'}}>Please fill in all required fields above.</p>
          )}

          <button onClick={handleSubmit} style={{background:C.gold,color:C.dark,border:'none',borderRadius:'8px',padding:'18px',fontSize:'15px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase',marginTop:'8px',cursor:'pointer',boxShadow:'0 0 32px rgba(218,145,0,0.2)',transition:'opacity 0.2s'}}>
            Submit booking request
          </button>

          <p style={{fontSize:'11px',color:'rgba(227,218,201,0.25)',textAlign:'center',letterSpacing:'0.04em'}}>
            Matt confirms within the hour during business hours.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
