import { Blogs, HeroSection, HowItWorks, Neanderthal } from "@components/index";

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <Neanderthal />
      <Blogs />
      <HowItWorks />

      {/* <Footer /> */}
    </main>
  );
};
