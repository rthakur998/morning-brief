import { useState, useEffect, useRef } from "react";
import {
  Cpu, TrendingUp, HeartPulse, Zap, Building2, Landmark, Rocket,
  Play, Pause, Volume2, ChevronDown, Mail, Check,
  ArrowRight, Headphones, FileText, Sparkles, Menu, X, Clock,
  Globe, BarChart3, BookOpen, HelpCircle, MousePointerClick,
  Star, Bell, Download, Eye, Layers, AudioLines, ExternalLink, VolumeX
} from "lucide-react";

/* ───────────────────── INDUSTRY DATA ───────────────────── */
const industries = [
  {
    id: "tech", name: "Technology & AI", icon: Cpu, accent: "#3b82f6", accentLight: "rgba(59,130,246,0.12)",
    tagline: "Silicon Valley to Shenzhen \u2014 decoded daily",
    subsections: ["Artificial Intelligence", "Cloud & Infrastructure", "Cybersecurity", "Consumer Tech"],
    pdf: "/pdfs/brevity-tech-brief.pdf",
    stories: [
      { title: "OpenAI Surpasses $25B in Annualized Revenue, Eyes Late-2026 IPO", tag: "AI", sub: "Artificial Intelligence", time: "2h ago", url: "https://www.techi.com/openai-ipo/", source: "Techi", summary: "OpenAI has crossed $25B in annualized revenue with 900M+ weekly active users. An S-1 filing is expected in Q3 2026." },
      { title: "GPT-5.4 Released: 1M Token Context, Autonomous Workflows", tag: "AI", sub: "Artificial Intelligence", time: "3h ago", url: "https://developers.openai.com/api/docs/changelog", source: "OpenAI", summary: "Scores 75% on real-world desktop productivity tasks, surpassing the 72.4% human baseline." },
      { title: "Qblox Launches U.S. Manufacturing for Quantum Control Systems", tag: "Cloud", sub: "Cloud & Infrastructure", time: "4h ago", url: "https://quantumcomputingreport.com/news/", source: "QC Report", summary: "Through a partnership with Prodrive Technologies, shipping 'Made in America' quantum systems from Massachusetts." },
      { title: "Hyperscale AI Data Centers Push Infrastructure to Its Limits", tag: "Cloud", sub: "Cloud & Infrastructure", time: "5h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "The AI race has supercharged data centers into synchronized clusters working like giant supercomputers." },
      { title: "AI Governance Emerges as Top Cybersecurity Priority for 2026", tag: "Cyber", sub: "Cybersecurity", time: "5h ago", url: "https://www.cybersecuritydive.com/news/5-cybersecurity-trends-2026/810354/", source: "Cybersecurity Dive", summary: "AI risk jumped to the second-leading business concern. Shadow AI creates attack surfaces most orgs don't know about." },
      { title: "State-Sponsored Actors Deploy Kernel Implants for Espionage", tag: "Cyber", sub: "Cybersecurity", time: "6h ago", url: "https://www.securityweek.com/", source: "SecurityWeek", summary: "China-nexus actor gains long-term access to government agencies using passive backdoors and kernel implants." },
      { title: "Apple Requires iOS 26 SDK for All New App Store Submissions", tag: "Consumer", sub: "Consumer Tech", time: "4h ago", url: "https://developer.apple.com/news/", source: "Apple", summary: "Starting April 28, all apps must use the iOS 26 SDK with Liquid Glass and the Foundation Models framework." },
      { title: "Apple Removes 'Anything' App in Vibe-Coding Crackdown", tag: "Consumer", sub: "Consumer Tech", time: "7h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "Apple escalates enforcement against AI-generated apps, signaling tension with vibe-coding builders." },
    ],
  },
  {
    id: "finance", name: "Finance & Markets", icon: TrendingUp, accent: "#10b981", accentLight: "rgba(16,185,129,0.12)",
    tagline: "Markets, macro, and money moves",
    subsections: ["Equities & Indices", "Fixed Income", "Commodities", "Crypto & Digital Assets"],
    pdf: "/pdfs/brevity-finance-brief.pdf",
    stories: [
      { title: "Fed Holds Rates at 3.5%-3.75%, Projects Single 2026 Cut", tag: "Macro", sub: "Fixed Income", time: "1h ago", url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260318a.htm", source: "Federal Reserve", summary: "FOMC voted 11-1 to hold rates. Dot plot shows one cut this year, down from two previously expected." },
      { title: "S&P 500 Falls as Powell Warns Inflation Not Declining Fast Enough", tag: "Equities", sub: "Equities & Indices", time: "2h ago", url: "https://www.chase.com/personal/investments/learning-and-insights/article/march-2026-federal-reserve-holds-interest-rates-steady", source: "Chase", summary: "Markets sold off as the Fed revised its 2026 inflation forecast upward to 2.7% from 2.5%." },
      { title: "SoftBank Secures $40B Bridge Loan for OpenAI Commitment", tag: "Deals", sub: "Equities & Indices", time: "3h ago", url: "https://www.techi.com/openai-ipo/", source: "Techi", summary: "JPMorgan and Goldman Sachs arranged a 12-month unsecured loan, signaling confidence in an OpenAI IPO." },
      { title: "February CPI Holds at 2.4%, Core at 2.5% Year-Over-Year", tag: "Macro", sub: "Fixed Income", time: "4h ago", url: "https://www.chase.com/personal/investments/learning-and-insights/article/march-2026-federal-reserve-holds-interest-rates-steady", source: "Chase", summary: "Inflation pace has moderated since September 2025 but remains above the Fed's 2% target." },
      { title: "Oil Prices Surge Amid Iran Conflict, Complicating Rate Path", tag: "Oil", sub: "Commodities", time: "5h ago", url: "https://www.foxbusiness.com/economy/federal-reserve-interest-rate-decision-march-18-2026", source: "Fox Business", summary: "Iran conflict drives gas prices to multi-year highs, threatening to reignite inflationary pressures." },
      { title: "Bitcoin Holds Above $150K Despite Risk-Off Sentiment", tag: "Crypto", sub: "Crypto & Digital Assets", time: "6h ago", url: "https://www.chase.com/personal/investments/learning-and-insights/article/march-2026-federal-reserve-holds-interest-rates-steady", source: "Chase", summary: "Institutional ETF inflows provide structural support despite the challenging macro backdrop." },
    ],
  },
  {
    id: "health", name: "Healthcare & Biotech", icon: HeartPulse, accent: "#f43f5e", accentLight: "rgba(244,63,94,0.12)",
    tagline: "Breakthroughs from bench to bedside",
    subsections: ["Drug Development", "Digital Health", "Genomics", "Health Policy"],
    pdf: "/pdfs/brevity-health-brief.pdf",
    stories: [
      { title: "Personalized Gene-Editing Treatment Advances to Clinical Trial", tag: "Genomics", sub: "Genomics", time: "2h ago", url: "https://www.nature.com/articles/d41586-025-03566-8", source: "Nature", summary: "Baby KJ became the first to receive a personalized gene-editing treatment. A formal trial is now planned." },
      { title: "Extinct DNA Banks Yield Clues for New Medical Treatments", tag: "Genomics", sub: "Genomics", time: "4h ago", url: "https://www.sciencedaily.com/releases/2026/02/260218031603.htm", source: "ScienceDaily", summary: "Growing banks of genetic info from extinct creatures are providing clues to new treatments." },
      { title: "AI Diagnostics Named Among 2026 Breakthrough Technologies", tag: "Digital", sub: "Digital Health", time: "5h ago", url: "https://www.science.org/content/article/gene-editing-therapy-made-just-6-months-helps-baby-life-threatening-disease", source: "Science", summary: "AI-powered diagnostic tools have achieved specialist-level accuracy across multiple domains." },
      { title: "AI Chatbot Companion Risks Draw Policy Action", tag: "Policy", sub: "Health Policy", time: "6h ago", url: "https://www.scientificamerican.com/article/gene-editing-helped-one-baby-could-it-help-thousands/", source: "Scientific American", summary: "Mounting evidence of dangers from AI companion chatbots prompts regulatory action." },
      { title: "Embryo Screening Startups Make Bold Genetic Prediction Claims", tag: "Policy", sub: "Health Policy", time: "7h ago", url: "https://www.nature.com/articles/d41586-025-03566-8", source: "Nature", summary: "New startups claim they can predict traits including intelligence using genetic screening." },
      { title: "Stryker Restores Manufacturing After Cyberattack", tag: "Pharma", sub: "Drug Development", time: "8h ago", url: "https://www.cybersecuritydive.com/", source: "Cybersecurity Dive", summary: "The medtech company has been working to restore operations since a cyberattack on March 11." },
    ],
  },
  {
    id: "energy", name: "Energy & Climate", icon: Zap, accent: "#f59e0b", accentLight: "rgba(245,158,11,0.12)",
    tagline: "Powering the transition, tracking the grid",
    subsections: ["Renewables", "Oil & Gas", "Carbon Markets", "Grid & Storage"],
    pdf: "/pdfs/brevity-energy-brief.pdf",
    stories: [
      { title: "Sodium-Ion Batteries Emerge as Game-Changing Lithium Alternative", tag: "Storage", sub: "Grid & Storage", time: "1h ago", url: "https://electrek.co/2026/03/25/sodium-ion-ev-battery-delivers-11-min-charging-450-km-range/", source: "Electrek", summary: "CATL and BAIC announce sodium-ion battery breakthroughs with 170+ Wh/kg density, nearing LFP parity." },
      { title: "Nuclear Renaissance: New Reactor Designs Promise Faster Deployment", tag: "Nuclear", sub: "Carbon Markets", time: "3h ago", url: "https://www.ans.org/news/2025-11-14/article-7543/the-progress-so-far-an-update-on-the-reactor-pilot-program/", source: "ANS Nuclear Newswire", summary: "DOE highlights advanced reactor designs using molten salt and TRISO fuel for faster zero-emission deployment." },
      { title: "Oil Prices Surge on Middle East Conflict", tag: "Oil", sub: "Oil & Gas", time: "5h ago", url: "https://www.foxbusiness.com/economy/federal-reserve-interest-rate-decision-march-18-2026", source: "Fox Business", summary: "Iran conflict drives gas prices to their highest level in years, complicating the energy transition." },
      { title: "Oil Futures Price in Lower Crude by Late 2026", tag: "Oil", sub: "Oil & Gas", time: "6h ago", url: "https://www.chase.com/personal/investments/learning-and-insights/article/march-2026-federal-reserve-holds-interest-rates-steady", source: "Chase", summary: "Markets expect eventual stabilization in the Middle East despite near-term price spikes." },
      { title: "AI Coding Tools Accelerate Clean Energy Software Development", tag: "Solar", sub: "Renewables", time: "7h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "Rapid prototyping of grid management software and solar farm optimization is speeding deployment." },
      { title: "OpenAI Partners with DOE on AI-Powered Scientific Discovery", tag: "Grid", sub: "Grid & Storage", time: "8h ago", url: "https://openai.com/index/us-department-of-energy-collaboration/", source: "OpenAI", summary: "Frontier AI models meet national lab expertise to accelerate energy science breakthroughs." },
    ],
  },
  {
    id: "realestate", name: "Real Estate", icon: Building2, accent: "#8b5cf6", accentLight: "rgba(139,92,246,0.12)",
    tagline: "Commercial, residential, and everything in between",
    subsections: ["Commercial", "Residential", "REITs", "PropTech"],
    pdf: "/pdfs/brevity-realestate-brief.pdf",
    stories: [
      { title: "OpenAI Expands 1M+ Sq Ft Office Footprint in San Francisco", tag: "Commercial", sub: "Commercial", time: "2h ago", url: "https://www.sfexaminer.com/news/technology/why-openai-faces-massively-critical-year-ahead-in-2026/article_6112d59f-28b5-4770-bde1-b333deb5f01a.html", source: "SF Examiner", summary: "Workforce expected to surpass 6,000 in Q2, driving major CRE expansion in the city." },
      { title: "Defense Tech Boom Creates Industrial Real Estate Demand", tag: "Commercial", sub: "Commercial", time: "3h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "Saronic's $9.25B valuation signals massive manufacturing and R&D facility demand." },
      { title: "Rate Pause Keeps Mortgage Rates Elevated, Housing in Limbo", tag: "Residential", sub: "Residential", time: "4h ago", url: "https://www.chase.com/personal/investments/learning-and-insights/article/march-2026-federal-reserve-holds-interest-rates-steady", source: "Chase", summary: "Fed holding at 3.5%-3.75% with one cut expected keeps housing supply-constrained." },
      { title: "Data Center REITs Surge on AI Infrastructure Demand", tag: "REITs", sub: "REITs", time: "5h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "Hyperscale AI data centers push REIT valuations higher with long-term premium leases." },
      { title: "AI Data Centers Reshape Commercial Real Estate Landscape", tag: "PropTech", sub: "PropTech", time: "6h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "Convergence of AI demand, power constraints, and cooling needs creates a new asset class." },
    ],
  },
  {
    id: "politics", name: "Politics & Policy", icon: Landmark, accent: "#ef4444", accentLight: "rgba(239,68,68,0.12)",
    tagline: "Policy shifts that move markets and industries",
    subsections: ["U.S. Policy", "Global Affairs", "Regulation", "Trade & Tariffs"],
    pdf: "/pdfs/brevity-politics-brief.pdf",
    stories: [
      { title: "Powell Resists White House Pressure, Vows to Stay Through Probe", tag: "Policy", sub: "U.S. Policy", time: "1h ago", url: "https://www.foxbusiness.com/economy/federal-reserve-interest-rate-decision-march-18-2026", source: "Fox Business", summary: "Fed Chair says he has no intention of leaving until the investigation concludes with transparency." },
      { title: "New National Cybersecurity Strategy Expected from White House", tag: "Policy", sub: "U.S. Policy", time: "3h ago", url: "https://federalnewsnetwork.com/cybersecurity/2026/01/five-things-to-watch-in-cybersecurity-for-2026/", source: "Federal News Network", summary: "National Cyber Director indicates the strategy will be concise and actionable." },
      { title: "Iran Conflict Dominates Fed Policy and Global Market Outlook", tag: "Global", sub: "Global Affairs", time: "3h ago", url: "https://www.foxbusiness.com/economy/federal-reserve-interest-rate-decision-march-18-2026", source: "Fox Business", summary: "War's impact on the Strait of Hormuz has roiled oil markets and complicated forecasting." },
      { title: "UK Commits \u00a32 Billion to National Quantum Strategy", tag: "Regulation", sub: "Regulation", time: "5h ago", url: "https://quantumcomputingreport.com/news/", source: "QC Report", summary: "Includes a world-first \u00a31B procurement programme to buy quantum computers directly." },
      { title: "AI Governance Becomes Top Regulatory Priority Globally", tag: "Regulation", sub: "Regulation", time: "6h ago", url: "https://www.cybersecuritydive.com/news/5-cybersecurity-trends-2026/810354/", source: "Cybersecurity Dive", summary: "Companies rushing to deploy AI ahead of any formal governance frameworks." },
      { title: "56% of European AI Startups Consider Leaving Over Policy Gaps", tag: "Trade", sub: "Trade & Tariffs", time: "7h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "Europe's innovation gap, high power costs, and fragmented systems push founders elsewhere." },
    ],
  },
  {
    id: "startups", name: "Startups & VC", icon: Rocket, accent: "#0ea5e9", accentLight: "rgba(14,165,233,0.12)",
    tagline: "Funding rounds, founders, and the future",
    subsections: ["Seed & Series A", "Growth Stage", "IPOs & Exits", "VC Trends"],
    pdf: "/pdfs/brevity-startups-brief.pdf",
    stories: [
      { title: "Defense Tech Startup Saronic Closes $1.75B at $9.25B Valuation", tag: "Growth", sub: "Growth Stage", time: "2h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "Autonomous shipbuilder's mega-round signals defense tech is a first-tier venture category." },
      { title: "ElevenLabs Reaches $11B Valuation After $500M Raise", tag: "Growth", sub: "Growth Stage", time: "3h ago", url: "https://voice.ai/hub/ai-voice-agents/elevenlabs-news-today/", source: "Voice.ai", summary: "AI voice synthesis company serves 1M+ creators, launched Eleven v3 expressive model in early 2026." },
      { title: "Anthropic Nears $19B Revenue, May File S-1 by Mid-2026", tag: "IPO", sub: "IPOs & Exits", time: "4h ago", url: "https://www.techi.com/openai-ipo/", source: "Techi", summary: "If Anthropic files first, OpenAI is expected to accelerate its own IPO timeline." },
      { title: "OpenAI IPO Expected Q4 2026 or Q1 2027", tag: "IPO", sub: "IPOs & Exits", time: "5h ago", url: "https://www.techi.com/openai-ipo/", source: "Techi", summary: "SoftBank's $40B bridge loan structure suggests banks expect an IPO as the liquidity event." },
      { title: "AI Coding Tools Lower Barriers for First-Time Founders", tag: "Seed", sub: "Seed & Series A", time: "6h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "Record solo founders leveraging AI to build MVPs faster than ever before." },
      { title: "56% of European AI Startups Consider Relocating for Funding", tag: "VC", sub: "VC Trends", time: "7h ago", url: "https://techstartups.com/2026/03/31/top-tech-news-today-march-31-2026/", source: "Tech Startups", summary: "AWS data shows European startups eyeing departures for better funding and lower costs." },
    ],
  },
];

const faqs = [
  { q: "What is Brevity?", a: "Brevity is a daily intelligence platform that synthesizes the most important news across 7 major industries into concise audio briefings and PDF summaries. Think of it as your personalized newsroom \u2014 delivered every morning before 7 AM." },
  { q: "How long are the audio briefings?", a: "Each industry briefing is 5\u201310 minutes. The full cross-industry 'Everything Brief' runs about 20\u201325 minutes \u2014 perfect for a morning commute." },
  { q: "Can I customize what I receive?", a: "Absolutely. Choose specific industries, subsections, or opt into the full package. You control the format too \u2014 audio, PDF, or both." },
  { q: "Is Brevity free?", a: "We offer a free tier with access to 2 industry briefings per day. Premium subscribers get unlimited access, the Everything Brief, and early delivery." },
  { q: "How is this different from other newsletters?", a: "We don\u2019t just aggregate headlines. Our briefings are synthesized narratives with context, connecting dots across industries. Plus, audio-first delivery means you can consume it hands-free." },
  { q: "What time are briefings delivered?", a: "Premium briefings land by 6 AM ET. Free tier briefings are available by 8 AM ET." },
];

const howToSteps = [
  { icon: Eye, title: "Browse Industries", desc: "Scroll through 7 industry sections, each with curated top stories and subsections." },
  { icon: Headphones, title: "Listen to Briefings", desc: "Hit play on any section to hear a concise audio summary of the day\u2019s key developments." },
  { icon: Layers, title: "Explore Subsections", desc: "Click subsection tags to filter stories by topic within each industry." },
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
    if (playing) { interval = setInterval(() => { setProgress((p) => { if (p >= 100) { setPlaying(false); return 0; } return p + 0.5; }); }, 100); }
    return () => clearInterval(interval);
  }, [playing]);
  return (
    <div className="audio-player" style={{ "--accent": industry.accent, "--accent-light": industry.accentLight }}>
      <button className="play-btn" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}>
        {playing ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
      </button>
      <div className="audio-info">
        <span className="audio-label"><AudioLines size={14} /> Today's {industry.name} Brief</span>
        <div className="progress-track" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX - r.left) / r.width) * 100); }} style={{ cursor: "pointer" }}>
          <div className="progress-fill" style={{ width: progress + "%", background: industry.accent }} />
        </div>
        <div className="audio-meta">
          <span>{Math.floor((progress / 100) * 8)}:{String(Math.floor(((progress / 100) * 480) % 60)).padStart(2, "0")}</span>
          <span>8:00</span>
        </div>
      </div>
      <button onClick={() => setMuted(!muted)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        {muted ? <VolumeX size={18} style={{ color: industry.accent, opacity: 0.6 }} /> : <Volume2 size={18} style={{ color: industry.accent, opacity: 0.6 }} />}
      </button>
    </div>
  );
}

/* ───────────────────── INDUSTRY SECTION ───────────────────── */
function IndustrySection({ industry }) {
  const Icon = industry.icon;
  const [activeSub, setActiveSub] = useState(null);
  const filtered = activeSub ? industry.stories.filter(s => s.sub === activeSub) : industry.stories;

  return (
    <section className="industry-section" id={industry.id}>
      <div className="industry-header">
        <div className="industry-icon-wrap" style={{ background: industry.accentLight }}>
          <Icon size={28} style={{ color: industry.accent }} strokeWidth={1.8} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="industry-title">{industry.name}</h2>
          <p className="industry-tagline">{industry.tagline}</p>
        </div>
        <a href={industry.pdf} download className="pdf-download-btn" style={{ "--accent": industry.accent, "--accent-light": industry.accentLight }}>
          <Download size={16} /> PDF Brief
        </a>
      </div>
      <AudioPlayer industry={industry} />
      <div className="subsections">
        <span className={"subsection-chip " + (!activeSub ? "chip-active" : "")} style={{ borderColor: industry.accent, color: !activeSub ? "white" : industry.accent, background: !activeSub ? industry.accent : industry.accentLight }} onClick={() => setActiveSub(null)}>All</span>
        {industry.subsections.map((sub) => (
          <span key={sub} className={"subsection-chip " + (activeSub === sub ? "chip-active" : "")} style={{ borderColor: industry.accent, color: activeSub === sub ? "white" : industry.accent, background: activeSub === sub ? industry.accent : industry.accentLight }} onClick={() => setActiveSub(activeSub === sub ? null : sub)}>{sub}</span>
        ))}
      </div>
      <div className="stories-grid">
        {filtered.map((story, i) => (
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
      {activeSub && filtered.length === 0 && <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 40 }}>No stories in this subsection today.</p>}
    </section>
  );
}

/* ───────────────────── FAQ ───────────────────── */
function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"faq-item " + (open ? "open" : "")} onClick={() => setOpen(!open)}>
      <div className="faq-q"><span>{faq.q}</span><ChevronDown size={20} className={"faq-chevron " + (open ? "rotated" : "")} /></div>
      {open && <p className="faq-a">{faq.a}</p>}
    </div>
  );
}

/* ───────────────────── SUBSCRIBE ───────────────────── */
function SubscribeSection() {
  const [selected, setSelected] = useState([]);
  const [format, setFormat] = useState("both");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [everything, setEverything] = useState(false);
  const [emailError, setEmailError] = useState("");
  const toggleIndustry = (id) => { if (everything) return; setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]); };
  const toggleEverything = () => { setEverything(!everything); if (!everything) { setSelected(industries.map((i) => i.id)); } else { setSelected([]); } };
  const handleSubscribe = () => { setEmailError(""); if (!email) { setEmailError("Please enter your email."); return; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError("Please enter a valid email."); return; } if (selected.length === 0) { setEmailError("Select at least one industry."); return; } setSubscribed(true); };
  return (
    <section className="subscribe-section" id="subscribe">
      <div className="section-badge"><Bell size={14} /> Personalize Your Brief</div>
      <h2 className="section-heading">Subscribe to What Matters</h2>
      <p className="section-desc">Choose the industries you care about, pick your delivery format, and wake up every morning to a personalized briefing.</p>
      <div className="everything-toggle" onClick={toggleEverything}>
        <div className={"toggle-track " + (everything ? "active" : "")}><div className="toggle-thumb" /></div>
        <div><span className="everything-label"><Sparkles size={16} /> The Everything Brief</span><span className="everything-desc">Get all 7 industries in one comprehensive audio + PDF</span></div>
      </div>
      <div className="subscribe-grid">
        {industries.map((ind) => { const I = ind.icon; const sel = selected.includes(ind.id); return (
          <div key={ind.id} className={"subscribe-card " + (sel ? "selected" : "")} style={{ "--sel-accent": ind.accent, "--sel-light": ind.accentLight, borderColor: sel ? ind.accent : "transparent" }} onClick={() => toggleIndustry(ind.id)}>
            <div className="subscribe-card-check">{sel && <Check size={14} />}</div>
            <I size={24} style={{ color: sel ? ind.accent : "var(--text-muted)" }} /><span className="subscribe-card-name">{ind.name}</span>
          </div>); })}
      </div>
      <div className="format-selector"><h3 className="format-title">Delivery Format</h3><div className="format-options">
        {[{ id: "audio", label: "Audio Only", icon: Headphones }, { id: "pdf", label: "PDF Only", icon: FileText }, { id: "both", label: "Audio + PDF", icon: Sparkles }].map((f) => (
          <button key={f.id} className={"format-btn " + (format === f.id ? "active" : "")} onClick={() => setFormat(f.id)}><f.icon size={18} />{f.label}</button>))}
      </div></div>
      {!subscribed ? (<><div className="email-row"><div className="email-input-wrap"><Mail size={18} /><input type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} className="email-input" onKeyDown={(e) => e.key === "Enter" && handleSubscribe()} /></div><button className="subscribe-btn" onClick={handleSubscribe}>Subscribe <ArrowRight size={16} /></button></div>{emailError && <p style={{ color: "#f43f5e", fontSize: "0.85rem", marginTop: 10, textAlign: "center" }}>{emailError}</p>}</>) : (<div className="subscribed-msg"><Check size={20} /><span>You're in! Check your inbox for confirmation.</span></div>)}
    </section>
  );
}

/* ───────────────────── HEALTHCARE PAGE ───────────────────── */
function HealthcarePage({ onBack }) {
  const health = industries.find((i) => i.id === "health");
  const [activeSub, setActiveSub] = useState(null);
  const filtered = activeSub ? health.stories.filter((s) => s.sub === activeSub) : health.stories;

  return (
    <div className="app">
      <div className="bg-glow" /><div className="bg-grid" />
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "120px 40px 80px" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: 100, padding: "8px 18px", fontSize: ".85rem", fontWeight: 500, cursor: "pointer", marginBottom: 40, transition: "all .2s" }}
          onMouseOver={(e) => e.currentTarget.style.color = "var(--text-primary)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
          ← Back to Home
        </button>
        <div className="industry-header">
          <div className="industry-icon-wrap" style={{ background: health.accentLight }}>
            <HeartPulse size={28} style={{ color: health.accent }} strokeWidth={1.8} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="industry-title">{health.name}</h2>
            <p className="industry-tagline">{health.tagline}</p>
          </div>
          <a href={health.pdf} download className="pdf-download-btn" style={{ "--accent": health.accent, "--accent-light": health.accentLight }}>
            <Download size={16} /> PDF Brief
          </a>
        </div>
        <AudioPlayer industry={health} />
        <div className="subsections">
          <span className={"subsection-chip " + (!activeSub ? "chip-active" : "")} style={{ borderColor: health.accent, color: !activeSub ? "white" : health.accent, background: !activeSub ? health.accent : health.accentLight }} onClick={() => setActiveSub(null)}>All</span>
          {health.subsections.map((sub) => (
            <span key={sub} className={"subsection-chip " + (activeSub === sub ? "chip-active" : "")} style={{ borderColor: health.accent, color: activeSub === sub ? "white" : health.accent, background: activeSub === sub ? health.accent : health.accentLight }} onClick={() => setActiveSub(activeSub === sub ? null : sub)}>{sub}</span>
          ))}
        </div>
        <div className="stories-grid">
          {filtered.map((story, i) => (
            <a key={i} href={story.url} target="_blank" rel="noopener noreferrer" className="story-card" style={{ "--card-accent": health.accent, textDecoration: "none" }}>
              <div className="story-tag" style={{ background: health.accentLight, color: health.accent }}>{story.tag}</div>
              <h3 className="story-title">{story.title}</h3>
              <p className="story-summary">{story.summary}</p>
              <div className="story-footer">
                <span className="story-time"><Clock size={13} /> {story.time}</span>
                <span className="story-source">{story.source}</span>
                <span className="story-read-more" style={{ color: health.accent }}>Read <ExternalLink size={13} /></span>
              </div>
            </a>
          ))}
        </div>
        {activeSub && filtered.length === 0 && <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 40 }}>No stories in this subsection today.</p>}
      </section>
    </div>
  );
}

