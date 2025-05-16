
import { useState } from "react";

const locations = ["Tower A", "Tower B", "Clubhouse"];

const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = h.toString().padStart(2, "0");
      const minute = m.toString().padStart(2, "0");
      options.push(`${hour}:${minute}`);
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    location: "Tower A",
    start: "00:00",
    end: "00:00",
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
      start: "00:00",
      end: "00:00",
    });
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>EV Charger Booking</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <div style={{ marginBottom: 10 }}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Charger:</label>
          <select name="location" value={form.location} onChange={handleChange}>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Start Time:</label>
          <select name="start" value={form.start} onChange={handleChange} required>
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>End Time:</label>
          <select name="end" value={form.end} onChange={handleChange} required>
            <option value="Overnight">Overnight</option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Book</button>
      </form>

      <ul style={{ marginTop: 20 }}>
        {bookings.map((b, i) => (
          <li key={i}>
            {b.name} booked {b.location} on {b.date} from {b.start} to {b.end}
          </li>
        ))}
      </ul>
    </div>
  );
}
