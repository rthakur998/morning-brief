import { useState, useEffect, useRef } from "react";
import {
  Cpu, TrendingUp, HeartPulse, Zap, Building2, Landmark, Rocket,
  Play, Pause, Volume2, ChevronDown, ChevronRight, Mail, Check,
  ArrowRight, Headphones, FileText, Sparkles, Menu, X, Clock,
  Globe, BarChart3, Shield, Users, BookOpen, HelpCircle, MousePointerClick,
  Star, Bell, Download, Eye, Layers, AudioLines, ExternalLink, VolumeX
} from "lucide-react";

/* ───────────────────── INDUSTRY DATA WITH REAL ARTICLES ───────────────────── */
const industries = [
  {
    id: "tech",
    name: "Technology & AI",
    icon: Cpu,
    gradient: "from-blue-500 to-cyan-400",
    accent: "#3b82f6",
    accentLight: "rgba(59,130,246,0.12)",
    tagline: "Silicon Valley to Shenzhen — decoded daily",
    subsections: ["Artificial Intelligence", "Cloud & Infrastructure", "Cybersecurity", "Consumer Tech"],
    stories: [
      { title: "OpenAI Surpasses $25B in Annualized Revenue, Eyes Late-2026 IPO", tag: "AI", time: "2h ago", url: "https://www.techi.com/openai-ipo/", source: "Techi", summary: "OpenAI has crossed $25 billion in annualized revenue with 900M+ weekly active users, reportedly preparing for a public listing." },
      { title: "Apple Requires iOS 26 SDK for All New App Store Submissions", tag: "Consumer", time: "4h ago", url: "https://developer.apple.com/news/", source: "Apple", summary: "Starting April 28, all apps must be built with iOS 26 SDK, featuring Apple's broadest design update ever with Liquid Glass." },
      { title: "GPT-5.4 Released: 1M Token Context, Autonomous Workflows", tag: "AI", time: "5h ago", url: "https://developers.openai.com/api/docs/changelog", source: "OpenAI", summary: "Scores 75% on real-world desktop productivity tasks, surpassing the 72.4% human baseline on the OSWorld-V benchmark." },
    ],
  },
  {
    id: "finance",
    name: "Finance & Markets",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-400",
    accent: "#10b981",
    accentLight: "rgba(16,185,129,0.12)",
    tagline: "Markets, macro, and money moves",
    subsections: ["Equities & Indices", "Fixed Income", "Commodities", "Crypto & Digital Assets"],
    stories: [
      { title: "Fed Holds Rates at 3.5%-3.75%, Projects Single 2026 Cut", tag: "Macro", time: "1h ago", url: "https://www.cnbc.com/2026/03/18/fed-interest-rate-decision-march-2026.html", source: "CNBC", summary: "FOMC voted 11-1 to hold rates steady amid elevated inflation and Middle East conflict uncertainty." },
      { title: "SoftBank Secures $40B Bridge Loan for OpenAI Commitment", tag: "Deals", time: "3h ago", url: "https://www.techi.com/openai-ipo/", source: "Techi", summary: "JPMorgan and Goldman Sachs arranged a 12-month unsecured loan, signaling confidence in an OpenAI IPO within that window." },
      { title: "Markets Slide as Powell Warns Inflation Not Declining Fast Enough", tag: "Equities", time: "4h ago", url: "https://www.chase.com/personal/investments/learning-and-insights/article/march-2026-federal-reserve-holds-interest-rates-steady", source: "Chase", summary: "Fed revised 2026 inflation forecast upward to 2.7%, citing oil price pressures from the Iran conflict." },
    ],
  },
  {
    id: "health",
    name: "Healthcare & Biotech",
    icon: HeartPulse,
    gradient: "from-rose-500 to-pink-400",
    accent: "#f43f5e",
    accentLight: "rgba(244,63,94,0.12)",
    tagline: "Breakthroughs from bench to bedside",
    subsections: ["Drug Development", "Digital Health", "Genomics", "Health Policy"],
    stories: [
      { title: "Personalized Gene-Editing Treatment Moves to Clinical Trial", tag: "Genomics", time: "2h ago", url: "https://www.technologyreview.com/2026/01/12/1130697/10-breakthrough-technologies-2026/", source: "MIT Tech Review", summary: "Following the first successful personalized gene-editing treatment on an infant, a formal clinical trial has been approved." },
      { title: "AI Diagnostics Named 2026 Breakthrough Technology", tag: "Digital", time: "5h ago", url: "https://www.technologyreview.com/2026/01/12/1130697/10-breakthrough-technologies-2026/", source: "MIT Tech Review", summary: "MIT Technology Review names AI-powered diagnostic tools among the 10 breakthrough technologies to watch." },
      { title: "Embryo Screening Startups Make Bold Genetic Prediction Claims", tag: "Genomics", time: "6h ago", url: "https://www.technologyreview.com/2026/01/12/1130697/10-breakthrough-technologies-2026/", source: "MIT Tech Review", summary: "New startups claim they can predict traits including intelligence using genetic screening techniques." },
    ],
  },
  {
    id: "energy",
    name: "Energy & Climate",
    icon: Zap,
    gradient: "from-amber-500 to-yellow-400",
    accent: "#f59e0b",
    accentLight: "rgba(245,158,11,0.12)",
    tagline: "Powering the transition, tracking the grid",
    subsections: ["Renewables", "Oil & Gas", "Carbon Markets", "Grid & Storage"],
    stories: [
      { title: "Sodium-Ion Batteries Emerge as Cheaper Alternative to Lithium", tag: "Storage", time: "1h ago", url: "https://www.technologyreview.com/2026/01/12/1130697/10-breakthrough-technologies-2026/", source: "MIT Tech Review", summary: "Made from abundant materials like salt, sodium-ion batteries are poised to power grids and affordable EVs worldwide." },
      { title: "Nuclear Renaissance: New Reactor Designs Promise Faster Deployment", tag: "Nuclear", time: "3h ago", url: "https://www.technologyreview.com/2026/01/12/1130697/10-breakthrough-technologies-2026/", source: "MIT Tech Review", summary: "Alternative fuels and cooling systems like molten salt and TRISO could upend the traditional nuclear power model." },
      { title: "Oil Prices Surge on Middle East Conflict, Complicating Fed Outlook", tag: "Oil & Gas", time: "5h ago", url: "https://www.cnbc.com/2026/03/18/fed-interest-rate-decision-march-2026.html", source: "CNBC", summary: "The Iran conflict has driven gas prices to their highest level in years, threatening to reignite inflationary pressures." },
    ],
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: Building2,
    gradient: "from-violet-500 to-purple-400",
    accent: "#8b5cf6",
    accentLight: "rgba(139,92,246,0.12)",
    tagline: "Commercial, residential, and everything in between",
    subsections: ["Commercial", "Residential", "REITs", "PropTech"],
    stories: [
      { title: "OpenAI Expands 1M+ Sq Ft Office Footprint in San Francisco", tag: "Commercial", time: "2h ago", url: "https://www.sfexaminer.com/news/technology/why-openai-faces-massively-critical-year-ahead-in-2026/article_6112d59f-28b5-4770-bde1-b333deb5f01a.html", source: "SF Examiner", summary: "Workforce expected to surpass 6,000 in Q2 2026, driving massive commercial real estate expansion in the city." },
      { title: "Rate Pause Keeps Mortgage Rates Elevated, Housing in Limbo", tag: "Residential", time: "4h ago", url: "https://www.chase.com/personal/investments/learning-and-insights/article/march-2026-federal-reserve-holds-interest-rates-steady", source: "Chase", summary: "With the Fed holding at 3.5%-3.75%, mortgage rates remain elevated and the housing market stays supply-constrained." },
      { title: "Hyperscale AI Data Centers Reshape CRE Landscape", tag: "PropTech", time: "6h ago", url: "https://www.technologyreview.com/2026/01/12/1130697/10-breakthrough-technologies-2026/", source: "MIT Tech Review", summary: "The race for AI supremacy has supercharged data center demand, pushing commercial real estate infrastructure to its limits." },
    ],
  },
  {
    id: "politics",
    name: "Politics & Policy",
    icon: Landmark,
    gradient: "from-red-500 to-orange-400",
    accent: "#ef4444",
    accentLight: "rgba(239,68,68,0.12)",
    tagline: "Policy shifts that move markets and industries",
    subsections: ["U.S. Policy", "Global Affairs", "Regulation", "Trade & Tariffs"],
    stories: [
      { title: "Powell Resists White House Pressure, Vows to Stay Through Probe", tag: "Policy", time: "1h ago", url: "https://www.foxbusiness.com/economy/federal-reserve-interest-rate-decision-march-18-2026", source: "Fox Business", summary: "Fed Chair stated he has no intention of leaving the board until the DOJ investigation concludes with transparency." },
      { title: "Iran Conflict Dominates Fed Policy and Global Market Outlook", tag: "Global", time: "3h ago", url: "https://www.cnbc.com/2026/03/18/fed-interest-rate-decision-march-2026.html", source: "CNBC", summary: "The war and its impact on the Strait of Hormuz has roiled global oil markets and complicated economic forecasting." },
      { title: "UK Commits £2 Billion to National Quantum Computing Strategy", tag: "Regulation", time: "5h ago", url: "https://quantumcomputingreport.com/news/", source: "QC Report", summary: "Includes a world-first £1 billion procurement programme to buy quantum computers directly from manufacturers." },
    ],
  },
  {
    id: "startups",
    name: "Startups & VC",
    icon: Rocket,
    gradient: "from-sky-500 to-indigo-400",
    accent: "#0ea5e9",
    accentLight: "rgba(14,165,233,0.12)",
    tagline: "Funding rounds, founders, and the future",
    subsections: ["Seed & Series A", "Growth Stage", "IPOs & Exits", "VC Trends"],
    stories: [
      { title: "Defense Tech Startup Saronic Closes $1.75B at $9.25B Valuation", tag: "Growth", time: "2h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "The autonomous shipbuilder's mega-round signals defense tech is now a first-tier venture category." },
      { title: "56% of European AI Startups Consider Relocating for Better Funding", tag: "VC Trends", time: "4h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "AWS data shows European startups are eyeing departures for better funding, faster scaling, and lower costs." },
      { title: "Anthropic Nears $19B Revenue, May File S-1 by Mid-2026", tag: "IPOs", time: "5h ago", url: "https://www.techi.com/openai-ipo/", source: "Techi", summary: "If Anthropic files first, OpenAI is expected to accelerate its own IPO timeline to control the market narrative." },
    ],
  },
];

const faqs = [
  { q: "What is Brevity?", a: "Brevity is a daily intelligence platform that synthesizes the most important news across 7 major industries into concise audio briefings and PDF summaries. Think of it as your personalized newsroom — delivered every morning before 7 AM." },
  { q: "How long are the audio briefings?", a: "Each industry briefing is 5\u201310 minutes. The full cross-industry \u2018Everything Brief\u2019 runs about 20\u201325 minutes \u2014 perfect for a morning commute." },
  { q: "Can I customize what I receive?", a: "Absolutely. Choose specific industries, subsections, or opt into the full package. You control the format too \u2014 audio, PDF, or both." },
  { q: "Is Brevity free?", a: "We offer a free tier with access to 2 industry briefings per day. Premium subscribers get unlimited access, the Everything Brief, and early delivery." },
  { q: "How is this different from other newsletters?", a: "We don\u2019t just aggregate headlines. Our briefings are synthesized narratives with context, connecting dots across industries. Plus, audio-first delivery means you can consume it hands-free." },
  { q: "What time are briefings delivered?", a: "Premium briefings land by 6 AM ET. Free tier briefings are available by 8 AM ET." },
];

const howToSteps = [
  { icon: Eye, title: "Browse Industries", desc: "Scroll through 7 industry sections, each with curated top stories and subsections." },
  { icon: Headphones, title: "Listen to Briefings", desc: "Hit play on any section to hear a concise audio summary of the day\u2019s key developments." },
  { icon: Layers, title: "Explore Subsections", desc: "Drill into specific topics within each industry for deeper coverage." },
  { icon: Bell, title: "Subscribe & Customize", desc: "Choose your industries, pick your format (audio, PDF, or both), and get daily delivery." },
  { icon: Download, title: "Download PDFs", desc: "Every briefing comes with a downloadable PDF for offline reading and archiving." },
  { icon: Star, title: "Go Premium", desc: "Unlock the Everything Brief \u2014 a single audio + PDF covering all 7 industries." },
];

/* ───────────────────── AUDIO PLAYER ───────────────────── */
function AudioPlayer({ industry }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { setPlaying(false); return 0; }
          return p + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [playing]);

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div className="audio-player" style={{ "--accent": industry.accent, "--accent-light": industry.accentLight }}>
      <button className="play-btn" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}>
        {playing ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
      </button>
      <div className="audio-info">
        <span className="audio-label"><AudioLines size={14} /> Today's {industry.name} Brief</span>
        <div className="progress-track" onClick={handleProgressClick} style={{ cursor: "pointer" }}>
          <div className="progress-fill" style={{ width: progress + "%", background: industry.accent }} />
        </div>
        <div className="audio-meta">
          <span>{Math.floor((progress / 100) * 8)}:{String(Math.floor(((progress / 100) * 480) % 60)).padStart(2, "0")}</span>
          <span>8:00</span>
        </div>
      </div>
      <button onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute" : "Mute"} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        {muted ? <VolumeX size={18} style={{ color: industry.accent, opacity: 0.6 }} /> : <Volume2 size={18} style={{ color: industry.accent, opacity: 0.6 }} />}
      </button>
    </div>
  );
}

