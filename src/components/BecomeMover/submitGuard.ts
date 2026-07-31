"use client";

// Simple sessionStorage-based submit guard to prevent duplicate API calls
// per step unless data has changed

export type StepKey = 3 | 4 | 5 | 6 | 7 | 8 | 9;

const keyFor = (step: StepKey) => `onboarding_step_signature_${step}`;

export function buildSignature(obj: unknown): string {
  try {
    // Normalize by stringifying with stable keys
    return JSON.stringify(obj);
  } catch {
    return "";
  }
}

export function shouldSkipSubmit(step: StepKey, signature: string, extraCondition: boolean = true): boolean {
  try {
    if (!extraCondition) return false;
    const prev = sessionStorage.getItem(keyFor(step));
    return Boolean(prev && prev === signature);
  } catch {
    return false;
  }
}

export function markSubmitted(step: StepKey, signature: string): void {
  try {
    sessionStorage.setItem(keyFor(step), signature);
  } catch {}
}


