"use client";

import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const windowHeight = window.innerHeight;

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    scrollTo({ top: 0, behavior: "smooth" });
    setScrollPosition(0);
  };

  return (
    <>
      {scrollPosition > windowHeight / 2 ? (
        <button className="scroll-top" onClick={handleClick}>
          <ArrowUpIcon className="w-7.55 h-7.5" />
        </button>
      ) : null}
    </>
  );
}
