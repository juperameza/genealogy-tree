import { VTooltip, Tooltip } from "floating-vue"

import "floating-vue/dist/style.css"

export default {
  name: "BinaryTree",
  props: ["json"],
  data() {
    return {
      treeData: {},
      maxNodes: 8,
    }
  },
  directives: {
    tooltip: VTooltip,
  },
  components: {
    VTooltip: Tooltip,
  },
  watch: {
    json: {
      handler: function (Props) {
        const extendKey = (jsonData) => {
          if (!jsonData) return null

          jsonData.extend =
            jsonData.extend === undefined ? true : !!jsonData.extend

          jsonData.name = jsonData.full_name
          jsonData.image_url = jsonData.image_url || "/default-avatar.png"

          if (Array.isArray(jsonData.children)) {
            jsonData.children = jsonData.children.map((child) =>
              extendKey(child)
            )
          }

          return jsonData
        }

        if (Props) {
          this.treeData = extendKey(Props)
        }
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * Prepares tooltip options from node data.
     */
    _getTooltipOptions(node) {
      const result = {}
      if (node) {
        result.username = node.username
        result.status = node.status
        result.product_name = node.product_name
        result.category_name = node.category_name
        result.binary_placement = node.binary_placement
      }
      return result
    },

    /**
     * Toggles the visibility of children for a node.
     */
    _toggleExtend(treeData) {
      treeData.extend = !treeData.extend
      this.$forceUpdate()
    },
  },
}
