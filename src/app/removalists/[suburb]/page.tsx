import { notFound } from "next/navigation";
import { suburbs, suburbBySlug } from "@/components/Locations/suburbs";
import { locationMetadata } from "@/components/Locations/locationSeo";
import LocationPageTemplate from "@/components/Locations/LocationPageTemplate";

export function generateStaticParams() {
  return suburbs.map((s) => ({ suburb: s.slug }));
}

export function generateMetadata({ params }: { params: { suburb: string } }) {
  const s = suburbBySlug(params.suburb);
  return s ? locationMetadata(s) : {};
}

export default function RemovalistsSuburbPage({ params }: { params: { suburb: string } }) {
  const suburb = suburbBySlug(params.suburb);
  if (!suburb) notFound();
  return <LocationPageTemplate suburb={suburb} />;
}
