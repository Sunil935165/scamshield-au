import { useNavigate } from "react-router-dom";

const steps = [
  { icon:"📱", title:"Upload or Paste", desc:"Take a screenshot of any suspicious SMS, email or link and upload it, or simply paste the text directly into the app.", color:"#4f7cff" },
  { icon:"🤖", title:"AI Analysis", desc:"Our Claude AI instantly analyses the content against thousands of known Australian scam patterns and phishing techniques.", color:"#8b5cf6" },
  { icon:"📊", title:"Risk Score", desc:"You receive a clear risk percentage score from 0-100%, a scam classification badge, and the type of scam detected.", color:"#f97316" },
  { icon:"💬", title:"Plain English Explanation", desc:"Get a simple, easy-to-understand explanation of why the message is suspicious — no technical jargon.", color:"#22c55e" },
  { icon:"🛡️", title:"Action Guidance", desc:"Receive step-by-step instructions on exactly what to do — block the sender, contact your bank, report to Scamwatch.", color:"#ef4444" },
  { icon:"🔔", title:"Alert Family", desc:"With one tap, notify a trusted family member about the scam so they can help you stay safe.", color:"#ec4899" },
];

const faqs = [
  { q:"Is my data kept private?", a:"Yes. All your personal information is encrypted using AES-256 encryption and we comply with the Australian Privacy Act 1988." },
  { q:"How accurate is the AI?", a:"Our AI is trained on Australian Scamwatch data and achieves high accuracy. However, always use your own judgement as well." },
  { q:"Does it cost money to use?", a:"The basic scan feature is free. Premium features like unlimited history and family alerts may require a subscription." },
  { q:"What types of scams can it detect?", a:"Phishing scams, bank scams, delivery scams, lottery scams, romance scams, and many more Australian-specific scam types." },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div style={{maxWidth:"600px",margin:"0 auto",padding:"32px 20px"}}>

      <button onClick={() => navigate("/")} style={{
        background:"none",border:"1px solid rgba(255,255,255,0.1)",
        color:"rgba(255,255,255,0.5)",borderRadius:"10px",
        padding:"8px 16px",fontSize:"13px",cursor:"pointer",marginBottom:"28px"
      }}>← Back</button>

      <div style={{textAlign:"center",marginBottom:"40px"}}>
        <div style={{
          display:"inline-block",
          background:"rgba(79,124,255,0.1)",
          border:"1px solid rgba(79,124,255,0.2)",
          borderRadius:"20px",padding:"6px 16px",marginBottom:"16px"
        }}>
          <span style={{fontSize:"12px",color:"#a0b4ff",letterSpacing:"0.5px"}}>How ScamShield AU Works</span>
        </div>
        <h1 style={{
          fontSize:"32px",fontWeight:"800",marginBottom:"12px",
          background:"linear-gradient(135deg,#ffffff,#a0b4ff)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
          lineHeight:"1.2"
        }}>Protecting Australians<br/>from Online Scams</h1>
        <p style={{fontSize:"14px",color:"rgba(255,255,255,0.5)",lineHeight:"1.7"}}>
          ScamShield AU uses advanced AI technology to detect scams instantly,
          helping elderly Australians stay safe online.
        </p>
      </div>

      <div style={{marginBottom:"32px"}}>
        {steps.map((step,i) => (
          <div key={i} style={{
            display:"flex",gap:"16px",marginBottom:"16px",
            background:"rgba(255,255,255,0.03)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"16px",padding:"20px"
          }}>
            <div style={{
              width:"48px",height:"48px",borderRadius:"14px",flexShrink:0,
              background:`linear-gradient(135deg,${step.color}25,${step.color}10)`,
              border:`1px solid ${step.color}30`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px"
            }}>{step.icon}</div>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
                <span style={{
                  fontSize:"11px",fontWeight:"700",color:step.color,
                  background:`${step.color}15`,borderRadius:"6px",padding:"2px 8px"
                }}>STEP {i+1}</span>
                <span style={{fontSize:"14px",fontWeight:"700",color:"#ffffff"}}>{step.title}</span>
              </div>
              <p style={{fontSize:"13px",color:"rgba(255,255,255,0.5)",lineHeight:"1.6"}}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background:"linear-gradient(135deg,rgba(79,124,255,0.1),rgba(139,92,246,0.05))",
        border:"1px solid rgba(79,124,255,0.2)",
        borderRadius:"20px",padding:"28px",marginBottom:"32px"
      }}>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.5px",textAlign:"center",marginBottom:"20px"}}>Trusted by Australians</p>
        <div style={{display:"flex",gap:"16px",textAlign:"center"}}>
          {[["$3.1B","Lost to scams in 2022"],["65+","Most targeted age group"],["99.5%","App uptime guarantee"],["3 sec","Analysis time"]].map(([val,label]) => (
            <div key={label} style={{flex:1}}>
              <div style={{
                fontSize:"20px",fontWeight:"800",marginBottom:"4px",
                background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
              }}>{val}</div>
              <div style={{fontSize:"10px",color:"rgba(255,255,255,0.3)",lineHeight:"1.4"}}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{marginBottom:"32px"}}>
        <p style={{fontSize:"16px",fontWeight:"700",color:"#ffffff",marginBottom:"16px"}}>Frequently Asked Questions</p>
        {faqs.map((faq,i) => (
          <div key={i} style={{
            background:"rgba(255,255,255,0.03)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"14px",padding:"18px",marginBottom:"10px"
          }}>
            <p style={{fontSize:"14px",fontWeight:"600",color:"#ffffff",marginBottom:"8px"}}>❓ {faq.q}</p>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,0.5)",lineHeight:"1.6"}}>{faq.a}</p>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/")} style={{
        width:"100%",padding:"16px",
        background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
        color:"white",border:"none",borderRadius:"14px",
        fontSize:"16px",fontWeight:"700",cursor:"pointer",
        boxShadow:"0 8px 30px rgba(79,124,255,0.4)"
      }}>
        🛡️ Start Scanning Now
      </button>
    </div>
  );
}