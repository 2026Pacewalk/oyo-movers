import { apiUrl } from "@/config";

export type RateMoverJobData = {
  jobRef: string;
  moverName: string;
  rating?: number;
  comment?: string;
  alreadyRated: boolean;
};

const parseBody = (json: unknown): Record<string, unknown> => {
  if (!json || typeof json !== "object") return {};
  const root = json as Record<string, unknown>;
  const data = root.data;
  if (data && typeof data === "object") return data as Record<string, unknown>;
  return root;
};

const pickString = (...values: unknown[]): string | undefined => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return undefined;
};

const nameFromPerson = (person?: Record<string, unknown>): string | undefined => {
  if (!person) return undefined;

  const user = person.user as Record<string, unknown> | undefined;
  const profile = person.profile as Record<string, unknown> | undefined;

  const direct = pickString(
    person.name,
    person.displayName,
    person.fullName,
    person.firstName,
    user?.name,
    user?.displayName,
    user?.fullName,
    user?.firstName,
    profile?.name,
    profile?.firstName
  );
  if (direct) return direct;

  const first = pickString(person.firstName, user?.firstName, profile?.firstName);
  const last = pickString(person.lastName, user?.lastName, profile?.lastName);
  const full = [first, last].filter(Boolean).join(" ").trim();
  return full || undefined;
};

const firstNameFromFullName = (fullName: string): string => {
  const trimmed = fullName.trim();
  if (!trimmed) return fullName;
  return trimmed.split(/\s+/)[0] || trimmed;
};

export const getMoverDisplayName = (data: Record<string, unknown>): string => {
  const mover = data.mover as Record<string, unknown> | undefined;
  const assignedMover = data.assignedMover as Record<string, unknown> | undefined;
  const moverDetails = data.moverDetails as Record<string, unknown> | undefined;
  const driver = data.driver as Record<string, unknown> | undefined;
  const assignedDriver = data.assignedDriver as Record<string, unknown> | undefined;
  const acceptedBy = data.acceptedBy as Record<string, unknown> | undefined;
  const provider = data.provider as Record<string, unknown> | undefined;
  const serviceProvider = data.serviceProvider as Record<string, unknown> | undefined;
  const assignment = data.assignment as Record<string, unknown> | undefined;
  const jobAssignment = data.jobAssignment as Record<string, unknown> | undefined;

  const listEntry = (
    (data.movers as Record<string, unknown>[] | undefined)?.[0] ||
    (data.assignedMovers as Record<string, unknown>[] | undefined)?.[0] ||
    (data.team as Record<string, unknown>[] | undefined)?.[0]
  ) as Record<string, unknown> | undefined;

  const resolved = pickString(
    data.moverName,
    data.mover_name,
    data.moverFullName,
    nameFromPerson(mover),
    nameFromPerson(assignedMover),
    nameFromPerson(moverDetails),
    nameFromPerson(driver),
    nameFromPerson(assignedDriver),
    nameFromPerson(acceptedBy),
    nameFromPerson(provider),
    nameFromPerson(serviceProvider),
    nameFromPerson(assignment?.mover as Record<string, unknown> | undefined),
    nameFromPerson(jobAssignment?.mover as Record<string, unknown> | undefined),
    nameFromPerson(listEntry)
  );

  if (resolved) {
    return firstNameFromFullName(resolved);
  }

  return "your mover";
};

export const normalizeRateMoverJob = (
  raw: unknown,
  jobRef: string
): RateMoverJobData => {
  const data = parseBody(raw) as Record<string, unknown>;
  const customerReview = data.customerReview as Record<string, unknown> | undefined;
  const customerRating = data.customerRating as Record<string, unknown> | undefined;

  const rating =
    (data.rating as number | undefined) ??
    (customerReview?.rating as number | undefined) ??
    (customerRating?.rating as number | undefined);

  const comment =
    (data.comment as string | undefined) ??
    (customerReview?.comment as string | undefined) ??
    (customerRating?.comment as string | undefined) ??
    "";

  const alreadyRated = Boolean(
    data.alreadyRated ??
      data.reviewStatus ??
      data.hasRating ??
      (typeof rating === "number" && rating > 0)
  );

  return {
    jobRef,
    moverName: getMoverDisplayName(data),
    rating: typeof rating === "number" ? rating : undefined,
    comment: comment || "",
    alreadyRated,
  };
};

export async function getPublicJobRating(jobRef: string): Promise<{
  ok: boolean;
  status: number;
  data?: RateMoverJobData;
  message?: string;
}> {
  try {
    const res = await fetch(
      `${apiUrl}/public/jobs/${encodeURIComponent(jobRef)}/rating`,
      { cache: "no-store" }
    );
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message =
        (json as { message?: string })?.message || "Failed to load review";
      return { ok: false, status: res.status, message };
    }
    return {
      ok: true,
      status: res.status,
      data: normalizeRateMoverJob(json, jobRef),
    };
  } catch {
    return { ok: false, status: 500, message: "Something went wrong" };
  }
}

export async function postPublicJobRating(
  jobRef: string,
  body: { rating: number; comment: string }
): Promise<{ ok: boolean; status: number; message?: string }> {
  try {
    const res = await fetch(
      `${apiUrl}/public/jobs/${encodeURIComponent(jobRef)}/rating`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message =
        (json as { message?: string })?.message || "Failed to submit review";
      return { ok: false, status: res.status, message };
    }
    const message =
      (json as { message?: string })?.message || "Review submitted successfully";
    return { ok: true, status: res.status, message };
  } catch {
    return { ok: false, status: 500, message: "Something went wrong" };
  }
}
