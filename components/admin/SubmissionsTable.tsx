"use client";

import { useEffect, useState } from "react";
import s from "@/styles/Admin.module.css";

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function SubmissionsTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("/api/contacts")
      .then((r) => r.json())
      .then(setContacts)
      .catch(() => {});
  }, []);

  return (
    <div className={s.panel}>
      <h3 className={s.panelTitle}>Contact Submissions</h3>
      {contacts.length === 0 ? (
        <p className={s.empty}>No submissions yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td className={s.msg} title={c.message}>{c.message}</td>
                  <td className={s.timestamp}>
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
