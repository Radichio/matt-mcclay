import { useState, useRef, useEffect } from 'react'

const C = { navy:'#133951',dark:'#0d2535',gold:'#DA9100',pearl:'#B0B7BE',bone:'#E3DAC9',clay:'#BD5C00' }
const gridBg = `linear-gradient(rgba(218,145,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(218,145,0,0.04) 1px, transparent 1px)`

function Nav() {
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 48px',background:'rgba(13,37,53,0.97)',backdropFilter:'blur(16px)',borderBottom:'0.5px solid rgba(218,145,0,0.15)'}}>
      <a href="/"><img src="/logo-clean.png" alt="Matt McClay" style={{height:'140px',width:'auto',filter:'brightness(0) invert(1)',opacity:0.95}}/></a>
      <div style={{display:'flex',gap:'32px',alignItems:'center'}}>
        <a href="/about" style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.bone,opacity:0.7}}>About</a>
        <a href="/packages" style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.gold}}>Packages</a>
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

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal()
  return <div ref={ref} style={{opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(28px)',transition:`opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`}}>{children}</div>
}

const PKGS = [
  { name:'Scout', price:'$249', tag:'Entry', accent:C.pearl, hot:false,
    includes:['25 edited aerial photos','48-hour delivery','Digital download portal','MLS-ready resolution','Commercial use licence'],
    ideal:'Residential listings, land parcels' },
  { name:'Soar', price:'$449', tag:'Most Popular', accent:C.gold, hot:true,
    includes:['40 edited aerial photos','Aerial walkthrough video (90 sec)','3 social media cut-downs','24-hour delivery','Branded file set','Digital download portal'],
    ideal:'Commercial listings, mid-market residential' },
  { name:'Nest Builder', price:'$699', tag:'Premium', accent:C.clay, hot:false,
    includes:['50 edited aerial photos','Twilight / golden hour session','Full video walkthrough','Social cuts + Reels','Branded one-pager PDF','24-hour delivery'],
    ideal:'High-value listings, broker marketing' },
  { name:'Territory', price:'From $1,500', tag:'Commercial', accent:C.bone, hot:false,
    includes:['Commercial real estate packages','Construction progress documentation','Architecture & development sites','Monthly retainer options','Priority scheduling','Custom deliverables on request'],
    ideal:'Brokers, developers, construction firms' },
]

const ADDONS = [
  {name:'Extra photos (+15)', price:75},
  {name:'Rush delivery (6 hrs)', price:100},
  {name:'Interior photography', price:149},
  {name:'Branded graphics', price:79},
  {name:'Extended video (3 min)', price:100},
  {name:'Twilight add-on', price:149},
]

export default function Packages() {
  const [base, setBase] = useState('Soar')
  const [addons, setAddons] = useState([])
  const basePkg = PKGS.find(p => p.name === base)
  const basePrice = base === 'Territory' ? 1500 : PKGS.find(p=>p.name===base)?.price.replace('$','').replace(',','') * 1
  const addonTotal = addons.reduce((s,a) => s + (ADDONS.find(x=>x.name===a)?.price||0), 0)
  const total = basePrice + addonTotal

  return (
    <div style={{minHeight:'100vh',background:C.dark,fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} a{color:inherit;text-decoration:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes subtleZoom{from{transform:scale(1.04)}to{transform:scale(1.07)}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
      `}</style>
      <Nav />

      {/* HERO */}
      <section style={{position:'relative',height:'45vh',minHeight:'340px',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{position:'absolute',inset:0,zIndex:0,backgroundImage:'url(/property_aerial.jpg)',backgroundSize:'cover',backgroundPosition:'center 40%',animation:'subtleZoom 20s ease infinite alternate'}}/>
        <div style={{position:'absolute',inset:0,zIndex:1,background:'linear-gradient(to bottom,rgba(13,37,53,0.85) 0%,rgba(13,37,53,0.6) 50%,rgba(13,37,53,1) 100%)'}}/>
        <div style={{position:'absolute',inset:0,zIndex:2,backgroundImage:gridBg,backgroundSize:'40px 40px',opacity:0.5,pointerEvents:'none'}}/>
        <div style={{position:'absolute',left:0,right:0,height:'1px',zIndex:3,background:'linear-gradient(to right,transparent,rgba(218,145,0,0.12),transparent)',animation:'scanline 10s linear infinite',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:10,textAlign:'center',padding:'0 24px'}}>
          <div style={{fontSize:'10px',letterSpacing:'0.22em',textTransform:'uppercase',color:C.gold,marginBottom:'20px',animation:'fadeUp 0.8s ease 0.2s both'}}>Packages</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(32px,5vw,56px)',lineHeight:1.1,color:C.bone,animation:'fadeUp 0.8s ease 0.4s both'}}>
            Straightforward pricing.<br/><em style={{color:C.gold}}>No surprises.</em>
          </h1>
        </div>
      </section>

      <main style={{padding:'72px 48px',maxWidth:'1100px',margin:'0 auto'}}>

        {/* Package cards */}
        <Reveal>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'20px',marginBottom:'72px'}}>
            {PKGS.map((pkg,i)=>(
              <Reveal key={pkg.name} delay={i*0.08}>
                <div style={{background:pkg.hot?'rgba(218,145,0,0.07)':'rgba(255,255,255,0.03)',border:`0.5px solid ${pkg.hot?'rgba(218,145,0,0.4)':'rgba(227,218,201,0.08)'}`,borderTop:`2px solid ${pkg.accent}`,borderRadius:'14px',padding:'28px 24px',display:'flex',flexDirection:'column',height:'100%',boxShadow:pkg.hot?'0 0 40px rgba(218,145,0,0.08)':'none'}}>
                  <div style={{marginBottom:'18px'}}>
                    <p style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'0.14em',color:pkg.accent,marginBottom:'7px'}}>{pkg.tag}{pkg.hot?' — Popular':''}</p>
                    <p style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',color:C.bone,marginBottom:'5px'}}>{pkg.name}</p>
                    <p style={{fontFamily:"'Playfair Display',serif",fontSize:'32px',color:C.bone}}>{pkg.price}</p>
                  </div>
                  <ul style={{listStyle:'none',flex:1,marginBottom:'20px'}}>
                    {pkg.includes.map(item=>(
                      <li key={item} style={{fontSize:'12px',color:'rgba(227,218,201,0.65)',lineHeight:1.7,paddingLeft:'14px',position:'relative',marginBottom:'5px'}}>
                        <span style={{position:'absolute',left:0,color:pkg.accent}}>·</span>{item}
                      </li>
                    ))}
                  </ul>
                  <div style={{borderTop:'0.5px solid rgba(227,218,201,0.08)',paddingTop:'12px'}}>
                    <p style={{fontSize:'10px',color:C.pearl,letterSpacing:'0.04em'}}>Ideal for: {pkg.ideal}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Quote builder */}
        <Reveal>
          <div style={{background:'rgba(218,145,0,0.05)',border:'0.5px solid rgba(218,145,0,0.15)',borderRadius:'16px',padding:'48px',marginBottom:'72px',backgroundImage:gridBg,backgroundSize:'40px 40px'}}>
            <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl,marginBottom:'14px',textAlign:'center'}}>Build your shoot</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'32px',color:C.bone,marginBottom:'36px',textAlign:'center'}}>Get an instant quote.</h2>

            <p style={{fontSize:'11px',textTransform:'uppercase',letterSpacing:'0.1em',color:C.pearl,marginBottom:'12px'}}>1. Choose your base package</p>
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'32px'}}>
              {PKGS.filter(p=>p.name!=='Territory').map(pkg=>(
                <button key={pkg.name} onClick={()=>setBase(pkg.name)} style={{background:base===pkg.name?C.gold:'rgba(255,255,255,0.04)',color:base===pkg.name?C.dark:C.bone,border:`0.5px solid ${base===pkg.name?C.gold:'rgba(227,218,201,0.15)'}`,borderRadius:'8px',padding:'11px 22px',fontSize:'13px',fontWeight:base===pkg.name?700:400,cursor:'pointer',transition:'all 0.2s'}}>
                  {pkg.name} — {pkg.price}
                </button>
              ))}
            </div>

            <p style={{fontSize:'11px',textTransform:'uppercase',letterSpacing:'0.1em',color:C.pearl,marginBottom:'12px'}}>2. Add extras (optional)</p>
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'36px'}}>
              {ADDONS.map(a=>(
                <button key={a.name} onClick={()=>setAddons(prev=>prev.includes(a.name)?prev.filter(x=>x!==a.name):[...prev,a.name])} style={{background:addons.includes(a.name)?'rgba(189,92,0,0.25)':'rgba(255,255,255,0.04)',color:addons.includes(a.name)?C.bone:C.bone,border:`0.5px solid ${addons.includes(a.name)?C.clay:'rgba(227,218,201,0.12)'}`,borderRadius:'8px',padding:'10px 16px',fontSize:'12px',cursor:'pointer',transition:'all 0.2s',opacity:addons.includes(a.name)?1:0.7}}>
                  {a.name} +${a.price}
                </button>
              ))}
            </div>

            <div style={{borderTop:'0.5px solid rgba(218,145,0,0.2)',paddingTop:'24px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'16px'}}>
              <div>
                <p style={{fontSize:'11px',color:C.pearl,marginBottom:'4px',letterSpacing:'0.08em',textTransform:'uppercase'}}>Your estimate</p>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:'44px',color:C.gold}}>${total.toLocaleString()}{base==='Territory'?'+':''}</p>
              </div>
              <a href="/booking" style={{background:C.gold,color:C.dark,borderRadius:'8px',padding:'16px 36px',fontSize:'15px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase',boxShadow:'0 0 32px rgba(218,145,0,0.2)'}}>Book this shoot</a>
            </div>
          </div>
        </Reveal>

        {/* Add-ons grid */}
        <Reveal>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'28px',color:C.bone,marginBottom:'24px'}}>Add-ons</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'12px'}}>
            {ADDONS.map(a=>(
              <div key={a.name} style={{background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(227,218,201,0.08)',borderRadius:'8px',padding:'16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                  <p style={{fontSize:'12px',fontWeight:600,color:C.bone}}>{a.name}</p>
                  <p style={{fontSize:'12px',color:C.gold,fontWeight:700}}>+${a.price}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </main>
      <Footer />
    </div>
  )
}
