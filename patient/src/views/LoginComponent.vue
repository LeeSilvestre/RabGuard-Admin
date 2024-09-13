<template>
  <div class="box-form">
    <div class="left">
      <div class="overlay">
        <img class="logo-left" src="../assets/rabguardlogo.png" alt="hi">
        <h2 class="left-title">"Your Shield Against Rabies"</h2>
       </div>
    </div>
    <div class="modal" v-if="showAddModal">
        <div class="modal-content">
          <h2>Register</h2>
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
                <select id="source" v-model="newPatient.address" required>
                  <option value="Asinan">Asinan</option>
                  <option value="Banicain">Banicain</option>
                  <option value="Barretto">Barretto</option>
                  <option value="New Cabalan">New Cabalan</option>
                  <option value="Old Cabalan">Old Cabalan</option>
                  <option value="East Bajac-Bajac">East Bajac-Bajac</option>
                  <option value="East Tapinac">East Tapinac</option>
                  <option value="Gordon Heights">Gordon Heights</option>
                  <option value="New Ilalim">New Ilalim</option>
                  <option value="New Kababae">New Kababae</option>
                  <option value="Kalaklan">Kalaklan</option>
                  <option value="New Kalalake">New Kalalake</option>
                  <option value="Mabayuan">Mabayuan</option>
                  <option value="Pag-Asa">Pag-Asa</option>
                  <option value="Sta. Rita">Sta. Rita</option>
                  <option value="West Bajac-Bajac">West Bajac-Bajac</option>
                  <option value="West Tapinac">West Tapinac</option>
                  <option value="Others">Others</option>
                </select>
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
            <button type="submit" @click=submitForm class="submit-button">Register</button>
            <button class="cancel-button" @click="showAddModal = false">Cancel</button>
          </div>
        </div>
      </div>


    <div class="right">
      <img class="logo-right" src="../assets/Logo-Health.png" alt="hi">
      <h1>Olongapo City</h1>
      <h2>Animal Bite Treatment Center</h2>
      <div class="inputs">
        <span><i class="fa-solid fa-envelope"></i></span><input v-model="username" type="text" placeholder="Email">
        <br>
        <span><i class="fa-solid fa-lock"></i></span><input v-model="password" type="password" placeholder="Password">
      </div>
      

      <br><br>

      <div class="remember-me--forget-password">
        <a href></a>
        <button @click="login" class="login-button">Login</button>
        <button @click="showAddModal = true" class="login2-button">Register</button>
      </div>
    
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from "vuex";
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      showAddModal: false,
      username: '',
      password: '',
      user_fname: '',
      matchUser: undefined,
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
    };
  },
  methods: {
    ...mapMutations(["setUser"]),

    async login() {
      try {
        const response = await axios.get('http://localhost:8081/api/user');
        const users = response.data;
        
        const user = users.find(
          user => user.email === this.username && user.password === this.password
        );

        if (user) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: (`Welcome ${user.fname}!`),
            timer: 1500,
            showConfirmButton: false,
            customClass: {
              popup: 'smaller-toast'
            }
          })
          this.setUser(user);
          this.$router.push('/profile');
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Email or Password!"
          });
        }
      } catch (error) {
        console.error('An error occurred while logging in:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
      }
    },
    submitForm() {
        axios.post('http://localhost:8081/api/user', this.newPatient)
          .then(response => {
            console.log('Patient added successfully:', response.data);
            this.showAddModal = false; // Close modal after successful submission
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
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Playfair+Display:ital@1&display=swap');
.smaller-toast .swal2-popup {
  width: 250px !important;
  height: 100px !important;
}
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 2;
  width: 100%;
  height: 500%;
}
.form-columns {
  display: flex;
}

.form-column {
  flex: 1;
  padding-right: 20px;
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

.modal-content {
  background-color: #fff;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Adjust the maximum width as needed */
  width: 100%;
  position: relative;  /* Ensures close button is positioned relative to modal content */
}
.logo-left{
  margin-top: 60px;
  height: 15rem;
  width: 15rem;
  transition: 0.2s ease-out;
  border-radius: 5rem;
}

.logo-right{
  height: 9rem;
  width: 9rem;
  transition: 0.2s ease-out;
  align-self: center;
  border-radius: 5rem;
}

body {
  background-image: white;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-family: "Open Sans", sans-serif;
  color: #333333;
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
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
}

.submit-button {
  background-color: #0f6c44;
  color: white;
}

.submit-button:hover {
  background-color: #188754;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Product Sans', sans-serif;
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

th, td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}


.box-form {
  margin-top: 4.8%;
  margin-left: 20%;
  width: 60%;
  background: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex: 1 1 100%;
  align-items: stretch;
  justify-content: space-between;
  box-shadow: 0 0 20px 6px #090b6f85;
}
@media (max-width: 980px) {
  .box-form {
    flex-flow: wrap;
    text-align: center;
    align-content: center;
    align-items: center;
  }
}
.left-title {
  font-family: 'Product Sans', sans-serif;
  font-size: 24px;
  font-style: italic;
  margin-top: 20px;
  color: #f0f0f0;
}
.box-form div {
  height: auto;
}
.box-form .left {
  color: #FFFFFF;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}
.box-form .left .overlay {
  padding: 30px;
  width: 100%;
  height: 100%;
  background-color:#339933;
  overflow: hidden;
  box-sizing: border-box;
}
.box-form .left .overlay h1 {
  font-size: 10vmax;
  line-height: 1;
  font-weight: 900;
  margin-top: 40px;
  margin-bottom: 20px;
}
.box-form .left .overlay span p {
  margin-top: 30px;
  font-weight: 900;
}
.box-form .left .overlay span a {
  background: #3b5998;
  color: #FFFFFF;
  margin-top: 10px;
  padding: 14px 50px;
  border-radius: 100px;
  display: inline-block;
  box-shadow: 0 3px 6px 1px #042d4657;
}
.box-form .left .overlay span a:last-child {
  background: #1dcaff;
  margin-left: 30px;
}
.box-form .right {
  width:60%;
  padding: 40px;

  overflow: hidden;
}
@media (max-width: 980px) {
  .box-form .right {
    width: 100%;
  }
}
.box-form .right h5 {
  font-size: 6vmax;
  line-height: 0;
}
.box-form .right p {
  font-size: 14px;
  color: #B0B3B9;
}
.box-form .right .inputs {
  overflow: hidden;
}
.box-form .right input {
  width: 80%;
  padding: 10px;
  margin-top: 25px;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom: 2px solid #B0B3B9;
}
.box-form .right .remember-me--forget-password {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-form .right .remember-me--forget-password input {
  margin: 0;
  margin-right: 7px;
  width: auto;
}

.login-button {
  color: #fff;
  font-size: 20px;
  padding: 12px 35px;
  border-radius: 20px;
  display: inline-block;
  border: 0;
  outline: 0;
  background-color: #0f6c44;
  transition: background-image 0.3s;
  text-decoration: none;
  opacity: 90%;
  margin-right: 40px;
  width: 50%;

}

.login-button:hover {
opacity: 100%;
}
.login2-button {
  color: #fff;
  font-size: 20px;
  padding: 12px 35px;
  border-radius: 20px;
  display: inline-block;
  border: 0;
  outline: 0;
  background-color: #339933;
  transition: background-image 0.3s;
  text-decoration: none;
  opacity: 90%;
  margin-right: 40px;
  width: 30%;

}

.login2-button:hover {
opacity: 100%;
}

label {
  display: block;
  position: relative;
  margin-left: 30px;
}

label::before {
  content: ' \f00c';
  position: absolute;
  font-family: FontAwesome;
  background: transparent;
  border-radius: 4px;
  color: transparent;
  left: -30px;
  transition: all 0.2s linear;
}

label:hover::before {
  font-family: FontAwesome;
  content: ' \f00c';
  color: #fff;
  cursor: pointer;
  background: #70F570;
}

label:hover::before .text-checkbox {
  background: #70F570;
}

label span.text-checkbox {
  display: inline-block;
  height: auto;
  position: relative;
  cursor: pointer;
  transition: all 0.2s linear;
}

label input[type="checkbox"] {
  display: none;
}
</style>