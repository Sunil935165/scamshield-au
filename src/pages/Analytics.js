import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockData = {
  totalScans: 47,
  scamsDetected: 31,
  safeMessages: 16,
  alertsSent: 12,
  recentScans: [
    { id:1, type:"SMS", result:"Likely Scam", scamType:"Phishing Scam", risk:92, date:"Today, 11:20 AM" },
    { id:2, type:"Email", result:"Unlikely Scam", scamType:"Legitimate", risk:8, date:"Today, 10:45 AM" },
    { id:3, type:"SMS", result:"Likely Scam", scamType:"Bank Scam", risk:87, date:"Yesterday, 3:12 PM" },
    { id:4, type:"Link", result:"Likely Scam", scamType:"Delivery Scam", risk:76, date:"Yesterday, 1:00 PM" },
    { id:5, type:"Email", result:"Unlikely Scam", scamType:"Legitimate", risk:14, date:"2 days ago" },
    { id:6, type:"SMS", result:"Likely Scam", scamType:"Phishing Scam", risk:95, date:"2 days ago" },
  ],
  scamTypes: [
    { name:"Phishing Scam", count:14, color:"#ef4444" },
    { name:"Bank Scam", count:8, color:"#f97316" },
    { name:"Delivery Scam", count:6, color:"#eab308" },
    { name:"Other", count:3, color:"#8b5cf6" },
  ],
  weeklyScans: [4,7,3,9,6,11,7],
  weekDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
};

