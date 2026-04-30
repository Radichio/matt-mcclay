import { useState, useEffect, useRef } from 'react'

const C = { navy:'#133951',dark:'#0d2535',gold:'#DA9100',pearl:'#B0B7BE',bone:'#E3DAC9',clay:'#BD5C00' }
const gridBg = `linear-gradient(rgba(218,145,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(218,145,0,0.04) 1px, transparent 1px)`

function Nav() {
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 48px',background:'rgba(13,37,53,0.97)',backdropFilter:'blur(16px)',borderBottom:'0.5px solid rgba(218,145,0,0.15)'}}>
      <a href="/"><img src="/logo-clean.png" alt="Matt McClay" style={{height:'140px',width:'auto',filter:'brightness(0) invert(1)',opacity:0.95}}/></a>
      <div style={{display:'flex',gap:'32px',alignItems:'center'}}>
        <a href="/about" style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.gold}}>About</a>
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

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal()
  return <div ref={ref} style={{opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(28px)',transition:`opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`}}>{children}</div>
}

export default function About() {
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
      <section style={{position:'relative',height:'52vh',minHeight:'380px',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{position:'absolute',inset:0,zIndex:0,backgroundImage:'url(/property_aerial.jpg)',backgroundSize:'cover',backgroundPosition:'center 25%',animation:'subtleZoom 20s ease infinite alternate'}}/>
        <div style={{position:'absolute',inset:0,zIndex:1,background:'linear-gradient(to bottom,rgba(13,37,53,0.82) 0%,rgba(13,37,53,0.55) 50%,rgba(13,37,53,1) 100%)'}}/>
        <div style={{position:'absolute',inset:0,zIndex:2,backgroundImage:gridBg,backgroundSize:'40px 40px',opacity:0.5,pointerEvents:'none'}}/>
        <div style={{position:'absolute',left:0,right:0,height:'1px',zIndex:3,background:'linear-gradient(to right,transparent,rgba(218,145,0,0.12),transparent)',animation:'scanline 10s linear infinite',pointerEvents:'none'}}/>
        {[{top:80,left:40},{top:80,right:40},{bottom:20,left:40},{bottom:20,right:40}].map((pos,i)=>(
          <svg key={i} width="20" height="20" style={{position:'absolute',...pos,zIndex:10,opacity:0.35}}>
            {i===0&&<><line x1="0" y1="10" x2="0" y2="0" stroke={C.gold} strokeWidth="1.5"/><line x1="0" y1="0" x2="10" y2="0" stroke={C.gold} strokeWidth="1.5"/></>}
            {i===1&&<><line x1="20" y1="10" x2="20" y2="0" stroke={C.gold} strokeWidth="1.5"/><line x1="20" y1="0" x2="10" y2="0" stroke={C.gold} strokeWidth="1.5"/></>}
            {i===2&&<><line x1="0" y1="10" x2="0" y2="20" stroke={C.gold} strokeWidth="1.5"/><line x1="0" y1="20" x2="10" y2="20" stroke={C.gold} strokeWidth="1.5"/></>}
            {i===3&&<><line x1="20" y1="10" x2="20" y2="20" stroke={C.gold} strokeWidth="1.5"/><line x1="20" y1="20" x2="10" y2="20" stroke={C.gold} strokeWidth="1.5"/></>}
          </svg>
        ))}
        <div style={{position:'relative',zIndex:10,textAlign:'center',padding:'0 24px'}}>
          <div style={{fontSize:'10px',letterSpacing:'0.22em',textTransform:'uppercase',color:C.gold,marginBottom:'20px',animation:'fadeUp 0.8s ease 0.2s both'}}>About</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(32px,5vw,58px)',lineHeight:1.1,color:C.bone,animation:'fadeUp 0.8s ease 0.4s both'}}>
            A designer who learned<br/><em style={{color:C.gold}}>to fly.</em>
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <main style={{maxWidth:'800px',margin:'0 auto',padding:'80px 48px'}}>
        <Reveal>
          <p style={{fontSize:'20px',color:C.bone,lineHeight:1.85,marginBottom:'24px',fontFamily:"'Playfair Display',serif",fontStyle:'italic'}}>
            Matt McClay spent years as a professional graphic designer before earning his FAA Part 107 certification. That background is what separates the work.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{fontSize:'16px',color:'rgba(227,218,201,0.6)',lineHeight:1.9,marginBottom:'24px'}}>
            Most drone operators think about airspace. Matt thinks about composition, light, story, and end use — then airspace. Every shoot is approached the way a designer would approach a brief: what does this need to communicate, and what's the most powerful way to communicate it from above?
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p style={{fontSize:'16px',color:'rgba(227,218,201,0.6)',lineHeight:1.9,marginBottom:'64px'}}>
            Based in Lynchburg, Virginia, Matt works with commercial real estate brokers, developers, architects, and construction companies across Central Virginia who need professional aerial media that moves listings and documents projects.
          </p>
        </Reveal>

        {/* Facts */}
        <Reveal delay={0.2}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'24px',marginBottom:'72px'}}>
            {[
              {label:'Based in',value:'Lynchburg, VA',accent:C.gold},
              {label:'Coverage',value:'Central Virginia',accent:C.clay},
              {label:'Certification',value:'FAA Part 107',accent:C.pearl},
              {label:'Insurance',value:'Fully insured',accent:C.bone},
              {label:'Turnaround',value:'24 hrs standard',accent:C.gold},
              {label:'First shoot',value:'Complimentary',accent:C.clay},
            ].map(f=>(
              <div key={f.label} style={{borderTop:`2px solid ${f.accent}`,paddingTop:'14px'}}>
                <p style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'0.14em',color:C.pearl,marginBottom:'7px'}}>{f.label}</p>
                <p style={{fontSize:'16px',color:C.bone,fontWeight:500}}>{f.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* How it works */}
        <Reveal>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'32px',color:C.bone,marginBottom:'36px'}}>How it works</h2>
        </Reveal>
        {[
          {step:'01',title:'You reach out',body:'Email, call, or book through the site. Matt responds within the hour during business hours.',accent:C.gold},
          {step:'02',title:'We confirm the details',body:'Property address, preferred date, package. Simple and quick.',accent:C.clay},
          {step:'03',title:'Shoot day',body:'Matt arrives on time, flies the property, captures everything in the package. Typical shoot: 45–60 minutes.',accent:C.pearl},
          {step:'04',title:'Delivered in 24 hours',body:'Photos, video, and social cuts in your download portal. Share the link directly with your client or seller.',accent:C.bone},
        ].map((item,i,arr)=>(
          <Reveal key={i} delay={i*0.08}>
            <div style={{display:'flex',gap:'24px',padding:'28px 0',borderBottom:i<arr.length-1?'0.5px solid rgba(227,218,201,0.07)':'none'}}>
              <div style={{flexShrink:0,width:'36px',height:'36px',borderRadius:'50%',border:`1.5px solid ${item.accent}`,display:'flex',alignItems:'center',justifyContent:'center',marginTop:'3px',boxShadow:`0 0 12px ${item.accent}44`}}>
                <span style={{fontSize:'10px',fontWeight:700,color:item.accent}}>{item.step}</span>
              </div>
              <div>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',color:C.bone,marginBottom:'8px'}}>{item.title}</p>
                <p style={{fontSize:'14px',color:'rgba(227,218,201,0.55)',lineHeight:1.8}}>{item.body}</p>
              </div>
            </div>
          </Reveal>
        ))}

        {/* CTA */}
        <Reveal delay={0.2}>
          <div style={{marginTop:'64px',padding:'48px',background:'rgba(218,145,0,0.05)',border:'0.5px solid rgba(218,145,0,0.2)',borderRadius:'16px',textAlign:'center',backgroundImage:gridBg,backgroundSize:'40px 40px'}}>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',color:C.bone,marginBottom:'14px'}}>Ready to see what your listing looks like from above?</p>
            <p style={{fontSize:'14px',color:'rgba(227,218,201,0.5)',marginBottom:'28px'}}>First shoot complimentary. No obligation.</p>
            <a href="/booking" style={{display:'inline-block',background:C.gold,color:C.dark,borderRadius:'8px',padding:'15px 36px',fontSize:'14px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase',boxShadow:'0 0 32px rgba(218,145,0,0.2)'}}>Book a shoot</a>
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
