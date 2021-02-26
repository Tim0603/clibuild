<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--    <p>text={{ test }}</p>-->
    <!--    下拉選單跟顯示第幾頁-->
    form-{{ formName }}
    <br>
    跳至 -|{{ selected }}|-
    <select v-model="selected" v-on:change="changePage">
      <option v-for="data in totalPageData" v-bind:value="data.id" v-bind:key="data.id">
        {{ data.id }}
      </option>
    </select>
    ,共{{ totalPageData.length }}張
    <!--    四個按鈕-->
    <br>
    <button v-on:click="logForm">log this form</button>
    <button>log all form</button>
    <button>delete this form</button>
    <button>add form</button>
    <!--切換的頁籤-->
    <ul class="nav">
      <li>
        <a href="#" @click.prevent="changeView('personal_info')">personal_info</a>
      </li>
      <li>
        <a href="#" @click.prevent="changeView('orders')">orders</a>
      </li>
      <li>
        <a href="#" @click.prevent="changeView('result')">result</a>
      </li>
    </ul>
    <keep-alive>
      <!--      v-on ""裡面呼叫的function不能+;分號!!!-->
      <component :is="view" :data_Now="data_Now" :name="name" :test="test" :applecount="applecount" :favor="favor"
                 v-on:update="updateItem" v-on:person="updateItem_person"></component>
    </keep-alive>
    <!--    <HelloWorld msg="Welcome ....to Your Vue.js App"/>-->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import personal_info from "@/components/personal_info";
import result from "@/components/result";
import orders from "@/components/orders";

const id = "A01";
const basedata = {"id": id, personal_info: {}, orders: {}};
export default {
  name: 'App',
  components: {
    personal_info, result, orders
  },
  data() {
    return {
      ID: id,
      totalPageData: [basedata, {"id": 'A02', personal_info: {}, orders: {}}],//放所有資料
      DataFormat: {"id": '', personal_info: {}, orders: {}},//資料格式
      data_Now: basedata,//現在的所有資料,一開始先給空的
      message: 'hello',
      formName: '',
      view: '',
      test: "test!!!!!!",
      name: '', //從personal_info傳過來的 借放
      applecount: 1,//幾顆蘋果
      favor: [],//幾種口味
      selected: ''//選擇的葉千
    }
  },
  mounted: function () {
    this.$data.formName = this.$data.data_Now.id;
    this.selected = this.formName;
  },
  methods: {
    logForm: function () {
      console.log(JSON.stringify(this.$data.data_Now))
    },
    logAllForm: function () {
      console.log(JSON.stringify(this.$data.totalPageData))
    },
    deleteForm: function () {
      // todo 刪除當下表格
    },
    changeView(viewName) {
      this.view = viewName;
    },
    updateItem_person: function (data) {//接應子元件,把下面的data拿出來
      // alert(JSON.stringify(data))
      this.test = this.formatName(data.lastname + data.firstname);
      this.data_Now.personal_info = data;
    },
    updateItem: function (data) { //接應子元件,把下面的data拿出來
      this.applecount = data.apple_count;
      this.favor = data.picked_favor;
      this.data_Now.orders = data;
    },
    formatName: function (name) {
      if (!name || name === '') {
        return "unknown"
      } else {
        return name
      }
    },
    changePage: function () { //換頁籤的時候要做的事情
      this.formName = this.selected; //改頁籤顯示
      //先把當前寫的都儲存到totalpage對應的id裡面
      this.storeToTotalPage();
      //接著得把所有頁面換成選中的id的json數據組

    },
    storeToTotalPage: function () {//儲存到總數據
      for (var i = 0; i < this.totalPageData.length; i++) {
        if (id === this.totalPageData[i].id) {//對應到了
          this.totalPageData[i] = this.data_Now;//存進去
          alert(JSON.stringify(this.totalPageData));
        }
      }
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
