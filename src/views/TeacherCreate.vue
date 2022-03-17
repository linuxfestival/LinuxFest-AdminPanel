<template>
  <div>
    <h1>Create new teacher :</h1>
    <div class="col-md-8 order-md-1">
      <form class="needs-validation" @submit.prevent="createNewTeacher()">
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="fullName">Full Name(Persian Letter only)</label>
            <input
              id="fullName"
              type="text"
              class="form-control"
              placeholder="Full Name..."
              v-model="newTeacher.fullName"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="fullName_en">Full Name in English</label>
            <input
              id="fullName_en"
              type="text"
              class="form-control"
              placeholder="Full Name in English..."
              v-model="newTeacher.fullName_en"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="affiliation">Affiliation (Optional)</label>
            <input
              id="affiliation"
              type="text"
              class="form-control"
              placeholder="Affiliation"
              v-model="newTeacher.affiliation"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="affiliation_en"
              >Affiliation in English (Optional)</label
            >
            <input
              id="affiliation_en"
              type="text"
              class="form-control"
              placeholder="Affiliation in English"
              v-model="newTeacher.affiliation_en"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="degree">Degree (Optional)</label>
            <input
              id="degree"
              type="text"
              class="form-control"
              placeholder="degree ..."
              v-model="newTeacher.degree"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="degree_en">Degree in English (Optional)</label>
            <input
              id="degree_en"
              type="text"
              class="form-control"
              placeholder="degree in English ..."
              v-model="newTeacher.degree_en"
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="lecture_title"> Lecture title (Optional) </label>
          <input
            id="lecture_title"
            type="text"
            class="form-control"
            placeholder="lecture_title ..."
            v-model="newTeacher.lecture_title"
          />
        </div>
        <div class="mb-3">
          <label for="lecture_title_en">
            Lecture title in English (Optional)
          </label>
          <input
            id="lecture_title_en"
            type="text"
            class="form-control"
            placeholder="lecture_title in English ..."
            v-model="newTeacher.lecture_title_en"
          />
        </div>

        <div class="mb-3">
          <label for="lecture_abstract"> Lecture abstract (Optional) </label>
          <input
            id="lecture_abstract"
            type="text"
            class="form-control"
            placeholder="Lecture abstract ..."
            v-model="newTeacher.lecture_abstract"
          />
        </div>
        <div class="mb-3">
          <label for="lecture_abstract_en">
            Lecture abstract in English (Optional)
          </label>
          <input
            id="lecture_abstract_en"
            type="text"
            class="form-control"
            placeholder="Lecture abstract in English ..."
            v-model="newTeacher.lecture_abstract_en"
          />
        </div>

        <div class="mb-3">
          <label for="description">Description (Optional):</label>
          <textarea
            class="form-control"
            id="description"
            placeholder="Description..."
            v-model="newTeacher.description"
          >
          </textarea>
        </div>
        <div class="mb-3">
          <label for="description_en">Description in English (Optional):</label>
          <textarea
            class="form-control"
            id="description_en"
            placeholder="Description_en..."
            v-model="newTeacher.description_en"
          >
          </textarea>
        </div>
        <hr class="mb-4" />
        <p>
          برای اضافه کردن عکس مدرس، پس از ساختن آن، از قسمت ویرایش استاد، لوگوی
          آن را آپلود کنید
        </p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">
          Create New Teacher
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TeacherCreate",
  data() {
    return {
      newTeacher: {
        fullName: "",
        fullName_en: "",
        description: "",
        description_en: "",
        affiliation: "",
        affiliation_en: "",
        degree: "",
        degree_en: "",
        lecture_title: "",
        lecture_title_en: "",
        lecture_abstract: "",
        lecture_abstract_en: "",
      },
    };
  },
  methods: {
    createNewTeacher() {
      console.log(this.inputData);
      axios({
        url: this.$store.getters.teachersApi + "manage/",
        method: "POST",
        data: this.newTeacher,
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          this.$notify({
            group: "main",
            text: "Teacher created successfully",
            title: "Success",
            type: "success",
            position: "top center",
            duration: 3000,
          });
          this.$router.push("/teachers");
        })
        .catch((error) => {
          console.log(error.response);
          this.$notify({
            group: "main",
            text: "Error creating user.<br>" + error.response.data.error,
            title: "Error.",
            type: "error",
            position: "top center",
            duration: 5000,
          });
        })
        .finally(() => {});
    },
  },
  created() {},
};
</script>

<style scoped>
</style>