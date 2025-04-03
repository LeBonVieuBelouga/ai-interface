
<template>
  <h1>Demostration communication</h1>
  <div id="chatBox">
    <div id="chatContainer">
      <div
        id="chatArea"
        ref="chatArea"
      />
    </div>
    <div id="inputArea">
      <input
        id="chatInput"
        v-model="chatInput"
        @keyup.enter="submitChat"
      >
      <button
        id="submitButton"
        @click="submitChat"
      >
        Submit
      </button>
    </div>
    <div id="responseArea">
      <p>Response:</p>
      <div>
        {{ botAnswer }}
      </div>
    </div>
  </div>
</template>

<script setup>
import ollama from 'ollama';
import { ref } from 'vue'

const chatInput = ref('Why is the sky blue?')
const botAnswer = ref('')

const submitChat = async () => {
  const content = chatInput.value;
  chatInput.value = '';
  const response = await ollama.chat({
    model: 'llama3.2',
    messages: [{ role: 'user', content }],
  });
  console.log(response.message.content);
  botAnswer.value = response.message.content;

}
</script>

<style scoped>
#chatBox {
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #00c853;
}

#chatContainer {
  position: relative;
  width: 100%;
  height: calc(100% - 100px);
}

#chatArea {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
}

#chatInput{
  background: floralwhite;
  color: black;
}
#submitButton
{
  border: solid 1px red;
}
</style>
