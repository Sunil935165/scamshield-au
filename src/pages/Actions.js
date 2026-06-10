import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FamilyAlertPopup from "../components/FamilyAlertPopup";
import AudioButton from "../components/AudioButton";

export default function Actions() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const [showAlert, setShowAlert] = useState(false);

  if (!result) {
    navigate("/");
    return null;
  }

  return (
    <div style={{maxWidth:"540px",margin:"0 auto",padding:"32px 20px"}}>

      <button onClick={() => navigate("/results", { state: { result } })} style={{
        background:"none",border:"1px solid rgba(255,255,255,0.1)",
        color:"rgba(255,255,255,0.5)",borderRadius:"10px",
        padding:"8px 16px",fontSize:"13px",cursor:"pointer",marginBottom:"24px"
      }}>← Back to Results</button>

      <h1 style={{
        fontSize:"24px",fontWeight:"800",marginBottom:"8px",
        background:"linear-gradient(135deg,#ffffff,#a0b4ff)",
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
      }}>What To Do Now</h1>
      <p style={{fontSize:"13px",color:"rgba(255,255,255,0.4)",marginBottom:"24px"}}>
        Follow these steps to stay safe
      </p>

      {/* Immediate Actions */}
      <div style={{
        background:"rgba(239,68,68,0.05)",
        border:"1px solid rgba(239,68,68,0.15)",
        borderRadius:"20px",padding:"24px",marginBottom:"16px"
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
          <div style={{
            width:"36px",height:"36px",borderRadius:"10px",
            background:"rgba(239,68,68,0.15)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"
          }}>🚨</div>
          <p style={{fontSize:"15px",fontWeight:"700",color:"#fca5a5"}}>
            Immediate Actions
          </p>
        </div>
        {(result.immediateActions || []).map((action, i) => (
          <div key={i} style={{
            display:"flex",gap:"12px",padding:"12px 0",
            borderBottom: i < (result.immediateActions.length - 1)
              ? "1px solid rgba(239,68,68,0.1)" : "none"
          }}>
            <div style={{
              width:"24px",height:"24px",borderRadius:"50%",flexShrink:0,
              background:"rgba(239,68,68,0.2)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:"12px",fontWeight:"700",color:"#fca5a5"
            }}>{i+1}</div>
            <p style={{fontSize:"14px",color:"rgba(255,255,255,0.8)",lineHeight:"1.6"}}>
              {action}
            </p>
          </div>
        ))}
        <div style={{marginTop:"16px"}}>
          <AudioButton text={(result.immediateActions || []).join(". ")} />
        </div>
      </div>

      {/* Prevention Tips */}
      <div style={{
        background:"rgba(34,197,94,0.05)",
        border:"1px solid rgba(34,197,94,0.15)",
        borderRadius:"20px",padding:"24px",marginBottom:"16px"
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
          <div style={{
            width:"36px",height:"36px",borderRadius:"10px",
            background:"rgba(34,197,94,0.15)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"
          }}>🛡️</div>
          <p style={{fontSize:"15px",fontWeight:"700",color:"#86efac"}}>
            Prevention Tips
          </p>
        </div>
        {(result.preventionTips || []).map((tip, i) => (
          <div key={i} style={{
            display:"flex",gap:"12px",padding:"12px 0",
            borderBottom: i < (result.preventionTips.length - 1)
              ? "1px solid rgba(34,197,94,0.1)" : "none"
          }}>
            <span style={{color:"#4ade80",flexShrink:0,fontSize:"16px"}}>✓</span>
            <p style={{fontSize:"14px",color:"rgba(255,255,255,0.8)",lineHeight:"1.6"}}>
              {tip}
            </p>
          </div>
        ))}
      </div>

      {/* Alert Family Button */}
      <button onClick={() => setShowAlert(true)} style={{
        width:"100%",padding:"16px",marginBottom:"12px",
        background:"linear-gradient(135deg,#f97316,#ef4444)",
        color:"white",border:"none",borderRadius:"14px",
        fontSize:"15px",fontWeight:"700",cursor:"pointer",
        boxShadow:"0 8px 30px rgba(239,68,68,0.4)",
        display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"
      }}>
        <span>🔔</span>
        <span>Alert a Family Member</span>
      </button>

      {/* Report to Scamwatch */}
      <a href="https://www.scamwatch.gov.au" target="_blank" rel="noreferrer" style={{
        display:"block",width:"100%",padding:"14px",marginBottom:"12px",
        background:"rgba(255,255,255,0.03)",
        color:"rgba(255,255,255,0.6)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"14px",fontSize:"14px",
        textAlign:"center",textDecoration:"none",
        fontWeight:"500"
      }}>
        🚨 Report to Scamwatch
      </a>

      <button onClick={() => navigate("/")} style={{
        width:"100%",padding:"14px",
        background:"rgba(255,255,255,0.03)",
        color:"rgba(255,255,255,0.5)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"14px",fontSize:"14px",cursor:"pointer"
      }}>
        Scan Another Message
      </button>

      {showAlert && (
        <FamilyAlertPopup
          result={result}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
