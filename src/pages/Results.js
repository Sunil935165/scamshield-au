import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AudioButton from "../components/AudioButton";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const [showDetailed, setShowDetailed] = useState(false);
  const [animatedRisk, setAnimatedRisk] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!result) { navigate("/"); return; }
    setTimeout(() => setShowContent(true), 100);
    const target = result.riskPercentage || 0;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setAnimatedRisk(target);
        clearInterval(timer);
      } else {
        setAnimatedRisk(Math.round(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [result, navigate]);

  if (!result) return null;

  const isScam = result.classification === "Likely Scam";
  const risk = result.riskPercentage || 0;
  const color = risk > 50 ? "#ef4444" : "#22c55e";
  const bgColor = risk > 50 ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)";
  const borderColor = risk > 50 ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)";

  return (
    <div style={{
      maxWidth:"540px",margin:"0 auto",padding:"32px 20px",
      opacity: showContent ? 1 : 0,
      transform: showContent ? "translateY(0)" : "translateY(20px)",
      transition:"all 0.4s ease"
    }}>

      <button onClick={() => navigate("/")} style={{
        background:"none",border:"1px solid rgba(255,255,255,0.1)",
        color:"rgba(255,255,255,0.5)",borderRadius:"10px",
        padding:"8px 16px",fontSize:"13px",cursor:"pointer",marginBottom:"24px"
      }}>← Scan Again</button>

      {/* Colour indicator card */}
      <div style={{
        background: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius:"24px",padding:"40px 24px",
        textAlign:"center",marginBottom:"16px"
      }}>

        {/* Big colour circle */}
        <div style={{
          width:"140px",height:"140px",borderRadius:"50%",
          background: color,
          margin:"0 auto 24px",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"64px",
          boxShadow:`0 0 60px ${color}60`,
          animation: risk > 50 ? "pulse-red 1.5s ease-in-out infinite" : "pulse-green 1.5s ease-in-out infinite"
        }}>
          {risk > 50 ? "⚠️" : "✅"}
        </div>

        {/* Risk label */}
        <div style={{
          fontSize:"28px",fontWeight:"800",
          color: color,
          marginBottom:"8px",
          letterSpacing:"-0.5px"
        }}>
          {risk > 70 ? "High Risk" : risk > 50 ? "Medium Risk" : risk > 20 ? "Low Risk" : "Very Safe"}
        </div>

        {/* Classification badge */}
        <div style={{
          display:"inline-flex",alignItems:"center",gap:"8px",
          padding:"8px 20px",borderRadius:"20px",marginBottom:"12px",
          background: isScam ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)",
          border: isScam ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(34,197,94,0.3)"
        }}>
          <span style={{
            fontSize:"15px",fontWeight:"700",
            color: isScam ? "#fca5a5" : "#86efac"
          }}>{result.classification}</span>
        </div>

        {/* Scam type pill */}
        <div>
          <div style={{
            display:"inline-block",
            background:"rgba(79,124,255,0.1)",
            border:"1px solid rgba(79,124,255,0.2)",
            borderRadius:"20px",padding:"4px 14px",
            fontSize:"12px",color:"#a0b4ff"
          }}>{result.scamType}</div>
        </div>

        {/* Colour meaning label */}
        <div style={{
          marginTop:"20px",padding:"12px 16px",
          background:"rgba(0,0,0,0.15)",
          borderRadius:"12px",
          fontSize:"13px",
          color:"rgba(255,255,255,0.6)",
          lineHeight:"1.6"
        }}>
          {risk > 50
            ? "🔴 Red means this message is likely dangerous. Please read the explanation and follow the action steps below."
            : "🟢 Green means this message appears safe. Always stay cautious with unexpected messages."}
        </div>
      </div>

      {/* Explanation */}
      <div style={{
        background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"20px",padding:"20px",marginBottom:"16px"
      }}>
        <div style={{display:"flex",gap:"8px",marginBottom:"16px"}}>
          {["Simple","Detailed"].map(mode => (
            <button key={mode} onClick={() => setShowDetailed(mode==="Detailed")} style={{
              flex:1,padding:"9px",borderRadius:"10px",fontSize:"13px",
              fontWeight:"500",cursor:"pointer",border:"none",
              background: (showDetailed ? "Detailed" : "Simple")===mode
                ? "linear-gradient(135deg,#4f7cff,#8b5cf6)"
                : "rgba(255,255,255,0.05)",
              color: (showDetailed ? "Detailed" : "Simple")===mode
                ? "#fff" : "rgba(255,255,255,0.4)"
            }}>{mode}</button>
          ))}
        </div>

        <p style={{
          fontSize:"14px",color:"rgba(255,255,255,0.75)",
          lineHeight:"1.7",marginBottom:"16px"
        }}>
          {showDetailed ? result.detailedExplanation : result.simpleExplanation}
        </p>

        <AudioButton text={showDetailed ? result.detailedExplanation : result.simpleExplanation} />
      </div>

      {/* Actions button */}
      <button onClick={() => navigate("/actions", { state: { result } })} style={{
        width:"100%",padding:"16px",
        background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
        color:"white",border:"none",borderRadius:"14px",
        fontSize:"15px",fontWeight:"700",cursor:"pointer",
        boxShadow:"0 8px 30px rgba(79,124,255,0.4)",marginBottom:"12px"
      }}>
        See What To Do Now →
      </button>

      <button onClick={() => navigate("/")} style={{
        width:"100%",padding:"14px",
        background:"rgba(255,255,255,0.03)",
        color:"rgba(255,255,255,0.5)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"14px",fontSize:"14px",cursor:"pointer"
      }}>
        Scan Another Message
      </button>

      <style>{`
        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 40px rgba(239,68,68,0.4); }
          50% { box-shadow: 0 0 80px rgba(239,68,68,0.8); }
        }
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 40px rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 80px rgba(34,197,94,0.8); }
        }
      `}</style>
    </div>
  );
}