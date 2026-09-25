import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["office-relocation"];

export const metadata = serviceMetadata(content);

export default function OfficeRelocation() {
  return <ServicePageTemplate content={content} />;
}
