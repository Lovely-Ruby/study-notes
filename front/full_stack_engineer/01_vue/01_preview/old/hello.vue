<template>
  <div>
    <e-index v-for="items in itemss" :key="items.id">
      {{ items }}
    </e-index>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handler() {},
  },
  components: {
    New,
  },
  computed: {
    name() {
      return this.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
