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
      <HowItWorks />

      <GetRentLandingSection />
      {/* <Footer /> */}
    </main>
  );
};
