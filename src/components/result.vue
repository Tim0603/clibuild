<template>
  <div class="container" style="text-align: center">
    以下是{{ name }}的訂單
    <br>
    <br>
    總共購買{{ applecount.toString() }}顆貧果,
    <br>
    <br>
    <div>
      香蕉的配料如下:
      <div>
        <template v-if="picked_favor.length===0">
          OOps...No data found
        </template>
        <ul>
          <li v-for="fav in picked_favor" v-bind:key="fav">
            {{ fav }}
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
  data: function () {
    return {
      name: "",
      applecount: this.data_Now.orders.applecount,
      picked_favor: this.data_Now.orders.picked_favor
    };
  },
  created() {
    // this.name = this.formatName();
  },

  mounted() {
    this.name = this.data_Now.personal_info.lastname + this.data_Now.personal_info.firstname;
    if (!this.name || this.name === '') {
      this.name= "unknown"
    }
  },
  methods: {
    // formatName: function () {
    //   var name = this.$data.data_Now.personal_info.lastname + this.$data.data_Now.personal_info.firstname;
    //   if (!name || name === '') {
    //     return "unknown"
    //   } else {
    //     return name
    //   }
    // }
  }
};
</script>

<style scoped>

</style>