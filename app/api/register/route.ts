import { NextRequest, NextResponse } from "next/server";

const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzOx0lXd3lx25lZipVCBvJyl7Kl6m3Czn6PF6V3fiAS3M0AT3Lo5Cc3I7Lf6LnTj2Rf_Q/exec";

export async function POST(req: NextRequest) {
  try {
    const { name, email, mobile } = await req.json();

    const params = new URLSearchParams();
    const now = new Date();
    const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
    const timestamp = ist.toISOString().replace("T", " ").slice(0, 19);
    params.append("timestamp", timestamp);
    params.append("name", name);
    params.append("email", email);
    params.append("mobile", mobile);

    const res = await fetch(SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      redirect: "follow",
    });

    const text = await res.text();
    return NextResponse.json({ ok: true, response: text });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
