# Backup: API счётчика просмотров

Эти файлы отключены для статического хостинга (без Node).

Чтобы снова включить счётчик просмотров:

1. Верните файлы в `src/pages/api/views/`:
   - `increment.js`
   - `all.js`
   - `[articleSlug].js`
2. В `next.config.mjs` уберите `output: 'export'` (или переключитесь на хостинг с Node).
3. В `src/components/ArticleLayout.jsx` раскомментируйте блок счётчика просмотров и импорты.
