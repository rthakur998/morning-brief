import { useState, useEffect, useRef } from "react";

const INDUSTRIES = [
  { id: "tech", label: "Tech & AI", icon: "⚡" },
  { id: "finance", label: "Finance", icon: "◆" },
  { id: "health", label: "Healthcare", icon: "+" },
  { id: "energy", label: "Energy", icon: "◎" },
  { id: "realestate", label: "Real Estate", icon: "▲" },
  { id: "politics", label: "Politics", icon: "★" },
  { id: "startups", label: "Startups & VC", icon: "●" },
];

const BRIEFINGS = {
  tech: [
    {
      tag: "BREAKING",
      tagColor: "#E8453C",
      headline: "Anthropic's Unreleased \"Claude Mythos\" Model Exposed in Data Leak",
      summary: "A configuration error inadvertently published ~3,000 draft assets revealing \"Claude Mythos\" — a model tier above Anthropic's current Opus flagship with reported step-change capabilities in coding, academic reasoning, and cybersecurity. Anthropic confirmed the model's existence but warned it poses unprecedented cybersecurity risks with no near-term public release planned. The iShares Tech-Software ETF fell ~3% on the news.",
      time: "2h ago",
      readTime: "3 min",
      source: "Fortune · CoinDesk",
    },
    {
      tag: "BREAKTHROUGH",
      tagColor: "#0A84FF",
      headline: "Google's TurboQuant Crushes AI Inference Memory Costs by 6×",
      summary: "Google Research unveiled TurboQuant, a KV-cache compression method reducing inference memory usage by 6× with zero measurable accuracy loss and up to 8× faster attention computation on H100 GPUs. Memory chip stocks tanked — SK Hynix fell 6%, Samsung nearly 5%. Cloudflare's CEO called it \"Google's DeepSeek moment.\"",
      time: "6h ago",
      readTime: "2 min",
      source: "Google Research · CNBC · TechCrunch",
    },
    {
      tag: "DEALS",
      tagColor: "#BF5AF2",
      headline: "SoftBank Locks In $40B Bridge Loan to Fund OpenAI Empire",
      summary: "SoftBank secured a $40 billion bridge loan arranged by JPMorgan, Goldman Sachs, and three Japanese megabanks to fund continued OpenAI investments. OpenAI's ChatGPT ads pilot has already crossed $100M in annualized revenue within six weeks, with 600+ advertisers and self-serve access planned for April.",
      time: "8h ago",
      readTime: "2 min",
      source: "People News · Bloomberg",
    },
    {
      tag: "REGULATION",
      tagColor: "#FF9F0A",
      headline: "White House Sends Congress a Unified National AI Regulatory Framework",
      summary: "The proposal establishes a risk-tiered compliance model with mandatory audits for high-risk AI in healthcare, credit, employment, and critical infrastructure. It controversially proposes preempting 40+ state-level AI laws. Competing congressional bills set up a major legislative battle in Q2.",
      time: "1d ago",
      readTime: "3 min",
      source: "NYU Shanghai RITS · Congress.gov",
    },
    {
      tag: "WORKFORCE",
      tagColor: "#FF453A",
      headline: "AI-Driven Tech Layoffs Surge Past 51,000 in Q1 2026",
      summary: "Over 51,600 workers have been cut across 102 events this year — ~20% explicitly attributed to AI automation, up sharply from <8% in 2025. Block's 4,000-person reduction was the largest AI-attributed layoff in corporate history. At current pace, analysts project 265,000 tech layoffs by year-end.",
      time: "1d ago",
      readTime: "2 min",
      source: "SkillSyncer · Tech Insider",
    },
    {
      tag: "LEGAL",
      tagColor: "#FF6482",
      headline: "Meta and Google Hit With Landmark Social Media Liability Verdicts",
      summary: "A New Mexico jury ordered Meta to pay $375 million for enabling child exploitation, while a California jury found both Meta and YouTube liable for social media addiction in minors. Meta's stock dropped ~12% over three days, with ~2,000 similar lawsuits pending nationwide.",
      time: "2d ago",
      readTime: "2 min",
      source: "CNBC · NPR · NBC News",
    },
  ],
  finance: [
    {
      tag: "MARKETS",
      tagColor: "#E8453C",
      headline: "Dow Enters Correction as Five-Week Selloff Deepens",
      summary: "The Dow fell 793 points (−1.73%) to 45,167, officially entering correction territory at 10%+ below its recent high. The S&P 500 dropped to 6,369 (a seven-month low), and the Nasdaq fell 2.15%. Nvidia, Microsoft, Amazon, and Meta led losses in a broad tech rout driven by surging oil and the Iran conflict.",
      time: "1h ago",
      readTime: "2 min",
      source: "Bloomberg · CNBC",
    },
    {
      tag: "FED",
      tagColor: "#0A84FF",
      headline: "Fed Holds Rates — But Markets Begin Pricing In a Potential Hike",
      summary: "The FOMC voted 11-1 to hold at 3.5%–3.75%, with the dot plot projecting only one cut in 2026. Futures traders pushed the probability of a rate increase above 50% for the first time as the OECD raised its U.S. inflation forecast to 4.2%. Import prices jumped 1.3% in February — the largest since March 2022.",
      time: "4h ago",
      readTime: "3 min",
      source: "Federal Reserve · OECD · CME FedWatch",
    },
    {
      tag: "COMMODITIES",
      tagColor: "#FF9F0A",
      headline: "Oil Shock Fuels Stagflation Fears With Brent Above $107",
      summary: "Brent crude hit $107.81/bbl — up roughly 50% since January — as the Strait of Hormuz remains effectively blocked. The IEA authorized a historic 400 million barrel emergency reserve release. Moody's chief economist warned sustained prices for \"weeks, not months\" would make a recession difficult to avoid.",
      time: "3h ago",
      readTime: "2 min",
      source: "Fortune · IEA · Moody's",
    },
    {
      tag: "CRYPTO",
      tagColor: "#BF5AF2",
      headline: "Bitcoin Slides to $66,587 in Broad Risk-Off Rotation",
      summary: "Bitcoin dropped ~$2,860 in 24 hours to $66,587, down from the $73K–$74K range earlier in March and roughly $20,660 lower year-over-year. Analysts flag $74,567–$79,289 as a critical reclaim zone; failure there could push BTC toward its yearly low near $60K.",
      time: "1h ago",
      readTime: "2 min",
      source: "CoinDesk · CoinGecko",
    },
    {
      tag: "M&A",
      tagColor: "#30D158",
      headline: "Sumitomo Mitsui Prepares Potential Jefferies Takeover",
      summary: "Japan's SMFG is readying a possible takeover of Jefferies Financial Group ($8.2B market cap), building on its existing ~20% economic stake. Jefferies shares surged up to 10% premarket. Global deal-making hit a record $4.9 trillion in 2025, with 2026 expected to sustain megadeal activity.",
      time: "12h ago",
      readTime: "2 min",
      source: "Financial Times · CNBC",
    },
  ],
  health: [
    {
      tag: "FDA",
      tagColor: "#0A84FF",
      headline: "FDA Clears Four Novel Drugs in a Rapid March Approval Sprint",
      summary: "Corcept's Lifyorli won approval for platinum-resistant ovarian cancer, Denali's Avlayah for Hunter Syndrome received accelerated approval, GSK's Lynavoy cleared for cholestatic pruritus, and J&J's Icotyde — the first oral IL-23 receptor antagonist — was approved for plaque psoriasis.",
      time: "1d ago",
      readTime: "3 min",
      source: "Drugs.com · PharmaVoice",
    },
    {
      tag: "BREAKING",
      tagColor: "#E8453C",
      headline: "Eli Lilly's Oral Obesity Pill Orforglipron Nears Imminent FDA Decision",
      summary: "The once-daily oral GLP-1 agonist is expected to receive an FDA ruling as early as this week after being granted a Commissioner's National Priority Review Voucher. Self-pay pricing starts at $149/month, with Medicare access at $50/month from April 1. GlobalData projects $13B in sales by 2031.",
      time: "4h ago",
      readTime: "3 min",
      source: "BioSpace · BioPharma Dive · Eli Lilly",
    },
    {
      tag: "CLINICAL",
      tagColor: "#30D158",
      headline: "AstraZeneca's First-in-Class COPD Drug Hits Primary Endpoints",
      summary: "Positive Phase 3 results from the OBERON and TITANIA trials of tozorakimab showed significant reduction in COPD exacerbation rates by targeting the IL-33 pathway — a mechanism where multiple competitors have failed. AstraZeneca shares rose 2.7%. Regulatory filings planned by end of Q2.",
      time: "6h ago",
      readTime: "2 min",
      source: "FinancialContent · AstraZeneca",
    },
    {
      tag: "PUBLIC HEALTH",
      tagColor: "#FF453A",
      headline: "U.S. Measles Outbreak Surges Past 1,487 Cases",
      summary: "The CDC has confirmed 1,487 cases across 32 jurisdictions in 2026, on pace to eclipse 2025's record. South Carolina alone accounts for nearly 1,000 cases. Approximately 92% of cases are in unvaccinated individuals, and MMR vaccination coverage has dropped below the herd immunity threshold.",
      time: "8h ago",
      readTime: "2 min",
      source: "Healthline · U.S. News",
    },
    {
      tag: "POLICY",
      tagColor: "#FF9F0A",
      headline: "Medicaid Cuts and ACA Subsidy Expiration Reshape Coverage Landscape",
      summary: "The Working Families Tax Cuts Act cut over $1 trillion from health insurance spending over a decade. Enhanced ACA premium tax credits expired Dec 31, 2025. The Urban Institute estimates 7.3 million fewer Americans will receive subsidized coverage in 2026.",
      time: "1d ago",
      readTime: "3 min",
      source: "STAT News · U.S. News",
    },
  ],
  energy: [
    {
      tag: "CRISIS",
      tagColor: "#E8453C",
      headline: "Strait of Hormuz Crisis Triggers Largest Oil Supply Disruption in Modern History",
      summary: "The U.S.-Israel operation against Iran has effectively closed the strait through which ~20% of global oil transits. Gulf production dropped by at least 10 million b/d. Brent surged from ~$63/bbl at the year's start to a peak of $126 before settling near $108. California gas approaching $9/gal.",
      time: "1h ago",
      readTime: "3 min",
      source: "EIA · CFR · IEA",
    },
    {
      tag: "NUCLEAR",
      tagColor: "#0A84FF",
      headline: "40 Nations Pledge to Triple Nuclear Capacity by 2050",
      summary: "At the Paris Nuclear Energy Summit, China and Brazil joined the tripling pledge. Belgium reversed its nuclear phase-out, Italy lifted its ban, and Germany recognized nuclear as green energy. The Trump administration signed four executive orders targeting 10 new reactors. A record 62 reactors are now under construction globally.",
      time: "1d ago",
      readTime: "3 min",
      source: "Wood Mackenzie · Carbon Brief",
    },
    {
      tag: "EV TECH",
      tagColor: "#30D158",
      headline: "BYD's Blade Battery 2.0 Redefines EV Charging — 9-Minute Full Charge",
      summary: "The second-generation Blade Battery charges from 10% to 97% in just 9 minutes via 1,500 kW Flash Charging stations, even achieving 20–97% in 12 minutes at −30°C. The Denza Z9GT achieves 1,036 km range on a single charge. BYD plans 20,000 Flash Charging stations in China by year-end.",
      time: "3d ago",
      readTime: "2 min",
      source: "CarNewsChina · Neware",
    },
    {
      tag: "COMPETITION",
      tagColor: "#BF5AF2",
      headline: "BYD Overtakes Tesla Globally, But Both Face Market Headwinds",
      summary: "BYD sold 2.26 million EVs in 2025 (+28%) versus Tesla's 1.64 million (−8.6%, its second annual decline). However, BYD's Feb 2026 China sales fell 41% YoY while Tesla's rose 35%. Tesla's energy storage segment surged 25% to $3.84B and FSD subscriptions grew 38% to 1.1M users.",
      time: "1d ago",
      readTime: "2 min",
      source: "CNBC · 24/7 Wall St.",
    },
    {
      tag: "STRATEGY",
      tagColor: "#FF9F0A",
      headline: "China's Clean Energy Strategy \"Vindicated\" as Renewables Cushion Oil Shock",
      summary: "China's 15th Five-Year Plan places renewables centre stage. The Hormuz crisis highlighted the national security benefits of clean power — China had been stockpiling crude ahead of the conflict, building a 1.4B barrel reserve. U.S. electricity demand is expected to grow 3.1% in 2027, driven by data centers.",
      time: "1d ago",
      readTime: "2 min",
      source: "Carbon Brief · EIA",
    },
  ],
  realestate: [
    {
      tag: "RATES",
      tagColor: "#E8453C",
      headline: "Mortgage Rates Spike to Six-Month Highs, Disrupting Spring Season",
      summary: "The 30-year fixed rate averaged 6.38% for the week ending March 26, up 16 basis points week-over-week and the fourth consecutive increase. Daily rates reached as high as 6.49%. This reverses February's optimism when rates briefly dipped below 6% for the first time in three years.",
      time: "4h ago",
      readTime: "2 min",
      source: "Freddie Mac · Bankrate",
    },
    {
      tag: "BUYERS",
      tagColor: "#FF9F0A",
      headline: "Homebuying Contract Cancellations Hit a Record High",
      summary: "Over 42,000 contracts fell through in February — nearly 14% of all homes under contract — the highest for any February since Redfin began tracking in 2017. Roughly 42% of February transactions included seller concessions, up from 31% a year prior.",
      time: "1d ago",
      readTime: "2 min",
      source: "Redfin · Resiclub Analytics",
    },
    {
      tag: "INVENTORY",
      tagColor: "#30D158",
      headline: "Housing Inventory Rebuilds Toward Pre-Pandemic Levels",
      summary: "Active listings reached 914,860 at the end of February, with 66 of the nation's 200 largest metros now exceeding pre-pandemic levels — up from zero in 2022. National listings are up 7.9% YoY. HousingWire notes 2026 looks to be the first year of actual growth in existing home sales in years.",
      time: "2d ago",
      readTime: "2 min",
      source: "HousingWire · Fast Company",
    },
    {
      tag: "COMMERCIAL",
      tagColor: "#0A84FF",
      headline: "Commercial Real Estate Shows Recovery, Led by Data Centers",
      summary: "Private U.S. CRE values bottomed in Q4 2024, with office the last sector to trough in Q2 2025. Data centers report 100% pre-leasing in nine major global markets. J.P. Morgan calls the 2026 CRE outlook \"strong from both a capital and fundamental standpoint.\"",
      time: "1d ago",
      readTime: "3 min",
      source: "J.P. Morgan · Morningstar · Markets Group",
    },
    {
      tag: "BUILDERS",
      tagColor: "#BF5AF2",
      headline: "Homebuilder Confidence Remains Stuck Below Growth Threshold",
      summary: "The NAHB Housing Market Index edged to 38 in March, well below the 50-point expansion threshold. Builders continue pivoting to smaller floor plans for affordability. NAR predicts existing home sales will rise 14% and prices will increase 4% in 2026.",
      time: "2d ago",
      readTime: "2 min",
      source: "NAHB · NAR · Rate.com",
    },
  ],
  politics: [
    {
      tag: "WAR",
      tagColor: "#E8453C",
      headline: "Iran War Enters Day 28 — Hormuz Blocked, Diplomacy Stalls",
      summary: "The U.S.-Israel campaign has struck over 10,000 targets and destroyed two-thirds of Iran's missile production facilities per CENTCOM. At least 13 U.S. service members, 1,750+ Iranians, and 1,116 Lebanese have been killed. Iran's Foreign Minister rejected negotiations. A UK-led 22-nation coalition is working to secure the Strait.",
      time: "1h ago",
      readTime: "3 min",
      source: "CNN · Al Jazeera · Times of Israel",
    },
    {
      tag: "SHUTDOWN",
      tagColor: "#FF453A",
      headline: "DHS Shutdown Hits Day 42 With No Resolution in Sight",
      summary: "The longest DHS shutdown in history deepened as Speaker Johnson rejected a Senate funding bill. TSA callout rates hit a record 11.83%, with some airports above 40%; 510 TSA officers have quit since Feb 14. Trump signed emergency pay for ~61,000 TSA workers. Congress left for a two-week recess.",
      time: "3h ago",
      readTime: "3 min",
      source: "NBC News · CBS News · Federal News Network",
    },
    {
      tag: "TRADE",
      tagColor: "#FF9F0A",
      headline: "Post-IEEPA Tariff Regime: Highest Effective Rates Since 1943",
      summary: "After the Supreme Court struck down IEEPA-based tariffs, the administration imposed a 10% global import surcharge via Section 122. The average effective tariff rate stands at 10.5% — the highest since 1943. China faces 33.9%, steel/aluminum 41.1%. Twenty-four states have filed suit.",
      time: "6h ago",
      readTime: "3 min",
      source: "Yale Budget Lab · Tax Foundation · White House",
    },
    {
      tag: "DIPLOMACY",
      tagColor: "#0A84FF",
      headline: "Russia-Ukraine Peace Talks Paused as Iran War Diverts U.S. Attention",
      summary: "Trilateral negotiations remain suspended since mid-February Geneva sessions. Notably, Ukraine recaptured ~400 km² in late February — the first such reversal since 2024. A coalition of 35 nations agreed on post-ceasefire security guarantees including UK-French military hubs in Ukraine.",
      time: "1d ago",
      readTime: "2 min",
      source: "Al Jazeera · Wikipedia · ORF Online",
    },
    {
      tag: "PROTEST",
      tagColor: "#BF5AF2",
      headline: "\"No Kings\" Protests Expected to Draw Millions Nationwide Saturday",
      summary: "The third wave of protests, organized by ~300 groups including the ACLU, is scheduled for March 28 with the flagship rally in Minneapolis-St. Paul. Grievances include the Iran war, the DHS shutdown, and executive overreach. The prior round drew an estimated 5 million participants.",
      time: "12h ago",
      readTime: "2 min",
      source: "Ms. Magazine · Wikipedia",
    },
  ],
  startups: [
    {
      tag: "TREND",
      tagColor: "#0A84FF",
      headline: "AI Captures 41% of All Venture Dollars as Mega-Rounds Dominate",
      summary: "AI startups captured 41% of the $128B in venture funding on Carta in 2025 — a record share. February 2026 was the largest single month ever at $189B globally, though 83% went to just three companies: OpenAI ($110B), Anthropic ($30B), and Waymo ($16B). March has cooled to ~$13B.",
      time: "1d ago",
      readTime: "3 min",
      source: "TechCrunch · AI Funding Tracker",
    },
    {
      tag: "FUNDING",
      tagColor: "#30D158",
      headline: "Shield AI Raises $1.5B at $12.7B Valuation — Defense Tech Surges",
      summary: "Shield AI, maker of the Hivemind autonomy software for military drones, closed its Series G, more than doubling its valuation from $5.6B. The round reflects projected 80%+ revenue growth to over $540M in 2026 and signals defense AI's emergence as a top-tier venture category.",
      time: "8h ago",
      readTime: "2 min",
      source: "Tech Startups · Bloomberg",
    },
    {
      tag: "IPO WATCH",
      tagColor: "#BF5AF2",
      headline: "A $3.6T IPO Pipeline Builds for H2 2026",
      summary: "Databricks ($134B valuation, $5.4B ARR, 65% growth) secured $1.8B in debt ahead of a potential H2 listing. OpenAI targets Q4 at ~$1T valuation. SpaceX may go in June at $1.5T. Other anticipated IPOs include Cerebras and Stripe. PitchBook warns the market has rewarded story over substance.",
      time: "1d ago",
      readTime: "3 min",
      source: "Techbuzz · U.S. News · Morningstar",
    },
    {
      tag: "FUNDING",
      tagColor: "#FF9F0A",
      headline: "Late March Highlights: AI Infrastructure & Healthcare Rounds",
      summary: "Notable rounds include Granola ($125M Series C), Dash0 ($110M Series B), Cloaked ($375M Series B), and Normal ($50M Series B for AI chip design). NVIDIA has invested ~$800M in Reflection AI's open-source LLM push, with JPMorgan reportedly considering participation.",
      time: "1d ago",
      readTime: "2 min",
      source: "Crunchbase · Startups Gallery",
    },
    {
      tag: "GLOBAL",
      tagColor: "#64D2FF",
      headline: "European VC Hits 2026 High as U.S. March Funding Cools",
      summary: "While U.S. startup funding slowed sharply in March, European VC reached its highest point of the year. Fintech remains strong globally, with particular momentum in stablecoins, agentic payments, and AI-native financial tools. Crypto startup funding dipped 13% YoY to $883M in February.",
      time: "2d ago",
      readTime: "2 min",
      source: "Crunchbase News · Mean CEO",
    },
  ],
};

