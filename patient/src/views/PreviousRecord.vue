<template>
  <div class="patients-list-container">
    <div class="title-container">
      <i class="fas fa-history"></i>
      <h1 class="title">History</h1>
    </div>
    <div class="patients-container">
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
    <!--EDIT MODAL-->
    <div class="modal" v-if="showEditModal">
      <div class="modal-content">
        <h2>{{editedPatient.fname}}'s Vaccine Record</h2>
        <div class="text-info">
              <div><strong>AGE:</strong> {{ calculateAge(editedPatient.birthdate) }}</div>
              <div><strong>ADDRESS:</strong> {{ editedPatient.address }}</div>
              <div><strong>GENDER:</strong> {{ editedPatient.sex === 'male' ? 'M' : 'F' }}</div>
              <div><strong>CONTACT:</strong> 0{{ editedPatient.contact }}</div>
              <div class="id-info">
                <div><strong>Date of Exposure:</strong> {{ formatDate(editedPatient.expdate) }}</div>
                <div><strong>Place of Exposure:</strong> {{ editedPatient.expplace }}</div>
                <div><strong>Type of Exposure:</strong> {{ editedPatient.exptype }}</div>
                <div><strong>Source of Exposure:</strong> {{ editedPatient.expsource }}</div>
                <div><strong>Site of Exposure:</strong> {{ editedPatient.expsite }}</div>
                <div style="margin-bottom: 15px;"><strong>Washing of Bite Wound:</strong> {{ editedPatient.wash === 0 ? 'NO' : 'YES' }}</div>
              </div>
          </div>
        <div class="form-columns">
          <!-- Left Column -->
          <div class="form-column">

            <div class="form-group">
              <label for="edited-expcateg"><strong>Category of Exposure:</strong></label>
              <select id="edited-expcateg" v-model="editedPatient.expcateg" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div style="margin-top: 15px;"><strong>Day 0:</strong> {{ this.getCurrentDate() }}</div>
            <div><strong>Day 3:</strong> {{ this.getFutureDate(3) }}</div>
            <div><strong>Day 7:</strong> {{ this.getFutureDate(7) }}</div>
            <div><strong>Day 28:</strong> {{ this.getFutureDate(28) }}</div>
          </div>
        </div>

        <div class="button-group">
          <button class="cancel-button" @click="showEditModal = false">Cancel</button>
          <button type="submit" @click="submitEdit" class="submit-button">Provide Record</button>
        </div>
      </div>
    </div>
    <!--ADD MODAL-->
    <div class="modal" v-if="showAddModal">
    <div class="modal-content">
      <h2>Add New Patient</h2>
      <div class="form-columns">
        <!-- Left Column -->
        <div class="form-column">
          <div class="form-group">
            <label for="fname">User ID</label>
            <input type="text" id="fname" v-model="newPatient.user_id" required>
          </div>

          <div class="form-group">
            <label for="lname">Date of Exposure</label>
            <input type="text" id="lname" v-model="newPatient.expdate" required>
          </div>

          <div class="form-group">
            <label for="sex">Place of Exposure</label>
            <input type="text" id="address" v-model="newPatient.expplace" required>
          </div>

          <div class="form-group">
            <label for="sex">Source of Exposure</label>
            <input type="text" id="address" v-model="newPatient.expsource" required>
          </div>
        </div>

        <!-- Right Column -->
        <div class="form-column">
          <div class="form-group">
            <label for="address">Type of Exposure</label>
            <input type="text" id="address" v-model="newPatient.exptype" required>
          </div>

          <div class="form-group">
            <label for="email">Site of Exposure</label>
            <input type="email" id="email" v-model="newPatient.expsite" required>
          </div>
          <div class="form-group">
            <label for="mname">Wash</label>
            <input type="text" id="mname" v-model="newPatient.wash">
          </div>
        </div>
      </div>

      <div class="button-group">
        <button class="cancel-button" @click="showAddModal = false">Cancel</button>
        <button type="submit" @click=submitForm class="submit-button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { mapState } from "vuex";
  export default {
    name: 'NewPatients',
    data() {
      return {
        patients: [],
        showAddModal: false,
        showEditModal: false,
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
    computed: {
      ...mapState(["user"]),
      loggedInPatient() {
        return this.patients.find(patient => patient.user_id === this.user.user_id) || {};
      },
      filteredPatients() {
        return this.patients.filter(patient => patient.user_id === this.user.user_id && (patient.status == 4)).sort((a, b) => {
          return new Date(b.is_done) - new Date(a.is_done);
        });
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
      updateStatus(patient) {
        axios.put(`http://localhost:8081/api/queue/${patient.vacc_id}`)
          .then(response => {
            console.log('Status updated successfully:', response.data);
            this.fetchPatients(); // Fetch updated patient list
          })
          .catch(error => {
            console.error('Error updating status:', error);
          });
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
        axios.put(`http://localhost:8081/api/record/${this.editedPatient.vacc_id}`, {expcateg: this.editedPatient.expcateg})
          .then(response => {
            console.log('Record updated successfully:', response.data);
            this.showEditModal = false;
            this.fetchPatients();
          })
          .catch(error => {
            console.error('Error updating record:', error);
          });
      },
      resetFormFields() {
        this.newPatient = {
          fname: '',
          mname: '',
          lname: '',
          extension: '',
          address: '',
          sex: '',
          birthdate: '',
          contact: '',
          email: '',
          password: ''
        };
      }
    }
  }
  </script>


<style scoped>
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