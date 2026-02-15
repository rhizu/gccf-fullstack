"use client";

import { useState } from "react";
import { useCreateMembership } from "@/lib/hooks";
import { CreateMembershipDto } from "@/types/membership";
import { FaSpinner, FaCheckCircle, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaBuilding, FaComment } from "react-icons/fa";

export default function MembershipPage() {
  const createMembership = useCreateMembership();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<CreateMembershipDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    occupation: "",
    organization: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMembership.mutateAsync(formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit membership:", error);
    }
  };

  if (submitted) {
    return (
      <div className="membership-page">
        <style>{styles}</style>
        <div className="success-container">
          <div className="success-card">
            <FaCheckCircle className="success-icon" />
            <h2>Application Submitted!</h2>
            <p>
              Thank you for your interest in becoming a member of GCCF. Your application has been submitted successfully and is now pending review by our admin team.
            </p>
            <p>
              Once approved, you will receive a welcome email and start receiving newsletters about our upcoming events.
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-primary">
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="membership-page">
      <style>{styles}</style>
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>Become a Member</h1>
          <p>Join the GCCF community and stay connected with our events and initiatives</p>
        </div>
      </section>

      <section className="form-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Membership Application</h2>
            <p>Fill out the form below to apply for GCCF membership. Our team will review your application.</p>
          </div>

          <form onSubmit={handleSubmit} className="membership-form">
            <div className="form-row">
              <div className="form-group">
                <label>
                  <FaUser /> First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FaUser /> Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <FaEnvelope /> Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FaPhone /> Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <FaMapMarkerAlt /> Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <FaMapMarkerAlt /> City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />
              </div>
              <div className="form-group">
                <label>
                  <FaMapMarkerAlt /> Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <FaBriefcase /> Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Enter your occupation"
                />
              </div>
              <div className="form-group">
                <label>
                  <FaBuilding /> Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Enter your organization"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <FaComment /> Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us why you'd like to join GCCF..."
                rows={4}
              />
            </div>

            {createMembership.isError && (
              <div className="error-message">
                Failed to submit application. Please try again.
              </div>
            )}

            <button type="submit" className="btn-submit" disabled={createMembership.isPending}>
              {createMembership.isPending ? (
                <>
                  <FaSpinner className="spinner" /> Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

const styles = `
  .membership-page {
    min-height: 100vh;
    background: #f8fafc;
  }

  .hero-section {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
    padding: 120px 20px 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero-section::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -200px;
    right: -200px;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-content h1 {
    font-size: 3.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
  }

  .hero-content p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
  }

  .form-section {
    padding: 80px 20px;
    max-width: 800px;
    margin: 0 auto;
    margin-top: -40px;
  }

  .form-container {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    padding: 40px;
  }

  .form-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .form-header h2 {
    font-size: 2rem;
    color: #1e3a8a;
    margin-bottom: 0.5rem;
  }

  .form-header p {
    color: #64748b;
    font-size: 1rem;
  }

  .membership-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1e40af;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .form-group label svg {
    color: #3b82f6;
  }

  .form-group input,
  .form-group textarea {
    padding: 14px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f8fafc;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: #94a3b8;
  }

  .error-message {
    background: #fee2e2;
    color: #dc2626;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  .btn-submit {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    color: #ffffff;
    padding: 16px 32px;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;
    margin-top: 16px;
  }

  .btn-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(30, 58, 138, 0.3);
  }

  .btn-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .success-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .success-card {
    background: #ffffff;
    padding: 60px;
    border-radius: 20px;
    text-align: center;
    max-width: 500px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  }

  .success-icon {
    font-size: 5rem;
    color: #10b981;
    margin-bottom: 24px;
  }

  .success-card h2 {
    font-size: 2rem;
    color: #1e3a8a;
    margin-bottom: 16px;
  }

  .success-card p {
    color: #64748b;
    line-height: 1.7;
    margin-bottom: 12px;
  }

  .btn-primary {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    color: #ffffff;
    padding: 14px 28px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 24px;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(30, 58, 138, 0.3);
  }

  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 2.5rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .form-container {
      padding: 24px;
    }

    .form-section {
      padding: 40px 16px;
    }
  }
`;