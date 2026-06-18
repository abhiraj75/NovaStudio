"use client";

import { useEffect, useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { validateProject, hasErrors, FieldErrors } from "@/lib/validation";
import s from "@/styles/Admin.module.css";

type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
};

const blank = { title: "", category: "", imageUrl: "" };

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(blank);
  const [errs, setErrs] = useState<FieldErrors>({});
  const [adding, setAdding] = useState(false);

  const load = () =>
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const set = (field: string, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrs((e) => {
      const next = { ...e };
      delete next[field];
      return next;
    });
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validateProject(form);
    if (hasErrors(v)) { setErrs(v); return; }
    setAdding(true);
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm(blank);
      setErrs({});
      load();
    }
    setAdding(false);
  };

  const remove = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((p) => p.filter((proj) => proj.id !== id));
  };

  return (
    <div className={s.panel}>
      <h3 className={s.panelTitle}>Projects</h3>
      <form onSubmit={add} className={s.form}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          error={!!errs.title}
          helperText={errs.title}
          size="small"
          fullWidth
          id="project-title"
        />
        <TextField
          label="Category"
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          error={!!errs.category}
          helperText={errs.category}
          size="small"
          fullWidth
          id="project-category"
        />
        <TextField
          label="Image URL"
          value={form.imageUrl}
          onChange={(e) => set("imageUrl", e.target.value)}
          error={!!errs.imageUrl}
          helperText={errs.imageUrl}
          size="small"
          fullWidth
          id="project-image"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={adding}
          id="project-add"
        >
          {adding ? "Adding..." : "Add Project"}
        </Button>
      </form>
      {projects.length === 0 ? (
        <p className={s.empty}>No projects.</p>
      ) : (
        <ul className={s.projList}>
          {projects.map((p) => (
            <li key={p.id} className={s.projItem}>
              <div className={s.projInfo}>
                <span className={s.projName}>{p.title}</span>
                <span className={s.projCat}>{p.category}</span>
              </div>
              <IconButton
                size="small"
                onClick={() => remove(p.id)}
                aria-label={`Delete ${p.title}`}
                sx={{
                  color: "#ff6584",
                  "&:focus-visible": {
                    outline: "2px solid #ff6584",
                    outlineOffset: "2px",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
