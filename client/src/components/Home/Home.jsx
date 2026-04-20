import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate, Link } from "react-router-dom";
import { steps } from "./steps";
import { testimonials } from "./testimonials";



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
        <div className={styles.heroBox}>
          <h1 className={styles.title}>Find Your Perfect Match</h1>
          <p className={styles.subtitle}>Connect with singles near you and start your love story today.</p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryBtn} onClick={() => handleClick("1")}>Sign Up</button>
            <button className={styles.secondaryBtn}>Learn More</button>
          </div>
          <div className={styles.linkBox}>
            <Link to="/signin">Already have an account? Sign in.</Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className={`${styles.howItWorks} ${styles.reveal}`}>
        <p className={styles.subtitle}>How It Works</p>
        <div className={styles.steps}>
          {steps.map((step, idx) => (
            <div key={idx} className={`${styles.step} ${styles.reveal}`}>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${styles.testimonials} ${styles.reveal}`}>
        <p className={styles.subtitle}>Success Stories</p>
        <div className={styles.testimonialCards}>
          {testimonials.map((t, idx) => (
            <div key={idx} className={`${styles.testimonialCard} ${styles.reveal}`}>
              <p>"{t.message}"</p>
              <p>- {t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className={`${styles.finalCTA} ${styles.reveal}`}>
        <p className={styles.subtitle}>Ready to find your match?</p>
        <button className={styles.primaryBtn}>Sign Up Now</button>
      </section>
    </div>
  );
};

export default Signup;
