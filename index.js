var toastTrigger = document.getElementById('liveToastBtn')
var toastLiveExample = document.getElementById('liveToast')
const qrSection = document.getElementById("qr-section");
const qrCodeImg = document.getElementById("qr");
const downloadButton = document.getElementById("download-button");
const TransportOption = Array.from( document.querySelectorAll(".transport"));
const validationCustom1 = document.getElementById("validationCustom01"); //prenume
const validationCustom2 = document.getElementById("validationCustom02"); //nume
const validationCustom3 = document.getElementById("validationCustom03"); //city
const validationCustom4 = document.getElementById("validationCustom04"); //county
const validationCustom5 = document.getElementById("validationCustom05"); //zip code
const email = document.getElementById("email"); //example
const at = document.getElementById("at"); //at
const adress = document.getElementById("address"); //adresa
const prefix = document.getElementById("floatingSelectGrid")  //prefix
const phone = document.getElementById("floatingInputGrid"); //phone number
const terms = document.getElementById("invalidCheck"); //terms and conditions


if (toastTrigger) {
  toastTrigger.addEventListener('click', function () {
    var toast = new bootstrap.Toast(toastLiveExample)
    const radio = TransportOption.filter(element => element.checked);
    const vehicle = radio[0].value;
    const firstName = validationCustom1.value;
    const lastName = validationCustom2.value;
    const city = validationCustom3.value;
    const country = validationCustom4.value;
    const zipCode = validationCustom5.value;
    const fullEmail = email.value + at.value;
    const address = adress.value;
    const phoneNumber = prefix.value + phone.value;
    toast.show()
    setTimeout( () => {
      axios.get("http://localhost:4000/get-code", {params: {vehicle: vehicle, firstName:firstName, lastName:lastName, city:city, country:country, zipCode:zipCode, email:fullEmail, address:address, phoneNumber:phoneNumber}})
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
