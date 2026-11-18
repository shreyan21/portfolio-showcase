# Utkarsh — standalone portfolio

A static, recruiter-facing version of my portfolio. React and Vite generate a production website for GitHub Pages. The site needs no running containers, API, database, `.env` files or AWS services.

## Preview locally

Use Node.js 24 LTS (Node 22.12 or newer also works).

```bash
npm ci
npm run dev
```

For the actual production build:

```bash
npm run build
npm run preview
```

`dist/` contains the deployable website. Serve it through HTTP, rather than opening `index.html` as a local file. Navigation uses page anchors, so GitHub Pages needs no route rewrites or custom 404 page. Relative asset URLs support both a user site and a repository subdirectory.

## Publish as a separate GitHub repository

1. Use the separate `shreyan21/portfolio-showcase` repository for this site. Do not use the existing CI-CD-project repository.
2. Put this folder's contents in the new repository with a `main` branch. Include the hidden `.github` folder and `package-lock.json`; do not upload `node_modules`, `dist` or `output`.
3. In that new repository only, open **Settings → Pages → Source → GitHub Actions**.
4. Push to `main` or run **Publish portfolio to GitHub Pages** from Actions. The workflow builds and deploys the static `dist` artifact.
5. Use the website URL shown in the deployment result: `https://shreyan21.github.io/portfolio-showcase/` for this repository.

No repository, GitHub setting or AWS service is changed by downloading or previewing these files. The included workflow acts only after you publish it in the new repository.

Official setup references: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [Vite deployment](https://vite.dev/guide/static-deploy.html#github-pages).

## Update the content

- `src/data/portfolio.json`: static profile, skills, experience, education and credentials. See `CONTENT-SOURCES.md` for the public LinkedIn alignment.
- `src/App.jsx`: project narrative, delivery walkthrough, contact links and page layout.
- `src/styles.css`: design tokens, responsive layout and reduced-motion support.
- `public/fonts/`: self-hosted typefaces with their licenses. No font service is needed at runtime.

The AWS diagram describes the original full-stack CI/CD project linked on the page. This separate showcase does not connect to its backend. The admin screen and database editing are outside this static site's scope. Change the JSON and rebuild to update the displayed content.

## Independence

This folder is a separate frontend project. It contains no copy of the original Git history, runtime secrets, backend, Docker files or AWS deployment workflow. Its page links point to the existing public project for recruiters to inspect. Those links do not modify it.
