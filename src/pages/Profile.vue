<template>
  <div class="container">
    <div
      class="row justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div class="col-9">
        <div class="card">
          <div class="card-body">
            <div v-if="error" class="text-center text-danger">
              {{ error }}
            </div>
            <div v-else>
              <div class="logo d-flex justify-content-center">
                <img :src="foto" alt="" class="profile__image" />
              </div>
              <table class="table table-striped mt-3" style="width: 100%">
                <tbody>
                  <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{{ nama }}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>{{ email }}</td>
                  </tr>
                  <tr>
                    <td>Jenis Kelamin</td>
                    <td>:</td>
                    <td>{{ jns_kelamin === 1 ? "Laki-Laki" : "Perempuan" }}</td>
                  </tr>
                  <tr>
                    <td>Status Keanggotaan</td>
                    <td>:</td>
                    <td>{{ active === 1 ? "Aktif" : "Non-aktif" }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.profile__image {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
</style>
<script>
import { onMounted, reactive, toRefs, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
export default {
  setup: () => {
    const profile = reactive({
      foto: "",
      nama: "",
      active: "",
      email: "",
      jns_kelamin: "",
    });
    const error = ref("");
    const foto = ref("");
    const router = useRoute();
    const loadData = async () => {
      try {
        const param = router.params.no.replaceAll("-", ".");
        const url = `https://siska.asppi.or.id/api/member/detail/${param}`;
        const res = await axios.get(url);
        const data = res.data;
        if (data.error !== undefined) {
          error.value = data.error;
        } else {
          const allowed = ["foto", "nama", "active", "email", "jns_kelamin"];
          Object.entries(data.data_member)
            .filter(([key]) => allowed.includes(key))
            .map(([key]) => (profile[key] = data.data_member[key]));
          foto.value = data.photo_member;
        }

        console.log(profile);
      } catch (err) {}
    };
    onMounted(() => loadData());
    return {
      ...toRefs(profile),
      error,
      foto,
    };
  },
};
</script>