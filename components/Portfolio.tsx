"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import s from "@/styles/Portfolio.module.css";
import f from "@/styles/PortfolioFilter.module.css";

type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
};

export default function Portfolio({ projects = [] }: { projects: Project[] }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, [projects]);

  const filtered = useMemo(() => {
    let list = projects;
    if (active !== "All") list = list.filter((p) => p.category === active);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [projects, active, query]);

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
  }, [filtered]);

  return (
    <section className={s.section} id="portfolio">
      <Typography variant="h2" className={s.title}>
        Portfolio
      </Typography>
      <p className={s.sub}>A selection of recent projects across industries.</p>

      <div className={f.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === active ? f.filterBtnActive : f.filterBtn}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
        <input
          type="text"
          className={f.search}
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          id="portfolio-search"
        />
      </div>

      <div className={s.grid} ref={gridRef}>
        {filtered.length === 0 && (
          <p className={s.empty}>No projects match your filter.</p>
        )}
        {filtered.map((p, i) => (
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
