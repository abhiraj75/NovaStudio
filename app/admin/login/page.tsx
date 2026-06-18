"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, TextField, Button } from "@mui/material";
import s from "@/styles/AdminLogin.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        setErr("Invalid credentials");
      }
    } catch {
      setErr("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className={s.page}>
      <div className={s.card}>
        <Typography variant="h3" className={s.title}>
          Admin Login
        </Typography>
        <p className={s.sub}>Sign in to manage projects and submissions.</p>
        {err && <div className={s.err}>{err}</div>}
        <form onSubmit={submit} className={s.form}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            autoFocus
            id="login-username"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            id="login-password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            fullWidth
            id="login-submit"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
