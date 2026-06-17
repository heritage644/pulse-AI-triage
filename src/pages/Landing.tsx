import { Shield, Clock, ChevronRight, Star } from "lucide-react";
import Navbar from "@/components/navbar";
import DisclaimerCard from "@/components/disclaimerCard";
import HowItWorks from "@/components/howitworks";
import AssessmentCTA from "@/components/assesment";
import Benefits from "@/components/benefits";
import Footer from "@/components/footer";
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
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source
            src="/doc_2026-03-24_20-35-21.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center z-0 pt-20 pb-16 md:pt-24 md:pb-24"
      >
        {/* Decorative Blur Effects */}
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-medium text-white mb-6">
                <Shield className="w-4 h-4" />
                AI-Powered Health Assessment
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-300 leading-tight mb-6">
                Assess Your Symptoms in{" "}
                <span className="slong">Minutes</span>, Not Hours
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                Get instant, AI-driven preliminary health guidance.
                Enter your symptoms and receive a risk assessment
                to help you make informed decisions about your next steps.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <button
                  onClick={() =>
                    scrollToSection("start-assessment")
                  }
                  className=" w-[50%] text-white py-2  btn-fill
                 rounded-full font-semibold  flex items-center justify-center gap-2"
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
            <div className="relative hidden lg:block">
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/5 rounded-2xl p-6">
                  {/* Window Dots */}
                  <div className="flex gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>

                  {/* Symptoms */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Headache", "Fatigue", "Fever"].map(
                      (symptom) => (
                        <span
                          key={symptom}
                          className="bg-blue-500/20 text-blue-200 px-3 py-1.5 rounded-full text-sm"
                        >
                          {symptom}
                        </span>
                      )
                    )}

                    <span className="bg-green-500/20 text-green-200 px-3 py-1.5 rounded-full text-sm">
                      +2 more
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-white/70 mb-2">
                      <span>Assessment Progress</span>
                      <span>75%</span>
                    </div>

                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
                    </div>
                  </div>

                  {/* AI Status */}
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white">
                          AI Analyzing...
                        </p>

                        <p className="text-xs text-white/60">
                          Processing 12 symptom patterns
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg animate-bounce">
                <span className="font-semibold">Low Risk</span>
              </div>
            </div>
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