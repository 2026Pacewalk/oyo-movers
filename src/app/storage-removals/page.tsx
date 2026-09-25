import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["storage-removals"];

export const metadata = serviceMetadata(content);

export default function StorageRemovals() {
  return <ServicePageTemplate content={content} />;
}
