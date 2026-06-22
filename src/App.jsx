import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Projects", "Experience", "Contact"];

const SKILLS = [
  { cat: "Frontend", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Redux", "Context API"] },
  { cat: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "bcryptjs"] },
  { cat: "Database", items: ["MongoDB", "Mongoose", "PostgreSQL"] },
  { cat: "Tools", items: ["Git", "GitHub", "Postman", "Vercel", "Render", "MongoDB Atlas"] },
  { cat: "Languages", items: ["JavaScript", "C++"] },
];

const PROJECTS = [
  {
    title: "FinTrack AI",
    period: "Feb 2026 – May 2026",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    points: [
      "Built a full-stack personal finance management app with secure JWT-based authentication and 10+ RESTful API endpoints.",
      "Designed a responsive analytics dashboard with 5+ reusable React components, expense category tracking, and real-time filtering using Context API and Axios.",
      "Deployed end-to-end on Vercel, Render, and MongoDB Atlas — resolving 8+ production issues related to CORS and environment variables.",
    ],
    github: "https://github.com/SavinMv",
    live: "https://finance-tracker-sable-zeta.vercel.app",
  },
  {
    title: "JobSphere",
    period: "Apr 2026 – May 2026",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Context API"],
    points: [
      "Developed a full-stack job portal with JWT-based authentication and 2-role access control (recruiter/candidate).",
      "Built 12+ RESTful APIs and responsive dashboard modules for job posting, application tracking, and profile handling.",
      "Implemented protected routes, CRUD operations, and modular backend using Express middleware — reducing authentication errors by 100% in testing.",
    ],
    github: "https://github.com/SavinMv",
    live: "https://job-portal1-tau.vercel.app",
  },
];

const EXPERIENCE = [
  {
    role: "MERN Stack Intern",
    company: "SuprMentr Technologies",
    period: "Feb 2026 – May 2026",
    location: "Bengaluru, India · Remote",
    points: [
      "Collaborated in development and deployment of 3+ full-stack web applications using React.js, Node.js, Express.js, and MongoDB.",
      "Developed and tested REST APIs, implemented JWT authentication workflows, and resolved 10+ production bugs related to deployment and CORS configuration.",
    ],
  },
];

const ACHIEVEMENTS = [
  "Published a research paper at International Conference RATE–2025 on applied computing and emerging technologies.",
  "Completed MERN Stack Development certification from ThingQbator – Nasscom Foundation.",
  "Completed Applied AI training under TechSaksham initiative by Microsoft and SAP.",
];

function useTypewriter(texts, speed = 60) {
  const [display, setDisplay] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const current = texts[textIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, speed);
    } else if (!deleting && charIdx === current.length) {
      if (textIdx === texts.length - 1) { setDone(true); return; }
      timeout = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      }, speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(i => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, done, texts, speed]);

  return { display, done };
}

function Navbar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,15,30,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(79,142,247,0.15)" : "none",
      transition: "all 0.3s",
      padding: "0 5%",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64,
    }}>
      <span style={{ fontFamily: "'Space Mono', monospace", color: "#4F8EF7", fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>
        {"<Savin M V />"}
      </span>
      <div style={{ display: "flex", gap: 32 }} className="desktop-nav">
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => onNav(l)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: active === l ? "#4F8EF7" : "#A0B0C8",
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
              letterSpacing: 0.5, transition: "color 0.2s",
              borderBottom: active === l ? "2px solid #4F8EF7" : "2px solid transparent",
              paddingBottom: 2,
            }}>
            {l}
          </button>
        ))}
      </div>
      <a href="#" onClick={e => { e.preventDefault(); document.getElementById("contact-section").scrollIntoView({ behavior: "smooth" }); }}
        style={{
          background: "linear-gradient(135deg, #4F8EF7, #7B6CF7)",
          color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: 13,
          fontWeight: 600, padding: "8px 20px", borderRadius: 6, textDecoration: "none",
          letterSpacing: 0.5, transition: "opacity 0.2s",
        }}
        onMouseOver={e => e.target.style.opacity = 0.85}
        onMouseOut={e => e.target.style.opacity = 1}
      >
        Hire Me
      </a>
    </nav>
  );
}

