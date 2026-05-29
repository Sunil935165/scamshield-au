import { useState } from "react";

const steps = [
  {
    icon: "🛡️",
    title: "Welcome to ScamShield AU",
    desc: "Your personal AI-powered scam detection app. We help protect you and your family from online scams in Australia.",
    color: "#4f7cff"
  },
  {
    icon: "📸",
    title: "Upload or Paste a Message",
    desc: "Take a screenshot of any suspicious SMS, email or link and upload it — or simply paste the text directly into the app.",
    color: "#8b5cf6"
  },
  {
    icon: "🤖",
    title: "AI Analyses It Instantly",
    desc: "Our Claude AI checks the message against thousands of known Australian scam patterns and gives you a risk score in seconds.",
    color: "#f97316"
  },
  {
    icon: "📊",
    title: "Get a Clear Risk Score",
    desc: "You receive a risk percentage from 0 to 100%, a Likely Scam or Unlikely Scam badge, and a plain-English explanation.",
    color: "#22c55e"
  },
  {
    icon: "🔔",
    title: "Alert Your Family",
    desc: "With one tap, notify a trusted family member about the scam so they can help you stay safe. Add their emails in your Profile.",
    color: "#ec4899"
  },
  {
    icon: "🔊",
    title: "Read Aloud in Your Language",
    desc: "Tap the Read Aloud button to have any explanation read to you in your language — including Mandarin, Hindi, Arabic and more.",
    color: "#14b8a6"
  }
];

export default function Onboarding({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const next = () => {
    if (current < steps.length - 1) {
      setLeaving(true);
      setTimeout(() => {
        setCurrent(c => c + 1);
        setLeaving(false);
      }, 200);
    } else {
      localStorage.setItem("onboardingDone", "true");
      onFinish();
    }
  };

  const skip = () => {
    localStorage.setItem("onboardingDone", "true");
    onFinish();
  };

  const step = steps[current];

  return (
    <div style={{
      position:"fixed",inset:0,
      background:"rgba(0,0,0,0.85)",
      backdropFilter:"blur(12px)",
      display:"flex",alignItems:"center",justifyContent:"center",
      zIndex:999,padding:"20px"
    }}>
      <div style={{
        background:"linear-gradient(135deg,#0d1537,#0a1628)",
        border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:"24px",
        padding:"40px 32px",
        maxWidth:"440px",width:"100%",
        textAlign:"center",
        boxShadow:"0 24px 80px rgba(0,0,0,0.6)",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(0.96)" : "scale(1)",
        transition:"all 0.2s ease"
      }}>

        {/* Step indicator dots */}
        <div style={{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"32px"}}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: i === current ? "24px" : "8px",
              height:"8px",borderRadius:"4px",
              background: i === current ? step.color : "rgba(255,255,255,0.15)",
              transition:"all 0.3s ease"
            }}/>
          ))}
        </div>

        {/* Icon */}
        <div style={{
          width:"96px",height:"96px",borderRadius:"28px",
          background:`linear-gradient(135deg,${step.color}30,${step.color}10)`,
          border:`1px solid ${step.color}40`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"44px",margin:"0 auto 28px",
          boxShadow:`0 8px 30px ${step.color}30`
        }}>
          {step.icon}
        </div>

        {/* Step number */}
        <div style={{
          display:"inline-block",
          background:`${step.color}20`,
          border:`1px solid ${step.color}40`,
          borderRadius:"20px",padding:"4px 14px",
          fontSize:"12px",color:step.color,fontWeight:"600",
          letterSpacing:"0.5px",marginBottom:"16px"
        }}>
          STEP {current + 1} OF {steps.length}
        </div>

        {/* Title */}
        <h2 style={{
          fontSize:"24px",fontWeight:"800",marginBottom:"12px",
          background:`linear-gradient(135deg,#ffffff,${step.color})`,
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
          lineHeight:"1.3"
        }}>{step.title}</h2>

        {/* Description */}
        <p style={{
          fontSize:"15px",color:"rgba(255,255,255,0.6)",
          lineHeight:"1.7",marginBottom:"36px"
        }}>{step.desc}</p>

        {/* Buttons */}
        <div style={{display:"flex",gap:"10px"}}>
          {current > 0 && (
            <button onClick={() => setCurrent(c => c - 1)} style={{
              flex:1,padding:"14px",borderRadius:"12px",
              background:"rgba(255,255,255,0.05)",
              color:"rgba(255,255,255,0.5)",
              border:"1px solid rgba(255,255,255,0.08)",
              fontSize:"14px",fontWeight:"500",cursor:"pointer"
            }}>← Back</button>
          )}
          <button onClick={next} style={{
            flex:2,padding:"14px",borderRadius:"12px",
            background:`linear-gradient(135deg,${step.color},${step.color}cc)`,
            color:"white",border:"none",
            fontSize:"15px",fontWeight:"700",cursor:"pointer",
            boxShadow:`0 6px 20px ${step.color}40`
          }}>
            {current === steps.length - 1 ? "Get Started 🚀" : "Next →"}
          </button>
        </div>

        {/* Skip button */}
        {current < steps.length - 1 && (
          <button onClick={skip} style={{
            marginTop:"16px",background:"none",border:"none",
            color:"rgba(255,255,255,0.3)",fontSize:"13px",
            cursor:"pointer",fontFamily:"inherit"
          }}>
            Skip tutorial
          </button>
        )}
      </div>
    </div>
  );
}