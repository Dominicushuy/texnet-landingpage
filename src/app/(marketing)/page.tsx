// src/app/(marketing)/page.tsx
import Layout from "@/components/layout/Layout";
import HomeBenefits from "@/components/sections/BenefitsSectionExample";
import InteractiveHero from "@/components/sections/InteractiveHero";

export default function Home() {
  return (
    <Layout>
      <InteractiveHero />
      <HomeBenefits />
    </Layout>
  );
}
