import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { showSuccess, showError } from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return showError("Please enter your email and password.");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showSuccess("Welcome back! Logged in successfully.");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") showError("No account found. Please register first.");
      else if (err.code === "auth/wrong-password") showError("Incorrect password. Please try again.");
      else if (err.code === "auth/invalid-email") showError("Please enter a valid email address.");
      else if (err.code === "auth/invalid-credential") showError("Email or password is incorrect.");
      else if (err.code === "auth/too-many-requests") showError("Too many attempts. Please try again later.");
      else showError("Login failed. Please check your details.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width:"100%",background:"rgba(255,255,255,0.05)",
    border:"1px solid rgba(255,255,255,0.08)",borderRadius:"12px",
    padding:"13px 16px",fontSize:"14px",color:"rgba(255,255,255,0.85)",
    boxSizing:"border-box",fontFamily:"inherit",outline:"none",marginBottom:"14px"
  };

  return (
    <div style={{maxWidth:"420px",margin:"0 auto",padding:"60px 20px"}}>
      <div style={{textAlign:"center",marginBottom:"32px"}}>
        <div style={{
          width:"64px",height:"64px",borderRadius:"20px",
          background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"28px",margin:"0 auto 16px",
          boxShadow:"0 8px 30px rgba(79,124,255,0.4)"
        }}>🔐</div>
        <h1 style={{
          fontSize:"28px",fontWeight:"800",marginBottom:"8px",
          background:"linear-gradient(135deg,#ffffff,#a0b4ff)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
        }}>Welcome Back</h1>
        <p style={{fontSize:"14px",color:"rgba(255,255,255,0.4)"}}>
          Log in to your ScamShield account.
        </p>
      </div>

      <div style={{
        background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"20px",padding:"28px"
      }}>
        <label style={{
          display:"block",fontSize:"12px",fontWeight:"500",
          color:"rgba(255,255,255,0.4)",marginBottom:"6px",
          textTransform:"uppercase",letterSpacing:"0.5px"
        }}>Email Address</label>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />

        <label style={{
          display:"block",fontSize:"12px",fontWeight:"500",
          color:"rgba(255,255,255,0.4)",marginBottom:"6px",
          textTransform:"uppercase",letterSpacing:"0.5px"
        }}>Password</label>
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={inputStyle}
        />

        <div style={{textAlign:"right",marginBottom:"20px",marginTop:"-8px"}}>
          <button
            onClick={() => alert("Please contact support to reset your password.")}
            style={{
              fontSize:"12px",color:"#4f7cff",
              background:"none",border:"none",
              cursor:"pointer",fontFamily:"inherit",
              padding:0
            }}>
            Forgot password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width:"100%",padding:"15px",
            background: loading ? "rgba(79,124,255,0.3)" : "linear-gradient(135deg,#4f7cff,#8b5cf6)",
            color:"white",border:"none",borderRadius:"12px",
            fontSize:"15px",fontWeight:"700",cursor:"pointer",
            boxShadow: loading ? "none" : "0 8px 30px rgba(79,124,255,0.4)",
            transition:"all 0.3s"
          }}
        >
          {loading ? "Logging in..." : "Log In →"}
        </button>
      </div>

      <div style={{
        display:"flex",alignItems:"center",gap:"12px",margin:"20px 0"
      }}>
        <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.06)"}}></div>
        <span style={{fontSize:"11px",color:"rgba(255,255,255,0.2)"}}>OR</span>
        <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.06)"}}></div>
      </div>

      <p style={{textAlign:"center",fontSize:"13px",color:"rgba(255,255,255,0.3)"}}>
        Don't have an account?{" "}
        <a href="/register" style={{color:"#4f7cff",textDecoration:"none",fontWeight:"500"}}>
          Register here
        </a>
      </p>

      <div style={{
        marginTop:"24px",padding:"14px",
        background:"rgba(79,124,255,0.06)",
        border:"1px solid rgba(79,124,255,0.12)",
        borderRadius:"12px",textAlign:"center"
      }}>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.3)",lineHeight:"1.6"}}>
          🔒 Your account is protected by Firebase Authentication and AES-256 encryption
        </p>
      </div>
    </div>
  );
}