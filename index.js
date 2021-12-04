var toastTrigger = document.getElementById('liveToastBtn')
var toastLiveExample = document.getElementById('liveToast')
const qrSection = document.getElementById("qr-section");
const qrCodeImg = document.getElementById("qr");
const downloadButton = document.getElementById("download-button");
if (toastTrigger) {
  toastTrigger.addEventListener('click', function () {
    var toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
    setTimeout( () => {
      axios.get("http://localhost:4000/get-code")
      .then(data => {
        qrCodeImg.src = data.data.url;
        qrSection.style.display = "block";
        downloadButton.href = data.data.url;
        console.log(data.data.id)
      })
      .catch(err => {
        console.error(err);
        alert("error")
      })
    }, 1000)
    
  })
}
