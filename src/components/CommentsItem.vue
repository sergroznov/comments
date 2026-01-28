<script setup>
import { useDateFormat } from "../composables/useDateFormat";
import { useReactions } from "../composables/useReaction";

defineProps({
  comment: {
    type: Object,
    required: false,
  },
});
</script>

<template>
  <li class="comment">
    <h6 class="comment__author">{{ comment.author }}</h6>
    <p class="comment__text">{{ comment.text }}</p>
    <div class="comment__info">
      <p class="comment__date">{{ useDateFormat(comment.createdAt) }}</p>
      <button type="button" @click="$emit('reply', comment.id)">
        Ответить
      </button>
    </div>
    <div>{{ useReactions(comment.reaction) }}</div>
  </li>
</template>

<style scoped>
.comment {
  border-radius: 16px;
  padding: 24px 48px;
  background-color: rgb(215, 248, 215);
  -webkit-box-shadow: 4px 4px 8px 0px rgba(215, 248, 215, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(215, 248, 215, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(215, 248, 215, 0.2);
  list-style: none;
}

.comment__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
}

.comment__text {
  margin-top: 24px;
}
</style>
