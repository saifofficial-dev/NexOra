import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Cpu, 
  Workflow, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Clock, 
  HeartHandshake,
  Menu,
  X,
  Linkedin,
  Github,
  Instagram,
  ChevronRight,
  MessageSquare,
  Globe,
  Zap,
  Star,
  Quote,
  Send,
  Phone,
  ArrowLeft
} from 'lucide-react';

const WHATSAPP_NUMBER = "923265163629";
const WHATSAPP_DISPLAY = "+92 326 5163629";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// --- Types ---
type Service = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: any;
  packages: {
    name: string;
    usd: string;
    pkr: string;
    features: string[];
  }[];
  techStack: string[];
};

// --- Mock Data ---
const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Engineering',
    description: 'Custom, high-performance web applications built for scale.',
    longDescription: 'We build scalable, secure, and blazingly fast web applications using enterprise-grade technologies like Next.js and React.',
    icon: Code2,
    techStack: ['Next.js', 'React', 'Node.js', 'Tailwind', 'PostgreSQL'],
    packages: [
      { name: 'Starter', usd: '$300', pkr: 'PKR 85,000', features: ['5-page site', 'Responsive', 'Basic SEO'] },
      { name: 'Business', usd: '$800', pkr: 'PKR 2,25,000', features: ['10-page site', 'CMS', 'Contact forms', 'Animations'] },
      { name: 'Enterprise', usd: '$2,000+', pkr: 'PKR 5,60,000+', features: ['Full web app', 'Auth', 'Database', 'API Integrations'] },
    ]
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    description: 'Business process automation and deep system integrations.',
    longDescription: 'Automate repetitive tasks and streamline your operations with custom workflows connecting your entire tech stack.',
    icon: Workflow,
    techStack: ['n8n', 'Make', 'Zapier', 'Python', 'Webhooks'],
    packages: [
      { name: 'Basic Flow', usd: '$200', pkr: 'PKR 56,000', features: ['1–3 workflows', 'Basic triggers', 'Email alerts'] },
      { name: 'Business Suite', usd: '$600', pkr: 'PKR 1,68,000', features: ['Up to 10 workflows', 'CRM integration', 'Monitoring'] },
      { name: 'Enterprise', usd: '$1,500+', pkr: 'PKR 4,20,000+', features: ['Unlimited flows', 'Custom dashboards', '24/7 Monitoring'] },
    ]
  },
  {
    id: 'ai-agents',
    title: 'AI Native Systems',
    description: 'Custom AI chatbots and autonomous LLM-powered agents.',
    longDescription: 'Leverage the power of Generative AI to create intelligent agents that handle support, scale sales, and analyze massive datasets.',
    icon: Cpu,
    techStack: ['OpenAI', 'Claude', 'LangChain', 'Python', 'Vector DBs'],
    packages: [
      { name: 'Basic Agent', usd: '$400', pkr: 'PKR 1,12,000', features: ['1 Chatbot', 'Single platform', 'Knowledge base'] },
      { name: 'Multi-Agent', usd: '$1,200', pkr: 'PKR 3,36,000', features: ['3 Agents', 'RAG integration', 'API access'] },
      { name: 'Enterprise AI', usd: '$3,000+', pkr: 'PKR 8,40,000+', features: ['Full AI system', 'Fine-tuning', 'Analytics'] },
    ]
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Applications',
    description: 'Cross-platform and native mobile experiences.',
    longDescription: 'Reach your customers on the go with high-quality, pixel-perfect iOS and Android applications.',
    icon: Smartphone,
    techStack: ['React Native', 'Flutter', 'Swift', 'Firebase'],
    packages: [
      { name: 'MVP App', usd: '$1,000', pkr: 'PKR 2,80,000', features: ['Core features', '2 platforms', 'Basic UI'] },
      { name: 'Growth App', usd: '$2,500', pkr: 'PKR 7,00,000', features: ['Full features', 'Auth', 'Payments'] },
      { name: 'Enterprise App', usd: '$5,000+', pkr: 'PKR 14,00,000+', features: ['Custom backend', 'Admin panel', 'Scaling'] },
    ]
  }
];