/* ───────────────────── MOBILE MENU ───────────────────── */
function MobileMenu({ open, onClose, onHealthcare }) {
  if (!open) return null;
  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header"><div className="logo"><span className="logo-dot" />Brevity</div><button className="mobile-close-btn" onClick={onClose}><X size={24} /></button></div>
        <ul className="mobile-menu-links">
          <li><a href="#industries" onClick={onClose}>Industries</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); onHealthcare(); }}>Healthcare</a></li>
          <li><a href="#how-it-works" onClick={onClose}>How It Works</a></li>
          <li><a href="#faq" onClick={onClose}>FAQ</a></li>
          <li><a href="#subscribe" onClick={onClose} className="mobile-cta">Subscribe</a></li>
        </ul>
        <div className="mobile-menu-industries"><p className="mobile-menu-label">Jump to Industry</p>
          {industries.map((ind) => { const I = ind.icon; return (<a key={ind.id} href={"#" + ind.id} className="mobile-industry-link" onClick={onClose}><I size={16} style={{ color: ind.accent }} /> {ind.name}</a>); })}
        </div>
      </nav>
    </div>
  );
}

/* ───────────────────── MAIN APP ───────────────────── */
export default function MorningBrief() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);

  if (currentPage === "healthcare") {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
          :root{--bg-primary:#0a0e17;--bg-secondary:#111827;--bg-card:#161e2e;--bg-card-hover:#1c2740;--border:rgba(255,255,255,0.06);--border-hover:rgba(255,255,255,0.12);--text-primary:#f1f5f9;--text-secondary:#94a3b8;--text-muted:#64748b;--gold:#d4a853;--gold-light:rgba(212,168,83,0.12);}
          *{margin:0;padding:0;box-sizing:border-box;} .app{font-family:'DM Sans',sans-serif;background:var(--bg-primary);color:var(--text-primary);min-height:100vh;overflow-x:hidden;}
          .bg-glow{position:fixed;top:-300px;left:50%;transform:translateX(-50%);width:900px;height:900px;background:radial-gradient(circle,rgba(244,63,94,0.06) 0%,transparent 70%);pointer-events:none;z-index:0;}
          .bg-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;z-index:0;}
          .navbar{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 40px;display:flex;align-items:center;justify-content:space-between;transition:all .3s;backdrop-filter:blur(20px);background:rgba(10,14,23,0.92);border-bottom:1px solid var(--border);}
          .logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;letter-spacing:-0.02em;display:flex;align-items:center;gap:10px;color:var(--text-primary);text-decoration:none;cursor:pointer;}
          .logo-dot{width:10px;height:10px;background:var(--gold);border-radius:50%;display:inline-block;box-shadow:0 0 12px rgba(212,168,83,0.5);}
          .nav-links{display:flex;gap:32px;align-items:center;list-style:none;} .nav-links a{text-decoration:none;color:var(--text-secondary);font-size:.88rem;font-weight:500;transition:color .2s;cursor:pointer;} .nav-links a:hover{color:var(--gold);}
          .nav-active{color:var(--gold)!important;}
          .nav-cta{background:linear-gradient(135deg,var(--gold),#c4923a);color:#0a0e17!important;padding:10px 22px;border-radius:100px;font-weight:600!important;font-size:.85rem!important;}
          .industry-header{display:flex;align-items:center;gap:18px;margin-bottom:24px;flex-wrap:wrap;}
          .industry-icon-wrap{width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .industry-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;letter-spacing:-0.01em;} .industry-tagline{color:var(--text-muted);font-size:.9rem;margin-top:2px;}
          .pdf-download-btn{display:flex;align-items:center;gap:6px;padding:8px 18px;border-radius:100px;background:var(--accent-light);color:var(--accent);border:1px solid var(--accent);font-size:.82rem;font-weight:600;cursor:pointer;transition:all .2s;text-decoration:none;margin-left:auto;} .pdf-download-btn:hover{background:var(--accent);color:white;}
          .audio-player{display:flex;align-items:center;gap:14px;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:14px 20px;margin-bottom:24px;}
          .play-btn{width:42px;height:42px;border-radius:50%;background:var(--accent);border:none;color:white;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:transform .15s;} .play-btn:hover{transform:scale(1.08);}
          .audio-info{flex:1;min-width:0;} .audio-label{display:flex;align-items:center;gap:6px;font-size:.82rem;font-weight:600;color:var(--text-primary);margin-bottom:8px;}
          .progress-track{width:100%;height:4px;background:rgba(255,255,255,0.08);border-radius:100px;overflow:hidden;} .progress-fill{height:100%;border-radius:100px;transition:width .1s linear;}
          .audio-meta{display:flex;justify-content:space-between;font-size:.72rem;color:var(--text-muted);margin-top:4px;}
          .subsections{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;}
          .subsection-chip{padding:6px 14px;border-radius:100px;font-size:.78rem;font-weight:600;border:1px solid;cursor:pointer;transition:all .2s;user-select:none;}
          .stories-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;}
          a.story-card{background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:22px;cursor:pointer;transition:all .25s;display:block;color:inherit;text-decoration:none;} a.story-card:hover{border-color:var(--card-accent);transform:translateY(-3px);box-shadow:0 8px 32px rgba(0,0,0,0.3);}
          .story-tag{display:inline-block;padding:4px 10px;border-radius:6px;font-size:.72rem;font-weight:700;letter-spacing:.03em;text-transform:uppercase;margin-bottom:12px;}
          .story-title{font-size:1rem;font-weight:600;line-height:1.45;margin-bottom:8px;color:var(--text-primary);}
          .story-summary{font-size:.85rem;color:var(--text-secondary);line-height:1.55;margin-bottom:16px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
          .story-footer{display:flex;align-items:center;justify-content:space-between;gap:8px;} .story-time{display:flex;align-items:center;gap:5px;font-size:.78rem;color:var(--text-muted);} .story-source{font-size:.72rem;color:var(--text-muted);font-weight:500;} .story-read-more{display:flex;align-items:center;gap:4px;font-size:.82rem;font-weight:600;} a.story-card:hover .story-read-more{gap:8px;}
          @media(max-width:768px){.navbar{padding:14px 20px;} section{padding:100px 20px 60px!important;} .stories-grid{grid-template-columns:1fr;} .industry-header{flex-wrap:wrap;} .pdf-download-btn{margin-left:0;}}
        `}</style>
        <div className="app">
          <div className="bg-glow" /><div className="bg-grid" />
          <nav className="navbar">
            <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); }}><span className="logo-dot" />Brevity</a>
            <ul className="nav-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); }}>Industries</a></li>
              <li><a href="#" className="nav-active" onClick={(e) => e.preventDefault()}>Healthcare</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); window.setTimeout(() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }), 100); }}>How It Works</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); window.setTimeout(() => document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="nav-cta">Subscribe</a></li>
            </ul>
          </nav>
          <HealthcarePage onBack={() => setCurrentPage("home")} />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        :root { --bg-primary:#0a0e17;--bg-secondary:#111827;--bg-card:#161e2e;--bg-card-hover:#1c2740;--border:rgba(255,255,255,0.06);--border-hover:rgba(255,255,255,0.12);--text-primary:#f1f5f9;--text-secondary:#94a3b8;--text-muted:#64748b;--gold:#d4a853;--gold-light:rgba(212,168,83,0.12); }
        *{margin:0;padding:0;box-sizing:border-box;} .app{font-family:'DM Sans',sans-serif;background:var(--bg-primary);color:var(--text-primary);min-height:100vh;overflow-x:hidden;}
        .bg-glow{position:fixed;top:-300px;left:50%;transform:translateX(-50%);width:900px;height:900px;background:radial-gradient(circle,rgba(212,168,83,0.06) 0%,transparent 70%);pointer-events:none;z-index:0;}
        .bg-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;z-index:0;}
        .navbar{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 40px;display:flex;align-items:center;justify-content:space-between;transition:all .3s;backdrop-filter:blur(20px);background:rgba(10,14,23,0.7);border-bottom:1px solid transparent;}
        .navbar.scrolled{padding:12px 40px;background:rgba(10,14,23,0.92);border-bottom:1px solid var(--border);}
        .logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;letter-spacing:-0.02em;display:flex;align-items:center;gap:10px;color:var(--text-primary);text-decoration:none;cursor:pointer;}
        .logo-dot{width:10px;height:10px;background:var(--gold);border-radius:50%;display:inline-block;box-shadow:0 0 12px rgba(212,168,83,0.5);}
        .nav-links{display:flex;gap:32px;align-items:center;list-style:none;} .nav-links a{text-decoration:none;color:var(--text-secondary);font-size:.88rem;font-weight:500;transition:color .2s;} .nav-links a:hover{color:var(--gold);}
        .nav-cta{background:linear-gradient(135deg,var(--gold),#c4923a);color:#0a0e17!important;padding:10px 22px;border-radius:100px;font-weight:600!important;font-size:.85rem!important;transition:transform .2s,box-shadow .2s;} .nav-cta:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(212,168,83,0.3);}
        .menu-toggle{display:none;background:none;border:none;color:var(--text-primary);cursor:pointer;}
        .mobile-menu-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:200;animation:fadeIn .2s;} .mobile-menu{position:fixed;top:0;right:0;width:min(360px,85vw);height:100vh;background:var(--bg-secondary);border-left:1px solid var(--border);padding:20px;overflow-y:auto;animation:slideIn .3s;}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}} @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .mobile-menu-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;padding-bottom:16px;border-bottom:1px solid var(--border);} .mobile-close-btn{background:none;border:none;color:var(--text-primary);cursor:pointer;padding:8px;}
        .mobile-menu-links{list-style:none;display:flex;flex-direction:column;gap:4px;margin-bottom:28px;} .mobile-menu-links a{display:block;padding:14px 16px;text-decoration:none;color:var(--text-primary);font-size:1rem;font-weight:500;border-radius:10px;transition:background .2s;} .mobile-menu-links a:hover{background:var(--bg-card);}
        .mobile-cta{background:linear-gradient(135deg,var(--gold),#c4923a)!important;color:#0a0e17!important;font-weight:600!important;text-align:center;border-radius:100px!important;margin-top:8px;}
        .mobile-menu-label{font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px;} .mobile-menu-industries{padding-top:20px;border-top:1px solid var(--border);}
        .mobile-industry-link{display:flex;align-items:center;gap:10px;padding:10px 12px;text-decoration:none;color:var(--text-secondary);font-size:.88rem;border-radius:8px;transition:all .2s;} .mobile-industry-link:hover{background:var(--bg-card);color:var(--text-primary);}
        .hero{position:relative;z-index:1;padding:180px 40px 100px;text-align:center;max-width:900px;margin:0 auto;}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--gold-light);border:1px solid rgba(212,168,83,0.2);color:var(--gold);padding:8px 18px;border-radius:100px;font-size:.82rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;margin-bottom:28px;animation:fadeInDown .6s;}
        .hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,6vw,4.5rem);font-weight:800;line-height:1.08;letter-spacing:-0.03em;margin-bottom:24px;animation:fadeInUp .7s;} .hero h1 .gold{color:var(--gold);}
        .hero p{font-size:1.15rem;color:var(--text-secondary);line-height:1.7;max-width:640px;margin:0 auto 40px;animation:fadeInUp .8s;}
        .hero-actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;animation:fadeInUp .9s;}
        .hero-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:100px;font-size:.95rem;font-weight:600;cursor:pointer;transition:all .2s;border:none;text-decoration:none;}
        .hero-btn.primary{background:linear-gradient(135deg,var(--gold),#c4923a);color:#0a0e17;} .hero-btn.primary:hover{transform:translateY(-2px);box-shadow:0 6px 30px rgba(212,168,83,0.35);}
        .hero-btn.secondary{background:var(--bg-card);color:var(--text-primary);border:1px solid var(--border-hover);} .hero-btn.secondary:hover{background:var(--bg-card-hover);border-color:var(--gold);}
        .macro-banner{position:relative;z-index:1;display:flex;align-items:center;gap:24px;padding:20px 40px;background:var(--bg-secondary);border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden;white-space:nowrap;}
        .macro-banner-inner{display:flex;gap:40px;animation:scroll 30s linear infinite;} .macro-item{display:flex;align-items:center;gap:8px;font-size:.85rem;color:var(--text-secondary);flex-shrink:0;} .macro-item .up{color:#10b981;} .macro-item .down{color:#ef4444;}
        @keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .section-badge{display:inline-flex;align-items:center;gap:8px;background:var(--gold-light);border:1px solid rgba(212,168,83,0.2);color:var(--gold);padding:6px 16px;border-radius:100px;font-size:.78rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;margin-bottom:16px;}
        .section-heading{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:12px;}
        .section-desc{color:var(--text-secondary);font-size:1.05rem;line-height:1.7;max-width:600px;margin-bottom:40px;}
        .industry-nav{position:relative;z-index:1;display:flex;gap:8px;padding:40px 40px 0;max-width:1100px;margin:0 auto;flex-wrap:wrap;}
        .industry-nav-btn{display:flex;align-items:center;gap:8px;padding:10px 20px;border-radius:100px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-secondary);font-size:.85rem;font-weight:500;cursor:pointer;transition:all .2s;text-decoration:none;} .industry-nav-btn:hover{border-color:var(--border-hover);background:var(--bg-card-hover);color:var(--text-primary);}
        .industry-section{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:60px 40px;border-bottom:1px solid var(--border);}
        .industry-header{display:flex;align-items:center;gap:18px;margin-bottom:24px;flex-wrap:wrap;}
        .industry-icon-wrap{width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .industry-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;letter-spacing:-0.01em;} .industry-tagline{color:var(--text-muted);font-size:.9rem;margin-top:2px;}
        .pdf-download-btn{display:flex;align-items:center;gap:6px;padding:8px 18px;border-radius:100px;background:var(--accent-light);color:var(--accent);border:1px solid var(--accent);font-size:.82rem;font-weight:600;cursor:pointer;transition:all .2s;text-decoration:none;margin-left:auto;}
        .pdf-download-btn:hover{background:var(--accent);color:white;transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,0.2);}
        .audio-player{display:flex;align-items:center;gap:14px;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:14px 20px;margin-bottom:24px;transition:border-color .2s;} .audio-player:hover{border-color:var(--border-hover);}
        .play-btn{width:42px;height:42px;border-radius:50%;background:var(--accent);border:none;color:white;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:transform .15s,box-shadow .15s;} .play-btn:hover{transform:scale(1.08);box-shadow:0 4px 16px rgba(0,0,0,0.3);}
        .audio-info{flex:1;min-width:0;} .audio-label{display:flex;align-items:center;gap:6px;font-size:.82rem;font-weight:600;color:var(--text-primary);margin-bottom:8px;}
        .progress-track{width:100%;height:4px;background:rgba(255,255,255,0.08);border-radius:100px;overflow:hidden;} .progress-fill{height:100%;border-radius:100px;transition:width .1s linear;}
        .audio-meta{display:flex;justify-content:space-between;font-size:.72rem;color:var(--text-muted);margin-top:4px;}
        .subsections{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;}
        .subsection-chip{padding:6px 14px;border-radius:100px;font-size:.78rem;font-weight:600;border:1px solid;cursor:pointer;transition:all .2s;user-select:none;} .subsection-chip:hover{filter:brightness(1.1);transform:translateY(-1px);}
        .stories-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;}
        a.story-card{background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:22px;cursor:pointer;transition:all .25s;display:block;color:inherit;text-decoration:none;} a.story-card:hover{border-color:var(--card-accent);transform:translateY(-3px);box-shadow:0 8px 32px rgba(0,0,0,0.3);}
        .story-tag{display:inline-block;padding:4px 10px;border-radius:6px;font-size:.72rem;font-weight:700;letter-spacing:.03em;text-transform:uppercase;margin-bottom:12px;}
        .story-title{font-size:1rem;font-weight:600;line-height:1.45;margin-bottom:8px;color:var(--text-primary);}
        .story-summary{font-size:.85rem;color:var(--text-secondary);line-height:1.55;margin-bottom:16px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
        .story-footer{display:flex;align-items:center;justify-content:space-between;gap:8px;} .story-time{display:flex;align-items:center;gap:5px;font-size:.78rem;color:var(--text-muted);} .story-source{font-size:.72rem;color:var(--text-muted);font-weight:500;opacity:.8;} .story-read-more{display:flex;align-items:center;gap:4px;font-size:.82rem;font-weight:600;transition:gap .2s;} a.story-card:hover .story-read-more{gap:8px;}
        .howto-section{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:80px 40px;} .howto-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;}
        .howto-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all .25s;} .howto-card:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,0.2);}
        .howto-icon{width:48px;height:48px;border-radius:12px;background:var(--gold-light);display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:var(--gold);}
        .howto-card h3{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:600;margin-bottom:8px;} .howto-card p{font-size:.88rem;color:var(--text-secondary);line-height:1.6;}
        .faq-section{position:relative;z-index:1;max-width:800px;margin:0 auto;padding:80px 40px;}
        .faq-item{border:1px solid var(--border);border-radius:14px;margin-bottom:12px;overflow:hidden;cursor:pointer;background:var(--bg-card);transition:border-color .2s;} .faq-item:hover,.faq-item.open{border-color:var(--gold);}
        .faq-q{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;font-weight:600;font-size:.95rem;} .faq-chevron{transition:transform .3s;color:var(--text-muted);} .faq-chevron.rotated{transform:rotate(180deg);color:var(--gold);}
        .faq-a{padding:0 24px 20px;color:var(--text-secondary);font-size:.9rem;line-height:1.7;}
        .subscribe-section{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:80px 40px;text-align:center;}
        .everything-toggle{display:flex;align-items:center;gap:16px;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:18px 24px;margin-bottom:28px;cursor:pointer;text-align:left;transition:border-color .2s;} .everything-toggle:hover{border-color:var(--gold);}
        .toggle-track{width:48px;height:26px;border-radius:100px;background:rgba(255,255,255,0.1);position:relative;flex-shrink:0;transition:background .3s;} .toggle-track.active{background:var(--gold);} .toggle-thumb{width:20px;height:20px;border-radius:50%;background:white;position:absolute;top:3px;left:3px;transition:left .3s;} .toggle-track.active .toggle-thumb{left:25px;}
        .everything-label{display:flex;align-items:center;gap:8px;font-weight:600;font-size:.95rem;color:var(--text-primary);} .everything-desc{display:block;font-size:.82rem;color:var(--text-muted);margin-top:2px;}
        .subscribe-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px;margin-bottom:32px;}
        .subscribe-card{background:var(--bg-card);border:2px solid transparent;border-radius:14px;padding:20px 12px;display:flex;flex-direction:column;align-items:center;gap:10px;cursor:pointer;transition:all .2s;position:relative;} .subscribe-card:hover{border-color:var(--border-hover);} .subscribe-card.selected{background:var(--sel-light);}
        .subscribe-card-check{position:absolute;top:8px;right:8px;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;} .subscribe-card.selected .subscribe-card-check{background:var(--sel-accent);}
        .subscribe-card-name{font-size:.78rem;font-weight:600;text-align:center;color:var(--text-secondary);} .subscribe-card.selected .subscribe-card-name{color:var(--text-primary);}
        .format-selector{margin-bottom:32px;} .format-title{font-size:.85rem;font-weight:600;color:var(--text-secondary);margin-bottom:12px;} .format-options{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
        .format-btn{display:flex;align-items:center;gap:8px;padding:12px 24px;border-radius:100px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-secondary);font-size:.88rem;font-weight:500;cursor:pointer;transition:all .2s;} .format-btn:hover{border-color:var(--border-hover);} .format-btn.active{border-color:var(--gold);background:var(--gold-light);color:var(--gold);}
        .email-row{display:flex;gap:12px;max-width:500px;margin:0 auto;} .email-input-wrap{flex:1;display:flex;align-items:center;gap:10px;background:var(--bg-card);border:1px solid var(--border);border-radius:100px;padding:0 20px;color:var(--text-muted);transition:border-color .2s;} .email-input-wrap:focus-within{border-color:var(--gold);}
        .email-input{flex:1;background:none;border:none;outline:none;color:var(--text-primary);font-size:.92rem;padding:14px 0;font-family:inherit;} .email-input::placeholder{color:var(--text-muted);}
        .subscribe-btn{display:flex;align-items:center;gap:8px;padding:14px 28px;border-radius:100px;background:linear-gradient(135deg,var(--gold),#c4923a);color:#0a0e17;font-weight:600;font-size:.92rem;border:none;cursor:pointer;transition:all .2s;white-space:nowrap;} .subscribe-btn:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(212,168,83,0.35);}
        .subscribed-msg{display:flex;align-items:center;justify-content:center;gap:10px;color:#10b981;font-weight:600;font-size:1rem;padding:16px;background:rgba(16,185,129,0.08);border-radius:100px;max-width:500px;margin:0 auto;}
        .footer{position:relative;z-index:1;text-align:center;padding:60px 40px;border-top:1px solid var(--border);color:var(--text-muted);font-size:.85rem;}
        .footer-logo{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--text-primary);margin-bottom:12px;display:flex;align-items:center;justify-content:center;gap:8px;}
        .footer-links{display:flex;gap:24px;justify-content:center;margin-top:16px;flex-wrap:wrap;} .footer-links a{color:var(--text-muted);text-decoration:none;font-size:.82rem;transition:color .2s;} .footer-links a:hover{color:var(--gold);}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}} @keyframes fadeInDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:768px){.navbar{padding:14px 20px;}.nav-links{display:none;}.menu-toggle{display:block;}.hero{padding:140px 20px 60px;}.hero h1{font-size:2.2rem;}.industry-section{padding:40px 20px;}.industry-nav{padding:30px 20px 0;}.howto-section,.faq-section,.subscribe-section{padding:50px 20px;}.stories-grid{grid-template-columns:1fr;}.howto-grid{grid-template-columns:1fr;}.subscribe-grid{grid-template-columns:repeat(auto-fill,minmax(100px,1fr));}.email-row{flex-direction:column;}.section-heading{font-size:1.8rem;}.macro-banner{padding:16px 20px;}.pdf-download-btn{margin-left:0;margin-top:8px;}}
      `}</style>
      <div className="app">
        <div className="bg-glow" /><div className="bg-grid" />
        <nav className={"navbar " + (scrolled ? "scrolled" : "")}>
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}><span className="logo-dot" />Brevity</a>
          <ul className="nav-links"><li><a href="#industries">Industries</a></li><li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("healthcare"); window.scrollTo({ top: 0 }); }}>Healthcare</a></li><li><a href="#how-it-works">How It Works</a></li><li><a href="#faq">FAQ</a></li><li><a href="#subscribe" className="nav-cta">Subscribe</a></li></ul>
          <button className="menu-toggle" onClick={() => setMenuOpen(true)}><Menu size={24} /></button>
        </nav>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onHealthcare={() => { setCurrentPage("healthcare"); window.scrollTo({ top: 0 }); }} />
        <header className="hero">
          <div className="hero-badge"><Globe size={14} /> 7 Industries. One Brief. Every Morning.</div>
          <h1>Your Daily<br />Intelligence <span className="gold">Brief</span></h1>
          <p>Cut through the noise. Brevity synthesizes top stories across technology, finance, healthcare, energy, real estate, politics, and startups — delivered as a concise audio briefing and PDF before your first coffee.</p>
          <div className="hero-actions"><a href="#subscribe" className="hero-btn primary"><Headphones size={18} /> Start Listening</a><a href="#how-it-works" className="hero-btn secondary"><BookOpen size={18} /> How It Works</a></div>
        </header>
        <div className="macro-banner"><div className="macro-banner-inner">
          {[...Array(2)].map((_, d) => (<div key={d} style={{ display: "flex", gap: 40 }}><span className="macro-item"><BarChart3 size={14} /> S&P 500 <span className="up">+1.2%</span></span><span className="macro-item">NASDAQ <span className="up">+1.8%</span></span><span className="macro-item">10Y Treasury <span className="down">4.18%</span></span><span className="macro-item">Bitcoin <span className="up">$152,340</span></span><span className="macro-item">Oil (WTI) <span className="down">$71.20</span></span><span className="macro-item">Gold <span className="up">$3,180</span></span><span className="macro-item">EUR/USD <span className="down">1.082</span></span><span className="macro-item"><Globe size={14} /> VIX <span className="up">14.2</span></span></div>))}
        </div></div>
        <div className="industry-nav" id="industries">
          {industries.map((ind) => { const I = ind.icon; return (<a key={ind.id} href={"#" + ind.id} className="industry-nav-btn"><I size={16} style={{ color: ind.accent }} /> {ind.name}</a>); })}
        </div>
        {industries.map((ind, i) => (<IndustrySection key={ind.id} industry={ind} />))}
        <section className="howto-section" id="how-it-works">
          <div style={{ textAlign: "center", marginBottom: 48 }}><div className="section-badge"><MousePointerClick size={14} /> Navigate Like a Pro</div><h2 className="section-heading">How It Works</h2><p className="section-desc" style={{ margin: "0 auto" }}>Brevity is designed to get you informed in minutes, not hours.</p></div>
          <div className="howto-grid">{howToSteps.map((s, i) => (<div key={i} className="howto-card"><div className="howto-icon"><s.icon size={24} /></div><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>
        </section>
        <SubscribeSection />
        <section className="faq-section" id="faq">
          <div style={{ textAlign: "center", marginBottom: 40 }}><div className="section-badge"><HelpCircle size={14} /> Got Questions?</div><h2 className="section-heading">FAQ</h2></div>
          {faqs.map((f, i) => (<FaqItem key={i} faq={f} />))}
        </section>
        <footer className="footer">
          <div className="footer-logo"><span className="logo-dot" /> Brevity</div>
          <p>Your daily intelligence brief — across every industry that matters.</p>
          <div className="footer-links"><a href="#industries">Industries</a><a href="#how-it-works">How It Works</a><a href="#subscribe">Subscribe</a><a href="#faq">FAQ</a><a href="mailto:hello@brevity.news">Contact</a></div>
          <p style={{ marginTop: 16, fontSize: "0.78rem" }}>&copy; 2026 Brevity. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
