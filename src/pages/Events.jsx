const C = { navy:'#133951',dark:'#0d2535',gold:'#DA9100',pearl:'#B0B7BE',bone:'#E3DAC9',clay:'#BD5C00' }
const gridBg = `linear-gradient(rgba(218,145,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(218,145,0,0.04) 1px, transparent 1px)`

function Nav() {
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 48px',background:'rgba(13,37,53,0.72)',backdropFilter:'blur(16px)',borderBottom:'0.5px solid rgba(218,145,0,0.15)'}}>
      <a href="/"><img src="/logo-horizontal.png" alt="Matt McClay + Associates" style={{width:'220px',height:'auto',opacity:0.95}}/></a>
      <div style={{display:'flex',gap:'28px',alignItems:'center'}}>
        <a href="/about"    style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.bone,opacity:0.7}}>About</a>
        <a href="/packages" style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.bone,opacity:0.7}}>Packages</a>
        <a href="/events"   style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:C.gold}}>Events</a>
        <a href="/booking"  style={{background:C.gold,color:C.dark,borderRadius:'6px',padding:'10px 22px',fontSize:'11px',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase'}}>Book a flight</a>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer style={{borderTop:'0.5px solid rgba(218,145,0,0.1)',padding:'20px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'8px'}}>
      <span style={{fontSize:'11px',color:'rgba(227,218,201,0.25)'}}>mattmcclay.com  ·  Lynchburg, VA  </span>
      <span style={{fontSize:'11px',color:'rgba(218,145,0,0.5)',letterSpacing:'0.06em'}}>Weddings  ·  Proposals  ·  Corporate  ·  Celebrations</span>
    </footer>
  )
}

