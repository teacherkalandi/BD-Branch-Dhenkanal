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
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920&h=600",
    title: "Logistics Post",
    description: "Connecting India, Empowering Business with the world's largest postal network."
  },
  {
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=1920&h=600",
    title: "Speed Post",
    description: "Guaranteed Next-Day Delivery for your urgent parcels and documents."
  },
  {
    image: "https://images.unsplash.com/photo-1580136608079-72029d0de130?auto=format&fit=crop&q=80&w=1920&h=600",
    title: "World of Stamps",
    description: "Explore a whole new world of stamps from 1854 to today."
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920&h=600",
    title: "Digital India Post",
    description: "Modernizing postal services for a digital and connected India."
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
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBPRModal, setShowBPRModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-[#E31837] text-white shadow-md border-b-2 border-[#FFC220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Indian National Emblem */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Emblem of India" 
              className="h-12 md:h-16 w-auto brightness-0 invert" 
              referrerPolicy="no-referrer"
            />
            <h1 className="text-lg md:text-2xl font-bold tracking-tight leading-tight">
              Business Development Branch
              <span className="block text-[10px] md:text-xs font-normal opacity-80">Dhenkanal Postal Division</span>
            </h1>
          </div>
          
          {/* India Post Logo */}
          <div className="bg-white p-1 md:p-1.5 rounded-md shadow-sm shrink-0">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/3/32/India_Post.svg" 
              alt="India Post Logo" 
              className="h-8 md:h-12 w-auto" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-start md:justify-center gap-1 md:gap-8 min-w-max">
          {[
            { name: 'Dashboard', href: '#dashboard' },
            { name: 'Documents', href: '#documents' },
            { name: 'Forms', href: '#forms' }
          ].map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="px-4 py-3 text-sm font-bold text-gray-700 hover:text-[#E31837] border-b-2 border-transparent hover:border-[#E31837] transition-all whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>

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
            <button 
              onClick={() => setShowReportModal(true)}
              className="bg-rose-50 text-left rounded-xl shadow-sm border-2 border-rose-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-rose-500 w-full"
            >
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-rose-500 transition-colors">
                <BarChart3 className="text-rose-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">BD Report</h4>
              <p className="text-gray-600 text-sm">Generate revenue reports, performance analytics, and MIS data.</p>
            </button>

            {/* Card 7: ePost */}
            <a href="#" className="bg-cyan-50 rounded-xl shadow-sm border-2 border-cyan-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-cyan-500">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors">
                <Mail className="text-cyan-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">ePost</h4>
              <p className="text-gray-600 text-sm">Send and receive messages as soft copies through the internet.</p>
            </a>

            {/* Card 8: ePayment */}
            <a href="#" className="bg-violet-50 rounded-xl shadow-sm border-2 border-violet-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-violet-500">
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-500 transition-colors">
                <CreditCard className="text-violet-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">ePayment</h4>
              <p className="text-gray-600 text-sm">Electronic payment solutions for bills, taxes, and other services.</p>
            </a>

            {/* Card 9: Direct Post */}
            <a href="#" className="bg-orange-50 rounded-xl shadow-sm border-2 border-orange-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-orange-500">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                <Send className="text-orange-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Direct Post</h4>
              <p className="text-gray-600 text-sm">Un-addressed direct mail service for advertising and promotion.</p>
            </a>

            {/* Card 10: Mediapost */}
            <a href="#" className="bg-fuchsia-50 rounded-xl shadow-sm border-2 border-fuchsia-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-fuchsia-500">
              <div className="w-12 h-12 bg-fuchsia-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-fuchsia-500 transition-colors">
                <LayoutDashboard className="text-fuchsia-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Mediapost</h4>
              <p className="text-gray-600 text-sm">Advertising opportunities on postal stationery and vehicles.</p>
            </a>

            {/* Card 11: Retail Post */}
            <a href="#" className="bg-teal-50 rounded-xl shadow-sm border-2 border-teal-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-teal-500">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-500 transition-colors">
                <ClipboardList className="text-teal-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Retail Post</h4>
              <p className="text-gray-600 text-sm">One-stop shop for various third-party services and products.</p>
            </a>

            {/* BD Report Modal */}
            <AnimatePresence>
              {showReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-2xl shadow-2xl border-t-4 border-rose-500 w-full max-w-4xl overflow-hidden"
                  >
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <BarChart3 className="text-rose-600" />
                        BD Report Modules
                      </h3>
                      <button 
                        onClick={() => setShowReportModal(false)}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white overflow-y-auto max-h-[70vh]">
                      {/* Sub-card 1: Business Performance Report */}
                      <button 
                        onClick={() => setShowBPRModal(true)}
                        className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4"
                      >
                        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                          <BarChart3 className="text-rose-600 group-hover:text-white" size={32} />
                        </div>
                        <h4 className="font-bold text-gray-900">Business Performance Report</h4>
                      </button>

                      {/* Sub-card 2: Gangajal Report */}
                      <a href="#" className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                          <FileText className="text-rose-600 group-hover:text-white" size={32} />
                        </div>
                        <h4 className="font-bold text-gray-900">Gangajal Report</h4>
                      </a>

                      {/* Sub-card 3: Flag Sale Report */}
                      <a href="#" className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                          <FileText className="text-rose-600 group-hover:text-white" size={32} />
                        </div>
                        <h4 className="font-bold text-gray-900">Flag Sale Report</h4>
                      </a>

                      {/* Sub-card 4: Rakhi Cover Selling Report */}
                      <a href="#" className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                          <FileText className="text-rose-600 group-hover:text-white" size={32} />
                        </div>
                        <h4 className="font-bold text-gray-900">Rakhi Cover Selling Report</h4>
                      </a>

                      {/* Sub-card 5: BD Achievements */}
                      <a href="https://bdachievement-report.edgeone.app/" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                          <BarChart3 className="text-rose-600 group-hover:text-white" size={32} />
                        </div>
                        <h4 className="font-bold text-gray-900">BD Achievements</h4>
                      </a>

                      {/* Sub-card 6: BD Month Wise Report */}
                      <a href="#" className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                          <ClipboardList className="text-rose-600 group-hover:text-white" size={32} />
                        </div>
                        <h4 className="font-bold text-gray-900">BD Month Wise Report</h4>
                      </a>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                      <button 
                        onClick={() => setShowReportModal(false)}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Business Performance Report (BPR) Modal */}
            <AnimatePresence>
              {showBPRModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-2xl shadow-2xl border-t-4 border-rose-600 w-full max-w-lg overflow-hidden"
                  >
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <BarChart3 className="text-rose-600" />
                        Business Performance Reports
                      </h3>
                      <button 
                        onClick={() => setShowBPRModal(false)}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="p-8 space-y-4 bg-white">
                      <a 
                        href="https://bdrevenuachievemen2025-26.edgeone.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-rose-500 hover:bg-rose-50 transition-all group"
                      >
                        <span className="font-bold text-gray-700 group-hover:text-rose-600">BPR Report 2025-26</span>
                        <ExternalLink size={18} className="text-rose-600" />
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-rose-500 hover:bg-rose-50 transition-all group"
                      >
                        <span className="font-bold text-gray-700 group-hover:text-rose-600">BPR Report 2026-27</span>
                        <ExternalLink size={18} className="text-rose-600" />
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-rose-500 hover:bg-rose-50 transition-all group"
                      >
                        <span className="font-bold text-gray-700 group-hover:text-rose-600">BPR Report 2027-28</span>
                        <ExternalLink size={18} className="text-rose-600" />
                      </a>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                      <button 
                        onClick={() => setShowBPRModal(false)}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                      >
                        Back to Reports
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </section>

        <div className="max-w-4xl mx-auto space-y-12">
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

          {/* Forms Section Placeholder */}
          <section id="forms" className="bg-white rounded-2xl shadow-sm border border-gray-300 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ClipboardList className="text-[#E31837]" />
              Forms & Applications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "New BNPL Account Form",
                "Advance Customer Registration",
                "Bulk Booking Request",
                "Discount Approval Form"
              ].map((form, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-200 hover:border-[#E31837] transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700 group-hover:text-[#E31837]">{form}</span>
                    <Download size={16} className="text-gray-400 group-hover:text-[#E31837]" />
                  </div>
                </div>
              ))}
            </div>
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
