import { useEffect, useRef } from "react";

const MARQUEE_DURATION_MS = 140_000;

export function useReviewMarquee(direction: "left" | "right", paused: boolean) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const stateRef = useRef({
    offset: 0,
    halfWidth: 0,
    lastTime: 0,
    initialized: false,
  });

  pausedRef.current = paused;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const state = stateRef.current;
    state.lastTime = 0;
    state.initialized = false;

    const measure = () => {
      const nextHalf = track.scrollWidth / 2;
      if (nextHalf <= 0) return;

      if (!state.initialized) {
        state.halfWidth = nextHalf;
        state.offset = direction === "right" ? -nextHalf : 0;
        state.initialized = true;
        return;
      }

      const ratio = state.halfWidth > 0 ? state.offset / state.halfWidth : 0;
      state.halfWidth = nextHalf;
      state.offset = ratio * nextHalf;
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    let rafId = 0;

    const tick = (now: number) => {
      if (state.lastTime === 0) state.lastTime = now;

      if (!pausedRef.current && state.halfWidth > 0) {
        const delta = now - state.lastTime;
        const pxPerMs = state.halfWidth / MARQUEE_DURATION_MS;

        if (direction === "left") {
          state.offset -= pxPerMs * delta;
          if (state.offset <= -state.halfWidth) {
            state.offset += state.halfWidth;
          }
        } else {
          state.offset += pxPerMs * delta;
          if (state.offset >= 0) {
            state.offset -= state.halfWidth;
          }
        }
      }

      state.lastTime = now;
      track.style.transform = `translate3d(${state.offset}px, 0, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [direction]);

  return trackRef;
}
