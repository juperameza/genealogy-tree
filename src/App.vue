<template>
  <div id="app" class="main d-flex flex-column justify-content-around align-items-center">
    <label>
      Vertical
      <input type="checkbox" v-model="landscape" value="1" />
    </label>

    <div class="main-content d-flex align-items-center">
      <BinaryTree :json="data" :class="{ landscape: landscape.length }" @click-node="clickNode"
        @update-root="updateRoot" />
    </div>


  </div>
</template>

<script>
import BinaryTree from "./components/BinaryTree/BinaryTree.vue";
import daxcsa from "@/data/Daxcsa.json";

export default {
  name: "app",
  components: {
    BinaryTree,
  },
  data() {
    return {
      landscape: [],
      data: daxcsa.data.attributes[0], // Initial tree data
    };
  },
  methods: {
    clickNode(node) {
      console.log("Clicked node:", node);
    },
    updateRoot(newRoot) {
      console.log("New root set:", newRoot);
      this.data = newRoot; // Update the tree root
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  background: #fafafa;
  min-height: 1000px;
}

.main {
  &-content {
    flex: 1;
  }

  &-footer {
    flex: 0.5;
  }
}
</style>
