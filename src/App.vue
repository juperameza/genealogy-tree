<template>
  <div id="app" class="main d-flex flex-column justify-content-around align-items-center">
    <div class="main-content d-flex align-items-center flex-column">
      <div v-if="data.parent_id" class="go-to-parent">
        <button @click="goToParent">Go to Parent</button>
      </div>
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
      data: daxcsa.data.attributes[0],
      originalData: daxcsa.data.attributes[0]
    };
  },
  methods: {
    clickNode(node) {
      console.log("Clicked node:", node);
    },
    updateRoot(newRoot) {
      console.log("New root set:", newRoot);
      this.data = newRoot;
    },
    goToParent() {
      const parentNode = this.findNodeByDistributorId(this.originalData, this.data.parent_id);
      if (parentNode) {
        this.data = parentNode; // Set the found parent as the new root
      } else {
        console.error("Parent node not found");
      }
    },

    findNodeByDistributorId(json, distributorId) {
      if (!json) return null;

      // Check if the current node matches
      if (json.distributor_id === distributorId) {
        return json;
      }

      // Recursively search through children
      if (Array.isArray(json.children)) {
        for (const child of json.children) {
          const result = this.findNodeByDistributorId(child, distributorId);
          if (result) {
            return result; // Return the found node
          }
        }
      }

      return null; // Return null if not found
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
