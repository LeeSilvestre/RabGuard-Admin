<template>
  <header class="header-bar">
    <i class="fas fa-columns"></i>
    <div class="header-content">
      <p>{{ currentDate }}</p>
      <div class="username">
        <p>Username</p>
      </div>
    </div>
  </header>
</template>


<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      currentDate: ''
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const date = new Date();
      const options = { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
        hour: 'numeric', minute: 'numeric', second: 'numeric' 
      };
      this.currentDate = date.toLocaleDateString('en-US', options);
    }
  }
};
</script>

<style scoped>
.header-bar {
  margin-top: -8px;
  display: flex;
  align-items: center;
  background-color: white;
  color: gray;
  width: 100%;
  height: auto;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 0 16px;
  position: sticky; /* Makes the header sticky */
  top: 0; /* Sticks the header to the top */
  z-index: 2; /* Ensures the header stays on top of other content */
}

.header-bar i {
  margin-right: 10px;
  font-size: 20px;
}

.header-bar .header-content {
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 16px;
  align-items: center;
  margin-left: 170px;
}

.header-bar .username {
  margin-left: 16px;
}

.header-bar p {
  margin: 0;
  font-size: 20px;
}
</style>

