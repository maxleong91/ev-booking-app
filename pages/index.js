
import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const locations = ["A", "B", "Clubhouse"];

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    name: "",
    day: "Mon",
    location: "A",
    start: "08:00",  // default valid time
    end: "09:00",    // default valid time
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookings([...bookings, form]);
    setForm({ name: "", day: "Mon", location: "A", start: "08:00", end: "09:00" });
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
        <div>
          <select name="day" value={form.day} onChange={handleChange}>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select name="location" value={form.location} onChange={handleChange}>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input type="time" name="start" value={form.start} onChange={handleChange} required />
          <input type="time" name="end" value={form.end} onChange={handleChange} required />
        </div>
        <button type="submit">Book</button>
      </form>

      <ul>
        {bookings.map((b, i) => (
          <li key={i}>
            {b.name} booked {b.location} on {b.day} from {b.start} to {b.end}
          </li>
        ))}
      </ul>
    </div>
  );
}
