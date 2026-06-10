import { useState } from "react";

const LANGUAGES = [
  { label: "🇦🇺 English (AU)", code: "en-AU" },
  { label: "🇺🇸 English (US)", code: "en-US" },
  { label: "🇬🇧 English (UK)", code: "en-GB" },
  { label: "🇨🇳 Mandarin", code: "zh-CN" },
  { label: "🇯🇵 Japanese", code: "ja-JP" },
  { label: "🇰🇷 Korean", code: "ko-KR" },
  { label: "🇪🇸 Spanish", code: "es-ES" },
  { label: "🇮🇹 Italian", code: "it-IT" },
  { label: "🇫🇷 French", code: "fr-FR" },
  { label: "🇩🇪 German", code: "de-DE" },
  { label: "🇵🇹 Portuguese", code: "pt-PT" },
];

export default function AudioButton({ text }) {
  const [playing, setPlaying] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en-AU");
  const [showLangPicker, setShowLangPicker] = useState(false);

  const speak = () => {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang;
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
    setShowLangPicker(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === selectedLang);

  return (
    <div style={{marginBottom:"16px"}}>
      <div style={{display:"flex",gap:"8px",alignItems:"center"}}>

        <button onClick={speak} style={{
          display:"flex",alignItems:"center",gap:"10px",
          background: playing
            ? "linear-gradient(135deg,#4f7cff,#8b5cf6)"
            : "rgba(79,124,255,0.1)",
          border: playing
            ? "1px solid rgba(79,124,255,0.5)"
            : "1px solid rgba(79,124,255,0.25)",
          borderRadius:"14px",padding:"14px 22px",
          fontSize:"15px",fontWeight:"600",
          color: playing ? "#ffffff" : "#a0b4ff",
          cursor:"pointer",fontFamily:"inherit",
          transition:"all 0.2s",
          boxShadow: playing ? "0 4px 20px rgba(79,124,255,0.4)" : "none",
          flex:1
        }}>
          <span style={{fontSize:"20px"}}>{playing ? "⏹" : "🔊"}</span>
          <span>{playing ? "Stop Reading" : "Read Aloud"}</span>
          {playing && (
            <span style={{display:"flex",gap:"3px",alignItems:"center",marginLeft:"4px"}}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  width:"3px",height:"14px",
                  background:"rgba(255,255,255,0.7)",
                  borderRadius:"2px",
                  animation:"wave 0.8s ease-in-out infinite",
                  animationDelay:`${i * 0.15}s`
                }}></span>
              ))}
            </span>
          )}
        </button>

        <button onClick={() => setShowLangPicker(!showLangPicker)} style={{
          display:"flex",alignItems:"center",gap:"6px",
          background:"rgba(255,255,255,0.05)",
          border:"1px solid rgba(255,255,255,0.1)",
          borderRadius:"14px",padding:"14px 16px",
          fontSize:"13px",color:"rgba(255,255,255,0.6)",
          cursor:"pointer",fontFamily:"inherit",
          transition:"all 0.2s",whiteSpace:"nowrap"
        }}>
          <span>{currentLang?.label.split(" ")[0]}</span>
          <span style={{fontSize:"11px"}}>{showLangPicker ? "▲" : "▼"}</span>
        </button>
      </div>

      {showLangPicker && (
        <div style={{
          marginTop:"8px",
          background:"rgba(13,21,55,0.98)",
          border:"1px solid rgba(255,255,255,0.1)",
          borderRadius:"14px",padding:"8px",
          maxHeight:"280px",overflowY:"auto",
          boxShadow:"0 8px 30px rgba(0,0,0,0.4)"
        }}>
          <p style={{
            fontSize:"11px",color:"rgba(255,255,255,0.3)",
            textTransform:"uppercase",letterSpacing:"0.5px",
            padding:"6px 10px 10px",margin:0
          }}>
            Select language
          </p>
          {LANGUAGES.map(lang => (
            <button key={lang.code} onClick={() => {
              setSelectedLang(lang.code);
              setShowLangPicker(false);
              if (playing) {
                window.speechSynthesis.cancel();
                setPlaying(false);
              }
            }} style={{
              display:"flex",width:"100%",textAlign:"left",
              padding:"10px 12px",borderRadius:"10px",
              alignItems:"center",justifyContent:"space-between",
              background: selectedLang === lang.code
                ? "rgba(79,124,255,0.2)" : "transparent",
              border: selectedLang === lang.code
                ? "1px solid rgba(79,124,255,0.3)"
                : "1px solid transparent",
              color: selectedLang === lang.code
                ? "#a0b4ff" : "rgba(255,255,255,0.7)",
              fontSize:"13px",cursor:"pointer",
              fontFamily:"inherit",marginBottom:"2px"
            }}>
              <span>{lang.label}</span>
              {selectedLang === lang.code && (
                <span style={{fontSize:"11px",color:"#4f7cff"}}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}