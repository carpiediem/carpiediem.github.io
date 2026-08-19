import React, { useRef, useState, useEffect } from "react";
import debounce from "lodash/debounce";

import NavBar from "../components/NavBar";
import About from "../components/About";
import Skills from "../components/Skills";
import Portfolio from "../components/Portfolio";
import Experience from "../components/Experience";
import Education from "../components/Education";

export default function Home() {
  const [section, setSection] = useState(null);

  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const portfolioRef = useRef(null);
  const skillsRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    // MUST BE IN REVERSE ORDER
    const sections = [
      ["education", educationRef],
      ["experience", experienceRef],
      ["portfolio", portfolioRef],
      ["skills", skillsRef],
      ["about", aboutRef],
    ];
    const breakpoints = sections.map(([key, ref]) => [
      key,
      window.scrollY + ref.current.getBoundingClientRect().top,
    ]);
    const listener = debounce(() => {
      const section = breakpoints.find(([, y]) => window.scrollY + 99 >= y);
      setSection(section && section[0]);
    }, 100);

    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  });

  return (
    <div data-testid="home">
      <NavBar section={section} />
      <About ref={aboutRef} />
      <Skills ref={skillsRef} />
      <Portfolio ref={portfolioRef} />
      <Experience ref={experienceRef} />
      <Education ref={educationRef} />
    </div>
  );
}