function HeroSection() {
  const { display, done } = useTypewriter(
    ["Full Stack Developer", "MERN Stack Developer", "React.js Developer"],
    70
  );
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home-section" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0A0F1E 0%, #0D1A3A 50%, #0A0F1E 100%)",
      position: "relative", overflow: "hidden", textAlign: "center", padding: "0 5%",
    }}>
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(79,142,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-block", background: "rgba(79,142,247,0.1)",
          border: "1px solid rgba(79,142,247,0.3)", borderRadius: 20,
          padding: "6px 16px", marginBottom: 24,
          fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#4F8EF7", letterSpacing: 1,
        }}>
          👋 Available for full-time roles
        </div>
        <h1 style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.4rem, 6vw, 4.2rem)", color: "#F0F4FF",
          margin: "0 0 12px", lineHeight: 1.1, letterSpacing: -1,
        }}>
          Savin M V
        </h1>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "clamp(1rem, 3vw, 1.4rem)",
          color: "#4F8EF7", marginBottom: 20, minHeight: "2em",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
        }}>
          <span>{display}</span>
          <span style={{ animation: "blink 1s step-end infinite", color: "#7B6CF7" }}>|</span>
        </div>
        <p style={{
          fontFamily: "'Inter', sans-serif", color: "#A0B0C8",
          fontSize: "clamp(0.9rem, 2vw, 1.05rem)", maxWidth: 560, margin: "0 auto 36px",
          lineHeight: 1.8,
        }}>
          Building production-grade web apps with React.js, Node.js, Express.js & MongoDB.
          Passionate about clean code, scalable architecture, and shipping fast.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("projects-section")}
            style={{
              background: "linear-gradient(135deg, #4F8EF7, #7B6CF7)",
              color: "#fff", border: "none", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15,
              padding: "14px 32px", borderRadius: 8, letterSpacing: 0.3,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(79,142,247,0.35)"; }}
            onMouseOut={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
          >
            View Projects
          </button>
          <a href="https://github.com/SavinMv" target="_blank" rel="noreferrer"
            style={{
              background: "transparent", color: "#F0F4FF",
              border: "1px solid rgba(240,244,255,0.25)", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15,
              padding: "14px 32px", borderRadius: 8, letterSpacing: 0.3,
              textDecoration: "none", transition: "border-color 0.2s",
              display: "inline-block",
            }}
            onMouseOver={e => e.target.style.borderColor = "#4F8EF7"}
            onMouseOut={e => e.target.style.borderColor = "rgba(240,244,255,0.25)"}
          >
            GitHub ↗
          </a>
        </div>
        {/* Stats */}
        <div style={{
          display: "flex", gap: 40, justifyContent: "center", marginTop: 56,
          flexWrap: "wrap",
        }}>
          {[["2+", "Projects Deployed"], ["10+", "APIs Built"], ["8.66", "CGPA"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.8rem", color: "#4F8EF7", fontWeight: 700 }}>{num}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#A0B0C8", marginTop: 4, letterSpacing: 0.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
      `}</style>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about-section" style={{
      background: "#0A0F1E", padding: "100px 5%",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionLabel label="About Me" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#F0F4FF", marginBottom: 20, lineHeight: 1.2 }}>
              Crafting scalable web experiences
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "#A0B0C8", fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}>
              I'm a Full Stack MERN Developer based in Bengaluru, India — recently graduated with a B.E. in Computer Science Engineering from T John Institute of Technology (CGPA: 8.66).
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "#A0B0C8", fontSize: 15, lineHeight: 1.9, marginBottom: 28 }}>
              I specialize in building and deploying production-grade web applications. From REST API design to React dashboards, I focus on clean, modular, and maintainable code.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <InfoPill icon="🎓" text="B.E. CSE · T John Institute of Technology" />
              <InfoPill icon="📍" text="Bengaluru, India" />
              <InfoPill icon="📄" text="Research published at RATE–2025" />
            </div>
          </div>
          <div>
            {SKILLS.map(({ cat, items }) => (
              <div key={cat} style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#4F8EF7", letterSpacing: 1.5, marginBottom: 10, textTransform: "uppercase" }}>{cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map(s => (
                    <span key={s} style={{
                      background: "rgba(79,142,247,0.08)", border: "1px solid rgba(79,142,247,0.2)",
                      borderRadius: 4, padding: "4px 12px",
                      fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#C0D0E8",
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects-section" style={{ background: "#080D1A", padding: "100px 5%" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionLabel label="Projects" />
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#F0F4FF", marginBottom: 48 }}>
          Things I've built
        </h2>
        <div style={{ display: "grid", gap: 28 }}>
          {PROJECTS.map((p, i) => (
            <div key={p.title} style={{
              background: "#1A2340", border: "1px solid rgba(79,142,247,0.15)",
              borderRadius: 12, padding: "32px 36px",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(79,142,247,0.5)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(79,142,247,0.15)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#4F8EF7", letterSpacing: 1, marginBottom: 6 }}>
                    PROJECT 0{i + 1}
                  </div>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#F0F4FF", margin: 0 }}>{p.title}</h3>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#6A7A90", marginTop: 4 }}>{p.period}</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <ProjectLink href={p.github} label="GitHub ↗" />
                  <ProjectLink href={p.live} label="Live ↗" primary />
                </div>
              </div>
              <ul style={{ margin: "16px 0", padding: "0 0 0 18px" }}>
                {p.points.map(pt => (
                  <li key={pt} style={{ fontFamily: "'Inter', sans-serif", color: "#A0B0C8", fontSize: 14, lineHeight: 1.8, marginBottom: 6 }}>{pt}</li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {p.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: "'Space Mono', monospace", fontSize: 11,
                    color: "#4F8EF7", background: "rgba(79,142,247,0.08)",
                    border: "1px solid rgba(79,142,247,0.2)", borderRadius: 4, padding: "3px 10px",
                  }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience-section" style={{ background: "#0A0F1E", padding: "100px 5%" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionLabel label="Experience" />
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#F0F4FF", marginBottom: 48 }}>
          Work & achievements
        </h2>
        {EXPERIENCE.map(e => (
          <div key={e.company} style={{
            background: "#1A2340", border: "1px solid rgba(79,142,247,0.15)",
            borderRadius: 12, padding: "32px 36px", marginBottom: 28,
            borderLeft: "3px solid #4F8EF7",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              <div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#F0F4FF", margin: "0 0 4px" }}>{e.role}</h3>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#4F8EF7", fontWeight: 500 }}>{e.company}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#6A7A90", marginTop: 4 }}>{e.location}</div>
              </div>
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#A0B0C8",
                background: "rgba(79,142,247,0.08)", border: "1px solid rgba(79,142,247,0.2)",
                borderRadius: 6, padding: "4px 12px", height: "fit-content",
              }}>{e.period}</span>
            </div>
            <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
              {e.points.map(pt => (
                <li key={pt} style={{ fontFamily: "'Inter', sans-serif", color: "#A0B0C8", fontSize: 14, lineHeight: 1.8, marginBottom: 6 }}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
        {/* Achievements */}
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#F0F4FF", marginBottom: 20, marginTop: 40 }}>
          Certifications & achievements
        </h3>
        <div style={{ display: "grid", gap: 12 }}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              background: "rgba(79,142,247,0.05)", border: "1px solid rgba(79,142,247,0.12)",
              borderRadius: 8, padding: "14px 18px",
            }}>
              <span style={{ color: "#4F8EF7", fontSize: 16, marginTop: 2, flexShrink: 0 }}>✦</span>
              <span style={{ fontFamily: "'Inter', sans-serif", color: "#A0B0C8", fontSize: 14, lineHeight: 1.7 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact-section" style={{ background: "#080D1A", padding: "100px 5%" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel label="Contact" />
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#F0F4FF", marginBottom: 16 }}>
          Let's work together
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", color: "#A0B0C8", fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>
          I'm actively looking for full-time MERN Stack / Full Stack Developer roles. If you have an opportunity or just want to connect, feel free to reach out!
        </p>
        <a href="mailto:savinmv303@gmail.com"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #4F8EF7, #7B6CF7)",
            color: "#fff", fontFamily: "'Inter', sans-serif", fontWeight: 600,
            fontSize: 16, padding: "16px 40px", borderRadius: 8, textDecoration: "none",
            letterSpacing: 0.3, marginBottom: 48,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 28px rgba(79,142,247,0.4)"; }}
          onMouseOut={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
        >
          savinmv303@gmail.com
        </a>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "GitHub", href: "https://github.com/SavinMv" },
            { label: "LinkedIn", href: "https://linkedin.com/in/savin-mv-76b06533b" },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#4F8EF7",
                textDecoration: "none", border: "1px solid rgba(79,142,247,0.3)",
                padding: "10px 24px", borderRadius: 6, transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseOver={e => { e.target.style.background = "rgba(79,142,247,0.1)"; e.target.style.borderColor = "#4F8EF7"; }}
              onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(79,142,247,0.3)"; }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
        <div style={{ marginTop: 60, fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#3A4A60", letterSpacing: 1 }}>
          Built with React.js · Deployed on Vercel
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#4F8EF7", letterSpacing: 2, textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(79,142,247,0.2)" }} />
    </div>
  );
}

function InfoPill({ icon, text }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: "rgba(79,142,247,0.07)", border: "1px solid rgba(79,142,247,0.15)",
      borderRadius: 6, padding: "6px 12px",
      fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#A0B0C8",
    }}>
      <span>{icon}</span><span>{text}</span>
    </div>
  );
}

function ProjectLink({ href, label, primary }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      style={{
        fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
        color: primary ? "#0A0F1E" : "#4F8EF7",
        background: primary ? "#4F8EF7" : "transparent",
        border: `1px solid ${primary ? "#4F8EF7" : "rgba(79,142,247,0.4)"}`,
        padding: "7px 16px", borderRadius: 6, textDecoration: "none",
        transition: "opacity 0.2s",
      }}
      onMouseOver={e => e.target.style.opacity = 0.8}
      onMouseOut={e => e.target.style.opacity = 1}
    >{label}</a>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");

  const handleNav = (label) => {
    setActiveNav(label);
    const id = label.toLowerCase() + "-section";
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.toLowerCase() + "-section"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const name = e.target.id.replace("-section", "");
          setActiveNav(name.charAt(0).toUpperCase() + name.slice(1));
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#0A0F1E", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <Navbar active={activeNav} onNav={handleNav} />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}
