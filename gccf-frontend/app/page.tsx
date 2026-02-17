"use client";
import { useState } from "react";
import {
  FaShieldAlt,
  FaUsers,
  FaBook,
  FaBullseye,
  FaMicroscope,
  FaGlobe,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaChevronDown,
} from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import "./HomePage.css";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const events = [
    {
      title: "Cybersecurity Summit 2024",
      description:
        "A comprehensive gathering of industry leaders discussing the latest threats and solutions.",
      image: "/images/event1.jpg",
    },
    {
      title: "Ethical Hacking Workshop",
      description:
        "Hands-on training session for aspiring security professionals to learn penetration testing.",
      image: "/images/event2.jpg",
    },
    {
      title: "Cloud Security Conference",
      description:
        "Exploring best practices for securing cloud infrastructure and applications.",
      image: "/images/event3.jpg",
    },
  ];

  const services = [
    {
      icon: FaShieldAlt,
      title: "Security Training",
      description:
        "Comprehensive training programs for individuals and organizations",
    },
    {
      icon: FaUsers,
      title: "Community Events",
      description: "Regular meetups, workshops, and networking opportunities",
    },
    {
      icon: FaBook,
      title: "Knowledge Sharing",
      description: "Access to resources, articles, and industry insights",
    },
    {
      icon: FaBullseye,
      title: "Career Development",
      description: "Job opportunities and mentorship programs",
    },
    {
      icon: FaMicroscope,
      title: "Research & Innovation",
      description: "Collaborative research projects and security innovations",
    },
    {
      icon: FaGlobe,
      title: "Global Network",
      description: "Connect with cybersecurity professionals worldwide",
    },
  ];

  const memories = [
    {
      image: "/images/memory1.jpg",
      caption: "Our first community meetup - 500+ attendees",
    },
    {
      image: "/images/memory2.jpg",
      caption: "Award ceremony for top security researchers",
    },
    {
      image: "/images/memory3.jpg",
      caption: "International cybersecurity collaboration",
    },
    {
      image: "/images/memory4.jpg",
      caption: "Student hackathon grand finale",
    },
  ];

  const gallery = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
    "/images/gallery7.jpg",
    "/images/gallery8.jpg",
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Security Architect, TechCorp",
      feedback:
        "GCCF has been instrumental in my career growth. The community support and learning opportunities are unparalleled.",
    },
    {
      name: "Michael Chen",
      role: "Penetration Tester, SecureNet",
      feedback:
        "The workshops and events organized by GCCF are world-class. I've learned so much and made valuable connections.",
    },
    {
      name: "Emily Rodriguez",
      role: "CISO, FinanceGuard",
      feedback:
        "Being part of GCCF means being at the forefront of cybersecurity innovation. Highly recommend joining!",
    },
  ];

  const faqs = [
    {
      question: "What is GCCF?",
      answer:
        "GCCF (Global Cybersecurity Community Forum) is a worldwide community dedicated to bringing together cybersecurity professionals, enthusiasts, and learners to share knowledge, collaborate, and advance the field of cybersecurity.",
    },
    {
      question: "How can I join the community?",
      answer:
        "You can join by clicking the 'Join Our Community' button and filling out a simple registration form. Membership is open to anyone interested in cybersecurity, regardless of experience level.",
    },
    {
      question: "Are there membership fees?",
      answer:
        "Basic membership is completely free. We also offer premium memberships with additional benefits such as exclusive workshops, certification programs, and priority event access.",
    },
    {
      question: "What types of events do you organize?",
      answer:
        "We organize a variety of events including workshops, conferences, hackathons, webinars, and networking meetups. Events cover topics from ethical hacking to cloud security, threat intelligence, and more.",
    },
    {
      question: "Can beginners join GCCF?",
      answer:
        "Absolutely! We welcome members of all skill levels. We have dedicated programs and resources for beginners, including mentorship opportunities and foundational training sessions.",
    },
  ];

  return (
    <div className="homepage">
      <HeroSection />

      {/* About Section */}
      <section className="about">
        <div className="container">
          <div className="section-header">
            <span className="section-label">About GCCF</span>
            <h2 className="section-title">Building a Safer Digital Future</h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>
                The Global Cybersecurity Community Forum (GCCF) is a vibrant,
                international platform dedicated to fostering collaboration,
                knowledge sharing, and innovation in cybersecurity.
              </p>
              <p>
                Founded by industry leaders and passionate professionals, we
                bring together experts, learners, and organizations to address
                the ever-evolving challenges in digital security.
              </p>
            </div>
            <div className="about-text">
              <p>
                Our mission is to create a trusted ecosystem where members can
                grow their skills, share insights, and contribute to a safer
                digital future.
              </p>
              <p>
                Through events, training programs, and collaborative
                initiatives, we're building the next generation of cybersecurity
                excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section parallax">
        <div className="parallax-overlay">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years of Impact</span>
            </div>

            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Lives Touched</span>
            </div>

            <div className="stat-item">
              <span className="stat-number">120+</span>
              <span className="stat-label">Active Projects</span>
            </div>

            <div className="stat-item">
              <span className="stat-number">35</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Past Events</span>
            <h2 className="section-title">Our Success Stories</h2>
          </div>
          <div className="events-grid">
            {events.map((event, index) => (
              <div key={index} className="event-card">
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                </div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Services & Activities</h2>
          </div>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="service-item">
                  <div className="service-icon">
                    <Icon />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Memories Section */}
      <section className="memories">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Memories</span>
            <h2 className="section-title">Moments That Matter</h2>
          </div>
          <div className="memories-grid">
            {memories.map((memory, index) => (
              <div key={index} className="memory-card">
                <div className="memory-image">
                  <img src={memory.image} alt={memory.caption} />
                  <div className="memory-overlay">
                    <p>{memory.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-label">Gallery</span>
            <h2 className="section-title">A Glimpse Into Our Community</h2>
          </div>
          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What Our Members Say</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-text">"{testimonial.feedback}"</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${openFaq === index ? "active" : ""}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`faq-icon ${openFaq === index ? "rotate" : ""}`}
                  >
                    <FaChevronDown />
                  </span>
                </button>
                <div
                  className={`faq-answer ${openFaq === index ? "open" : ""}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
