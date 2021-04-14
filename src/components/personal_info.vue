<template>
  <div>
    <!--名子的部分-->
    <div class="row">
      <div class="">
        <p style="font-size: 15px;">firstName:</p>
      </div>
      <div>
        <input name="firstname" :value="this.data_Now.personal_info.firstname" @change="updateItem_person">
      </div>
      <br> <br>
      <div>
        <div class="">
          <p>lastName:</p>
        </div>
        <div class="">
          <input name="lastname" :value="this.data_Now.personal_info.lastname" v-on:change="updateItem_person">
        </div>
      </div>
      <br>

    </div>
    <!--性別-->
    <div>
      <div style="margin-top: 5px;">
        <p>Gender:</p>
      </div>
      <input type="radio" id="male" v-model="sex_picked" name="sex_picked" :value="0" v-on:change="updateItem_person">
      <label>male</label>
      <input type="radio" id="female" v-model="sex_picked" name="sex_picked" :value="1" v-on:change="updateItem_person">
      <label>female</label>
      <input type="radio" id="secret" v-model="sex_picked" name="sex_picked" :value="2" v-on:change="updateItem_person">
      <label>secret</label>
    </div>
    <!--    <span>Picked: {{ sex_picked }}</span>-->

    <div style="margin-top: 5px;">
      <!--地址-->
      <p>Address:</p>
      <div>
        <input name="address" placeholder="edit me" :disabled="isHomeLess" :value="this.data_Now.personal_info.address"
               v-on:change="updateItem_person">
      </div>
      <div>
        <input type="checkbox" id="checkbox" name="isHomeLess" v-on:change="clearAddress">
        <label for="checkbox">此顧客暫無居所</label>
      </div>
    </div>
    <div style="margin-top: 5px;">
      <!--工作-->
      <p>job</p>
      <select name="job" v-on:change="updateItem_person">
        <option v-for="job in jobs" v-bind:value="job.chi" v-bind:key="job.chi">
          {{ job.chi }}
        </option>
      </select>
      <!--      {{ job }}-->
    </div>
    <div style="margin-top: 5px;">
      <!--Note筆記-->
      <p>note</p>
      <p>{{ this.data_Now.personal_info.noteText.length }}/200 個字</p>
      <textarea name="noteText" placeholder="add multiple lines" maxlength="200"
                :value="this.data_Now.personal_info.noteText"
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
      // job: this.data_Now.personal_info.job,
      // address: this.data_Now.personal_info.address,
      // noteText: this.data_Now.personal_info.noteText,
      // lastname: this.data_Now.personal_info.lastname,
      // firstname: this.data_Now.personal_info.firstname,
      isHomeLess: this.data_Now.personal_info.isHomeLess,
      sex_picked: this.data_Now.personal_info.sex_picked,
      jobs: [{chi: "保密", eng: "null"},
        {chi: "調查員", eng: "agent"},
        {chi: "秘密調查員", eng: "secret_agent"},
        {chi: "秘密調查員的調查員", eng: "agent_of_secret_agent"}]
    };
  }, created: function () {

  },
  computed: {}
  ,
  watch: {
    data_Now: function (newVal, oldVal) {
      console.log(newVal + "" + oldVal)
      this.$data.sex_picked = this.$props.data_Now.personal_info.sex_picked;
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
    updateItem_person: function (e) {
      this.$emit("changeData", e);
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