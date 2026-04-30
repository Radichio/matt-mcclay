import { useState, useEffect, useRef } from 'react'

const C = {
  navy:'#133951', dark:'#0d2535', navyMid:'#1a4a66',
  gold:'#DA9100', pearl:'#B0B7BE', bone:'#E3DAC9', clay:'#BD5C00',
}

function Nav({ scrolled }) {
  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:200,
      display:'flex',alignItems:'center',justifyContent:'space-between',
      padding:'16px 48px',
      background: scrolled ? 'rgba(13,37,53,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '0.5px solid rgba(218,145,0,0.2)' : 'none',
      transition:'all 0.4s ease',
    }}>
      <a href="/"><img src="/logo-clean.png" alt="Matt McClay"
        style={{height:'140px',width:'auto',filter:'brightness(0) invert(1)',opacity:0.95}}/></a>
      <div style={{display:'flex',gap:'32px',alignItems:'center'}}>
        {[['About','/about'],['Packages','/packages']].map(([l,h])=>(
          <a key={h} href={h} style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.bone,opacity:0.7}}>{l}</a>
        ))}
        <a href="/booking" style={{background:C.gold,color:C.dark,borderRadius:'6px',padding:'10px 22px',fontSize:'11px',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase'}}>Book a Shoot</a>
      </div>
    </nav>
  )
}

function DroneAnim() {
  return (
    <div style={{position:'absolute',top:'15%',left:0,width:'100%',height:'60px',animation:'droneFly 28s ease-in-out infinite',pointerEvents:'none',zIndex:3}}>
      <svg width="64" height="36" viewBox="0 0 64 36" fill="none" style={{filter:'drop-shadow(0 0 8px rgba(218,145,0,0.6))'}}>
        <rect x="24" y="14" width="16" height="8" rx="3" fill="#DA9100" opacity="0.9"/>
        <line x1="24" y1="16" x2="8"  y2="8"  stroke="#B0B7BE" strokeWidth="1.5"/>
        <line x1="40" y1="16" x2="56" y2="8"  stroke="#B0B7BE" strokeWidth="1.5"/>
        <line x1="24" y1="22" x2="8"  y2="28" stroke="#B0B7BE" strokeWidth="1.5"/>
        <line x1="40" y1="22" x2="56" y2="28" stroke="#B0B7BE" strokeWidth="1.5"/>
        <ellipse cx="8"  cy="8"  rx="8" ry="3" fill="#B0B7BE" opacity="0.5"/>
        <ellipse cx="56" cy="8"  rx="8" ry="3" fill="#B0B7BE" opacity="0.5"/>
        <ellipse cx="8"  cy="28" rx="8" ry="3" fill="#B0B7BE" opacity="0.5"/>
        <ellipse cx="56" cy="28" rx="8" ry="3" fill="#B0B7BE" opacity="0.5"/>
        <circle cx="32" cy="26" r="3" fill="#0d2535" stroke="#DA9100" strokeWidth="1"/>
        <circle cx="32" cy="10" r="2" fill="#DA9100"/>
      </svg>
      <div style={{position:'absolute',top:'36px',left:'28px',width:'1px',height:'40px',background:'linear-gradient(to bottom, rgba(218,145,0,0.6), transparent)'}}/>
    </div>
  )
}

