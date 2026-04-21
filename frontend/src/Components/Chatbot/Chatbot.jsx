import { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────────
   LANGUAGE CONFIG
───────────────────────────────────────────── */
const LANGUAGES = [
  { code: "en", label: "EN", full: "English", voice: "en-US", greeting: "Hi! Ask me anything about Dinesh — his skills, projects, education, or experience." },
  { code: "hi", label: "HI", full: "Hindi", voice: "hi-IN", greeting: "नमस्ते! दिनेश के बारे में कुछ भी पूछें — उनकी स्किल्स, प्रोजेक्ट्स, शिक्षा या अनुभव।" },
  { code: "es", label: "ES", full: "Spanish", voice: "es-ES", greeting: "¡Hola! Pregúntame cualquier cosa sobre Dinesh — sus habilidades, proyectos, educación o experiencia." },
  { code: "fr", label: "FR", full: "French", voice: "fr-FR", greeting: "Bonjour ! Posez-moi n'importe quelle question sur Dinesh — ses compétences, projets, formation ou expérience." },
  { code: "de", label: "DE", full: "German", voice: "de-DE", greeting: "Hallo! Fragen Sie mich alles über Dinesh — seine Fähigkeiten, Projekte, Ausbildung oder Erfahrung." },
  { code: "ja", label: "JA", full: "Japanese", voice: "ja-JP", greeting: "こんにちは！ディネッシュのスキル、プロジェクト、学歴、経験など何でも聞いてください。" },
  { code: "zh", label: "ZH", full: "Chinese", voice: "zh-CN", greeting: "你好！请询问关于 Dinesh 的任何问题——他的技能、项目、教育或经验。" },
  { code: "ar", label: "AR", full: "Arabic", voice: "ar-SA", greeting: "مرحباً! اسألني عن دينيش — مهاراته ومشاريعه وتعليمه وخبرته." },
];

/* ─────────────────────────────────────────────
   SYSTEM PROMPT — populated from Dinesh_CV.pdf
───────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are an AI assistant embedded in Dinesh Maharana's portfolio website.
Your ONLY job is to answer questions about Dinesh based on his resume information below.
If a question is NOT related to Dinesh's resume/portfolio, politely decline and redirect.
Never answer general coding questions, world events, or anything outside the resume.
Always respond in the EXACT language specified by [LANGUAGE: ...] at the start of the user message.
Keep answers concise — 2 to 4 sentences unless detail is explicitly requested.
Be enthusiastic and professional — you are representing Dinesh to potential recruiters.

══════════════════ DINESH'S RESUME ══════════════════

NAME: Dinesh Maharana
LOCATION: Bhubaneswar, India
PHONE: +91-63729 23522
EMAIL: dineshmaharana13@gmail.com
GITHUB: Dev-Dinesh10
LINKEDIN: dinesh-maharana
PORTFOLIO: Available on request

── TECHNICAL SKILLS ──
Programming Languages : JavaScript, TypeScript, Java, SQL, HTML5, CSS3
Frameworks & Libraries: React.js, Node.js, Express.js, React Native, Tailwind CSS, Chart.js, Recharts
Databases & Cloud     : MongoDB, REST API, Vector Databases, JWT Authentication
Developer Tools       : VS Code, Git, GitHub, Expo CLI, Postman, Thunder Client
Concepts              : MVC Architecture, RAG Pipeline, State Management, Agile, CI/CD, API Integration

── EXPERIENCE ──

1. Software Trainee – React Native Developer
   Company  : ITPlusPoint
   Duration : Aug 2024 – Present
   Location : Bhubaneswar, India
   • Developed and deployed cross-platform Android mobile applications using React Native with modular, reusable component architecture.
   • Integrated RESTful APIs with centralized state management via Context API, implementing asynchronous data handling for real-time user experiences.
   • Identified and resolved critical performance bottlenecks, reducing application crash rates and improving UI render efficiency across multiple device profiles.

2. Web Development Intern
   Company  : ITPlusPoint
   Duration : Jun 2024 – Aug 2024
   Location : Bhubaneswar, India
   • Built and deployed a full-scale Asset Management System using the MERN stack with role-based access control (RBAC).
   • Implemented end-to-end modules for asset lifecycle tracking, vendor management, assignment workflows, and maintenance audit logging.
   • Developed interactive analytics dashboards using Chart.js with a fully responsive UI built in Tailwind CSS.

── PROJECTS ──

1. AI Chatbot with RAG Pipeline (Mar 2026)
   • Full-stack RAG chatbot with real-time streaming via SSE and multi-model support (Gemini/Gemma, Llama 3) using OpenRouter and Groq.
   • RAG pipeline using local HuggingFace (Xenova) embeddings and cosine similarity-based retrieval over MongoDB.
   • JWT-authenticated APIs with thread-based sessions for persistent chat history and document-to-user indexing.
   • Real-time analytics dashboard using Recharts to track token usage, throughput, and active sessions.

2. Contact Management System – Backend (Mar 2025)
   • Scalable RESTful APIs following MVC design pattern with clean separation of concerns.
   • Stateless JWT-based authentication with bcrypt hashing for secure credential storage.
   • Modular middleware pipeline for request validation, centralized error handling, and protected route authorization.
   • Comprehensive API testing using Thunder Client covering positive flows, edge cases, and failure scenarios.

3. Prompt-to-Image Generator (2025)
   • AI-powered image generation platform that translates natural language prompts into high-fidelity visuals using a Generative AI API.
   • Scalable Node.js backend with prompt sanitization, API orchestration, rate limiting, and structured error recovery.
   • Optimized frontend with real-time loading state management, responsive layout, and cross-device input validation.

── EDUCATION ──

• Bachelor of Technology – Electronics and Telecommunication Engineering | 73%
  Parala Maharaj Engineering College, Berhampur, India
  Dec 2020 – May 2024

• Senior Secondary Education (PCM) | 60%
  Sri Chaitanya Techno School, Visakhapatnam, India
  Aug 2017 – Jul 2019

── CERTIFICATIONS ──
• Oracle Cloud Infrastructure – Generative AI Professional
• Oracle Database – AI Vector Search Professional
• MERN Stack Development – Course Completion Certificate, JSpiders

══════════════════════════════════════════════════════

STRICT RULES:
1. Only answer from the resume data above. Do not make up details.
2. If asked something not covered (e.g. salary, personal life, general tech questions), respond:
   "I only have information from Dinesh's resume. For more details, please contact Dinesh directly via the contact form on this portfolio."
3. Respond in the language specified in [LANGUAGE: ...] at the start of the message.`;


/* ─────────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────────── */
function useIsMobile(breakpoint = 480) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

/* ─────────────────────────────────────────────
   GLOBAL STYLES (injected once)
───────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

  @keyframes chatDotBounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
  }
  @keyframes waveBar {
    from { transform: scaleY(0.4); transform-origin: center; }
    to   { transform: scaleY(1);   transform-origin: center; }
  }
  @keyframes lunaFadeIn {
    from { opacity: 0; transform: translateY(12px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes lunaFadeOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }

  /* Panel base */
  .luna-panel {
    position: fixed;
    right: 28px;
    bottom: 100px;
    width: 370px;
    height: 560px;
    border-radius: 20px;
    background: linear-gradient(160deg, #e8fae8 0%, #fefff0 50%, #f0fde4 100%);
    border: 1px solid rgba(100,180,100,0.2);
    box-shadow: 0 20px 60px rgba(80,160,80,0.18), inset 0 1px 0 rgba(255,255,255,0.9);
    display: flex;
    flex-direction: column;
    z-index: 9998;
    font-family: 'DM Sans', system-ui, sans-serif;
    overflow: hidden;
    animation: lunaFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;
  }

  /* Tablet */
  @media (max-width: 600px) {
    .luna-panel {
      right: 12px !important;
      bottom: 92px !important;
      width: calc(100vw - 24px) !important;
      height: calc(100dvh - 112px) !important;
      border-radius: 16px !important;
    }
    .luna-fab {
      bottom: 20px !important;
      right: 16px !important;
    }
  }

  /* Mobile full-screen */
  @media (max-width: 380px) {
    .luna-panel {
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      height: 100dvh !important;
      border-radius: 0 !important;
      border: none !important;
    }
    .luna-fab {
      bottom: 16px !important;
      right: 16px !important;
    }
  }

  /* Scrollbar hidden */
  .luna-messages::-webkit-scrollbar { display: none; }
  .luna-textarea::-webkit-scrollbar { display: none; }
`;

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [messages, setMessages] = useState([{ role: "assistant", content: LANGUAGES[0].greeting }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showLangs, setShowLangs] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const isMobile = useIsMobile(600);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    const load = () => window.speechSynthesis?.getVoices();
    load();
    window.speechSynthesis?.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", load);
  }, []);

  // Lock body scroll on mobile when chat is open
  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, open]);

  const switchLang = (l) => {
    setLang(l);
    setShowLangs(false);
    setMessages([{ role: "assistant", content: l.greeting }]);
    stopSpeech();
  };

  /* ── TTS ── */
  const speak = (text, voiceTag) => {
    if (muted || !window.speechSynthesis) return;
    stopSpeech();
    const utter = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const exact = voices.find((v) => v.lang === voiceTag);
    const prefix = voices.find((v) => v.lang.startsWith(voiceTag.slice(0, 2)));
    if (exact) utter.voice = exact;
    else if (prefix) utter.voice = prefix;
    utter.lang = voiceTag;
    utter.rate = 0.95;
    utter.pitch = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  const stopSpeech = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  };

  /* ── SEND MESSAGE ── */
  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    stopSpeech();

    const userMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);

    try {
      const firstUserIndex = next.findIndex(m => m.role === "user");
      const filteredNext = firstUserIndex !== -1 ? next.slice(firstUserIndex) : next;

      const apiMsgs = filteredNext.map((m, i) =>
        i === filteredNext.length - 1
          ? { role: m.role, content: `[LANGUAGE: ${lang.full}]\n${m.content}` }
          : { role: m.role, content: m.content }
      );

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          stream: true,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...apiMsgs,
          ],
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Groq API Error:", data);
        const errorMsg = data.error?.message || "Unknown API error";
        setMessages((prev) => [...prev, { role: "assistant", content: `API Error: ${errorMsg}` }]);
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.trim().startsWith("data: ")) {
            const jsonPart = line.replace("data: ", "").trim();
            if (jsonPart === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonPart);
              const content = parsed.choices?.[0]?.delta?.content || "";
              if (content) {
                fullContent += content;
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastIdx = updated.length - 1;
                  if (updated[lastIdx].role === "assistant") {
                    updated[lastIdx] = { ...updated[lastIdx], content: fullContent };
                  }
                  return updated;
                });
              }
            } catch (e) {
              // ignore partial JSON
            }
          }
        }
      }

      if (fullContent) speak(fullContent, lang.voice);
    } catch (err) {
      console.error("Chatbot Fetch Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please check your connection and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  /* ── RENDER ── */
  return (
    <>
      <GlobalStyles />

      {/* ── FAB ── */}
      <button
        className="luna-fab"
        onClick={() => { setOpen((o) => !o); stopSpeech(); setShowLangs(false); }}
        title="Chat with Luna AI"
        aria-label={open ? "Close Luna AI chat" : "Open Luna AI chat"}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "linear-gradient(145deg,#c8f5c8,#fefce8,#d4f7d4)",
          border: "1.5px solid rgba(100,180,100,0.3)",
          cursor: "pointer",
          boxShadow: "0 6px 28px rgba(120,200,120,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 8px 36px rgba(120,200,120,0.65)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(120,200,120,0.45)";
        }}
      >
        {speaking ? <SoundWaveIcon /> : open ? <CloseIconDark /> : <ChatIconDark />}
      </button>

      {/* ── PANEL ── */}
      {open && (
        <div className="luna-panel">

          {/* ── Header ── */}
          <div style={{
            padding: isMobile ? "12px 14px" : "14px 16px",
            background: "rgba(255,255,255,0.5)",
            borderBottom: "1px solid rgba(100,180,100,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backdropFilter: "blur(8px)",
            flexShrink: 0,
          }}>
            {/* Luna avatar */}
            <div style={{
              ...avatarStyle,
              background: "linear-gradient(135deg,#4ade80,#86efac)",
              fontSize: "13px",
            }}>🌙</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#1a2e1a", fontWeight: "700", fontSize: isMobile ? "13px" : "14px", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Luna AI
              </div>
              <div style={{ color: "#4a7a4a", fontSize: "11px" }}>Resume assistant · Ask anything</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
              <button
                onClick={() => { setMuted((m) => !m); if (!muted) stopSpeech(); }}
                title={muted ? "Unmute voice" : "Mute voice"}
                style={iconBtnStyle}
              >
                {muted ? <MuteIcon /> : <SpeakerIcon />}
              </button>

              {speaking && (
                <button onClick={stopSpeech} title="Stop speaking" style={{ ...iconBtnStyle, color: "#f87171" }}>
                  <StopIcon />
                </button>
              )}

              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowLangs((s) => !s)}
                  style={{
                    ...iconBtnStyle,
                    background: showLangs ? "rgba(100,180,100,0.2)" : "rgba(100,180,100,0.08)",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#2d6a2d",
                    gap: "3px",
                    minWidth: "38px",
                  }}
                >
                  {lang.label} <ChevronIcon />
                </button>

                {showLangs && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    background: "#f0fde4",
                    border: "1px solid rgba(100,180,100,0.25)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    zIndex: 10,
                    minWidth: "140px",
                    boxShadow: "0 8px 24px rgba(80,160,80,0.18)",
                  }}>
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => switchLang(l)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          width: "100%",
                          padding: "9px 14px",
                          background: l.code === lang.code ? "rgba(100,180,100,0.15)" : "transparent",
                          border: "none",
                          color: l.code === lang.code ? "#2d6a2d" : "#4a7a4a",
                          fontSize: "13px",
                          cursor: "pointer",
                          textAlign: "left",
                          fontWeight: l.code === lang.code ? "600" : "400",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          if (l.code !== lang.code) e.currentTarget.style.background = "rgba(100,180,100,0.08)";
                        }}
                        onMouseLeave={(e) => {
                          if (l.code !== lang.code) e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <span style={{ fontSize: "10px", fontWeight: "700", opacity: 0.6, minWidth: "20px" }}>
                          {l.label}
                        </span>
                        {l.full}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Close button — visible on mobile for full-screen UX */}
              {isMobile && (
                <button
                  onClick={() => { setOpen(false); stopSpeech(); }}
                  title="Close"
                  style={{ ...iconBtnStyle, padding: "6px" }}
                >
                  <CloseIconDark />
                </button>
              )}
            </div>
          </div>

          {/* ── Messages ── */}
          <div
            className="luna-messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: isMobile ? "12px 10px" : "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {messages.map((m, i) => (
              <Bubble
                key={i}
                msg={m}
                onSpeak={() => speak(m.content, lang.voice)}
                isMobile={isMobile}
              />
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ ...avatarStyle, fontSize: "13px" }}>🌙</div>
                <TypingDots />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── Speaking bar ── */}
          {speaking && (
            <div style={{
              padding: "6px 14px 8px",
              background: "rgba(100,180,100,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            }}>
              <SoundWaveIcon small />
              <span style={{ color: "#2d6a2d", fontSize: "11px", fontWeight: "500" }}>
                Speaking in {lang.full}…
              </span>
              <button
                onClick={stopSpeech}
                style={{
                  marginLeft: "auto",
                  background: "none",
                  border: "none",
                  color: "#dc2626",
                  fontSize: "11px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Stop
              </button>
            </div>
          )}

          {/* ── Input bar ── */}
          <div style={{
            padding: isMobile ? "10px" : "12px",
            borderTop: "1px solid rgba(100,180,100,0.15)",
            background: "rgba(255,255,255,0.55)",
            display: "flex",
            gap: "8px",
            alignItems: "flex-end",
            backdropFilter: "blur(8px)",
            flexShrink: 0,
          }}>
            <textarea
              className="luna-textarea"
              ref={(el) => { inputRef.current = el; textareaRef.current = el; }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={`Ask about Dinesh in ${lang.full}…`}
              rows={1}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(100,180,100,0.25)",
                borderRadius: "12px",
                color: "#1a2e1a",
                fontSize: isMobile ? "15px" : "14px", // 16px+ avoids iOS zoom
                padding: "10px 14px",
                resize: "none",
                outline: "none",
                fontFamily: "inherit",
                lineHeight: "1.5",
                maxHeight: "100px",
                overflowY: "auto",
                scrollbarWidth: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(60,150,60,0.7)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(100,180,100,0.25)")}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: loading || !input.trim()
                  ? "rgba(100,180,100,0.2)"
                  : "linear-gradient(135deg,#4ade80,#86efac)",
                border: "none",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s, transform 0.15s",
                boxShadow: loading || !input.trim() ? "none" : "0 4px 12px rgba(74,222,128,0.4)",
              }}
              onMouseEnter={(e) => { if (!loading && input.trim()) e.currentTarget.style.transform = "scale(1.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              <SendIcon active={!loading && !!input.trim()} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   BUBBLE COMPONENT
───────────────────────────────────────────── */
function Bubble({ msg, onSpeak, isMobile }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      flexDirection: isUser ? "row-reverse" : "row",
      alignItems: "flex-end",
      gap: "8px",
    }}>
      {!isUser && (
        <div style={{ ...avatarStyle, fontSize: "13px" }}>🌙</div>
      )}

      <div style={{
        maxWidth: isMobile ? "85%" : "80%",
        background: isUser
          ? "linear-gradient(135deg,#4ade80,#86efac)"
          : "rgba(255,255,255,0.75)",
        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        padding: "10px 14px",
        color: isUser ? "#1a2e1a" : "#2a3a2a",
        fontSize: isMobile ? "14px" : "13.5px",
        lineHeight: "1.6",
        wordBreak: "break-word",
        border: isUser ? "none" : "1px solid rgba(100,180,100,0.2)",
        boxShadow: isUser ? "0 4px 14px rgba(74,222,128,0.3)" : "0 2px 8px rgba(80,160,80,0.08)",
      }}>
        {msg.content}
      </div>

      {!isUser && (
        <button
          onClick={onSpeak}
          title="Replay voice"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#2d8a2d",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            opacity: 0.7,
            flexShrink: 0,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TYPING DOTS
───────────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.75)",
      borderRadius: "16px 16px 16px 4px",
      padding: "12px 16px",
      border: "1px solid rgba(100,180,100,0.2)",
      display: "flex",
      gap: "5px",
      alignItems: "center",
    }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#4ade80",
          display: "inline-block",
          animation: `chatDotBounce 1.2s ${i * 0.2}s infinite ease-in-out`,
        }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SOUND WAVE ICON
───────────────────────────────────────────── */
function SoundWaveIcon({ small }) {
  const sz = small ? 14 : 20;
  const bars = [
    { x: 2, h: 8, d: "0s" },
    { x: 6, h: 14, d: "0.1s" },
    { x: 10, h: 20, d: "0.2s" },
    { x: 14, h: 14, d: "0.1s" },
    { x: 18, h: 8, d: "0s" },
  ];
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={(24 - b.h) / 2} width="3" height={b.h} rx="1.5" fill="#2d8a2d"
          style={{ animation: `waveBar 0.8s ${b.d} infinite ease-in-out alternate` }} />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   ICON COMPONENTS
───────────────────────────────────────────── */
function ChatIconDark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function CloseIconDark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a4a1a" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function SendIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#1a4a1a" : "rgba(30,80,30,0.35)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function SpeakerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}
function MuteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}
function StopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SHARED STYLES
───────────────────────────────────────────── */
const avatarStyle = {
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#4ade80,#86efac)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "13px",
  fontWeight: "700",
  color: "#1a3a1a",
  flexShrink: 0,
  boxShadow: "0 0 8px rgba(74,222,128,0.4)",
};

const iconBtnStyle = {
  background: "rgba(100,180,100,0.08)",
  border: "1px solid rgba(100,180,100,0.2)",
  borderRadius: "8px",
  color: "#2d6a2d",
  cursor: "pointer",
  padding: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.15s, color 0.15s",
};