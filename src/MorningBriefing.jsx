import { useState, useEffect, useRef } from "react";
import {
  Cpu, TrendingUp, HeartPulse, Zap, Building2, Landmark, Rocket,
  Play, Pause, Volume2, ChevronDown, ChevronRight, Mail, Check,
  ArrowRight, Headphones, FileText, Sparkles, Menu, X, Clock,
  Globe, BarChart3, Shield, Users, BookOpen, HelpCircle, MousePointerClick,
  Star, Bell, Download, Eye, Layers, AudioLines
} from "lucide-react";

/* ───────────────────── INDUSTRY DATA ───────────────────── */
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
      { title: "OpenAI Unveils GPT-5 with Real-Time Reasoning", tag: "AI", time: "2h ago" },
      { title: "Apple's Mixed Reality Headset Hits 10M Sales", tag: "Consumer", time: "4h ago" },
      { title: "AWS Launches Quantum Computing Service", tag: "Cloud", time: "5h ago" },
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
      { title: "Fed Signals Rate Cut Timeline for Q3", tag: "Macro", time: "1h ago" },
      { title: "Bitcoin Surges Past $150K on ETF Inflows", tag: "Crypto", time: "3h ago" },
      { title: "S&P 500 Hits All-Time High on Tech Rally", tag: "Equities", time: "4h ago" },
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
      { title: "Moderna's Cancer Vaccine Enters Phase 3 Trials", tag: "Biotech", time: "2h ago" },
      { title: "AI Diagnostics Now Match Specialist Accuracy", tag: "Digital", time: "5h ago" },
      { title: "Gene Therapy Approved for Sickle Cell Disease", tag: "Genomics", time: "6h ago" },
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
      { title: "Global Solar Capacity Surpasses Coal for First Time", tag: "Renewables", time: "1h ago" },
      { title: "EU Carbon Price Hits €120 Per Tonne", tag: "Carbon", time: "3h ago" },
      { title: "Tesla Megapack Dominates Utility Storage Market", tag: "Storage", time: "5h ago" },
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
      { title: "Office Vacancy Rates Drop for First Time Since 2020", tag: "Commercial", time: "2h ago" },
      { title: "Zillow: Median Home Price Crosses $450K", tag: "Residential", time: "4h ago" },
      { title: "Proptech Startup Raises $500M Series D", tag: "PropTech", time: "6h ago" },
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
      { title: "New AI Regulation Framework Passes Senate", tag: "Regulation", time: "1h ago" },
      { title: "US-China Trade Talks Resume in Geneva", tag: "Trade", time: "3h ago" },
      { title: "Infrastructure Bill Allocates $200B to Clean Energy", tag: "Policy", time: "5h ago" },
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
      { title: "YC W26 Batch Features Record 400 Startups", tag: "Seed", time: "2h ago" },
      { title: "Stripe Competitor Hits $10B Valuation", tag: "Growth", time: "4h ago" },
      { title: "VC Funding Rebounds: Q1 Hits $85B Globally", tag: "VC Trends", time: "5h ago" },
    ],
  },
];

const faqs = [
  { q: "What is The Morning Brief?", a: "The Morning Brief is a daily intelligence platform that synthesizes the most important news across 7 major industries into concise audio briefings and PDF summaries. Think of it as your personalized newsroom — delivered every morning before 7 AM." },
  { q: "How long are the audio briefings?", a: "Each industry briefing is 5–10 minutes. The full cross-industry 'Everything Brief' runs about 20–25 minutes — perfect for a morning commute." },
  { q: "Can I customize what I receive?", a: "Absolutely. Choose specific industries, subsections, or opt into the full package. You control the format too — audio, PDF, or both." },
  { q: "Is The Morning Brief free?", a: "We offer a free tier with access to 2 industry briefings per day. Premium subscribers get unlimited access, the Everything Brief, and early delivery." },
  { q: "How is this different from other newsletters?", a: "We don't just aggregate headlines. Our briefings are synthesized narratives with context, connecting dots across industries. Plus, audio-first delivery means you can consume it hands-free." },
  { q: "What time are briefings delivered?", a: "Premium briefings land by 6 AM ET. Free tier briefings are available by 8 AM ET." },
];