function HUD() {
  const [alt,setAlt]=useState(187)
  const [sig,setSig]=useState(94)
  useEffect(()=>{
    const t=setInterval(()=>{
      setAlt(a=>a+(Math.random()>0.5?1:-1)*Math.floor(Math.random()*3))
      setSig(s=>Math.max(88,Math.min(99,s+(Math.random()>0.5?1:-1))))
    },1200)
    return ()=>clearInterval(t)
  },[])
  const hud={fontSize:'10px',fontFamily:'monospace',letterSpacing:'0.1em',color:C.gold,lineHeight:1.8}
  const corners=[{top:80,left:40},{top:80,right:40},{bottom:110,left:40},{bottom:110,right:40}]
  return (
    <>
      <div style={{position:'absolute',top:'90px',left:'48px',zIndex:10,opacity:0.7}}>
        <div style={hud}>ALT  {alt}ft</div>
        <div style={hud}>SIG  {sig}%</div>
        <div style={hud}>MODE PHOTO</div>
      </div>
      <div style={{position:'absolute',top:'90px',right:'48px',zIndex:10,opacity:0.7,textAlign:'right'}}>
        <div style={hud}>37.4138° N</div>
        <div style={hud}>79.1422° W</div>
        <div style={hud}>LYNCHBURG VA</div>
      </div>
      <div style={{position:'absolute',bottom:'120px',left:'48px',zIndex:10,opacity:0.5}}>
        <div style={hud}>● REC  00:04:32</div>
      </div>
      {corners.map((pos,i)=>(
        <svg key={i} width="20" height="20" style={{position:'absolute',...pos,zIndex:10,opacity:0.4}}>
          {i===0&&<><line x1="0" y1="10" x2="0" y2="0" stroke={C.gold} strokeWidth="1.5"/><line x1="0" y1="0" x2="10" y2="0" stroke={C.gold} strokeWidth="1.5"/></>}
          {i===1&&<><line x1="20" y1="10" x2="20" y2="0" stroke={C.gold} strokeWidth="1.5"/><line x1="20" y1="0" x2="10" y2="0" stroke={C.gold} strokeWidth="1.5"/></>}
          {i===2&&<><line x1="0" y1="10" x2="0" y2="20" stroke={C.gold} strokeWidth="1.5"/><line x1="0" y1="20" x2="10" y2="20" stroke={C.gold} strokeWidth="1.5"/></>}
          {i===3&&<><line x1="20" y1="10" x2="20" y2="20" stroke={C.gold} strokeWidth="1.5"/><line x1="20" y1="20" x2="10" y2="20" stroke={C.gold} strokeWidth="1.5"/></>}
        </svg>
      ))}
    </>
  )
}

function useReveal(){
  const ref=useRef(null)
  const [visible,setVisible]=useState(false)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVisible(true)},{threshold:0.12})
    if(ref.current)obs.observe(ref.current)
    return ()=>obs.disconnect()
  },[])
  return [ref,visible]
}

