import { VTooltip, Tooltip } from "floating-vue"

import "floating-vue/dist/style.css"
export default {
  name: "BinaryTree",
  props: ["json"],
  data() {
    return {
      maxNodes: 2,
      nodes: 0,
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
        this.nodes = 0
        const extendKey = (jsonData) => {
          if (!jsonData) return null

          if (jsonData.extend === undefined) {
            jsonData.extend = true
            if (this.maxNodes <= this.nodes) {
              jsonData.extend = false
            }
          } else {
            jsonData.extend = !!jsonData.extend
          }
          jsonData.name = jsonData.full_name
          jsonData.image_url =
            jsonData.image_url ||
            "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"

          if (Array.isArray(jsonData.children)) {
            jsonData.children = jsonData.children.map((child) =>
              extendKey(child)
            )
          }
          this.nodes++
          return jsonData
        }

        if (Props) {
          extendKey(Props)
        }
      },
      immediate: true,
    },
  },
  methods: {
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

    _toggleExtend(treeData) {
      treeData.extend = !treeData.extend
      this.$forceUpdate()
    },

    setNewRoot(node) {
      this.$emit("update-root", node)
    },
  },
}
