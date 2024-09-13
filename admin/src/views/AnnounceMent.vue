<template>
  <main>
    <div class="top-container">
      <h1 class="bg-title">Announcement</h1>
      <div class="dashboard">
        <span class="text">Announcement</span>
        <i class="fas fa-bullhorn"></i>
        <hr />
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
              <label for="image">Image URL:</label>
              <input type="text" id="image" v-model="newAnnouncement.image" />
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
        image: ''
      },
      announcements: []
    };
  },
  methods: {
    postAnnouncement() {
      if (this.newAnnouncement.title && this.newAnnouncement.content) {
        const announcement = {
          id: Date.now(),
          title: this.newAnnouncement.title,
          content: this.newAnnouncement.content,
          image: this.newAnnouncement.image
        };
        this.announcements.push(announcement);
        this.newAnnouncement = { title: '', content: '', image: '' };
        this.showForm = false;
      }
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
.dashboard {
  display: flex;
  align-items: center;
  flex: 1;
}
.dashboard .text {
  margin-right: 0.5rem;
  color: var(--dark);
  font-size: 1.5rem;
  font-weight: 900;
  margin-left: 10px;
}
.dashboard i {
  color: var(--dark);
  font-size: 2.5rem;
}
hr {
  flex-basis: 100%;
  border: none;
  border-top: 1px solid #ddd;
  margin: 2.5rem 0 0 0;
}
.content-container {
  margin: 1rem;
  display: flex;
  flex-direction: column;
}
.add-post-container {
  display: flex;
  justify-content: flex-end;
}
.add-post-button {
  padding: 10px 20px;
  background-color: #188754;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.add-post-button:hover {
  background-color: #157347;
}
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
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  position: relative;
  border-radius: 10px;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 20px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}
.close-button:hover,
.close-button:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.form-container {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.form-group {
  margin-bottom: 10px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.form-buttons .cancel-button,
.form-buttons .save-button {
  padding: 10px 20px;
  background-color: #188754;
  color: white;
  border: none;
  cursor: pointer;
}
.form-buttons .cancel-button:hover,
.form-buttons .save-button:hover {
  background-color: #157347;
}
.announcements-display {
  margin-top: 20px;
}
.announcement {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.announcement img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>
