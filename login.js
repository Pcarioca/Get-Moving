const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("liveToastBtn");

button.addEventListener("click", () => {
    axios.post("http://localhost:4000/login", {
        email: email.value,
        password: password.value
    })
    .then(data => {
        if(data.data.err){
            alert(data.data.err)
        }
        else{
            window.location.href = "panel.html"
        }
    })
})