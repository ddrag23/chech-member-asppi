<template>
  <div class="container">
    <div
      class="row justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div class="col-12 col-md-7">
        <div class="card">
          <div class="card-body">
            <div v-if="loading"><Spinner /></div>
            <div v-else>
              <div v-if="error" class="text-center text-danger">
                {{ error }}
              </div>
              <div v-else>
                <div class="logo d-flex justify-content-center">
                  <img :src="foto" alt="" class="profile__image" />
                </div>
                <div class="table-responsive">
                  <table class="table table-striped mt-3" style="width: 100%">
                    <tbody>
                      <tr>
                        <th>No Anggota</th>
                        <td>:</td>
                        <td>{{ `${kd_pst}.${kd_daerah}.${no_urut}` }}</td>
                      </tr>
                      <tr>
                        <th>Nama</th>
                        <td>:</td>
                        <td>{{ nama }}</td>
                      </tr>
                      <tr>
                        <th>Asal DPD</th>
                        <td>:</td>
                        <td>{{ pusat }}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>:</td>
                        <td>{{ email }}</td>
                      </tr>
                      <tr>
                        <th>Jenis Kelamin</th>
                        <td>:</td>
                        <td>
                          {{ jns_kelamin === 1 ? "Laki-Laki" : "Perempuan" }}
                        </td>
                      </tr>
                      <tr>
                        <th>Status Keanggotaan</th>
                        <td>:</td>
                        <td>
                          {{
                            active === 1
                              ? `Aktif (${dateFormat(valid_date)})`
                              : "Non-aktif"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
import Spinner from "@/components/Spinner.vue";
import axios from "axios";
export default {
  components: {
    Spinner,
  },
  setup: () => {
    const profile = reactive({
      foto: "",
      nama: "",
      active: "",
      email: "",
      jns_kelamin: "",
      no_urut: "",
      valid_date: "",
      pusat: "",
      kd_pst: "",
      kd_daerah: "",
    });
    const error = ref("");
    const foto = ref("");
    const loading = ref(false);
    const router = useRoute();
    const dateFormat = (dateParams) => {
      const date = new Date(dateParams);
      const monthFormat = (month) => {
        let resultMont = "";
        switch (month) {
          case 0:
            resultMont = "Januari";
            break;
          case 1:
            resultMont = "Februari";
            break;
          case 2:
            resultMont = "Maret";
            break;
          case 3:
            resultMont = "April";
            break;
          case 4:
            resultMont = "Mei";
            break;
          case 5:
            resultMont = "Juni";
            break;
          case 6:
            resultMont = "Juli";
            break;
          case 7:
            resultMont = "Agustus";
            break;
          case 8:
            resultMont = "September";
            break;
          case 9:
            resultMont = "Oktober";
            break;
          case 10:
            resultMont = "November";
            break;
          case 11:
            resultMont = "Desember";
            break;
          default:
            resultMont = "Bulan tidak ada";
            break;
        }
        return resultMont;
      };
      const format =
        date.getDate() +
        "-" +
        monthFormat(date.getMonth()) +
        "-" +
        date.getFullYear();
      return format;
    };
    const loadData = async () => {
      try {
        loading.value = true;
        const param = router.params.no.replaceAll("-", ".");
        const url = `https://siska.asppi.or.id/api/member/detail/${param}`;
        const res = await axios.get(url);
        const data = res.data;
        loading.value = false;
        if (data.error !== undefined) {
          error.value = data.error;
        } else {
          const allowed = [
            "foto",
            "nama",
            "active",
            "email",
            "jns_kelamin",
            "valid_date",
            "no_urut",
            "kd_pst",
            "kd_daerah",
          ];
          Object.entries(data.data_member)
            .filter(([key]) => allowed.includes(key))
            .map(([key]) => (profile[key] = data.data_member[key]));
          foto.value = data.photo_member;
          profile.pusat = data.data_member.pusat.kd_name;
        }

        console.log(profile);
      } catch (err) {
        console.error(err);
      }
    };
    onMounted(() => loadData());
    return {
      ...toRefs(profile),
      error,
      foto,
      loading,
      dateFormat,
    };
  },
};
</script>