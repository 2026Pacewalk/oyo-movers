import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["appliance-delivery"];

export const metadata = serviceMetadata(content);

export default function ApplianceDelivery() {
  return <ServicePageTemplate content={content} />;
}