const MACRO_BANNER = {
  label: "MACRO SIGNAL",
  text: "The Iran-Hormuz crisis, AI's accelerating restructuring of the economy, and a legal/policy environment in rapid flux are the three threads connecting every sector this morning.",
};

export default function MorningBriefing() {
  const [activeTab, setActiveTab] = useState("tech");
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrolled(containerRef.current.scrollTop > 60);
      }
    };
    const el = containerRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el && el.removeEventListener("scroll", handleScroll);
  }, []);

  const switchTab = (id) => {
    if (id === activeTab) return;
    setVisible(false);
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(id);
      setVisible(true);
      setAnimating(false);
      if (containerRef.current) containerRef.current.scrollTop = 0;
    }, 250);
  };

  const items = BRIEFINGS[activeTab] || [];
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        background: "linear-gradient(160deg, #F7F5F0 0%, #F2EFE8 100%)",
        fontFamily:
          "'Newsreader', 'Georgia', 'Times New Roman', serif",
        color: "#1A1A1A",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .card-item {
          animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .card-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
        }
        .tab-btn {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          border: none;
          background: none;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .tab-btn:hover {
          background: rgba(0,0,0,0.04) !important;
        }
        .play-btn {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .play-btn:hover {
          transform: scale(1.1);
          background: #1A1A1A !important;
          color: #fff !important;
        }
        .content-area {
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D4D4CC; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #B0B0A8; }
      `}</style>

      {/* ── HEADER ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled
            ? "rgba(247,245,240,0.88)"
            : "rgba(247,245,240,1)",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled
            ? "blur(20px) saturate(180%)"
            : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.06)"
            : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: scrolled ? "12px 24px" : "28px 24px 20px",
            transition: "padding 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: scrolled ? 0 : 4,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <h1
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontSize: scrolled ? 22 : 32,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#1A1A1A",
                  transition: "font-size 0.3s ease",
                  lineHeight: 1.1,
                }}
              >
                The Morning Brief
              </h1>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "#E8453C",
                  padding: "3px 8px",
                  borderRadius: 4,
                  opacity: scrolled ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                LIVE
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "#888",
                  fontWeight: 500,
                }}
              >
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#30D158",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }} />
                Updated {dateStr}
              </div>
              <button
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                  background: "linear-gradient(135deg, #0A84FF 0%, #BF5AF2 100%)",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 8px rgba(10,132,255,0.35)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span style={{ fontSize: 14 }}>▶</span> Listen to Briefing
              </button>
            </div>
          </div>

          {!scrolled && (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "#999",
                fontWeight: 400,
                marginTop: 2,
                animation: "fadeIn 0.6s ease both",
              }}
            >
              Your personalized industry intelligence · 7 sectors · 5 min read
            </p>
          )}
        </div>

        {/* Tabs */}
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <nav
            style={{
              display: "flex",
              gap: 4,
              overflowX: "auto",
              paddingBottom: 0,
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {INDUSTRIES.map((ind) => {
              const isActive = ind.id === activeTab;
              return (
                <button
                  key={ind.id}
                  className="tab-btn"
                  onClick={() => switchTab(ind.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 16px",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#0A84FF" : "#888",
                    borderBottom: isActive
                      ? "2px solid #0A84FF"
                      : "2px solid transparent",
                    borderRadius: "8px 8px 0 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      opacity: isActive ? 1 : 0.5,
                      transition: "opacity 0.25s",
                    }}
                  >
                    {ind.icon}
                  </span>
                  {ind.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ── MACRO BANNER ── */}
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "20px 24px 0",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #1A1A1A 0%, #2C2C2E 100%)",
            borderRadius: 14,
            padding: "16px 20px",
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            animation: "fadeIn 0.6s ease both",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#FF9F0A",
              background: "rgba(255,159,10,0.15)",
              padding: "4px 8px",
              borderRadius: 4,
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            {MACRO_BANNER.label}
          </span>
          <p
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: 14.5,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.88)",
              fontWeight: 400,
            }}
          >
            {MACRO_BANNER.text}
          </p>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <main
        className="content-area"
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "20px 24px 60px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 16,
            paddingTop: 4,
          }}
        >
          <h2
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: "-0.01em",
              borderLeft: `3px solid ${BRIEFINGS[activeTab]?.[0]?.tagColor || "#0A84FF"}`,
              paddingLeft: 12,
            }}
          >
            {INDUSTRIES.find((i) => i.id === activeTab)?.icon}{" "}
            {INDUSTRIES.find((i) => i.id === activeTab)?.label}
          </h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: "#888",
                background: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: 6,
                padding: "6px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 13 }}>📄</span> Download PDF
            </button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, idx) => (
            <div
              key={`${activeTab}-${idx}`}
              className="card-item"
              style={{
                background: idx === 0 ? `${item.tagColor}0A` : "#fff",
                borderRadius: 14,
                padding: idx === 0 ? "24px 24px" : "20px 22px",
                border: `1px solid ${idx === 0 ? item.tagColor + "30" : "rgba(0,0,0,0.05)"}`,
                borderLeft: `4px solid ${item.tagColor}`,
                cursor: "pointer",
                transition:
                  "transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease",
                animationDelay: `${idx * 0.06}s`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top meta line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: item.tagColor,
                      background: `${item.tagColor}28`,
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {item.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: "#AAA",
                      fontWeight: 400,
                    }}
                  >
                    {item.time}
                  </span>
                </div>
                {/* Play button */}
                <div
                  className="play-btn"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1.5px solid #D4D4CC",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: "#AAA",
                    flexShrink: 0,
                  }}
                  title="Listen to this brief"
                >
                  ▶
                </div>
              </div>

              {/* Headline */}
              <h3
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontSize: idx === 0 ? 22 : 18.5,
                  fontWeight: idx === 0 ? 700 : 600,
                  lineHeight: 1.3,
                  color: "#1A1A1A",
                  marginBottom: 8,
                  letterSpacing: "-0.015em",
                }}
              >
                {item.headline}
              </h3>

              {/* Summary */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  color: "#555",
                  fontWeight: 400,
                  marginBottom: 12,
                }}
              >
                {item.summary}
              </p>

              {/* Bottom meta */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: "#BBB",
                    fontWeight: 400,
                  }}
                >
                  {item.source}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: "#BBB",
                    fontWeight: 500,
                  }}
                >
                  {item.readTime} read
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#BBB",
              fontWeight: 400,
            }}
          >
            The Morning Brief · Researched and synthesized from 40+ sources ·
            Updated every weekday at 6 AM ET
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: "#CCC",
            }}
          >
            © 2026
          </p>
        </div>
      </main>
    </div>
  );
}
