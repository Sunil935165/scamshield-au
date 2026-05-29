import { useState } from "react";
import { useNavigate } from "react-router-dom";

const scamNews = [
  {
    id: 1,
    category: "⚠️ Live Alert",
    categoryColor: "#ef4444",
    title: "Commonwealth Bank SMS Phishing Surge",
    desc: "Scammers are sending fake SMS messages pretending to be Commonwealth Bank asking users to verify their account via a suspicious link. Do not click any links from unknown numbers claiming to be your bank.",
    date: "May 2025",
    tag: "Phishing",
    tagColor: "#ef4444",
    tips: ["Never click links in SMS messages from your bank", "Call your bank directly using the number on the back of your card", "Real banks never ask for your full password via SMS"]
  },
  {
    id: 2,
    category: "🚨 Scam Warning",
    categoryColor: "#f97316",
    title: "MyGov Tax Refund Scam",
    desc: "Australians are receiving fake emails and SMS claiming to be from the ATO or MyGov offering tax refunds. These messages contain links that steal your personal information and banking credentials.",
    date: "May 2025",
    tag: "Impersonation",
    tagColor: "#f97316",
    tips: ["The ATO will never email you a tax refund link", "Log into MyGov directly through myGov.com.au", "Report suspicious ATO messages to reportEmailFraud@ato.gov.au"]
  },
  {
    id: 3,
    category: "📦 Delivery Scam",
    categoryColor: "#eab308",
    title: "Australia Post Fake Delivery SMS",
    desc: "A widespread scam involving fake Australia Post delivery notifications is targeting Australians. The SMS claims your parcel is held and asks you to pay a small fee to release it — this is a scam.",
    date: "April 2025",
    tag: "Delivery Scam",
    tagColor: "#eab308",
    tips: ["Australia Post will never ask for payment via SMS link", "Track parcels only at auspost.com.au", "If unsure, call Australia Post on 13 76 78"]
  },
  {
    id: 4,
    category: "💻 Tech Scam",
    categoryColor: "#8b5cf6",
    title: "Microsoft Support Remote Access Scam",
    desc: "Scammers are calling Australians pretending to be Microsoft technical support, claiming your computer has a virus. They ask you to install remote access software so they can steal your banking details.",
    date: "April 2025",
    tag: "Remote Access",
    tagColor: "#8b5cf6",
    tips: ["Microsoft will never call you unsolicited", "Never give anyone remote access to your computer", "Hang up immediately and call the police on 131 444"]
  },
  {
    id: 5,
    category: "❤️ Romance Scam",
    categoryColor: "#ec4899",
    title: "Online Dating Investment Scam Rise",
    desc: "Romance scams involving fake cryptocurrency investment opportunities are increasing. Scammers build trust over weeks before asking victims to invest money in fraudulent platforms.",
    date: "March 2025",
    tag: "Romance Scam",
    tagColor: "#ec4899",
    tips: ["Never send money to someone you have not met in person", "Be suspicious of anyone who asks you to invest in crypto", "Report to Scamwatch at scamwatch.gov.au"]
  },
  {
    id: 6,
    category: "🏦 Banking Alert",
    categoryColor: "#14b8a6",
    title: "Payment Redirection Scam Targeting Businesses",
    desc: "Scammers are intercepting email communications between businesses and clients, changing bank account details so payments go to the scammer instead of the intended recipient.",
    date: "March 2025",
    tag: "Payment Fraud",
    tagColor: "#14b8a6",
    tips: ["Always verify bank details by phone before making a payment", "Never trust bank details received by email alone", "Call the business on a known number to confirm changes"]
  },
];

const protectionTips = [
  { icon:"🔒", tip:"Never share your PIN, password or OTP with anyone — not even your bank" },
  { icon:"📞", tip:"If unsure, hang up and call back using the official number from the website" },
  { icon:"🔗", tip:"Never click links in unexpected SMS or email messages" },
  { icon:"💳", tip:"Check your bank statements regularly for unusual transactions" },
  { icon:"👥", tip:"Talk to a trusted family member before sending any money" },
  { icon:"📱", tip:"Enable two-factor authentication on all your important accounts" },
  { icon:"🚨", tip:"Report all scams to Scamwatch at scamwatch.gov.au" },
  { icon:"🏦", tip:"Contact your bank immediately if you think you have been scammed" },
];

