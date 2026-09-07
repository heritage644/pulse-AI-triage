import { Zap, UserCheck, Brain, HeartHandshake } from 'lucide-react';
import CountUp from './counter';
const BenefitsSection = () => {
  const benefits = [
    {
      icon: Zap,
      title: 'Fast Assessment',
      description:
        'Get preliminary results in minutes, not hours. Our AI processes your symptoms instantly and provides immediate guidance.',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: UserCheck,
      title: 'No Registration Required',
      description:
        'Jump straight into your assessment without creating an account. Your privacy is protected—no personal data stored.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description:
        'Advanced machine learning algorithms analyze your symptoms against extensive medical knowledge bases for accurate risk assessment.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: HeartHandshake,
      title: 'Easy to Use',
      description:
        'Simple, intuitive interface designed for everyone. No medical knowledge needed—just describe what you\'re feeling.',
      color: 'bg-green-100 text-green-600',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg- text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Benefits of {" "}
          <strong className='text-[#6e80ff]'>Pulse</strong><strong className='text-[#34d1fc]'>A</strong>
            <strong className='text-[#6e80ff]'>I</strong>
          
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Designed with your needs in mind to provide quick, reliable health guidance
            when you need it most.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 lg:p-8 border border-slate-100
                "
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 ${benefit.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <benefit.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 md:p-12">
          <div className="grid sm:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
  <CountUp end={100} suffix="%" />
</div>
              <div className="text-blue-100">Free to Use</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">0</div>
              <div className="text-blue-100">Login Required</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">&lt;3min</div>
              <div className="text-blue-100">Quick Assessment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;