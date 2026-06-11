import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      background:"#ffffff",
      minHeight:"100vh",
      color:"#111827",
      fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>

      <nav style={{
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"18px 60px",
        borderBottom:"1px solid #e5e7eb",
        background:"white",
        position:"sticky",top:0,zIndex:100
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{
            width:"36px",height:"36px",borderRadius:"10px",
            background:"linear-gradient(135deg,#dc2626,#991b1b)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:"18px"
          }}>🛡️</div>
          <div>
            <div style={{fontSize:"16px",fontWeight:"800",color:"#111827"}}>ScamShield AU</div>
            <div style={{fontSize:"10px",color:"#9ca3af",letterSpacing:"0.5px"}}>Powered by Claude AI</div>
          </div>
        </div>
        <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
          <button onClick={() => navigate("/login")} style={{
            padding:"9px 20px",borderRadius:"8px",
            background:"white",border:"1px solid #e5e7eb",
            color:"#374151",fontSize:"14px",fontWeight:"500",cursor:"pointer"
          }}>Log in</button>
          <button onClick={() => navigate("/register")} style={{
            padding:"9px 20px",borderRadius:"8px",
            background:"#dc2626",border:"none",
            color:"white",fontSize:"14px",fontWeight:"600",cursor:"pointer",
            boxShadow:"0 4px 14px rgba(220,38,38,0.3)"
          }}>Get Started Free →</button>
        </div>
      </nav>

      <div style={{
        maxWidth:"1100px",margin:"0 auto",
        padding:"90px 60px 80px",
        display:"grid",gridTemplateColumns:"1.1fr 0.9fr",
        gap:"60px",alignItems:"center"
      }}>
        <div>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:"8px",
            background:"#fef2f2",border:"1px solid #fecaca",
            borderRadius:"20px",padding:"6px 14px",marginBottom:"24px"
          }}>
            <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#dc2626",boxShadow:"0 0 6px #dc2626"}}></div>
            <span style={{fontSize:"12px",color:"#dc2626",fontWeight:"600",letterSpacing:"0.5px",textTransform:"uppercase"}}>
              Protecting Elderly Australians
            </span>
          </div>

          <h1 style={{
            fontSize:"58px",fontWeight:"800",lineHeight:"1.05",
            color:"#111827",marginBottom:"24px",letterSpacing:"-2px"
          }}>
            Detect scams<br/>and stay safe<br/>
            <span style={{color:"#dc2626"}}>in seconds.</span>
          </h1>

          <p style={{
            fontSize:"18px",color:"#6b7280",lineHeight:"1.7",
            marginBottom:"36px",maxWidth:"480px"
          }}>
            ScamShield AU uses AI to instantly analyse suspicious messages and protect you from online scams. Simple enough for everyone to use.
          </p>

          <div style={{display:"flex",gap:"12px",marginBottom:"48px"}}>
            <button onClick={() => navigate("/register")} style={{
              padding:"15px 32px",borderRadius:"10px",
              background:"#dc2626",border:"none",
              color:"white",fontSize:"16px",fontWeight:"700",cursor:"pointer",
              boxShadow:"0 8px 25px rgba(220,38,38,0.35)"
            }}>Get Started Free →</button>
            <button onClick={() => navigate("/how-it-works")} style={{
              padding:"15px 32px",borderRadius:"10px",
              background:"white",border:"1px solid #e5e7eb",
              color:"#374151",fontSize:"16px",fontWeight:"600",cursor:"pointer"
            }}>See How It Works</button>
          </div>

          <div style={{display:"flex",gap:"28px"}}>
            {[
              { num:"$2.18B", label:"Lost to scams in Australia 2025" },
              { num:"26.5%", label:"Elderly share of losses" },
              { num:"3 sec", label:"Average analysis time" },
            ].map(s => (
              <div key={s.num}>
                <div style={{fontSize:"22px",fontWeight:"800",color:"#dc2626"}}>{s.num}</div>
                <div style={{fontSize:"11px",color:"#9ca3af",marginTop:"2px",lineHeight:"1.4",maxWidth:"90px"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background:"#f9fafb",
          border:"1px solid #e5e7eb",
          borderRadius:"20px",padding:"32px",
          boxShadow:"0 20px 60px rgba(0,0,0,0.08)"
        }}>
          <div style={{
            background:"white",border:"1px solid #e5e7eb",
            borderRadius:"14px",padding:"20px",marginBottom:"16px"
          }}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"8px",background:"#fef2f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px"}}>⚠️</div>
              <div>
                <p style={{fontSize:"12px",fontWeight:"600",color:"#dc2626"}}>Scam Detected</p>
                <p style={{fontSize:"11px",color:"#9ca3af"}}>Phishing SMS</p>
              </div>
              <div style={{marginLeft:"auto",width:"44px",height:"44px",borderRadius:"50%",background:"#dc2626",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:"800",color:"white",boxShadow:"0 4px 12px rgba(220,38,38,0.4)"}}>🔴</div>
            </div>
            <p style={{fontSize:"12px",color:"#6b7280",background:"#f9fafb",borderRadius:"8px",padding:"10px",lineHeight:"1.5"}}>
              "URGENT: Your Commonwealth Bank account has been suspended. Click here to verify..."
            </p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"16px"}}>
            {[
              { icon:"🤖", label:"AI Detection", color:"#eff6ff" },
              { icon:"🔔", label:"Family Alert", color:"#fef2f2" },
              { icon:"🔊", label:"Read Aloud", color:"#f0fdf4" },
              { icon:"📊", label:"Analytics", color:"#fdf4ff" },
            ].map(f => (
              <div key={f.label} style={{
                background:f.color,borderRadius:"10px",padding:"12px",
                display:"flex",alignItems:"center",gap:"8px"
              }}>
                <span style={{fontSize:"16px"}}>{f.icon}</span>
                <span style={{fontSize:"12px",fontWeight:"600",color:"#374151"}}>{f.label}</span>
              </div>
            ))}
          </div>

          <button onClick={() => navigate("/register")} style={{
            width:"100%",padding:"13px",borderRadius:"10px",
            background:"#dc2626",border:"none",
            color:"white",fontSize:"14px",fontWeight:"700",cursor:"pointer"
          }}>Start Protecting Yourself Free →</button>
        </div>
      </div>

      <div style={{background:"#f9fafb",borderTop:"1px solid #e5e7eb",borderBottom:"1px solid #e5e7eb",padding:"60px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <h2 style={{fontSize:"32px",fontWeight:"800",color:"#111827",textAlign:"center",marginBottom:"8px",letterSpacing:"-0.5px"}}>
            Everything you need to stay safe
          </h2>
          <p style={{fontSize:"16px",color:"#6b7280",textAlign:"center",marginBottom:"48px"}}>
            Built specifically for elderly Australians
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"24px"}}>
            {[
              { icon:"🤖", title:"AI-Powered Detection", desc:"Claude AI analyses every message against thousands of known Australian scam patterns in real time." },
              { icon:"📸", title:"Screenshot Scanning", desc:"Upload a screenshot of any suspicious message and our OCR technology reads the text automatically." },
              { icon:"🔊", title:"Read Aloud", desc:"Have results read to you in English, Mandarin, Japanese, Spanish and more languages." },
              { icon:"🔔", title:"Family Alerts", desc:"Automatically email a trusted family member when a scam is detected on your device." },
              { icon:"📊", title:"Analytics Dashboard", desc:"Track all your scans and see statistics about the types of scams detected over time." },
              { icon:"🛡️", title:"Action Guidance", desc:"Get clear, plain-English instructions on exactly what to do after a scam is detected." },
            ].map(f => (
              <div key={f.title} style={{
                background:"white",border:"1px solid #e5e7eb",
                borderRadius:"16px",padding:"24px"
              }}>
                <div style={{
                  width:"44px",height:"44px",borderRadius:"12px",
                  background:"#fef2f2",marginBottom:"16px",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px"
                }}>{f.icon}</div>
                <p style={{fontSize:"15px",fontWeight:"700",color:"#111827",marginBottom:"6px"}}>{f.title}</p>
                <p style={{fontSize:"13px",color:"#6b7280",lineHeight:"1.6"}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        background:"linear-gradient(135deg,#dc2626,#991b1b)",
        padding:"70px 60px",textAlign:"center"
      }}>
        <h2 style={{fontSize:"36px",fontWeight:"800",color:"white",marginBottom:"12px",letterSpacing:"-0.5px"}}>
          Start protecting yourself today
        </h2>
        <p style={{fontSize:"16px",color:"rgba(255,255,255,0.8)",marginBottom:"32px"}}>
          Free to use. No credit card required.
        </p>
        <button onClick={() => navigate("/register")} style={{
          padding:"16px 40px",borderRadius:"12px",
          background:"white",border:"none",
          color:"#dc2626",fontSize:"16px",fontWeight:"800",cursor:"pointer",
          boxShadow:"0 8px 25px rgba(0,0,0,0.2)"
        }}>Get Started Free →</button>
      </div>

      <div style={{
        background:"#111827",padding:"32px 60px",
        display:"flex",alignItems:"center",justifyContent:"space-between"
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <span style={{fontSize:"18px"}}>🛡️</span>
          <span style={{fontSize:"14px",fontWeight:"700",color:"white"}}>ScamShield AU</span>
          <span style={{fontSize:"12px",color:"#6b7280"}}>— Protecting elderly Australians from online scams</span>
        </div>
        <span style={{fontSize:"12px",color:"#6b7280"}}>Data: ACCC Targeting Scams Report 2025</span>
      </div>
    </div>
  );
}
