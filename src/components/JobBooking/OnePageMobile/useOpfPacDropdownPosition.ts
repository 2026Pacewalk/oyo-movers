"use client";

import { useCallback, useEffect, useRef } from "react";

const DESKTOP_MQ = "(min-width: 768px)";

/** Keeps Google `.pac-container` aligned with the active OPF address input on desktop scroll. */
export function useOpfPacDropdownPosition() {
  const containerRef = useRef<HTMLDivElement>(null);

  const syncPacPosition = useCallback(() => {
    if (typeof window === "undefined" || !window.matchMedia(DESKTOP_MQ).matches) return;

    const input = containerRef.current?.querySelector("input");
    const pac = document.querySelector<HTMLElement>(".pac-container");
    if (!input || !pac || document.activeElement !== input) return;

    const rect = input.getBoundingClientRect();
    pac.style.position = "fixed";
    pac.style.top = `${rect.bottom}px`;
    pac.style.left = `${rect.left}px`;
    pac.style.width = `${rect.width}px`;
  }, []);

  useEffect(() => {
    const onScroll = () => requestAnimationFrame(syncPacPosition);
    const onResize = () => syncPacPosition();

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);

    const container = containerRef.current;
    const input = container?.querySelector("input");
    input?.addEventListener("focus", syncPacPosition);
    input?.addEventListener("input", syncPacPosition);

    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      input?.removeEventListener("focus", syncPacPosition);
      input?.removeEventListener("input", syncPacPosition);
    };
  }, [syncPacPosition]);

  return containerRef;
}
