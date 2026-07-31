import { NextResponse } from "next/server";
import { tokenKey } from "@/config";
import type { NextRequest, NextResponse as NextResponseType } from "next/server";

const protectedRoutes = ["/profile", "/account-settings", "/booking-list", "/re-book", "/notification", '/logout'];
const publicRoutes = [
  "login",
  "become-mover",
  "become-helper",
  "fast-booking",
  "mover-account",
  "apartment-moves",
  "donation-run",
  "faqs",
  "moving-checklist",
  "packing-tips",
  "insurance",
  "item-we-take",
  "avg-moving-cost",
  "how-we-charge",
  "privacy-policy",
  "cancel-policy",
  "become-a-mover",
  "customer-portal",
  "get-estimate",
  "customer-reviews",
  "contact-us",
  "platform-terms",
  "movers-term",
  "customer-terms",
  "junk-removal",
  "move-a-few-items",
  "office-relocation",
  "prices",
  "storage-removals",
  "store-delivery",
  ''
];


export default function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const token = req.cookies.get(tokenKey)?.value;

  if (!token && protectedRoutes.includes(pathname)) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathname + searchParams.toString());
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/one-page-booking")) {
    const newUrl = new URL(req.url);
    newUrl.pathname = pathname.replace("/one-page-booking", "/quick-booking");
    return NextResponse.redirect(newUrl, 301);
  }
  //  else if (token && publicRoutes.includes(pathname.split("/")[1])) {
  //   const redirectUrl = new URL("/booking", req.url);
  //   return NextResponse.redirect(redirectUrl);
  // }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
