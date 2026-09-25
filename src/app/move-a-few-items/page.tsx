import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["move-a-few-items"];

export const metadata = serviceMetadata(content);

export default function MoveAFewItems() {
  return <ServicePageTemplate content={content} />;
}
