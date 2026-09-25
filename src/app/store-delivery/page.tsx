import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["store-delivery"];

export const metadata = serviceMetadata(content);

export default function StoreDelivery() {
  return <ServicePageTemplate content={content} />;
}
