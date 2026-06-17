import { ClipboardList, MessageSquare, ShieldCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: ClipboardList,
      number: '01',
      title: 'Enter Your Symptoms',
      description:
        'Simply type or select the symptoms you\'re experiencing. Start with your main concern and add any additional symptoms you\'ve noticed.',
    },
    {
      icon: MessageSquare,
      number: '02',
      title: 'Answer Follow-Up Questions',
      description:
        'Our AI will ask relevant follow-up questions to better understand your condition. This helps refine the assessment accuracy.',
    },
    {
      icon: ShieldCheck,
      number: '03',
      title: 'Receive Risk Assessment',
      description:
        'Get an instant preliminary risk assessment with recommended next steps. Know when to seek professional medical attention.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get your preliminary health assessment in three easy steps.
            No complicated forms or medical jargon.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 to-blue-200 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mt-4">
                  <step.icon className="w-8 h-8 text-red-600" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow (Desktop only, not on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2  -right-6 -translate-y-1/2 w-12 
                  h-12 bg-white rounded-full shadow-lg items-center justify-center">
                      <div className=" w-full h-full flex items-center justify-center" > 
                          <svg
                      className="w-5 h-5  text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                      </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time Estimate */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-slate-600">
              Most assessments are completed in{' '}
              <strong className="text-slate-800">under 3 minutes</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
