// src/app/(marketing)/page.tsx
import Layout from "@/components/layout/Layout";
import Benefits from "@/components/sections/Benefits";
import InteractiveHero from "@/components/sections/InteractiveHero";
import ProcessFlow from "@/components/sections/ProcessFlow";

export default function Home() {
  return (
    <Layout>
      <InteractiveHero />
      <Benefits />
      <ProcessFlow />
    </Layout>
  );
}