const howToSteps = [
  { icon: Eye, title: "Browse Industries", desc: "Scroll through 7 industry sections, each with curated top stories and subsections." },
  { icon: Headphones, title: "Listen to Briefings", desc: "Hit play on any section to hear a concise audio summary of the day's key developments." },
  { icon: Layers, title: "Explore Subsections", desc: "Drill into specific topics within each industry for deeper coverage." },
  { icon: Bell, title: "Subscribe & Customize", desc: "Choose your industries, pick your format (audio, PDF, or both), and get daily delivery." },
  { icon: Download, title: "Download PDFs", desc: "Every briefing comes with a downloadable PDF for offline reading and archiving." },
  { icon: Star, title: "Go Premium", desc: "Unlock the Everything Brief — a single audio + PDF covering all 7 industries." },
];

/* ───────────────────── AUDIO PLAYER ───────────────────── */
function AudioPlayer({ industry }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

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

  return (
    <div
      className="audio-player"
      style={{ "--accent": industry.accent, "--accent-light": industry.accentLight }}
    >
      <button
        className="play-btn"
        onClick={() => setPlaying(!playing)}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
      </button>
      <div className="audio-info">
        <span className="audio-label">
          <AudioLines size={14} /> Today's {industry.name} Brief
        </span>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%`, background: industry.accent }} />
        </div>
        <div className="audio-meta">
          <span>{Math.floor((progress / 100) * 8)}:{String(Math.floor(((progress / 100) * 480) % 60)).padStart(2, "0")}</span>
          <span>8:00</span>
        </div>
      </div>
      <Volume2 size={18} className="volume-icon" style={{ color: industry.accent }} />
    </div>
  );
}

/* ───────────────────── INDUSTRY SECTION ───────────────────── */
function IndustrySection({ industry, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = industry.icon;
  const isEven = index % 2 === 0;

  return (
    <section className="industry-section" id={industry.id}>
      <div className="industry-header">
        <div className="industry-icon-wrap" style={{ background: industry.accentLight }}>
          <Icon size={28} style={{ color: industry.accent }} strokeWidth={1.8} />
        </div>
        <div>
          <h2 className="industry-title">
            {industry.name}
          </h2>
          <p className="industry-tagline">{industry.tagline}</p>
        </div>
      </div>

      <AudioPlayer industry={industry} />

      {/* Subsections */}
      <div className="subsections">
        {industry.subsections.map((sub) => (
          <span key={sub} className="subsection-chip" style={{ borderColor: industry.accent, color: industry.accent, background: industry.accentLight }}>
            {sub}
          </span>
        ))}
      </div>

      {/* Stories */}
      <div className="stories-grid">
        {industry.stories.map((story, i) => (
          <div key={i} className="story-card" style={{ "--card-accent": industry.accent }}>
            <div className="story-tag" style={{ background: industry.accentLight, color: industry.accent }}>
              {story.tag}
            </div>
            <h3 className="story-title">{story.title}</h3>
            <div className="story-footer">
              <span className="story-time"><Clock size={13} /> {story.time}</span>
              <button className="story-read-more" style={{ color: industry.accent }}>
                Read more <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────── FAQ ITEM ───────────────────── */
function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="faq-q">
        <span>{faq.q}</span>
        <ChevronDown size={20} className={`faq-chevron ${open ? "rotated" : ""}`} />
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

  const toggleIndustry = (id) => {
    if (everything) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleEverything = () => {
    setEverything(!everything);
    if (!everything) {
      setSelected(industries.map((i) => i.id));
    } else {
      setSelected([]);
    }
  };

  return (
    <section className="subscribe-section" id="subscribe">
      <div className="section-badge"><Bell size={14} /> Personalize Your Brief</div>
      <h2 className="section-heading">Subscribe to What Matters</h2>
      <p className="section-desc">
        Choose the industries you care about, pick your delivery format, and wake up every morning to a personalized briefing.
      </p>

      {/* Everything toggle */}
      <div className="everything-toggle" onClick={toggleEverything}>
        <div className={`toggle-track ${everything ? "active" : ""}`}>
          <div className="toggle-thumb" />
        </div>
        <div>
          <span className="everything-label">
            <Sparkles size={16} /> The Everything Brief
          </span>
          <span className="everything-desc">Get all 7 industries in one comprehensive audio + PDF</span>
        </div>
      </div>

      {/* Industry selector */}
      <div className="subscribe-grid">
        {industries.map((ind) => {
          const Icon = ind.icon;
          const isSelected = selected.includes(ind.id);
          return (
            <div
              key={ind.id}
              className={`subscribe-card ${isSelected ? "selected" : ""}`}
              style={{
                "--sel-accent": ind.accent,
                "--sel-light": ind.accentLight,
                borderColor: isSelected ? ind.accent : "transparent",
              }}
              onClick={() => toggleIndustry(ind.id)}
            >
              <div className="subscribe-card-check">
                {isSelected && <Check size={14} />}
              </div>
              <Icon size={24} style={{ color: isSelected ? ind.accent : "var(--text-muted)" }} />
              <span className="subscribe-card-name">{ind.name}</span>
            </div>
          );
        })}
      </div>

      {/* Format selector */}
      <div className="format-selector">
        <h3 className="format-title">Delivery Format</h3>
        <div className="format-options">
          {[
            { id: "audio", label: "Audio Only", icon: Headphones },
            { id: "pdf", label: "PDF Only", icon: FileText },
            { id: "both", label: "Audio + PDF", icon: Sparkles },
          ].map((f) => (
            <button
              key={f.id}
              className={`format-btn ${format === f.id ? "active" : ""}`}
              onClick={() => setFormat(f.id)}
            >
              <f.icon size={18} />
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Email */}
      {!subscribed ? (
        <div className="email-row">
          <div className="email-input-wrap">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
          </div>
          <button
            className="subscribe-btn"
            onClick={() => { if (email) setSubscribed(true); }}
          >
            Subscribe <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="subscribed-msg">
          <Check size={20} />
          <span>You're in! Check your inbox for confirmation.</span>
        </div>
      )}
    </section>
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');

        :root {
          --bg-primary: #0a0e17;
          --bg-secondary: #111827;
          --bg-card: #161e2e;
          --bg-card-hover: #1c2740;
          --border: rgba(255,255,255,0.06);
          --border-hover: rgba(255,255,255,0.12);
          --text-primary: #f1f5f9;
          --text-secondary: #94a3b8;
          --text-muted: #64748b;
          --gold: #d4a853;
          --gold-light: rgba(212,168,83,0.12);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .app {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── BG EFFECTS ── */
        .bg-glow {
          position: fixed;
          top: -300px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 900px;
          background: radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── NAVBAR ── */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 16px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
          backdrop-filter: blur(20px);
          background: rgba(10,14,23,0.7);
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          padding: 12px 40px;
          background: rgba(10,14,23,0.92);
          border-bottom: 1px solid var(--border);
        }
        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-primary);
        }
        .logo-dot {
          width: 10px;
          height: 10px;
          background: var(--gold);
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 12px rgba(212,168,83,0.5);
        }
        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
          list-style: none;
        }
        .nav-links a {
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 500;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }
        .nav-links a:hover { color: var(--gold); }
        .nav-cta {
          background: linear-gradient(135deg, var(--gold), #c4923a);
          color: #0a0e17 !important;
          padding: 10px 22px;
          border-radius: 100px;
          font-weight: 600 !important;
          font-size: 0.85rem !important;
          letter-spacing: 0.02em;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(212,168,83,0.3);
        }
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          z-index: 1;
          padding: 180px 40px 100px;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold-light);
          border: 1px solid rgba(212,168,83,0.2);
          color: var(--gold);
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 28px;
          animation: fadeInDown 0.6s ease;
        }
        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
          animation: fadeInUp 0.7s ease;
        }
        .hero h1 .gold { color: var(--gold); }
        .hero p {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 640px;
          margin: 0 auto 40px;
          animation: fadeInUp 0.8s ease;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.9s ease;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          text-decoration: none;
        }
        .hero-btn.primary {
          background: linear-gradient(135deg, var(--gold), #c4923a);
          color: #0a0e17;
        }
        .hero-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(212,168,83,0.35);
        }
        .hero-btn.secondary {
          background: var(--bg-card);
          color: var(--text-primary);
          border: 1px solid var(--border-hover);
        }
        .hero-btn.secondary:hover {
          background: var(--bg-card-hover);
          border-color: var(--gold);
        }

        /* ── MACRO BANNER ── */
        .macro-banner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 20px 40px;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
          white-space: nowrap;
        }
        .macro-banner-inner {
          display: flex;
          gap: 40px;
          animation: scroll 30s linear infinite;
        }
        .macro-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          flex-shrink: 0;
        }
        .macro-item .up { color: #10b981; }
        .macro-item .down { color: #ef4444; }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── SECTION COMMON ── */
        .content-wrapper {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold-light);
          border: 1px solid rgba(212,168,83,0.2);
          color: var(--gold);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .section-heading {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .section-desc {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 600px;
          margin-bottom: 40px;
        }

        /* ── INDUSTRY NAV TABS ── */
        .industry-nav {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 8px;
          padding: 40px 40px 0;
          max-width: 1100px;
          margin: 0 auto;
          flex-wrap: wrap;
        }
        .industry-nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .industry-nav-btn:hover {
          border-color: var(--border-hover);
          background: var(--bg-card-hover);
          color: var(--text-primary);
        }

        /* ── INDUSTRY SECTION ── */
        .industry-section {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 40px;
          border-bottom: 1px solid var(--border);
        }
        .industry-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
        }
        .industry-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .industry-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .industry-tagline {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: 2px;
        }

        /* ── AUDIO PLAYER ── */
        .audio-player {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 14px 20px;
          margin-bottom: 24px;
          transition: border-color 0.2s;
        }
        .audio-player:hover { border-color: var(--border-hover); }
        .play-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--accent);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .play-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .audio-info { flex: 1; min-width: 0; }
        .audio-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .progress-track {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.08);
          border-radius: 100px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 100px;
          transition: width 0.1s linear;
        }
        .audio-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .volume-icon { flex-shrink: 0; opacity: 0.6; }

        /* ── SUBSECTIONS ── */
        .subsections {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .subsection-chip {
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 600;
          border: 1px solid;
          cursor: pointer;
          transition: all 0.2s;
        }
        .subsection-chip:hover {
          filter: brightness(1.2);
          transform: translateY(-1px);
        }

        /* ── STORY CARDS ── */
        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        .story-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 22px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .story-card:hover {
          border-color: var(--card-accent);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .story-tag {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .story-title {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.45;
          margin-bottom: 16px;
          color: var(--text-primary);
        }
        .story-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .story-time {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .story-read-more {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: gap 0.2s;
        }
        .story-read-more:hover { gap: 8px; }

        /* ── HOW TO SECTION ── */
        .howto-section {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 40px;
        }
        .howto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .howto-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.25s;
        }
        .howto-card:hover {
          border-color: var(--gold);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        }
        .howto-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--gold-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: var(--gold);
        }
        .howto-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .howto-card p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ── FAQ SECTION ── */
        .faq-section {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 40px;
        }
        .faq-item {
          border: 1px solid var(--border);
          border-radius: 14px;
          margin-bottom: 12px;
          overflow: hidden;
          cursor: pointer;
          background: var(--bg-card);
          transition: border-color 0.2s;
        }
        .faq-item:hover, .faq-item.open { border-color: var(--gold); }
        .faq-q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .faq-chevron { transition: transform 0.3s; color: var(--text-muted); }
        .faq-chevron.rotated { transform: rotate(180deg); color: var(--gold); }
        .faq-a {
          padding: 0 24px 20px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
        }

        /* ── SUBSCRIBE SECTION ── */
        .subscribe-section {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 40px;
          text-align: center;
        }
        .everything-toggle {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px 24px;
          margin-bottom: 28px;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.2s;
        }
        .everything-toggle:hover { border-color: var(--gold); }
        .toggle-track {
          width: 48px;
          height: 26px;
          border-radius: 100px;
          background: rgba(255,255,255,0.1);
          position: relative;
          flex-shrink: 0;
          transition: background 0.3s;
        }
        .toggle-track.active { background: var(--gold); }
        .toggle-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: transform 0.3s;
        }
        .toggle-track.active .toggle-thumb { transform: translateX(22px); }
        .everything-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 1rem;
          color: var(--gold);
        }
        .everything-desc {
          display: block;
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .subscribe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 12px;
          margin-bottom: 32px;
        }
        .subscribe-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 22px 14px;
          border-radius: 14px;
          background: var(--bg-card);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }
        .subscribe-card:hover { background: var(--bg-card-hover); }
        .subscribe-card.selected { background: var(--sel-light); border-color: var(--sel-accent); }
        .subscribe-card-check {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--sel-accent, rgba(255,255,255,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.7rem;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .subscribe-card.selected .subscribe-card-check { opacity: 1; }
        .subscribe-card-name {
          font-size: 0.78rem;
          font-weight: 600;
          text-align: center;
          color: var(--text-secondary);
        }
        .subscribe-card.selected .subscribe-card-name { color: var(--text-primary); }
        .format-selector { margin-bottom: 32px; }
        .format-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          margin-bottom: 14px;
        }
        .format-options {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .format-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .format-btn.active {
          background: var(--gold-light);
          border-color: var(--gold);
          color: var(--gold);
        }
        .format-btn:hover { border-color: var(--border-hover); }
        .email-row {
          display: flex;
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
        }
        .email-input-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 0 18px;
          transition: border-color 0.2s;
          color: var(--text-muted);
        }
        .email-input-wrap:focus-within { border-color: var(--gold); }
        .email-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          padding: 14px 0;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: inherit;
        }
        .email-input::placeholder { color: var(--text-muted); }
        .subscribe-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 100px;
          background: linear-gradient(135deg, var(--gold), #c4923a);
          color: #0a0e17;
          border: none;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .subscribe-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(212,168,83,0.3);
        }
        .subscribed-msg {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #10b981;
          font-weight: 600;
          font-size: 1rem;
          padding: 16px;
          background: rgba(16,185,129,0.08);
          border-radius: 100px;
          max-width: 500px;
          margin: 0 auto;
        }

        /* ── FOOTER ── */
        .footer {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 60px 40px;
          border-top: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .navbar { padding: 14px 20px; }
          .nav-links { display: none; }
          .menu-toggle { display: block; }
          .hero { padding: 140px 20px 60px; }
          .hero h1 { font-size: 2.2rem; }
          .industry-section { padding: 40px 20px; }
          .industry-nav { padding: 30px 20px 0; }
          .howto-section, .faq-section, .subscribe-section { padding: 50px 20px; }
          .stories-grid { grid-template-columns: 1fr; }
          .howto-grid { grid-template-columns: 1fr; }
          .subscribe-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); }
          .email-row { flex-direction: column; }
          .section-heading { font-size: 1.8rem; }
          .macro-banner { padding: 16px 20px; }
        }
      `}</style>

      <div className="app">
        <div className="bg-glow" />
        <div className="bg-grid" />

        {/* NAVBAR */}
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
          <div className="logo">
            <span className="logo-dot" />
            The Morning Brief
          </div>
          <ul className="nav-links">
            <li><a href="#industries">Industries</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#subscribe" className="nav-cta">Subscribe</a></li>
          </ul>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* HERO */}
        <header className="hero">
          <div className="hero-badge"><Globe size={14} /> 7 Industries. One Brief. Every Morning.</div>
          <h1>
            Your Daily<br />
            Intelligence <span className="gold">Brief</span>
          </h1>
          <p>
            Cut through the noise. The Morning Brief synthesizes top stories across technology, finance, healthcare, energy, real estate, politics, and startups — delivered as a concise audio briefing and PDF before your first coffee.
          </p>
          <div className="hero-actions">
            <a href="#subscribe" className="hero-btn primary">
              <Headphones size={18} /> Start Listening
            </a>
            <a href="#how-it-works" className="hero-btn secondary">
              <BookOpen size={18} /> How It Works
            </a>
          </div>
        </header>

        {/* MACRO BANNER */}
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

        {/* INDUSTRY NAV */}
        <div className="industry-nav" id="industries">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <a key={ind.id} href={`#${ind.id}`} className="industry-nav-btn">
                <Icon size={16} style={{ color: ind.accent }} /> {ind.name}
              </a>
            );
          })}
        </div>

        {/* INDUSTRY SECTIONS */}
        {industries.map((ind, i) => (
          <IndustrySection key={ind.id} industry={ind} index={i} />
        ))}

        {/* HOW IT WORKS */}
        <section className="howto-section" id="how-it-works">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-badge"><MousePointerClick size={14} /> Navigate Like a Pro</div>
            <h2 className="section-heading">How It Works</h2>
            <p className="section-desc" style={{ margin: "0 auto" }}>
              The Morning Brief is designed to get you informed in minutes, not hours. Here's how to make the most of it.
            </p>
          </div>
          <div className="howto-grid">
            {howToSteps.map((step, i) => (
              <div key={i} className="howto-card">
                <div className="howto-icon"><step.icon size={24} /></div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SUBSCRIBE */}
        <SubscribeSection />

        {/* FAQ */}
        <section className="faq-section" id="faq">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-badge"><HelpCircle size={14} /> Got Questions?</div>
            <h2 className="section-heading">FAQ</h2>
          </div>
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-logo">
            <span className="logo-dot" /> The Morning Brief
          </div>
          <p>Your daily intelligence brief — across every industry that matters.</p>
          <p style={{ marginTop: 8, fontSize: "0.78rem" }}>© 2026 The Morning Brief. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}