"use client";

import { useEffect, useState } from "react";
import { Role } from "@/types";

function getInitialHighlight(): { isRegistered: boolean; highlightedRole: Role | null } {
  if (typeof window === "undefined") return { isRegistered: false, highlightedRole: null };
  try {
    const registered = sessionStorage.getItem("registered");
    const role = sessionStorage.getItem("registeredRole");
    if (registered === "true" && (role === "student" || role === "mentor")) {
      return { isRegistered: true, highlightedRole: role };
    }
  } catch {
    // Ignore storage errors
  }
  return { isRegistered: false, highlightedRole: null };
}

export function useActivationHighlight() {
  const [highlightState, setHighlightState] = useState(getInitialHighlight);

  useEffect(() => {
    if (highlightState.isRegistered) {
      const timer = setTimeout(() => {
        try {
          sessionStorage.removeItem("registered");
          sessionStorage.removeItem("registeredRole");
        } catch {
          // Ignore
        }
        setHighlightState({ isRegistered: false, highlightedRole: null });
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [highlightState.isRegistered]);

  return highlightState;
}
