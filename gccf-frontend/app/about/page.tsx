import React from "react";
import { Mail, Linkedin, Twitter } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      image: "/api/placeholder/400/500",
      bio: "Leading GCCF with 15+ years of experience in community development and social impact.",
      email: "sarah@gccf.org",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "David Chen",
      role: "Director of Operations",
      image: "/api/placeholder/400/500",
      bio: "Overseeing day-to-day operations and strategic partnerships across all programs.",
      email: "david@gccf.org",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Maya Patel",
      role: "Program Manager",
      image: "/api/placeholder/400/500",
      bio: "Coordinating community initiatives and ensuring program excellence and impact.",
      email: "maya@gccf.org",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "James Wilson",
      role: "Communications Lead",
      image: "/api/placeholder/400/500",
      bio: "Managing brand presence and storytelling to amplify our community's voice.",
      email: "james@gccf.org",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Aisha Rahman",
      role: "Community Outreach",
      image: "/api/placeholder/400/500",
      bio: "Building bridges between GCCF and local communities to foster meaningful connections.",
      email: "aisha@gccf.org",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Michael Torres",
      role: "Finance Director",
      image: "/api/placeholder/400/500",
      bio: "Ensuring financial sustainability and transparent resource management.",
      email: "michael@gccf.org",
      linkedin: "#",
      twitter: "#",
    },
  ];

  return (
    <div className="about-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Crimson Pro', Georgia, serif;
          color: #1e293b;
          overflow-x: hidden;
        }

        .about-page {
          background: #ffffff;
        }

        /* Hero Section */
        .about-hero {
          min-height: 70vh;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 120px 20px 80px;
        }

        .about-hero::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          top: -200px;
          right: -200px;
          animation: float 20s infinite ease-in-out;
        }

        .about-hero::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          bottom: -100px;
          left: -100px;
          animation: float 15s infinite ease-in-out reverse;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }

        .hero-content {
          max-width: 900px;
          text-align: center;
          position: relative;
          z-index: 2;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-content h1 {
          font-size: 4.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .hero-content p {
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }

        /* Introduction Section */
        .intro-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 120px 40px;
        }

        .intro-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .intro-text h2 {
          font-size: 3rem;
          color: #1e3a8a;
          margin-bottom: 2rem;
          line-height: 1.2;
        }

        .intro-text p {
          font-size: 1.15rem;
          line-height: 1.9;
          color: #475569;
          margin-bottom: 1.5rem;
        }

        .intro-image {
          position: relative;
          height: 500px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(30, 58, 138, 0.15);
        }

        .intro-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .intro-image:hover img {
          transform: scale(1.05);
        }

        /* Stats Section */
        .stats-section {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          padding: 100px 40px;
          margin: 80px 0;
        }

        .stats-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 60px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 4rem;
          font-weight: 700;
          color: #2563eb;
          margin-bottom: 0.5rem;
          display: block;
        }

        .stat-label {
          font-size: 1.1rem;
          color: #1e40af;
          font-weight: 500;
        }

        /* Team Section */
        .team-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 120px 40px;
        }

        .team-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .team-header h2 {
          font-size: 3.5rem;
          color: #1e3a8a;
          margin-bottom: 1.5rem;
        }

        .team-header p {
          font-size: 1.2rem;
          color: #475569;
          max-width: 700px;
          margin: 0 auto;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 50px;
        }

        .team-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(30, 58, 138, 0.15);
        }

        .card-image {
          width: 100%;
          height: 400px;
          overflow: hidden;
          position: relative;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .team-card:hover .card-image img {
          transform: scale(1.08);
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(30, 58, 138, 0.9), transparent);
          padding: 30px;
          transform: translateY(100%);
          transition: transform 0.4s ease;
        }

        .team-card:hover .card-overlay {
          transform: translateY(0);
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-links a {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background: #ffffff;
          color: #2563eb;
          transform: translateY(-3px);
        }

        .card-content {
          padding: 30px;
        }

        .card-content h3 {
          font-size: 1.6rem;
          color: #1e3a8a;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .card-content .role {
          font-size: 1rem;
          color: #3b82f6;
          font-weight: 500;
          margin-bottom: 1rem;
          display: block;
        }

        .card-content p {
          font-size: 1rem;
          color: #64748b;
          line-height: 1.7;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .intro-content {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }

          .hero-content h1 {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-content p {
            font-size: 1.1rem;
          }

          .team-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .intro-text h2,
          .team-header h2 {
            font-size: 2.5rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About GCCF</h1>
          <p>
            Building bridges, fostering connections, and creating lasting impact
            in communities through dedication, innovation, and compassion.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section" id="about-gccf">
        <div className="intro-content">
          <div className="intro-text">
            <h2>Our Mission & Vision</h2>
            <p>
              The Global Community Care Foundation (GCCF) was established with a
              singular vision: to create meaningful change in communities around
              the world through sustainable programs and collaborative
              partnerships.
            </p>
            <p>
              We believe in the power of collective action and the importance of
              addressing social challenges through innovative, community-driven
              solutions. Our work spans education, healthcare, environmental
              sustainability, and economic empowerment.
            </p>
            <p>
              Through dedication, transparency, and a commitment to excellence,
              we continue to expand our reach and deepen our impact in the
              communities we serve.
            </p>
          </div>
          <div className="intro-image">
            <img src="/api/placeholder/600/500" alt="GCCF Community" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
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
      </section>

      {/* Team Section */}
      <section className="team-section" id="team">
        <div className="team-header">
          <h2>Meet Our Team</h2>
          <p>
            Dedicated professionals united by a shared passion for creating
            positive change and building stronger communities.
          </p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="card-image">
                <img src={member.image} alt={member.name} />
                <div className="card-overlay">
                  <div className="social-links">
                    <a href={member.email}>
                      <Mail size={18} />
                    </a>
                    <a href={member.linkedin}>
                      <Linkedin size={18} />
                    </a>
                    <a href={member.twitter}>
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <h3>{member.name}</h3>
                <span className="role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
