import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { auth } from "../firebase";

export default function FamilyAlertPopup({ result, onClose }) {
  const [selected, setSelected] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState([
    { name: "Son", email: "" },
    { name: "Daughter", email: "" },
    { name: "Neighbour", email: "" },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("familyContacts");
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  const handleSend = async () => {
    const contact = contacts[selected];
    if (!contact.email) {
      return setError("This contact has no email address. Please add one in your Profile.");
    }
    setSending(true);
    setError("");

    const user = auth.currentUser;

    const templateParams = {
      to_name: contact.name,
      to_email: contact.email,
      from_name: user?.displayName || "A family member",
      result: result?.classification || "Likely Scam",
      scam_type: result?.scamType || "Unknown",
      risk_score: result?.riskPercentage || 0,
      actions: Array.isArray(result?.immediateActions)
        ? result.immediateActions.join(", ")
        : "Contact your bank immediately."
    };

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setTimeout(onClose, 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to send email. Please check your connection and try again.");
    }
    setSending(false);
  };

  return (
    <div style={{
      position:"fixed",inset:0,
      background:"rgba(0,0,0,0.7)",
      backdropFilter:"blur(8px)",
      display:"flex",alignItems:"flex-end",
      zIndex:50,padding:"20px"
    }}>
      <div style={{
        background:"linear-gradient(135deg,#0d1537,#0a1628)",
        border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:"24px",width:"100%",padding:"28px",
        boxShadow:"0 -20px 60px rgba(0,0,0,0.5)"
      }}>
        {sent ? (
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>✅</div>
            <p style={{fontSize:"18px",fontWeight:"700",color:"#86efac",marginBottom:"8px"}}>
              Alert Sent!
            </p>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,0.4)"}}>
              A real email has been delivered to {contacts[selected].name}.
            </p>
          </div>
        ) : (
          <>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px"}}>
              <div style={{
                width:"42px",height:"42px",borderRadius:"14px",
                background:"rgba(79,124,255,0.15)",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px"
              }}>🔔</div>
              <div>
                <p style={{fontSize:"16px",fontWeight:"700",color:"#ffffff"}}>
                  Alert a Family Member
                </p>
                <p style={{fontSize:"12px",color:"rgba(255,255,255,0.4)"}}>
                  A scam was detected — notify someone you trust.
                </p>
              </div>
            </div>

            {error && (
              <div style={{
                background:"rgba(239,68,68,0.1)",
                border:"1px solid rgba(239,68,68,0.2)",
                borderRadius:"10px",padding:"10px 14px",marginBottom:"14px",
                fontSize:"13px",color:"#fca5a5"
              }}>⚠️ {error}</div>
            )}

            <select
              value={selected}
              onChange={e => setSelected(Number(e.target.value))}
              style={{
                width:"100%",background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",
                padding:"13px 16px",fontSize:"14px",color:"rgba(255,255,255,0.85)",
                marginBottom:"12px",fontFamily:"inherit",outline:"none"
              }}
            >
              {contacts.map((c, i) => (
                <option key={i} value={i} style={{background:"#0d1537"}}>
                  {c.name} {c.email ? `(${c.email})` : "(no email set)"}
                </option>
              ))}
            </select>

            <div style={{
              background: contacts[selected].email
                ? "rgba(79,124,255,0.08)"
                : "rgba(239,68,68,0.08)",
              border: contacts[selected].email
                ? "1px solid rgba(79,124,255,0.15)"
                : "1px solid rgba(239,68,68,0.15)",
              borderRadius:"10px",padding:"10px 14px",marginBottom:"16px"
            }}>
              <p style={{fontSize:"12px",color:"rgba(255,255,255,0.5)"}}>
                {contacts[selected].email
                  ? `📧 Email will be sent to: ${contacts[selected].email}`
                  : "⚠️ No email set for this contact. Add one in your Profile page."
                }
              </p>
            </div>

            <div style={{display:"flex",gap:"10px"}}>
              <button onClick={onClose} style={{
                flex:1,padding:"13px",borderRadius:"12px",
                background:"rgba(255,255,255,0.05)",
                color:"rgba(255,255,255,0.5)",
                border:"1px solid rgba(255,255,255,0.08)",
                fontSize:"14px",fontWeight:"500",cursor:"pointer"
              }}>Not now</button>
              <button onClick={handleSend} disabled={sending} style={{
                flex:2,padding:"13px",borderRadius:"12px",
                background: sending
                  ? "rgba(79,124,255,0.3)"
                  : "linear-gradient(135deg,#4f7cff,#8b5cf6)",
                color:"white",border:"none",
                fontSize:"14px",fontWeight:"700",cursor:"pointer",
                boxShadow: sending ? "none" : "0 4px 15px rgba(79,124,255,0.4)"
              }}>
                {sending ? "Sending..." : "Send Alert 🔔"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}