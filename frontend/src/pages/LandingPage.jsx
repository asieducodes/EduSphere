import { useState } from "react";
import { motion } from "framer-motion";
import AuthModal from "../components/auth/AuthModal";

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* Hero section — full-screen with image overlay */}
      <div className="relative h-screen flex flex-col">

        {/* Background image with reduced opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80')",
          }}
        />
        {/* Dark overlay — reduces image opacity as per design brief */}
        <div className="absolute inset-0 bg-primary-900/75" />

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">E</span>
            </div>
            <span className="text-white font-bold text-lg">EduSphere</span>
          </div>
          <button
            onClick={() => setShowAuth(true)}
            className="text-white text-sm font-medium border border-white/30 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
          >
            Sign In
          </button>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-gold-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              KNUST Students Only
            </span>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Find Your<br />
              <span className="text-gold-400">Study Circle</span><br />
              at KNUST
            </h1>
            <p className="text-white/75 text-base mb-8 leading-relaxed">
              Join course-specific study groups, share past questions, and
              discover the best study spots on campus — all in one place.
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAuth(true)}
              className="btn-gold text-center text-base shadow-lg shadow-gold-500/30"
            >
              Find Your Study Circle →
            </motion.button>
          </motion.div>
        </div>

        {/* Feature cards at bottom */}
        <div className="relative z-10 px-4 pb-8 grid grid-cols-3 gap-3">
          {[
            { icon: "🗺️", title: "Campus Map", desc: "Real-time study spots" },
            { icon: "🔐", title: "KNUST Only", desc: "@st.knust.edu.gh" },
            { icon: "📁", title: "Past Papers", desc: "Shared resources" },
          ].map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 text-center"
            >
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="text-white text-xs font-semibold">{f.title}</div>
              <div className="text-white/60 text-[10px] mt-0.5">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Auth modal */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
