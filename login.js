const username = document.getElementById("username");
const password = document.getElementById("password");
const button = document.getElementById("liveToastBtn");

button.addEventListener("click", () => {
    axios.post("http://localhost:4000/login", {
        username: username.value,
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