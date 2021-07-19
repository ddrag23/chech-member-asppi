<template>
  <div class="bg__orange">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="card">
            <div class="card-body">
              <div class="logo d-flex justify-content-center">
                <img
                  src="../assets/logopdf.png"
                  class="asppi__logo"
                  alt="asppi logo"
                />
                <img
                  src="../assets/logologin.png"
                  alt="siska logo"
                  class="siska__logo"
                />
              </div>
              <div class="content">
                <div class="text-center mb-3">
                  <h3>SISTEM INFORMASI KEORGANISASIAN ASPPI</h3>
                  <h4>(SCAN QRCODE ANGGOTA ASPPI)</h4>
                </div>
                <div class="button__section d-flex justify-content-center">
                  <button class="btn btn-primary ms-2" @click="showQrStream">
                    <i class="bi bi-upc-scan"></i>
                    Scan QR Code
                  </button>
                  <button class="btn btn-danger ms-2" @click="showQrDnd">
                    <i class="bi bi-images"></i>
                    Drag & Drop
                  </button>
                  <button class="btn btn-success ms-2" @click="showQrFile">
                    <i class="bi bi-file-arrow-up"></i>
                    Upload
                  </button>
                </div>
                <div class="text-center text-danger mt-3">{{ error }}</div>
                <div class="content__section">
                  <div v-if="qrStream">
                    <qr-stream
                      style="width: 20em; height: 20em"
                      @decode="onDecode"
                      @init="onInit"
                    >
                      <div style="color: red" class="frame"></div>
                    </qr-stream>
                  </div>
                  <div v-if="qrDnd" class="dnd">
                    <qr-dropzone @decode="onDecode">
                      Drop Image in here
                    </qr-dropzone>
                  </div>
                  <div v-if="qrFile" class="">
                    <!-- <qr-capture @decode="onDecode" capture accept="images/*">
                      Drop Image in here
                    </qr-capture> -->
                    <input type="file" accept="image/*" capture="environment" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { QrStream, QrCapture, QrDropzone } from "vue3-qr-reader";
export default {
  components: {
    QrStream,
    QrCapture,
    QrDropzone,
  },
  setup: () => {
    const router = useRouter();
    const qrStream = ref(false);
    const qrDnd = ref(false);
    const qrFile = ref(false);
    const error = ref("");
    const showQrStream = () => {
      if (qrDnd.value) {
        qrDnd.value = false;
      }
      if (qrFile.value) {
        qrFile.value = false;
      }
      qrStream.value = !qrStream.value;
    };
    const showQrDnd = () => {
      if (qrStream.value) {
        qrStream.value = false;
      }
      if (qrFile.value) {
        qrFile.value = false;
      }
      qrDnd.value = !qrDnd.value;
    };
    const showQrFile = () => {
      if (qrStream.value) {
        qrStream.value = false;
      }
      if (qrDnd.value) {
        qrDnd.value = false;
      }
      qrFile.value = !qrFile.value;
    };
    const onDecode = (data) => {
      router.push({
        name: "profile",
        params: {
          no: data.replaceAll(".", "-"),
        },
      });
    };
    const onInit = async (promise) => {
      try {
        await promise;
        // console.log(promise);
      } catch (err) {
        console.log(err.name);
        if (err.name === "NotAllowedError") {
          error.value = "ERROR: you need to grant camera access permisson";
        } else if (err.name === "NotFoundError") {
          error.value = "ERROR: no camera on this device";
        } else if (err.name === "NotSupportedError") {
          error.value = "ERROR: secure context required (HTTPS, localhost)";
        } else if (err.name === "NotReadableError") {
          error.value = "ERROR: is the camera already in use?";
        } else if (err.name === "OverconstrainedError") {
          error.value = "ERROR: installed cameras are not suitable";
        } else if (err.name === "StreamApiNotSupportedError") {
          error.value = "ERROR: Stream API is not supported in this browser";
        }
      }
    };
    return {
      showQrStream,
      showQrDnd,
      showQrFile,
      qrDnd,
      qrStream,
      qrFile,
      onDecode,
      error,
      onInit,
    };
  },
};
</script>
<style >
.asppi__Logo {
  width: 100px;
}
.siska__logo {
  width: 200px;
  height: 100px;
}
.card {
  margin-top: 10px;
}
.content__section {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
.dnd {
  height: 100px;
  width: 100%;
  background: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
}
.frame {
  border-style: solid;
  border-width: 2px;
  border-color: red;
  height: 200px;
  width: 200px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin: auto;
}

@media screen and (min-width: 768px) {
  .asppi__Logo {
    width: 150px;
  }
  .siska__logo {
    width: 250px;
    height: 150px;
  }
}
@media screen and (min-width: 992px) {
  .asppi__Logo {
    width: 200px;
  }
  .siska__logo {
    width: 400px;
    height: 200px;
  }
}
</style>