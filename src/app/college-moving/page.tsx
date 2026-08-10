import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["college-moving"];

export const metadata = serviceMetadata(content);

export default function CollegeMoving() {
  return <ServicePageTemplate content={content} />;
}
