<template>
  <div class="processing-container">
    <h2 class="text-dark">Payment Success !!!  </h2>
    

    <img src="https://cdn.dribbble.com/userupload/23589345/file/original-3facc6dbca53f39fa3175635da27a61a.gif" 
             alt="Success" 
             class="processing-gif">
    <p>Please wait, do not refresh the page.</p>
  </div>
</template>

<script>
export default {
  name: 'PaymentProcessing',
  
};

</script>

<style scoped>
.processing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.processing-gif {
  width: 150px;
  height: 150px;
  -webkit-animation:2s;
}
</style>
