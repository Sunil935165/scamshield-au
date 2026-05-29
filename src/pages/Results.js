import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FamilyAlertPopup from "../components/FamilyAlertPopup";
import AudioButton from "../components/AudioButton";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState("simple");
  const [showPopup, setShowPopup] = useState(false);
  const [animatedRisk, setAnimatedRisk] = useState(0);

  useEffect(() => {
    if (!state?.result) return;
    const target = state.result.riskPercentage;
    let current = 0;
    const timer = setInterval(() => {
      current += 2;
      if (current >= target) {
        setAnimatedRisk(target);
        clearInterval(timer);
      } else {
        setAnimatedRisk(current);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [state]);

  if (!state?.result) return (
    <div style={{textAlign:"center",padding:"60px 20px"}}>
      <p style={{color:"rgba(255,255,255,0.5)"}}>No results yet.</p>
      <a href="/" style={{color:"#4f7cff"}}>Go back home</a>
    </div>
  );

  const { result } = state;
  const isScam = result.classification === "Likely Scam";
  const risk = animatedRisk;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (risk / 100) * circumference;

  const card = {
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"20px",padding:"24px",
    backdropFilter:"blur(10px)",marginBottom:"16px"
  };

  return (
    <div style={{maxWidth:"580px",margin:"0 auto",padding:"40px 20px"}}>

      <button onClick={() => navigate("/")} style={{
        background:"none",border:"1px solid rgba(255,255,255,0.1)",
        color:"rgba(255,255,255,0.5)",borderRadius:"10px",
        padding:"8px 16px",fontSize:"13px",cursor:"pointer",marginBottom:"24px",
        display:"flex",alignItems:"center",gap:"6px"
      }}>← Back</button>

      <div style={{
        ...card,
        background: isScam
          ? "linear-gradient(135deg,rgba(239,68,68,0.1),rgba(220,38,38,0.05))"
          : "linear-gradient(135deg,rgba(34,197,94,0.1),rgba(22,163,74,0.05))",
        border: isScam ? "1px solid rgba(239,68,68,0.2)" : "1px solid rgba(34,197,94,0.2)",
        textAlign:"center",padding:"36px 24px"
      }}>
        <svg width="110" height="110" style={{display:"block",margin:"0 auto 20px"}}>
          <circle cx="55" cy="55" r="40" fill="none"
            stroke={isScam ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)"} strokeWidth="10"/>
          <circle cx="55" cy="55" r="40" fill="none"
            stroke={isScam ? "#ef4444" : "#22c55e"} strokeWidth="10"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(-90 55 55)"
            style={{
              transition:"stroke-dashoffset 0.1s ease",
              filter: isScam ? "drop-shadow(0 0 8px #ef4444)" : "drop-shadow(0 0 8px #22c55e)"
            }}/>
          <text x="55" y="52" textAnchor="middle" fontSize="22" fontWeight="800"
            fill={isScam ? "#ef4444" : "#22c55e"}>{risk}%</text>
          <text x="55" y="68" textAnchor="middle" fontSize="10"
            fill="rgba(255,255,255,0.4)">RISK</text>
        </svg>

        <div style={{
          display:"inline-block",padding:"8px 24px",borderRadius:"30px",
          fontSize:"15px",fontWeight:"700",marginBottom:"12px",
          background: isScam ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)",
          color: isScam ? "#fca5a5" : "#86efac",
          border: isScam ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(34,197,94,0.3)"
        }}>
          {isScam ? "⚠️ Likely Scam" : "✅ Unlikely Scam"}
        </div>

        <div>
          <span style={{
            display:"inline-block",
            background:"rgba(79,124,255,0.15)",
            color:"#a0b4ff",border:"1px solid rgba(79,124,255,0.2)",
            borderRadius:"20px",padding:"4px 14px",fontSize:"12px",fontWeight:"500"
          }}>
            {result.scamType}
          </span>
        </div>
      </div>

      <div style={card}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.5px"}}>Analysis</p>
          <AudioButton text={mode === "simple" ? result.simpleExplanation : result.detailedExplanation}/>
        </div>

        <div style={{display:"flex",gap:"8px",marginBottom:"16px"}}>
          {["simple","detailed"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex:1,padding:"10px",borderRadius:"10px",fontSize:"13px",
              fontWeight:"500",cursor:"pointer",border:"1px solid",transition:"all 0.2s",
              background: mode===m ? "linear-gradient(135deg,#4f7cff,#8b5cf6)" : "rgba(255,255,255,0.03)",
              color: mode===m ? "#fff" : "rgba(255,255,255,0.4)",
              borderColor: mode===m ? "transparent" : "rgba(255,255,255,0.08)",
              boxShadow: mode===m ? "0 4px 15px rgba(79,124,255,0.3)" : "none"
            }}>
              {m === "simple" ? "💬 Simple" : "🔬 Detailed"}
            </button>
          ))}
        </div>

        <p style={{
          fontSize:"14px",color:"rgba(255,255,255,0.75)",lineHeight:"1.7",
          padding:"16px",background:"rgba(255,255,255,0.03)",
          borderRadius:"12px",border:"1px solid rgba(255,255,255,0.06)"
        }}>
          {mode === "simple" ? result.simpleExplanation : result.detailedExplanation}
        </p>
      </div>

      <button onClick={() => navigate("/actions", { state: { result } })} style={{
        width:"100%",padding:"16px",marginBottom:"12px",
        background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
        color:"white",border:"none",borderRadius:"14px",
        fontSize:"15px",fontWeight:"700",cursor:"pointer",
        boxShadow:"0 8px 30px rgba(79,124,255,0.4)"
      }}>
        🛡️ What Should I Do?
      </button>

      <button onClick={() => setShowPopup(true)} style={{
        width:"100%",padding:"16px",
        background:"rgba(255,255,255,0.05)",
        color:"rgba(255,255,255,0.8)",
        border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:"14px",fontSize:"15px",fontWeight:"600",cursor:"pointer"
      }}>
        🔔 Alert a Family Member
      </button>

      {showPopup && <FamilyAlertPopup result={result} onClose={() => setShowPopup(false)}/>}
    </div>
  );
}