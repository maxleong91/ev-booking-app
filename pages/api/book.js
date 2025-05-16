
import { appendBooking } from "../../lib/sheets";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, date, location, start, end } = req.body;
    await appendBooking([name, date, location, start, end]);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
