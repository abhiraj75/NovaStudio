"use client";

import { Typography, Button } from "@mui/material";
import s from "@/styles/Hero.module.css";

export default function Hero() {
  const scroll = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={s.hero}>
      <div className={s.content}>
        <span className={s.label}>Nova Studio</span>
        <Typography variant="h1" className={s.heading}>
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
        >
          Start a Project
        </Button>
      </div>
    </section>
  );
}
