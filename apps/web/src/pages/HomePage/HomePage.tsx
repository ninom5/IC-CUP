import {
  Blogs,
  HeroSection,
  HowItWorks,
  Neanderthal,
  GetRentLandingSection,
} from "@components/index";

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <Neanderthal />
      <Blogs />
      <GetRentLandingSection />
      <HowItWorks />

      {/* <Footer /> */}
    </main>
  );
};
