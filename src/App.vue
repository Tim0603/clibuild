<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <!--    <button v-on:click="addForm" class="btn btn-danger">add form</button>-->
      <!--    <button v-on:click="alertOrderTitle">alertOrderTitle</button>-->
      <button v-on:click="deleteForm" class="btn btn-warning ">delete this form</button>
      <button v-on:click="alertSelectedForm" class="btn btn-danger">alertSelectedForm</button>
      <button v-on:click="alertAllForms" class="btn btn-success ">alertAllForms</button>
    </div>
    <br>
    <!--所有按鈕-->
    <br>
    <div class="container" style="text-align: left;">
      <div>
        <u style="font-size: 20px;">form {{ ID }}</u>

      </div>
      <div>
        跳至
        <select v-model="ID" v-on:change="changePage(ID)">
          <option v-for="data in allForms" v-bind::value="data.id" v-bind:key="data.id">
            {{ data.id }}
          </option>
        </select>
        ,共{{ allForms.length }}張
      </div>

    </div>
    <div style="border:2px solid brown;border-radius: 5px" class="container">
      <div>
        <!--切換的頁籤-->
        <ul class="nav">
          <template v-for="title in orderTitle">
            <li class="list-group-item" v-bind:key="title" style="border: none">
              <a href="#" @click.prevent="changeCurrentPage(title)" style="font-size: 18px">{{ title }}</a>
            </li>
          </template>
        </ul>
      </div>
      <!--子頁面-->
      <component :is="currentPage" :id="ID" :index="index" :allForms="allForms" @updateOrderList="updateItem"
                 @changeData="updateItem_person" v-on:updateFavor="updateFavor"></component>
    </div>

    <!--下面的分頁Page-->
    <div class="container" style="text-align: center;">
      <nav aria-label="Page navigation example">
        <ul class="pagination .pagination-sm">
          <li class="page-item" v-on:click="changePage('PREVIOUS')"><a class="page-link" href="#">PREVIOUS</a></li>
          <template v-for="data in allForms" v-bind::value="data.id">
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
import result from "@/components/result";
import orders from "@/components/orders";
import totalData from "@/data/totalData.json";
import sampleData from "@/data/sampleData.json";
import personal_info from "@/components/personal_info";

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
      index: 0,
      currentPage: '',
      orderTitle: [],//之後排好的頁籤依順序放這
      allForms: totalData,//放所有資料
      formatForm: sampleData, //正確的資料格式
    }
  },
  created() { //初始話的時候要做的事情
    this.orderByTitle();//先排好順序
    this.currentPage = this.orderTitle[0];//放入第一個開場時顯示
    this.$data.index = this.$data.allForms.findIndex(x => x.id === this.$data.ID);
    this.$data.ID = this.$data.allForms[this.index].id;
  },
  methods: {
    getNewForm: function (id) {
      this.formatForm.id = id
      return this.formatForm;
    },
    deleteForm: function () {
      if (this.$data.allForms.length === 1) {
        alert("最少留一張R!!");
        return;
      }
      const index = this.$data.allForms.findIndex(x => x.id === this.$data.ID);
      alert(this.$data.ID + "," + index);
      this.$data.allForms.splice(index, 1);//刪掉
      this.$data.ID = this.$data.allForms[0].id
      this.changePage(this.$data.ID);
    },
    addForm: function () {
      serialnum = serialnum + 1;
      this.formatForm.id = "A" + (serialnum);
      const newData = JSON.parse(JSON.stringify(this.getNewForm(this.formatForm.id)));
      this.allForms.push(newData);
    },
    alertAllForms: function () {
      alert(JSON.stringify(this.allForms))
    },
    alertSelectedForm: function () {
      alert(JSON.stringify(this.allForms[this.index]))
    },
    alertOrderTitle: function () {
      alert(JSON.stringify(this.orderTitle))
    },
    changeCurrentPage(currentPageName) {
      this.currentPage = currentPageName;
    },
    updateItem_person: function (e) {//接應子元件,把下面的data拿出來
      const {name, value} = e.target;
      const index = this.$data.allForms.findIndex(x => x.id === this.$data.ID);
      this.$data.allForms[index].personal_info[name] = value;
    },
    updateItem: function (e) { //接應子元件,把下面的data拿出來
      const {name, value} = e.target;
      const index = this.$data.allForms.findIndex(x => x.id === this.$data.ID);
      this.$data.allForms[index].orders[name] = value;
    },
    updateFavor: function (data) { //接應子元件,把下面的data拿出來
      const index = this.$data.allForms.findIndex(x => x.id === this.$data.ID);
      this.$data.allForms[index].orders['picked_favor'] = data;
    },
    changePage: function (theID) { //換頁籤的時候要做的事情
      if (theID === "PREVIOUS" || theID === "NEXT") {
        var index = 0;
        for (var i = 0; i < this.$data.allForms.length; i++) {
          if (this.$data.ID === this.$data.allForms[i].id) {
            index = i;
          }
        }
        if (theID === "PREVIOUS") {
          if (index === 0)
            return
          this.$data.ID = this.$data.allForms[index - 1].id;
        }
        if (theID === "NEXT") {
          if (index === this.$data.allForms.length - 1)
            return
          this.$data.ID = this.$data.allForms[index + 1].id;
        }
      }
      //接著得把所有頁面換成選中的id的json數據組
      this.$data.index = this.$data.allForms.findIndex(x => x.id === this.$data.ID);
      //排列顯示的頁籤
      this.orderByTitle();
    },

    orderByTitle: function () { //排列標籤順序
      var orderResult = [];
      var orderbyNumber = [];
      for (let i = 0; i < this.$data.allForms[this.index].tableSeq.length; i++) {
        var _each = this.$data.allForms[this.index].tableSeq[i];
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
        for (let x = 0; x < this.$data.allForms[this.index].tableSeq.length; x++) {
          if (orderbyNumber[k] === this.$data.allForms[this.index].tableSeq[x].number) {
            orderResult.push(this.$data.allForms[this.index].tableSeq[x].title);
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
