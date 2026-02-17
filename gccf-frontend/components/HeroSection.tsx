"use client";

import { useSpring, animated, useScroll } from "@react-spring/web";
import { FaChevronDown, FaShieldAlt, FaLock, FaCode } from "react-icons/fa";

export default function HeroSection() {
  const { scrollY } = useScroll();

  const icon1Spring = useSpring({
    y: scrollY.to((y) => y * 0.7),
  });

  const icon2Spring = useSpring({
    y: scrollY.to((y) => y * 0.5),
  });

  const icon3Spring = useSpring({
    y: scrollY.to((y) => y * 0.2),
  });

  const scrollIndicatorSpring = useSpring({
    opacity: scrollY.to((y) => Math.max(0, 1 - y / 200)),
  });

  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <animated.div style={icon1Spring} className="hero-floating-shape shape-1">
        <FaShieldAlt />
      </animated.div>

      <animated.div style={icon2Spring} className="hero-floating-shape shape-2">
        <FaLock />
      </animated.div>

      <animated.div style={icon3Spring} className="hero-floating-shape shape-3">
        <FaCode />
      </animated.div>

      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-label">Global Cybersecurity Community</span>
          <h1 className="hero-title">Protecting the Digital World Together</h1>
          <p className="hero-text">
            Join thousands of professionals shaping the future of cybersecurity
          </p>
          <button className="btn-primary">Join Our Community</button>
        </div>
      </div>

      <animated.div style={scrollIndicatorSpring} className="scroll-indicator">
        <FaChevronDown />
      </animated.div>
    </section>
  );
}
