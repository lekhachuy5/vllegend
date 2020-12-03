import React from "react";
import AnimationRevealPage from "src/clientpages/helpers/AnimationRevealPage.js";
import Header from "src/clientpages/components/headers/light.js";
import Pricing from "src/clientpages/components/pricing/TwoPlansWithDurationSwitcher.js";
import Testimonial from "src/clientpages/components/testimonials/ThreeColumnWithProfileImage.js";
import Footer from "src/clientpages/components/footers/FiveColumnWithInputForm.js";
import FAQ from "src/clientpages/components/faqs/SingleCol.js";

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Pricing />
      <Testimonial
        heading="Our Paying Customers"
      />
      <FAQ />
      <Footer/>
    </AnimationRevealPage>
  );
};
