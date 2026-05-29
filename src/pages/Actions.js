import { useLocation, useNavigate } from "react-router-dom";
import AudioButton from "../components/AudioButton";

export default function Actions() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  const immediate = result?.immediateActions || [
    "Do NOT click any links in the message.",
    "Block the sender on your phone or email app.",
    "Contact your bank immediately on their official number.",
    "Report the scam to Scamwatch at scamwatch.gov.au"
  ];
  const prevention = result?.preventionTips || [
    "Never share your OTP or password with anyone.",
    "Only use your bank's official website or app.",
    "Enable two-factor authentication on your accounts."
  ];

  const card = {
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"20px",padding:"24px",marginBottom:"16px"
  };

  return (
    <div style={{maxWidth:"580px",margin:"0 auto",padding:"40px 20px"}}>

      <button onClick={() => navigate(-1)} style={{
        background:"none",border:"1px solid rgba(255,255,255,0.1)",
        color:"rgba(255,255,255,0.5)",borderRadius:"10px",
        padding:"8px 16px",fontSize:"13px",cursor:"pointer",marginBottom:"24px"
      }}>← Back</button>

      <h1 style={{
        fontSize:"28px",fontWeight:"800",marginBottom:"6px",
        background:"linear-gradient(135deg,#ffffff,#a0b4ff)",
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
      }}>What To Do Now</h1>
      <p style={{fontSize:"14px",color:"rgba(255,255,255,0.4)",marginBottom:"28px"}}>
        Follow these steps to protect yourself.
      </p>

      <AudioButton text={[...immediate,...prevention].join(". ")}/>

      <div style={{
        ...card,
        background:"linear-gradient(135deg,rgba(239,68,68,0.08),rgba(220,38,38,0.03))",
        border:"1px solid rgba(239,68,68,0.15)"
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
          <div style={{
            width:"32px",height:"32px",borderRadius:"10px",
            background:"rgba(239,68,68,0.15)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px"
          }}>🚨</div>
          <div>
            <p style={{fontSize:"14px",fontWeight:"700",color:"#fca5a5"}}>Act Immediately</p>
            <p style={{fontSize:"11px",color:"rgba(255,255,255,0.3)"}}>Do these right now</p>
          </div>
        </div>
        {immediate.map((action, i) => (
          <div key={i} style={{
            display:"flex",gap:"12px",padding:"12px 0",
            borderBottom: i < immediate.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none"
          }}>
            <div style={{
              width:"22px",height:"22px",borderRadius:"50%",flexShrink:0,
              background:"rgba(239,68,68,0.2)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:"11px",color:"#fca5a5",fontWeight:"700",marginTop:"1px"
            }}>{i+1}</div>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,0.75)",lineHeight:"1.6"}}>{action}</p>
          </div>
        ))}
      </div>

      <div style={{
        ...card,
        background:"linear-gradient(135deg,rgba(34,197,94,0.08),rgba(22,163,74,0.03))",
        border:"1px solid rgba(34,197,94,0.15)"
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
          <div style={{
            width:"32px",height:"32px",borderRadius:"10px",
            background:"rgba(34,197,94,0.15)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px"
          }}>🛡️</div>
          <div>
            <p style={{fontSize:"14px",fontWeight:"700",color:"#86efac"}}>Stay Safe in the Future</p>
            <p style={{fontSize:"11px",color:"rgba(255,255,255,0.3)"}}>Prevention tips</p>
          </div>
        </div>
        {prevention.map((tip, i) => (
          <div key={i} style={{
            display:"flex",gap:"12px",padding:"12px 0",
            borderBottom: i < prevention.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none"
          }}>
            <div style={{
              width:"22px",height:"22px",borderRadius:"50%",flexShrink:0,
              background:"rgba(34,197,94,0.2)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:"11px",color:"#86efac",fontWeight:"700",marginTop:"1px"
            }}>{i+1}</div>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,0.75)",lineHeight:"1.6"}}>{tip}</p>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/")} style={{
        width:"100%",padding:"16px",
        background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
        color:"white",border:"none",borderRadius:"14px",
        fontSize:"15px",fontWeight:"700",cursor:"pointer",
        boxShadow:"0 8px 30px rgba(79,124,255,0.4)"
      }}>
        🔍 Scan Another Message
      </button>
    </div>
  );
}