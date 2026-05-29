import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function Profile() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [contacts, setContacts] = useState([
    { name: "Son", email: "" },
    { name: "Daughter", email: "" },
    { name: "Neighbour", email: "" },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setForm(prev => ({
          ...prev,
          name: currentUser.displayName || "",
          email: currentUser.email || ""
        }));
      }
    });
    const saved = localStorage.getItem("familyContacts");
    if (saved) setContacts(JSON.parse(saved));
    return () => unsubscribe();
  }, []);

  const handle = e => setForm({...form,[e.target.name]:e.target.value});

  const handleContactChange = (index, field, value) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  const handleSave = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: form.name });
      localStorage.setItem("familyContacts", JSON.stringify(contacts));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert("Failed to save. Please try again.");
    }
  };

  const inputStyle = {
    width:"100%",background:"rgba(255,255,255,0.05)",
    border:"1px solid rgba(255,255,255,0.08)",borderRadius:"12px",
    padding:"13px 16px",fontSize:"14px",color:"rgba(255,255,255,0.85)",
    boxSizing:"border-box",fontFamily:"inherit",outline:"none",marginBottom:"14px"
  };

  const labelStyle = {
    display:"block",fontSize:"12px",fontWeight:"500",
    color:"rgba(255,255,255,0.4)",marginBottom:"6px",
    textTransform:"uppercase",letterSpacing:"0.5px"
  };

  const card = {
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"20px",padding:"24px",marginBottom:"16px"
  };

  return (
    <div style={{maxWidth:"520px",margin:"0 auto",padding:"32px 20px"}}>

      <button onClick={() => navigate("/")} style={{
        background:"none",border:"1px solid rgba(255,255,255,0.1)",
        color:"rgba(255,255,255,0.5)",borderRadius:"10px",
        padding:"8px 16px",fontSize:"13px",cursor:"pointer",marginBottom:"24px"
      }}>← Back</button>

      {/* Avatar */}
      <div style={{textAlign:"center",marginBottom:"28px"}}>
        <div style={{
          width:"80px",height:"80px",borderRadius:"50%",
          background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"32px",margin:"0 auto 12px",
          boxShadow:"0 8px 30px rgba(79,124,255,0.4)"
        }}>👤</div>
        <h1 style={{
          fontSize:"22px",fontWeight:"800",marginBottom:"4px",
          background:"linear-gradient(135deg,#ffffff,#a0b4ff)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
        }}>{form.name || "Your Name"}</h1>
        <p style={{fontSize:"13px",color:"rgba(255,255,255,0.4)"}}>{form.email}</p>
      </div>

      {/* Stats */}
      <div style={{display:"flex",gap:"10px",marginBottom:"16px"}}>
        {[["47","Total Scans","#4f7cff"],["31","Scams Found","#ef4444"],["12","Alerts Sent","#8b5cf6"]].map(([val,label,color]) => (
          <div key={label} style={{
            flex:1,textAlign:"center",padding:"16px 8px",
            background:`linear-gradient(135deg,${color}15,${color}05)`,
            border:`1px solid ${color}25`,borderRadius:"14px"
          }}>
            <div style={{fontSize:"22px",fontWeight:"800",color:"#ffffff",marginBottom:"2px"}}>{val}</div>
            <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)"}}>{label}</div>
          </div>
        ))}
      </div>

      {/* Personal Info */}
      <div style={card}>
        <p style={{fontSize:"13px",fontWeight:"600",color:"rgba(255,255,255,0.7)",marginBottom:"16px"}}>
          Personal Information
        </p>
        <label style={labelStyle}>Full Name</label>
        <input name="name" type="text" value={form.name}
          onChange={handle} style={inputStyle} placeholder="Your full name"/>

        <label style={labelStyle}>Email Address</label>
        <input name="email" type="email" value={form.email}
          style={{...inputStyle, opacity:0.6}} disabled
          placeholder="Your email"/>
        <p style={{fontSize:"11px",color:"rgba(255,255,255,0.3)",marginTop:"-10px",marginBottom:"14px"}}>
          Email cannot be changed here
        </p>

        <label style={labelStyle}>New Password</label>
        <input name="password" type="password"
          placeholder="Leave blank to keep current"
          style={inputStyle}/>
      </div>

      {/* Family Contacts */}
      <div style={card}>
        <p style={{fontSize:"13px",fontWeight:"600",color:"rgba(255,255,255,0.7)",marginBottom:"4px"}}>
          Family Contacts
        </p>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.3)",marginBottom:"16px"}}>
          These people will receive a real email alert when a scam is detected.
        </p>

        {contacts.map((contact, i) => (
          <div key={i} style={{marginBottom:"16px"}}>
            <div style={{display:"flex",gap:"8px",marginBottom:"6px"}}>
              <div style={{
                width:"28px",height:"28px",borderRadius:"8px",flexShrink:0,
                background:"rgba(79,124,255,0.15)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:"12px",color:"#a0b4ff",fontWeight:"700"
              }}>{i+1}</div>
              <input
                type="text"
                value={contact.name}
                onChange={e => handleContactChange(i, "name", e.target.value)}
                placeholder="Contact name (e.g. Son)"
                style={{...inputStyle, marginBottom:0, flex:1}}
              />
            </div>
            <input
              type="email"
              value={contact.email}
              onChange={e => handleContactChange(i, "email", e.target.value)}
              placeholder="Their email address"
              style={{...inputStyle, marginBottom:0, marginLeft:"36px", width:"calc(100% - 36px)"}}
            />
            {contact.email && (
              <p style={{fontSize:"11px",color:"#4ade80",marginLeft:"36px",marginTop:"4px"}}>
                ✅ Email set — alerts will be sent here
              </p>
            )}
            {!contact.email && (
              <p style={{fontSize:"11px",color:"rgba(255,255,255,0.3)",marginLeft:"36px",marginTop:"4px"}}>
                No email set yet
              </p>
            )}
          </div>
        ))}

        <div style={{
          background:"rgba(79,124,255,0.08)",
          border:"1px solid rgba(79,124,255,0.15)",
          borderRadius:"10px",padding:"10px 14px",marginTop:"8px"
        }}>
          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.5)"}}>
            💡 Add real email addresses above so your family receives actual alerts when you detect a scam.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <button onClick={handleSave} style={{
        width:"100%",padding:"15px",
        background: saved
          ? "linear-gradient(135deg,#22c55e,#16a34a)"
          : "linear-gradient(135deg,#4f7cff,#8b5cf6)",
        color:"white",border:"none",borderRadius:"14px",
        fontSize:"15px",fontWeight:"700",cursor:"pointer",
        boxShadow: saved
          ? "0 8px 30px rgba(34,197,94,0.4)"
          : "0 8px 30px rgba(79,124,255,0.4)",
        transition:"all 0.3s",marginBottom:"16px"
      }}>
        {saved ? "✅ Saved Successfully!" : "Save Changes"}
      </button>

      {/* Danger Zone */}
      <div style={{
        ...card,
        background:"rgba(239,68,68,0.05)",
        border:"1px solid rgba(239,68,68,0.15)"
      }}>
        <p style={{fontSize:"13px",fontWeight:"600",color:"#fca5a5",marginBottom:"12px"}}>
          Danger Zone
        </p>
        <button style={{
          width:"100%",padding:"12px",
          background:"rgba(239,68,68,0.1)",
          color:"#fca5a5",border:"1px solid rgba(239,68,68,0.2)",
          borderRadius:"10px",fontSize:"13px",fontWeight:"500",cursor:"pointer"
        }}>Delete Account</button>
      </div>
    </div>
  );
}