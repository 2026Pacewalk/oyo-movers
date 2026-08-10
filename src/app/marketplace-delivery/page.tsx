import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["marketplace-delivery"];

export const metadata = serviceMetadata(content);

export default function MarketplaceDelivery() {
  return <ServicePageTemplate content={content} />;
}
