import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ScanHistory() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("scanHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    } else {
      // Demo data
      const demo = [
        { id:1, type:"SMS", result:"Likely Scam", scamType:"Phishing Scam", risk:92, text:"URGENT: Your Commonwealth Bank account has been suspended...", date:"Today, 11:20 AM", actions:["Do not click links","Block the sender","Contact your bank"] },
        { id:2, type:"Email", result:"Unlikely Scam", scamType:"Legitimate", risk:8, text:"Your Amazon order has been shipped and will arrive...", date:"Today, 10:45 AM", actions:["No action needed"] },
        { id:3, type:"SMS", result:"Likely Scam", scamType:"Bank Scam", risk:87, text:"NAB Alert: Suspicious activity detected on your account...", date:"Yesterday, 3:12 PM", actions:["Contact your bank","Do not share OTP"] },
        { id:4, type:"Link", result:"Likely Scam", scamType:"Delivery Scam", risk:76, text:"http://auspost-delivery.suspicious.com/track/123456", date:"Yesterday, 1:00 PM", actions:["Do not click the link","Report to Scamwatch"] },
        { id:5, type:"Email", result:"Unlikely Scam", scamType:"Legitimate", risk:14, text:"Your electricity bill is ready to view online...", date:"2 days ago", actions:["No action needed"] },
        { id:6, type:"SMS", result:"Likely Scam", scamType:"Phishing Scam", risk:95, text:"MyGov: Your tax refund of $2,847 is ready. Click here...", date:"2 days ago", actions:["Do not click","Report to ATO","Contact Scamwatch"] },
        { id:7, type:"SMS", result:"Likely Scam", scamType:"Remote Access Scam", risk:89, text:"Microsoft Support: Your computer has a virus. Call us now...", date:"3 days ago", actions:["Do not call","Block the number"] },
        { id:8, type:"Email", result:"Unlikely Scam", scamType:"Legitimate", risk:6, text:"Your Woolworths Everyday Rewards points are ready...", date:"4 days ago", actions:["No action needed"] },
      ];
      setHistory(demo);
    }
  }, []);

  const filtered = history.filter(s => {
    const matchFilter = filter === "all" || 
      (filter === "scam" && s.result === "Likely Scam") ||
      (filter === "safe" && s.result === "Unlikely Scam");
    const matchSearch = s.text.toLowerCase().includes(search.toLowerCase()) ||
      s.scamType.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const scamCount = history.filter(s => s.result === "Likely Scam").length;
  const safeCount = history.filter(s => s.result === "Unlikely Scam").length;

  const card = {
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"20px",padding:"24px",marginBottom:"16px"
  };

  return (
    <div style={{maxWidth:"640px",margin:"0 auto",padding:"32px 20px"}}>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"24px"}}>
        <div>
          <h1 style={{
            fontSize:"26px",fontWeight:"800",marginBottom:"4px",
            background:"linear-gradient(135deg,#ffffff,#a0b4ff)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
          }}>Scan History</h1>
          <p style={{fontSize:"13px",color:"rgba(255,255,255,0.4)"}}>
            {history.length} total scans
          </p>
        </div>
        <button onClick={() => navigate("/")} style={{
          background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
          color:"white",border:"none",borderRadius:"12px",
          padding:"10px 20px",fontSize:"13px",fontWeight:"600",cursor:"pointer",
          boxShadow:"0 4px 15px rgba(79,124,255,0.3)"
        }}>+ New Scan</button>
      </div>

      {/* Summary cards */}
      <div style={{display:"flex",gap:"12px",marginBottom:"20px"}}>
        <div style={{
          flex:1,padding:"16px",borderRadius:"16px",textAlign:"center",
          background:"linear-gradient(135deg,rgba(239,68,68,0.1),rgba(239,68,68,0.05))",
          border:"1px solid rgba(239,68,68,0.2)"
        }}>
          <div style={{fontSize:"28px",fontWeight:"800",color:"#ef4444"}}>{scamCount}</div>
          <div style={{fontSize:"12px",color:"rgba(255,255,255,0.4)"}}>Scams detected</div>
        </div>
        <div style={{
          flex:1,padding:"16px",borderRadius:"16px",textAlign:"center",
          background:"linear-gradient(135deg,rgba(34,197,94,0.1),rgba(34,197,94,0.05))",
          border:"1px solid rgba(34,197,94,0.2)"
        }}>
          <div style={{fontSize:"28px",fontWeight:"800",color:"#22c55e"}}>{safeCount}</div>
          <div style={{fontSize:"12px",color:"rgba(255,255,255,0.4)"}}>Safe messages</div>
        </div>
        <div style={{
          flex:1,padding:"16px",borderRadius:"16px",textAlign:"center",
          background:"linear-gradient(135deg,rgba(79,124,255,0.1),rgba(79,124,255,0.05))",
          border:"1px solid rgba(79,124,255,0.2)"
        }}>
          <div style={{fontSize:"28px",fontWeight:"800",color:"#4f7cff"}}>{history.length}</div>
          <div style={{fontSize:"12px",color:"rgba(255,255,255,0.4)"}}>Total scans</div>
        </div>
      </div>

      {/* Search bar */}
      <div style={{position:"relative",marginBottom:"16px"}}>
        <span style={{
          position:"absolute",left:"14px",top:"50%",
          transform:"translateY(-50%)",fontSize:"16px"
        }}>🔍</span>
        <input
          type="text"
          placeholder="Search scans..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width:"100%",background:"rgba(255,255,255,0.05)",
            border:"1px solid rgba(255,255,255,0.08)",borderRadius:"12px",
            padding:"12px 12px 12px 42px",fontSize:"14px",
            color:"rgba(255,255,255,0.85)",fontFamily:"inherit",outline:"none",
            boxSizing:"border-box"
          }}
        />
      </div>

      {/* Filter tabs */}
      <div style={{
        display:"flex",gap:"4px",
        background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"12px",padding:"4px",marginBottom:"20px"
      }}>
        {[["all","All Scans"],["scam","Scams Only"],["safe","Safe Only"]].map(([val,label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{
            flex:1,padding:"9px",borderRadius:"8px",
            fontSize:"13px",fontWeight:"500",cursor:"pointer",border:"none",
            background: filter===val ? "linear-gradient(135deg,#4f7cff,#8b5cf6)" : "transparent",
            color: filter===val ? "#fff" : "rgba(255,255,255,0.4)",
            transition:"all 0.2s",
            boxShadow: filter===val ? "0 4px 15px rgba(79,124,255,0.3)" : "none"
          }}>{label}</button>
        ))}
      </div>

      {/* Scan list */}
      {filtered.length === 0 ? (
        <div style={{
          ...card,textAlign:"center",padding:"48px 24px"
        }}>
          <div style={{fontSize:"48px",marginBottom:"16px"}}>🔍</div>
          <p style={{fontSize:"16px",fontWeight:"600",color:"rgba(255,255,255,0.5)",marginBottom:"8px"}}>
            No scans found
          </p>
          <p style={{fontSize:"13px",color:"rgba(255,255,255,0.3)"}}>
            Try a different filter or search term
          </p>
        </div>
      ) : (
        filtered.map((scan, i) => (
          <div key={scan.id} style={{
            ...card,
            cursor:"pointer",
            transition:"all 0.2s",
            borderColor: scan.result === "Likely Scam"
              ? "rgba(239,68,68,0.15)"
              : "rgba(34,197,94,0.1)"
          }}
          onClick={() => navigate("/results", { state: { result: {
            classification: scan.result,
            riskPercentage: scan.risk,
            scamType: scan.scamType,
            simpleExplanation: `This ${scan.type} message was analysed and found to be ${scan.result.toLowerCase()} with a ${scan.risk}% risk score.`,
            detailedExplanation: `Analysis of this ${scan.type} content revealed a risk score of ${scan.risk}%, classified as ${scan.scamType}. The content was reviewed against known Australian scam patterns.`,
            immediateActions: scan.actions,
            preventionTips: ["Never share personal details", "Always verify with official sources", "Enable two-factor authentication"]
          }}})}>

            <div style={{display:"flex",alignItems:"flex-start",gap:"14px"}}>
              <div style={{
                width:"44px",height:"44px",borderRadius:"12px",flexShrink:0,
                background: scan.result==="Likely Scam"
                  ? "rgba(239,68,68,0.15)"
                  : "rgba(34,197,94,0.15)",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px"
              }}>
                {scan.result==="Likely Scam" ? "⚠️" : "✅"}
              </div>

              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px",flexWrap:"wrap"}}>
                  <span style={{
                    fontSize:"13px",fontWeight:"700",
                    color: scan.result==="Likely Scam" ? "#fca5a5" : "#86efac"
                  }}>{scan.scamType}</span>
                  <span style={{
                    fontSize:"10px",padding:"2px 8px",borderRadius:"10px",
                    background:"rgba(79,124,255,0.15)",color:"#a0b4ff",
                    border:"1px solid rgba(79,124,255,0.2)"
                  }}>{scan.type}</span>
                </div>

                <p style={{
                  fontSize:"12px",color:"rgba(255,255,255,0.4)",
                  marginBottom:"8px",
                  overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"
                }}>
                  {scan.text}
                </p>

                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:"11px",color:"rgba(255,255,255,0.3)"}}>
                    {scan.date}
                  </span>
                  <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                    <div style={{
                      fontSize:"14px",fontWeight:"800",
                      color: scan.risk > 50 ? "#ef4444" : "#22c55e"
                    }}>{scan.risk}%</div>
                    <div style={{
                      width:"60px",height:"4px",
                      background:"rgba(255,255,255,0.06)",borderRadius:"2px",overflow:"hidden"
                    }}>
                      <div style={{
                        width:`${scan.risk}%`,height:"100%",borderRadius:"2px",
                        background: scan.risk > 50
                          ? "linear-gradient(90deg,#f97316,#ef4444)"
                          : "linear-gradient(90deg,#22c55e,#4ade80)"
                      }}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}