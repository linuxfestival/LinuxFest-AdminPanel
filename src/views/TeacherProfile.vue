<template>
  <div>
    <h1>Teacher Profile:</h1>

    <div class="col-md-8 order-md-1">
      <div class="col-md-8 order-md-1">
        <form
          class="needs-validation"
          @submit.prevent="updateTeacher()"
          v-if="teacher !== undefined"
        >
          <div class="row">
            <div class="col-md-12 mb-3">
              <label for="fullName">Full Name(Persian Letter only)</label>
              <input
                id="fullName"
                type="text"
                class="form-control"
                placeholder="Full Name..."
                v-model="teacher.fullName"
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
                v-model="teacher.fullName_en"
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="description">Description (Optional):</label>
            <textarea
              class="form-control"
              id="description"
              placeholder="Description..."
              v-model="teacher.description"
            >
            </textarea>
          </div>

          <div class="mb-3">
            <label for="description_en">Description in English (Optional):</label>
            <textarea
              class="form-control"
              id="description_en"
              placeholder="Description in English..."
              v-model="teacher.description_en"
            >
            </textarea>
          </div>

          <div class="mb-3">
            <label for="affiliation">Affiliation (Optional)</label>
            <input
              id="affiliation"
              type="text"
              class="form-control"
              placeholder="Affiliation"
              v-model="teacher.affiliation"
            />
          </div>
          <div class="mb-3">
            <label for="affiliation_en">Affiliation in English (Optional)</label>
            <input
              id="affiliation_en"
              type="text"
              class="form-control"
              placeholder="Affiliation in English"
              v-model="teacher.affiliation_en"
            />
          </div>

          <div class="mb-3">
            <label for="degree">Degree (Optional)</label>
            <input
              id="degree"
              type="text"
              class="form-control"
              placeholder="degree ..."
              v-model="teacher.degree"
            />
          </div>

          <div class="mb-3">
            <label for="degree_en">Degree in English (Optional)</label>
            <input
              id="degree_en"
              type="text"
              class="form-control"
              placeholder="degree in English ..."
              v-model="teacher.degree_en"
            />
          </div>
          <div class="mb-3">
            <label for="lecture_title">Lecture_title (Optional)</label>
            <input
              id="lecture_title"
              type="text"
              class="form-control"
              placeholder="lecture_title ..."
              v-model="teacher.lecture_title"
            />
          </div>
          <div class="mb-3">
            <label for="lecture_title_en">Lecture_title in English (Optional)</label>
            <input
              id="lecture_title_en"
              type="text"
              class="form-control"
              placeholder="lecture_title in English ..."
              v-model="teacher.lecture_title_en"
            />
          </div>

           <div class="mb-3">
          <label for="lecture_abstract"> Lecture abstract (Optional) </label>
          <input
            id="lecture_abstract"
            type="text"
            class="form-control"
            placeholder="Lecture abstract ..."
            v-model="teacher.lecture_abstract"
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
            v-model="teacher.lecture_abstract_en"
          />
        </div>

          <hr class="mb-4" />
          <button class="btn btn-primary btn-lg btn-block" type="submit">
            Update Teacher
          </button>
        </form>
        <br />
        <br />
        <form @submit.prevent="submitFile(uploadText, 'pic', file)">
          <input
            class="form-control"
            ref="file"
            type="file"
            @change="handleFileUpload()"
          />
          <button class="btn btn-success">{{ uploadText }}</button>
        </form>

        <br />
        <br />
        <form @submit.prevent="submitFile(uploadResumeText, 'resume', resume)">
          <input
            class="form-control"
            ref="resume"
            type="file"
            @change="handleResumeUpload()"
          />
          <button class="btn btn-success">{{ uploadResumeText }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jalali from "jalali-moment";
export default {
  name: "TeacherProfile",
  data() {
    return {
      teacher: {},
      workshops: [],
      file: "",
      uploadText: "upload image",
      uploadResumeText: "upload resume",
    };
  },
  methods: {
    getJalali(date) {
      return jalali(date);
    },
    submitFile(uploadText, name, file) {
      uploadText = "laoding ...";
      let formData = new FormData();
      formData.append("mainPic", file);
      axios
        .post(
          this.$store.getters.teachersApi + `manage/${name}/` + this.teacher._id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + this.$store.getters.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log("SUCCESS!!");
          uploadText = "upload "+ name;
          this.$notify({
            group: "main",
            text: "SUCCESS!!",
            title: "Success",
            type: "success",
            position: "top center",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.log(error.response);
          this.uploadText = "upload " + name;
          this.$notify({
            group: "main",
            text: "ّFAILD",
            title: "Error.",
            type: "error",
            position: "top center",
            duration: 5000,
          });
          console.log("FAILURE!!");
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    handleResumeUpload() {
      this.resume = this.$refs.resume.files[0];
    },
    getTeacherWithId() {
      console.log("Getting teacher with id " + this.$route.params.id);
      axios({
        url:
          this.$store.getters.teachersApi + "manage/" + this.$route.params.id,
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          this.teacher = response.data.teacher;
          this.workshops = response.data.workshops;
        })
        .catch((error) => {
          console.log(error);
          // console.log("user obj to send " , this.user);
          if (error.response) console.log(error.response);
        })
        .finally(() => {});
    },
    updateTeacher() {
      console.log("update teacher with id ", this.$route.params.id);
      delete this.teacher.createdAt;
      delete this.teacher.updatedAt;
      delete this.teacher.imagePath;
      delete this.teacher._id;
      delete this.teacher.__v;

      axios({
        url:
          this.$store.getters.teachersApi + "manage/" + this.$route.params.id,
        method: "PATCH",
        data: this.teacher,
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          this.$notify({
            group: "main",
            text: "Teacher updated successfully",
            title: "Success",
            type: "success",
            position: "top center",
            duration: 3000,
          });
          this.getTeacherWithId();
        })
        .catch((error) => {
          console.log(error.response);
          this.$notify({
            group: "main",
            text: "Error updating user.<br>" + error.response.data.error,
            title: "Error.",
            type: "error",
            position: "top center",
            duration: 5000,
          });
        });
    },
  },
  created() {
    // this.getUserWithId();
    this.getTeacherWithId();
  },
};
</script>

<style scoped>
</style>