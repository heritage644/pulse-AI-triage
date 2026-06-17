import { Activity, Mail, AlertTriangle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">pulseAI</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              An AI-powered symptom triage system designed for rapid preliminary
              health risk assessment. Helping users make informed decisions about
              their health.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#start-assessment"
                  className="hover:text-white transition-colors"
                >
                  Start Assessment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Contact</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>project@pulseAI.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Medical Disclaimer:</strong> This
              application provides preliminary health assessments for informational
              purposes only. It does not constitute medical advice, diagnosis, or
              treatment. Always seek the advice of qualified healthcare providers with
              any questions regarding a medical condition.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            &copy; {currentYear} PulseAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Final Year Project
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;