const CASE_STUDIES = [
  { id: 1, title: 'Global Logistics Optimizer AI', category: 'AI Agents', desc: 'Dynamic routing agent reducing fleet fuel consumption by 18% annually.', image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663e0?auto=format&fit=crop&w=1200&q=80', tech: ['Python', 'OpenAI', 'AWS'], client: 'LogisTech Global', timeline: '4 Months', challenge: 'The client faced soaring fuel costs and delayed deliveries due to manual, static routing across a fleet of 500+ vehicles. Changing traffic conditions and weather were causing constant supply chain bottlenecks.', solution: 'We developed an autonomous AI routing agent ingesting real-time traffic, weather, and fleet telemetry data to dynamically re-route vehicles. A custom LLM interface allows dispatchers to query logistics scenarios instantly.', results: ['18% reduction in annual fuel consumption', '2x faster routing generation', 'Saved $1.2M in operational costs in first year'] },
  { id: 2, title: 'Fintech Neo-Bank Platform', category: 'Web & Mobile', desc: 'Secure, scalable banking portal handling $2M+ daily transactions.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80', tech: ['React Native', 'Node.js', 'PostgreSQL'], client: 'Apex Finance', timeline: '8 Months', challenge: 'A legacy regional bank needed to transition an older demographic to a digital-first neo-banking platform without alienating them, while adhering to strict financial compliance standards.', solution: 'Engineered a highly secure, scalable architecture utilizing Node.js microservices and a pixel-perfect React Native mobile app. Integrated Plaid for banking connectivity and implemented zero-trust security measures.', results: ['Zero downtime during migration', '$2M+ daily transaction volume processed', '4.8/5 App Store rating'] },
  { id: 3, title: 'Enterprise Support Automation', category: 'Automation', desc: 'Multi-channel ticketing automation resolving 40% of queries instantly.', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80', tech: ['n8n', 'LangChain', 'Zendesk'], client: 'Luminex', timeline: '2 Months', challenge: 'The support team was overwhelmed managing 10,000+ monthly tickets across email, WhatsApp, and Intercom, resulting in a 48-hour average response time.', solution: 'Built an advanced n8n workflow connecting Zendesk with a specialized LLM via LangChain. The system automatically categorizes, prioritizes, and drafts responses for L1 support queries.', results: ['40% of tickets resolved autonomously', 'Average response time reduced to 5 mins', 'CSAT score increased by 35%'] },
  { id: 4, title: 'Corporate Real Estate SaaS', category: 'Web Dev', desc: 'Property management dashboard serving 500+ commercial agents.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', tech: ['Next.js', 'PostgreSQL'], client: 'Crescent Holdings', timeline: '5 Months', challenge: 'Existing property management solutions were fragmented. The client needed a unified dashboard for brokers to track leads, manage high-value asset portfolios, and generate contracts.', solution: 'Developed a blazingly fast Next.js web application utilizing a robust PostgreSQL database. Created an interactive, real-time analytics dashboard and automated PDF contract generation.', results: ['Onboarded 500+ commercial agents', 'Reduced time-to-lease by 15 days', 'Centralized $500M+ in asset profiles'] },
  { id: 5, title: 'Healthcare Patient Portal App', category: 'Mobile Dev', desc: 'HIPAA-compliant cross-platform booking and telemedicine app.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80', tech: ['Flutter', 'Supabase'], client: 'Medix Health', timeline: '6 Months', challenge: 'Patients lacked a secure, easy-to-use platform for booking appointments, viewing test results, and consulting with doctors remotely.', solution: 'Created a HIPAA-compliant Flutter mobile app with Supabase providing secure authentication and real-time database capabilities. Integrated a WebRTC module for smooth telemedicine video calls.', results: ['80% patient adoption rate in 3 months', 'Reduced no-show appointments by 25%', 'Handled 5,000+ tele-consults in Q1'] },
  { id: 6, title: 'Smart Retail Inventory AI', category: 'AI Agents', desc: 'Predictive inventory system reducing overstock by 25%.', image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80', tech: ['LangChain', 'Pinecone'], client: 'StyleCart National', timeline: '3 Months', challenge: 'The retailer struggled with inventory fragmentation—popular items sold out quickly while dead stock accumulated, leading to heavy markdowns and lost revenue.', solution: 'Deployed a LangChain agent hooked up to a Pinecone vector database of historical sales data. The AI agent analyzes purchasing trends and automatically generates predictive restocking orders.', results: ['Reduced dead stock by 25%', 'Boosted peak-season revenue by 12%', 'Automated 70% of purchase orders'] },
];

const TESTIMONIALS = [
  { name: 'Sarah Rodriguez', role: 'CEO, TaskFlow USA', country: '🇺🇸', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', content: '"The mobile app they built has been a game-changer for our business. Clean UI, fast performance, and they handled the App Store submission seamlessly."', rating: 5 },
  { name: 'Ahmed Khan', role: 'Founder, StyleMart Pakistan', country: '🇵🇰', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=200&q=80', content: '"Our e-commerce website went from idea to launch in 3 weeks. The design is stunning and performance is excellent. We\'ve seen a 40% increase in online sales."', rating: 5 },
  { name: 'James Thompson', role: 'CTO, HealthLink UK', country: '🇬🇧', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', content: '"NexOra Labs delivered our AI chatbot in 3 weeks flat. The quality exceeded our expectations — it handles 80% of our customer queries automatically. Incredible team."', rating: 5 },
  { name: 'Muhammad Usman', role: 'MD, TechVentures Lahore', country: '🇵🇰', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', content: '"Professional, responsive, and technically brilliant. NexOra Labs is our go-to tech partner for all projects. They consistently deliver beyond expectations."', rating: 5 },
];

// --- Components ---

const Navbar = ({ activePage, setActivePage }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Work' },
    { id: 'about', label: 'About' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-display font-extrabold tracking-tighter cursor-pointer flex items-center gap-2" onClick={() => setActivePage('home')}>
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
            <Zap size={18} />
          </div>
          NexOra
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`text-sm font-medium transition-colors ${activePage === item.id ? 'text-black font-semibold' : 'text-text-muted hover:text-black'}`}
            >
              {item.label}
            </button>
          ))}
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform flex items-center gap-2">
            Let's Talk <ArrowRight size={16} />
          </a>
        </div>

        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-border p-6 flex flex-col gap-4 shadow-xl"
          >
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => { setActivePage(item.id); setIsOpen(false); }}
                className={`text-left text-lg font-medium p-2 rounded-lg ${activePage === item.id ? 'bg-gray-100 text-black' : 'text-text-muted'}`}
              >
                {item.label}
              </button>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-black text-white text-center p-3 rounded-lg font-medium mt-2">
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSection = ({ setActivePage }: any) => (
  <section className="min-h-screen pt-40 pb-20 flex items-center relative overflow-hidden bg-white">
    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-border mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono font-medium text-black uppercase tracking-wider">Available for new projects</span>
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[1.05] tracking-tighter mb-6 text-black">
          Digital <br />
          <span className="text-text-muted italic">Infrastructure</span> <br />
          For Scale.
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl md:text-2xl text-text-muted mb-10 max-w-xl leading-relaxed">
          An elite AI and Web Engineering agency crafting industry-defining platforms for ambitious businesses globally.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-4">
          <button onClick={() => setActivePage('services')} className="group bg-black text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-all">
            Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="group bg-white border border-border text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-50 transition-all">
            Contact Us <Phone className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative hidden lg:block h-full min-h-[600px] perspective-1000"
        >
            <div className="absolute inset-0 z-10 rounded-[2rem] overflow-hidden border border-border premium-shadow group preserve-3d transition-transform duration-700 ease-out hover:rotate-y-12">
                <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" 
                    alt="Code on screen" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 z-20 transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="glass-dark rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                 <Cpu className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-xs font-mono text-white/50 mb-1">SYSTEM.STATUS</div>
                                <div className="font-bold text-sm tracking-wide text-white">LLM Agents Online</div>
                            </div>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-white" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, repeat: Infinity }} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
  </section>
);

const StatsBar = () => (
  <div className="border-y border-border bg-white py-12">
    <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { val: '50+', label: 'Projects Delivered' },
        { val: '10+', label: 'Countries Reached' },
        { val: '99%', label: 'Client Satisfaction' },
        { val: '24/7', label: 'Active Support' },
      ].map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-4xl md:text-5xl font-display font-extrabold text-black mb-2">{stat.val}</div>
          <div className="text-sm font-medium text-text-muted uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const HomeServices = ({ setActivePage }: any) => (
  <section className="py-32 bg-secondary">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-display font-extrabold tracking-tighter mb-6">Capabilities</h2>
          <p className="text-xl text-text-muted leading-relaxed">End-to-end engineering mapped to your growth trajectory. We don't just build software, we architect businesses.</p>
        </div>
        <button onClick={() => setActivePage('services')} className="group flex items-center gap-2 font-bold text-black border-b border-black pb-1 hover:pr-4 transition-all">
          View Detailed Packages <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((s, i) => (
          <div key={i} className="bg-white border border-border rounded-[2rem] p-8 card-hover flex flex-col items-start cursor-pointer group" onClick={() => setActivePage('services')}>
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform">
              <s.icon strokeWidth={1.5} size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
            <p className="text-text-muted mb-8 leading-relaxed">{s.description}</p>
            <div className="mt-auto flex flex-wrap gap-2">
              {s.techStack.slice(0,2).map(t => <span key={t} className="text-[10px] font-mono bg-gray-100 text-black px-2 py-1 rounded">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-32 bg-white border-t border-border">
    <div className="container mx-auto px-6">
      <h2 className="text-5xl font-display font-extrabold tracking-tighter text-center mb-20">What Clients Say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-white border border-border p-8 rounded-3xl relative card-hover">
            <Quote className="absolute top-8 right-8 text-gray-200" size={40} />
            <div className="flex items-center gap-4 mb-6">
              <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border border-border" referrerPolicy="no-referrer" />
              <div>
                 <h4 className="font-bold text-lg">{t.name}</h4>
                 <p className="text-sm text-text-muted">{t.role} {t.country}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-6">
              {[...Array(t.rating)].map((_, idx) => <Star key={idx} size={16} className="fill-black text-black" />)}
            </div>
            <p className="text-lg leading-relaxed text-black font-medium">{t.content}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="py-32 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-5xl font-display font-extrabold tracking-tighter mb-6">How We Build</h2>
        <p className="text-xl text-text-muted">A streamlined, transparent process designed for speed and quality.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-12 relative">
        <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-border z-0" />
        {[
          { icon: MessageSquare, title: '1. Discovery', desc: 'Deep dive into your business goals and technical requirements.' },
          { icon: Workflow, title: '2. Architecture', desc: 'System design, database modeling, and technical planning.' },
          { icon: Code2, title: '3. Execution', desc: 'Agile development with weekly sprints and transparent updates.' },
          { icon: Zap, title: '4. Deployment', desc: 'Rigorous testing followed by seamless production launch.' },
        ].map((step, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white border-2 border-black rounded-full flex items-center justify-center text-black mb-8 shadow-xl">
              <step.icon size={32} />
            </div>
            <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
            <p className="text-text-muted leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HomePage = ({ setActivePage }: any) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <HeroSection setActivePage={setActivePage} />
    <StatsBar />
    <HomeServices setActivePage={setActivePage} />
    
    <section className="py-32 bg-white border-t border-border">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <h2 className="text-5xl font-display font-extrabold tracking-tighter mb-6">Why Choose NexOra?</h2>
          <p className="text-xl text-text-muted mb-12">We combine Silicon Valley engineering standards with disruptive execution speed. Your dedicated technical partners.</p>
          <div className="space-y-8">
            {[
              { icon: Users, title: 'Elite Talent', desc: 'Vetted engineers with deep expertise in modern tech stacks.' },
              { icon: Clock, title: 'Rapid Execution', desc: 'Ship functional products in weeks, not months.' },
              { icon: HeartHandshake, title: 'Strategic Partner', desc: 'We don\'t just build, we advise on scalable architecture and ROI.' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="w-14 h-14 shrink-0 bg-gray-100 rounded-2xl flex items-center justify-center text-black border border-border">
                  <item.icon />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                  <p className="text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 relative w-full h-[600px]">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="pt-12">
              <div className="h-full rounded-3xl border border-border p-8 flex flex-col justify-end relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 grayscale" referrerPolicy="no-referrer" alt="Data" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h4 className="text-2xl font-display font-bold relative z-10 text-white">Data Driven</h4>
                <p className="text-sm font-medium text-gray-300 relative z-10 mt-2">Precision Analytics</p>
              </div>
            </div>
            <div>
              <div className="h-full bg-black rounded-3xl p-8 flex flex-col justify-end text-white relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700 mix-blend-overlay grayscale" referrerPolicy="no-referrer" alt="AI" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <h4 className="text-2xl font-display font-bold relative z-10 text-white">AI Native</h4>
                <p className="text-sm font-medium text-gray-300 relative z-10 mt-2">LLM Specialists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ProcessSection />
    <Testimonials />

    <section className="py-32 container mx-auto px-6">
      <div className="bg-black rounded-[3rem] p-12 lg:p-24 text-center overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full" />
        <h2 className="text-5xl lg:text-7xl font-display font-extrabold text-white mb-8 tracking-tighter relative z-10">Start Building<br />What's Next.</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-xl relative z-10">Stop thinking about "What if". Book your free consultation call today and let's architect your vision.</p>
        <div className="flex flex-wrap justify-center gap-6 relative z-10">
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl">
            Let's Talk <ArrowRight size={20} />
          </a>
          <button onClick={() => setActivePage('services')} className="bg-white/10 text-white px-10 py-5 rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-md">
            View Pricing
          </button>
        </div>
      </div>
    </section>
  </motion.div>
);

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32 bg-secondary/50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-20 max-w-3xl">
          <h1 className="text-6xl lg:text-8xl font-display font-extrabold tracking-tighter mb-8 text-black">Our <br /><span className="text-text-muted italic">Expertise</span></h1>
          <p className="text-text-muted text-2xl leading-relaxed">Detailed packages and technical capabilities across our primary domains. Select a tier that matches your current scale.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-4 flex flex-col gap-4">
            {SERVICES.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedService(s)}
                className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between group ${selectedService.id === s.id ? 'bg-black border-black text-white shadow-2xl' : 'bg-white border-border text-black hover:border-black/30'}`}
              >
                <div className="flex items-center gap-4">
                  <s.icon className={selectedService.id === s.id ? 'text-white' : 'text-black'} size={24} />
                  <span className="font-bold text-lg">{s.title}</span>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${selectedService.id === s.id ? 'translate-x-0 text-white' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
              </button>
            ))}
          </div>
          
          <div className="lg:col-span-8 bg-white border border-border rounded-[3rem] p-8 lg:p-14 relative overflow-hidden shadow-xl">
            <div className="h-64 mb-10 rounded-2xl overflow-hidden relative border border-border hidden md:block">
              <img 
                src={
                  selectedService.id === 'web-dev' ? 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80' : 
                  selectedService.id === 'automation' ? 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' :
                  selectedService.id === 'ai-agents' ? 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80' :
                  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80'
                } 
                alt={selectedService.title}
                className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-1000 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <h2 className="absolute bottom-8 left-8 text-5xl font-display font-extrabold tracking-tighter flex items-center gap-4 text-white">
                <selectedService.icon size={48} className="text-white" />
                {selectedService.title}
              </h2>
            </div>

            <h2 className="text-4xl font-display font-bold tracking-tighter mb-6 flex items-center gap-4 md:hidden text-black">
              <selectedService.icon size={32} className="text-black" />
              {selectedService.title}
            </h2>

            <p className="text-text-muted mb-16 text-xl leading-relaxed max-w-3xl">{selectedService.longDescription}</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {selectedService.packages.map((pkg, idx) => (
                <div key={idx} className="bg-secondary border border-border rounded-3xl p-8 hover:border-black transition-colors group">
                  <div className="text-xs font-mono font-bold uppercase mb-4 tracking-wider text-text-muted">{pkg.name}</div>
                  <div className="text-4xl font-display font-bold mb-2 text-black">{pkg.usd}</div>
                  <div className="text-[11px] font-medium text-text-muted uppercase tracking-widest mb-8">{pkg.pkr}</div>
                  <div className="w-full h-[1px] bg-border mb-8 group-hover:bg-black/10 transition-colors" />
                  <ul className="space-y-4">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-medium">
                        <CheckCircle2 size={18} className="text-black shrink-0 mt-0.5" />
                        <span className="text-text-main">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="w-full mt-10 border border-black text-black py-3 rounded-full font-bold hover:bg-black hover:text-white transition-colors text-sm flex justify-center">
                    Select Plan
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioPage = () => {
  const [selectedStudy, setSelectedStudy] = useState<any>(null);

  if (selectedStudy) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-32 pb-32 bg-white min-h-screen">
        <div className="container mx-auto px-6 max-w-5xl">
          <button 
            onClick={() => setSelectedStudy(null)}
            className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-black transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Work
          </button>

          <div className="relative h-[400px] md:h-[500px] w-full rounded-[2rem] overflow-hidden mb-16 border border-border mt-8">
            <img src={selectedStudy.image} alt={selectedStudy.title} className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <div className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider w-fit mb-4 border border-white/30">
                {selectedStudy.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tighter">{selectedStudy.title}</h1>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2 space-y-12">
              <section>
                <h2 className="text-3xl font-display font-extrabold tracking-tighter mb-6 relative inline-block">
                  The Challenge
                  <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-black rounded-full" />
                </h2>
                <p className="text-lg text-text-muted leading-relaxed">{selectedStudy.challenge}</p>
              </section>
              
              <section>
                <h2 className="text-3xl font-display font-extrabold tracking-tighter mb-6 relative inline-block">
                  Our Solution
                  <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-black rounded-full" />
                </h2>
                <p className="text-lg text-text-muted leading-relaxed">{selectedStudy.solution}</p>
              </section>
              
              <section>
                <h2 className="text-3xl font-display font-extrabold tracking-tighter mb-6 relative inline-block">
                  Key Results
                  <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-black rounded-full" />
                </h2>
                <ul className="space-y-4">
                  {selectedStudy.results.map((r: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shrink-0 mt-1">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-lg font-medium text-black">{r}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-secondary p-8 rounded-3xl border border-border">
                <h3 className="font-bold text-sm uppercase tracking-widest text-text-muted mb-4">Client Overview</h3>
                <p className="text-xl font-bold text-black mb-1">{selectedStudy.client}</p>
                <p className="text-sm font-medium text-text-muted">{selectedStudy.timeline} Engagement</p>
              </div>

              <div className="bg-secondary p-8 rounded-3xl border border-border">
                <h3 className="font-bold text-sm uppercase tracking-widest text-text-muted mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStudy.tech.map((t: string) => (
                    <span key={t} className="text-sm font-mono font-medium border border-border bg-white text-text-main px-3 py-1.5 rounded-lg">{t}</span>
                  ))}
                </div>
              </div>

              <div className="bg-black p-8 rounded-3xl text-white text-center">
                <h3 className="font-display font-bold text-xl mb-4">Ready to scale your systems?</h3>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-white text-black w-full py-3 rounded-full font-bold inline-block hover:scale-105 transition-transform text-sm">
                  Let's Talk
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="mb-20 max-w-3xl">
          <h1 className="text-6xl lg:text-8xl font-display font-extrabold tracking-tighter mb-8 text-black">Selected <br/><span className="text-text-muted italic">Work</span></h1>
          <p className="text-xl text-text-muted leading-relaxed">Proof of work. Explore our real-world implementations across enterprise automation, AI, and scalable web infrastructure.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {CASE_STUDIES.map((proj, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                key={proj.id} 
                onClick={() => setSelectedStudy(proj)}
                className="group cursor-pointer rounded-[2rem] border border-border overflow-hidden bg-secondary flex flex-col hover:border-black hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden border-b border-border">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {proj.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{proj.title}</h3>
                  <p className="text-text-muted text-sm mb-8 leading-relaxed line-clamp-3">{proj.desc}</p>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-8">
                      {proj.tech.map(t => <span key={t} className="text-[10px] font-mono font-medium border border-border bg-white text-text-main px-2 py-1 rounded">{t}</span>)}
                    </div>
                    <button className="flex items-center gap-2 text-sm font-bold border-b border-black pb-1 w-fit group/btn">
                      Read Case Study <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const AboutPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
        <div>
           <h1 className="text-6xl lg:text-8xl font-display font-extrabold tracking-tighter mb-10 text-black">Who <br /><span className="text-text-muted italic">We Are</span></h1>
           <p className="text-2xl text-text-muted leading-relaxed mb-6 font-medium">
             NexOra Labs is an elite engineering agency helping ambitious businesses unlock scale through cutting-edge technology.
           </p>
           <p className="text-lg text-text-muted leading-relaxed mb-12">
             Founded in 2024, our mission is to build the digital infrastructure of tomorrow. We bring Silicon Valley-level execution to every project globally. We don't just stay ahead of the curve — we define it.
           </p>
           <div className="grid grid-cols-2 gap-8 border-t border-border pt-12">
               <div>
                   <div className="text-4xl font-display font-extrabold text-black mb-2">2024</div>
                   <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Founded</p>
               </div>
               <div>
                   <div className="text-4xl font-display font-extrabold text-black mb-2">Remote</div>
                   <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Global HQ</p>
               </div>
           </div>
        </div>
        <div className="relative group perspective-1000">
            <div className="preserve-3d transition-transform duration-700 hover:rotate-y-12">
               <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Team collaborating" className="rounded-[2rem] border border-border grayscale transition-all duration-700 object-cover aspect-[4/3] group-hover:grayscale-0 shadow-2xl" referrerPolicy="no-referrer" />
               <div className="absolute -bottom-10 -left-10 bg-black p-8 rounded-3xl shadow-2xl hidden md:block border border-white/10 transform translate-z-[50px]">
                   <div className="text-4xl font-display font-extrabold mb-2 text-white italic tracking-tight">"AI-First"</div>
                   <p className="text-gray-400 font-mono text-xs uppercase tracking-widest leading-none">Our Core DNA</p>
               </div>
            </div>
        </div>
      </div>

      <div className="">
        <h2 className="text-4xl font-display font-extrabold tracking-tighter mb-20 text-center">Core Values</h2>
        <div className="grid md:grid-cols-3 gap-16 text-center">
            {[
                { title: 'Obsessive Innovation', desc: 'We iterate on the bleeding edge of AI and web technologies to ensure you remain uncatchable.' },
                { title: 'Transparent Partnership', desc: 'No smoke and mirrors. Clear communication, straightforward pricing, and honest advisory.' },
                { title: 'Relentless Performance', desc: 'If a feature or line of code does not drive business growth, we do not build it.' },
            ].map((v, i) => (
                <div key={i} className="group border border-border p-10 rounded-[2rem] hover:border-black transition-colors hover:shadow-2xl">
                    <div className="text-7xl font-display font-extrabold mb-8 text-gray-100 group-hover:text-black transition-colors">0{i+1}</div>
                    <h4 className="text-2xl font-bold mb-4">{v.title}</h4>
                    <p className="text-text-muted leading-relaxed">{v.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const ContactPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="text-center mb-20">
        <h1 className="text-6xl lg:text-8xl font-display font-extrabold tracking-tighter mb-6 text-black">Let's <span className="text-text-muted italic">Talk</span></h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">Ready to build? Send us a message or reach out directly on WhatsApp for an immediate response.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="bg-secondary rounded-[2rem] border border-border p-8 lg:p-12 shadow-xl">
          <form className="space-y-6" action="https://formspree.io/f/xyyllqll" method="POST">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-black uppercase tracking-wider">Name</label>
                <input type="text" name="name" className="w-full bg-white border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-black transition-colors" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black uppercase tracking-wider">Email</label>
                <input type="email" name="email" className="w-full bg-white border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-black transition-colors" placeholder="john@company.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-black uppercase tracking-wider">Service Needed</label>
              <select name="service" className="w-full bg-white border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-black transition-colors">
                <option>Web Development</option>
                <option>Automation</option>
                <option>AI Agents</option>
                <option>Mobile App</option>
                <option>Other / Consulting</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-black uppercase tracking-wider">Message</label>
              <textarea name="message" rows={5} className="w-full bg-white border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-black transition-colors resize-none" placeholder="Tell us about your project goals..." required></textarea>
            </div>
            <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-xl">
              Send Message <Send size={18} />
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-center space-y-12">
          <div>
            <h3 className="text-3xl font-display font-extrabold tracking-tighter mb-6">Direct Contact</h3>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">Prefer speaking directly? Our engineering consultants are available via WhatsApp.</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 px-8 py-4 rounded-full font-bold hover:bg-[#25D366]/20 transition-colors shadow-sm">
              <Phone size={24} /> Chat on WhatsApp
            </a>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-xl flex items-center justify-center border border-border">
                <Globe className="text-black" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Location</h4>
                <p className="text-text-muted">Remote-First (HQ: Pakistan)<br />Serving USA, UK, EU, Gulf</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-xl flex items-center justify-center border border-border">
                <Clock className="text-black" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Business Hours</h4>
                <p className="text-text-muted">Mon - Fri, 9:00 AM - 6:00 PM (PKT)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Footer = () => (
  <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="text-2xl font-display font-extrabold tracking-tighter flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black">
              <Zap size={18} />
            </div>
            NexOra Labs
          </div>
          <p className="text-gray-400 max-w-sm leading-relaxed mb-8">Building tomorrow's digital infrastructure. Elite engineering for ambitious businesses.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Github size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Instagram size={18} /></a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6 tracking-wide text-gray-200">Services</h4>
          <ul className="space-y-4 text-gray-400">
            <li><button className="hover:text-white transition-colors">Web Development</button></li>
            <li><button className="hover:text-white transition-colors">AI Agents</button></li>
            <li><button className="hover:text-white transition-colors">Automation</button></li>
            <li><button className="hover:text-white transition-colors">Mobile Apps</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 tracking-wide text-gray-200">Contact</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{WHATSAPP_DISPLAY}</a></li>
            <li><a href="mailto:hello@nexoralabs.com" className="hover:text-white transition-colors">hello@nexoralabs.com</a></li>
            <li>Remote - Pakistan</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} NexOra Labs. All rights reserved.</p>
        <div className="flex gap-4">
          <button className="hover:text-white transition-colors">Privacy</button>
          <button className="hover:text-white transition-colors">Terms</button>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activePage === 'home' && <HomePage key="home" setActivePage={setActivePage} />}
          {activePage === 'services' && <ServicesPage key="services" />}
          {activePage === 'portfolio' && <PortfolioPage key="portfolio" />}
          {activePage === 'about' && <AboutPage key="about" />}
          {activePage === 'contact' && <ContactPage key="contact" />}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
