<template>
  <div class="bg__orange">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="logo d-flex">
                <img src="../assets/logopdf.png" alt="" />
                <img
                  src="../assets/logologin.png"
                  alt=""
                  width="500"
                  height="200"
                />
              </div>
              <div class="content">
                <div class="button__section d-flex justify-content-center">
                  <button class="btn btn-primary ms-2">Scan QR Code</button>
                  <button class="btn btn-danger ms-2">Drag & Drop</button>
                  <button class="btn btn-success ms-2">Upload</button>
                </div>
                <div class="content__section"></div>
                <!-- <div class="qr-scanner" ref="qr"></div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { QrStream, QrCapture, QrDropzone } from "vue3-qr-reader";
import axios from "axios";

const qr = ref();
const onScanSuccess = (dt, dr) => {
  console.log(dt);
  console.log(dr);
};
onMounted(() => {});
</script>
<style >
.bg__orange {
  background-color: orange;
  height: 100vh;
}
.card {
  margin-top: 10px;
}
</style>