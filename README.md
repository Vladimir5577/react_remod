# Remod — React Frontend

1. Run in docker dev mode
```bash
$ docker-compose up
```

2. Go to container and build project
```bash
$ docker exec -it react_app sh
# npm run build
```

Готовые файлы будут в папке `dist/`.


3. Down docker after buil
```bash
$ docker-compose down 
```

Dev mod available op the port :3000 - docker should be up and running
Prod mod available on the port :80  - close docker container and make sure dist folder exists


Vite + React + Tailwind CSS + React Router v6



## Структура проекта

```
front_end/
├── public/          # Статика (изображения)
├── src/
│   ├── components/
│   │   ├── cases/   # BeforeAfterSlider, CaseCardSlider
│   │   ├── layout/  # Header, Footer, CookieBanner
│   │   ├── quiz/    # Quiz
│   │   ├── sections/# Все секции главной страницы
│   │   └── ui/      # Button, Input, Logo, AnimateIn
│   ├── context/     # ThemeContext
│   ├── lib/         # cases.js, repairImages.js
│   ├── pages/       # Все страницы
│   ├── App.jsx      # Роутер
│   ├── main.jsx     # Точка входа
│   └── globals.css  # Глобальные стили + Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
└── .env.example
```
