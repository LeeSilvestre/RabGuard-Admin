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
      <!-- Top Statistics Cards -->
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

      <!-- Chart and Today's Appointment section -->
      <div class="chart-container">
        <div class="chart-and-appointments">
          <!-- Patient summary moved to left side and chart spacing adjusted -->
          <div class="chart-content small-chart">
            <canvas ref="patientSummaryChart"></canvas>
          </div>

          <!-- Today's Appointments on the right side -->
          <div class="appointment-content transparent-card">
            <div class="card appointment-card with-border">
    <div class="card-header transparent-header">
      <h5 class="card-title">Today's Appointments</h5>
    </div>
    <div class="card-body">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Patient</th>
            <th scope="col">Place</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(appointment, index) in filteredAppointments" :key="index">
            <th scope="row" data-label="#">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</th>
            <td data-label="Patient">{{ appointment.patient }}</td>
            <td data-label="Place">{{ appointment.place }}</td>
            <td data-label="Status">
              <span class="status" :class="statusClass(appointment.status)">
                {{ appointment.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

                <!-- Pagination with Arrow Icons -->
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

/* Stats cards */
.stats-cards {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  background-color: #D6F6D5;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 30%;
  position: relative;
  margin-left: 20px;
}

.icon-container {
  margin-right: 1rem;
  border: 2px solid #188754; /* Circular border */
  border-radius: 50%;
  padding: 10px;
  font-size: 35px;
  margin-left: 10px;
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
  margin-top: 5px;
}

.text-container h2 {
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: bold;
}

.text-container span {
  font-size: 1.8rem;
  font-weight: bold;
}

.text-container p {
  margin: 0;
  color: #777;
  font-size: 0.9rem;
}

/* Chart and Appointment List in the same container */
.chart-container {
  background-color: #D6F6D5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  margin-bottom: 20px;
}

.chart-and-appointments {
  display: flex;
  justify-content: flex-start; /* Align to the left */
  align-items: flex-start; /* Align to the top */
}

.chart-content
.appointment-content {
  width: 45%;
  height: 400px;
}

.chart-content {
  text-align: center;
  padding: 20px;
  margin-right: 10px; /* Add space between the chart and the appointment section */
}

/* Appointment Card Styles */
/* Header for Today's Appointments */
.bg-header {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.card-title {
  font-size: 20px;
  margin-top: 1px;
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.pagination button {
  padding: 5px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.pagination button:hover:not(:disabled) {
  background-color: #388E3C;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination select {
  margin-left: 10px;
}

/* Table Styles */
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px; /* Adds spacing between rows */

}

.table th,
.table td {
  padding: 0.75rem;
  text-align: left;
  vertical-align: top;
}

/* Alternating Row Colors */
.table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tbody tr:hover {
  background-color: #e0f7fa;
}

.small-chart {
  width: 40%;
}

/* Transparent card for appointments */
.transparent-card {
  width: 55%;
  background-color: transparent;
  box-shadow: none;
}

/* Transparent header */
.transparent-header {
  background-color: transparent;
  color: black;
  padding: 10px;
  border-bottom: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Search bar style */
.search-wrapper {
  position: relative;
  width: 100%;
}

.search-bar.transparent-input {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 8px;
  width: 100%;
}

.search-bar.transparent-input:focus {
  outline: none;
  border-bottom: 2px solid #4CAF50;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #4CAF50;
}

/* Status Styles */
.status {
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
}

.status-done {
  background-color: #4CAF50;
}

.status-ongoing {
  background-color: #FF9800;
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
