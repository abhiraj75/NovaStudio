"use client";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import s from "@/styles/Services.module.css";

type Service = { title: string; description: string };

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setServices)
      .catch(() => setErr(true));
  }, []);

  return (
    <section className={s.section} id="services">
      <Typography variant="h2" className={s.title}>
        What We Do
      </Typography>
      {err ? (
        <p className={s.error}>Could not load services right now.</p>
      ) : (
        <div className={s.grid}>
          {services.map((svc) => (
            <div key={svc.title} className={s.card}>
              <h3 className={s.cardTitle}>{svc.title}</h3>
              <p className={s.cardDesc}>{svc.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
