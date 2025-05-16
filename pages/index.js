
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", date: "", location: "", start: "", end: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Booking submitted!");
    setForm({ name: "", date: "", location: "", start: "", end: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h1>Emerald Hills EV Charger Booking 🚗🔋</h1>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Charger" required />
      <input name="start" value={form.start} onChange={handleChange} placeholder="Start Time" required />
      <input name="end" value={form.end} onChange={handleChange} placeholder="End Time" required />
      <button type="submit">Book</button>
    </form>
  );
}
