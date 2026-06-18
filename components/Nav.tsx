"use client";

import s from "@/styles/Nav.module.css";

function scroll(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  return (
    <nav className={s.nav}>
      <span className={s.logo}>Nova Studio</span>
      <ul className={s.links}>
        <li>
          <button className={s.link} onClick={() => scroll("services")}>
            Services
          </button>
        </li>
        <li>
          <button className={s.link} onClick={() => scroll("portfolio")}>
            Work
          </button>
        </li>
        <li>
          <button className={s.link} onClick={() => scroll("contact")}>
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
}
