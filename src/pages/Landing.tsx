import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Activity, Shield, Clock } from "lucide-react";

const features = [
  { icon: Activity, title: "Smart Analysis", description: "AI-powered symptom evaluation for quick guidance" },
  { icon: Clock, title: "In Minutes", description: "Get results in just a few minutes, not hours" },
  { icon: Shield, title: "Private & Secure", description: "Your health data stays confidential" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            AI-Powered Health Guidance
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
            AI Health Triage{" "}
            <span className="text-primary">Assistant</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
            Get guidance on your symptoms in minutes. Answer a few questions and receive personalized health insights.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/assess")}
            className="text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
          >
            Start Assessment
          </Button>
          <p className="mt-6 text-xs text-muted-foreground max-w-sm mx-auto">
            This tool provides guidance only and does not replace professional medical advice. Always consult a healthcare provider.
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
              className="p-6 rounded-xl bg-card border border-border text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
