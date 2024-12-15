<template>
  <div id="app">
    <header class="header">
      <div class="logo-container">
        <img :src="logo" alt="Rabguard Logo" />
        <h1>Rabguard</h1>
      </div>
      <nav class="nav">
    <router-link to="/" @click.prevent="scrollTo('home')">Home</router-link>
    <router-link to="/" @click.prevent="scrollTo('features')">Features</router-link>
    <router-link to="/" @click.prevent="scrollTo('about-section')">About Us</router-link>
  </nav>
  <router-link to="/login" class="register-btn">Register</router-link>
    </header>

    <section class="home" id="home">
      <div class="home-content">
        <div class="home-text">
          <h2>RabGuard</h2>
          <h3>
            Our system is designed to streamline the management of animal bite patients in the  <strong>Olongapo City Animal Bite Treatment Center (ABTC)</strong> This user-friendly platform simplifies patient registration, vaccination scheduling, and medical record tracking. The system ensures efficient appointment booking, reminding patients of their upcoming vaccinations to prevent missed doses.
          </h3>
          <router-link to="/login" class="cta-button">Get Started</router-link> <!-- Added CTA button -->
        </div>
        <img src="../assets/hero.svg" alt="Hero Image" class="hero-image" />
      </div>
    </section>

    <section class="features" id="features">
      <h2>Features</h2>
      <div class="cards">
        <div class="card" v-for="feature in features" :key="feature.id">
          <div class="icon-container">
            <i :class="feature.icon"></i> <!-- Dynamically set the icon -->
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="about-us" id="about-section">
  <div class="container">
    <div class="row about-row">
      <div class="col-lg-6 about-image-container" data-aos="fade-up" data-aos-delay="100">
        <img src="../assets/about.svg" alt="About Image" class="img-fluid about-image" />
      </div>
      <div class="col-lg-6 about-text-container" data-aos="fade-up" data-aos-delay="200">
        <div class="about-card">
          <div class="team-logos">
            <img src="../assets/gclogo.png" alt="Gapo Logo" class="team-logo left-logo" />
            <div class="heading-container">
              <h2 class="heading">About Us</h2>
              <h3 class="team-name">UNIFIED SYSTEM BUILDERS</h3> <!-- Team name moved inside this container -->
            </div>
            <img src="../assets/usblogo.png" alt="Unified System Builders Logo" class="team-logo right-logo" />
          </div>
          <p>
            We are a group of dedicated students from Gordon College, working on our Capstone project aimed at addressing real-world challenges in public health. Our app, the Patient Management and Vaccination Scheduling System for Animal Bite Patients, is designed to assist the Olongapo City Animal Bite Treatment Center (ABTC) in managing patient records and vaccination schedules more efficiently.
          </p>
          <p>
            Our goal is to contribute to the local community by providing a digital solution that improves patient care, enhances vaccine management, and ultimately helps in the prevention of rabies.
          </p>
          <h4>Team Composition</h4>
          <ul class="list-unstyled ul-check primary">
            <li>Mr. Lanpher Josh Garcia</li>
            <li>Mr. Lee Silvestre</li>
            <li>Mr. Joseph David Linobo</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <p>&copy; 2024 Rabguard. All rights reserved.</p>
  <div class="social-container"> <!-- Added container for social links -->
    <a href="https://www.facebook.com/profile.php?id=61565599327030" target="_blank" class="social-link">
      <i class="fab fa-facebook-f"></i> <!-- Font Awesome Facebook Icon -->
    </a>
  </div>
</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
    logo: require('../assets/rabguardlogo.png'),
    features: [
      { id: 1, title: 'Request Vaccination Form', description: '"Allows users to submit requests for vaccination appointments, streamlining the process for both patients and clinic staff."', icon: 'fas fa-file-alt' },
      { id: 2, title: 'Treatment Tracking', description: '"Enables users to track their personal treatment schedules and receive notifications on upcoming vaccinations or follow-ups."', icon: 'fas fa-calendar-check' },
      { id: 3, title: 'User Profile', description: '"A personalized dashboard where users can view and update their personal information, vaccination history, and scheduled appointments."', icon: 'fas fa-user-circle' },
      { id: 4, title: 'Medical Records', description: '"Provides a comprehensive record of past appointments, treatments, and vaccinations, allowing users and administrators to review previous medical interactions and ensure that all treatments are properly documented and completed."', icon: 'fas fa-notes-medical' },
    ],
  };
},
  methods: {
    scrollTo(section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
};
</script>

<style scoped>
/* General Styles */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}

.header,
.home,
.features,
.about-us,
.footer {
  width: 100%;
  box-sizing: border-box;
}

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px; /* Reduced padding to make the header slimmer */
  height: 100px; /* You can adjust this value if you want more control over the height */
  background: linear-gradient(145deg, #188754, #d6f6d5); /* Gradient background */
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  transition: background 0.3s;
}

