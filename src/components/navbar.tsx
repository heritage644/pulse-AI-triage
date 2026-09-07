import { useState, useEffect } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'How It Works', id: 'how-it-works' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 pt-5 transition-all duration-300 ${
        isScrolled
          ? ' backdrop-blur-md shadow-sm text-[#6e80ff] '
          : ' backdrop-blur-md text-[#09bcee] '
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/logo (1).svg" alt="Pulse AI Logo" />
            <span className={`font-bold text-lg md:text-xl  `}>
            pulse<strong className='text-[#34d1fc]'>A</strong>
            <strong className='text-[#6e80ff]'>I</strong>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-slate-600 hover:text-[#6e80ff] font-medium
                 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('start-assessment')}
              className={`text-[#09bcee]
                 ${isScrolled && "text-[#6e80ff] duration-200 transition-all" } 
                  font-medium`}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left text-slate-600 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('start-assessment')}
            className="w-full bg-[#6e80ff] hover:bg-blue-700 text-white px-5 py-3 
            rounded-lg font-medium transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
