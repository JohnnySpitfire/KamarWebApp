let usernameInput = document.getElementById("username-input");
let passwordInput = document.getElementById("password-input");
let button = document.getElementById("submit-button");

let username = "";
let password = "";

const GetInput = (event => {
    username = usernameInput.value;
    password = passwordInput.value;
    usernameInput.value="";
    passwordInput.value="";
});

button.addEventListener("click", GetInput);