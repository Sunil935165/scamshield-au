import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { showAlert } from "./Toast";

const TIMEOUT = 30 * 60 * 1000;

export default function AutoLogout() {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const warningRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

    warningRef.current = setTimeout(() => {
      showAlert("You will be logged out in 5 minutes due to inactivity.");
    }, TIMEOUT - 5 * 60 * 1000);

    timerRef.current = setTimeout(async () => {
      await signOut(auth);
      showAlert("You have been logged out due to inactivity.");
      navigate("/login");
    }, TIMEOUT);
  };

  useEffect(() => {
    const events = ["mousedown","mousemove","keydown","scroll","touchstart","click"];
    events.forEach(e => window.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
    };
  }, []);

  return null;
}