export default function Tips() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{maxWidth:"640px",margin:"0 auto",padding:"32px 20px"}}>

      {/* Header */}
      <div style={{marginBottom:"28px"}}>
        <div style={{
          display:"inline-flex",alignItems:"center",gap:"8px",
          background:"rgba(239,68,68,0.1)",
          border:"1px solid rgba(239,68,68,0.2)",
          borderRadius:"20px",padding:"6px 14px",marginBottom:"14px"
        }}>
          <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#ef4444",boxShadow:"0 0 8px #ef4444"}}></div>
          <span style={{fontSize:"12px",color:"#fca5a5",fontWeight:"500"}}>Live Scam Alerts — Australia 2025</span>
        </div>
        <h1 style={{
          fontSize:"26px",fontWeight:"800",marginBottom:"8px",
          background:"linear-gradient(135deg,#ffffff,#a0b4ff)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
        }}>Scam News & Tips</h1>
        <p style={{fontSize:"13px",color:"rgba(255,255,255,0.4)"}}>
          Stay informed about the latest Australian scams and how to protect yourself.
        </p>
      </div>

      {/* Quick scan CTA */}
      <div style={{
        background:"linear-gradient(135deg,rgba(79,124,255,0.15),rgba(139,92,246,0.1))",
        border:"1px solid rgba(79,124,255,0.25)",
        borderRadius:"16px",padding:"16px 20px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        marginBottom:"24px",gap:"12px"
      }}>
        <div>
          <p style={{fontSize:"14px",fontWeight:"600",color:"#ffffff",marginBottom:"2px"}}>
            Received a suspicious message?
          </p>
          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.4)"}}>
            Check it instantly with our AI scanner
          </p>
        </div>
        <button onClick={() => navigate("/")} style={{
          background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
          color:"white",border:"none",borderRadius:"10px",
          padding:"10px 18px",fontSize:"13px",fontWeight:"600",cursor:"pointer",
          whiteSpace:"nowrap",boxShadow:"0 4px 15px rgba(79,124,255,0.3)",flexShrink:0
        }}>Scan Now 🔍</button>
      </div>

      {/* Scam news feed */}
      <div style={{marginBottom:"32px"}}>
        {scamNews.map((news) => (
          <div key={news.id} style={{
            background:"rgba(255,255,255,0.03)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"16px",padding:"20px",marginBottom:"12px",
            cursor:"pointer",transition:"all 0.2s"
          }} onClick={() => setExpanded(expanded === news.id ? null : news.id)}>

            <div style={{display:"flex",alignItems:"flex-start",gap:"14px"}}>
              <div style={{
                padding:"4px 10px",borderRadius:"8px",
                background:`${news.categoryColor}15`,
                border:`1px solid ${news.categoryColor}30`,
                fontSize:"11px",fontWeight:"600",color:news.categoryColor,
                flexShrink:0,whiteSpace:"nowrap"
              }}>{news.category}</div>

              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"8px",marginBottom:"6px"}}>
                  <h3 style={{fontSize:"14px",fontWeight:"700",color:"#ffffff",lineHeight:"1.3"}}>
                    {news.title}
                  </h3>
                  <span style={{fontSize:"16px",flexShrink:0}}>
                    {expanded === news.id ? "▲" : "▼"}
                  </span>
                </div>

                <p style={{
                  fontSize:"12px",color:"rgba(255,255,255,0.5)",
                  lineHeight:"1.6",marginBottom:"10px"
                }}>{news.desc}</p>

                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <span style={{
                    fontSize:"10px",padding:"2px 8px",borderRadius:"8px",
                    background:`${news.tagColor}15`,color:news.tagColor,
                    border:`1px solid ${news.tagColor}25`,fontWeight:"500"
                  }}>{news.tag}</span>
                  <span style={{fontSize:"11px",color:"rgba(255,255,255,0.25)"}}>
                    {news.date}
                  </span>
                </div>
              </div>
            </div>

            {expanded === news.id && (
              <div style={{
                marginTop:"16px",padding:"14px",
                background:"rgba(255,255,255,0.03)",
                border:"1px solid rgba(255,255,255,0.06)",
                borderRadius:"12px"
              }}>
                <p style={{fontSize:"12px",fontWeight:"600",color:"rgba(255,255,255,0.6)",marginBottom:"10px",textTransform:"uppercase",letterSpacing:"0.5px"}}>
                  How to protect yourself:
                </p>
                {news.tips.map((tip, i) => (
                  <div key={i} style={{
                    display:"flex",gap:"10px",padding:"8px 0",
                    borderBottom: i < news.tips.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none"
                  }}>
                    <span style={{color:news.categoryColor,flexShrink:0}}>✓</span>
                    <span style={{fontSize:"13px",color:"rgba(255,255,255,0.7)",lineHeight:"1.5"}}>{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Protection tips */}
      <div style={{
        background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"20px",padding:"24px",marginBottom:"24px"
      }}>
        <h2 style={{
          fontSize:"18px",fontWeight:"700",marginBottom:"4px",
          background:"linear-gradient(135deg,#ffffff,#a0b4ff)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
        }}>🛡️ Golden Rules to Stay Safe</h2>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.3)",marginBottom:"16px"}}>
          Follow these rules to protect yourself from scammers
        </p>
        {protectionTips.map((item, i) => (
          <div key={i} style={{
            display:"flex",gap:"12px",padding:"12px 0",
            borderBottom: i < protectionTips.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none"
          }}>
            <span style={{fontSize:"20px",flexShrink:0}}>{item.icon}</span>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,0.7)",lineHeight:"1.6"}}>{item.tip}</p>
          </div>
        ))}
      </div>

      {/* Scamwatch link */}
      <div style={{
        background:"linear-gradient(135deg,rgba(239,68,68,0.1),rgba(239,68,68,0.05))",
        border:"1px solid rgba(239,68,68,0.2)",
        borderRadius:"16px",padding:"20px",textAlign:"center"
      }}>
        <p style={{fontSize:"20px",marginBottom:"8px"}}>🚨</p>
        <p style={{fontSize:"14px",fontWeight:"600",color:"#fca5a5",marginBottom:"4px"}}>
          Been scammed?
        </p>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",marginBottom:"16px"}}>
          Report it immediately to Scamwatch and your bank
        </p>
        <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
          <a href="https://www.scamwatch.gov.au" target="_blank" rel="noreferrer" style={{
            padding:"10px 20px",borderRadius:"10px",
            background:"rgba(239,68,68,0.15)",
            color:"#fca5a5",border:"1px solid rgba(239,68,68,0.25)",
            fontSize:"13px",fontWeight:"600",textDecoration:"none"
          }}>Report to Scamwatch →</a>
          <a href="tel:1300795995" style={{
            padding:"10px 20px",borderRadius:"10px",
            background:"rgba(255,255,255,0.05)",
            color:"rgba(255,255,255,0.6)",border:"1px solid rgba(255,255,255,0.1)",
            fontSize:"13px",fontWeight:"600",textDecoration:"none"
          }}>Call ACCC 1300 795 995</a>
        </div>
      </div>
    </div>
  );
}