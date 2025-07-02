<template>
  <div class="home-container">
    <h1 class="home-title">Welcome to Richies Home Decore Store!</h1>
    <p class="home-subtitle">Explore amazing Home Decore.</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  /* Add this 👇 */
  min-height: 100vh;
  position: relative;
}

.home-container {
  max-width: 700px;
  width: 90%;
  padding: 50px 40px;
  background: #000;
  color: #fff; 
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  
  /* Centering styles */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.home-container:hover {
  transform: translate(-50%, calc(-50% - 5px));
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.home-title {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: 'Arial Black', sans-serif;
  background: linear-gradient(90deg, #ffffff, #aaaaaa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.home-subtitle {
  font-size: 1.3rem;
  color: #dddddd;
  font-family: 'Arial', sans-serif;
}


@media (max-width: 768px) {
  .home-container {
    padding: 30px 20px;
  }
  
  .home-title {
    font-size: 2rem;
  }
  
  .home-subtitle {
    font-size: 1rem;
  }
}
</style>
