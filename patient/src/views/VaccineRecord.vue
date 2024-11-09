<template>
  <div ref="patientsListContainer" class="patients-list-container">
    <!-- Download button at the top left outside the container -->

    <div class="top-container">
      <h1 class="bg-title">Record</h1>
      <div class="patient">
        <i class="fas fa-notes-medical"></i>
        <span class="text">Vaccine</span>
        <hr />
      </div>
    </div>
    <div v-if="filteredPatients.length === 0">
      No data to show
    </div>
    
    <div v-else class="patients-container">
      <button class="download-button" @click="downloadPDF">Download PDF</button>
      <div class="patient-box" v-for="(patient, index) in filteredPatients" :key="index">
        <div class="patient-info">
          <div class="image-container">
            <img class="patient-image" src="../assets/profile.jpg" alt="Profile Image">
            <div><strong>VACC ID:</strong> {{ patient.vacc_id }}</div>
          </div>
          <div class="text-info">
            <div><strong>NAME:</strong> {{ fullName(patient) }}</div>
            <div><strong>AGE:</strong> {{ calculateAge(patient.birthdate) }}</div>
            <div><strong>ADDRESS:</strong> {{ patient.address }}</div>
            <div><strong>GENDER:</strong> {{ patient.sex === 'male' ? 'M' : 'F' }}</div>
            <div><strong>CONTACT:</strong> 0{{ patient.contact }}</div>
            <div class="id-info">
              <div><strong>Date of Exposure:</strong> {{ formatDate(patient.expdate) }}</div>
              <div><strong>Place of Exposure:</strong> {{ patient.expplace }}</div>
              <div><strong>Type of Exposure:</strong> {{ patient.exptype }}</div>
              <div><strong>Source of Exposure:</strong> {{ patient.expsource }}</div>
              <div><strong>Category of Exposure:</strong> {{ patient.expcateg }}</div>
              <div><strong>Site of Exposure:</strong> {{ patient.expsite }}</div>
              <div><strong>Washing of Bite Wound:</strong> {{ patient.wash === 0 ? 'NO' : 'YES' }}</div>
              <div style="margin-top: 17px;"><strong>Schedules:</strong></div>
              <div><strong>Day 0:</strong> {{ formatDate(patient.date0) }}<i class="fas fa-check"></i></div>
              <div><strong>Day 3:</strong> {{ formatDate(patient.date3) }}<template v-if="patient.day3 === 1"><i class="fas fa-check"></i></template></div>
              <div><strong>Day 7:</strong> {{ formatDate(patient.date7) }}<template v-if="patient.day7 === 1"><i class="fas fa-check"></i></template></div>
              <div><strong>Day 28:</strong> {{ formatDate(patient.date28) }}<template v-if="patient.day28 === 1"><i class="fas fa-check"></i></template></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from "vuex";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/Logo-Health.png'; // Adjust the path based on your project structure

