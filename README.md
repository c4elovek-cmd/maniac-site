# maniac-site — исходники сайта сервера «Побег от маньяка 2»

Сайт живёт на `maniac.c4elovek.online`. Отдаётся Cloudflare Worker **maniac-site**
(static assets), кастомный домен привязан к воркеру.

## Что внутри

| Путь | Что это |
|---|---|
| `deploy/maniac-site/index.html` | сама страница |
| `deploy/maniac-site/fonts/` | PT Sans Narrow и PT Mono, свои файлы |
| `deploy/maniac-site/pack/` | ресурспак карты, раздаётся игрокам |
| `worker/index.js` | воркер: статика + живой статус через `/api/status` |
| `wrangler-maniac.toml` | конфиг деплоя |
| `PRODUCT.md` | продуктовый контекст проекта |

## Как обновить сайт

```
cd <эта папка>
npx wrangler deploy -c wrangler-maniac.toml
```

## Ресурспак

Лежит здесь же, в `deploy/maniac-site/pack/Maniac2-ResourcePack.zip`, и отдаётся
по адресу `https://maniac.c4elovek.online/pack/Maniac2-ResourcePack.zip`.

Копия выложена отдельным релизом этого же репозитория — на случай если сайт
недоступен:

```
https://github.com/c4elovek-cmd/maniac-site/releases/download/pack/Maniac2-ResourcePack.zip
```

SHA1: `03d9772b7b9db1b8aea00ff0966fd80afef3a8cf`

Пак обязательный: сервер подставляет его сам при входе, игроку не нужно ничего
скачивать вручную. В самом `server.properties`:

```
resource-pack=https://maniac.c4elovek.online/pack/Maniac2-ResourcePack.zip
require-resource-pack=true
resource-pack-sha1=03d9772b7b9db1b8aea00ff0966fd80afef3a8cf
```

## Про автора карты

Карта и ресурспак — работа **BlueBerriesStudio**, оригинал на minecraft-inside.ru.
Ссылка на источник стоит в подвале страницы. Не заменяй её на зеркало.
