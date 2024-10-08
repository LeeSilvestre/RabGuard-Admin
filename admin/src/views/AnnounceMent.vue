<template>
  <main>
    <div class="top-container">
      <h1 class="bg-title">Announcement</h1>
      <div class="dashboard">
        <span class="text">Announcement</span>
        <i class="fas fa-bullhorn"></i>
      </div>
    </div>
    <div class="content-container">
      <div class="add-post-container">
        <button @click="showForm = true" class="add-post-button">
          Add Post
        </button>
        <div v-if="showForm" class="modal">
          <div class="modal-content">
            <span class="close-button" @click="showForm = false">&times;</span>
            <h2>Post an Announcement</h2>
            <form @submit.prevent="postAnnouncement">
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="newAnnouncement.title" required />
              </div>
              <div class="form-group">
                <label for="content">Content:</label>
                <textarea id="content" v-model="newAnnouncement.content" required></textarea>
              </div>
              <div class="form-group">
                <label for="image">Image:</label>
                <input type="file" id="image" @change="previewImage" />
              </div>
              <div v-if="newAnnouncement.previewImage" class="image-preview">
                <img :src="newAnnouncement.previewImage" alt="Image Preview" />
              </div>
              <div class="form-buttons">
                <button type="button" @click="showForm = false" class="cancel-button">Cancel</button>
                <button type="submit" class="save-button">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="announcements-display">
        <div v-if="announcements.length === 0">No announcements yet.</div>
        <div v-for="announcement in announcements" :key="announcement.id" class="announcement">
          <h3>{{ announcement.title }}</h3>
          <p>{{ announcement.content }}</p>
          <img v-if="announcement.image" :src="announcement.image" alt="Announcement Image" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      newAnnouncement: {
        title: '',
        content: '',
        image: null,
        previewImage: null
      },
      announcements: []
    };
  },
  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newAnnouncement.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
        this.newAnnouncement.image = file;
      }
    },
    postAnnouncement() {
      if (this.newAnnouncement.title && this.newAnnouncement.content) {
        const announcement = {
          id: Date.now(),
          title: this.newAnnouncement.title,
          content: this.newAnnouncement.content,
          image: this.newAnnouncement.previewImage // Use previewed image for display
        };
        this.announcements.push(announcement);
        this.newAnnouncement = { title: '', content: '', image: null, previewImage: null };
        this.showForm = false;
      }
    }
  }
};
</script>

<style scoped>
/* General container styles */
.main {
  font-family: 'Roboto', sans-serif;
  background-color: #f9fafb;
  padding: 20px;
}

/* Top container and title styling */
.bg-title {
  z-index: -1;
  position: absolute;
  opacity: 10%;
  top: 0;
  right: 0;
  font-size: 90px;
  font-family: 'Impact', fantasy;
  margin-right: 10px;
}

.top-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.dashboard {
  display: flex;
  align-items: center;
}

.dashboard .text {
  font-size: 1.8rem;
  font-weight: 900;
  color: #333;
  margin-right: 0.5rem;
}

.dashboard i {
  color: #ff9800;
  font-size: 2.5rem;
}

hr {
  flex-basis: 100%;
  border: none;
  border-top: 1px solid #ddd;
}

/* Add Post Button Styling */
.add-post-button {
  padding: 10px 25px;
  background-color: #188754;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 2%;
}

.add-post-button:hover {
  background-color: #0056b3;
}

/* Modal styling */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Close button styling */
.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  color: #aaa;
  font-size: 24px;
  cursor: pointer;
}

.close-button:hover {
  color: #000;
}

/* Form styling */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: #f9fafb;
  transition: border 0.3s ease;
}

.form-group input[type="text"]:focus,
.form-group textarea:focus {
  border-color: #007bff;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

/* File input styling */
.form-group input[type="file"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #f9fafb;
}

/* Preview image */
.image-preview img {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Form buttons */
.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.form-buttons .cancel-button,
.form-buttons .save-button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-buttons .cancel-button {
  background-color: #6c757d;
  color: white;
}

.form-buttons .cancel-button:hover {
  background-color: #5a6268;
}

.form-buttons .save-button {
  background-color: #28a745;
  color: white;
}

.form-buttons .save-button:hover {
  background-color: #218838;
}

/* Announcement display */
.announcements-display {
  margin-top: 2rem;
}

.announcement {
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  transition: box-shadow 0.3s ease;
}

.announcement:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.announcement h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #333;
}

.announcement p {
  font-size: 1rem;
  color: #555;
}

.announcement img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
}
</style>