export default {
  name: 'NewPatients',
  data() {
    return {
      patients: [],
    };
  },
  computed: {
    ...mapState(["user"]),
    filteredPatients() {
      return this.patients.filter(patient => patient.user_id === this.user.user_id && (patient.status == 1 || patient.status == 3 || patient.status == 2));
    }
  },
  mounted() {
    if (!this.user) {
      this.$store.commit('setUser', null);
      this.$router.push("/");
    } else {
      this.fetchPatients();
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },
    calculateAge(birthdate) {
      const today = new Date();
      const birthDate = new Date(birthdate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    fullName(patient) {
      let nameParts = [];
      if (patient.fname) nameParts.push(patient.fname);
      if (patient.mname) nameParts.push(patient.mname.charAt(0) + '.');
      if (patient.lname) nameParts.push(patient.lname);
      if (patient.extension) nameParts.push(patient.extension);
      return nameParts.join(' ');
    },
    downloadPDF() {
  const doc = new jsPDF("p", "mm", "a4");

  const primaryColor = [0, 102, 204]; // Dark blue color
  const lightGray = [240, 240, 240]; // Light gray for sections

  // Adding logo and header
  doc.addImage(logo, 'PNG', 10, 10, 30, 30);
  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.text('Animal Bite Treatment Center', 50, 20);
  doc.setFontSize(12);
  doc.text('Olongapo City, Zambales', 50, 27);
  doc.text('Patient Vaccination Record', 50, 34);

  // Line Separator
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(10, 40, 200, 40);

  let yPos = 45;

  // Loop through patients
  this.filteredPatients.forEach((patient, index) => {
    if (index > 0) {
      doc.addPage();
      yPos = 45;
    }

    // Patient Info Section
    doc.setFontSize(12);
    doc.setFillColor(...lightGray);
    doc.rect(10, yPos, 190, 10, 'F');
    doc.setTextColor(0);
    doc.text(`Patient Information`, 12, yPos + 7);
    yPos += 15;

    const patientDetails = [
      { label: 'VACC ID:', value: patient.vacc_id },
      { label: 'Name:', value: this.fullName(patient) },
      { label: 'Age:', value: this.calculateAge(patient.birthdate) },
      { label: 'Address:', value: patient.address },
      { label: 'Gender:', value: patient.sex === 'male' ? 'Male' : 'Female' },
      { label: 'Contact:', value: `0${patient.contact}` },
    ];

    patientDetails.forEach((detail) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${detail.label}`, 12, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(`${detail.value}`, 50, yPos);
      yPos += 8;
    });

    // Exposure Info Table
    autoTable(doc, {
      startY: yPos + 5,
      head: [['Date of Exposure', 'Place', 'Type', 'Source', 'Category', 'Site', 'Washing']],
      body: [[
        this.formatDate(patient.expdate),
        patient.expplace,
        patient.exptype,
        patient.expsource,
        patient.expcateg,
        patient.expsite,
        patient.wash === 0 ? 'No' : 'Yes'
      ]],
      theme: 'grid',
      headStyles: { fillColor: primaryColor },
      alternateRowStyles: { fillColor: lightGray },
    });

    yPos = doc.previousAutoTable.finalY + 10;

    // Vaccination Schedule Section
    doc.setFontSize(12);
    doc.setFillColor(...lightGray);
    doc.rect(10, yPos, 190, 10, 'F');
    doc.text('Vaccination Schedules:', 12, yPos + 7);
    yPos += 15;

    const schedules = [
      { day: 'Day 0', date: this.formatDate(patient.date0), completed: true },
      { day: 'Day 3', date: this.formatDate(patient.date3), completed: patient.day3 === 1 },
      { day: 'Day 7', date: this.formatDate(patient.date7), completed: patient.day7 === 1 },
      { day: 'Day 28', date: this.formatDate(patient.date28), completed: patient.day28 === 1 },
    ];

    schedules.forEach(schedule => {
      doc.text(
        `${schedule.day}: ${schedule.date}`,
        12,
        yPos
      );
      if (schedule.completed) {
        doc.circle(90, yPos - 2, 2, 'F'); // Completed symbol
      } else {
        doc.setDrawColor(255, 0, 0);
        doc.circle(90, yPos - 2, 2); // Not completed outline
      }
      yPos += 8;
    });

    yPos += 10;

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
  });

  doc.save('Patient_Vaccination_Record.pdf');
},
    fetchPatients() {
      axios.get('http://localhost:8081/api/record/')
        .then((response) => {
          const recordData = response.data;
          const userIds = recordData.map(patient => patient.user_id);
          axios.get('http://localhost:8081/api/user', { params: { ids: userIds }})
            .then((userResponse) => {
              const userData = userResponse.data;

              const patients = recordData.map(record => {
                const user = userData.find(user => user.user_id === record.user_id);
                return {
                  ...record,
                  fname: user.fname,
                  mname: user.mname,
                  lname: user.lname,
                  extension: user.extension,
                  birthdate: user.birthdate,
                  address: user.address,
                  contact: user.contact,
                  sex: user.sex
                };
              });

              this.patients = patients;
            })
            .catch(error => {
              console.error('Error fetching user data:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching record data:', error);
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
  font-size: 30px;
  letter-spacing: 6px;
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
.patients-list-container {
  position: relative;
  padding-top: 60px; /* Ensures space at the top for the button */
}

.download-button {
  position: fixed; /* Fixed to the screen */
  bottom: 20px;    /* Distance from the bottom of the screen */
  right: 20px;     /* Distance from the right of the screen */
  padding: 10px 20px; /* Button padding */
  background-color: #007bff; /* Button background */
  color: white;    /* Button text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 999;
  font-size: 1rem; /* Default font size */
  transition: all 0.3s ease;
  margin-right: 38%
}

.download-button:hover {
  background-color: #0056b3; /* Darker shade on hover */
}
.patient-info-wrapper {
  display: flex;
  flex-direction: column;
}
.id-info { 
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.id-info div {
  margin-top: 5px; /* Adjust spacing between IDs */
}
.text-info {
  flex-basis: 100%;
}
.image-container {
  display: flex;
  align-items: center;
}
.image-container {
  width: 150px; /* Adjust width as needed */
  height: auto; /* Adjust height as needed */
  overflow: hidden;
  justify-content: flex-start;
  flex-direction: column;
  margin-right: 10px;
}

.patient-image {
  width: 100%; /* Make the image fill its container */
  height: auto; /* Maintain aspect ratio */
}
.patients-container {
  display: flex;
  flex-wrap: wrap;
  font-family: 'Product Sans', sans-serif;
  justify-content: center;
}

.patient-box {
  width: 40%; /* Each box takes up 50% of the container width */
  padding: 10px;
  box-sizing: border-box; /* Include padding in the width calculation */
  margin-left: 20px;
  margin-top:20px;
  border-style: solid;
 border-color: #169d53;
 border-width: 1px 1px 1px 6px;
 border-radius: 10px;
}

.patient-info {
  display: flex;
  align-items: flex-start;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  text-align: left;
}
@media (max-width: 768px) {
  .patients-container {
    display: flex;
    justify-content: center;
  }
}

.patients-list-container {
  padding: 20px;
  font-family: 'Product Sans', sans-serif;
}

.title-container {
  display: flex;
  align-items: center;
  font-family: 'Product Sans', sans-serif;
}

.title-container i {
  margin-right: 20px; /* Adjust this value as needed */
}

.title {
  margin-left: 10px; 
}

.table-container {
  overflow-x: auto;
  text-align: center;
  font-family: 'Product Sans', sans-serif;
}

.form-columns {
  display: flex;
}

.form-column {
  flex: 1;
  padding-right: 20px;
  font-family: 'Product Sans', sans-serif;
}

.form-columns {
  display: flex;
  font-family: 'Product Sans', sans-serif;
}

.form-column {
  flex: 1;
  padding-right: 20px;
  font-family: 'Product Sans', sans-serif;
}

.form-group {
  margin-bottom: 20px;
  font-family: 'Product Sans', sans-serif;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  font-family: 'Product Sans', sans-serif;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: 'Product Sans', sans-serif;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 9 12 15 18 9"></polygon></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 14px;
}

input[type="date"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  appearance: none;
  font-family: 'Product Sans', sans-serif;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  font-family: 'Product Sans', sans-serif;
}

.cancel-button,
.submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Product Sans', sans-serif;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
  font-family: 'Product Sans', sans-serif;
}

.submit-button {
  background-color: #1e3a8a;
  color: white;
  font-family: 'Product Sans', sans-serif;
}

.submit-button:hover {
  background-color: #12225c;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Product Sans', sans-serif;
}

th, td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #1e3a8a;
  color: white;
}
@media (max-width: 1024px) {
  .download-button {
    bottom: 15px;
    right: 15px;
    padding: 8px 15px; /* Smaller padding for tablets and smaller screens */
    font-size: 0.9rem;  /* Smaller text size */
  }
}
@media (max-width: 768px) {
  .patient-box {
    width: 100%; /* Full width on smaller screens */
  }
  .download-button {
    bottom: 10px;
    right: 10px;
    padding: 7px 12px;  /* Even smaller padding for mobile */
    font-size: 0.8rem;  /* Even smaller text size */
}
}
@media (max-width: 480px) {
  .download-button {
    bottom: 5px;
    right: 5px;
    padding: 5px 10px;  /* Smallest padding for very small screens */
    font-size: 0.7rem;  /* Smallest font size */
  }
}
</style>