.header.scrolled {
  background: #188754; /* Darker blue when scrolled */
}
/* Logo Styles */
.logo-container {
  display: flex;
  align-items: center;
  margin-top: 15px;
}
/* Logo Styles */
.logo-container img {
  height: 110px; /* Increased the height of the logo */
  margin-right: 10px;
}

.logo-container h1 {
  font-size: 32px; /* Slightly larger font size for "Rabguard" */
  font-weight: bold;
  margin: 0;
  margin-left: 10px; /* Space between the logo and the title */
}

/* Navigation Links */
.nav {
  display: flex;
  gap: 50px; /* Space between the links */
  justify-content: flex-start; /* Move links to the left */
  margin-top: 5px;
  flex-grow: 1; /* Make the navigation take up all available space */
  margin-left: 50px;
}

.nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  font-size: 20px;
}

.nav a:hover {
  color: white;
}

/* Register Button */
.register-btn {
  background-color: #188754;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
  margin-left: auto; /* Keep the register button on the right */
  text-decoration: none;
}

.register-btn:hover {
  background-color: #d6f6d5; /* Light blue on hover */
  transform: scale(1.05);
  color: #188754;
}

/* Home Section */
.home {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Aligns content to the top */
  padding: 20px 80px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-height: 100vh; /* Full viewport height */
  width: 100%; /* Full width */
}
/* Emphasized Text in Home Section */
.home-text strong {
  color: #188754; /* Dark blue for emphasis */
  font-weight: bold;
}
.home-content {
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding-left: 20px; /* Add padding to move it more left if needed */
}

.home-text {
  max-width: 50%; /* Keep this if you want to restrict width */
  padding: 50px 0; /* Adjust vertical padding as needed */
  padding-left: 0; /* Remove left padding */
  text-align: left; /* Ensure text is left-aligned */
  margin-left: 0; /* Remove margin on the left side */
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #188754; /* Blue heading */
}

h3 {
  font-size: 1.2rem;
  line-height: 1.5;
  color: #333;
}

.cta-button {
  display: inline-block;
  background-color: #188754;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.2s;
}

.cta-button:hover {
  background-color: #cfe2ff;
  transform: scale(1.05);
}

.hero-image {
  width: 110%;
  max-width: 700px;
  transition: transform 0.3s;
  justify-content: flex-end;
}

.hero-image:hover {
  transform: scale(1.05);
}

/* Features Section */
.features {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: linear-gradient(145deg, #188754, #d6f6d5); /* Gradient background */
}

.features h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: white;
}

.icon-container {
  font-size: 2rem;
  color: #188754;
  margin-bottom: 10px;
  text-align: center;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  width: 300px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* About Us Section */
.about-us {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.about-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.about-image-container {
  flex: 2;
  display: flex;
  justify-content: flex-start;
}

.about-image {
  max-width: 150%;
  height: auto;
}

.about-image:hover {
  transform: scale(1.05);
}

.about-text-container {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 20px;
  color: black;
}

.about-card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(145deg, #188754, #d6f6d5); /* Gradient background */
}

.about-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.heading {
  font-size: 2rem;
  margin-bottom: 20px;
  color: white;
}
.team-logos {
  display: flex;
  justify-content: space-between; /* Space logos apart */
  align-items: center; /* Center vertically */
  margin-bottom: 20px; /* Space below the logos */
}

.team-logo {
  width: 80px; /* Set width for logos (adjust as needed) */
  height: auto; /* Maintain aspect ratio */
}

.heading-container {
  display: flex;
  flex-direction: column; /* Stack heading and team name vertically */
  align-items: center; /* Center the text */
  text-align: center; /* Center text alignment */
}

.heading {
  font-size: 2rem; /* Adjust size of the heading */
  margin: 0; /* Remove default margin */
}

.team-name {
  font-size: 1rem; /* Size of the team name */
  margin: 5px 0; /* Space around the team name */
  color:white;
}
/* Footer */
.footer {
  text-align: center;
  padding: 20px;
  background: linear-gradient(145deg, #188754, #d6f6d5); /* Gradient background *//* Original footer background color */
  color: white;
}

/* Social container */
.social-container {
  background-color: #f0f0f0; /* Gray background for the box */
  padding: 10px;
  border-radius: 5px; /* Rounded corners */
  display: inline-block; /* Center the box */
  margin-top: 10px; /* Space above the box */
}

/* Social link in footer */
.footer .social-link {
  color: #007bff; /* Dark blue for the icon */
  font-size: 24px; /* Size of the icon */
  transition: color 0.3s ease;
}

.footer .social-link:hover {
  color: #0056b3; /* Darker blue on hover */
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .home-content {
    flex-direction: column;
    align-items: center;
  }

  .home-text {
    max-width: 90%;
    text-align: center;
  }

  .hero-image {
    max-width: 100%;
  }

  .features h2 {
    font-size: 2rem;
  }

  .card {
    width: 100%;
    max-width: 400px;
  }

  .row {
    flex-direction: column;
  }

  .about-card {
    margin-top: 30px;
  }
}
</style>
