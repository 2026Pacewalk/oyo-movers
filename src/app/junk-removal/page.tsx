import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["junk-removal"];

export const metadata = serviceMetadata(content);

export default function JunkRemoval() {
  return <ServicePageTemplate content={content} />;
}
