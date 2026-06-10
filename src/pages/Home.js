import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tesseract from "tesseract.js";
import { showSuccess, showError, showInfo } from "../components/Toast";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showScanning, setShowScanning] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setOcrLoading(true);
    setText("");
    showInfo("Reading your image...");
    try {
      const result = await Tesseract.recognize(file, "eng", { logger: () => {} });
      const extracted = result.data.text.trim();
      if (extracted) {
        setText(extracted);
        showSuccess("Text extracted from image successfully!");
      } else {
        showError("Could not extract text. Please paste manually.");
      }
    } catch {
      showError("Image reading failed. Please paste the text manually.");
    }
    setOcrLoading(false);
  };

  const handleAnalyse = async () => {
    if (!text.trim()) return showError("Please paste some text or upload a screenshot first.");
    setLoading(true);
    setShowScanning(true);
    try {
      const response = await axios.post("https://scamshield-server.onrender.com/analyse", {
        text,
        contentType: "SMS"
      });
      const result = response.data;

      const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
      const newScan = {
        id: Date.now(),
        type: "Message",
        result: result.classification,
        scamType: result.scamType,
        risk: result.riskPercentage,
        text: text.substring(0, 100),
        date: new Date().toLocaleString("en-AU", { hour:"2-digit", minute:"2-digit", hour12:true }),
        actions: result.immediateActions || []
      };
      history.unshift(newScan);
      localStorage.setItem("scanHistory", JSON.stringify(history.slice(0, 50)));

      if (result.classification === "Likely Scam") {
        showError(`⚠️ Scam detected!`);
      } else {
        showSuccess(`✅ Looks safe!`);
      }

      navigate("/results", { state: { result } });
    } catch {
      showError("Analysis failed. Please try again in a moment.");
    }
    setLoading(false);
    setShowScanning(false);
  };

  const card = {
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"20px",padding:"24px",
    backdropFilter:"blur(10px)"
  };

  if (showScanning) {
    return (
      <div style={{
        position:"fixed",inset:0,
        background:"linear-gradient(135deg,#0a0e27,#0d1537)",
        display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",
        zIndex:999
      }}>
        <div style={{position:"relative",width:"160px",height:"160px",marginBottom:"32px"}}>
          <div style={{
            position:"absolute",inset:0,borderRadius:"50%",
            border:"2px solid rgba(79,124,255,0.2)",
            animation:"ping 1.5s cubic-bezier(0,0,0.2,1) infinite"
          }}></div>
          <div style={{
            position:"absolute",inset:"10px",borderRadius:"50%",
            border:"2px solid rgba(79,124,255,0.3)",
            animation:"ping 1.5s cubic-bezier(0,0,0.2,1) infinite 0.3s"
          }}></div>
          <div style={{
            position:"absolute",inset:"20px",borderRadius:"50%",
            border:"2px solid rgba(139,92,246,0.4)",
            animation:"ping 1.5s cubic-bezier(0,0,0.2,1) infinite 0.6s"
          }}></div>
          <div style={{
            position:"absolute",inset:"30px",borderRadius:"50%",
            background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:"36px",boxShadow:"0 0 40px rgba(79,124,255,0.6)"
          }}>🛡️</div>
        </div>
        <h2 style={{
          fontSize:"22px",fontWeight:"800",marginBottom:"8px",
          background:"linear-gradient(135deg,#ffffff,#a0b4ff)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
        }}>Analysing your message...</h2>
        <p style={{fontSize:"14px",color:"rgba(255,255,255,0.4)",marginBottom:"32px"}}>
          Our AI is checking for scam patterns
        </p>
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center"}}>
          {["Extracting text","Checking patterns","Calculating risk"].map((step,i) => (
            <div key={i} style={{
              display:"flex",alignItems:"center",gap:"6px",
              background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:"20px",padding:"6px 12px"
            }}>
              <div style={{
                width:"6px",height:"6px",borderRadius:"50%",
                background:"#4f7cff",boxShadow:"0 0 8px #4f7cff",
                animation:"pulse 1s infinite",
                animationDelay:`${i * 0.3}s`
              }}></div>
              <span style={{fontSize:"11px",color:"rgba(255,255,255,0.5)"}}>{step}</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes ping {
            0% { transform: scale(1); opacity: 1; }
            75%, 100% { transform: scale(1.5); opacity: 0; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{maxWidth:"580px",margin:"0 auto",padding:"40px 20px"}}>

      {/* Hero */}
      <div style={{textAlign:"center",marginBottom:"40px"}}>
        <div style={{
          display:"inline-flex",alignItems:"center",gap:"8px",
          background:"rgba(79,124,255,0.1)",
          border:"1px solid rgba(79,124,255,0.2)",
          borderRadius:"20px",padding:"6px 16px",marginBottom:"20px"
        }}>
          <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 8px #4ade80"}}></div>
          <span style={{fontSize:"12px",color:"rgba(255,255,255,0.7)",letterSpacing:"0.5px"}}>AI Protection Active</span>
        </div>
        <h1 style={{
          fontSize:"36px",fontWeight:"800",
          background:"linear-gradient(135deg,#ffffff 0%,#a0b4ff 100%)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
          lineHeight:"1.2",marginBottom:"12px",letterSpacing:"-0.5px"
        }}>Detect Scams<br/>Instantly</h1>
        <p style={{fontSize:"15px",color:"rgba(255,255,255,0.5)",lineHeight:"1.6"}}>
          Upload a screenshot or paste any suspicious message.<br/>Our AI analyses it in seconds.
        </p>
      </div>

      {/* Upload and paste */}
      <div style={{...card,marginBottom:"16px"}}>
        <label style={{
          display:"block",border:"2px dashed rgba(79,124,255,0.3)",
          borderRadius:"14px",padding:"28px",textAlign:"center",
          background:"rgba(79,124,255,0.05)",cursor:"pointer",marginBottom:"20px"
        }}>
          <div style={{fontSize:"32px",marginBottom:"10px"}}>📸</div>
          <p style={{
            fontWeight:"600",fontSize:"14px",marginBottom:"4px",
            background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
          }}>
            {ocrLoading ? "Reading your image..." : "Upload a Screenshot"}
          </p>
          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.3)"}}>
            JPG or PNG — text extracted automatically
          </p>
          <input type="file" accept="image/*" style={{display:"none"}} onChange={handleImageUpload}/>
        </label>

        {preview && (
          <div style={{marginBottom:"20px",textAlign:"center"}}>
            <img src={preview} alt="preview" style={{
              maxWidth:"100%",maxHeight:"140px",borderRadius:"10px",
              border:"1px solid rgba(255,255,255,0.1)"
            }}/>
            {ocrLoading && (
              <p style={{fontSize:"12px",color:"rgba(255,255,255,0.5)",marginTop:"8px"}}>
                Extracting text from image...
              </p>
            )}
          </div>
        )}

        <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"}}>
          <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.06)"}}></div>
          <span style={{fontSize:"11px",color:"rgba(255,255,255,0.25)",letterSpacing:"0.5px",textTransform:"uppercase"}}>or paste text</span>
          <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.06)"}}></div>
        </div>

        <textarea
          style={{
            width:"100%",background:"rgba(255,255,255,0.05)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"12px",padding:"14px 16px",
            fontSize:"14px",color:"rgba(255,255,255,0.85)",
            height:"110px",resize:"none",boxSizing:"border-box",
            fontFamily:"inherit",outline:"none",lineHeight:"1.6"
          }}
          placeholder="Paste your suspicious SMS, email or link here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      {/* Analyse button */}
      <button
        onClick={handleAnalyse}
        disabled={loading || ocrLoading}
        style={{
          width:"100%",padding:"16px",
          background:(loading||ocrLoading) ? "rgba(79,124,255,0.3)" : "linear-gradient(135deg,#4f7cff 0%,#8b5cf6 100%)",
          color:"white",border:"none",borderRadius:"14px",
          fontSize:"16px",fontWeight:"700",cursor:"pointer",
          boxShadow:(loading||ocrLoading) ? "none" : "0 8px 30px rgba(79,124,255,0.4)",
          letterSpacing:"0.3px",transition:"all 0.3s"
        }}
      >
        {loading ? "🔍 Analysing your message..." : ocrLoading ? "📖 Reading image..." : "🔍 Analyse Now"}
      </button>

      {/* Trust badges */}
      <div style={{display:"flex",justifyContent:"center",gap:"24px",marginTop:"24px",flexWrap:"wrap"}}>
        {["🔒 Private and Secure","🇦🇺 Australian Made","⚡ Results in Seconds"].map(badge => (
          <span key={badge} style={{fontSize:"11px",color:"rgba(255,255,255,0.25)"}}>{badge}</span>
        ))}
      </div>

      {/* Quick links */}
      <div style={{display:"flex",gap:"10px",marginTop:"24px"}}>
        <button onClick={() => navigate("/history")} style={{
          flex:1,padding:"12px",borderRadius:"12px",
          background:"rgba(255,255,255,0.03)",
          border:"1px solid rgba(255,255,255,0.08)",
          color:"rgba(255,255,255,0.5)",fontSize:"13px",
          cursor:"pointer",fontFamily:"inherit"
        }}>📋 View History</button>
        <button onClick={() => navigate("/tips")} style={{
          flex:1,padding:"12px",borderRadius:"12px",
          background:"rgba(255,255,255,0.03)",
          border:"1px solid rgba(255,255,255,0.08)",
          color:"rgba(255,255,255,0.5)",fontSize:"13px",
          cursor:"pointer",fontFamily:"inherit"
        }}>💡 Scam Tips</button>
      </div>
    </div>
  );
}