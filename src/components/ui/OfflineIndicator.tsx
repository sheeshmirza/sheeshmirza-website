"use client";

import { useEffect, useState } from "react";
import { WifiOff, CheckCircle } from "lucide-react";

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      setJustReconnected(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setJustReconnected(true);
      const timer = setTimeout(() => setJustReconnected(false), 3000);
      return () => clearTimeout(timer);
    };

    setIsOffline(!navigator.onLine);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline && !justReconnected) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 border border-border bg-surface px-4 py-2.5 text-xs shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2"
    >
      {isOffline ? (
        <>
          <WifiOff size={16} className="text-signal animate-pulse" />
          <span className="font-medium text-foreground">
            You are browsing offline. Showing cached content.
          </span>
        </>
      ) : (
        <>
          <CheckCircle size={16} className="text-accent" />
          <span className="font-medium text-foreground">
            Connection restored. Data refreshed.
          </span>
        </>
      )}
    </aside>
  );
}
