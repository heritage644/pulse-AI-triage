import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const AssessmentCTA = () => {
  const navigate = useNavigate()
  const scrollToAssessment = () => {
    navigate("/assess")
  };

  const features = [
    'No account required',
    'Anonymous & confidential',
    'Instant preliminary results',
  ];

  return (
    <section
      id="start-assessment"
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border-2 border-blue-500  backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium mb-6">
          <CheckCircle className="w-4 h-4" />
          Ready to start? Begin your assessment now.
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
          Take the First Step Toward
          <br className="hidden md:block" />
          Understanding Your Health
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-black mb-10 max-w-2xl mx-auto">
          Enter your symptoms now and receive a preliminary AI-powered risk
          assessment. It only takes a few minutes, and there is nothing to lose.
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToAssessment}
          className="group inline-flex items-center gap-3 btn-filled   px-10 py-5
           rounded-2xl font-bold text-lg md:text-xl transition-all duration-300"
        >
          Start Your Assessment
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Features List */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-black">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Trust Message */}
        <p className="mt-8 text-black text-sm">
          By starting, you agree that this is a preliminary assessment tool and not a
          substitute for professional medical advice.
        </p>
      </div>
    </section>
  );
};

export default AssessmentCTA;