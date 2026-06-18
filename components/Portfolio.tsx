"use client";

import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import s from "@/styles/Portfolio.module.css";

type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
};

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [empty, setEmpty] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => {
        setProjects(data);
        if (data.length === 0) setEmpty(true);
      })
      .catch(() => setEmpty(true));
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(`.${s.card}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add(s.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [projects]);

  return (
    <section className={s.section} id="portfolio">
      <Typography variant="h2" className={s.title}>
        Portfolio
      </Typography>
      <p className={s.sub}>A selection of recent projects across industries.</p>
      <div className={s.grid} ref={gridRef}>
        {empty && <p className={s.empty}>No projects to show yet.</p>}
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={s.card}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className={s.imgWrap}>
              <Image
                src={p.imageUrl}
                alt={p.title}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className={s.overlay} />
            </div>
            <div className={s.info}>
              <h3 className={s.projTitle}>{p.title}</h3>
              <span className={s.category}>{p.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
