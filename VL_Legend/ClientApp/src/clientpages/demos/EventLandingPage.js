import React from "react";
import AnimationRevealPage from "src/clientpages/helpers/AnimationRevealPage.js";
import Hero from "src/clientpages/components/hero/BackgroundAsImageWithCenteredContent.js";
import Features from "src/clientpages/components/features/VerticalWithAlternateImageAndText.js";
import Blog from "src/clientpages/components/blogs/ThreeColSimpleWithImage.js";
import Testimonial from "src/clientpages/components/testimonials/TwoColumnWithImage.js";
import ContactUsForm from "src/clientpages/components/forms/SimpleContactUs.js";
import Footer from "src/clientpages/components/footers/SimpleFiveColumn.js";



export default () => (
  <AnimationRevealPage>
    <Hero />
    <Features />
    <Blog />
    <Testimonial />
    <ContactUsForm />
    <Footer />
  </AnimationRevealPage>
);