export default function Events() {
  return (
    <div style={{minHeight:'100vh',background:C.dark,fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} a{color:inherit;text-decoration:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes subtleZoom{from{transform:scale(1.04)}to{transform:scale(1.07)}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        @keyframes scrollPulse{0%,100%{opacity:0.4}50%{opacity:1}}
      `}</style>

      <Nav/>

      {/* HERO */}
      <section style={{position:'relative',height:'100vh',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{position:'absolute',inset:0,zIndex:0,backgroundImage:'url(/property_aerial.jpg)',backgroundSize:'cover',backgroundPosition:'center 30%',animation:'subtleZoom 20s ease infinite alternate'}}/>
        <div style={{position:'absolute',inset:0,zIndex:1,background:'linear-gradient(to bottom,rgba(13,37,53,0.65) 0%,rgba(13,37,53,0.45) 40%,rgba(13,37,53,0.92) 80%,rgba(13,37,53,1) 100%)'}}/>
        <div style={{position:'absolute',inset:0,zIndex:2,backgroundImage:gridBg,backgroundSize:'40px 40px',opacity:0.4,pointerEvents:'none'}}/>
        <div style={{position:'absolute',left:0,right:0,height:'1px',zIndex:3,background:'linear-gradient(to right,transparent,rgba(218,145,0,0.1),transparent)',animation:'scanline 10s linear infinite',pointerEvents:'none'}}/>

        <div style={{position:'relative',zIndex:10,textAlign:'center',padding:'160px 24px 0',maxWidth:'880px'}}>
          <div style={{fontSize:'10px',letterSpacing:'0.22em',textTransform:'uppercase',color:C.gold,marginBottom:'28px',animation:'fadeUp 0.8s ease 0.2s both'}}>
            Event Aerial  ·  Weddings  ·  Proposals  ·  Celebrations
          </div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(38px,6vw,72px)',lineHeight:1.08,color:C.bone,marginBottom:'28px',animation:'fadeUp 0.8s ease 0.4s both'}}>
            The moments that matter<br/><em style={{color:C.gold}}>deserve to be seen.</em>
          </h1>
          <p style={{fontSize:'17px',color:'rgba(227,218,201,0.6)',maxWidth:'480px',margin:'0 auto 44px',lineHeight:1.85,animation:'fadeUp 0.8s ease 0.6s both'}}>
            Aerial coverage that captures the scale, the setting, and the emotion of your most important days — from above.
          </p>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',animation:'fadeUp 0.8s ease 0.8s both'}}>
            <a href="/booking" style={{background:C.gold,color:C.dark,borderRadius:'8px',padding:'17px 40px',fontSize:'14px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase',boxShadow:'0 0 32px rgba(218,145,0,0.25)'}}>Book a flight</a>
            <a href="/packages" style={{background:'transparent',color:C.bone,border:'0.5px solid rgba(227,218,201,0.22)',borderRadius:'8px',padding:'17px 40px',fontSize:'14px',letterSpacing:'0.04em',textTransform:'uppercase'}}>All packages</a>
          </div>
        </div>

        <div style={{position:'absolute',bottom:'32px',left:'50%',transform:'translateX(-50%)',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:'8px'}}>
          <span style={{fontSize:'9px',letterSpacing:'0.16em',textTransform:'uppercase',color:'rgba(227,218,201,0.35)'}}>Scroll</span>
          <div style={{width:'1px',height:'40px',background:`linear-gradient(to bottom, ${C.gold}, transparent)`,animation:'scrollPulse 2s ease infinite'}}/>
        </div>
      </section>

      {/* WHAT WE COVER */}
      <section style={{borderTop:'1px solid rgba(218,145,0,0.12)',borderBottom:'1px solid rgba(218,145,0,0.12)',padding:'28px 48px',backgroundImage:gridBg,backgroundSize:'40px 40px',display:'flex',justifyContent:'center',gap:'52px',flexWrap:'wrap'}}>
        {[
          {label:'Weddings',          sub:'Ceremony, venue & reception'},
          {label:'Proposals',         sub:'The moment from above'},
          {label:'Corporate Events',  sub:'Conferences & brand moments'},
          {label:'Graduations',       sub:'Milestone celebrations'},
          {label:'Festivals & Fairs', sub:'Scale and atmosphere'},
          {label:'Private Parties',   sub:'Landmark occasions'},
        ].map(s=>(
          <div key={s.label} style={{textAlign:'center'}}>
            <p style={{fontSize:'10px',fontWeight:700,color:C.gold,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'4px'}}>{s.label}</p>
            <p style={{fontSize:'11px',color:'rgba(227,218,201,0.45)'}}>{s.sub}</p>
          </div>
        ))}
      </section>

      {/* WHY AERIAL */}
      <section style={{padding:'88px 48px',maxWidth:'1000px',margin:'0 auto'}}>
        <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl,marginBottom:'16px',textAlign:'center'}}>Why aerial</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4vw,44px)',color:C.bone,marginBottom:'56px',textAlign:'center'}}>
          No camera on the ground<br/>captures what a drone can.
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'40px'}}>
          {[
            {title:'The full picture',      body:'A single aerial frame captures the venue, the guests, the landscape — context that ground photography simply cannot show.',accent:C.gold},
            {title:'Unobtrusive presence',  body:"A drone above the treeline doesn't walk through your ceremony or stand between you and your guests. It's there, and then it's gone.",accent:C.clay},
            {title:'Cinematic moments',     body:'The first dance from above. The venue at golden hour. The crowd reaction. Footage that feels like a film, not a home video.',accent:C.pearl},
            {title:'A keepsake that lasts', body:'Delivered as edited photos and video — formatted for printing, sharing, and replaying for the rest of your life.',accent:C.bone},
          ].map((c,i)=>(
            <div key={i} style={{borderTop:`2px solid ${c.accent}`,paddingTop:'20px'}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:'17px',color:C.bone,marginBottom:'10px',lineHeight:1.3}}>{c.title}</p>
              <p style={{fontSize:'13px',color:'rgba(227,218,201,0.55)',lineHeight:1.8}}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{padding:'0 48px 88px',maxWidth:'1100px',margin:'0 auto'}}>
        <p style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:C.pearl,marginBottom:'16px',textAlign:'center'}}>Event Packages</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4vw,40px)',color:C.bone,marginBottom:'10px',textAlign:'center'}}>Simple. Transparent. Memorable.</h2>
        <p style={{fontSize:'14px',color:'rgba(227,218,201,0.4)',textAlign:'center',marginBottom:'48px'}}>50% deposit at booking · Balance due on the day</p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'18px',marginBottom:'36px'}}>
          {[
            {name:'Moment',price:'$599',tag:'2 Hours',accent:C.pearl,deposit:'$300 deposit',
              includes:['Up to 2 hours aerial coverage','30 edited aerial photos','60-second highlight reel','Social-ready cut-downs','Digital download portal'],
              ideal:'Proposals, intimate ceremonies, small gatherings'},
            {name:'Celebration',price:'$899',tag:'Half Day — 4 Hours',accent:C.gold,hot:true,deposit:'$450 deposit',
              includes:['Up to 4 hours aerial coverage','60 edited aerial photos','90-second highlight reel','Ceremony + reception coverage','Social-ready cut-downs','Digital download portal'],
              ideal:'Wedding ceremony, corporate events, graduations'},
            {name:'Full Day',price:'$1,395',tag:'Full Day — 8 Hours',accent:C.clay,deposit:'$700 deposit',
              includes:['Up to 8 hours aerial coverage','100+ edited aerial photos','3-minute cinematic video','Multiple location coverage','Social-ready cut-downs','Priority next-day delivery'],
              ideal:'Full wedding day, festivals, large corporate events'},
            {name:'Custom',price:"Let's talk",tag:'Bespoke',accent:C.bone,deposit:'50% at booking',
              includes:['Multi-day events','Destination coverage','Add-on to commercial shoot','Branded event content','Custom deliverable formats','Retainer arrangements'],
              ideal:'Unique events, destination weddings, brand activations'},
          ].map((pkg,i)=>(
            <div key={pkg.name} style={{background:pkg.hot?'rgba(218,145,0,0.07)':'rgba(255,255,255,0.03)',border:`0.5px solid ${pkg.hot?'rgba(218,145,0,0.4)':'rgba(227,218,201,0.08)'}`,borderTop:`2px solid ${pkg.accent}`,borderRadius:'14px',padding:'28px 22px',display:'flex',flexDirection:'column',boxShadow:pkg.hot?'0 0 40px rgba(218,145,0,0.08)':'none'}}>
              <p style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'0.14em',color:pkg.accent,marginBottom:'7px'}}>{pkg.tag}{pkg.hot?' — Most Popular':''}</p>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',color:C.bone,marginBottom:'5px'}}>{pkg.name}</p>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:'30px',color:C.bone,marginBottom:'10px'}}>{pkg.price}</p>
              <div style={{background:'rgba(218,145,0,0.08)',border:'0.5px solid rgba(218,145,0,0.25)',borderRadius:'5px',padding:'5px 8px',marginBottom:'14px'}}>
                <p style={{fontSize:'10px',fontWeight:700,color:C.gold}}>{pkg.deposit}</p>
              </div>
              <ul style={{listStyle:'none',flex:1,marginBottom:'18px'}}>
                {pkg.includes.map(item=>(
                  <li key={item} style={{fontSize:'12px',color:'rgba(227,218,201,0.65)',lineHeight:1.7,paddingLeft:'14px',position:'relative',marginBottom:'4px'}}>
                    <span style={{position:'absolute',left:0,color:pkg.accent}}>·</span>{item}
                  </li>
                ))}
              </ul>
              <div style={{borderTop:'0.5px solid rgba(227,218,201,0.07)',paddingTop:'12px'}}>
                <p style={{fontSize:'10px',color:C.pearl}}>Ideal for: {pkg.ideal}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center'}}>
          <p style={{fontSize:'12px',color:'rgba(227,218,201,0.3)',marginBottom:'24px'}}>All packages include Licensed & insured pilot · Fully insured · Virginia, West Virginia & North Carolina</p>
          <a href="/booking" style={{display:'inline-block',background:C.gold,color:C.dark,borderRadius:'8px',padding:'16px 40px',fontSize:'14px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase',boxShadow:'0 0 32px rgba(218,145,0,0.15)'}}>Book a flight</a>
        </div>
      </section>

      {/* ADD-ONS */}
      <section style={{padding:'0 48px 88px',maxWidth:'820px',margin:'0 auto'}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'28px',color:C.bone,marginBottom:'24px',textAlign:'center'}}>Add-ons</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'12px'}}>
          {[
            {name:'Extended edit reel',   price:'+$150',desc:'Up to 5-minute cut'},
            {name:'Same-day preview',     price:'+$100',desc:'5 edited photos within 2 hrs'},
            {name:'Second location',      price:'+$200',desc:'Additional venue or backdrop'},
            {name:'Raw footage files',    price:'+$75', desc:'Unedited video delivered'},
            {name:'Printed photo book',   price:'+$199',desc:'Premium 20-page print'},
            {name:'Social media package', price:'+$99', desc:'10 formatted story/reel cuts'},
          ].map(a=>(
            <div key={a.name} style={{background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(227,218,201,0.08)',borderRadius:'8px',padding:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                <p style={{fontSize:'12px',fontWeight:600,color:C.bone}}>{a.name}</p>
                <p style={{fontSize:'12px',color:C.gold,fontWeight:700}}>{a.price}</p>
              </div>
              <p style={{fontSize:'11px',color:'rgba(227,218,201,0.4)'}}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NOTES */}
      <section style={{margin:'0 48px 88px',padding:'40px 48px',background:'rgba(19,57,81,0.4)',border:'0.5px solid rgba(176,183,190,0.15)',borderRadius:'16px',backgroundImage:gridBg,backgroundSize:'40px 40px'}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',color:C.bone,marginBottom:'28px'}}>A few things to know</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:'28px'}}>
          {[
            {title:'Book early',      body:'Event dates fill up — especially May through October. Securing your date early ensures availability and gives Matt time to plan the flight path.'},
            {title:'Weather policy',  body:'Matt monitors conditions 72 hours out. If weather is unsafe for flight, we reschedule at no charge. Your day is protected.'},
            {title:'Venue permission',body:'Some venues require advance drone clearance. Matt handles all FAA airspace authorisation — just provide the venue when booking.'},
            {title:'Delivery',        body:'Edited photos and video delivered to your private portal within 24–48 hours. Download everything and share the link.'},
          ].map((n,i)=>(
            <div key={i} style={{borderTop:'1.5px solid rgba(218,145,0,0.35)',paddingTop:'16px'}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',color:C.bone,marginBottom:'8px'}}>{n.title}</p>
              <p style={{fontSize:'13px',color:'rgba(227,218,201,0.55)',lineHeight:1.75}}>{n.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'88px 48px',textAlign:'center',borderTop:'1px solid rgba(218,145,0,0.1)'}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4vw,48px)',color:C.bone,marginBottom:'18px',lineHeight:1.15}}>
          Your day deserves<br/><em style={{color:C.gold}}>the view from above.</em>
        </h2>
        <p style={{fontSize:'15px',color:'rgba(227,218,201,0.5)',maxWidth:'360px',margin:'0 auto 36px',lineHeight:1.85}}>
          First consultation is complimentary. Matt will walk through the venue, the flight plan, and what to expect on the day.
        </p>
        <a href="/booking" style={{display:'inline-block',background:C.gold,color:C.dark,borderRadius:'8px',padding:'17px 40px',fontSize:'14px',fontWeight:700,letterSpacing:'0.04em',textTransform:'uppercase',boxShadow:'0 0 32px rgba(218,145,0,0.2)'}}>Book a flight</a>
      </section>

      <Footer/>
    </div>
  )
}
