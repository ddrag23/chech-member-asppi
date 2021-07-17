<template>
  <div class="bg__orange">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="logo d-flex justify-content-center">
                <img src="../assets/logopdf.png" width="200" />
                <img
                  src="../assets/logologin.png"
                  alt=""
                  width="500"
                  height="150"
                />
              </div>
              <div class="content">
                <div class="button__section d-flex justify-content-center">
                  <button class="btn btn-primary ms-2" @click="showQrStream">
                    Scan QR Code
                  </button>
                  <button class="btn btn-danger ms-2" @click="showQrDnd">
                    Drag & Drop
                  </button>
                  <button class="btn btn-success ms-2" @click="showQrFile">
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
                    <qr-capture @decode="onDecode">
                      Drop Image in here
                    </qr-capture>
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
    const showQrStream = () => (qrStream.value = !qrStream.value);
    const showQrDnd = () => (qrDnd.value = !qrDnd.value);
    const showQrFile = () => (qrFile.value = !qrFile.value);
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
</style>