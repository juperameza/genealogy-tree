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
            jsonData.children = jsonData.children
              .map((child) => extendKey(child))
              .sort((a, b) => {
                if (
                  a.binary_placement === "Left" &&
                  b.binary_placement === "Right"
                )
                  return -1
                if (
                  a.binary_placement === "Right" &&
                  b.binary_placement === "Left"
                )
                  return 1
                return 0
              })
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
      if (!node) return {}

      return {
        content: `
          <div>
            <strong>${node.username || "N/A"}</strong><br />
            Name: ${node.full_name || "Unkown"}</br>
            Status: ${node.status || "Unknown"}<br />
            Product: ${node.product_name || "N/A"}<br />
            Category: ${node.category_name || "N/A"}<br />
            Placement: ${node.binary_placement || "N/A"}
          </div>
        `,
        html: true,
      }
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
