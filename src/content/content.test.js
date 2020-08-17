import { existsSync } from 'fs';

import skills from './skills.json';
import projects from './projects.json';
import jobs from './jobs.json';
import schools from './schools.json';

test('defines projects array for the portfolio section', () => {
  expect(skills.length).toBeGreaterThan(0);
  skills.forEach((skill) => {
    expect(skill.name).toMatch(/\w+/);
    expect(skill.iconClass).toMatch(/^fa\w?\sfa-[\w-]+$/);
    expect(skill.description).toMatch(/\w+/);
  });
});

test('defines projects array for the portfolio section', () => {
  expect(projects.length).toBeGreaterThan(0);
  projects.forEach((project) => {
    expect(project.id).toMatch(/\w+/);
    expect(project.img).toMatch(/\w+/);
    expect(project.title).toMatch(/\w+/);
    expect(project.tags).toEqual(expect.arrayContaining([expect.any(String)]));
    // projects.featured, .github, and .demo are optional
  });
});

test('defines jobs array for the experience section', () => {
  expect(jobs.length).toBeGreaterThan(0);
  jobs.forEach((job) => {
    expect(job.years).toMatch(/\d{4}(\s-\s\d{4})?/);
    expect(job.company).toMatch(/\w+/);
    expect(job.url).toMatch(/^https?:\/\/\w+/);
    expect(job.logo).toMatch(/\w+/);
    expect(job.role).toMatch(/\w+/);
    expect(job.description).toMatch(/\w+/);
    // job.offset is optional
  });
});

test('defines projects array for the portfolio section', () => {
  expect(projects.length).toBeGreaterThan(0);
  projects.forEach((project) => {
    expect(project.id).toMatch(/\w+/);
    expect(project.img).toMatch(/\w+/);
    expect(project.title).toMatch(/\w+/);
    expect(project.tags).toEqual(expect.arrayContaining([expect.any(String)]));
    // projects.featured, .github, and .demo are optional
  });
});

test('defines schools array for the education section', () => {
  expect(schools.length).toBeGreaterThan(0);
  schools.forEach((school) => {
    expect(school.years).toMatch(/\d{4}(\s-\s\d{4})?/);
    expect(school.school).toMatch(/\w+/);
    expect(school.url).toMatch(/^https?:\/\/\w+/);
    expect(school.degree).toMatch(/\w+/);
    // expect(school.side).toMatch(/left|right/);
    // school.siad & .offset are optional
  });
});

test('includes HTML files for each project', () => {
  projects.forEach((project) => {
    expect(existsSync(`src/content/${project.id}.html`)).toBeTruthy();
  });
});