function Reveal({children,delay=0}){
  const [ref,visible]=useReveal()
  return(
    <div ref={ref} style={{opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(28px)',transition:`opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`}}>
      {children}
    </div>
  )
}

function Counter({target,suffix=''}){
  const [count,setCount]=useState(0)
  const [ref,visible]=useReveal()
  useEffect(()=>{
    if(!visible)return
    let s=0;const step=target/60
    const t=setInterval(()=>{s+=step;if(s>=target){setCount(target);clearInterval(t)}else setCount(Math.floor(s))},20)
    return ()=>clearInterval(t)
  },[visible,target])
  return <span ref={ref}>{count}{suffix}</span>
}

const gridBg=`linear-gradient(rgba(218,145,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(218,145,0,0.04) 1px, transparent 1px)`

export default function Home(){
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>60)
    window.addEventListener('scroll',fn)
    return ()=>window.removeEventListener('scroll',fn)
  },[])

  return(
    <div style={{minHeight:'100vh',background:C.dark,fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        a{color:inherit;text-decoration:none}
        ::selection{background:rgba(218,145,0,0.3)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes droneFly{
          0%  {transform:translate(10vw, 20px) rotate(0deg)}
          12% {transform:translate(35vw, -30px) rotate(8deg)}
          25% {transform:translate(65vw, -10px) rotate(4deg)}
          37% {transform:translate(82vw, 40px) rotate(-6deg)}
          50% {transform:translate(70vw, 80px) rotate(-12deg)}
          62% {transform:translate(45vw, 90px) rotate(-8deg)}
          75% {transform:translate(20vw, 60px) rotate(4deg)}
          87% {transform:translate(5vw, 20px) rotate(10deg)}
          100%{transform:translate(10vw, 20px) rotate(0deg)}
        }
        @keyframes subtleZoom{from{transform:scale(1.04) translateY(0)}to{transform:scale(1.08) translateY(-1%)}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        @keyframes scrollPulse{0%,100%{opacity:0.4}50%{opacity:1}}
      `}</style>

      <Nav scrolled={scrolled}/>

      {/* HERO */}
      <section style={{position:'relative',height:'100vh',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{position:'absolute',inset:0,zIndex:0,backgroundImage:'url(/property_aerial.jpg)',backgroundSize:'cover',backgroundPosition:'center 40%',animation:'subtleZoom 20s ease infinite alternate'}}/>
        <div style={{position:'absolute',inset:0,zIndex:1,background:'linear-gradient(to bottom, rgba(13,37,53,0.75) 0%, rgba(13,37,53,0.5) 40%, rgba(13,37,53,0.88) 80%, rgba(13,37,53,1) 100%)'}}/>
        <div style={{position:'absolute',inset:0,zIndex:2,backgroundImage:gridBg,backgroundSize:'40px 40px',opacity:0.6,pointerEvents:'none'}}/>
        <div style={{position:'absolute',left:0,right:0,height:'2px',zIndex:3,background:'linear-gradient(to right, transparent, rgba(218,145,0,0.15), transparent)',animation:'scanline 8s linear infinite',pointerEvents:'none'}}/>
        <DroneAnim/>
        <HUD/>
        <div style={{position:'relative',zIndex:10,textAlign:'center',padding:'0 24px',maxWidth:'920px'}}>
          <div style={{fontSize:'10px',letterSpacing:'0.22em',textTransform:'uppercase',color:C.gold,marginBottom:'28px',animation:'fadeUp 0.8s ease 0.2s both'}}>
            Lynchburg, VA  ·  Central Virginia  ·  FAA Part 107
          </div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(40px,7vw,80px)',lineHeight:1.08,color:C.bone,marginBottom:'28px',animation:'fadeUp 0.8s ease 0.4s both'}}>
            Aerial media for<br/>real estate, development<br/><em style={{color:C.gold}}>&amp; architecture.</em>
          </h1>
          <p style={{fontSize:'17px',color:'rgba(227,218,201,0.6)',maxWidth:'460px',margin:'0 auto 44px',lineHeight:1.85,animation:'fadeUp 0.8s ease 0.6s both'}}>
            Commercial photography and fast video for brokers, developers and designers — delivered in 24 hours.
          </p>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',animation:'fadeUp 0.8s ease 0.8s both'}}>
            <a href="/booking" style={{background:C.gold,color:C.dark,borderRadius:'8px',padding:'17px 40px',fontSize:'14px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase',boxShadow:'0 0 32px rgba(218,145,0,0.25)'}}>Book a shoot</a>
            <a href="/packages" style={{background:'transparent',color:C.bone,border:'0.5px solid rgba(227,218,201,0.22)',borderRadius:'8px',padding:'17px 40px',fontSize:'14px',letterSpacing:'0.04em',textTransform:'uppercase'}}>See packages</a>
          </div>
          <p style={{marginTop:'20px',fontSize:'12px',color:'rgba(227,218,201,0.28)',letterSpacing:'0.06em',animation:'fadeUp 0.8s ease 1s both'}}>First shoot complimentary — no strings.</p>
        </div>
        <div style={{position:'absolute',bottom:'32px',left:'50%',transform:'translateX(-50%)',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',animation:'fadeUp 1s ease 1.2s both'}}>
          <span style={{fontSize:'9px',letterSpacing:'0.16em',textTransform:'uppercase',color:'rgba(227,218,201,0.35)'}}>Scroll</span>
          <div style={{width:'1px',height:'40px',background:`linear-gradient(to bottom, ${C.gold}, transparent)`,animation:'scrollPulse 2s ease infinite'}}/>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <Reveal>
        <section style={{borderTop:'1px solid rgba(218,145,0,0.15)',borderBottom:'1px solid rgba(218,145,0,0.15)',padding:'24px 48px',backgroundImage:gridBg,backgroundSize:'40px 40px',display:'flex',justifyContent:'center',gap:'56px',flexWrap:'wrap'}}>
          {[['Commercial Real Estate','Listings that close faster'],['Construction Progress','Document every stage'],['Architecture & Design','Showcase the build'],['FAA Part 107 Certified','Fully insured']].map(([l,s])=>(
            <div key={l} style={{textAlign:'center'}}>
              <p style={{fontSize:'10px',fontWeight:700,color:C.gold,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'4px'}}>{l}</p>
              <p style={{fontSize:'11px',color:'rgba(227,218,201,0.45)'}}>{s}</p>
            </div>
          ))}
        </section>
      </Reveal>

      {/* STATS */}
      <Reveal>
        <section style={{padding:'80px 48px',maxWidth:'900px',margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'32px',textAlign:'center'}}>
            {[[247,'+','Properties shot',C.gold],[24,'hr','Turnaround',C.clay],[100,'%','Delivery rate',C.pearl],[98,'%','Client return rate',C.bone]].map(([n,s,l,a],i)=>(
              <div key={i} style={{borderTop:`2px solid ${a}`,paddingTop:'20px'}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'52px',color:C.bone,lineHeight:1}}><Counter target={n} suffix={s}/></div>
                <p style={{fontSize:'10px',color:'rgba(227,218,201,0.4)',letterSpacing:'0.1em',textTransform:'uppercase',marginTop:'10px'}}>{l}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* AERIAL SHOWCASE */}
      <Reveal>
        <section style={{padding:'0 48px 88px',textAlign:'center'}}>
          <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl,marginBottom:'16px'}}>What you've been missing</p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4vw,44px)',color:C.bone,marginBottom:'14px'}}>See what your listings<br/>look like from above.</h2>
          <p style={{fontSize:'15px',color:'rgba(227,218,201,0.5)',maxWidth:'380px',margin:'0 auto 48px',lineHeight:1.8}}>One aerial shoot changes how a property is perceived before a buyer ever steps inside.</p>
          <div style={{maxWidth:'820px',margin:'0 auto',borderRadius:'16px',overflow:'hidden',border:'1px solid rgba(218,145,0,0.25)',boxShadow:'0 0 80px rgba(218,145,0,0.08)',position:'relative'}}>
            <img src="/property_aerial.jpg" alt="Aerial property" style={{width:'100%',height:'440px',objectFit:'cover',objectPosition:'center 30%',display:'block'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom, transparent 55%, rgba(13,37,53,0.95) 100%)'}}/>
            <div style={{position:'absolute',top:'16px',left:'16px',fontFamily:'monospace',fontSize:'10px',color:C.gold,opacity:0.85,letterSpacing:'0.1em'}}>● REC  ALT 187ft  SIG 96%</div>
            <div style={{position:'absolute',top:'16px',right:'16px',fontFamily:'monospace',fontSize:'10px',color:C.gold,opacity:0.85,letterSpacing:'0.1em',textAlign:'right'}}>37.4138°N  79.1422°W</div>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'20px 28px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <p style={{fontSize:'15px',fontWeight:600,color:C.bone}}>3200 Candlers Mountain Rd</p>
                <p style={{fontSize:'11px',color:C.pearl}}>Lynchburg, VA  ·  Commercial Office</p>
              </div>
              <a href="/booking" style={{background:C.gold,color:C.dark,borderRadius:'6px',padding:'11px 24px',fontSize:'12px',fontWeight:700}}>Book this</a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* WHY MATT */}
      <Reveal>
        <section style={{padding:'88px 48px',background:'linear-gradient(to bottom, rgba(218,145,0,0.03), transparent)',borderTop:'1px solid rgba(218,145,0,0.1)'}}>
          <div style={{maxWidth:'1000px',margin:'0 auto'}}>
            <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl,marginBottom:'16px',textAlign:'center'}}>Not just a drone pilot</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4vw,44px)',color:C.bone,marginBottom:'56px',textAlign:'center'}}>Beyond the listing photo.</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:'40px'}}>
              {[
                {t:'Designer first. Pilot second.',b:'Matt spent years in graphic design before earning Part 107. He thinks about composition, light, and story — not just airspace.',a:C.gold},
                {t:'24-hour turnaround. Guaranteed.',b:'Every shoot is edited and delivered to your portal the next day. No follow-up emails. No chasing.',a:C.clay},
                {t:'Branded on every asset.',b:'Logo overlays, formatted for MLS, social, and print. Every package includes delivery-ready files.',a:C.pearl},
                {t:'Weather managed proactively.',b:"Matt monitors conditions and contacts you if there's an issue — no last-minute scrambles on shoot day.",a:C.bone},
                {t:'Every format, ready to use.',b:'MLS photos, Lightroom-edited. Video for YouTube, Reels, TikTok. One package, nothing to figure out.',a:C.gold},
              ].map((c,i)=>(
                <div key={i} style={{borderTop:`2px solid ${c.a}`,paddingTop:'20px'}}>
                  <p style={{fontFamily:"'Playfair Display',serif",fontSize:'17px',color:C.bone,marginBottom:'10px',lineHeight:1.3}}>{c.t}</p>
                  <p style={{fontSize:'13px',color:'rgba(227,218,201,0.5)',lineHeight:1.8}}>{c.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* SHOOT STATUS */}
      <Reveal>
        <section style={{padding:'72px 48px',textAlign:'center',borderTop:'1px solid rgba(218,145,0,0.08)'}}>
          <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl,marginBottom:'16px'}}>Shoot tracking</p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'36px',color:C.bone,marginBottom:'48px'}}>Always know where your shoot stands.</h2>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexWrap:'wrap',gap:0,maxWidth:'640px',margin:'0 auto'}}>
            {['Booked','Confirmed','Shoot day','Editing','Delivered'].map((s,i,arr)=>(
              <div key={s} style={{display:'flex',alignItems:'center'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                  <div style={{width:'38px',height:'38px',borderRadius:'50%',background:i<3?C.gold:'rgba(255,255,255,0.05)',border:`1.5px solid ${i<3?C.gold:'rgba(227,218,201,0.15)'}`,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:i<3?'0 0 16px rgba(218,145,0,0.4)':'none'}}>
                    {i<3&&<span style={{color:C.dark,fontSize:'16px',fontWeight:700}}>✓</span>}
                  </div>
                  <span style={{fontSize:'9px',color:i<3?C.gold:'rgba(227,218,201,0.25)',letterSpacing:'0.1em',textTransform:'uppercase'}}>{s}</span>
                </div>
                {i<arr.length-1&&<div style={{width:'52px',height:'1px',background:i<2?C.gold:'rgba(227,218,201,0.1)',margin:'0 0 28px',opacity:i<2?0.5:1}}/>}
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* PACKAGES */}
      <Reveal>
        <section style={{padding:'72px 48px',maxWidth:'1100px',margin:'0 auto'}}>
          <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl,marginBottom:'16px',textAlign:'center'}}>Packages</p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'40px',color:C.bone,marginBottom:'48px',textAlign:'center'}}>Straightforward pricing.</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'16px',marginBottom:'36px'}}>
            {[
              {n:'Scout',p:'$249',s:'Photos only · 48hr',a:C.pearl,hot:false},
              {n:'Soar',p:'$449',s:'Photos + video + social · 24hr',a:C.gold,hot:true},
              {n:'Nest Builder',p:'$699',s:'Twilight + branded one-pager',a:C.clay,hot:false},
              {n:'Territory',p:'$1,500+',s:'Commercial · construction · retainers',a:C.bone,hot:false},
            ].map((pkg,i)=>(
              <div key={pkg.n} style={{background:pkg.hot?'rgba(218,145,0,0.07)':'rgba(255,255,255,0.03)',border:`0.5px solid ${pkg.hot?'rgba(218,145,0,0.4)':'rgba(227,218,201,0.08)'}`,borderTop:`2px solid ${pkg.a}`,borderRadius:'12px',padding:'24px 20px',boxShadow:pkg.hot?'0 0 40px rgba(218,145,0,0.08)':'none'}}>
                <p style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'0.14em',color:pkg.a,marginBottom:'8px'}}>{pkg.n}{pkg.hot?' — Popular':''}</p>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:'32px',color:C.bone,marginBottom:'8px'}}>{pkg.p}</p>
                <p style={{fontSize:'11px',color:'rgba(227,218,201,0.4)',lineHeight:1.6}}>{pkg.s}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center'}}>
            <a href="/packages" style={{fontSize:'12px',color:C.gold,letterSpacing:'0.08em',borderBottom:'0.5px solid rgba(218,145,0,0.4)',paddingBottom:'2px'}}>See full package details →</a>
          </div>
        </section>
      </Reveal>

      {/* TERRITORY */}
      <Reveal>
        <section style={{margin:'0 48px 88px',borderRadius:'20px',overflow:'hidden',border:'1px solid rgba(176,183,190,0.2)',position:'relative'}}>
          <div style={{position:'absolute',inset:0,backgroundImage:'url(/property_aerial.jpg)',backgroundSize:'cover',backgroundPosition:'center 60%',filter:'brightness(0.22)'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg, rgba(13,37,53,0.92) 0%, rgba(189,92,0,0.2) 100%)'}}/>
          <div style={{position:'absolute',inset:0,backgroundImage:gridBg,backgroundSize:'40px 40px',opacity:0.4}}/>
          <div style={{position:'relative',zIndex:2,padding:'64px 56px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'56px',alignItems:'center'}}>
            <div>
              <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl,marginBottom:'16px'}}>Territory</p>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4vw,44px)',color:C.bone,marginBottom:'16px',lineHeight:1.15}}>For clients who<br/><em style={{color:C.gold}}>need more.</em></h2>
              <p style={{fontSize:'14px',color:'rgba(227,218,201,0.6)',lineHeight:1.85,marginBottom:'28px'}}>Territory is Matt McClay's ongoing relationship tier — monthly aerial documentation, priority scheduling, and a permanent aerial presence for your portfolio.</p>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:'36px',color:C.bone,marginBottom:'28px'}}>$1,500+</p>
              <a href="/booking" style={{display:'inline-block',background:C.gold,color:C.dark,borderRadius:'8px',padding:'14px 28px',fontSize:'13px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase'}}>Request a consultation</a>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              {['Monthly progress documentation','Priority scheduling — always first','On-going project aerial library','Architecture & design feed content','Branded social content monthly','Retainer pricing — fixed monthly cost'].map(f=>(
                <div key={f} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                  <span style={{color:C.gold,marginTop:'2px',flexShrink:0,fontSize:'16px'}}>·</span>
                  <span style={{fontSize:'13px',color:'rgba(227,218,201,0.6)',lineHeight:1.65}}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* FINAL CTA */}
      <Reveal>
        <section style={{padding:'100px 48px',textAlign:'center',borderTop:'1px solid rgba(218,145,0,0.1)'}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(32px,5vw,56px)',color:C.bone,marginBottom:'20px',lineHeight:1.15}}>Every project deserves<br/>to be <em style={{color:C.gold}}>seen properly.</em></h2>
          <p style={{fontSize:'16px',color:'rgba(227,218,201,0.45)',maxWidth:'380px',margin:'0 auto 40px',lineHeight:1.85}}>Whether it's a listing, a development site, or long-term documentation — it starts with a single shoot.</p>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/booking" style={{background:C.gold,color:C.dark,borderRadius:'8px',padding:'17px 40px',fontSize:'14px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase',boxShadow:'0 0 32px rgba(218,145,0,0.2)'}}>Book a shoot</a>
            <a href="/packages" style={{background:'transparent',color:C.bone,border:'0.5px solid rgba(227,218,201,0.2)',borderRadius:'8px',padding:'17px 40px',fontSize:'14px',letterSpacing:'0.04em',textTransform:'uppercase'}}>See all packages</a>
          </div>
        </section>
      </Reveal>

      <footer style={{borderTop:'0.5px solid rgba(218,145,0,0.1)',padding:'20px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'8px'}}>
        <span style={{fontSize:'11px',color:'rgba(227,218,201,0.25)'}}>mattmcclay.com  ·  Lynchburg, VA  ·  FAA Part 107 Certified</span>
        <span style={{fontSize:'11px',color:'rgba(218,145,0,0.5)',letterSpacing:'0.06em'}}>Commercial  ·  Construction  ·  Architecture</span>
      </footer>
    </div>
  )
}
