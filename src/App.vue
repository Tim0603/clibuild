<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <br>
    <br>
    <!--所有按鈕-->
<!--    <button v-on:click="logForm">log this form</button>-->
<!--    <button v-on:click="logAllForm">log all form</button>-->
<!--    <button v-on:click="deleteForm">delete this form</button>-->
<!--    <button v-on:click="addForm">add form</button>-->
<!--    <button v-on:click="alertTotalPageData">alertTotalPageData</button>-->
<!--    <button v-on:click="alertData_Now">alertData_Now</button>-->
<!--    <button v-on:click="alertDataFormat">alertDataFormat</button>-->
<!--    <button v-on:click="alertOrderTitle">alertOrderTitle</button>-->

    <div class="container" style="text-align: left;">
      <div>
        <u style="font-size: 20px;">form {{ formName }}</u>

      </div>
      <div>
        跳至
        <select v-model="selected" v-on:change="changePage(selected)">
          <option v-for="data in totalPageData" v-bind::value="data.id" v-bind:key="data.id">
            {{ data.id }}
          </option>
        </select>
        ,共{{ totalPageData.length }}張
      </div>

    </div>
    <div style="border:2px solid brown;border-radius: 5px" class="container">
      <div>
        <!--切換的頁籤-->
        <ul class="nav">
          <template v-for="title in orderTitle">
            <li class="list-group-item" v-bind:key="title" style="border: none">
              <a href="#" @click.prevent="changeView(title)" style="font-size: 18px">{{ title }}</a>
            </li>
          </template>
        </ul>
      </div>
      <!--子頁面-->
      <component :is="view" :data_Now="data_Now" @updateOrderList="updateItem" @changeData="updateItem_person" v-on:updateFavor="updateFavordd"></component>
    </div>

    <!--下面的分頁Page-->
    <div class="container" style="text-align: center;">
      <nav aria-label="Page navigation example">
        <ul class="pagination .pagination-sm">
          <li class="page-item" v-on:click="changePage('PREVIOUS')"><a class="page-link" href="#">PREVIOUS</a></li>
          <template v-for="data in totalPageData" v-bind::value="data.id">
            <li v-bind:key="data.id" class="page-item" v-on:click="changePage(data.id)">
              <a class="page-link" href="#">{{ data.id }}</a>
            </li>
          </template>
          <li class="page-item" v-on:click="changePage('NEXT')"><a class="page-link" href="#">NEXT</a></li>
        </ul>
      </nav>
    </div>

  </div>
</template>

<script>
import personal_info from "@/components/personal_info";
import result from "@/components/result";
import orders from "@/components/orders";

