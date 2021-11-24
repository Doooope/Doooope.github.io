<template>
  <div id="Sidebar">
    <!-- <div v-for="(item, index) in menuList" :key="index">{{ item.name }}</div> -->
  </div>
</template>
<script>
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { getCatalogList } from "@/api/catalog";

export default {
  name: "Sidebar",
  setup() {
    let menuList = ref([]);

    onMounted(() => {
      console.log(menuList);
      menuList = getCatalogList();
      console.log(menuList);
    });

    onBeforeUnmount(() => {});

    return { menuList };
  },
};
</script>
<style lang="less" scoped>
#sidebar {
}
</style>