export default function Analytics() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const maxWeekly = Math.max(...mockData.weeklyScans);

  const card = {
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"20px",padding:"24px",marginBottom:"16px"
  };

  const statCard = (icon, label, value, color, sub) => (
    <div style={{
      background:`linear-gradient(135deg,${color}15,${color}05)`,
      border:`1px solid ${color}25`,
      borderRadius:"16px",padding:"20px",flex:"1"
    }}>
      <div style={{fontSize:"24px",marginBottom:"10px"}}>{icon}</div>
      <div style={{fontSize:"28px",fontWeight:"800",color:"#ffffff",marginBottom:"4px"}}>{value}</div>
      <div style={{fontSize:"12px",color:"rgba(255,255,255,0.5)",marginBottom:"4px"}}>{label}</div>
      {sub && <div style={{fontSize:"11px",color:color,fontWeight:"500"}}>{sub}</div>}
    </div>
  );

  return (
    <div style={{maxWidth:"640px",margin:"0 auto",padding:"32px 20px"}}>

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"28px"}}>
        <div>
          <h1 style={{
            fontSize:"26px",fontWeight:"800",marginBottom:"4px",
            background:"linear-gradient(135deg,#ffffff,#a0b4ff)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
          }}>Analytics</h1>
          <p style={{fontSize:"13px",color:"rgba(255,255,255,0.4)"}}>Your scam detection history</p>
        </div>
        <button onClick={() => navigate("/")} style={{
          background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
          color:"white",border:"none",borderRadius:"12px",
          padding:"10px 20px",fontSize:"13px",fontWeight:"600",cursor:"pointer",
          boxShadow:"0 4px 15px rgba(79,124,255,0.3)"
        }}>+ New Scan</button>
      </div>

      <div style={{
        display:"flex",gap:"4px",
        background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"14px",padding:"4px",marginBottom:"24px"
      }}>
        {["overview","history","breakdown"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex:1,padding:"10px",borderRadius:"10px",
            fontSize:"13px",fontWeight:"500",cursor:"pointer",border:"none",
            background: activeTab===tab ? "linear-gradient(135deg,#4f7cff,#8b5cf6)" : "transparent",
            color: activeTab===tab ? "#fff" : "rgba(255,255,255,0.4)",
            textTransform:"capitalize",transition:"all 0.2s",
            boxShadow: activeTab===tab ? "0 4px 15px rgba(79,124,255,0.3)" : "none"
          }}>{tab}</button>
        ))}
      </div>

      {activeTab === "overview" && (
        <>
          <div style={{display:"flex",gap:"12px",marginBottom:"16px"}}>
            {statCard("🔍","Total Scans",mockData.totalScans,"#4f7cff","All time")}
            {statCard("⚠️","Scams Found",mockData.scamsDetected,"#ef4444",`${Math.round(mockData.scamsDetected/mockData.totalScans*100)}% detection rate`)}
          </div>
          <div style={{display:"flex",gap:"12px",marginBottom:"16px"}}>
            {statCard("✅","Safe Messages",mockData.safeMessages,"#22c55e","Verified legitimate")}
            {statCard("🔔","Alerts Sent",mockData.alertsSent,"#8b5cf6","Family notified")}
          </div>

          <div style={{
            ...card,
            background:"linear-gradient(135deg,rgba(79,124,255,0.1),rgba(139,92,246,0.05))",
            border:"1px solid rgba(79,124,255,0.2)",
            textAlign:"center",padding:"28px"
          }}>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"12px"}}>Protection Score</p>
            <div style={{
              fontSize:"64px",fontWeight:"900",marginBottom:"8px",
              background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
            }}>98</div>
            <p style={{fontSize:"14px",color:"rgba(255,255,255,0.6)",marginBottom:"16px"}}>Excellent — You are well protected</p>
            <div style={{height:"8px",background:"rgba(255,255,255,0.06)",borderRadius:"4px",overflow:"hidden"}}>
              <div style={{
                width:"98%",height:"100%",
                background:"linear-gradient(90deg,#4f7cff,#8b5cf6)",
                borderRadius:"4px",boxShadow:"0 0 12px rgba(79,124,255,0.5)"
              }}></div>
            </div>
          </div>

          <div style={card}>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"20px"}}>Scans This Week</p>
            <div style={{display:"flex",alignItems:"flex-end",gap:"8px",height:"100px"}}>
              {mockData.weeklyScans.map((val,i) => (
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"6px"}}>
                  <div style={{
                    width:"100%",height:`${(val/maxWeekly)*80}px`,
                    background: i===6 ? "linear-gradient(180deg,#4f7cff,#8b5cf6)" : "rgba(79,124,255,0.25)",
                    borderRadius:"6px 6px 0 0",
                    boxShadow: i===6 ? "0 0 12px rgba(79,124,255,0.4)" : "none"
                  }}></div>
                  <span style={{fontSize:"10px",color:"rgba(255,255,255,0.3)"}}>{mockData.weekDays[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "history" && (
        <div style={card}>
          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"16px"}}>Recent Scans</p>
          {mockData.recentScans.map((scan,i) => (
            <div key={scan.id} style={{
              display:"flex",alignItems:"center",gap:"14px",padding:"14px 0",
              borderBottom: i < mockData.recentScans.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none"
            }}>
              <div style={{
                width:"40px",height:"40px",borderRadius:"12px",flexShrink:0,
                background: scan.result==="Likely Scam" ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"
              }}>
                {scan.result==="Likely Scam" ? "⚠️" : "✅"}
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"3px"}}>
                  <span style={{fontSize:"13px",fontWeight:"600",color:"#ffffff"}}>{scan.scamType}</span>
                  <span style={{
                    fontSize:"10px",padding:"2px 8px",borderRadius:"10px",
                    background:"rgba(79,124,255,0.15)",color:"#a0b4ff",
                    border:"1px solid rgba(79,124,255,0.2)"
                  }}>{scan.type}</span>
                </div>
                <span style={{fontSize:"11px",color:"rgba(255,255,255,0.3)"}}>{scan.date}</span>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{
                  fontSize:"16px",fontWeight:"800",
                  color: scan.risk > 50 ? "#ef4444" : "#22c55e"
                }}>{scan.risk}%</div>
                <div style={{fontSize:"10px",color:"rgba(255,255,255,0.3)"}}>risk</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "breakdown" && (
        <>
          <div style={card}>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"20px"}}>Scam Types Detected</p>
            {mockData.scamTypes.map((type,i) => (
              <div key={i} style={{marginBottom:"16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
                  <span style={{fontSize:"13px",color:"rgba(255,255,255,0.75)",fontWeight:"500"}}>{type.name}</span>
                  <span style={{fontSize:"13px",color:type.color,fontWeight:"700"}}>{type.count} scans</span>
                </div>
                <div style={{height:"6px",background:"rgba(255,255,255,0.06)",borderRadius:"3px",overflow:"hidden"}}>
                  <div style={{
                    width:`${(type.count/mockData.scamsDetected)*100}%`,
                    height:"100%",background:type.color,borderRadius:"3px",
                    boxShadow:`0 0 8px ${type.color}80`
                  }}></div>
                </div>
              </div>
            ))}
          </div>

          <div style={card}>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"16px"}}>Detection Summary</p>
            <div style={{display:"flex",gap:"12px"}}>
              <div style={{
                flex:1,textAlign:"center",padding:"20px",
                background:"rgba(239,68,68,0.08)",
                border:"1px solid rgba(239,68,68,0.15)",borderRadius:"14px"
              }}>
                <div style={{fontSize:"32px",fontWeight:"800",color:"#ef4444",marginBottom:"4px"}}>
                  {Math.round(mockData.scamsDetected/mockData.totalScans*100)}%
                </div>
                <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)"}}>Scam Rate</div>
              </div>
              <div style={{
                flex:1,textAlign:"center",padding:"20px",
                background:"rgba(34,197,94,0.08)",
                border:"1px solid rgba(34,197,94,0.15)",borderRadius:"14px"
              }}>
                <div style={{fontSize:"32px",fontWeight:"800",color:"#22c55e",marginBottom:"4px"}}>
                  {Math.round(mockData.safeMessages/mockData.totalScans*100)}%
                </div>
                <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)"}}>Safe Rate</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}