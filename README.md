[![CI/CD Status](https://github.com/carpiediem/carpiediem.github.io/workflows/CI/CD/badge.svg)](https://github.com/carpiediem/carpiediem.github.io/actions)
[![codecov](https://codecov.io/gh/carpiediem/carpiediem.github.io/branch/main/graph/badge.svg)](https://codecov.io/gh/carpiediem/carpiediem.github.io)
[![CodeClimate maintainability grade](https://img.shields.io/codeclimate/maintainability/carpiediem/carpiediem.github.io)](https://codeclimate.com/github/carpiediem/carpiediem.github.io)
[![DeepScan grade](https://deepscan.io/api/teams/10561/projects/13407/branches/224802/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10561&pid=13407&bid=224802)
![Snyk vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/carpiediem/carpiediem.github.io)
![License](https://img.shields.io/github/license/carpiediem/carpiediem.github.io)
[![deployment status](https://img.shields.io/website?label=carpiediem.github.io&url=https%3A%2F%2Fcarpiediem.github.io)](https://carpiediem.github.io)

<!-- https://bestpractices.coreinfrastructure.org/en/projects/4212 -->

## About

Source for [carpiediem.github.io](https://carpiediem.github.io/), my personal site: an online resume (about, experience, education, skills) plus a portfolio of side projects and write-ups.

## Tech stack

- [React](https://react.dev/) 16 + [Create React App](https://github.com/facebook/create-react-app) (via [react-app-rewired](https://github.com/timarney/react-app-rewired))
- [Material-UI](https://v4.mui.com/) v4
- [React Router](https://v5.reactrouter.com/)
- Deployed to GitHub Pages via [gh-pages](https://github.com/tschaub/gh-pages)

## Getting started

```
npm install
npm start
```

Runs the app locally at [http://localhost:3000](http://localhost:3000).

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

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The RScard designs of [PXlab](https://rscard.px-lab.com/) were a big inspiration.
