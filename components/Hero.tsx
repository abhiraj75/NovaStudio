"use client";

import { useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { track } from "@/lib/analytics";
import s from "@/styles/Hero.module.css";

export default function Hero() {
  useEffect(() => { track("page_visit", "/"); }, []);

  const scroll = () => {
    track("cta_click", "/");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={s.hero}>
      <div className={s.content}>
        <span className={s.label}>Nova Studio</span>
        <Typography
          variant="h1"
          className={s.heading}
          sx={{ fontWeight: 300, mb: "2.5rem", letterSpacing: "-0.5px" }}
        >
          We build digital products that move people
        </Typography>
        <p className={s.sub}>
          Strategy, design, and engineering for teams that ship. From first
          wireframe to production deploy, we turn ideas into interfaces.
        </p>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={s.cta}
          onClick={scroll}
          id="hero-cta"
          sx={{ borderRadius: "6px", px: "32px", py: "14px" }}
        >
          Start a Project
        </Button>
      </div>
    </section>
  );
}
