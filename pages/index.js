
import { useState } from "react";

const locations = ["Tower A", "Tower B", "Clubhouse"];

const generateTimeOptions = (startHour = 9, endHour = 23) => {
  const options = [];
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour24 = h % 24;
      const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
      const minute = m.toString().padStart(2, "0");
      const ampm = hour24 < 12 ? "AM" : "PM";
      options.push({
        value: `${hour24.toString().padStart(2, "0")}:${minute}`,
        label: `${hour12}:${minute} ${ampm}`,
      });
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();
const endTimeOptions = [{ value: "Overnight", label: "Overnight" }, ...timeOptions];

const formatDateWithDay = (dateStr) => {
  const options = { day: "2-digit", month: "short", year: "numeric", weekday: "long" };
  return new Date(dateStr).toLocaleDateString("en-GB", options);
};

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    location: "Tower A",
    start: "09:00",
    end: "09:00",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookings([...bookings, form]);
    setForm({
      name: "",
      date: new Date().toISOString().split("T")[0],
      location: "Tower A",
      start: "09:00",
      end: "09:00",
    });
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto", fontSize: "18px", fontFamily: "Calibri" }}>
      <h1>Emerald Hills EV Charger Booking 🚗🔋</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          style={{ width: "100%", marginBottom: 10, fontSize: "18px", fontFamily: "Calibri" }}
        />
        <div style={{ marginBottom: 10 }}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            style={{ fontSize: "18px", fontFamily: "Calibri" }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Charger:</label>
          <select name="location" value={form.location} onChange={handleChange} style={{ fontSize: "18px", fontFamily: "Calibri" }}>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Start Time:</label>
          <select name="start" value={form.start} onChange={handleChange} required style={{ fontSize: "18px", fontFamily: "Calibri" }}>
            {timeOptions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>End Time:</label>
          <select name="end" value={form.end} onChange={handleChange} required style={{ fontSize: "18px", fontFamily: "Calibri" }}>
            {endTimeOptions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ fontSize: "20px", fontFamily: "Calibri", padding: "10px 20px" }}>Book</button>
      </form>

      <ul style={{ marginTop: 20 }}>
        {bookings.map((b, i) => (
          <li key={i}>
            {b.name} booked {b.location} on {formatDateWithDay(b.date)} from {b.start} to {b.end}.
          </li>
        ))}
      </ul>

      <hr style={{ marginTop: 40 }} />
      <h2>📅 Booking Calendar</h2>
      {Object.entries(
        bookings.reduce((acc, b) => {
          const dateLabel = formatDateWithDay(b.date);
          acc[dateLabel] = acc[dateLabel] || [];
          acc[dateLabel].push(b);
          return acc;
        }, {})
      ).map(([dateLabel, dayBookings], i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <h3>{dateLabel}</h3>
          <ul>
            {dayBookings.map((b, j) => (
              <li key={j}>
                {b.name} → {b.location}: {b.start} to {b.end}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
