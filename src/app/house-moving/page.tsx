import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["house-moving"];

export const metadata = serviceMetadata(content);

export default function HouseMoving() {
  return <ServicePageTemplate content={content} />;
}
