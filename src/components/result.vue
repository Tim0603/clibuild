<template>
  <div>
    以下是{{ test}}的訂單
    {{applecount.toString()}}顆貧果,
    <br>
    香蕉配料
    <ul class="nav">
      <li v-for="fav in favor" v-bind:key="fav">
          {{fav}}
      </li>
    </ul>

    <button v-on:click="printDataNOW" style="height: 50px;width: 155px">show目前data</button>
  </div>
</template>

<script>
export default {
  props: {
    test: {type: String,require:true},
    applecount:{type:Number},
    favor:{type:Array},
    data_Now:{type:String}
  },
  data: function () {
    return {

    };
  },
  methods: {
    printDataNOW: function () {
      alert(JSON.stringify(this.data_Now));
      console.log(JSON.stringify(this.data_Now));
    }
  }
};
</script>

<style scoped>

</style>