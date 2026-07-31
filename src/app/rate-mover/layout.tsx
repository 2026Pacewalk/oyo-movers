import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rate your mover | Oyo Movers",
  description: "Submit your review after your move",
};

export default function RateMoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}