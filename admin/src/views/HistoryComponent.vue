<template>
  <div class="top-container">
    <h1 class="bg-title">History</h1>
    <div class="history">
      <span class="text">History</span>
      <i class="fas fa-history"></i>
      <hr />
    </div>
    <button @click="exportToExcel" class="export-button">Generate Report</button>
  </div>

  <div class="patients-list-container">
    <div class="title-container">
      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input type="text" v-model="searchQuery" placeholder="Search Patients" class="search-bar">
      </div>
    </div>

    <div class="patients-container">
      <div class="patient-box" 
           v-for="(patient, index) in filteredPatients" 
           :key="index">
        
        <div class="patient-info">
          <div class="image-container">
            <img class="patient-image" :src="getPatientImage(patient.user_photo)" alt="Profile Image">
            <div><strong>VACC ID:</strong> {{ patient.vacc_id }}</div>
          </div>

          <!-- Patient Basic Info -->
          <div class="text-info">
            <div><strong>NAME:</strong> {{ fullName(patient) }}</div>
            <div><strong>AGE:</strong> {{ calculateAge(patient.birthdate) }}</div>
            <div><strong>ADDRESS:</strong> {{ patient.address }}</div>
            <div><strong>GENDER:</strong> {{ patient.sex === 'male' ? 'M' : 'F' }}</div>
            <div><strong>CONTACT:</strong> 0{{ patient.contact }}</div>
          </div>
        </div>

        <!-- Dropdown Button -->
        <button @click="toggleExposure(index)" class="dropdown-button">
          {{ showExposure[index] ? 'Hide Exposure Details' : 'Show Exposure Details' }}
        </button>

        <!-- Exposure Details and Schedules (Two Columns) -->
        <div v-if="showExposure[index]" class="exposure-schedules-container">
          <div class="exposure-info">
            <div class="exposure-detail"><strong>Date of Exposure:</strong> {{ formatDate(patient.expdate) }}</div>
            <div class="exposure-detail"><strong>Place of Exposure:</strong> {{ patient.expplace }}</div>
            <div class="exposure-detail"><strong>Type of Exposure:</strong> {{ patient.exptype }}</div>
            <div class="exposure-detail"><strong>Source of Exposure:</strong> {{ patient.expsource }}</div>
            <div class="exposure-detail"><strong>Category of Exposure:</strong> {{ patient.expcateg }}</div>
            <div class="exposure-detail"><strong>Site of Exposure:</strong> {{ patient.expsite }}</div>
            <div class="exposure-detail"><strong>Washing of Bite Wound:</strong> {{ patient.wash === 0 ? 'NO' : 'YES' }}</div>
          </div>

          <div class="schedules-info">
            <div class="exposure-detail" style="margin-top: 17px;"><strong>Schedules:</strong></div>
            <div class="exposure-detail"><strong>Day 0:</strong> {{ formatDate(patient.date0) }}</div>
            <div class="exposure-detail"><strong>Day 3:</strong> {{ formatDate(patient.date3) }}</div>
            <div class="exposure-detail"><strong>Day 7:</strong> {{ formatDate(patient.date7) }}</div>
            <div class="exposure-detail"><strong>Day 28:</strong> {{ formatDate(patient.date28) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as XLSX from 'xlsx';
export default {
  name: 'NewPatients',
  data() {
    return {
      currentTime: '',
      patients: [],
      showAddModal: false,
      showEditModal: false,
      searchQuery: '',
      showExposure: [], 
      newPatient: { 
        user_id: '',
        expdate: '',
        exptype: '',
        expplace: '',
        expsource: '',
        expsite: '',
        wash: '',
      },
      editedPatient: {
        vacc_id: '',
        user_id: '',
        expcateg: '',
        day0: '',
        expdate: '',
        expplace: '',
        expsource: '',
        expsite: '',
        wash: ''
      }
    };
  },
  mounted() {
    this.fetchPatients();
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  computed: {
    filteredPatients() {
      return this.patients
        .filter(patient => patient.status == 4 && this.matchesSearchQuery(patient))
        .sort((a, b) => new Date(b.is_done) - new Date(a.is_done));
    }
  },
  methods: {
    getPatientImage(userPhoto) {
        try {
          return require(`../assets/${userPhoto}`);
        } catch (e) {
          return require('../assets/profile.jpg');
        }
      },
    matchesSearchQuery(patient) {
      const query = this.searchQuery.toLowerCase();
      return (
        this.fullName(patient).toLowerCase().includes(query) ||
        patient.address.toLowerCase().includes(query) ||
        patient.contact.toString().includes(query)
      );
    },
    toggleExposure(index) {
      // Check if the index already exists in the showExposure array; if not, initialize it.
      if (this.showExposure[index] === undefined) {
        this.showExposure[index] = false; // Default to hidden if not already defined
      }
      // Toggle the exposure details visibility
      this.showExposure[index] = !this.showExposure[index];
    },
    exportToExcel() {
      const exportData = this.filteredPatients.map(patient => ({
        'PATIENT NAME': this.fullName(patient),
        'EXPOSURE DATE': this.formatDate(patient.expdate),
        'EXPOSURE TYPE': patient.exptype,
        'EXPOSURE SITE': patient.expsite,
        'DATE OF EXPOSURE': this.formatDate(patient.date0),
        'COMPLETE VACCINATION': (patient.day3 === 1 && patient.day7 === 1) ? 'Yes' : 'No',
        'DATE OF COMPLETION': patient.is_done ? this.formatDate(patient.is_done) : 'Did Not Complete Vaccination'
      }));
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(exportData);

      worksheet['!cols'] = [
        { width: 30 }, // 'The Patient Name'
        { width: 20 }, // 'Exposure Date'
        { width: 20 }, // 'Exposure Type'
        { width: 20 }, // 'Exposure Site'
        { width: 20 }, // 'Date of Exposure'
        { width: 25 }, // 'Completed The Vaccination'
        { width: 30 }  // 'Date of Completion'
      ];

      const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
      for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
        const cellAddress = { c: col, r: headerRange.s.r };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        if (!worksheet[cellRef]) worksheet[cellRef] = {};
        worksheet[cellRef].s = {
          font: {
            bold: true
          }
        };
      }

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vaccination Records');
      XLSX.writeFile(workbook, 'VaccinationRecords.xlsx');
    },
    updateTime() {
      const now = new Date();
      const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      this.currentTime = now.toLocaleDateString('en-US', options);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },
    getCurrentDate() {
      const now = new Date();
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
      const month = monthNames[now.getMonth()];
      const day = now.getDate();
      const year = now.getFullYear();
      return `${month} ${day}, ${year}`;
    },
    getFutureDate(days) {
      const now = new Date();
      const futureDate = new Date(now.setDate(now.getDate() + days));
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
      const month = monthNames[futureDate.getMonth()];
      const day = futureDate.getDate();
      const year = futureDate.getFullYear();
      return `${month} ${day}, ${year}`;
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
    submitForm() {
      axios.post('http://localhost:8081/api/record', this.newPatient)
        .then(response => {
          console.log('Record added successfully:', response.data);
          this.showAddModal = false; // Close modal after successful submission
          this.fetchPatients(); // Fetch updated patient list
          // Reset form fields if needed
          this.newPatient = {
            user_id: '',
            expdate: '',
            exptype: '',
            expsource: '',
            expplace: '',
            expsite: '',
            wash: '',
          };
        })
        .catch(error => {
          console.error('Error adding record:', error);
        });
    },
    fetchPatients() {
      axios.get('http://localhost:8081/api/record')
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
                  sex: user.sex,
                  user_photo: user.user_photo,
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
    },
    editPatient(patient) {
      this.editedPatient = { ...patient };
      this.showEditModal = true;
    },
    fullName(patient) {
      let nameParts = [];
      if (patient.fname) nameParts.push(patient.fname);
      if (patient.mname) nameParts.push(patient.mname.charAt(0) + '.');
      if (patient.lname) nameParts.push(patient.lname);
      if (patient.extension) nameParts.push(patient.extension);
      return nameParts.join(' ');
    },
    submitEdit() {
      const updatedData = {
        expcateg: this.editedPatient.expcateg,
        day3: this.editedPatient.day3 ? 1 : 0,
        day7: this.editedPatient.day7 ? 1 : 0,
        day28: this.editedPatient.day28 ? 1 : 0,
        expdate: this.editedPatient.expdate,
        expplace: this.editedPatient.expplace,
        expsource: this.editedPatient.expsource,
        expsite: this.editedPatient.expsite,
        wash: this.editedPatient.wash
      };

      axios.put(`http://localhost:8081/api/record/${this.editedPatient.vacc_id}`, updatedData)
        .then(response => {
          console.log('Record updated successfully:', response.data);
          this.showEditModal = false; 
          this.fetchPatients(); 
        })
        .catch(error => {
          console.error('Error updating record:', error);
        });
    }
  }
};
</script>



<style scoped>
.export-button-container {
  display: flex;
  justify-content: flex-end; /* Aligns items to the right */
  margin: 1rem; /* Space around the container */
  padding-right: 2rem; /* Space from the right edge of the page */
}

.export-button {
  padding: 10px 20px;
  background-color: #0f8444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.export-button:hover {
  background-color: #19c366;
}
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

.history {
  display: flex;
  align-items: center;
  flex: 1;
}

.history .text {
  margin-left: 1rem;
  color: var(--dark);
  font-size: 1.5rem;
  font-weight: 900;
}

.history i {
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
.clock {
    color: black;
    align-self: right;
    margin-left: auto;
    font-family: 'Product Sans', sans-serif;
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
  margin-left: 20px;
  margin-top:20px;
 border-color: #169d53;
 border-width: 1px 1px 1px 6px;
 border-radius: 10px;
}
.dropdown-button {
  margin-top: 10px;
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  margin-bottom: 10px;
}

.dropdown-button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
/* Align exposure details to the left */
.exposure-detail {
  text-align: left; /* Align text to the left */
  margin-bottom: 5px; /* Space between lines */
  margin-left: 30px;
}
.exposure-schedules-container {
  display: flex; /* Create a two-column layout */
  justify-content: space-between; /* Space between the two columns */
  margin-top: 1rem; /* Space above the exposure/schedules section */
}

.exposure-info {
  flex: 1; /* Take full width for exposure info */
  margin-right: 20px; /* Space between exposure and schedules */
}

.schedules-info {
  flex: 1; /* Take full width for schedules info */
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

.edit-button-container {
  align-self: flex-end;
  font-family: 'Product Sans', sans-serif;
}
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: 'Product Sans', sans-serif;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Adjust the maximum width as needed */
  width: 100%;
  font-family: 'Product Sans', sans-serif;
  position: relative;  /* Ensures close button is positioned relative to modal content */
  text-align: left;
}

.close {
  position: absolute;
  top: 10px;
  font-family: 'Product Sans', sans-serif;
  cursor: pointer;
}

.close:hover {
  color: #333; /* Change color on hover if desired */
}

.submit-button {
  background-color: #1e3a8a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-family: 'Product Sans', sans-serif;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #12225c;
}

.add-button {
  margin-left: auto;
  margin-right: 10px;
  background-color: #1e3a8a;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-family: 'Product Sans', sans-serif;
  border-radius: 5px;
}

.add-button:hover {
  background-color: #12225c;
}

.search-container {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 400px;
}

.search-bar {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 1rem; /* Adjust padding to fit the icon */
  box-sizing: border-box;
  margin-left: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow effect */
  transition: box-shadow 0.3s; /* Add transition for hover effect */
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: black;
  margin-left: 20px;
}

.edit-button {
  margin-left: auto;
  margin-right: 10px;
  background-color: #1e3a8a;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Product Sans', sans-serif;
}

.edit-button:hover{
  background-color: #12225c;
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
</style>