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
        <router-link to="/login" class="register-btn">Register</router-link>
      </nav>
    </header>

    <section class="home" id="home">
      <div class="home-content">
        <div class="home-text">
          <h2>RabGuard</h2>
          <h3>
            Our system is designed to streamline the management of animal bite patients in the Olongapo City Animal Bite Treatment Center (ABTC). This user-friendly platform simplifies patient registration, vaccination scheduling, and medical record tracking. The system ensures efficient appointment booking, reminding patients of their upcoming vaccinations to prevent missed doses.
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
    <div class="row about-row"> <!-- Side by side layout for larger screens -->
      <div class="col-lg-6 about-image-container" data-aos="fade-up" data-aos-delay="100">
        <img src="../assets/about.svg" alt="About Image" class="img-fluid about-image" />
      </div>
      <div class="col-lg-6 about-text-container" data-aos="fade-up" data-aos-delay="200">
        <div class="about-card">
          <h2 class="heading">About Us</h2>
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
html, body {
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
  height: 100%; /* Ensure full height */
  overflow-x: hidden; /* Prevent horizontal scrolling */
}
.header,
.home,
.features,
.about-us,
.footer {
  width: 100%; /* Ensure sections take full width */
  box-sizing: border-box; /* Include padding and border in width calculation */
}
.header {
  position: sticky; /* Make the header sticky */
  top: 0; /* Stick to the top of the viewport */
  z-index: 1000; /* Ensure it stays on top of other content */
  display: flex;
  align-items: center; /* Align items vertically */
  justify-content: space-between;
  padding: 10px 20px; /* Reduce padding for a slimmer header */
  background: linear-gradient(145deg, #188754, #d6f6d5); 
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  transition: background 0.3s; /* Smooth transition for background color */
}

.header.scrolled {
  background: #007bff; /* Change to a solid color when scrolled */
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-container img {
  height: 60px; /* Reduced height of the logo */
  margin-right: 10px; /* Adjust margin if needed */
}


.logo-container h1 {
  font-size: 28px; /* Reduce font size of the logo text */
  font-weight: bold;
  margin: 0; /* Remove default margin */
}

.nav {
  display: flex;
  gap: 50px;
}

.nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  font-size: 20px;
}

.nav a:hover {
  color: white; /* Change color on hover */
}

.register-btn {
  background-color: #188754;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s; /* Added transform */
}

.register-btn:hover {
  background-color: #d6f6d5; 
  transform: scale(1.05); /* Slightly enlarge on hover */
}

.home {
  display: flex;
  justify-content: center; /* Centering the content */
  padding: 40px; /* Increased padding */
  background: linear-gradient(135deg, rgba(241, 249, 255, 0.8), rgba(255, 255, 255, 0.8)); /* Light background with transparency */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.home-content {
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.home-text {
  max-width: 50%; /* Allow more space for text */
  padding: 50px; /* Added padding for spacing */
  text-align: left; /* Align text to the left */
}

h2 {
  font-size: 2.5rem; /* Larger font size for the main title */
  margin-bottom: 10px; /* Space below title */
}

h3 {
  font-size: 1.2rem; /* Adjust size */
  line-height: 1.5; /* Improved line spacing */
}

.cta-button {
  display: inline-block;
  background-color: #188754; /* Same color as the header */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 20px; /* Space above the button */
  transition: background-color 0.3s, transform 0.2s; /* Added transform */
}

.cta-button:hover {
  background-color: #d6f6d5; 
  transform: scale(1.05); /* Slightly enlarge on hover */
}

.hero-image {
  width: 100%; /* Responsive width */
  max-width: 700px; /* Limit max size for large screens */
  transition: transform 0.3s; /* Smooth transform */
}

.hero-image:hover {
  transform: scale(1.05); /* Zoom effect on hover */
}

.features {
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  align-items: center; /* Center content */
  padding: 40px;
  background: linear-gradient(145deg, #188754, #d6f6d5); 
}

.features h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}
.icon-container {
  font-size: 2rem; /* Adjust the icon size */
  color: #188754; /* Icon color */
  margin-bottom: 10px; /* Space between icon and text */
  text-align: center;
}
.cards {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping of cards */
  justify-content: center; /* Center cards */
}


.card {
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 10px; /* Space between cards */
  padding: 20px; /* Padding inside cards */
  width: 300px; /* Fixed width for cards */
  transition: transform 0.3s, box-shadow 0.3s; /* Smooth transition */
}
.card:hover {
  transform: translateY(-5px); /* Lift the card slightly */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
}
.about-us {
  display: flex; /* Ensure this is flex */
  justify-content: center; /* Center horizontally */
  padding: 40px 0; /* Add padding */
  
}
.about-row {
  display: flex;
  flex-direction: row; /* Ensures text goes to the right side of the image */
  align-items: center;
  gap: 20px; /* Add space between the image and text */
  
}

.about-image-container {
  flex: 2;
  display: flex; /* Flex container for image */
  justify-content: flex-start;
}

.about-image {
  max-width: 150%; /* Responsive width for image */
  height: auto; /* Maintain aspect ratio */
}
.about-image:hover {
  transform: scale(1.05); /* Zoom effect on hover */
}

.about-text-container {
  flex: 1; /* Adjust text size */
  padding: 20px;
  display: flex;
  flex-direction: column; /* Stack text content vertically */
  justify-content: flex-start; /* Align the content at the top */
  font-size: 25px;
  color: black;
}
.about-card:hover {
  transform: translateY(-5px); /* Lift the card slightly */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
}
.about-card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(145deg, #188754, #d6f6d5); 
}


.heading {
  font-size: 2rem;
  margin-bottom: 20px;
}

.footer {
  text-align: center;
  padding: 20px;
  background: #188754;
  color: white;
}

@media (max-width: 768px) {
  .home-content {
    flex-direction: column; /* Stack elements vertically on small screens */
    align-items: center;
  }

  .home-text {
    max-width: 90%; /* Expand text area on small screens */
    text-align: center; /* Center align text */
  }

  .hero-image {
    max-width: 100%; /* Full width for small screens */
  }

  .features h2 {
    font-size: 2rem; /* Smaller font size for headings */
  }

  .card {
    width: 100%; /* Full width for cards on small screens */
    max-width: 400px; /* Limit max width */
  }
  .row {
    flex-direction: column; /* Stack image and card vertically */
  }

  .about-card {
    margin-top: 30px; /* Space between image and text on small screens */
  }
}
</style>
