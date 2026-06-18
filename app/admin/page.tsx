"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import SubmissionsTable from "@/components/admin/SubmissionsTable";
import ProjectManager from "@/components/admin/ProjectManager";
import s from "@/styles/Admin.module.css";

export default function AdminPage() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className={s.page}>
      <div className={s.header}>
        <h1 className={s.title}>Nova Studio Admin</h1>
        <Button
          variant="outlined"
          size="small"
          onClick={logout}
          id="admin-logout"
          sx={{
            borderColor: "rgba(255,255,255,0.15)",
            color: "#9494a8",
            "&:hover": { borderColor: "#ff6584", color: "#ff6584" },
            "&:focus-visible": {
              outline: "2px solid #6c63ff",
              outlineOffset: "2px",
            },
          }}
        >
          Log Out
        </Button>
      </div>
      <div className={s.panels}>
        <SubmissionsTable />
        <ProjectManager />
      </div>
    </div>
  );
}
