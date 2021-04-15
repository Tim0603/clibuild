<template>
  <div class="container" style="text-align: center">
    <br>
    <br>
    <p class="Xp">以下是{{ name }}的訂單</p>
    <br>
    <br>
    <p class="Xp">總共購買{{ appleCount }}顆蘋果</p>
    <br>
    <br>
    <div>
      <p class="Xp">香蕉的配料如下:</p>
      <div>
        <template v-if="picked_favor.length===0">
          <p class="Xp"> OOps...No data found</p>
        </template>
        <ul>
          <li v-for="fav in picked_favor" v-bind:key="fav">
            <p class="Xp">{{ fav }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data_Now: {type: Object}
  },
  computed: {
    appleCount() {
      // alert(JSON.stringify(this.data_Now))
      return this.data_Now.orders.applecount;
    },
    picked_favor() {
      return this.data_Now.orders.picked_favor;
    },
    name() {
      let name = this.data_Now.personal_info.lastname + this.data_Now.personal_info.firstname;
      if (!name || name === '') {
        name = "unknown"
      }
      return name;
    }
  }
};
</script>

<style scoped>
.Xp{
  font-size: 20px;
}
</style>