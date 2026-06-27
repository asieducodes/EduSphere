import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Lock, FileText, ShieldAlert, Users, ArrowRight, MessageSquare } from "lucide-react";
import AuthModal from "../components/auth/AuthModal";

// ── Expanded Features with Sub-features & Grid Configuration ──
const FEATURES = [
  { 
    icon: MapPin,   
    title: "Campus Study Map",  
    desc: "Find open spots in real-time.",
    tag: "Live Now",
    gridClass: "col-span-3 sm:col-span-2 bg-gradient-to-br from-white/15 to-white/5" 
  },
  { 
    icon: FileText, 
    title: "Past Papers", 
    desc: "Share & download resources.",
    tag: "PDFs",
    gridClass: "col-span-3 sm:col-span-1 bg-white/10" 
  },
  { 
    icon: MessageSquare,   
    title: "Circle Chats",  
    desc: "Instant group chats for your exact courses.",
    tag: "Chat",
    gridClass: "col-span-3 sm:col-span-1 bg-white/10" 
  },
  { 
    icon: Lock,     
    title: "Verified Student Network",  
    desc: "Exclusively secured via @st.knust.edu.gh emails.",
    tag: "Secure",
    gridClass: "col-span-3 sm:col-span-2 bg-gradient-to-bl from-white/15 to-white/5" 
  },
];

// ── Animation Variants ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 120, damping: 14 } 
  },
};

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuth = (mode = "register") => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen overflow-y-auto overflow-x-hidden relative flex flex-col bg-[#0c1f6e] text-white selection:bg-[#f5c842]/30">
      
      {/* ── 🖼️ Live Production Background Image Element ── */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop')",
        }}
      />
      {/* Balanced dark mask overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1f6e]/85 via-[#0c1f6e]/60 to-[#0c1f6e]/95 pointer-events-none fixed" />

      {/* Main App Canvas */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-md mx-auto w-full border-x border-white/5 bg-[#0c1f6e]/30 backdrop-blur-[2px] shadow-2xl">
        
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 pt-10 pb-4 backdrop-blur-md sticky top-0 z-50 bg-[#0c1f6e]/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
              <span className="text-[#0c1f6e] font-black text-sm">E</span>
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight">EduSphere</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openAuth("login")}
            className="text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 bg-white/5 transition-all backdrop-blur-md shadow-inner"
          >
            Sign In
          </motion.button>
        </nav>

        {/* Hero Body */}
        <div className="flex-1 flex flex-col justify-center px-6 pt-6 pb-4">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col">
            
            {/* Institution Badge */}
            <motion.span variants={itemVariants} className="inline-flex items-center gap-1.5 text-[9px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider bg-gradient-to-r from-[#e8b020] to-[#f5c842] text-[#3d2800] w-fit shadow-md shadow-[#e8b020]/10">
              <ShieldAlert size={11} strokeWidth={2.5} />
              KNUST Campus Network
            </motion.span>

            <motion.h1 variants={itemVariants} className="font-black text-white leading-[1.1] mb-4 tracking-tight text-3xl sm:text-4xl drop-shadow-md">
              Unite Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5c842] to-[#fff6d1]">Study Circles</span><br />
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xs leading-relaxed mb-6 text-white/80 font-medium drop-shadow">
              Join course-specific peer networks, unlock crowdsourced past questions, and pinpoint optimized study locations across campus effortlessly.
            </motion.p>

            {/* Premium CTA Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => openAuth("register")}
              className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-xl bg-gradient-to-r from-[#e8b020] to-[#f5c842] text-[#3d2800] transition-all shadow-lg shadow-[#e8b020]/20 group"
            >
              <Users size={16} strokeWidth={2.5} />
              Get Started for Free
              <motion.div className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight size={14} strokeWidth={2.5} />
              </motion.div>
            </motion.button>

            {/* Social Proof Live Counter Banner */}
            <motion.div 
              variants={itemVariants} 
              className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-2 text-center bg-black/10 backdrop-blur-md rounded-xl py-3"
            >
              <div>
                <p className="text-[#f5c842] font-black text-sm tracking-tight">4,200+</p>
                <p className="text-white/50 text-[8px] font-bold uppercase tracking-wide">Students</p>
              </div>
              <div className="border-x border-white/10">
                <p className="text-[#f5c842] font-black text-sm tracking-tight">180+</p>
                <p className="text-white/50 text-[8px] font-bold uppercase tracking-wide">Study Groups</p>
              </div>
              <div>
                <p className="text-[#f5c842] font-black text-sm tracking-tight">95%</p>
                <p className="text-white/50 text-[8px] font-bold uppercase tracking-wide">Pass Rate</p>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Asymmetric Bento Layout */}
        {/* Asymmetric Bento Layout */}
        <div className="px-6 pb-8">
          <p className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-3 drop-shadow">
            Core Capabilities
          </p>
          
          <motion.div 
            className="grid grid-cols-3 gap-3"
            initial="hidden"
            whileInView="visible"
            // Triggers the animation when at least 15% of the bento section enters the viewport
            viewport={{ once: true, margin: "-15% 0px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08, // Cascades the entrance of each individual card
                }
              }
            }}
          >
            {FEATURES.map((f) => {
              const IconComponent = f.icon;
              return (
                <motion.div
                  key={f.title}
                  // Entrance Animation States
                  variants={{
                    hidden: { opacity: 0, y: 35, scale: 0.96 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { type: "spring", stiffness: 100, damping: 15 } 
                    }
                  }}
                  // Active Interactive Hover States
                  whileHover={{ 
                    y: -6, 
                    scale: 1.03, 
                    backgroundColor: "rgba(255,255,255,0.18)", 
                    borderColor: "rgba(255,255,255,0.35)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.25)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`${f.gridClass} group cursor-pointer rounded-xl p-4 border border-white/10 backdrop-blur-xl flex flex-col justify-between min-h-[120px] transition-all duration-300 shadow-lg`}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#f5c842] group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={18} strokeWidth={2} />
                    </div>
                    <span className="text-[8px] font-bold text-white/40 tracking-wider uppercase px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                      {f.tag}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-white font-bold text-xs tracking-tight">{f.title}</h3>
                    <p className="text-white/60 text-[10px] mt-0.5 leading-tight font-medium group-hover:text-white/80 transition-colors">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        {/* ── 🚀 Fixed Premium Footer Section ── */}
        <motion.footer 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-auto px-6 pb-8 pt-6 border-t border-white/10 text-center flex flex-col gap-3.5 bg-[#0c1f6e]/80 backdrop-blur-md relative"
        >
          {/* Status Indicator Row */}
          <div className="flex items-center justify-center gap-1.5 text-[9px] text-emerald-400 font-semibold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-full w-fit mx-auto border border-emerald-500/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span>All systems operational</span>
          </div>

          {/* Legal / Copyright Links */}
          <div className="flex items-center justify-center gap-3 text-[11px] text-white/40">
            <span>&copy; {new Date().getFullYear()} EduSphere.</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <a href="#privacy" className="hover:text-white/70 transition-colors">Privacy</a>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <a href="#terms" className="hover:text-white/70 transition-colors">Terms</a>
          </div>
        </motion.footer>

      </div>

      {/* Auth Modal Container */}
      <AnimatePresence>
        {showAuth && (
          <AuthModal defaultMode={authMode} onClose={() => setShowAuth(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}