const id = "A01";//初始給的id
var serialnum = 2;//從3起跳,因為初始有兩個(a01跟a02)
export default {
  name: 'App',
  components: {
    personal_info, result, orders
  },
  data() {
    return {
      ID: id,
      //放所有資料
      totalPageData: [{
        "id": "A01",
        personal_info: {
          "firstname": "", "lastname": "", "address": "",
          "sex_picked": "", "noteText": "", "job": "", isHomeLess: false
        },
        orders: {"picked_favor": [], "applecount": 1},
        tableSeq: [
          {title: "personal_info", "number": 0},
          {title: "orders", "number": 1},
          {title: "result", "number": 2}
        ]
      }, {
        "id": "A02",
        personal_info: {
          "firstname": "", "lastname": "", "address": "",
          "sex_picked": "", "noteText": "", "job": "", isHomeLess: false
        },
        orders: {"picked_favor": [], "applecount": 1},
        tableSeq: [
          {title: "personal_info", "number": 0},
          {title: "orders", "number": 1},
          {title: "result", "number": 2}
        ]
      }],
      //正確的資料格式
      DataFormat: {
        "id": "",
        personal_info: {
          "firstname": "", "lastname": "", "address": "",
          "sex_picked": "", "noteText": "", "job": "", isHomeLess: false
        },
        orders: {"picked_favor": [], "applecount": 1},
        tableSeq: [
          {title: "personal_info", "number": 0},
          {title: "orders", "number": 1},
          {title: "result", "number": 2}
        ]
      },//初始化資料,也是main data
      data_Now: {
        "id": id,
        personal_info: {
          "firstname": "", "lastname": "", "address": "",
          "sex_picked": "", "noteText": "", "job": "", isHomeLess: false
        },
        orders: {"picked_favor": [], "applecount": 1},
        tableSeq: [
          {title: "personal_info", "number": 0},
          {title: "orders", "number": 1},
          {title: "result", "number": 2}
        ]
      },
      job:'',
      view: '',
      selected: '',//選擇的葉千
      formName: '',
      orderTitle: [],//之後排好的頁籤依順序放這
    }
  },
  created() { //初始話的時候要做的事情
    this.orderByTitle();//先排好順序
    this.view = this.orderTitle[0];//放入第一個開場時顯示
  },
  mounted: function () {
    this.$data.formName = this.$data.data_Now.id;
    this.$data.selected = this.$data.formName;
  },
  methods: {
    logForm: function () {
      console.log(JSON.stringify(this.$data.data_Now))
    },
    logAllForm: function () {
      console.log(JSON.stringify(this.$data.totalPageData))
    },
    deleteForm: function () {
      if (this.$data.totalPageData.length === 1) {
        alert("最少留一張R!!");
        return;
      }
      for (var i = 0; i < this.$data.totalPageData.length; i++) {
        if (this.$data.ID === this.$data.totalPageData[i].id) {//對應到了
          this.$data.totalPageData.splice(i, 1);//刪掉
          this.$data.data_Now = this.$data.totalPageData[0];
          this.$data.ID = this.$data.data_Now.id;
          this.$data.formName = this.$data.ID;
          this.$data.selected = this.$data.ID; //改頁籤顯示
          this.changePage(this.$data.ID);
          break;
        }
      }
    },
    addForm: function () {
      serialnum = serialnum + 1;
      this.DataFormat.id = "A" + (serialnum);
      const newData = JSON.parse(JSON.stringify(this.DataFormat))
      this.totalPageData.push(newData);
    },
    alertTotalPageData: function () {
      alert(JSON.stringify(this.totalPageData))
    },
    alertData_Now: function () {
      alert(JSON.stringify(this.data_Now))
    },
    alertDataFormat: function () {
      alert(JSON.stringify(this.DataFormat))
    },
    alertOrderTitle: function () {
      alert(JSON.stringify(this.orderTitle))
    },
    changeView(viewName) {
      this.view = viewName;
    },
    updateItem_person: function (e) {//接應子元件,把下面的data拿出來
      const { name, value } = e.target;
      this.$data.data_Now.personal_info[name] = value;
    },
    updateItem: function (e) { //接應子元件,把下面的data拿出來
      const { name, value } = e.target;
      this.$data.data_Now.orders[name] = value;
    },
    updateFavordd: function (data) { //接應子元件,把下面的data拿出來
      this.$data.data_Now.orders['picked_favor'] = data;
    },
    formatName: function (name) {
      if (!name || name === '') {
        return "unknown"
      } else {
        return name
      }
    },
    changePage: function (theID) { //換頁籤的時候要做的事情
      if (theID === "PREVIOUS" || theID === "NEXT") {
        var index = 0;
        for (var i = 0; i < this.$data.totalPageData.length; i++) {
          if (this.$data.ID === this.$data.totalPageData[i].id) {
            index = i;
          }
        }
        if (theID === "PREVIOUS") {
          if (index === 0)
            return
          this.$data.data_Now = this.$data.totalPageData[index - 1]
          theID = this.$data.data_Now.id;
        }
        if (theID === "NEXT") {
          if (index === this.$data.totalPageData.length - 1)
            return
          this.data_Now = this.$data.totalPageData[index + 1]
          theID = this.$data.data_Now.id;
        }
        //接著得把所有頁面換成選中的id的json數據組
        this.changeCurrentData_ByID();
      }
      this.$data.formName = theID;
      this.$data.selected = theID;
      //先把當前寫的都儲存到totalpage對應的id裡面
      this.storeToTotalPage();
      //接著改目前的id,用這個找出等等要拿出來的
      this.$data.ID = this.$data.selected;
      //接著得把所有頁面換成選中的id的json數據組
      this.changeCurrentData_ByID();
      //排列顯示的頁籤
      this.orderByTitle();
    },
    storeToTotalPage: function () { //把當下所塡的所有資料儲存到總數據
      for (var i = 0; i < this.totalPageData.length; i++) {
        if (this.$data.ID === this.$data.totalPageData[i].id) {
          this.$data.totalPageData[i] = this.$data.data_Now;
        }
      }
    },
    changeCurrentData_ByID: function () {
      for (let i = 0; i < this.$data.totalPageData.length; i++) {
        if (this.ID === this.$data.totalPageData[i].id) {
          this.$data.data_Now = this.$data.totalPageData[i];
          break;
        }
      }
    },
    orderByTitle: function () { //排列標籤順序
      var orderResult = [];
      var orderbyNumber = [];
      for (let i = 0; i < this.$data.data_Now.tableSeq.length; i++) {
        var _each = this.$data.data_Now.tableSeq[i];
        orderbyNumber[i] = _each.number;
      }
      for (let j = 0; j < orderbyNumber.length - 1; j++) {
        if (orderbyNumber[j] > orderbyNumber[j + 1]) {
          var temp = orderbyNumber[j];
          orderbyNumber[j] = orderbyNumber[j + 1];
          orderbyNumber[j + 1] = temp;
        }
      }
      for (let k = 0; k < orderbyNumber.length; k++) {
        for (let x = 0; x < this.$data.data_Now.tableSeq.length; x++) {
          if (orderbyNumber[k] === this.$data.data_Now.tableSeq[x].number) {
            orderResult.push(this.$data.data_Now.tableSeq[x].title);
          }
        }
      }
      this.$data.orderTitle = orderResult;
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
