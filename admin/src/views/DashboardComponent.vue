<template>
  <main>
    <div class="top-container">
      <h1 class="bg-title">Dashboard</h1>
      <div class="dashboard">
        <span class="text">Dashboard</span>
        <hr />
      </div>
    </div>
    <div class="wrapper">
      <div class="stats-cards">
        <div class="stat-card">
          <div class="icon-container">
            <i class="fas fa-users"></i>
          </div>
          <div class="text-container">
            <h2>Total Patients</h2>
            <span>2000+</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon-container">
            <i class="fas fa-user-check"></i>
          </div>
          <div class="text-container">
            <h2>Today Patients</h2>
            <span>068</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon-container">
            <i class="fas fa-calendar-check"></i>
          </div>
          <div class="text-container">
            <h2>Today Appointments</h2>
            <span>085</span>
          </div>
        </div>
      </div>

      <div class="chart-appointment-container">
        <div class="chart-container">
          <div class="chart-content">
            <canvas ref="patientSummaryChart"></canvas>
          </div>
        </div>

        <div class="appointment-content professional-card">
          <div class="card appointment-card with-border">
            <div class="card-header professional-header">
              <h5 class="card-title">Today's Appointments</h5>
            </div>
            <div class="card-body">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Place</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(appointment, index) in filteredAppointments" :key="index">
                    <th>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</th>
                    <td>{{ appointment.patient }}</td>
                    <td>{{ appointment.place }}</td>
                    <td>
                      <span class="status" :class="statusClass(appointment.status)">
                        {{ appointment.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>



<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      appointments: [
        { patient: 'Lanpher Garia', place: 'East Tapinac', status: 'On going' },
        { patient: 'Sanath Deo', place: 'Old Cabalan', status: 'Done' },
        { patient: 'Loeare Phanj', place: 'New Cabalan', status: 'Done' },
        { patient: 'Komola Haris', place: 'East Bajac Bajac', status: 'Done' },
        { patient: 'John Doe', place: 'New Cabalan', status: 'On going' },
        { patient: 'Jane Smith', place: 'New Cabalan', status: 'Done' },
        { patient: 'Alice Brown', place: 'New Cabalan', status: 'On going' },
        { patient: 'Bob White', place: 'East Bajac Bajac', status: 'Done' },
        { patient: 'Charlie Green', place: 'East Bajac Bajac', status: 'Done' },
        { patient: 'Eve Black', place: 'East Bajac Bajac', status: 'Done' },
      ],
      currentPage: 1,
      itemsPerPage: 5,
      searchTerm: '', // New search term for filtering
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.appointments.length / this.itemsPerPage);
    },
    filteredAppointments() {
      return this.paginatedAppointments.filter(appointment =>
        appointment.patient.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    paginatedAppointments() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.appointments.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    renderCharts() {
      this.renderPatientSummaryChart();
    },
    renderPatientSummaryChart() {
      const patientData = [50, 30, 20]; // Dummy data for New, Old, and Total patients
      const ctx = this.$refs.patientSummaryChart.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut', // Pie Chart
        data: {
          labels: ['New Patients', 'Old Patients', 'Total Patients'],
          datasets: [
            {
              label: 'Patients Summary',
              backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
              data: patientData,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true, // Enable tooltips for chart data
            },
          },
        },
      });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    statusClass(status) {
      return {
        'status-done': status === 'Done',
        'status-ongoing': status === 'On going',
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.renderCharts();
    });
  },
};
</script>

<style>
/* Base styles */
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

.wrapper {
  overflow-y: hidden;
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

/* Improved Stats Card */
.stats-cards {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  background: linear-gradient(145deg, #42a5f5, #1e88e5); /* Gradient background */
  color: white; /* White text for better contrast */
  padding: 15px;
  border-radius: 15px; /* Rounder corners for a modern look */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Softer shadow for depth */
  width: 30%;
  position: relative;
  margin-left: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Animation for hover */
}

.stat-card:hover {
  transform: translateY(-5px); /* Slight lift on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
}

.icon-container {
  margin-right: 1rem;
  background-color: rgba(255, 255, 255, 0.2); /* Light transparent fill */
  width: 60px;
  height: 60px;
  border-radius: 10px; /* Rounded corners */
  display: flex;
  justify-content: center;
  align-items: center;
}

.stat-card i {
  font-size: 2.5rem;
  color: white;
}

.text-container {
  text-align: left;
}

.text-container h2 {
  font-size: 1.5rem;
  margin-bottom: 5px;
  font-weight: bold;
}

.text-container span {
  font-size: 2rem;
  font-weight: bold;
}

.chart-appointment-container {
  display: flex; /* Aligns children in a row */
  justify-content: space-between; /* Space between elements */
  margin: 20px 20px 20px 0; /* Adjust margin to separate it */
}

/* Chart Container Styles */
.chart-container {
  flex: 1; /* Allow the chart to grow and fill space */
  background-color: #d6f6d5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 20px; /* Space between chart and appointment */
}

/* Appointment Content Styles */
.appointment-content {
  flex: 1; /* Allow the appointment section to grow and fill space */
  background-color: white; /* Ensure the appointment card has a clean background */
  padding: 20px;
  border-radius: 15px; /* Keep rounded corners */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.chart-content {
  text-align: center;
  padding: 20px;
  margin-right: 10px; /* Add space between the chart and the appointment section */
}

/* Improved Today's Appointments Card */
.appointment-card {
  background-color: white; /* Clean white background */
  padding: 20px;
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333; /* Darker text color for better readability */
}

/* Table Styles */
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px; /* Adds spacing between rows */
}

.table th,
.table td {
  padding: 12px 15px; /* Add more padding for a cleaner look */
  text-align: left;
}

.table th {
  background-color: #f1f1f1; /* Light background for header */
  color: #333; /* Darker text for headers */
}

.table tbody tr {
  background-color: #fff; /* White background for rows */
  transition: background-color 0.3s ease; /* Smooth transition on hover */
}

.table tbody tr:hover {
  background-color: #f0f8ff; /* Light blue hover effect */
}

/* Status Styles */
.status {
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
}

.status-done {
  background-color: #4caf50;
}

.status-ongoing {
  background-color: #ff9800;
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.pagination button {
  padding: 8px 12px;
  border: none;
  background-color: #42a5f5; /* Same blue as stat cards for consistency */
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #1e88e5; /* Darker blue on hover */
}

.pagination button:disabled {
  background-color: #ccc; /* Disabled button styling */
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
  font-size: 1rem;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .stats-cards {
    flex-direction: column;
  }

  .stat-card {
    width: 100%;
    margin-bottom: 1rem;
  }

  .chart-and-appointments {
    flex-direction: column;
  }

  .chart-content,
  .appointment-content {
    width: 100%;
    margin-bottom: 1rem;
  }
}

</style>
