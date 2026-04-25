import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ArrowRight, Activity, 
  Mic, AudioLines, Sparkles, Cpu, Link as LinkIcon, Lock, 
  TerminalSquare, Play, Phone, Star, Quote, Bot, Zap, Globe, CheckCircle
} from 'lucide-react';
import { ChatWidget } from './components/ChatWidget';

const WHATSAPP_NUMBER = "923265163629";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const USE_CASES = [
  { id: 1, title: 'Custom AI Agents', desc: 'Secure, fine-tuned conversational agents built on localized RAG pipelines to handle your proprietary data.', tech: ['LangChain', 'OpenAI', 'Pinecone'], icon: Bot },
  { id: 2, title: 'Workflow Automation', desc: 'Eliminate manual data entry. We connect your entire tech stack via intelligent triggers and robotic process automation.', tech: ['n8n', 'Make', 'Zapier'], icon: Zap },
  { id: 3, title: 'Web & Mobile Engineering', desc: 'Scalable, blazingly fast full-stack applications wrapped in enterprise-grade infrastructure.', tech: ['Next.js', 'React Native', 'AWS / Supabase'], icon: Globe },
  { id: 4, title: 'AI Voice Infrastructure', desc: 'Deploy low-latency voice bots for inbound triage and outbound sales directly integrated with your CRM.', tech: ['Twilio', 'Deepgram', 'Vapi'], icon: Mic }
];

