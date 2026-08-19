# carpiediem.github.io

[![CI Status](https://github.com/carpiediem/carpiediem.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/carpiediem/carpiediem.github.io/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/carpiediem/carpiediem.github.io/branch/main/graph/badge.svg)](https://codecov.io/gh/carpiediem/carpiediem.github.io)
[![DeepScan grade](https://deepscan.io/api/teams/10561/projects/13407/branches/224802/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10561&pid=13407&bid=224802)

Source for my personal site, live at **[carpiediem.github.io](https://carpiediem.github.io/)**: an online resume (about, experience, education, skills) plus a portfolio of side projects and write-ups.

## Tech stack

- [React](https://react.dev/) 18 + [Vite](https://vite.dev/)
- [MUI](https://mui.com/) v9
- [React Router](https://v5.reactrouter.com/)
- [Vitest](https://vitest.dev/) for tests
- Deployed to GitHub Pages via [gh-pages](https://github.com/tschaub/gh-pages)

## Getting started

```sh
npm install
npm start
```

Runs the app locally at [http://localhost:5173](http://localhost:5173).

Other scripts:

- `npm test` — run the test suite
- `npm run build` — production build
- `npm run deploy` — build and publish to GitHub Pages

## Adding content

Resume and portfolio content is data-driven rather than hardcoded:

- `src/content/jobs.json`, `schools.json`, `skills.json` — resume sections
- `src/content/projects.json` — portfolio entries; each references an `id` matching an HTML write-up file in `src/content/`

To add a portfolio project, add an entry to `projects.json` and drop the corresponding write-up HTML file alongside it.

## Acknowledgements

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and later migrated to [Vite](https://vite.dev/). The RScard designs of [PXlab](https://rscard.px-lab.com/) were a big inspiration.

## License

[MIT](LICENSE)
