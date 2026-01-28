<script setup>
import { ref } from "vue";
import CommentsList from "./components/CommentsList.vue";
import CommentsCreate from "./components/CommentsCreate.vue";

const parentId = ref();
</script>

<template>
  <div class="app">
    <CommentsCreate :parent-id />
    <CommentsList @reply="parentId = $event" />
  </div>
</template>

<style scoped>
.app {
  margin: 32px auto;
  max-width: 756px;
  padding: 0 24px;
}
</style>