const TESTIMONIALS = [
  { name: 'Sarah Rodriguez', role: 'CEO, TaskFlow USA', country: '🇺🇸', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', content: '"The mobile app they built has been a game-changer for our business. Clean UI, fast performance, and they handled the App Store submission seamlessly."', rating: 5 },
  { name: 'Ahmed Khan', role: 'Founder, StyleMart Pakistan', country: '🇵🇰', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=200&q=80', content: '"Our e-commerce website went from idea to launch in 3 weeks. The design is stunning and performance is excellent. We\'ve seen a 40% increase in online sales."', rating: 5 },
  { name: 'James Thompson', role: 'CTO, HealthLink UK', country: '🇬🇧', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', content: '"NexOra Labs delivered our AI chatbot in 3 weeks flat. The quality exceeded our expectations — it handles 80% of our queries autonomously."', rating: 5 },
  { name: 'Muhammad Usman', role: 'MD, TechVentures Lahore', country: '🇵🇰', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', content: '"Professional, responsive, and technically brilliant. They are our go-to engineering partners for complex integrations."', rating: 5 },
];


const CASE_STUDIES = [
  {
    title: "Enterprise CRM AI Automation",
    client: "Vanguard Tech Solutions",
    description: "Automated a massive inbound lead pipeline, saving 40+ hours a week for the sales team.",
    problem: "Sales representatives were spending 60% of their time manually categorizing inbound leads and entering data into Salesforce, leading to delayed follow-ups and lost revenue.",
    solution: "We deployed a custom LLM-powered routing agent that ingests emails, extracts key entities using GPT-4, and automatically scores and routes leads directly into Salesforce.",
    results: ["85% faster response time", "40+ hours saved weekly", "22% increase in conversion rate"]
  },
  {
    title: "Real-Time Telehealth Voice Agent",
    client: "CareConnect Health",
    description: "Built a HIPAA-compliant voice bot for patient triage and appointment scheduling.",
    problem: "Call centers were overwhelmed during peak hours, resulting in 30+ minute hold times and high patient drop-off rates.",
    solution: "Engineered an ultra-low latency voice AI using Vapi, Deepgram, and our proprietary RAG pipeline to handle patient intake, answer FAQs, and book appointments securely.",
    results: ["Zero hold times 24/7", "Over 10,000 appointments booked", "94% patient satisfaction score"]
  },
  {
    title: "AI Logistics Optimizer",
    client: "SwiftRoute Logistics",
    description: "Dynamic route optimization reducing fuel costs and delivery times by 30%.",
    problem: "Manual dispatching for 500+ vehicles was inefficient, leading to high fuel consumption and overlapping delivery routes.",
    solution: "Implemented a custom AI orchestration layer that processes real-time traffic, weather, and shipment priorities to generate optimal dispatch paths.",
    results: ["30% reduction in fuel costs", "15% faster deliveries", "Automated 90% of dispatching"]
  },
  {
    title: "Synthentic Market Intelligence",
    client: "Nexus Global Capital",
    description: "Processing millions of news signals daily to predict market sentiment with 92% accuracy.",
    problem: "Analysts were drowning in news data, making it impossible to capture real-time market shifts accurately.",
    solution: "Built a distributed RAG system that monitors global financial signals and generates contextual sentiment reports for trading desks.",
    results: ["92% sentiment accuracy", "Sub-second signal processing", "4x increase in analyst efficiency"]
  }
];

const Navbar = ({ activePage, setActivePage }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/[0.05] py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        <div className="text-2xl font-display font-bold tracking-tighter cursor-pointer flex items-center gap-3 relative z-20" onClick={() => setActivePage('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-blue to-neon-purple p-[1px]">
            <div className="w-full h-full bg-primary rounded-xl flex items-center justify-center">
              <AudioLines size={20} className="text-white" />
            </div>
          </div>
          <span className="text-white">NexOra <span className="text-neon-cyan">labs</span></span>
        </div>

        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div className="flex items-center gap-8 bg-white/[0.03] px-6 py-2 rounded-full border border-white/[0.05] pointer-events-auto backdrop-blur-md">
            <button onClick={() => setActivePage('home')} className={`text-sm font-medium transition-colors ${activePage === 'home' ? 'text-white' : 'text-text-muted hover:text-white'}`}>Home</button>
            <button onClick={() => setActivePage('use_cases')} className={`text-sm font-medium transition-colors ${activePage === 'use_cases' ? 'text-white' : 'text-text-muted hover:text-white'}`}>Services</button>
            <button onClick={() => setActivePage('about')} className={`text-sm font-medium transition-colors ${activePage === 'about' ? 'text-white' : 'text-text-muted hover:text-white'}`}>About Us</button>
          </div>
        </div>

        <div className="hidden md:flex relative z-20">
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Consult our Experts
          </a>
        </div>

        <button className="md:hidden text-white relative z-20" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-secondary border-b border-white/5 p-6 flex flex-col gap-4 shadow-2xl z-10"
          >
            {['home', 'use_cases', 'about'].map(item => (
              <button 
                key={item}
                onClick={() => { setActivePage(item); setIsOpen(false); }}
                className={`text-left text-lg font-medium p-2 rounded-lg ${activePage === item ? 'bg-white/5 text-white' : 'text-text-muted'}`}
              >
                {item.replace('_', ' ').charAt(0).toUpperCase() + item.replace('_', ' ').slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PageLoader = () => (
  <motion.div 
    key="loader"
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    className="pt-40 pb-32 min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden"
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-purple glow-bg opacity-10"></div>
    
    <div className="relative z-10 flex flex-col items-center">
      {/* Mini loading orb / soundwave */}
      <div className="flex items-center justify-center gap-1.5 h-12 w-12 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1.5 rounded-full bg-gradient-to-t from-neon-blue to-neon-purple animate-wave opacity-90" style={{ animationDelay: `${i * 0.15}s` }}></div>
        ))}
      </div>
      
      <div className="text-sm font-mono tracking-widest text-neon-cyan animate-pulse mb-6">SYNTHESIZING CONTEXT...</div>

      {/* Animated Data Progress Bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden shadow-[0_0_10px_rgba(6,182,212,0.2)]">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple"
        />
      </div>
    </div>
  </motion.div>
);

const VoiceOrb = () => (
  <div className="relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96">
    <div className="absolute inset-0 bg-neon-purple glow-bg opacity-40 animate-pulse"></div>
    <div className="absolute inset-4 bg-neon-blue glow-bg opacity-30 animate-ping"></div>
    
    <div className="w-56 h-56 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-white/[0.1] to-white/[0.02] border border-white/20 backdrop-blur-xl flex items-center justify-center relative overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.3)]">
      
      {/* Inner dark core */}
      <div className="absolute inset-2 md:inset-4 rounded-full bg-secondary/80 flex items-center justify-center border border-white/5 shadow-inner">
         {/* Soundwaves */}
         <div className="flex items-center justify-center gap-1.5 md:gap-2 h-16 md:h-24 w-full">
           {[...Array(7)].map((_, i) => (
             <div key={i} className="w-1.5 md:w-2 rounded-full bg-gradient-to-t from-neon-blue to-neon-cyan animate-wave opacity-80"></div>
           ))}
         </div>
      </div>
      
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-30"></div>
    </div>
  </div>
);

const HeroSection = () => (
  <section className="min-h-screen relative overflow-hidden flex items-center pt-32 pb-20">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-purple glow-bg translate-x-1/3 -translate-y-1/3"></div>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-blue glow-bg -translate-x-1/3 translate-y-1/3"></div>

    <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 mb-8 backdrop-blur-md">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-xs font-medium text-white tracking-wider">Available for New Projects</span>
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.05]">
          AI Solutions for <br />
          <span className="text-neon-gradient">Ambitious Firms.</span>
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-text-muted mb-10 max-w-xl leading-relaxed">
          We engineer bespoke AI agents, workflow automations, and scalable web platforms designed to 10x your operational speed.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Consult an Engineer <ArrowRight className="w-5 h-5" />
          </a>
          <button className="bg-white/[0.05] border border-white/10 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/[0.1] transition-colors backdrop-blur-md">
             View Our Services
          </button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 1 }} className="flex justify-center relative">
        <VoiceOrb />
        
        {/* Floating Stat Cards near the orb */}
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-4 md:-left-12 top-1/4 glass-card p-4 rounded-2xl z-20">
          <div className="text-[10px] text-text-muted mb-1 font-mono tracking-wider">LLM MODELS</div>
          <div className="text-lg md:text-xl font-bold text-white flex items-center gap-2"><Cpu size={18} className="text-neon-blue"/> GPT-4 & Claude 3</div>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -right-4 md:-right-8 bottom-1/4 glass-card p-4 rounded-2xl z-20">
          <div className="text-[10px] text-text-muted mb-1 font-mono tracking-wider">ARCHITECTURE</div>
          <div className="text-lg md:text-xl font-bold text-white flex items-center gap-2"><Sparkles size={18} className="text-neon-purple"/> Scalable Edge</div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const FeaturesGrid = () => (
  <section className="py-32 relative">
    <div className="container mx-auto px-6 relative z-10">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tighter">Engineered for <br/> <span className="text-gradient">Real Business Impact.</span></h2>
        <p className="text-xl text-text-muted max-w-2xl">Stop relying on fragmented agencies. We provide end-to-end technical execution—from data ingestion to user interface.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card rounded-[2rem] p-10 md:col-span-2 relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-neon-blue glow-bg group-hover:opacity-60 transition-opacity opacity-20"></div>
          <TerminalSquare className="w-12 h-12 mb-8 text-neon-blue" />
          <h3 className="text-3xl font-bold mb-4">Architecture & Strategy</h3>
          <p className="text-text-muted max-w-md text-lg">We map out your manual constraints and design an unshakeable, future-proof technical architecture utilizing native APIs and cloud computing.</p>
        </div>
        
        <div className="glass-card rounded-[2rem] p-10 relative overflow-hidden group flex flex-col justify-between">
          <div>
              <Lock className="w-12 h-12 mb-8 text-neon-cyan" />
              <h3 className="text-2xl font-bold mb-4">Enterprise Security</h3>
          </div>
          <p className="text-text-muted text-lg">SOC2 standards. Data remains encrypted on entirely isolated server blocks.</p>
        </div>

        <div className="glass-card rounded-[2rem] p-10 relative overflow-hidden group flex flex-col justify-between">
          <div>
             <Cpu className="w-12 h-12 mb-8 text-neon-purple" />
             <h3 className="text-2xl font-bold mb-4">LLM Integration</h3>
          </div>
          <p className="text-text-muted text-lg">Proprietary logic wiring utilizing GPT-4, Claude, or fine-tuned open-weight models.</p>
        </div>

        <div className="glass-card rounded-[2rem] p-10 md:col-span-2 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-64 h-64 bg-neon-purple glow-bg opacity-10 group-hover:opacity-40 transition-opacity"></div>
          <LinkIcon className="w-12 h-12 mb-8 text-white" />
          <h3 className="text-3xl font-bold mb-4">Deep Software Engineering</h3>
          <p className="text-text-muted max-w-md text-lg">Whether it's an internal React dashboard or a consumer-facing Next.js platform, we push robust, scalable, componentized code.</p>
        </div>
      </div>
    </div>
  </section>
);

const UseCasesScroll = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.01]"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6">Our <span className="text-neon-gradient">Capabilities.</span></h2>
                    <p className="text-xl text-text-muted">From deep automation integration to robust mobile app builds, our engineers map solutions directly to your growth trajectory.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {USE_CASES.map((uc, i) => {
                        const Icon = uc.icon;
                        return (
                        <div key={i} className="glass-card p-10 rounded-3xl group cursor-pointer hover:-translate-y-1 transition-transform relative overflow-hidden">
                            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-neon-cyan glow-bg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-neon-blue/20 group-hover:scale-110 transition-all duration-500 shrink-0">
                                       <Icon size={28} className="text-neon-cyan group-hover:text-neon-blue transition-colors group-hover:animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-neon-blue transition-colors pr-4">{uc.title}</h3>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-neon-blue/20 transition-colors shrink-0 mt-1 md:mt-0 hidden sm:flex">
                                    <ArrowRight size={20} className="text-white group-hover:translate-x-1 transition-transform"/>
                                </div>
                            </div>
                            <p className="text-text-muted mb-10 text-lg leading-relaxed relative z-10">{uc.desc}</p>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {uc.tech.map(t => (
                                    <span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/70 tracking-wide">{t}</span>
                                ))}
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </section>
    );
}

const CaseStudiesSection = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 w-[800px] h-[800px] bg-neon-cyan glow-bg -translate-y-1/2 opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6">Execution <span className="text-neon-gradient">Excellence.</span></h2>
            <p className="text-xl text-text-muted">A closer look at how we deploy robust engineering to solve complex operational bottlenecks.</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <ArrowRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer group shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CASE_STUDIES.map((study, i) => (
            <div 
              key={i} 
              className="min-w-[90%] md:min-w-[600px] lg:min-w-[800px] snap-center"
            >
              <div className="glass-card p-8 md:p-12 rounded-[2.5rem] relative flex flex-col h-full border border-white/5 shadow-2xl">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-20">
                  <Activity size={48} className="text-neon-cyan" />
                </div>
                
                <div className="mb-10">
                  <p className="text-neon-cyan font-mono text-xs tracking-widest uppercase mb-4">{study.client}</p>
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 pr-12 leading-[1.1]">{study.title}</h3>
                  <p className="text-xl text-text-muted italic border-l-2 border-white/10 pl-6 py-1 leading-relaxed">"{study.description}"</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-auto">
                  <div className="space-y-6">
                    <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/[0.05]">
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2 tracking-wide uppercase text-[10px] sm:text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div> 
                          The Problem
                      </h4>
                      <p className="text-white/70 text-sm leading-relaxed">{study.problem}</p>
                    </div>
                    <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/[0.05]">
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2 tracking-wide uppercase text-[10px] sm:text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div> 
                          The Solution
                      </h4>
                      <p className="text-white/70 text-sm leading-relaxed">{study.solution}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/[0.05] flex flex-col justify-center">
                    <h4 className="text-white font-bold mb-6 flex items-center gap-2 tracking-wide uppercase text-[10px] sm:text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-purple shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div> 
                        Measurable Results
                    </h4>
                    <ul className="space-y-4">
                      {study.results.map((res, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-base text-text-muted">
                          <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center shrink-0">
                            <CheckCircle size={18} className="text-neon-purple" />
                          </div>
                          <span className="text-white/90 font-medium">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => (
  <section className="py-32 relative overflow-hidden">
    <div className="absolute right-0 top-1/2 w-[800px] h-[800px] bg-neon-blue glow-bg -translate-y-1/2 opacity-20"></div>
    <div className="container mx-auto px-6 relative z-10">
      <h2 className="text-5xl lg:text-6xl font-bold tracking-tighter text-center mb-20">Don't just take <br/><span className="text-gradient">our word for it.</span></h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="glass-card p-8 rounded-3xl relative">
            <Quote className="absolute top-8 right-8 text-white/5" size={40} />
            <div className="flex items-center gap-4 mb-8">
              <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
              <div>
                 <h4 className="font-bold text-white">{t.name}</h4>
                 <p className="text-xs tracking-wider text-text-muted uppercase mt-0.5">{t.role}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-6">
              {[...Array(t.rating)].map((_, idx) => <Star key={idx} size={14} className="fill-neon-purple text-neon-purple" />)}
            </div>
            <p className="text-base leading-relaxed text-white/80">{t.content}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CallToAction = () => (
  <section className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-purple/10"></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="glass-card rounded-[3rem] p-12 md:p-24 text-center max-w-5xl mx-auto border-white/10 shadow-[0_0_100px_rgba(139,92,246,0.15)] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent blur-2xl"></div>
        <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">Ready to <br/><span className="text-neon-gradient">scale your operations?</span></h2>
            <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto">Deploy software and AI agents that act fast, eliminate manual overhead, and integrate flawlessly into your existing ecosystem.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Chat with an Engineer
            </a>
            <button className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-colors backdrop-blur-md">
                View Documentation
            </button>
            </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-secondary pt-20 pb-10 border-t border-white/5 relative z-10">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 border-b border-white/5 pb-16">
        <div className="md:col-span-2">
          <div className="text-2xl font-display font-bold tracking-tighter mb-6 flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-blue to-neon-purple p-[1px]">
                <div className="w-full h-full bg-primary rounded-lg flex items-center justify-center">
                <AudioLines size={14} className="text-white" />
                </div>
            </div>
            <span className="text-white">NexOra <span className="text-neon-cyan">labs</span></span>
          </div>
          <p className="text-text-muted leading-relaxed max-w-md">Engineering the standard for intelligent automation, artificial intelligence, and scalable web infrastructure.</p>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Services</h4>
          <ul className="space-y-4 text-text-muted text-sm border-l border-white/5 pl-4">
            <li><a href="#" className="hover:text-white transition-colors">AI Agents</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Workflow Automation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mobile Platforms</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Connect</h4>
          <ul className="space-y-4 text-text-muted text-sm border-l border-white/5 pl-4">
            <li><a href={WHATSAPP_LINK} className="hover:text-neon-cyan transition-colors">WhatsApp</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-text-muted text-sm">
        <p>© 2024 NexOra labs. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = (page: string) => {
    if (page === activePage || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActivePage(page);
      setIsTransitioning(false);
    }, 800); // Simulate AI processing delay for branded loader
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar activePage={activePage} setActivePage={handleNavigate} />
      
      <AnimatePresence mode="wait">
        {isTransitioning ? (
          <PageLoader />
        ) : (
          <>
            {activePage === 'home' && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <HeroSection />
                <FeaturesGrid />
                <CaseStudiesSection />
                <TestimonialsSection />
                <CallToAction />
              </motion.div>
            )}
            
            {activePage === 'use_cases' && (
              <motion.div key="use_cases" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="pt-20"><UseCasesScroll /></div>
              </motion.div>
            )}

            {activePage === 'about' && (
              <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32 min-h-[80vh] flex items-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan glow-bg opacity-10"></div>
                <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
                    <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter">The Team Behind <br/><span className="text-neon-gradient">The Engine.</span></h1>
                    <p className="text-2xl text-text-muted leading-relaxed">We are advanced AI researchers and ML engineers obsessed with driving human-level latency in synthetic voice generation.</p>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
      
      <Footer />
      <ChatWidget />
    </div>
  );
}
