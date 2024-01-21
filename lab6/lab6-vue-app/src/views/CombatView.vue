<template>
  <div>
    <h2>Write the name of who Chuck will fight against.</h2>

    <label for="opponentName">Opponent's Name:</label>
    <input
      id="opponentName"
      v-model="opponentName"
      @keyup.enter="declareWinner"
      placeholder="Enter opponent's name and press Enter"
    />

    <div v-if="resultMessage" class="result-container">
      <p class="output">{{ opponentName }} fought against Chuck Norris.</p>
      <p class="output winner-message">{{ resultMessage }}</p>
      <img :src="resultImage" alt="Result Image" class="result-image" />
      <p class="output" v-if="isTie">It's a tie!</p>
    </div>
  </div>
</template>

<script>
import winImage from '@/assets/chuck3.png';
import tieImage from '@/assets/chuck2.png';

export default {
  data() {
    return {
      opponentName: '',
      resultMessage: '',
      resultImage: '',
    };
  },
  computed: {
    isTie() {
      return this.resultMessage.includes('tie');
    },
  },
  methods: {
    declareWinner() {
      if (this.opponentName.toLowerCase() === 'chuck norris') {
        this.resultMessage = 'It\'s a tie! Chuck Norris cannot be defeated!';
        this.resultImage = tieImage;
      } else {
        this.resultMessage = 'Result: Chuck Norris won!';
        this.resultImage = winImage;
      }
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

#opponentName {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 10px;
}

.result-container {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
}

.output {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.winner-message {
  color: #4caf50;
  font-weight: bold;
}
</style>
