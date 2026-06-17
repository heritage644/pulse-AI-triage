import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

const DisclaimerCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="py-16 md:py-20 bg-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6 md:p-8"
            role="alert"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">
                  Important Medical Disclaimer
                </h3>

                <div
                  className={`text-amber-700 space-y-3 ${
                    isExpanded ? '' : 'hidden md:block'
                  }`}
                >
                  <p>
                    This tool provides <strong>preliminary health assessment only</strong>
                    and is designed to help you understand your symptoms better. It does
                    not constitute a medical diagnosis and should not replace consultation
                    with qualified healthcare professionals.
                  </p>
                  <p>
                    The AI-powered analysis offers risk stratification based on your
                    reported symptoms to guide you toward appropriate next steps—whether
                    that's self-care, scheduling a doctor visit, or seeking immediate
                    medical attention.
                  </p>
                </div>

                {/* Always Visible Core Message */}
                <div className="mt-4 p-4 bg-amber-100/50 rounded-lg">
                  <p className="text-amber-800 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                    For medical emergencies, please call your local emergency services
                    immediately.
                  </p>
                </div>

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-4 flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium text-sm transition-colors md:hidden"
                >
                  {isExpanded ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-slate-700 font-medium">Preliminary Assessment Only</p>
              <p className="text-slate-500 text-sm mt-1">
                Not a substitute for professional medical advice
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-slate-700 font-medium">Seeking Medical Help</p>
              <p className="text-slate-500 text-sm mt-1">
                Always consult doctors for proper diagnosis
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-slate-700 font-medium">Emergency Cases</p>
              <p className="text-slate-500 text-sm mt-1">
                Call emergency services for serious symptoms
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerCard;
