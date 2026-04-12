import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Users, 
  ClipboardList, 
  BarChart3, 
  FileText, 
  Download, 
  Send,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react';

const slides = [
  {
    image: "https://picsum.photos/seed/postal1/1920/600",
    title: "Connecting India, Empowering Business",
    description: "The Business Development Branch is your partner in logistics and growth."
  },
  {
    image: "https://picsum.photos/seed/postal2/1920/600",
    title: "Digital Solutions for Modern Logistics",
    description: "Streamlined tracking, reporting, and customer management at your fingertips."
  },
  {
    image: "https://picsum.photos/seed/postal3/1920/600",
    title: "Trusted Reach, Nationwide Impact",
    description: "Leveraging the world's largest postal network for your business success."
  }
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src={slides[current].image} 
            alt={slides[current].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
              >
                {slides[current].title}
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-200 drop-shadow-md"
              >
                {slides[current].description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
      >
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-[#FFC220] w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-[#E31837] text-white shadow-md border-b-4 border-[#FFC220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Indian National Emblem */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Emblem of India" 
              className="h-16 w-auto brightness-0 invert" 
              referrerPolicy="no-referrer"
            />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Business Development Branch</h1>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden lg:flex gap-6 font-medium text-sm">
              <a href="#dashboard" className="hover:text-[#FFC220] transition-colors">Dashboard</a>
              <a href="#documents" className="hover:text-[#FFC220] transition-colors">Documents</a>
              <a href="#forms" className="hover:text-[#FFC220] transition-colors">Forms</a>
            </nav>
            {/* India Post Logo */}
            <div className="bg-white p-1.5 rounded-md shadow-sm">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/3/32/India_Post.svg" 
                alt="India Post Logo" 
                className="h-10 md:h-12 w-auto" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>

      <HeroSlider />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Welcome Section */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-300 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BD Branch Portal</h2>
            <p className="text-gray-600 max-w-2xl">
              Access all your business development tools, reports, and customer management interfaces in one centralized location.
            </p>
          </div>
          <div className="bg-[#FFF9E6] p-4 rounded-xl border border-[#FFC220]/30 text-[#E31837] font-semibold">
            System Status: Online
          </div>
        </section>

        {/* Cards Section */}
        <section id="dashboard">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <LayoutDashboard className="text-[#E31837]" />
            Core Modules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: BD Interface */}
            <a href="https://dhenkanal-postal-division-interface.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-blue-50 rounded-xl shadow-sm border-2 border-blue-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-blue-500">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                <LayoutDashboard className="text-blue-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">BD Interface</h4>
              <p className="text-gray-600 text-sm">Main interface for business development operations and tracking.</p>
            </a>

            {/* Card 2: BNPL */}
            <a href="https://bnpl-services.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-emerald-50 rounded-xl shadow-sm border-2 border-emerald-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-emerald-500">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors">
                <CreditCard className="text-emerald-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">BNPL</h4>
              <p className="text-gray-600 text-sm">Book Now Pay Later services, customer credit management and invoicing.</p>
            </a>

            {/* Card 3: Advance Customer */}
            <button 
              onClick={() => setShowAdvanceModal(true)}
              className="bg-amber-50 text-left rounded-xl shadow-sm border-2 border-amber-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-amber-500 w-full"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                <Users className="text-amber-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Advance Customer</h4>
              <p className="text-gray-600 text-sm">Manage advance deposit accounts, bulk customers, and special clients.</p>
            </button>

            {/* Advance Customer Modal */}
            <AnimatePresence>
              {showAdvanceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-2xl shadow-2xl border-t-4 border-[#E31837] w-full max-w-2xl overflow-hidden"
                  >
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Users className="text-[#E31837]" />
                        Advance Customer Options
                      </h3>
                      <button 
                        onClick={() => setShowAdvanceModal(false)}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                      {/* Sub-card 1: Advance Customer Data */}
                      <a 
                        href="https://docs.google.com/spreadsheets/d/1vn6sGUOy2STwsFihUUjmdcww0IRZBpXiUMy_9JRgY-A/edit?gid=1288268905#gid=1288268905" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group p-6 rounded-xl border-2 border-gray-200 hover:border-[#E31837] hover:bg-[#FFF9E6]/30 transition-all flex flex-col items-center text-center gap-4"
                      >
                        <div className="w-16 h-16 bg-[#FFF9E6] rounded-full flex items-center justify-center group-hover:bg-[#E31837] transition-colors">
                          <FileText className="text-[#E31837] group-hover:text-white" size={32} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Advance Customer Data</h4>
                          <p className="text-xs text-gray-500">View detailed spreadsheets and datasets</p>
                        </div>
                        <ExternalLink size={16} className="text-[#E31837] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>

                      {/* Sub-card 2: Advance Customer PPT */}
                      <a 
                        href="https://advance-customer-facility-dashboard.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group p-6 rounded-xl border-2 border-gray-200 hover:border-[#E31837] hover:bg-[#FFF9E6]/30 transition-all flex flex-col items-center text-center gap-4"
                      >
                        <div className="w-16 h-16 bg-[#FFF9E6] rounded-full flex items-center justify-center group-hover:bg-[#E31837] transition-colors">
                          <BarChart3 className="text-[#E31837] group-hover:text-white" size={32} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Advance Customer PPT</h4>
                          <p className="text-xs text-gray-500">View presentations and dashboards</p>
                        </div>
                        <ExternalLink size={16} className="text-[#E31837] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                      <button 
                        onClick={() => setShowAdvanceModal(false)}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Card 5: BD Orders/Rules */}
            <a href="https://bd-products-orders.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-indigo-50 rounded-xl shadow-sm border-2 border-indigo-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-indigo-500">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500 transition-colors">
                <ClipboardList className="text-indigo-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">BD Orders/Rules</h4>
              <p className="text-gray-600 text-sm">Latest departmental orders, guidelines, and business rules.</p>
            </a>

            {/* Card 6: BD report */}
            <a href="https://bdachievement-report.edgeone.app/" target="_blank" rel="noopener noreferrer" className="bg-rose-50 rounded-xl shadow-sm border-2 border-rose-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-rose-500">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-rose-500 transition-colors">
                <BarChart3 className="text-rose-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">BD Report</h4>
              <p className="text-gray-600 text-sm">Generate revenue reports, performance analytics, and MIS data.</p>
            </a>

          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Documents Section */}
          <section id="documents" className="bg-white rounded-2xl shadow-sm border border-gray-300 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="text-[#E31837]" />
              Documents & Resources
            </h3>
            <div className="space-y-4">
              {[
                "Business Development Manual 2024",
                "BNPL Agreement Template",
                "Tariff Structure & Discount Matrix",
                "Standard Operating Procedures (SOP)"
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="text-gray-400" size={20} />
                    <span className="font-medium text-gray-700">{doc}</span>
                  </div>
                  <button className="p-2 text-[#E31837] hover:bg-[#FFF9E6] rounded-md transition-colors" title="Download">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-3 text-sm font-semibold text-[#E31837] border border-[#E31837] rounded-lg hover:bg-[#E31837] hover:text-white transition-colors">
              View All Documents
            </button>
          </section>

          {/* Forms Section */}
          <section id="forms" className="bg-white rounded-2xl shadow-sm border border-gray-300 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Send className="text-[#E31837]" />
              Quick Request Form
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31837] focus:border-[#E31837] outline-none transition-all" placeholder="Enter your name" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Employee ID / Office</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31837] focus:border-[#E31837] outline-none transition-all" placeholder="e.g. 123456" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Request Type</label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31837] focus:border-[#E31837] outline-none transition-all bg-white">
                  <option>BNPL Account Creation</option>
                  <option>Advance Customer Setup</option>
                  <option>Report Generation Request</option>
                  <option>Other Query</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31837] focus:border-[#E31837] outline-none transition-all resize-none" placeholder="Describe your request..."></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-[#E31837] text-white font-semibold rounded-lg hover:bg-[#c41530] transition-colors shadow-sm">
                Submit Request
              </button>
            </form>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-12 border-t-4 border-[#FFC220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#FFC220] rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                IP
              </div>
              <h4 className="text-white font-bold text-lg">Business Development</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Empowering India Post's business growth through digital solutions and streamlined customer management.
            </p>
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 italic">
                Prepared by Kalandi Charan Sahoo, OA, DO, Dhenkanal Postal Division.
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FFC220] transition-colors">India Post Official</a></li>
              <li><a href="#" className="hover:text-[#FFC220] transition-colors">Employee Portal</a></li>
              <li><a href="#" className="hover:text-[#FFC220] transition-colors">Helpdesk Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail size={16} className="text-[#FFC220]" /> bd.support@indiapost.gov.in</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-[#FFC220]" /> 1800-266-6868</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
