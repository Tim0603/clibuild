<template>

</template>

<script>
import personal_info from "./personal_info";
import orders from "./orders";
import result from "./result";

vue.component("person", personal_info);
vue.component("orders", orders);
vue.component("result", result);


export default {
  name: "app.vue"
}
</script>

<style scoped>

</style>