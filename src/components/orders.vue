<template>
  <div>
    <h1>apple</h1>
    <div>
      <button v-on:click="countapple(-5)" class="btn btn-success">-5</button>
      <button v-on:click="countapple(-1)" class="btn btn-warning">-1</button>
      <input type="number" name="apple_count" :value="data_Now.orders.applecount" v-on:change="inputApple;updateText;">
      <button v-on:click="countapple(1)" class="btn btn-warning">+1</button>
      <button v-on:click="countapple(5)" class="btn btn-success">+5</button>
    </div>
    <br>
    <br>
    <h1>banana配料</h1>
    <div>
      <template v-for="fav in favorList" v-bind:value="fav.chi">
        <input type="checkbox" v-model="picked_favor" v-bind:value="fav.chi" v-bind:key="fav.chi" @change="updateFavor">
        <label style="font-size: 20px;" v-bind:key="fav.chi">{{ fav.chi }} </label>
      </template>
    </div>
    <br>
<!--    <span>Checked names: {{ picked_favor }}</span>-->

  </div>
</template>

<script>
export default {
  name: "",
  props: {
    data_Now: {type: Object}
  },
  data: function () {
    return {
      // apple_count: this.data_Now.orders.applecount,
      picked_favor: this.data_Now.orders.picked_favor,
      favorList: [
        {chi: "味曾", eng: "miso"},
        {chi: "辣椒", eng: "chili"},
        {chi: "胡麻醬", eng: "flax"},
        {chi: "大蒜", eng: "garlic"},
        {chi: "醬油", eng: "soy_sauce"},
        {chi: "草莓醬", eng: "strawberry"},
        {chi: "巧克力醬", eng: "chocolate"},
        {chi: "百草膏", eng: "herbal_cream"},
        {chi: "醬油膏", eng: "thick_soy_sauce"}
      ]
    }
  }
  , computed: {
    apple_count() {
      return this.data_Now.orders.applecount;
    },
    // picked_favor() {
    //   return this.data_Now.orders.picked_favor;
    // }
  }

  , watch: {
    data_Now: function (newVal, oldVal) {
      console.log(newVal + "" + oldVal)
      this.picked_favor = this.data_Now.orders.picked_favor;
      // this.apple_count = this.data_Now.orders.applecount;
    }
  }
  ,
  methods: {
    countapple: function (mount, e) {
      if (!this.data_Now.orders.applecount) {
        this.data_Now.orders.applecount = 1
      }
      this.data_Now.orders.applecount = parseInt(this.data_Now.orders.applecount, 10)
      if (this.data_Now.orders.applecount < 1) {
        this.data_Now.orders.applecount = 1;
      } else if (this.data_Now.orders.applecount > 100) {
        this.data_Now.orders.applecount = 100;
      }
      this.data_Now.orders.applecount += parseInt(mount, 10)
      if (this.data_Now.orders.applecount < 1) {
        this.data_Now.orders.applecount = 1;
      } else if (this.data_Now.orders.applecount > 100) {
        this.data_Now.orders.applecount = 100;
      }
      this.updateText(e)
    },
    inputApple: function (e) {
      if (!this.data_Now.orders.applecount) {
        this.data_Now.orders.applecount = 1
      }
      this.data_Now.orders.applecount = parseInt(this.data_Now.orders.applecount, 10)
      if (this.data_Now.orders.applecount < 1) {
        this.data_Now.orders.applecount = 1;
      } else if (this.data_Now.orders.applecount > 100) {
        this.data_Now.orders.applecount = 100;
      }
      this.updateText(e)
    },
    updateText: function (e) {
      if (e.target.name === 'picked_favor') {
        // alert(e.target.value);
        // alert('dddddddd');
      }
      this.$emit("updateOrderList", e);
    },
    updateFavor: function () {
      this.$emit("updateFavor", this.picked_favor);
    }
  }
}
</script>

<style scoped>
.btn {
  /*width: 15px;*/
  /*height: 15px;*/
}
</style>