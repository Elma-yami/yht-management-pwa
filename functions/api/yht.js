const GAS_API_URL =
  "https://script.google.com/macros/s/AKfycbxRkZb7qNPF88_W73d8OeZQDJWzZndt5kP80LSY4FrXISjQFoK3ylMw0WUBR2uYUaam/exec";

export async function onRequestPost(context) {
  try {
    const body = await context.request.text();

    const upstream = await fetch(GAS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      },
      body,
      redirect: "follow"
    });

    const text = await upstream.text();

    return new Response(text, {
      status: upstream.ok ? 200 : upstream.status,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Cache-Control": "no-store"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      ok: false,
      error: err && err.message ? err.message : String(err)
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Cache-Control": "no-store"
      }
    });
  }
}

export function onRequestGet() {
  return new Response(JSON.stringify({
    ok: true,
    message: "YHT API proxy is running"
  }), {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store"
    }
  });
}
