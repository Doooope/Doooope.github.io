import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "Home",
  components: {
    Sidebar,
  },
  setup() {
    onMounted(() => {});

    onBeforeUnmount(() => {});

    return {};
  },
};
