import AboutUsHero from "./AboutUsHero";
import AboutUsOffices from "./AboutUsOffices";
import AboutUsValues from "./AboutUsValues";
import AboutUsMission from "./AboutUsMission";
import AboutUsWork from "./AboutUsWork";
import AboutUsSecFair from "./AboutUsSecFair";
import AboutUsScenario from "./AboutUsScenario";

const AboutUs = () => {
  return (
    <div className="flex flex-col">
      <AboutUsHero />
      <AboutUsMission />
      <AboutUsWork />
      <AboutUsSecFair />
      <AboutUsScenario />
      <AboutUsValues />
      <AboutUsOffices />
    </div>
  );
};

export default AboutUs;
