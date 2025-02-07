<script setup>
const emit = defineEmits(["update:modelValue"]);

defineProps({
  id: {
    type: String,
    default: "",
  },
  label: {
    type: [String, Object],
    default: () => ({
      text: "",
      class: "",
    }),
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  options: {
    type: Array,
    required: true, // La liste d'options est obligatoire
  },
  placeholder: {
    type: String,
    default: "Sélectionner une option...",
  },
  size: {
    type: String,
    default: "md",
  },
  error: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});

function handleSelect(event) {
  emit("update:modelValue", event.target.value);
}

function getClasses(size, success, error) {
  let sizeValue = `form-select-${size}`;
  let isValidValue = error ? "is-invalid" : success ? "is-valid" : "";

  return `${sizeValue} ${isValidValue}`;
}
</script>

<template>
  <div class="input-group">
    <label v-if="label.text" :class="label.class">{{ label.text }}</label>

    <span v-if="icon" class="input-group-text">
      <i :class="`fas fa-${icon}`" aria-hidden="true"></i>
    </span>

    <select
      :id="id"
      class="form-select"
      :class="[getClasses(size, success, error), inputClass]"
      :disabled="isDisabled"
      @change="handleSelect"
    >
      <option value="" selected disabled>{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
