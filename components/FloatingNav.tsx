"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor" />
    <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="currentColor" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z" />
    <path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z" fill="currentColor" />
  </svg>
);

const socialLinks = [
  { icon: InstagramIcon, href: "https://instagram.com/stackstudio0", label: "Instagram" },
  { icon: WhatsAppIcon, href: "https://wa.me/5541995141454", label: "WhatsApp" },
];

const sectionMessages = [
  { id: "hero", label: "Nós somos Stack." },
  { id: "portfolio", label: "Isso aqui é só amostra." },
  { id: "studio", label: "Tem gente por trás disso." },
  { id: "interactive", label: "Também construímos mundos." },
  { id: "contact", label: "Chama a gente agora." },
];

const menuItems = [
  { id: "hero", label: "Início", href: "#", thumb: "/hero/hero2.webp" },
  { id: "portfolio", label: "Portfólio", href: "#next", thumb: "/editorahaust.webp" },
  { id: "interactive", label: "Stack Interactive", href: "#interactive", thumb: "/elemental.webp" },
  { id: "studio", label: "Equipe", href: "#equipe", thumb: "/team2.webp" },
];

const IDLE_HINT_DELAY = 2500;

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIdleHint, setShowIdleHint] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleHintUsed = useRef(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
    if (!sections.length) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const navEl = navRef.current;
      if (!navEl) return;
      const navRect = navEl.getBoundingClientRect();
      const probeY = navRect.top + navRect.height / 2;

      let matchId: string | null = null;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          matchId = section.getAttribute("data-nav-section");
          break;
        }
      }

      if (!matchId) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.top <= probeY) {
            matchId = sections[i].getAttribute("data-nav-section");
            break;
          }
        }
      }

      if (matchId) {
        const index = sectionMessages.findIndex((section) => section.id === matchId);
        if (index !== -1) setActiveSection(index);
      }
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMenuOpen(false), 1300);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  const activeMessage = sectionMessages[activeSection];
  const isHero = activeMessage.id === "hero";

  useEffect(() => {
    const clearIdleTimer = () => {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
    };

    if (!isHero || menuOpen || idleHintUsed.current) {
      clearIdleTimer();
      setShowIdleHint(false);
      return;
    }

    idleTimer.current = setTimeout(() => {
      idleHintUsed.current = true;
      setShowIdleHint(true);
    }, IDLE_HINT_DELAY);

    const resetIdle = () => {
      clearIdleTimer();
      setShowIdleHint(false);
    };

    window.addEventListener("scroll", resetIdle, { passive: true });
    window.addEventListener("wheel", resetIdle, { passive: true });
    window.addEventListener("touchmove", resetIdle, { passive: true });
    navRef.current?.addEventListener("click", resetIdle);

    return () => {
      clearIdleTimer();
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("wheel", resetIdle);
      window.removeEventListener("touchmove", resetIdle);
      navRef.current?.removeEventListener("click", resetIdle);
    };
  }, [isHero, menuOpen]);

  const theme = {
    navBg: isHero ? "bg-white" : "bg-[#141414]",
    fg: isHero ? "text-[#14181e]" : "text-white",
    fgMuted50: isHero ? "text-[#14181e]/50" : "text-white/50",
    fgMuted70: isHero ? "text-[#14181e]/70" : "text-white/70",
    hoverFg: isHero ? "hover:text-[#14181e]" : "hover:text-white",
    border: isHero ? "border-[#14181e]/10" : "border-white/10",
    divide: isHero ? "divide-[#14181e]/10" : "divide-white/10",
    ctaBg: "bg-[#0079ee]",
    ctaFg: "text-white",
  };

  return (
    <nav
      ref={navRef}
      className={`floating-nav-dock-visible fixed bottom-5 left-1/2 z-[9999] flex w-[684px] max-w-[calc(100%-24px)] flex-col overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,.28)] transition-colors duration-500 sm:bottom-8 ${theme.navBg} ${theme.fg} ${
        menuOpen ? "rounded-[28px]" : "rounded-[999px]"
      }`}
      style={{ transform: "translateX(-50%)" }}
      aria-label="Navegacao principal"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <div
        className={`flex h-[53px] shrink-0 items-center justify-between gap-3 px-[23px] ${!menuOpen ? "group cursor-pointer" : ""}`}
        role={!menuOpen ? "button" : undefined}
        tabIndex={!menuOpen ? 0 : undefined}
        aria-label={!menuOpen ? "Abrir menu" : undefined}
        aria-expanded={!menuOpen ? false : undefined}
        onClick={() => {
          if (!menuOpen) setMenuOpen(true);
        }}
        onKeyDown={(e) => {
          if (!menuOpen && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setMenuOpen(true);
          }
        }}
      >
        <span className="relative h-[27px] w-[30px] shrink-0 overflow-hidden">
          <span
            className="stack-dock-logo absolute inset-0 m-auto transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full"
            style={isHero ? undefined : { background: "#ffffff" }}
            aria-hidden="true"
          />
          <span className={`absolute inset-0 grid translate-y-full place-items-center transition-[color,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 ${theme.fg}`}>
            <ArrowUpIcon />
          </span>
        </span>

        <div className="relative hidden h-[26px] min-w-0 flex-1 overflow-hidden sm:block">
          <div className="transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-full">
            <span
              key={showIdleHint ? "idle-hint" : activeMessage.id}
              className={`floating-nav-message-line block whitespace-nowrap text-[21px] font-medium leading-[26px] transition-colors duration-500 ${theme.fg}`}
            >
              {showIdleHint ? "Role para baixo, por favor." : activeMessage.label}
            </span>
          </div>

          <span className={`absolute inset-0 -translate-y-full whitespace-nowrap text-[21px] font-medium leading-[26px] transition-[color,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 ${theme.fg}`}>
            Abrir menu
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-[14px]">
          <a
            className={`flex h-[41px] items-center rounded-full px-[26px] text-[20px] font-medium leading-none transition-colors duration-500 ${theme.ctaBg} ${theme.ctaFg}`}
            href="https://wa.me/5541995141454"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Vamos conversar
          </a>

          {!menuOpen && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(true);
              }}
              aria-label="Abrir menu"
              aria-expanded={false}
              className={`grid h-[30px] w-[30px] shrink-0 place-items-center transition-colors duration-500 ${theme.fg}`}
            >
              <Plus size={30} strokeWidth={2.3} />
            </button>
          )}
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className={`divide-y border-t transition-colors duration-500 ${theme.divide} ${theme.border}`}>
            {menuItems.map(({ id, label, href, thumb }) => {
              const isActive = id === activeMessage.id;
              return (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="group flex min-h-[108px] items-stretch sm:items-center gap-4"
              >
                <img
                  src={thumb}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`h-[108px] w-[192px] max-w-[36vw] shrink-0 self-stretch sm:aspect-video sm:h-auto sm:self-center object-cover transition-[filter] duration-300 group-hover:grayscale-0 [backface-visibility:hidden] [transform:translateZ(0)] [will-change:filter] ${isActive ? "grayscale-0" : "grayscale"}`}
                />
                <span
                  className={`flex flex-1 items-center py-7 pr-6 text-[19px] font-medium transition-colors duration-300 group-hover:text-[var(--accent)] ${isActive ? "text-[var(--accent)]" : theme.fg}`}
                >
                  {label}
                </span>
              </a>
              );
            })}
          </div>

          <div className={`flex h-14 items-center justify-between border-t px-6 text-[14px] transition-colors duration-500 ${theme.border} ${theme.fgMuted50}`}>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-500 ${theme.fg}`}
                >
                  <Icon />
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              aria-expanded={true}
              className={`grid h-9 w-9 shrink-0 place-items-center transition-colors duration-500 ${theme.fg}`}
            >
              <Minus size={19} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
