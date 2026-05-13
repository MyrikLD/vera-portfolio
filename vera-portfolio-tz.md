# Vera Yorsh Portfolio — ТЗ

## Стек

- **Astro** (static output mode)
- **Keystatic CMS** (GitHub mode)
- Хостинг: собственный сервер, nginx
- Деплой: GitHub Actions → rsync/SSH
- Домен: свой

---

## Страницы

### `/` — главная
- Имя + короткое bio
- Блок навыков (Illustration / Game Graphics / Tools) — редактируется через CMS
- Сетка featured проектов (флаг `featured: true`)
- Ссылки: Telegram, LinkedIn, email, CV

### `/works` — галерея
- Masonry-сетка всех проектов
- Фильтрация по тегам — client-side, без перезагрузки
- Карточка: обложка + название + теги

### `/works/[slug]` — страница проекта
- Заголовок, описание
- Галерея изображений с lightbox
- Теги
- Кнопка «назад»

### `/cv` — редирект на Google Drive PDF

---

## Контент-модель (Keystatic)

### Collection: `projects`

| Поле | Тип |
|------|-----|
| `title` | string |
| `slug` | auto |
| `date` | date |
| `featured` | boolean |
| `cover` | image |
| `tags` | string[] |
| `description` | rich text |
| `gallery` | image[] |
| `order` | number |

### Singleton: `profile`

| Поле | Тип |
|------|-----|
| `name` | string |
| `bio` | text |
| `email` | string |
| `telegram` | string |
| `linkedin` | string |
| `cv_url` | string (Google Drive) |
| `skills` | `{ category: string, items: string[] }[]` |

Изображения хранятся в репо: `public/images/projects/[slug]/`

---

## CMS

- Keystatic в **GitHub mode**
- UI доступен на `/keystatic` (требует GitHub OAuth)
- GitHub OAuth App: настраивается один раз, логин только у Веры

---

## Деплой

```
push to main
  → GitHub Actions
    → npm run build
    → rsync dist/ → сервер по SSH
```

nginx раздаёт статику из `dist/`, кэш статических ассетов.

---

## Дизайн

### Цвета (из текущего сайта)

```css
--bg:        #082635;   /* основной фон */
--bg2:       #004445;   /* фон секций */
--accent:    #2c7873;   /* акцент тил */
--accent2:   #6bcb3f;   /* яркий зелёный */
--highlight: #c85ae6;   /* фиолетовый, кнопки */
--text:      #e8f1f2;   /* основной текст */
--muted:     #6fb98f;   /* второстепенный текст */
```

### Типографика
- Шрифт: **DM Sans** (основной) + **DM Mono** (теги/метаданные)
- Mobile-first, полный адаптив

### Принципы
- Изображения в приоритете, UI минимален
- Тёмная тема (одна, без переключателя)
- Плавные переходы при hover на карточках

---

## Структура репо

```
src/
  components/
    ProjectCard.astro
    Gallery.astro
    TagFilter.astro
    Nav.astro
    Footer.astro
  layouts/
    Layout.astro
  pages/
    index.astro
    works/
      index.astro
      [slug].astro
    cv.astro
  styles/
    global.css
  content/           # управляется Keystatic
    projects/
    profile/
public/
  images/
    projects/
keystatic.config.ts
astro.config.mjs
```