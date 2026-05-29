import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate, Link } from "react-router-dom";
import { steps } from "./steps";
import { testimonials } from "./testimonials";
import { Title, Subtitle } from "../Utils/Title/Title"
import { PrimaryButton, SecondaryButton } from "../Utils/Buttons/primaryButton/primaryButton";


const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.reveal}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.active);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

    const handleClick = (section) => {
    switch (section) {
      case "1":
        navigate("/signup");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>

      {/* Hero Section */}
      <section className={`${styles.hero} ${styles.reveal}`}>
          <Title>Find Your Perfect Match</Title>
          <p className={styles.text}>Connect with singles near you and start your love story today.</p>
          <div className={styles.ctaButtons}>
            <div className={styles.ctaButton}><PrimaryButton onClick={() => handleClick("1")}>Sign Up</PrimaryButton></div>
            <div className={styles.ctaButton}><SecondaryButton>Learn More</SecondaryButton></div>
          </div>
          <div className={styles.linkBox}>
            <Link to="/signin">Already have an account? Sign in.</Link>
          </div>
      </section>

      {/* How it Works */}
      <section className={`${styles.howItWorks} ${styles.reveal}`}>
        <Subtitle>How It Works</Subtitle>
        <div className={styles.steps}>
          {steps.map((step, idx) => (
            <div key={idx} className={`${styles.step} ${styles.reveal}`}>
              <Subtitle>{step.title}</Subtitle>
              <p className={styles.text}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${styles.testimonials} ${styles.reveal}`}>
        <Subtitle>Success Stories</Subtitle>
        <div className={styles.testimonialCards}>
          {testimonials.map((t, idx) => (
            <div key={idx} className={`${styles.testimonialCard} ${styles.reveal}`}>
              <p className={styles.text}>"{t.message}"</p>
              <p className={styles.text}>- {t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className={`${styles.finalCTA} ${styles.reveal}`}>
        <Subtitle>Ready to find your match?</Subtitle>
        <button className={styles.primaryBtn}>Sign Up Now</button>
      </section>
    </div>
  );
};

export default Signup;
