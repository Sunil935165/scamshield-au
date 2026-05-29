import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{
        display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",
        minHeight:"60vh",gap:"16px"
      }}>
        <div style={{
          width:"48px",height:"48px",borderRadius:"50%",
          border:"3px solid rgba(79,124,255,0.3)",
          borderTopColor:"#4f7cff",
          animation:"spin 0.8s linear infinite"
        }}></div>
        <p style={{fontSize:"14px",color:"rgba(255,255,255,0.4)"}}>
          Checking authentication...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return null;

  return children;
}