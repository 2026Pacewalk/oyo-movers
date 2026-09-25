import ServicePageTemplate from "@/components/Services/ServicePageTemplate";
import { serviceContent, serviceMetadata } from "@/components/Services/serviceContent";

const content = serviceContent["donation-run"];

export const metadata = serviceMetadata(content);

export default function DonationRun() {
  return <ServicePageTemplate content={content} />;
}
