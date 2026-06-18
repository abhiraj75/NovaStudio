"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Typography } from "@mui/material";
import s from "@/styles/Stats.module.css";

type Stat = { label: string; value: number; suffix: string };

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!active || ran.current) return;
    ran.current = true;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  return val;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, active);
  return (
    <div className={s.stat}>
      <div className={s.value}>
        {count}
        {stat.suffix}
      </div>
      <div className={s.label}>{stat.label}</div>
    </div>
  );
}

export default function Stats({ stats }: { stats: Stat[] }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const observe = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    ref.current = node;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
  }, []);

  return (
    <section className={s.section} ref={observe} id="stats">
      <div className={s.inner}>
        <Typography variant="h2" className={s.title}>
          By the Numbers
        </Typography>
        <div className={s.grid}>
          {stats.map((st) => (
            <StatItem key={st.label} stat={st} active={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
