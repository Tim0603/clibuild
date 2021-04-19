<template>
  <div>
    <h1>apple</h1>
    <div>
      <button v-on:click="countapple(-5)" class="btn btn-success">-5</button>
      <button v-on:click="countapple(-1)" class="btn btn-warning">-1</button>
      <input type="number" name="apple_count" :value="allForms[index].orders.applecount"
             v-on:change="inputApple;updateText;">
      <button v-on:click="countapple(1)" class="btn btn-warning">+1</button>
      <button v-on:click="countapple(5)" class="btn btn-success">+5</button>
    </div>
    <br>
    <br>
    <h1>banana配料</h1>
    <div>
      <template v-for="fav in favorList">
        <input type="checkbox" v-model="picked_favor" v-bind:value="fav.chi" v-bind:key="fav.eng" @change="updateFavor">
        <label style="font-size: 20px;" v-bind:key="fav.chi">{{ fav.chi }} </label>
      </template>
    </div>
    <br>
  </div>
</template>

<script>
import options from "@/data/options.json";
export default {
  props: {
    index: {type: Number},
    allForms: {type: Array}
  },
  data: function () {
    return {
      picked_favor: this.allForms[this.index].orders.picked_favor,
      favorList: options.banana_condiments
    }
  }
  , computed: {
    apple_count() {
      return this.allForms[this.index].orders.applecount;
    },
  }
  , watch: {
    allForms: function (newVal, oldVal) {
      console.log(newVal + "" + oldVal)
      this.picked_favor = this.allForms[this.index].orders.picked_favor;
    },
    index: function (newVal, oldVal) {
      console.log(newVal + "" + oldVal)
      this.picked_favor = this.allForms[this.index].orders.picked_favor;
    }
  },
  methods: {
    countapple: function (mount, e) {
      if (!this.allForms[this.$props.index].orders.applecount) {
        this.allForms[this.$props.index].orders.applecount = 1
      }
      this.allForms[this.$props.index].orders.applecount = parseInt(this.allForms[this.$props.index].orders.applecount, 10)
      if (this.allForms[this.$props.index].orders.applecount < 1) {
        this.allForms[this.$props.index].orders.applecount = 1;
      } else if (this.allForms[this.$props.index].orders.applecount > 100) {
        this.allForms[this.$props.index].orders.applecount = 100;
      }
      this.allForms[this.$props.index].orders.applecount += parseInt(mount, 10)
      if (this.allForms[this.$props.index].orders.applecount < 1) {
        this.allForms[this.$props.index].orders.applecount = 1;
      } else if (this.allForms[this.$props.index].orders.applecount > 100) {
        this.allForms[this.$props.index].orders.applecount = 100;
      }
      this.updateText(e)
    },
    inputApple: function (e) {
      if (!this.allForms[this.$props.index].orders.applecount) {
        this.allForms[this.$props.index].orders.applecount = 1
      }
      this.allForms[this.$props.index].orders.applecount = parseInt(this.allForms[this.$props.index].orders.applecount, 10)
      if (this.allForms[this.$props.index].orders.applecount < 1) {
        this.allForms[this.$props.index].orders.applecount = 1;
      } else if (this.allForms[this.$props.index].orders.applecount > 100) {
        this.allForms[this.$props.index].orders.applecount = 100;
      }
      this.updateText(e)
    },
    updateText: function (e) {
      this.$emit("updateOrderList", e);
    },
    updateFavor: function () {
      this.$emit("updateFavor", this.picked_favor);
    }
  }
}
</script>
<style scoped>
</style>