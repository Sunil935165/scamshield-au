import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLink = (to, icon, label) => (
    <Link to={to} style={{
      color: isActive(to) ? "#ffffff" : "rgba(255,255,255,0.5)",
      fontSize:"12px",textDecoration:"none",
      padding:"7px 12px",borderRadius:"8px",
      border: isActive(to) ? "1px solid rgba(79,124,255,0.3)" : "1px solid transparent",
      background: isActive(to) ? "rgba(79,124,255,0.15)" : "transparent",
      display:"flex",alignItems:"center",gap:"5px",
      transition:"all 0.2s",whiteSpace:"nowrap"
    }}>
      {icon} {label}
    </Link>
  );

  return (
    <>
      <nav style={{
        background:"rgba(10,14,39,0.95)",
        backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(100,130,255,0.15)",
        padding:"14px 24px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        position:"sticky",top:0,zIndex:100
      }}>
        {/* Logo */}
        <Link to="/" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none"}}>
          <div style={{
            width:"34px",height:"34px",
            background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
            borderRadius:"10px",display:"flex",alignItems:"center",
            justifyContent:"center",fontSize:"16px",
            boxShadow:"0 4px 15px rgba(79,124,255,0.4)"
          }}>🛡️</div>
          <div>
            <div style={{fontSize:"15px",fontWeight:"700",color:"#ffffff"}}>ScamShield AU</div>
            <div style={{fontSize:"9px",color:"rgba(255,255,255,0.4)",letterSpacing:"1px",textTransform:"uppercase"}}>Powered by Claude AI</div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div style={{display:"flex",gap:"4px",alignItems:"center"}}>
          {user ? (
            <>
              {navLink("/", "🔍", "Scan")}
              {navLink("/history", "📋", "History")}
              {navLink("/tips", "💡", "Tips")}
              {navLink("/analytics", "📊", "Stats")}
              {navLink("/how-it-works", "❓", "Help")}

              {/* Profile dropdown trigger */}
              <div style={{position:"relative"}}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{
                    display:"flex",alignItems:"center",gap:"8px",
                    background:"rgba(79,124,255,0.1)",
                    border:"1px solid rgba(79,124,255,0.2)",
                    borderRadius:"10px",padding:"7px 12px",
                    color:"#a0b4ff",fontSize:"12px",fontWeight:"500",
                    cursor:"pointer",fontFamily:"inherit"
                  }}
                >
                  <div style={{
                    width:"22px",height:"22px",borderRadius:"50%",
                    background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:"11px",fontWeight:"700",color:"white"
                  }}>
                    {user.displayName?.[0]?.toUpperCase() || "U"}
                  </div>
                  {user.displayName?.split(" ")[0] || "Profile"}
                  <span style={{fontSize:"10px"}}>{menuOpen ? "▲" : "▼"}</span>
                </button>

                {menuOpen && (
                  <div style={{
                    position:"absolute",right:0,top:"calc(100% + 8px)",
                    background:"linear-gradient(135deg,#0d1537,#0a1628)",
                    border:"1px solid rgba(255,255,255,0.1)",
                    borderRadius:"14px",padding:"8px",minWidth:"180px",
                    boxShadow:"0 8px 30px rgba(0,0,0,0.5)",zIndex:200
                  }}>
                    <Link to="/profile" style={{
                      display:"flex",alignItems:"center",gap:"10px",
                      padding:"10px 12px",borderRadius:"10px",
                      color:"rgba(255,255,255,0.7)",fontSize:"13px",
                      textDecoration:"none",transition:"all 0.2s"
                    }}>
                      👤 My Profile
                    </Link>
                    <Link to="/analytics" style={{
                      display:"flex",alignItems:"center",gap:"10px",
                      padding:"10px 12px",borderRadius:"10px",
                      color:"rgba(255,255,255,0.7)",fontSize:"13px",
                      textDecoration:"none",transition:"all 0.2s"
                    }}>
                      📊 Analytics
                    </Link>
                    <div style={{height:"1px",background:"rgba(255,255,255,0.06)",margin:"6px 0"}}></div>
                    <button onClick={handleLogout} style={{
                      display:"flex",alignItems:"center",gap:"10px",
                      padding:"10px 12px",borderRadius:"10px",width:"100%",
                      color:"#fca5a5",fontSize:"13px",background:"none",
                      border:"none",cursor:"pointer",fontFamily:"inherit",
                      textAlign:"left"
                    }}>
                      🚪 Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {navLink("/how-it-works", "❓", "Help")}
              {navLink("/tips", "💡", "Tips")}
              <Link to="/login" style={{
                color:"rgba(255,255,255,0.6)",fontSize:"12px",textDecoration:"none",
                padding:"7px 12px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.08)"
              }}>Log in</Link>
              <Link to="/register" style={{
                color:"#ffffff",fontSize:"12px",textDecoration:"none",
                padding:"7px 14px",borderRadius:"8px",
                background:"linear-gradient(135deg,#4f7cff,#8b5cf6)",
                fontWeight:"600",boxShadow:"0 4px 15px rgba(79,124,255,0.3)"
              }}>Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Click outside to close menu */}
      {menuOpen && (
        <div
          style={{position:"fixed",inset:0,zIndex:99}}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}