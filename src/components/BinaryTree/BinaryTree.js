import { VTooltip, Tooltip } from "floating-vue"
import "floating-vue/dist/style.css"

export default {
  name: "BinaryTree",
  props: ["json"],
  data() {
    return {
      treeData: {},
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
      handler(Props) {
        const extendKey = (jsonData) => {
          jsonData.extend =
            jsonData.extend === void 0 ? true : !!jsonData.extend
          if (Array.isArray(jsonData.children)) {
            jsonData.children.forEach((child) => {
              extendKey(child)
            })
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
    _getTooltipOptions(node) {
      const result = {}
      if (node && Object.keys(node).length > 0) {
        Object.keys(node).forEach((key) => {
          if (key.startsWith("tooltip_")) {
            result[key.replace(/^tooltip_/, "")] = node[key]
          }
        })
      }
      return result
    },
    _toggleExtend(treeData) {
      treeData.extend = !treeData.extend
      this.$forceUpdate()
    },
    _getChildByPlacement(children, placement) {
      return children.find((child) => child.binary_placement === placement)
    },
  },
}
