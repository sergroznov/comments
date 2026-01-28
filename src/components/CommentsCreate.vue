<script setup>
import { ref, watch, computed } from "vue";
import { useFetch } from "../composables/useFetch";
import { reactions } from "../mock";

const props = defineProps({
  parentId: {
    type: Number,
    required: false,
  },
});

const isCommentCreate = ref(false);
const text = ref();
const reaction = ref(reactions[0]);
const author = ref();
const isFormValid = computed(() => {
  return !!author.value && !!text.value && !!reaction.value;
});

const selectReaction = (selectedReaction) => {
  reaction.value = selectedReaction;
};

const submitForm = () => {
  const payload = {
    author: author.value,
    text: text.value,
    reaction: Object.keys(reactions).find(
      (k) => reactions[k] === reaction.value,
    ),
    parentId: props.parentId ?? 0,
  };
  useFetch({
    url: "comments",
    method: "POST",
    body: payload,
  }).then(() => location.reload());
};

watch(
  () => props.parentId,
  () => {
    if (props.parentId) {
      isCommentCreate.value = true;
    }
  },
);
</script>

<template>
  <button
    v-if="!isCommentCreate"
    @click="isCommentCreate = true"
    class="button-create"
  >
    Создать новый Комментарий
  </button>
  <form v-else @submit.prevent="submitForm" class="form">
    <label for="author">Имя</label>
    <input
      v-model="author"
      type="text"
      name="author"
      id="author"
      autocomplete="true"
      class="form__author"
    />
    <label for="name">Комментарий</label>
    <input
      v-model="text"
      type="text"
      name="name"
      id="name"
      autocomplete="true"
    />
    <div class="form__reactions">
      <button
        v-for="(reactionItem, index) in reactions"
        :key="index"
        @click="selectReaction(reactionItem)"
        :class="{ 'form__reactions-selected': reactionItem === reaction }"
        type="button"
      >
        {{ reactionItem }}
      </button>
    </div>
    <button
      type="submit"
      class="form__button"
      :disabled="!isFormValid"
      :class="{ 'form__button--disabled': !isFormValid }"
    >
      Отправить
    </button>
  </form>
</template>

<style scoped>
.button-create {
  margin-bottom: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: bisque;
  margin-bottom: 24px;
  padding: 24px;
  border-radius: 12px;
}

.form__reactions {
  display: flex;
  gap: 8px;
}

.form__button {
  align-self: flex-end;
}

.form__reactions-selected {
  border: 1px black solid;
}

.form__button--disabled {
  opacity: 0.7;
  pointer-events: none;
}

.form__author {
  max-width: 200px;
}
</style>
