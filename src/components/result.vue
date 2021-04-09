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
    <!--    <button v-on:click="printDataNOW" style="height: 50px;width: 155px">show目前data</button>-->
  </div>
</template>

<script>
export default {
  props: {
    data_Now: {type: Object}
  },
  data: function () {
    return {
      applecount: this.data_Now.orders.applecount,
      picked_favor: this.data_Now.orders.picked_favor,
      name: "" //組合名子
    };
  },

  created() {
    this.name = this.formatName();
  },
  watch: {
    data_Now: function (newVal, oldVal) { // watch it
      console.log(newVal + "" + oldVal)
      this.applecount = this.data_Now.orders.applecount;
      this.picked_favor = this.data_Now.orders.picked_favor;
      this.name = this.formatName();

      // alert(JSON.stringify(this.data_Now.orders))
      // alert(this.data_Now.orders.picked_favor);

    }
  },
  methods: {
    printDataNOW: function () {
      alert(JSON.stringify(this.data_Now));
      console.log(JSON.stringify(this.data_Now));
    },
    formatName: function () {
      var name = this.data_Now.personal_info.lastname + this.data_Now.personal_info.firstname;
      if (!name || name === '') {
        return "unknown"
      } else {
        return name
      }
    }
  }
};
</script>

<style scoped>

</style>