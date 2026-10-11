// maniac-site — Cloudflare Worker
// Отдаёт статику из ассетов и отвечает на /api/status живым статусом Minecraft-сервера.
// Статус берём через mcstatus.io: прямые сокеты из рантайма воркера недоступны,
// а внешний статус-сервис работает и отдаёт всё, что нужно странице.

const ASSETS_BINDING = "ASSETS";
const BUILD = "b5";

// Адреса в порядке предпочтения: сначала кастомный домен, потом прямой адрес туннеля.
const TARGETS = ["maniak.c4elovek.online", "cairo-qualified.tun.ply.gg"];
const STATUS_API = "https://api.mcstatus.io/v2/status/java/";

function json(payload) {
  return new Response(JSON.stringify(payload), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function queryStatus(host) {
  const res = await fetch(STATUS_API + encodeURIComponent(host), {
    headers: { accept: "application/json" },
  });
  const data = await res.json();

  if (!data || !data.online) {
    const why = (data && data.error) || "сервер не отвечает";
    throw new Error(why);
  }

  return {
    online: true,
    version: (data.version && data.version.name_clean) || "",
    protocol: data.version && data.version.protocol,
    online_players: (data.players && data.players.online) || 0,
    max_players: (data.players && data.players.max) || 0,
    host,
    via: "mcstatus.io",
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/status") {
      const tried = [];
      for (const host of TARGETS) {
        try {
          return json(await queryStatus(host));
        } catch (e) {
          tried.push(host + ": " + (e && e.message ? e.message : String(e)));
        }
      }
      return json({ build: BUILD, online: false, error: "сервер не отвечает", tried });
    }

    return env[ASSETS_BINDING].fetch(request);
  },
};
