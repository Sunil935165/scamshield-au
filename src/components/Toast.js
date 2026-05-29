import { Toaster, toast } from "react-hot-toast";

export function showSuccess(message) {
  toast.custom((t) => (
    <div style={{
      display:"flex",alignItems:"center",gap:"12px",
      background:"linear-gradient(135deg,#0d1537,#0a1628)",
      border:"1px solid rgba(34,197,94,0.3)",
      borderRadius:"14px",padding:"14px 18px",
      boxShadow:"0 8px 30px rgba(0,0,0,0.4)",
      animation: t.visible ? "slideInRight 0.3s ease" : "none",
      maxWidth:"360px"
    }}>
      <div style={{
        width:"36px",height:"36px",borderRadius:"10px",flexShrink:0,
        background:"rgba(34,197,94,0.15)",
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"
      }}>✅</div>
      <div>
        <p style={{fontSize:"14px",fontWeight:"600",color:"#86efac",marginBottom:"2px"}}>
          Success
        </p>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.5)"}}>{message}</p>
      </div>
    </div>
  ), { duration: 3000, position: "top-right" });
}

export function showError(message) {
  toast.custom((t) => (
    <div style={{
      display:"flex",alignItems:"center",gap:"12px",
      background:"linear-gradient(135deg,#0d1537,#0a1628)",
      border:"1px solid rgba(239,68,68,0.3)",
      borderRadius:"14px",padding:"14px 18px",
      boxShadow:"0 8px 30px rgba(0,0,0,0.4)",
      animation: t.visible ? "slideInRight 0.3s ease" : "none",
      maxWidth:"360px"
    }}>
      <div style={{
        width:"36px",height:"36px",borderRadius:"10px",flexShrink:0,
        background:"rgba(239,68,68,0.15)",
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"
      }}>⚠️</div>
      <div>
        <p style={{fontSize:"14px",fontWeight:"600",color:"#fca5a5",marginBottom:"2px"}}>
          Error
        </p>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.5)"}}>{message}</p>
      </div>
    </div>
  ), { duration: 4000, position: "top-right" });
}

export function showInfo(message) {
  toast.custom((t) => (
    <div style={{
      display:"flex",alignItems:"center",gap:"12px",
      background:"linear-gradient(135deg,#0d1537,#0a1628)",
      border:"1px solid rgba(79,124,255,0.3)",
      borderRadius:"14px",padding:"14px 18px",
      boxShadow:"0 8px 30px rgba(0,0,0,0.4)",
      animation: t.visible ? "slideInRight 0.3s ease" : "none",
      maxWidth:"360px"
    }}>
      <div style={{
        width:"36px",height:"36px",borderRadius:"10px",flexShrink:0,
        background:"rgba(79,124,255,0.15)",
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"
      }}>💡</div>
      <div>
        <p style={{fontSize:"14px",fontWeight:"600",color:"#a0b4ff",marginBottom:"2px"}}>
          Info
        </p>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.5)"}}>{message}</p>
      </div>
    </div>
  ), { duration: 3000, position: "top-right" });
}

export function showAlert(message) {
  toast.custom((t) => (
    <div style={{
      display:"flex",alignItems:"center",gap:"12px",
      background:"linear-gradient(135deg,#0d1537,#0a1628)",
      border:"1px solid rgba(251,191,36,0.3)",
      borderRadius:"14px",padding:"14px 18px",
      boxShadow:"0 8px 30px rgba(0,0,0,0.4)",
      animation: t.visible ? "slideInRight 0.3s ease" : "none",
      maxWidth:"360px"
    }}>
      <div style={{
        width:"36px",height:"36px",borderRadius:"10px",flexShrink:0,
        background:"rgba(251,191,36,0.15)",
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"
      }}>🔔</div>
      <div>
        <p style={{fontSize:"14px",fontWeight:"600",color:"#fde68a",marginBottom:"2px"}}>
          Alert
        </p>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.5)"}}>{message}</p>
      </div>
    </div>
  ), { duration: 3000, position: "top-right" });
}

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{ style: { background:"transparent", border:"none", boxShadow:"none", padding:0 } }}
    />
  );
}