/* ───────────────────── INDUSTRY SECTION ───────────────────── */
function IndustrySection({ industry, index }) {
  const Icon = industry.icon;
  return (
    <section className="industry-section" id={industry.id}>
      <div className="industry-header">
        <div className="industry-icon-wrap" style={{ background: industry.accentLight }}>
          <Icon size={28} style={{ color: industry.accent }} strokeWidth={1.8} />
        </div>
        <div>
          <h2 className="industry-title">{industry.name}</h2>
          <p className="industry-tagline">{industry.tagline}</p>
        </div>
      </div>
      <AudioPlayer industry={industry} />
      <div className="subsections">
        {industry.subsections.map((sub) => (
          <span key={sub} className="subsection-chip" style={{ borderColor: industry.accent, color: industry.accent, background: industry.accentLight }}>{sub}</span>
        ))}
      </div>
      <div className="stories-grid">
        {industry.stories.map((story, i) => (
          <a key={i} href={story.url} target="_blank" rel="noopener noreferrer" className="story-card" style={{ "--card-accent": industry.accent, textDecoration: "none" }}>
            <div className="story-tag" style={{ background: industry.accentLight, color: industry.accent }}>{story.tag}</div>
            <h3 className="story-title">{story.title}</h3>
            <p className="story-summary">{story.summary}</p>
            <div className="story-footer">
              <span className="story-time"><Clock size={13} /> {story.time}</span>
              <span className="story-source">{story.source}</span>
              <span className="story-read-more" style={{ color: industry.accent }}>Read <ExternalLink size={13} /></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────── FAQ ITEM ───────────────────── */
function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"faq-item " + (open ? "open" : "")} onClick={() => setOpen(!open)}>
      <div className="faq-q">
        <span>{faq.q}</span>
        <ChevronDown size={20} className={"faq-chevron " + (open ? "rotated" : "")} />
      </div>
      {open && <p className="faq-a">{faq.a}</p>}
    </div>
  );
}

/* ───────────────────── SUBSCRIBE SECTION ───────────────────── */
function SubscribeSection() {
  const [selected, setSelected] = useState([]);
  const [format, setFormat] = useState("both");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [everything, setEverything] = useState(false);
  const [emailError, setEmailError] = useState("");

  const toggleIndustry = (id) => {
    if (everything) return;
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };
  const toggleEverything = () => {
    setEverything(!everything);
    if (!everything) { setSelected(industries.map((i) => i.id)); } else { setSelected([]); }
  };
  const validateEmail = (em) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
  const handleSubscribe = () => {
    setEmailError("");
    if (!email) { setEmailError("Please enter your email address."); return; }
    if (!validateEmail(email)) { setEmailError("Please enter a valid email address."); return; }
    if (selected.length === 0) { setEmailError("Please select at least one industry."); return; }
    setSubscribed(true);
  };

  return (
    <section className="subscribe-section" id="subscribe">
      <div className="section-badge"><Bell size={14} /> Personalize Your Brief</div>
      <h2 className="section-heading">Subscribe to What Matters</h2>
      <p className="section-desc">Choose the industries you care about, pick your delivery format, and wake up every morning to a personalized briefing.</p>
      <div className="everything-toggle" onClick={toggleEverything}>
        <div className={"toggle-track " + (everything ? "active" : "")}><div className="toggle-thumb" /></div>
        <div>
          <span className="everything-label"><Sparkles size={16} /> The Everything Brief</span>
          <span className="everything-desc">Get all 7 industries in one comprehensive audio + PDF</span>
        </div>
      </div>
      <div className="subscribe-grid">
        {industries.map((ind) => {
          const Icon = ind.icon;
          const isSelected = selected.includes(ind.id);
          return (
            <div key={ind.id} className={"subscribe-card " + (isSelected ? "selected" : "")} style={{ "--sel-accent": ind.accent, "--sel-light": ind.accentLight, borderColor: isSelected ? ind.accent : "transparent" }} onClick={() => toggleIndustry(ind.id)}>
              <div className="subscribe-card-check">{isSelected && <Check size={14} />}</div>
              <Icon size={24} style={{ color: isSelected ? ind.accent : "var(--text-muted)" }} />
              <span className="subscribe-card-name">{ind.name}</span>
            </div>
          );
        })}
      </div>
      <div className="format-selector">
        <h3 className="format-title">Delivery Format</h3>
        <div className="format-options">
          {[{ id: "audio", label: "Audio Only", icon: Headphones }, { id: "pdf", label: "PDF Only", icon: FileText }, { id: "both", label: "Audio + PDF", icon: Sparkles }].map((f) => (
            <button key={f.id} className={"format-btn " + (format === f.id ? "active" : "")} onClick={() => setFormat(f.id)}><f.icon size={18} />{f.label}</button>
          ))}
        </div>
      </div>
      {!subscribed ? (
        <>
          <div className="email-row">
            <div className="email-input-wrap">
              <Mail size={18} />
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} className="email-input" onKeyDown={(e) => e.key === "Enter" && handleSubscribe()} />
            </div>
            <button className="subscribe-btn" onClick={handleSubscribe}>Subscribe <ArrowRight size={16} /></button>
          </div>
          {emailError && <p style={{ color: "#f43f5e", fontSize: "0.85rem", marginTop: 10, textAlign: "center" }}>{emailError}</p>}
        </>
      ) : (
        <div className="subscribed-msg"><Check size={20} /><span>You're in! Check your inbox for confirmation.</span></div>
      )}
    </section>
  );
}

/* ───────────────────── MOBILE MENU ───────────────────── */
function MobileMenu({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <div className="logo"><span className="logo-dot" />Brevity</div>
          <button className="mobile-close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        <ul className="mobile-menu-links">
          <li><a href="#industries" onClick={onClose}>Industries</a></li>
          <li><a href="#how-it-works" onClick={onClose}>How It Works</a></li>
          <li><a href="#faq" onClick={onClose}>FAQ</a></li>
          <li><a href="#subscribe" onClick={onClose} className="mobile-cta">Subscribe</a></li>
        </ul>
        <div className="mobile-menu-industries">
          <p className="mobile-menu-label">Jump to Industry</p>
          {industries.map((ind) => { const Icon = ind.icon; return (
            <a key={ind.id} href={"#" + ind.id} className="mobile-industry-link" onClick={onClose}><Icon size={16} style={{ color: ind.accent }} /> {ind.name}</a>
          ); })}
        </div>
      </nav>
    </div>
  );
}

/* ───────────────────── MAIN APP ───────────────────── */
export default function MorningBrief() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        :root {
          --bg-primary: #0a0e17; --bg-secondary: #111827; --bg-card: #161e2e; --bg-card-hover: #1c2740;
          --border: rgba(255,255,255,0.06); --border-hover: rgba(255,255,255,0.12);
          --text-primary: #f1f5f9; --text-secondary: #94a3b8; --text-muted: #64748b;
          --gold: #d4a853; --gold-light: rgba(212,168,83,0.12);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .app { font-family: 'DM Sans', sans-serif; background: var(--bg-primary); color: var(--text-primary); min-height: 100vh; overflow-x: hidden; }
        .bg-glow { position: fixed; top: -300px; left: 50%; transform: translateX(-50%); width: 900px; height: 900px; background: radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .bg-grid { position: fixed; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; z-index: 0; }
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 16px 40px; display: flex; align-items: center; justify-content: space-between; transition: all 0.3s ease; backdrop-filter: blur(20px); background: rgba(10,14,23,0.7); border-bottom: 1px solid transparent; }
        .navbar.scrolled { padding: 12px 40px; background: rgba(10,14,23,0.92); border-bottom: 1px solid var(--border); }
        .logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; gap: 10px; color: var(--text-primary); text-decoration: none; cursor: pointer; }
        .logo-dot { width: 10px; height: 10px; background: var(--gold); border-radius: 50%; display: inline-block; box-shadow: 0 0 12px rgba(212,168,83,0.5); }
        .nav-links { display: flex; gap: 32px; align-items: center; list-style: none; }
        .nav-links a { text-decoration: none; color: var(--text-secondary); font-size: 0.88rem; font-weight: 500; transition: color 0.2s; letter-spacing: 0.01em; }
        .nav-links a:hover { color: var(--gold); }
        .nav-cta { background: linear-gradient(135deg, var(--gold), #c4923a); color: #0a0e17 !important; padding: 10px 22px; border-radius: 100px; font-weight: 600 !important; font-size: 0.85rem !important; letter-spacing: 0.02em; transition: transform 0.2s, box-shadow 0.2s; }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(212,168,83,0.3); }
        .menu-toggle { display: none; background: none; border: none; color: var(--text-primary); cursor: pointer; }
        .mobile-menu-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 200; animation: fadeIn 0.2s ease; }
        .mobile-menu { position: fixed; top: 0; right: 0; width: min(360px, 85vw); height: 100vh; background: var(--bg-secondary); border-left: 1px solid var(--border); padding: 20px; overflow-y: auto; animation: slideIn 0.3s ease; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .mobile-menu-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
        .mobile-close-btn { background: none; border: none; color: var(--text-primary); cursor: pointer; padding: 8px; }
        .mobile-menu-links { list-style: none; display: flex; flex-direction: column; gap: 4px; margin-bottom: 28px; }
        .mobile-menu-links a { display: block; padding: 14px 16px; text-decoration: none; color: var(--text-primary); font-size: 1rem; font-weight: 500; border-radius: 10px; transition: background 0.2s; }
        .mobile-menu-links a:hover { background: var(--bg-card); }
        .mobile-cta { background: linear-gradient(135deg, var(--gold), #c4923a) !important; color: #0a0e17 !important; font-weight: 600 !important; text-align: center; border-radius: 100px !important; margin-top: 8px; }
        .mobile-menu-label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 12px; }
        .mobile-menu-industries { padding-top: 20px; border-top: 1px solid var(--border); }
        .mobile-industry-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; text-decoration: none; color: var(--text-secondary); font-size: 0.88rem; border-radius: 8px; transition: all 0.2s; }
        .mobile-industry-link:hover { background: var(--bg-card); color: var(--text-primary); }
        .hero { position: relative; z-index: 1; padding: 180px 40px 100px; text-align: center; max-width: 900px; margin: 0 auto; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--gold-light); border: 1px solid rgba(212,168,83,0.2); color: var(--gold); padding: 8px 18px; border-radius: 100px; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 28px; animation: fadeInDown 0.6s ease; }
        .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 6vw, 4.5rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.03em; margin-bottom: 24px; animation: fadeInUp 0.7s ease; }
        .hero h1 .gold { color: var(--gold); }
        .hero p { font-size: 1.15rem; color: var(--text-secondary); line-height: 1.7; max-width: 640px; margin: 0 auto 40px; animation: fadeInUp 0.8s ease; }
        .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; animation: fadeInUp 0.9s ease; }
        .hero-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; border-radius: 100px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; text-decoration: none; }
        .hero-btn.primary { background: linear-gradient(135deg, var(--gold), #c4923a); color: #0a0e17; }
        .hero-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 6px 30px rgba(212,168,83,0.35); }
        .hero-btn.secondary { background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border-hover); }
        .hero-btn.secondary:hover { background: var(--bg-card-hover); border-color: var(--gold); }
        .macro-banner { position: relative; z-index: 1; display: flex; align-items: center; gap: 24px; padding: 20px 40px; background: var(--bg-secondary); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); overflow: hidden; white-space: nowrap; }
        .macro-banner-inner { display: flex; gap: 40px; animation: scroll 30s linear infinite; }
        .macro-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-secondary); flex-shrink: 0; }
        .macro-item .up { color: #10b981; } .macro-item .down { color: #ef4444; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .section-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--gold-light); border: 1px solid rgba(212,168,83,0.2); color: var(--gold); padding: 6px 16px; border-radius: 100px; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 16px; }
        .section-heading { font-family: 'Playfair Display', serif; font-size: 2.4rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 12px; }
        .section-desc { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.7; max-width: 600px; margin-bottom: 40px; }
        .industry-nav { position: relative; z-index: 1; display: flex; gap: 8px; padding: 40px 40px 0; max-width: 1100px; margin: 0 auto; flex-wrap: wrap; }
        .industry-nav-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 100px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text-secondary); font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all 0.2s; text-decoration: none; }
        .industry-nav-btn:hover { border-color: var(--border-hover); background: var(--bg-card-hover); color: var(--text-primary); }
        .industry-section { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 60px 40px; border-bottom: 1px solid var(--border); }
        .industry-header { display: flex; align-items: center; gap: 18px; margin-bottom: 24px; }
        .industry-icon-wrap { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .industry-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; letter-spacing: -0.01em; }
        .industry-tagline { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .audio-player { display: flex; align-items: center; gap: 14px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 14px 20px; margin-bottom: 24px; transition: border-color 0.2s; }
        .audio-player:hover { border-color: var(--border-hover); }
        .play-btn { width: 42px; height: 42px; border-radius: 50%; background: var(--accent); border: none; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: transform 0.15s, box-shadow 0.15s; }
        .play-btn:hover { transform: scale(1.08); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
        .audio-info { flex: 1; min-width: 0; }
        .audio-label { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
        .progress-track { width: 100%; height: 4px; background: rgba(255,255,255,0.08); border-radius: 100px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 100px; transition: width 0.1s linear; }
        .audio-meta { display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted); margin-top: 4px; }
        .subsections { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
        .subsection-chip { padding: 6px 14px; border-radius: 100px; font-size: 0.78rem; font-weight: 600; border: 1px solid; cursor: pointer; transition: all 0.2s; }
        .subsection-chip:hover { filter: brightness(1.2); transform: translateY(-1px); }
        .stories-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
        a.story-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 22px; cursor: pointer; transition: all 0.25s; display: block; color: inherit; text-decoration: none; }
        a.story-card:hover { border-color: var(--card-accent); transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .story-tag { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; margin-bottom: 12px; }
        .story-title { font-size: 1rem; font-weight: 600; line-height: 1.45; margin-bottom: 8px; color: var(--text-primary); }
        .story-summary { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .story-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .story-time { display: flex; align-items: center; gap: 5px; font-size: 0.78rem; color: var(--text-muted); }
        .story-source { font-size: 0.72rem; color: var(--text-muted); font-weight: 500; opacity: 0.8; }
        .story-read-more { display: flex; align-items: center; gap: 4px; font-size: 0.82rem; font-weight: 600; transition: gap 0.2s; }
        a.story-card:hover .story-read-more { gap: 8px; }
        .howto-section { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 80px 40px; }
        .howto-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .howto-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 28px; transition: all 0.25s; }
        .howto-card:hover { border-color: var(--gold); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
        .howto-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--gold-light); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: var(--gold); }
        .howto-card h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 600; margin-bottom: 8px; }
        .howto-card p { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; }
        .faq-section { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; padding: 80px 40px; }
        .faq-item { border: 1px solid var(--border); border-radius: 14px; margin-bottom: 12px; overflow: hidden; cursor: pointer; background: var(--bg-card); transition: border-color 0.2s; }
        .faq-item:hover, .faq-item.open { border-color: var(--gold); }
        .faq-q { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; font-weight: 600; font-size: 0.95rem; }
        .faq-chevron { transition: transform 0.3s; color: var(--text-muted); }
        .faq-chevron.rotated { transform: rotate(180deg); color: var(--gold); }
        .faq-a { padding: 0 24px 20px; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.7; }
        .subscribe-section { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; padding: 80px 40px; text-align: center; }
        .everything-toggle { display: flex; align-items: center; gap: 16px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 18px 24px; margin-bottom: 28px; cursor: pointer; text-align: left; transition: border-color 0.2s; }
        .everything-toggle:hover { border-color: var(--gold); }
        .toggle-track { width: 48px; height: 26px; border-radius: 100px; background: rgba(255,255,255,0.1); position: relative; flex-shrink: 0; transition: background 0.3s; }
        .toggle-track.active { background: var(--gold); }
        .toggle-thumb { width: 20px; height: 20px; border-radius: 50%; background: white; position: absolute; top: 3px; left: 3px; transition: left 0.3s; }
        .toggle-track.active .toggle-thumb { left: 25px; }
        .everything-label { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.95rem; color: var(--text-primary); }
        .everything-desc { display: block; font-size: 0.82rem; color: var(--text-muted); margin-top: 2px; }
        .subscribe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; margin-bottom: 32px; }
        .subscribe-card { background: var(--bg-card); border: 2px solid transparent; border-radius: 14px; padding: 20px 12px; display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer; transition: all 0.2s; position: relative; }
        .subscribe-card:hover { border-color: var(--border-hover); }
        .subscribe-card.selected { background: var(--sel-light); }
        .subscribe-card-check { position: absolute; top: 8px; right: 8px; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: white; }
        .subscribe-card.selected .subscribe-card-check { background: var(--sel-accent); }
        .subscribe-card-name { font-size: 0.78rem; font-weight: 600; text-align: center; color: var(--text-secondary); }
        .subscribe-card.selected .subscribe-card-name { color: var(--text-primary); }
        .format-selector { margin-bottom: 32px; }
        .format-title { font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 12px; }
        .format-options { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .format-btn { display: flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 100px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text-secondary); font-size: 0.88rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .format-btn:hover { border-color: var(--border-hover); }
        .format-btn.active { border-color: var(--gold); background: var(--gold-light); color: var(--gold); }
        .email-row { display: flex; gap: 12px; max-width: 500px; margin: 0 auto; }
        .email-input-wrap { flex: 1; display: flex; align-items: center; gap: 10px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 100px; padding: 0 20px; color: var(--text-muted); transition: border-color 0.2s; }
        .email-input-wrap:focus-within { border-color: var(--gold); }
        .email-input { flex: 1; background: none; border: none; outline: none; color: var(--text-primary); font-size: 0.92rem; padding: 14px 0; font-family: inherit; }
        .email-input::placeholder { color: var(--text-muted); }
        .subscribe-btn { display: flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 100px; background: linear-gradient(135deg, var(--gold), #c4923a); color: #0a0e17; font-weight: 600; font-size: 0.92rem; border: none; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .subscribe-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(212,168,83,0.35); }
        .subscribed-msg { display: flex; align-items: center; justify-content: center; gap: 10px; color: #10b981; font-weight: 600; font-size: 1rem; padding: 16px; background: rgba(16,185,129,0.08); border-radius: 100px; max-width: 500px; margin: 0 auto; }
        .footer { position: relative; z-index: 1; text-align: center; padding: 60px 40px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 0.85rem; }
        .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .footer-links { display: flex; gap: 24px; justify-content: center; margin-top: 16px; flex-wrap: wrap; }
        .footer-links a { color: var(--text-muted); text-decoration: none; font-size: 0.82rem; transition: color 0.2s; }
        .footer-links a:hover { color: var(--gold); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) {
          .navbar { padding: 14px 20px; } .nav-links { display: none; } .menu-toggle { display: block; }
          .hero { padding: 140px 20px 60px; } .hero h1 { font-size: 2.2rem; }
          .industry-section { padding: 40px 20px; } .industry-nav { padding: 30px 20px 0; }
          .howto-section, .faq-section, .subscribe-section { padding: 50px 20px; }
          .stories-grid { grid-template-columns: 1fr; } .howto-grid { grid-template-columns: 1fr; }
          .subscribe-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); }
          .email-row { flex-direction: column; } .section-heading { font-size: 1.8rem; }
          .macro-banner { padding: 16px 20px; }
        }
      `}</style>
      <div className="app">
        <div className="bg-glow" />
        <div className="bg-grid" />
        <nav className={"navbar " + (scrolled ? "scrolled" : "")}>
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}><span className="logo-dot" />Brevity</a>
          <ul className="nav-links">
            <li><a href="#industries">Industries</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#subscribe" className="nav-cta">Subscribe</a></li>
          </ul>
          <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={24} /></button>
        </nav>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        <header className="hero">
          <div className="hero-badge"><Globe size={14} /> 7 Industries. One Brief. Every Morning.</div>
          <h1>Your Daily<br />Intelligence <span className="gold">Brief</span></h1>
          <p>Cut through the noise. Brevity synthesizes top stories across technology, finance, healthcare, energy, real estate, politics, and startups — delivered as a concise audio briefing and PDF before your first coffee.</p>
          <div className="hero-actions">
            <a href="#subscribe" className="hero-btn primary"><Headphones size={18} /> Start Listening</a>
            <a href="#how-it-works" className="hero-btn secondary"><BookOpen size={18} /> How It Works</a>
          </div>
        </header>
        <div className="macro-banner">
          <div className="macro-banner-inner">
            {[...Array(2)].map((_, dupeIdx) => (
              <div key={dupeIdx} style={{ display: "flex", gap: 40 }}>
                <span className="macro-item"><BarChart3 size={14} /> S&P 500 <span className="up">+1.2%</span></span>
                <span className="macro-item">NASDAQ <span className="up">+1.8%</span></span>
                <span className="macro-item">10Y Treasury <span className="down">4.18%</span></span>
                <span className="macro-item">Bitcoin <span className="up">$152,340</span></span>
                <span className="macro-item">Oil (WTI) <span className="down">$71.20</span></span>
                <span className="macro-item">Gold <span className="up">$3,180</span></span>
                <span className="macro-item">EUR/USD <span className="down">1.082</span></span>
                <span className="macro-item"><Globe size={14} /> VIX <span className="up">14.2</span></span>
              </div>
            ))}
          </div>
        </div>
        <div className="industry-nav" id="industries">
          {industries.map((ind) => { const Icon = ind.icon; return (<a key={ind.id} href={"#" + ind.id} className="industry-nav-btn"><Icon size={16} style={{ color: ind.accent }} /> {ind.name}</a>); })}
        </div>
        {industries.map((ind, i) => (<IndustrySection key={ind.id} industry={ind} index={i} />))}
        <section className="howto-section" id="how-it-works">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-badge"><MousePointerClick size={14} /> Navigate Like a Pro</div>
            <h2 className="section-heading">How It Works</h2>
            <p className="section-desc" style={{ margin: "0 auto" }}>Brevity is designed to get you informed in minutes, not hours. Here's how to make the most of it.</p>
          </div>
          <div className="howto-grid">
            {howToSteps.map((step, i) => (<div key={i} className="howto-card"><div className="howto-icon"><step.icon size={24} /></div><h3>{step.title}</h3><p>{step.desc}</p></div>))}
          </div>
        </section>
        <SubscribeSection />
        <section className="faq-section" id="faq">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-badge"><HelpCircle size={14} /> Got Questions?</div>
            <h2 className="section-heading">FAQ</h2>
          </div>
          {faqs.map((faq, i) => (<FaqItem key={i} faq={faq} />))}
        </section>
        <footer className="footer">
          <div className="footer-logo"><span className="logo-dot" /> Brevity</div>
          <p>Your daily intelligence brief — across every industry that matters.</p>
          <div className="footer-links">
            <a href="#industries">Industries</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#subscribe">Subscribe</a>
            <a href="#faq">FAQ</a>
            <a href="mailto:hello@brevity.news">Contact</a>
          </div>
          <p style={{ marginTop: 16, fontSize: "0.78rem" }}>© 2026 Brevity. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
