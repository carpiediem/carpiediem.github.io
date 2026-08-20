import React, { useRef, useState, useEffect } from "react";
import debounce from "lodash/debounce";

import NavBar from "../components/NavBar";
import About from "../components/About";
import Skills from "../components/Skills";
import Portfolio from "../components/Portfolio";
import Experience from "../components/Experience";
import Education from "../components/Education";

export default function Home() {
  const [section, setSection] = useState<string | null>(null);

  const educationRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // The browser's native same-page anchor scroll only fires once, when
    // the URL is first processed. On first load that happens before React
    // has rendered the named anchors, so it's a no-op; do it ourselves
    // once the page has rendered instead.
    const hash = window.location.hash.slice(1);
    const target = hash && document.getElementsByName(hash)[0];
    if (target) target.scrollIntoView();
  }, []);

  useEffect(() => {
    // MUST BE IN REVERSE ORDER
    const sections: [string, React.RefObject<HTMLElement | null>][] = [
      ["education", educationRef],
      ["experience", experienceRef],
      ["portfolio", portfolioRef],
      ["skills", skillsRef],
      ["about", aboutRef],
    ];
    const breakpoints: [string, number][] = sections.map(([key, ref]) => [
      key,
      window.scrollY + (ref.current?.getBoundingClientRect().top ?? 0),
    ]);
    const listener = debounce(() => {
      const section = breakpoints.find(([, y]) => window.scrollY + 99 >= y);
      setSection(section ? section[0] : null);
    }, 100);

    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  });

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavBar section={section} />
      <main id="main-content" data-testid="home">
        <About ref={aboutRef} />
        <Skills ref={skillsRef} />
        <Portfolio ref={portfolioRef} />
        <Experience ref={experienceRef} />
        <Education ref={educationRef} />
      </main>
    </>
  );
}
