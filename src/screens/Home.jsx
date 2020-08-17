import React, { useRef, useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

import NavBar from '../components/NavBar';
import About from '../components/About';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Experience from '../components/Experience';
import Education from '../components/Education';

export default function Home() {
  const [section, setSection] = useState(null);

  // MUST BE IN REVERSE ORDER
  const refs = {
    education: useRef(null),
    experience: useRef(null),
    portfolio: useRef(null),
    skills: useRef(null),
    about: useRef(null),
  };

  useEffect(() => {
    const breakpoints = Object.entries(refs).map(([key, ref]) => [
      key,
      window.scrollY + ref.current.getBoundingClientRect().top,
    ]);
    const listener = debounce(() => {
      const section = breakpoints.find(([key, y]) => window.scrollY + 99 >= y);
      setSection(section && section[0]);
    }, 100);

    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  });

  return (
    <div data-testid="home">
      <NavBar section={section} />
      <About ref={refs.about} />
      <Skills ref={refs.skills} />
      <Portfolio ref={refs.portfolio} />
      <Experience ref={refs.experience} />
      <Education ref={refs.education} />
    </div>
  );
}
