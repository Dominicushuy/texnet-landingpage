// src/app/(marketing)/page.tsx
import Layout from "@/components/layout/Layout";
import InteractiveHero from "@/components/sections/InteractiveHero";

export default function Home() {
  return (
    <Layout>
      <InteractiveHero />
      <h1 className="text-4xl font-bold text-center">Welcome to Next.js</h1>
    </Layout>
  );
}
