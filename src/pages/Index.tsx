import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import TrustSection from "@/components/TrustSection";
import LegalSection from "@/components/LegalSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoriesGrid />
      <TrustSection />
      <LegalSection />
    </Layout>
  );
};

export default Index;
