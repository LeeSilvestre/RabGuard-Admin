<template>
    <div class="top-container">
      <h1 class="bg-title">Patient Management</h1>
      <div class="patient">
        <span class="text">Patients</span>
        <i class="fas fa-chart-bar"></i>
        <hr />
      </div>
    </div>
  <div class="patients-list-container">
    <div class="title-container">
      <button class="add-button" @click="showAddModal = true">Add</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>ADDRESS</th>
            <th>GENDER</th>
            <th>CONTACT NUMBER</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id">
            <td>{{ patient.user_id }}</td>
            <td>{{ fullName(patient) }}</td>
            <td>{{ patient.address }}</td>
            <td>{{ patient.sex === 'male' ? 'M' : 'F' }}</td>
            <td>0{{ patient.contact }}</td>
            <td>
              <button class="edit-button" @click="editPatient(patient)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    <!--EDIT MODAL-->
    <div class="modal" v-if="showEditModal">
      <div class="modal-content">
        <h2>Edit Patient</h2>
        <div class="form-columns">
          <!-- Left Column -->
          <div class="form-column">
            <div class="form-group">
              <label for="edited-fname">First Name</label>
              <input type="text" id="edited-fname" v-model="editedPatient.fname" required>
            </div>

            <div class="form-group">
              <label for="edited-lname">Last Name</label>
              <input type="text" id="edited-lname" v-model="editedPatient.lname" required>
            </div>

            <div class="form-group">
              <label for="edited-ddress">Address</label>
              <input type="text" id="edited-address" v-model="editedPatient.address" required>
            </div>
          </div>

          <!-- Right Column -->
          <div class="form-column">
            <div class="form-group">
              <label for="edited-mname">Middle Name</label>
              <input type="text" id="edited-mname" v-model="editedPatient.mname">
            </div>

            <div class="form-group">
              <label for="edited-extension">Extension</label>
              <input type="text" id="edited-extension" v-model="editedPatient.extension">
            </div>

            <div class="form-group">
              <label for="edited-contact">Contact Number</label>
              <input type="text" id="edited-contact" v-model="editedPatient.contact" required>
            </div>
          </div>
        </div>

        <div class="button-group">
          <button type="submit" @click="submitEdit" class="submit-button">Update</button>
          <button class="cancel-button" @click="showEditModal = false">Cancel</button>
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
            <label for="fname">First Name</label>
            <input type="text" id="fname" v-model="newPatient.fname" required>
          </div>

          <div class="form-group">
            <label for="lname">Last Name</label>
            <input type="text" id="lname" v-model="newPatient.lname" required>
          </div>

          <div class="form-group">
            <label for="sex">Gender</label>
            <select id="sex" v-model="newPatient.sex" required>
              <option value="Male">male</option>
              <option value="Female">female</option>
            </select>
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" id="address" v-model="newPatient.address" required>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="newPatient.email" required>
          </div>
        </div>

        <!-- Right Column -->
        <div class="form-column">
          <div class="form-group">
            <label for="mname">Middle Name</label>
            <input type="text" id="mname" v-model="newPatient.mname">
          </div>

          <div class="form-group">
            <label for="extension">Extension</label>
            <input type="text" id="extension" v-model="newPatient.extension">
          </div>

          <div class="form-group">
            <label for="contact">Contact Number</label>
            <input type="text" id="contact" v-model="newPatient.contact" required>
          </div>

          <div class="form-group">
            <label for="birthdate">Birthdate</label>
            <input type="date" id="birthdate" v-model="newPatient.birthdate" required>
          </div>

          <label for="password">Password</label>
          <div class="form-group">
            <input type="password" id="password" v-model="newPatient.password" required>
          </div>
        </div>
      </div>

      <div class="button-group">
        <button type="submit" @click=submitForm class="submit-button">Submit</button>
        <button class="cancel-button" @click="showAddModal = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
  export default {
    name: 'PatientsList',
    data() {
      return {
        patients: [],
        showAddModal: false,
        showEditModal: false,
        newPatient: { 
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
        },
        editedPatient: {
          user_id: '',
          fname: '',
          mname: '',
          lname: '',
          extension: '',
          address: '',
          sex: '',
          contact: ''
        }
      };
    },
    mounted() {
      this.fetchPatients();
    },
    methods: {
      submitForm() {
        axios.post('http://localhost:8081/api/user', this.newPatient)
          .then(response => {
            console.log('Patient added successfully:', response.data);
            this.showAddModal = false; // Close modal after successful submission
            this.fetchPatients(); // Fetch updated patient list
            // Reset form fields if needed
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
          })
          .catch(error => {
            console.error('Error adding patient:', error);
          });
      },
      fetchPatients() {
        axios.get('http://localhost:8081/api/user')
          .then(response => {
            this.patients = response.data.sort((a, b) => a.id - b.id);
          })
          .catch(error => {
            console.error('Error fetching patients:', error);
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
        axios.put(`http://localhost:8081/api/user/${this.editedPatient.user_id}`, this.editedPatient)
          .then(response => {
            console.log('Patient updated successfully:', response.data);
            this.showEditModal = false;
            this.fetchPatients();
          })
          .catch(error => {
            console.error('Error updating patient:', error);
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
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Adjust the maximum width as needed */
  width: 100%;
  position: relative;  /* Ensures close button is positioned relative to modal content */
}

.close {
  position: absolute;
  top: 10px;
  cursor: pointer;
}

.close:hover {
  color: #333; /* Change color on hover if desired */
}

.submit-button {
  background-color: #188754;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0f6c44;
}

.add-button {
  margin-left: auto;
  margin-right: 10px;
  background-color: #188754;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.add-button:hover {
  background-color: #0f6c44;
}

.edit-button {
  margin-left: auto;
  margin-right: 10px;
  background-color: #188754;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.edit-button:hover{
  background-color: #0f6c44;
}
.patients-list-container {
  padding: 20px;
}

.title-container {
  display: flex;
  align-items: center;
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
}

.form-columns {
  display: flex;
}

.form-column {
  flex: 1;
  padding-right: 20px;
  margin-top: 5px;
}

.form-columns {
  display: flex;
}

.form-column {
  flex: 1;
  padding-right: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
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
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.cancel-button,
.submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
}

.submit-button {
  background-color: #188754;
  color: white;
}

.submit-button:hover {
  background-color: #0f6c44;
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
  background-color: #169d53;
  color: white;
}
</style>