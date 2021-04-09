<template>
  <div>
    <!--    名子的部分-->
    <div>
      <div>
        <p>firstName:</p>
        <input v-model="firstname" @change="updateItem_person">
        {{ firstname }}

      </div>
      <div>
        <p>lastName:</p>
        <input v-model="lastname" v-on:change="updateItem_person">
        {{ lastname }}
      </div>
    </div>
    <!--    性別-->
    <div>
      <p>Gender</p>
      <input type="radio" id="male" value="0" v-model="sex_picked" v-on:change="updateItem_person">
      <label for="one">male</label>
    </div>
    <div>

      <input type="radio" id="female" value="1" v-model="sex_picked" v-on:change="updateItem_person">
      <label for="two">female</label>
    </div>
    <div>
      <input type="radio" id="secret" value="2" v-model="sex_picked" v-on:change="updateItem_person">
      <label for="two">secret</label>

    </div>
    <span>Picked: {{ sex_picked }}</span>

    <div>
      <!--    地址-->
      <p>address</p>
      <input v-model="address" placeholder="edit me" :disabled="isHomeLess" v-on:change="updateItem_person">{{
        isHomeLess
      }}
      <input type="checkbox" id="checkbox" v-model="isHomeLess" v-on:change="clearAddress">
      <label for="checkbox">此顧客暫無居所</label>
    </div>
    <div>
      <!--    工作-->
      <p>job</p>
      <select v-model="job" v-on:change="updateItem_person">
        <option v-for="job in jobs" v-bind:value="job.chi" v-bind:key="job.chi">
          {{ job.chi }}
        </option>
      </select>
      {{ job }}
    </div>
    <div>
      <!--    Note筆記-->
      <p>note</p>
      <p>{{ noteText.length }}/200 個字</p>
      <textarea v-model="noteText" placeholder="add multiple lines" maxlength="200"
                v-on:change="updateItem_person"></textarea>
    </div>
    <br>
  </div>


</template>

<script>
export default {
  props: {
    // test: {type: String, require: true},
    // totalPageData: {type: Array},
    data_Now: {type: Object}
  },
  data: function () {
    return {
      firstname: this.data_Now.personal_info.firstname,
      lastname: this.data_Now.personal_info.lastname,
      address: this.data_Now.personal_info.address,
      isHomeLess: this.data_Now.personal_info.isHomeLess,
      sex_picked: this.data_Now.personal_info.sex_picked,
      noteText: this.data_Now.personal_info.noteText,
      job: this.data_Now.personal_info.job,
      jobs: [{chi: "保密", eng: "null"}, {chi: "調查員", eng: "agent"}, {
        chi: "秘密調查員",
        eng: "secret_agent"
      }, {chi: "秘密調查員的調查員", eng: "agent_of_secret_agent"}]
    };
  }, created: function () {
    // alert(JSON.stringify(this.data_Now));
  },
  watch: {
    data_Now: function (newVal, oldVal) { // watch it
      console.log(newVal + "" + oldVal)
      this.job = this.data_Now.personal_info.job;
      this.address = this.data_Now.personal_info.address;
      this.noteText = this.data_Now.personal_info.noteText;
      this.lastname = this.data_Now.personal_info.lastname;
      this.firstname = this.data_Now.personal_info.firstname;
      this.isHomeLess = this.data_Now.personal_info.isHomeLess;
      this.sex_picked = this.data_Now.personal_info.sex_picked;
      // alert(JSON.stringify(this.data_Now.orders))
      // alert(this.data_Now.orders.applecount);

    }
  },
  methods: {
    clearAddress: function () {
      const addressTag = this.$refs.el;
      if (this.$data.isHomeLess) {
        this.$data.address = '';
        addressTag.disable = true;
      } else {
        addressTag.disable = false;
      }
    },
    updateItem_person: function () {
      //事件名稱 //value =>this.message是指子層的噢！
      const data = {
        "firstname": this.firstname, "lastname": this.lastname, "address": this.address,
        "sex_picked": this.sex_picked, "noteText": this.noteText, "job": this.job, isHomeLess: this.isHomeLess
      }
      this.$emit('person', data);
    }
  }
};
</script>

<style scoped>
p {
  font-size: 14px;
  text-align: center;
}
</style>