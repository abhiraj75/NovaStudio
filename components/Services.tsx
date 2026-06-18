import { Typography } from "@mui/material";
import s from "@/styles/Services.module.css";

type Service = { title: string; description: string };

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Services({ services = [] }: { services: Service[] }) {
  return (
    <section className={s.section} id="services">
      <Typography variant="h2" className={s.title}>
        Our Craft
      </Typography>
      <p className={s.sub}>Strategy, design, and engineering — end to end.</p>
      <div className={s.grid}>
        {services.map((svc, i) => (
          <div key={svc.title} className={s.card}>
            <span className={s.index}>{pad(i + 1)}</span>
            <h3 className={s.cardTitle}>{svc.title}</h3>
            <p className={s.cardDesc}>{svc.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
