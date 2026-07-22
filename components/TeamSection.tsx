"use client";

import { useEffect, useRef, useState } from "react";

const team = [
  {
    name: "Guilherme Azevedo",
    role: "UX & Desenvolvimento",
    city: "Lisboa, Portugal",
    image: "/guilherme2.webp",
    quote:
      "Eu gosto de pegar uma ideia meio solta e descobrir como ela pode virar algo bonito, criativo e fácil de usar. Na Stack, penso em cada caminho para que ninguém precise parar e se perguntar onde clicar ou o que fazer.",
  },
  {
    name: "Vinícius Azevedo",
    role: "Desenvolvimento de Sistemas",
    city: "Curitiba, Brasil",
    image: "/vinicius.webp",
    quote:
      "Meu trabalho começa justamente onde quase ninguém olha. Na Stack, construo os sistemas que mantêm tudo funcionando com rapidez, segurança e estabilidade, mesmo quando o projeto cresce e começa a exigir muito mais.",
  },
];

const SWIPE_DISTANCE_RATIO = 0.32;
const SWIPE_VELOCITY_THRESHOLD = 0.7;
const OVERSCROLL_RESISTANCE = 0.32;
const SNAP_DURATION = 620;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function TeamSection() {
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

    const target = section.querySelector<HTMLElement>("[data-team-reveal]");
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

    const minTranslate = -(team.length - 1) * stepRef.current;
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
      nextIndex = Math.min(index + 1, team.length - 1);
    } else if (distanceRatio >= SWIPE_DISTANCE_RATIO || velocity >= SWIPE_VELOCITY_THRESHOLD) {
      nextIndex = Math.max(index - 1, 0);
    }

    dragState.current.pointerId = -1;
    setIsDragging(false);
    setIndex(nextIndex);
    snapToIndex(nextIndex);
  };

  return (
    <section ref={sectionRef} id="equipe" data-nav-section="studio" className="studio-flow px-2 pt-10 pb-4 lg:pt-14 lg:pb-6">
      <div className="w-full studio-reveal" data-team-reveal>
        <p className="studio-statement">
          Sem burocracia, sem camadas. Voc&ecirc; fala direto com quem cria.&#129309;
        </p>

        <div
          ref={carouselRef}
          className={`team-carousel${isDragging ? " team-carousel-dragging" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div ref={trackRef} className="team-carousel-track">
            {team.map((person, i) => (
              <div
                key={person.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="team-card"
              >
                <img
                  className="team-card-media"
                  src={person.image}
                  alt={person.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <p className="team-card-quote">&ldquo;{person.quote}&rdquo;</p>
                <div className="team-card-meta">
                  <span className="team-card-name">{person.name}</span>
                  <span className="team-card-role">
                    {person.role} &middot; {person.city}
                  </span>
                </div>
                {i === 0 && (
                  <svg
                    className="team-swipe-hint"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.707,17.707a1,1,0,0,1-1.414-1.414L19.586,13H2a1,1,0,0,1,0-2H19.586L16.293,7.707a1,1,0,0,1,1.414-1.414l5,5a1,1,0,0,1,0,1.414Z" />
                  </svg>
                )}
                {i === team.length - 1 && (
                  <svg
                    className={`team-swipe-hint team-swipe-hint-fade${index === i ? " team-swipe-hint-visible" : ""}`}
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
