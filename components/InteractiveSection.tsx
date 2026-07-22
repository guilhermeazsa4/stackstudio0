"use client";

import { useEffect, useRef, useState } from "react";

const games = [
  {
    name: "Elemental Arena",
    role: "PvP arena de elementais",
    image: "/elemental.webp",
    href: "https://www.roblox.com/pt/games/82155860068637/Arena-Elemental",
    quote:
      "Fogo, gelo, raio ou void. Você escolhe seu elemental, entra na arena e tenta entender o adversário antes que ele entenda você. As lutas são rápidas, mas uma decisão certa pode mudar tudo.",
  },
  {
    name: "RUSH",
    role: "FPS arcade",
    image: "/rushh.webp",
    href: "https://www.roblox.com/pt/games/94938104348212/RUSH",
    quote:
      "Entrou, mirou, disparou. RUSH é um FPS arcade feito para partidas rápidas, movimentação leve e aquela vontade de jogar só mais uma. Sem enrolação e pensado para funcionar bem até nos dispositivos mais simples.",
  },
];

const SWIPE_DISTANCE_RATIO = 0.32;
const SWIPE_VELOCITY_THRESHOLD = 0.7;
const OVERSCROLL_RESISTANCE = 0.32;
const SNAP_DURATION = 620;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function InteractiveSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const stepRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const dragState = useRef({
    pointerId: -1,
    startX: 0,
    startTranslate: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const target = section.querySelector<HTMLElement>("[data-interactive-reveal]");
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("studio-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const setTranslate = (px: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(${px}px)`;
    currentTranslateRef.current = px;
  };

  const cancelSnap = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const snapToIndex = (targetIndex: number) => {
    cancelSnap();
    const startPos = currentTranslateRef.current;
    const endPos = -targetIndex * stepRef.current;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || startPos === endPos) {
      setTranslate(endPos);
      return;
    }

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / SNAP_DURATION, 1);
      const eased = easeOutCubic(t);
      setTranslate(startPos + (endPos - startPos) * eased);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const measure = () => {
      const first = cardRefs.current[0];
      const second = cardRefs.current[1];
      if (!first || !second) return;
      stepRef.current = second.offsetLeft - first.offsetLeft;
      if (dragState.current.pointerId === -1 && rafRef.current === null) {
        setTranslate(-index * stepRef.current);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;

    cancelSnap();
    setIsDragging(true);

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTranslate: currentTranslateRef.current,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };

    carouselRef.current?.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.pointerId !== event.pointerId) return;
    if (!trackRef.current) return;

    const now = performance.now();
    const dt = now - dragState.current.lastTime;
    if (dt > 0) {
      dragState.current.velocity = (event.clientX - dragState.current.lastX) / dt;
    }
    dragState.current.lastX = event.clientX;
    dragState.current.lastTime = now;

    const delta = event.clientX - dragState.current.startX;
    let translate = dragState.current.startTranslate + delta;

    const minTranslate = -(games.length - 1) * stepRef.current;
    const maxTranslate = 0;
    if (translate > maxTranslate) {
      translate = maxTranslate + (translate - maxTranslate) * OVERSCROLL_RESISTANCE;
    } else if (translate < minTranslate) {
      translate = minTranslate + (translate - minTranslate) * OVERSCROLL_RESISTANCE;
    }

    setTranslate(translate);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.pointerId !== event.pointerId) return;

    const delta = dragState.current.lastX - dragState.current.startX;
    const { velocity } = dragState.current;
    const step = stepRef.current || 1;

    let nextIndex = index;
    const distanceRatio = delta / step;

    if (distanceRatio <= -SWIPE_DISTANCE_RATIO || velocity <= -SWIPE_VELOCITY_THRESHOLD) {
      nextIndex = Math.min(index + 1, games.length - 1);
    } else if (distanceRatio >= SWIPE_DISTANCE_RATIO || velocity >= SWIPE_VELOCITY_THRESHOLD) {
      nextIndex = Math.max(index - 1, 0);
    }

    dragState.current.pointerId = -1;
    setIsDragging(false);
    setIndex(nextIndex);
    snapToIndex(nextIndex);
  };

  return (
    <section ref={sectionRef} id="interactive" data-nav-section="interactive" className="interactive-flow px-2 pb-4 lg:pb-6">
      <div className="w-full studio-reveal" data-interactive-reveal>
        <div className="interactive-bg">
          <img className="interactive-bg-img" src="/robloxstack.webp" alt="" loading="lazy" decoding="async" />
        </div>

        <p className="studio-statement">
          <span className="studio-statement-emoji">&#127918;</span>
          Nem toda experi&ecirc;ncia cabe em uma p&aacute;gina. Na <strong>Stack</strong>{" "}
          <strong className="studio-statement-strong">Interactive</strong>, criamos jogos e
          mundos dentro da <strong>Roblox</strong>.
        </p>

        <div
          ref={carouselRef}
          className={`game-carousel${isDragging ? " game-carousel-dragging" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div ref={trackRef} className="game-carousel-track">
            {games.map((game, i) => (
              <div
                key={game.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="game-card"
              >
                <img
                  className="game-card-media"
                  src={game.image}
                  alt={game.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <p className="game-card-quote">&ldquo;{game.quote}&rdquo;</p>
                <div className="game-card-meta">
                  <a
                    href={game.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="game-card-name"
                    draggable={false}
                  >
                    {game.name}
                  </a>
                  <span className="game-card-role">{game.role}</span>
                </div>
                {i === 0 && (
                  <svg
                    className="game-swipe-hint"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.707,17.707a1,1,0,0,1-1.414-1.414L19.586,13H2a1,1,0,0,1,0-2H19.586L16.293,7.707a1,1,0,0,1,1.414-1.414l5,5a1,1,0,0,1,0,1.414Z" />
                  </svg>
                )}
                {i === games.length - 1 && (
                  <svg
                    className={`game-swipe-hint game-swipe-hint-fade${index === i ? " game-swipe-hint-visible" : ""}`}
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.293,12.707a1,1,0,0,1,0-1.414l5-5A1,1,0,0,1,7.707,7.707L4.414,11H22a1,1,0,0,1,0,2H4.414l3.293,3.293a1,1,0,1,1-1.414,1.414Z" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
