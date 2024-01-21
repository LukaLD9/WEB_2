User
<template>
    <div>
      <p class="counter">Chuck Norris counter: {{ chuckNorrisCounter }}</p>
      <button class="button" @click="fetchChuckNorrisImage">Get Chuck</button>
      <div v-for="(imageUrl, index) in chuckNorrisImages" :key="index" class="chuck-image">
        <img :src="imageUrl" alt="Chuck Norris" />
      </div>
    </div>
</template>
  
<script>
import chuckImage from '@/assets/chuck.png';

export default {
    data() {
        return {
        chuckNorrisImages: [],
        imageUrl: chuckImage,
        chuckNorrisCounter: 0
        };
    },
    methods: {
        fetchChuckNorrisImage() {
        this.chuckNorrisImages.push(this.imageUrl);
        this.chuckNorrisCounter += 1;
        },
    },
    mounted() {
    console.log("Chuck's home has been mounted!");
  }
};
</script>
  
<style scoped>
.chuck-image {
  margin-bottom: 20px;
  padding: 10px;
}

.counter {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.button {
  background-color: #af4c9d;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #560337;
}
</style>