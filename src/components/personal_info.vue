<template>
  <div>
    <!--名子的部分-->
    <div class="row">
      <div class="">
        <p style="font-size: 15px;">firstName:</p>
      </div>
      <div>
        <input name="firstname" :value="allForms[index].personal_info.firstname" @change="updateItem_person">
      </div>
      <br> <br>
      <div>
        <div class="">
          <p>lastName:</p>
        </div>
        <div class="">
          <input name="lastname" :value="allForms[index].personal_info.lastname" v-on:change="updateItem_person">
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

    <div style="margin-top: 5px;">
      <!--地址-->
      <p>Address:</p>
      <div>
        <input name="address" placeholder="edit me" :disabled="isHomeLess" :value="allForms[index].personal_info.address" ref="address"
               v-on:change="updateItem_person">
      </div>
      <div>
        <input type="checkbox"  name="isHomeLess" :value="allForms[index].personal_info.isHomeLess"  @change="clearAddress" ref="homeless">
        <label for="isHomeLess" >此顧客暫無居所</label>
      </div>
    </div>
    <div style="margin-top: 5px;">
      <!--工作-->
      <p>job</p>
      <select name="job" :value="allForms[index].personal_info.job" v-on:change="updateItem_person">
        <option v-for="job in jobs" v-bind:value="job.chi" v-bind:key="job.chi">
          {{ job.chi }}
        </option>
      </select>
    </div>
    <div style="margin-top: 5px;">
      <!--Note筆記-->
      <p>note</p>
      <p>{{ allForms[index].personal_info.noteText.length }}/200 個字</p>
      <textarea name="noteText" placeholder="add multiple lines" maxlength="200"
                :value="allForms[index].personal_info.noteText"
                v-on:change="updateItem_person"></textarea>
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
      jobs:options.jobs,
      isHomeLess: this.allForms[this.index].personal_info.isHomeLess,
      sex_picked: this.allForms[this.index].personal_info.sex_picked
    };
  },
  computed: {

  }
  ,
  watch: {
    allForms: function (newVal, oldVal) {
      console.log(newVal + "" + oldVal)
      this.$data.sex_picked = this.allForms[this.index].personal_info.sex_picked;
    },
    index: function (newVal, oldVal) {
      console.log(newVal + "" + oldVal)
      this.$data.sex_picked = this.allForms[this.index].personal_info.sex_picked;
    }
  },
  methods: {
    clearAddress: function () {
      var addressTag = this.$refs.address;
      if (this.$props.allForms[this.$props.index].personal_info.isHomeLess===false) {
        this.$props.allForms[this.$props.index].personal_info.address = '';
        addressTag.disabled = true;
        this.$props.allForms[this.$props.index].personal_info.isHomeLess = true;
      } else {
        this.$props.allForms[this.$props.index].personal_info.isHomeLess = false;
        addressTag.disabled = false;
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