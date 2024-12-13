<template>
  <div class="patients-list-container">
    <div class="top-container">
      <h1 class="bg-title">Profile</h1>
      <div class="patient">
        <i class="fas fa-user"></i>
        <span class="text">Profile</span>
        <hr />
      </div>
    </div>
    <div class="display-container">
      <h2 class="section-title"> <i class="fas fa-user"></i>Personal Information</h2>
      <div class="form-columns" v-for="patient in patients" :key="patient.id">
        <div class="form-column">
          <div class="form-group">
            <label><strong>First Name</strong></label>
            <div class="box">
              <div class="box-content">{{ patient.fname || '' }}</div>
            </div>
          </div>
          <div class="form-group">
            <label><strong>Last Name</strong></label>
            <div class="box">
              <div class="box-content">{{ patient.lname || '' }}</div>
            </div>
          </div>
          <div class="form-group">
            <label><strong>Sex At Birth</strong></label>
            <div class="box">
              <div class="box-content">{{ patient.sex === 'male' ? 'M' : 'F' || '' }}</div>
            </div>
          </div>
          <div class="form-group">
            <label><strong>Birthdate</strong></label>
            <div class="box">
              <div class="box-content">{{ formatDate(patient.birthdate) || '' }}</div>
            </div>
          </div>
          <div class="form-group">
            <label><strong>Address</strong></label>
            <div class="box">
              <div class="box-content">{{ patient.address || '' }}</div>
            </div>
          </div>
        </div>
        <div class="form-column">
          <div class="form-group">
            <label><strong>Middle Name</strong></label>
            <div class="box">
              <div class="box-content">{{ patient.mname || '' }}</div>
            </div>
          </div>
          <div class="form-group">
            <label><strong>Name Extension</strong></label>
            <div class="box">
              <div class="box-content">{{ patient.extension || '' }}</div>
            </div>
          </div>
          <div class="form-group">
            <label><strong>Contact Number</strong></label>
            <div class="box">
              <div class="box-content">0{{ patient.contact || '' }}</div>
            </div>
          </div>
          <div class="form-group">
            <label><strong>Email</strong></label>
            <div class="box">
              <div class="box-content">{{ patient.email || '' }}</div>
            </div>
          </div>
          <div class="form-group">
            <label><strong>Password</strong></label>
            <div class="box">
              <div class="box-content">*******</div>
            </div>
          </div>
          <br>
          <button class="edit-button" @click="editPatient(loggedInPatient)">Update</button>
        </div>
      </div>
    </div>
  </div>
  <!-- EDIT MODAL -->
  <div class="modal" v-if="showEditModal">
    <div class="modal-content">
      <h2>Update Your Profile</h2>
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
            <label for="edited-address">Address</label>
            <input type="text" id="edited-address" v-model="editedPatient.address" required>
          </div>
          <div class="form-group">
              <label for="edited-sex">Sex at Birth</label>
              <select id="edited-sex" v-model="editedPatient.sex" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
          <div class="form-group">
            <label for="password">Password</label>
            <input type="text" id="password" v-model="editedPatient.password" required>
          </div>
        </div>
      </div>
      <div class="button-group">
        <button type="submit" @click="submitEdit" class="submit-button">Update</button>
        <button class="cancel-button" @click="showEditModal = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { mapState } from "vuex";
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
          contact: '',
          password: ''
        }
      };
    },
    computed: {
      ...mapState(["user"]),
      loggedInPatient() {
        return this.patients.find(patient => patient.user_id === this.user.user_id) || {};
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
      submitForm() {
        axios.post('http://localhost:8081/api/user/', this.user.user_id)
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
        axios.get('http://localhost:8081/api/user/' + this.user.user_id)
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

.display-container {
  margin-top: 60px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative; /* Enable positioning for child elements */
}

.edit-button {
  position: absolute; /* Position relative to the container */
  bottom: 20px; /* Distance from the bottom */
  right: 30px; /* Distance from the right */
  background-color: #188754;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #0f6c44;
}

.box {
  border: 1px solid #e0e0e0; /* Light gray border for a subtle look */
  border-radius: 10px; /* Slightly larger radius for a smoother appearance */
  background-color: #ffffff;
  padding: 20px; /* Increased padding for better spacing */
  margin-bottom: 20px; /* Consistent margin with other components */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06); /* Soft shadows */
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease; /* Added smooth transformation */
}

.box:hover {
  background-color: #f8fcf8; /* Subtle green tint for hover effect */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.08); /* Enhance shadow on hover */
  transform: translateY(-2px); /* Slight lift effect on hover */
}

.box label {
  font-weight: 600; /* Slightly lighter font weight for a polished look */
  color: #333; /* Neutral color for better contrast */
}

.box-content {
  font-size: 1rem;
  font-weight: 400; /* Standard font weight for content */
  color: #555; /* Softer text color for readability */
  min-height: 1.5em;
  display: flex;
  align-items: center;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #188754;
  display:flex;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #188754;
  padding-bottom: 10px;
  gap:10px;
}

.section-title i {
  color: #188754; /* Optional: Adjust icon color to match design */
  font-size: 1.5rem; /* Adjust icon size */
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
  max-width: 400px;
  width: 100%;
  position: relative;
}

.submit-button {
  background-color: #188754;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
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

.edit-button:hover {
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
  margin-right: 20px;
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
  flex-wrap: wrap; /* Allows columns to stack on smaller screens */
}

.form-column {
  flex: 1;
  padding-right: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
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
  background-color: #1e3a8a;
  color: white;
}

/* Media query for smaller screens */
@media (max-width: 768px) {
  .form-columns {
    flex-direction: column; /* Stack columns vertically */
  }

  .form-column {
    padding-right: 0; /* Remove extra padding */
    width: 100%; /* Make columns take full width */
  }

  .modal-content {
    max-width: 100%; /* Ensure modal content takes full width on small screens */
    width: 90%; /* Adjust width */
  }

  .edit-button,
  .add-button {
    width: 100%; /* Make buttons full width on small screens */
    margin-left: 0;
  }

  .button-group {
    flex-direction: column; /* Stack buttons vertically in the modal */
    gap: 10px;
  }

  /* Responsive Design for Mobile View */
@media (max-width: 768px) {
  .top-container {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
  }

  .patient .text {
    margin-left: 0;
    font-size: 1.2rem;
    letter-spacing: 4px;
  }

  .patient i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .display-container {
    margin-top: 20px;
    padding: 10px;
  }

  .form-columns {
    flex-direction: column;
    display: flex;
  }

  .form-column {
    width: 100%;
    margin-bottom: 15px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    font-size: 0.9rem;
  }

  .box {
    padding: 15px;
    margin-bottom: 15px;
  }

  .edit-button {
    position: static;
    margin-top: 10px;
    width: 100%;
  }

  .modal-content {
    width: 90%;
    margin: 0 auto;
    padding: 15px;
  }

  .form-columns {
    display: flex;
    flex-direction: column;
  }

  .form-column {
    width: 100%;
    margin-bottom: 10px;
  }

  .form-group input,
  .form-group select {
    width: 100%;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .button-group button {
    width: 100%;
  }
}

}

</style>