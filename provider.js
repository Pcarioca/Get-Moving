const businessName = document.getElementById("validationCustom01");
const hqLocation = document.getElementById("validationCustom02");
const service = document.getElementById("validationCustom03");
const city = document.getElementById("validationCustom04");
const email = document.getElementById("email");
const at = document.getElementById("at");
const username = document.getElementById("username");
const password = document.getElementById("password");
const passwordRepeat = document.getElementById("password-repeat");
const prefix = document.getElementById("prefix");
const phoneNumber = document.getElementById("phone-number");
const button = document.getElementById("liveToastBtn");

button.addEventListener("click", () => {
    axios.post("http://localhost:4000/provider", {
        businessName: businessName.value,
        hqLocation: hqLocation.value,
        service: service.value,
        city: city.value,
        email: email.value +"@" + at.value,
        username: username.value,
        password: password.value,
        phoneNumber: prefix.value + phoneNumber.value
    })
    .then(
        data => {
            alert("account created")
        }

    )
    .catch(
        err => {
            console.log(err)
            alert("error")
        }
    )
})
