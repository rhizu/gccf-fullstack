"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${nav ? styles.scrolled : styles.navbar}`}
    >
      <div className={styles.logo}>
        <Link href="/">GCCF</Link>
      </div>

      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
          <span className={styles.underline}></span>
        </li>

        <li className={`${styles.navItem} ${styles.dropdown}`}>
          <span>About</span>
          <span className={styles.underline}></span>
          <ul className={styles.dropdownMenu}>
            <li>
              <Link href="/about">About GCCF</Link>
            </li>
            <li>
              <Link href="/about#team">Our Team</Link>
            </li>
          </ul>
        </li>

        <li className={styles.navItem}>
          <Link href="/gallery">Gallery</Link>
          <span className={styles.underline}></span>
        </li>

        <li className={styles.navItem}>
          <Link href="/news">News</Link>
          <span className={styles.underline}></span>
        </li>

        <li className={`${styles.navItem} ${styles.dropdown}`}>
          <span>Events</span>
          <span className={styles.underline}></span>
          <ul className={styles.dropdownMenu}>
            <li>
              <Link href="/events?type=upcoming">Upcoming Events</Link>
            </li>
            <li>
              <Link href="/events?type=completed">Completed Events</Link>
            </li>
          </ul>
        </li>
      </ul>

      <div className={`${styles.navItem} ${styles.dropdown}`}>
        <FaUserCircle size={22} />
        <span className={styles.underline}></span>
        <ul className={styles.dropdownMenuRight}>
          <li>
            <Link href="/login">User Login</Link>
          </li>
          <li>
            <Link href="/admin/login">Admin Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
