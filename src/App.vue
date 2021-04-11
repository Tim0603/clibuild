<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--    <p>text={{ test }}</p>-->
    <!--    下拉選單跟顯示第幾頁-->
    <br>

    <!--    四個按鈕-->
    <br>
    <button v-on:click="logForm">log this form</button>
    <button v-on:click="logAllForm">log all form</button>
    <button v-on:click="deleteForm">delete this form</button>
    <button v-on:click="addForm">add form</button>
    <button v-on:click="alertTotalPageData">alertTotalPageData</button>
    <button v-on:click="alertData_Now">alertData_Now</button>
    <button v-on:click="alertDataFormat">alertDataFormat</button>
    <button v-on:click="alertOrderTitle">alertOrderTitle</button>

    <div class="container" style="text-align: left;">
      <div>
        form-{{ formName }}
      </div>
      <div>
        跳至
        <select v-model="selected" v-on:change="changePage(selected)">
          <option v-for="data in totalPageData" v-bind:value="data.id" v-bind:key="data.id">
            {{ data.id }}
          </option>
        </select>
        ,共{{ totalPageData.length }}張
      </div>

    </div>
    <div style="border: 1px solid greenyellow;" class="container">
      <div>
        <!--切換的頁籤-->
        <ul class="nav">
          <template v-for="title in orderTitle">
            <li class="list-group-item" v-bind:key="title">
              <a href="#" @click.prevent="changeView(title)">{{ title }}</a>
            </li>
          </template>
        </ul>
      </div>
      <!--      <li class="list-group-item">-->
      <!--        <a href="#" @click.prevent="changeView('personal_info')">personal_info</a>-->
      <!--      </li>-->
      <!--      <li class="list-group-item">-->
      <!--        <a href="#" @click.prevent="changeView('orders')">orders</a>-->
      <!--      </li>-->
      <!--      <li class="list-group-item">-->
      <!--        <a href="#" @click.prevent="changeView('result')">result</a>-->
      <!--      </li>-->
      <!--    <keep-alive>-->
      <!--      v-on ""裡面呼叫的function不能+;分號!!!,v-on:拿來接收下面的資運,連接function-->
      <component :is="view" :data_Now="data_Now" :name="name" :test="test" :applecount="applecount" :favor="favor"
                 v-on:update="updateItem" v-on:person="updateItem_person"></component>
    </div>
    <div class="container" style="text-align: center;">

    </div>
    <div class="container" style="text-align: center;">
      <nav aria-label="Page navigation example">
        <ul class="pagination .pagination-sm">
          <li class="page-item" v-on:click="changePage('PREVIOUS')"><a class="page-link" href="#">PREVIOUS</a></li>
          <template v-for="data in totalPageData" v-bind:value="data.id">
            <li v-bind:key="data.id" class="page-item" v-on:click="changePage(data.id)"><a class="page-link"
                                                                                           href="#">{{ data.id }}</a>
            </li>
          </template>
          <li class="page-item" v-on:click="changePage('NEXT')"><a class="page-link" href="#">NEXT</a></li>

        </ul>
      </nav>
    </div>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
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
        tableSeq: [{title: "personal_info", "number": 0}, {title: "orders", "number": 1}, {
          title: "result",
          "number": 2
        }]
      }, {
        "id": "A02",
        personal_info: {
          "firstname": "", "lastname": "", "address": "",
          "sex_picked": "", "noteText": "", "job": "", isHomeLess: false
        },
        orders: {"picked_favor": [], "applecount": 1},
        tableSeq: [ {title: "orders", "number": 1}, {
          title: "result",
          "number": 2
        }]
      }],
      //正確的資料格式
      DataFormat: {
        "id": "",
        personal_info: {
          "firstname": "", "lastname": "", "address": "",
          "sex_picked": "", "noteText": "", "job": "", isHomeLess: false
        },
        orders: {"picked_favor": [], "applecount": 1},
        tableSeq: [{title: "personal_info", "number": 0}, {title: "orders", "number": 1}, {
          title: "result",
          "number": 2
        }]
      },//初始化資料,也是main data
      data_Now: {
        "id": id,
        personal_info: {
          "firstname": "", "lastname": "", "address": "",
          "sex_picked": "", "noteText": "", "job": "", isHomeLess: false
        },
        orders: {"picked_favor": [], "applecount": 1},
        tableSeq: [{title: "personal_info", "number": 5}, {title: "orders", "number": 1}, {
          title: "result",
          "number": 2
        }]
      },//現在的所有資料,一開始先給空的
      test: "test!!!!!!",
      message: 'hello',
      applecount: 1,//幾顆蘋果
      selected: '',//選擇的葉千
      formName: '',
      favor: [],//幾種口味
      view: '',
      name: '', //從personal_info傳過來的 借放
      orderTitle: []//之後排好的頁籤依順序放這
    }
  },
  created() { //初始話的時候要做的事情
    this.orderByTitle();//先排好順序
    this.view = this.orderTitle[0];//放入第一個開場時顯示
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
      if (this.totalPageData.length === 1) {
        alert("最少留一張R!!");
        return;
      }
      for (var i = 0; i < this.totalPageData.length; i++) {
        if (this.ID === this.totalPageData[i].id) {//對應到了
          this.totalPageData.splice(i, 1);//刪掉
          this.data_Now = this.totalPageData[0];
          this.ID = this.data_Now.id;
          this.formName = this.ID;
          this.selected = this.ID; //改頁籤顯示
          this.changePage(this.ID);
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
    changePage: function (theID) { //換頁籤的時候要做的事情
      if (theID === "PREVIOUS" || theID === "NEXT") {
        var index = 0;
        for (var i = 0; i < this.totalPageData.length; i++) {
          if (this.ID === this.totalPageData[i].id) {
            index = i;
          }
        }
        if (theID === "PREVIOUS") {
          if (index === 0)//第一頁就不用了
            return
          this.data_Now = this.totalPageData[index - 1]
          theID = this.data_Now.id;
        }
        if (theID === "NEXT") {
          if (index === this.totalPageData.length - 1)//最後一頁也不用了
            return
          this.data_Now = this.totalPageData[index + 1]
          theID = this.data_Now.id;
        }
        //接著得把所有頁面換成選中的id的json數據組
        this.changeCurrentData_ByID();
      }

      // this.formName = this.selected; //改頁籤顯示
      this.formName = theID;
      this.selected = theID;
      //先把當前寫的都儲存到totalpage對應的id裡面
      this.storeToTotalPage();
      //接著改目前的id,用這個找出等等要拿出來的
      this.ID = this.selected;
      //接著得把所有頁面換成選中的id的json數據組
      this.changeCurrentData_ByID();
      this.orderByTitle();//排列顯示的頁籤
    },
    storeToTotalPage: function () { //把當下所塡的所有資料儲存到總數據
      for (var i = 0; i < this.totalPageData.length; i++) {
        if (this.ID === this.totalPageData[i].id) {//對應到了
          this.totalPageData[i] = this.data_Now;//存進去
          // alert(JSON.stringify(this.totalPageData));
        }
      }
    },
    changeCurrentData_ByID: function () {
      for (var i = 0; i < this.totalPageData.length; i++) {
        // alert("this.ID=" + this.ID + ",\n this.totalPageData[i].id" + this.totalPageData[i].id)
        if (this.ID === this.totalPageData[i].id) {//對應到了
          this.data_Now = this.totalPageData[i];//拿出來放進去dataNow
          // alert(JSON.stringify(this.data_Now));
          break;
        }
      }
    },
    orderByTitle: function () { //排列標籤順序
      var orderResult = [];//最後會把頁籤名子照順序排好放在這裡
      var orderbyNumber = [];
      //先取所有數字 因為不一定是0123連號 之後以大小來排
      for (let i = 0; i < this.data_Now.tableSeq.length; i++) {
        var _each = this.data_Now.tableSeq[i];
        orderbyNumber[i] = _each.number;
      }
      //先排序數字(value)的大小,因為不一定是連號的,就以最小的開始排吧
      for (let j = 0; j < orderbyNumber.length - 1; j++) {
        if (orderbyNumber[j] > orderbyNumber[j + 1]) {
          var temp = orderbyNumber[j];
          orderbyNumber[j] = orderbyNumber[j + 1];
          orderbyNumber[j + 1] = temp;
        }
      }
      //排順序放到orderResult這個陣列裡面給orderTitle
      for (let k = 0; k < orderbyNumber.length; k++) {
        for (let x = 0; x < this.data_Now.tableSeq.length; x++) {
          if (orderbyNumber[k] === this.data_Now.tableSeq[x].number) {
            orderResult.push(this.data_Now.tableSeq[x].title);
          }
        }
      }
      // alert("orderResult=" + orderResult);
      // alert("orderbyNumber=" + orderbyNumber)
      this.orderTitle = orderResult;
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
