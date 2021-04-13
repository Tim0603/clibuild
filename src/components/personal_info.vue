<template>
  <div>
    <!--名子的部分-->
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
    <!--性別-->
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
      <!--地址-->
      <p>address</p>
      <input v-model="address" placeholder="edit me" :disabled="isHomeLess" v-on:change="updateItem_person">{{
        isHomeLess
      }}
      <input type="checkbox" id="checkbox" v-model="isHomeLess" v-on:change="clearAddress">
      <label for="checkbox">此顧客暫無居所</label>
    </div>
    <div>
      <!--工作-->
      <p>job</p>
      <select v-model="job" v-on:change="updateItem_person">
        <option v-for="job in jobs" v-bind:value="job.chi" v-bind:key="job.chi">
          {{ job.chi }}
        </option>
      </select>
      {{ job }}
    </div>
    <div>
      <!--Note筆記-->
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
    data_Now: {type: Object}
  },
  data: function () {
    return {
      job: this.data_Now.personal_info.job,
      address: this.data_Now.personal_info.address,
      noteText: this.data_Now.personal_info.noteText,
      lastname: this.data_Now.personal_info.lastname,
      firstname: this.data_Now.personal_info.firstname,
      isHomeLess: this.data_Now.personal_info.isHomeLess,
      sex_picked: this.data_Now.personal_info.sex_picked,
      jobs: [{chi: "保密", eng: "null"},
        {chi: "調查員", eng: "agent"},
        {chi: "秘密調查員", eng: "secret_agent"},
        {chi: "秘密調查員的調查員", eng: "agent_of_secret_agent"}]
    };
  }, created: function () {

  },
  watch: {
    data_Now: function (newVal, oldVal) {
      console.log(newVal + "" + oldVal)
      this.$data.job = this.$data.data_Now.personal_info.job;
      this.$data.address = this.$data.data_Now.personal_info.address;
      this.$data.noteText = this.$data.data_Now.personal_info.noteText;
      this.$data.lastname = this.$data.data_Now.personal_info.lastname;
      this.$data.firstname = this.$data.data_Now.personal_info.firstname;
      this.$data.sex_picked = this.$data.data_Now.personal_info.sex_picked;
      this.$data.isHomeLess = this.$data.data_Now.personal_info.isHomeLess;

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
      const data = {
        "firstname": this.$data.firstname, "lastname": this.$data.lastname, "address": this.$data.address,
        "sex_picked": this.$data.sex_picked, "noteText": this.$data.noteText, "job": this.$data.job, isHomeLess: this.$data.isHomeLess
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