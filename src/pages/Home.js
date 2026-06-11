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
        showSuccess("Text extracted successfully!");
      } else {
        showError("Could not extract text. Please paste manually.");
      }
    } catch {
      showError("Image reading failed. Please paste the text manually.");
    }
    setOcrLoading(false);
  };

  const handleAnalyse = async () => {
    if (!text.trim()) return showError("Please paste a message or upload a screenshot first.");
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
        showError("⚠️ Scam detected!");
      } else {
        showSuccess("✅ Looks safe!");
      }
      navigate("/results", { state: { result } });
    } catch {
      showError("Analysis failed. Please try again in a moment.");
    }
    setLoading(false);
    setShowScanning(false);
  };

  if (showScanning) {
    return (
      <div style={{
        position:"fixed",inset:0,
        background:"#ffffff",
        display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",
        zIndex:999
      }}>
        <div style={{position:"relative",width:"120px",height:"120px",marginBottom:"32px"}}>
          <div style={{
            position:"absolute",inset:0,borderRadius:"50%",
            border:"3px solid rgba(220,38,38,0.15)",
            animation:"ping2 1.5s cubic-bezier(0,0,0.2,1) infinite"
          }}></div>
          <div style={{
            position:"absolute",inset:"15px",borderRadius:"50%",
            border:"3px solid rgba(220,38,38,0.25)",
            animation:"ping2 1.5s cubic-bezier(0,0,0.2,1) infinite 0.4s"
          }}></div>
          <div style={{
            position:"absolute",inset:"30px",borderRadius:"50%",
            background:"linear-gradient(135deg,#dc2626,#991b1b)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:"28px",boxShadow:"0 8px 30px rgba(220,38,38,0.4)"
          }}>🛡️</div>
        </div>
        <h2 style={{fontSize:"22px",fontWeight:"700",color:"#111827",marginBottom:"8px"}}>
          Analysing your message...
        </h2>
        <p style={{fontSize:"14px",color:"#6b7280"}}>
          AI is checking for scam patterns
        </p>
        <style>{`
          @keyframes ping2 {
            0% { transform: scale(1); opacity: 1; }
            75%, 100% { transform: scale(1.6); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      background:"#ffffff",
      minHeight:"100vh",
      color:"#111827",
      fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>

      {/* Hero Section */}
      <div style={{
        maxWidth:"1100px",margin:"0 auto",
        padding:"80px 40px 60px",
        display:"grid",gridTemplateColumns:"1fr 1fr",
        gap:"60px",alignItems:"center"
      }}>
        <div>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:"8px",
            background:"#fef2f2",border:"1px solid #fecaca",
            borderRadius:"20px",padding:"6px 14px",marginBottom:"24px"
          }}>
            <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#dc2626"}}></div>
            <span style={{fontSize:"12px",color:"#dc2626",fontWeight:"600",letterSpacing:"0.5px",textTransform:"uppercase"}}>
              AI Scam Protection
            </span>
          </div>

          <h1 style={{
            fontSize:"52px",fontWeight:"800",lineHeight:"1.1",
            color:"#111827",marginBottom:"20px",letterSpacing:"-1px"
          }}>
            Detect scams<br/>
            <span style={{color:"#dc2626"}}>instantly</span>
          </h1>

          <p style={{
            fontSize:"18px",color:"#6b7280",lineHeight:"1.7",
            marginBottom:"36px",maxWidth:"440px"
          }}>
            Protect yourself and your family from online scams. Upload a screenshot or paste a suspicious message — our AI checks it in seconds.
          </p>

          <div style={{display:"flex",gap:"16px",flexWrap:"wrap",marginBottom:"40px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{width:"18px",height:"18px",borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px"}}>✓</div>
              <span style={{fontSize:"14px",color:"#374151",fontWeight:"500"}}>No signup required to try</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{width:"18px",height:"18px",borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px"}}>✓</div>
              <span style={{fontSize:"14px",color:"#374151",fontWeight:"500"}}>Results in 3 seconds</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{width:"18px",height:"18px",borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px"}}>✓</div>
              <span style={{fontSize:"14px",color:"#374151",fontWeight:"500"}}>100% free</span>
            </div>
          </div>

          {/* Stats row */}
          <div style={{display:"flex",gap:"32px"}}>
            {[
              { num:"$2.18B", label:"Lost to scams in Australia 2025" },
              { num:"26.5%", label:"Of losses affect elderly Australians" },
              { num:"481K+", label:"Scam reports in 2025" },
            ].map(s => (
              <div key={s.num}>
                <div style={{fontSize:"24px",fontWeight:"800",color:"#dc2626"}}>{s.num}</div>
                <div style={{fontSize:"11px",color:"#9ca3af",marginTop:"2px",lineHeight:"1.4"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scan card */}
        <div style={{
          background:"#f9fafb",
          border:"1px solid #e5e7eb",
          borderRadius:"20px",
          padding:"32px",
          boxShadow:"0 20px 60px rgba(0,0,0,0.08)"
        }}>
          <p style={{fontSize:"14px",fontWeight:"600",color:"#374151",marginBottom:"16px"}}>
            🔍 Check a message now
          </p>

          {/* Upload zone */}
          <label style={{
            display:"block",border:"2px dashed #d1d5db",
            borderRadius:"12px",padding:"20px",textAlign:"center",
            background:"white",cursor:"pointer",marginBottom:"16px",
            transition:"border-color 0.2s"
          }}>
            <div style={{fontSize:"28px",marginBottom:"8px"}}>📸</div>
            <p style={{fontWeight:"600",fontSize:"13px",color:"#374151",marginBottom:"2px"}}>
              {ocrLoading ? "Reading image..." : "Upload a screenshot"}
            </p>
            <p style={{fontSize:"12px",color:"#9ca3af"}}>JPG or PNG</p>
            <input type="file" accept="image/*" style={{display:"none"}} onChange={handleImageUpload}/>
          </label>

          {preview && (
            <div style={{marginBottom:"16px",textAlign:"center"}}>
              <img src={preview} alt="preview" style={{
                maxWidth:"100%",maxHeight:"100px",borderRadius:"8px",
                border:"1px solid #e5e7eb"
              }}/>
            </div>
          )}

          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
            <div style={{flex:1,height:"1px",background:"#e5e7eb"}}></div>
            <span style={{fontSize:"11px",color:"#9ca3af",textTransform:"uppercase",letterSpacing:"0.5px"}}>or paste text</span>
            <div style={{flex:1,height:"1px",background:"#e5e7eb"}}></div>
          </div>

          <textarea
            style={{
              width:"100%",background:"white",
              border:"1px solid #d1d5db",borderRadius:"10px",
              padding:"12px 14px",fontSize:"14px",color:"#111827",
              height:"100px",resize:"none",boxSizing:"border-box",
              fontFamily:"inherit",outline:"none",lineHeight:"1.6",
              marginBottom:"14px"
            }}
            placeholder="Paste your suspicious SMS, email or link here..."
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <button
            onClick={handleAnalyse}
            disabled={loading || ocrLoading}
            style={{
              width:"100%",padding:"14px",
              background:(loading||ocrLoading) ? "#9ca3af" : "#dc2626",
              color:"white",border:"none",borderRadius:"10px",
              fontSize:"15px",fontWeight:"700",cursor:"pointer",
              transition:"all 0.2s",letterSpacing:"0.3px"
            }}
          >
            {loading ? "Analysing..." : ocrLoading ? "Reading image..." : "Check Now →"}
          </button>

          <p style={{fontSize:"11px",color:"#9ca3af",textAlign:"center",marginTop:"10px"}}>
            🔒 Private and secure — your data is never stored
          </p>
        </div>
      </div>

      {/* Features strip */}
      <div style={{
        background:"#f9fafb",
        borderTop:"1px solid #e5e7eb",
        borderBottom:"1px solid #e5e7eb",
        padding:"40px"
      }}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"32px"}}>
            {[
              { icon:"🤖", title:"AI-Powered Detection", desc:"Claude AI analyses every message against thousands of known Australian scam patterns" },
              { icon:"🔊", title:"Read Aloud", desc:"Have results read to you in English, Mandarin, Japanese, Spanish and more" },
              { icon:"🔔", title:"Family Alerts", desc:"Automatically email a trusted family member when a scam is detected" },
            ].map(f => (
              <div key={f.title} style={{display:"flex",gap:"16px",alignItems:"flex-start"}}>
                <div style={{
                  width:"44px",height:"44px",borderRadius:"12px",
                  background:"#fef2f2",flexShrink:0,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:"20px"
                }}>{f.icon}</div>
                <div>
                  <p style={{fontSize:"15px",fontWeight:"600",color:"#111827",marginBottom:"4px"}}>{f.title}</p>
                  <p style={{fontSize:"13px",color:"#6b7280",lineHeight:"1.6"}}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"32px 40px",display:"flex",gap:"12px"}}>
        <button onClick={() => navigate("/history")} style={{
          padding:"10px 20px",borderRadius:"8px",
          background:"white",border:"1px solid #e5e7eb",
          color:"#374151",fontSize:"13px",fontWeight:"500",cursor:"pointer"
        }}>📋 View Scan History</button>
        <button onClick={() => navigate("/tips")} style={{
          padding:"10px 20px",borderRadius:"8px",
          background:"white",border:"1px solid #e5e7eb",
          color:"#374151",fontSize:"13px",fontWeight:"500",cursor:"pointer"
        }}>💡 Scam Tips & News</button>
        <button onClick={() => navigate("/how-it-works")} style={{
          padding:"10px 20px",borderRadius:"8px",
          background:"white",border:"1px solid #e5e7eb",
          color:"#374151",fontSize:"13px",fontWeight:"500",cursor:"pointer"
        }}>❓ How It Works</button>
      </div>
    </div>
  );
}