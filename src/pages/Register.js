import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";

export default function Register() {
  const [form, setForm] = useState({ name:"",email:"",password:"",f1:"",f2:"",f3:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handle = e => setForm({...form,[e.target.name]:e.target.value});

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      return setError("Please fill in all required fields.");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    setLoading(true);
    setError("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });
      await sendEmailVerification(cred.user);
      alert("Account created successfully! Please check your email inbox to verify your account.");
      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
    setLoading(false);
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

  return (
    <div style={{maxWidth:"480px",margin:"0 auto",padding:"40px 20px"}}>
      <div style={{textAlign:"center",marginBottom:"32px"}}>
        <div style={{
          width:"64px",height:"64px",borderRadius:"20px",
          background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"28px",margin:"0 auto 16px",
          boxShadow:"0 8px 30px rgba(79,124,255,0.4)"
        }}>🛡️</div>
        <h1 style={{
          fontSize:"28px",fontWeight:"800",marginBottom:"8px",
          background:"linear-gradient(135deg,#ffffff,#a0b4ff)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
        }}>Create Account</h1>
        <p style={{fontSize:"14px",color:"rgba(255,255,255,0.4)"}}>
          Your details are kept private and secure.
        </p>
      </div>

      <div style={{
        background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"20px",padding:"28px"
      }}>
        {error && (
          <div style={{
            background:"rgba(239,68,68,0.1)",
            border:"1px solid rgba(239,68,68,0.2)",
            borderRadius:"10px",padding:"10px 14px",marginBottom:"16px",
            fontSize:"13px",color:"#fca5a5"
          }}>⚠️ {error}</div>
        )}

        <label style={labelStyle}>Full Name</label>
        <input name="name" type="text" placeholder="e.g. Margaret Wilson"
          value={form.name} onChange={handle} style={inputStyle}/>

        <label style={labelStyle}>Email Address</label>
        <input name="email" type="email" placeholder="e.g. margaret@email.com"
          value={form.email} onChange={handle} style={inputStyle}/>

        <label style={labelStyle}>Password</label>
        <input name="password" type="password" placeholder="Min 6 characters"
          value={form.password} onChange={handle} style={inputStyle}/>

        <div style={{height:"1px",background:"rgba(255,255,255,0.06)",margin:"4px 0 18px"}}></div>

        <label style={labelStyle}>Family Member Emails (optional, up to 3)</label>
        {[["f1","Son's email address"],["f2","Daughter's email address"],["f3","Third contact email"]].map(([name,ph],i) => (
          <div key={name} style={{display:"flex",gap:"10px",alignItems:"center",marginBottom:"10px"}}>
            <div style={{
              width:"28px",height:"28px",borderRadius:"8px",flexShrink:0,
              background:"rgba(79,124,255,0.15)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:"12px",color:"#a0b4ff",fontWeight:"700"
            }}>{i+1}</div>
            <input name={name} type="email" placeholder={ph}
              value={form[name]} onChange={handle}
              style={{...inputStyle,marginBottom:0,flex:1}}/>
          </div>
        ))}

        <button onClick={handleSubmit} disabled={loading} style={{
          width:"100%",padding:"15px",marginTop:"12px",
          background: loading ? "rgba(79,124,255,0.3)" : "linear-gradient(135deg,#4f7cff,#8b5cf6)",
          color:"white",border:"none",borderRadius:"12px",
          fontSize:"15px",fontWeight:"700",cursor:"pointer",
          boxShadow: loading ? "none" : "0 8px 30px rgba(79,124,255,0.4)",
          transition:"all 0.3s"
        }}>
          {loading ? "Creating account..." : "Create Account →"}
        </button>

        <div style={{
          marginTop:"16px",padding:"12px",
          background:"rgba(79,124,255,0.08)",
          border:"1px solid rgba(79,124,255,0.15)",
          borderRadius:"10px"
        }}>
          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.5)",textAlign:"center"}}>
            📧 A verification email will be sent to your inbox after registration
          </p>
        </div>
      </div>

      <p style={{textAlign:"center",marginTop:"20px",fontSize:"13px",color:"rgba(255,255,255,0.3)"}}>
        Already have an account?{" "}
        <a href="/login" style={{color:"#4f7cff",textDecoration:"none",fontWeight:"500"}}>
          Log in
        </a>
      </p>
    </div>
  );
}