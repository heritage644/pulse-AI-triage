import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Activity, Shield, Clock , Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";


const features = [
  { icon: Activity, title: "Smart Analysis", description: "AI-powered symptom evaluation for quick guidance" },
  { icon: Clock, title: "In Minutes", description: "Get results in just a few minutes, not hours" },
  { icon: Shield, title: "Private & Secure", description: "Your health data stays confidential" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen body flex flex-col relative overflow-hidden">

      {/* 🎥 VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="public/doc_2026-03-24_20-35-21.mp4" type="video/mp4" />
        </video>

        {/* Overlay (important for readability) */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Optional blue tint for healthcare vibe */}
        <div className="absolute inset-0 bg-blue-900/20"></div>
      </div>

      <div id="bg-blob" className="relative z-10 flex flex-col min-h-screen">

        {/* Hero */}
        <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 
              rounded-full bg-black/30 backdrop-blur-sm text-primary text-sm font-medium mb-6">
              <Activity className="w-4 h-4" />
              AI-Powered Health Guidance
            </div>

            <h1 className="text-4xl md:text-5xl font-baloo lg:text-6xl font-bold text-white leading-tight mb-4">
              PULSE <span className="text-primary">A<strong className="text-red-500 ">I</strong></span>
            </h1>

            <p className="text-lg md:text-md text-white/90 mb-8 max-w-lg mx-auto">
              Get guidance on your symptoms in minutes. Answer a few questions and receive personalized health insights.
            </p>

            <Button
              size="lg"
              onClick={() => navigate("/assess")}
              className="text-lg px-8 py-6 font-baloo rounded-xl 
              bg-primary text-white
              hover:bg-white hover:text-primary hover:border-primary 
              transition-all duration-300 hover:shadow-sm"
            >
              Start Assessment
            </Button>

            <p className="mt-6 text-md text-white/70 max-w-sm mx-auto">
              This tool provides guidance only and does not replace professional medical advice.
              Always consult a healthcare provider.
            </p>
          </motion.div>
        </section>

        {/* Features */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/70">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}

    <footer className="w-full bg-black/40 backdrop-blur-md border-t border-white/10 text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* TOP GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">

          {/* BRAND */}
          <div className="space-y-4">
            <h2 className="text-2xl font-baloo font-bold text-white">
              PULSE <span className="text-primary">A<strong className="text-red-500 ">I</strong> </span>
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              AI-powered health guidance that helps you understand symptoms and make informed decisions quickly and safely.
            </p>

            <div className="flex gap-4 pt-2">
              <Twitter className="w-5 h-5 cursor-pointer hover:text-primary transition" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-primary transition" />
              <Github className="w-5 h-5 cursor-pointer hover:text-primary transition" />
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary cursor-pointer">Symptom Checker</li>
              <li className="hover:text-primary cursor-pointer">AI Analysis</li>
              <li className="hover:text-primary cursor-pointer">Health Reports</li>
              <li className="hover:text-primary cursor-pointer">Mobile App</li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary cursor-pointer">About Us</li>
              <li className="hover:text-primary cursor-pointer">Careers</li>
              <li className="hover:text-primary cursor-pointer">Blog</li>
              <li className="hover:text-primary cursor-pointer">Press</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary cursor-pointer">Help Center</li>
              <li className="hover:text-primary cursor-pointer">Documentation</li>
              <li className="hover:text-primary cursor-pointer">API Access</li>
              <li className="hover:text-primary cursor-pointer">Community</li>
            </ul>
          </div>

          {/* CONTACT + NEWSLETTER */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Stay Updated</h3>

            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent outline-none text-sm flex-1 placeholder:text-white/50"
              />
              <button className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:opacity-90">
                Subscribe
              </button>
            </div>

            <div className="space-y-2 text-sm text-white/70 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@pulseai.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +234 8169315045
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lagos, Nigeria
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-8"></div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">

          <p>© {new Date().getFullYear()} PULSE AI. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer">Cookies</span>
          </div>

        </div>
      </div>
    </footer>

      </div>
    </div>
  );
};

export default Landing;