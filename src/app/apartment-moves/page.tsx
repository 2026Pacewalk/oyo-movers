import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["apartment-moves"];

export const metadata = serviceMetadata(content);

export default function ApartmentMoves() {
  return <ServicePageTemplate content={content} />;
}
