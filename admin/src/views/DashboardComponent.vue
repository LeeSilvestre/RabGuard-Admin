<template>
  <main>
    <div class="top-container">
      <h1 class="bg-title">Dashboard</h1>
      <div class="dashboard">
        <span class="text">Dashboard</span>
        <i class="fas fa-columns"></i>
        <hr />
      </div>
    </div>
    <div class="wrapper">
      <div class="data-container">
        <div class="patient-info">
          <div class="icon-wrapper">
            <i class="fas fa-user-plus icon"></i>
          </div>
          <div class="text-wrapper">
            <h2 class="patient-type">New Patient</h2>
            <span class="patient-count">25</span>
          </div>
        </div>
        <div class="patient-info">
          <div class="icon-wrapper">
            <i class="fas fa-user icon"></i>
          </div>
          <div class="text-wrapper">
            <h2 class="patient-type">Old Patient</h2>
            <span class="patient-count">35</span>
          </div>
        </div>
      </div>
      <div class="total-patient-container">
        <div class="total-patient-info">
          <div class="icon-wrapper">
            <i class="fas fa-users icon"></i>
          </div>
          <div class="text-wrapper">
            <h2 class="total-patient-type">Total Patients</h2>
            <span class="total-patient-count">60</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-wrapper">
      <div class="chart-container">
        <canvas ref="dailyPatientChart"></canvas>
      </div>
    </div>
  </main>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  mounted() {
    this.$nextTick(() => {
      this.renderChart();
    });
  },
  methods: {
    renderChart() {
      const dailyPatientData = [25, 40, 30, 45, 50, 50, 35];
      const ctx = this.$refs.dailyPatientChart.getContext('2d');
      new Chart(ctx, {
        type: 'bar',  
        data: {
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
          datasets: [{
            label: 'Total Daily Patients',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: dailyPatientData,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.bg-title {
  z-index: -1;
  position: absolute;
  opacity: 10%;
  margin-top: -40px;
  font-size: 100px;
  top: 0;
  right: 0;
  margin: 0;
  font-family: Impact, fantasy;
  margin-right: 1rem;
}

.top-container {
  display: flex;
  margin: 0.5rem;
  padding-top: 2%;
  position: relative;
}

.dashboard {
  display: flex;
  align-items: center;
  flex: 1;
}

.dashboard .text {
  margin-left: 1rem;
  color: var(--dark);
  font-size: 1.5rem;
  font-weight: 900;
}

.dashboard i {
  color: var(--dark);
  font-size: 2.5rem;
  position: relative;
}

.icon-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
  margin-right: 20px;
  font-size: 20px;
}

.icon {
  margin-bottom: 5px;
  background-color: #4caf50; /* Add green background */
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-right: 20px;
  font-size: 20px;
}

.text-wrapper {
  width: 70%;
  margin-right: 20px;
  font-size: 15px;

}

hr {
  flex-basis: 100%;
  border: none;
  border-top: 1px solid #ddd;
  margin: 2.5rem 0 0 0;
}

.wrapper {
  display: flex;
  flex-direction: row; /* Align items horizontally */
  justify-content: left; 
  gap: 10px; /* Add some space between the items */
  margin-top: 4rem; /* Add margin to lower the containers */
  margin-left: 50px;
}

.data-container,
.total-patient-container {
  display: flex;
  justify-content: left;
  gap: 10px;
  flex-direction: row; /* Ensure items inside are horizontal */
}

/* Styles for data-container */
.patient-info {
  display: flex;
  align-items: center ;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow effect */
  transition: box-shadow 0.3s; /* Add transition for hover effect */
}

.patient-info:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Change shadow effect on hover */
}

.patient-info h2.patient-type {
  margin: auto; /* Center the patient type */
}

.patient-count {
  margin-top: auto;
}

/* Styles for total-patient-container */
.total-patient-info {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow effect */
  transition: box-shadow 0.3s; /* Add transition for hover effect */
}

.total-patient-info:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Change shadow effect on hover */
}

.total-patient-info h2.total-patient-type {
  margin: auto; /* Center the patient type */
}

.total-patient-count {
  margin-top: auto;
}

/* Styles for chart-container */
.chart-wrapper {
  display: flex;
  justify-content: left;
  margin-top: 2rem; /* Add some space above the chart container */
  margin-left: 50px;
  width: 100%;
  max-width: 400%;
}

.chart-container {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow effect */
  transition: box-shadow 0.3s; /* Add transition for hover effect */
  width: 50%;
  max-width: 400%;
  height: auto;
  align-items: left;

}

.chart-container:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Change shadow effect on hover */
}

.chart-container canvas {
  margin: auto; /* Center the canvas */
  width: 100%;
  max-width: 400%;
  align-items: left;
}
</style>