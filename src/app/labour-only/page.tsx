import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["labour-only"];

export const metadata = serviceMetadata(content);

export default function LabourOnly() {
  return <ServicePageTemplate content={content} />;
}
