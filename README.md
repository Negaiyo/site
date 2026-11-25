# Django-сайт с убегающей кнопкой

## Локальный запуск

Самый простой способ на Windows: **двойной клик по `run.bat`**. Он сам перейдёт в нужную папку, установит зависимости и запустит сервер.

Или вручную:

```bash
cd love_site
pip install -r requirements.txt
python manage.py runserver
```

Откройте http://127.0.0.1:8000/

Если порт 8000 занят:

```bash
python manage.py runserver 127.0.0.1:8001
```

Если видите ошибку `WSGI application 'love_site.wsgi.application' could not be loaded` — значит в текущем окружении не установлен `whitenoise`. Для локального запуска он теперь не обязателен, но для продакшена установите зависимости:

```bash
pip install -r requirements.txt
```

---

## Вариант 1: GitHub Pages (рекомендуемый, бесплатно)

GitHub Pages не запускает Django, поэтому в папке `docs/` лежит готовая статическая копия сайта — она работает точно так же, но без сервера.

1. Создайте репозиторий на GitHub.
2. Залейте в него **содержимое папки `love_site`** (файлы `manage.py`, `docs/`, `invites/`, `requirements.txt` и т.д. должны быть в корне репозитория).
3. В репозитории: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Сделайте `git push` в ветку `main` (или `master`) — workflow `.github/workflows/deploy-pages.yml` сам соберёт и опубликует сайт.
5. Ссылка будет такой: `https://ВСТРАК.github.io/ИМЯ-РЕПОЗИТОРИЯ/`

Workflow также автоматически копирует свежие CSS/JS из `invites/static/` в `docs/static/`.

Если ранее деплой падал с ошибкой `No artifacts named "github-pages" were found` — это исправлено: сборка артефакта и публикация теперь выполняются в двух разных задачах (`build` и `deploy`), как рекомендует GitHub. Просто сделайте новый `git push` после обновления workflow.

---

## Вариант 2: настоящий Django-хостинг (Render / Railway / Fly.io)

В проекте уже есть `requirements.txt`, `Procfile`, `build.sh` и WhiteNoise для статики.

Для Render:

1. New → Web Service → выберите репозиторий.
2. Runtime: Python 3.
3. Build Command: `./build.sh`
4. Start Command: `gunicorn love_site.wsgi:application --bind 0.0.0.0:$PORT`
5. Environment Variables:
   - `DEBUG=0`
   - `SECRET_KEY=любая_длинная_случайная_строка`
   - `ALLOWED_HOSTS=ваш-сервис.onrender.com` (можно не задавать — по умолчанию уже разрешён `.onrender.com`)
   - при домене добавьте `CSRF_TRUSTED_ORIGINS=https://ваш-домен`

`build.sh` сам установит зависимости и выполнит `collectstatic`.

---

## Что где

- `invites/` — Django-приложение.
- `docs/` — статическая версия для GitHub Pages.
- `.github/workflows/deploy-pages.yml` — авто-деплой на GitHub Pages.
- `invites/static/js/no-button.js` — кнопка «Нет» убегает от курсора на ПК и удирает при тапе на телефоне.
- `invites/static/js/hearts.js` — сердечки и надписи на второй странице.
- `invites/static/css/style.css` — оформление и мобильная адаптация.
