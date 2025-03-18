// src/app/(marketing)/page.tsx
import Layout from "@/components/layout/Layout";
import Benefits from "@/components/sections/Benefits";
import InteractiveHero from "@/components/sections/InteractiveHero";
import SocialProof from "@/components/sections/SocialProof";
import ProcessFlow from "@/components/sections/ProcessFlow";

export default function Home() {
  return (
    <Layout>
      <InteractiveHero />
      <Benefits />
      <SocialProof />
      <ProcessFlow />
    </Layout>
  );
}
