import { Shield, Clock, ChevronRight, Star } from "lucide-react";
import Navbar from "@/components/navbar";
import DisclaimerCard from "@/components/disclaimerCard";
import HowItWorks from "@/components/howitworks";
import AssessmentCTA from "@/components/assesment";
import Benefits from "@/components/benefits";
import Footer from "@/components/footer";
import logo from "@/assets/logo.png";
import { CognitionField } from "@/components/cognitionfiels";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] },
  },
};
const Landing = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
    
    <div className="relative min-h-screen overflow-hidden">
      <Navbar/>
      {/* Video Background */}

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen bg-black flex items-center z-0 pt-20 pb-16 md:pt-24 md:pb-24"
      >
        {/* Decorative Blur Effects */}
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
             

              {/* Heading */}
              <motion.h1
        variants={item} className="text-5xl md:text-5xl font-display lg:text-6xl  text-slate-300 
              leading-tight text-sheen mb-6">
                Assess Your Symptoms in{" "}
                <span className="slong  font-normal italic">Minutes</span>, Not Hours
                
              </motion.h1>
              

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 leading-relaxed
               max-w-xl mx-auto lg:mx-0 mb-8">
                Get instant, AI-driven preliminary health guidance.
                Enter your symptoms and receive a risk assessment
                to help you make informed decisions about your next steps.
              </p>

              {/* Buttons */}
              <div className="flex flex-col  sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <button
                  onClick={() =>
                    scrollToSection("start-assessment")
                  }
                  className=" w-[50%] text-white py-2  btn-fill
                 rounded-full font-semibold w-full md:w-1/2 flex items-center justify-center gap-2"
                >
                  Start Assessment

                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() =>
                    scrollToSection("how-it-works")
                  }
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 transition-all duration-300"
                >
                  Learn More
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span>Takes ~3 minutes</span>
                </div>

                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>No login required</span>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Free to use</span>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <CognitionField/>
          </div>
        </div>
      </section>
      
    </div>
    <DisclaimerCard/>
      <HowItWorks/>
      <Benefits/>
      <AssessmentCTA/>
      <Footer/>

    </>
  );
};

export default Landing;