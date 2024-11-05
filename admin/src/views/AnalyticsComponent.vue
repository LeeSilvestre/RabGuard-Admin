<template>
  <div class="top-container">
    <h1 class="bg-title">Analytics</h1>
    <div class="patient">
      <span class="text">Analytics</span>
      <i class="fas fa-table"></i>
      <hr />
    </div>
    <button @click="exportToPDF" class="export-button">Export to PDF</button>
  </div>

  <div>
    <table ref="table" class="styled-table">
      <thead>
        <tr>
          <th rowspan="2">Province/City<br />Municipalities</th>
          <th colspan="3">Sex</th>
          <th colspan="2">Age</th>
          <th colspan="3">AB Category</th>
          <th rowspan="2">HR</th>
          <th colspan="4">Post Exposure Prophylaxis</th>
          <th rowspan="2">Booster Dose</th>
          <th rowspan="2">PreP</th>
          <th colspan="3">Biting Animal</th>
          <th colspan="2">Wash</th>
        </tr>
        <tr>
          <th>Male</th>
          <th>Female</th>
          <th>Total</th>
          <th>&lt;15</th>
          <th>&gt;15</th>
          <th>Cat I</th>
          <th>Cat II</th>
          <th>Cat III</th>
          <th>TCV</th>
          <th># c. TCV</th>
          <th>HRIG</th>
          <th>ERIG</th>
          <th>Dog</th>
          <th>Cat</th>
          <th>Others</th>
          <th>Yes</th>
          <th>No</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.province" class="table-row">
          <td>{{ row.province }}</td>
          <td>{{ row.sex.male }}</td>
          <td>{{ row.sex.female }}</td>
          <td>{{ row.sex.total }}</td>
          <td>{{ row.age.under15 }}</td>
          <td>{{ row.age.over15 }}</td>
          <td>{{ row.abCategory.catI }}</td>
          <td>{{ row.abCategory.catII }}</td>
          <td>{{ row.abCategory.catIII }}</td>
          <td>{{ row.hr }}</td>
          <td>{{ row.postExposure.tcv }}</td>
          <td>{{ row.postExposure.cTcv }}</td>
          <td>{{ row.postExposure.hrig }}</td>
          <td>{{ row.postExposure.erig }}</td>
          <td>{{ row.boosterDose }}</td>
          <td>{{ row.preP }}</td>
          <td>{{ row.bitingAnimal.dog }}</td>
          <td>{{ row.bitingAnimal.cat }}</td>
          <td>{{ row.bitingAnimal.others }}</td>
          <td>{{ row.wash.yes }}</td>
          <td>{{ row.wash.no }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="total-row">
          <td colspan="1">1st Quarter</td>
          <td>{{ totals.sex.male }}</td>
          <td>{{ totals.sex.female }}</td>
          <td>{{ totals.sex.total }}</td>
          <td>{{ totals.age.under15 }}</td>
          <td>{{ totals.age.over15 }}</td>
          <td>{{ totals.abCategory.catI }}</td>
          <td>{{ totals.abCategory.catII }}</td>
          <td>{{ totals.abCategory.catIII }}</td>
          <td>{{ totals.hr }}</td>
          <td>{{ totals.postExposure.tcv }}</td>
          <td>{{ totals.postExposure.cTcv }}</td>
          <td>{{ totals.postExposure.hrig }}</td>
          <td>{{ totals.postExposure.erig }}</td>
          <td>{{ totals.boosterDose }}</td>
          <td>{{ totals.preP }}</td>
          <td>{{ totals.bitingAnimal.dog }}</td>
          <td>{{ totals.bitingAnimal.cat }}</td>
          <td>{{ totals.bitingAnimal.others }}</td>
          <td>{{ totals.wash.yes }}</td>
          <td>{{ totals.wash.no }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  
   <div class="total-patients-container">
    <h3>Total Patients for each Barangay</h3>
    <canvas id="totalPatientsBarChart"></canvas>
  </div>

  <div class="charts-container">
    <!-- First row of charts -->
    <div class="chart-row">
      <div class="chart">
        <h3>Sex Distribution</h3>
        <canvas id="sexDistributionChart"></canvas>
      </div>
      <div class="chart">
        <h3>Age Group</h3>
        <canvas id="ageGroupChart"></canvas>
      </div>
      <div class="chart">
        <h3>Exposure Category</h3>
        <canvas id="exposureCategoryChart"></canvas>
      </div>
    </div>

    <!-- Second row of charts -->
    <div class="chart-row">
      <div class="chart">
        <h3>Post Exposure Prophylaxis</h3>
        <canvas id="postExposureChart"></canvas>
      </div>
      <div class="chart">
        <h3>Animal Bite Source</h3>
        <canvas id="bitingAnimalChart"></canvas>
      </div>
      <div class="chart">
        <h3>Washed Wounds</h3>
        <canvas id="washChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      tableData: [
        {
          province: 'Asinan',
          sex: { male: 5, female: 3, total: 8 },
          age: { under15: 0, over15: 8 },
          abCategory: { catI: 0, catII: 8, catIII: 0 },
          hr: 8,
          postExposure: { tcv: 8, cTcv: 0, hrig: 0, erig: 0 },
          boosterDose: 0,
          preP: 0,
          bitingAnimal: { dog: 5, cat: 3, others: 0 },
          wash: { yes: 8, no: 0 }
        },
        {
          province: 'Banicain',
          sex: { male: 5, female: 12, total: 17 },
          age: { under15: 5, over15: 12 },
          abCategory: { catI: 1, catII: 15, catIII: 1 },
          hr: 17,
          postExposure: { tcv: 17, cTcv: 0, hrig: 0, erig: 0 },
          boosterDose: 0,
          preP: 0,
          bitingAnimal: { dog: 17, cat: 0, others: 0 },
          wash: { yes: 17, no: 0 }
        },
        {
          province: 'Barretto',
          sex: { male: 5, female: 12, total: 17 },
          age: { under15: 5, over15: 12 },
          abCategory: { catI: 1, catII: 15, catIII: 1 },
          hr: 17,
          postExposure: { tcv: 17, cTcv: 0, hrig: 0, erig: 0 },
          boosterDose: 0,
          preP: 0,
          bitingAnimal: { dog: 17, cat: 0, others: 0 },
          wash: { yes: 17, no: 0 }
        }
      ],
      totals: {
        sex: { male: 502, female: 540, total: 1042 },
        age: { under15: 407, over15: 635 },
        abCategory: { catI: 0, catII: 933, catIII: 109 },
        hr: 1042,
        postExposure: { tcv: 1042, cTcv: 1032, hrig: 106, erig: 0 },
        boosterDose: 31,
        preP: 0,
        bitingAnimal: { dog: 530, cat: 512, others: 0 },
        wash: { yes: 1018, no: 24 }
      }
    };
  },
  mounted() {
    this.createSexDistributionChart();
    this.createAgeGroupChart();
    this.createExposureCategoryChart();
    this.createPostExposureChart();
    this.createBitingAnimalChart();
    this.createWashChart();
    this.createTotalPatientsBarChart();
  },
  methods: {
    exportToPDF() {
      nextTick(() => {
        const pdf = new jsPDF();
        const table = this.$refs.table;

        if (!table) {
          console.error("Table reference not found.");
          return;
        }

        html2canvas(table).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 190; // Set image width
          const pageHeight = pdf.internal.pageSize.height;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          const heightLeft = imgHeight;

          let position = 0;

          // Add the image to the PDF
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          position += heightLeft;

          // Add additional pages if necessary
          while (heightLeft >= pageHeight) {
            position = heightLeft - pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          }

          // Save the PDF
          pdf.save('Rabies and Bite Victim.pdf');
        });
      });
    },
    createTotalPatientsBarChart() {
  const ctx = document.getElementById('totalPatientsBarChart').getContext('2d');
  const dummyDate = "2024"; // Dummy date for demonstration
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Asinan', 'Banicain', 'Barretto', 'East Bajac-Bajac', 'East Tapinac',
        'Gordon Heights', 'Kalaklan', 'Kalalake', 'New Cabalan', 'New Ilalim',
        'New Kababae', 'New Kalalake', 'Old Cabalan', 'Pag-asa', 'Sta. Rita',
        'West Bajac-Bajac', 'West Tapinac', 'Others'
      ],
      datasets: [
        {
          label: `Total Patients (As of ${dummyDate})`, // Label with the dummy date
          data: [502, 235, 123, 546, 342, 113, 623, 123, 223, 145, 213, 634, 213, 123, 214, 532, 321, 423], // Dummy data
          backgroundColor: '#36A2EB'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: `Total Patients for each Barangay (As of the year ${dummyDate})` // Title with dummy date
        }
      },
      scales: {
        x: {
          title: {
            display: true,
          }
        },
        y: {
          title: {
            display: true,
            text: 'Total Patients'
          },
          beginAtZero: true
        }
      }
    }
  });
},

    createSexDistributionChart() {
      const ctx = document.getElementById('sexDistributionChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Male', 'Female'],
          datasets: [
            {
              label: 'Patients',
              data: [502, 540], // Dummy data
              backgroundColor: ['#36A2EB', '#FF6384']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    },
    createAgeGroupChart() {
      const ctx = document.getElementById('ageGroupChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Under 15', 'Over 15'],
          datasets: [
            {
              label: 'Patients',
              data: [407, 635], // Dummy data
              backgroundColor: ['#FFCE56', '#FF6384']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    },
    createExposureCategoryChart() {
      const ctx = document.getElementById('exposureCategoryChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Cat I', 'Cat II', 'Cat III'],
          datasets: [
            {
              label: 'Patients',
              data: [40, 933, 109], // Dummy data
              backgroundColor: ['#4BC0C0', '#36A2EB', '#FFCE56']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    },
    createPostExposureChart() {
      const ctx = document.getElementById('postExposureChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['TCV', 'c. TCV', 'HRIG', 'ERIG'],
          datasets: [
            {
              label: 'Patients',
              data: [1042, 106, 0, 40], // Dummy data
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    },
    createBitingAnimalChart() {
      const ctx = document.getElementById('bitingAnimalChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Dog', 'Cat', 'Others'],
          datasets: [
            {
              label: 'Patients',
              data: [530, 512, 0], // Dummy data
              backgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    },
    createWashChart() {
      const ctx = document.getElementById('washChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Yes', 'No'],
          datasets: [
            {
              label: 'Washed Wounds',
              data: [1018, 24], // Dummy data
              backgroundColor: ['#007BFF', '#FF6384']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.bg-title {
  z-index: -1;
  position: absolute;
  opacity: 10%;
  top: 0;
  right: 0;
  margin: 0;
  font-size: 100px;
  font-family: Impact, fantasy;
  margin-right: 10px;
}
.top-container {
  display: flex;
  margin: 0.5rem;
  padding-top: 2%;
  position: relative;
}

.patient {
  display: flex;
  align-items: center;
  flex: 1;
}

.patient .text {
  margin-left: 1rem;
  color: var(--dark);
  font-size: 1.5rem;
  font-weight: 900;
}

.patient i {
  color: var(--dark);
  font-size: 3rem;
  position: relative;
}
hr {
  flex-basis: 100%;
  border: none;
  border-top: 1px solid #ddd;
  margin: 2.5rem 0 0 0;
}

.export-button {
  background-color: #188754; /* Bootstrap primary color */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: background-color 0.3s;
}

.export-button:hover {
  background-color: #0056b3; /* Darker shade */
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 40px 0 0 0;
  font-size: 0.9em;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.styled-table thead tr {
  background-color: #007BFF; /* Bootstrap primary color */
  color: #ffffff;
}

.styled-table th, .styled-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.table-row:hover {
  background-color: #f1f1f1; /* Light gray on hover */
}

.total-row {
  background-color: #ffeb3b; /* Yellow for totals */
  font-weight: bold;
}

tfoot td {
  font-weight: bold;
}

.charts-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.chart-row {
  display: flex;
  justify-content: space-between;
}

.chart {
  flex: 1;
  padding: 20px;
  text-align: center;
  background-color: #ffffff; /* Adds a background color */
  border-radius: 10px; /* Rounds the corners */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1); /* Adds a soft shadow */
  transition: transform 0.2s ease; /* Adds a subtle hover effect */
}

.chart:hover {
  transform: translateY(-5px); /* Elevates the container on hover */
}

.chart h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333; /* Optional: Adds a dark color for contrast */
}

canvas {
  width: 100%;
  height: auto;
  border-radius: 8px; /* Rounds the chart corners slightly */
}

.total-patients-container {
  background-color: #ffffff; /* White background for a clean look */
  border-radius: 12px; /* Rounds the corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  padding: 20px; /* Adds spacing around the content */
  margin-top: 20px; /* Adds some space above the container */
  text-align: center;
}

.total-patients-container h3 {
  font-size: 1.4em; /* Larger heading font */
  margin-bottom: 15px;
  color: #333; /* Darker color for the heading */
}

#totalPatientsBarChart {
  width: 100%;
  height: auto;
  border-radius: 8px; /* Slightly rounded corners on the chart */
}
</style>
