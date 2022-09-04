const nameInput = document.querySelector(".name-input");
const usernameInput = document.querySelector(".user-input");
const passwordInput = document.querySelector(".pass-input");
const nameMsg = document.querySelector(".username-msg");
const emailMsg = document.querySelector(".email-msg");
const passwordMsg = document.querySelector(".password-msg");
const sigininMsg = document.querySelector(".signin-status");
const siginBtn = document.querySelector(".signin-button");
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const pass = document.querySelector(".password");

siginBtn.addEventListener("click", signIn);

function signIn(event) {
  event.preventDefault();
  nameMsg.innerText = "";
  emailMsg.innerText = "";
  passwordMsg.innerText = "";
  const nameValue = nameInput.value;
  const usernameValue = usernameInput.value;
  const passwordValue = passwordInput.value;
  let ifSendData = true;

  //#region
  if (nameValue.length === 0) {
    nameMsg.innerText = "Please enter your name";
    name.classList.add("error");
    ifSendData = false;
  } else {
    name.classList.add("success");
    name.classList.remove("error");
  }

  if (
    usernameValue.length === 0 ||
    usernameValue.indexOf("@") === -1 ||
    usernameValue.indexOf(".") === -1
  ) {
    emailMsg.innerText = "Please enter a valid Email";
    email.classList.add("error");
    ifSendData = false;
  } else {
    email.classList.add("success");
    email.classList.remove("error");
  }

  if (passwordValue.length === 0) {
    passwordMsg.innerText = "Please enter your password";
    pass.classList.add("error");
    ifSendData = false;
  } else if (passwordValue.length <= 4) {
    passwordMsg.innerText = "Your password is too short";
    pass.classList.add("error");
    ifSendData = false;
  } else {
    pass.classList.add("success");
    pass.classList.remove("error");
  }
  //#endregion

  if (ifSendData) {
    const body = JSON.stringify({
      name: nameValue,
      email: usernameValue,
      password: passwordValue
    });
    const headers = { "Content-Type": "application/json" };
    fetch("https://api.freerealapi.com/auth/register", {
      method: "POST",
      body: body,
      headers: headers
    })
      .then(response => response.json())
      .then(json => {
        if (json) {
          sigininMsg.innerText = "You signed in successfully";
        }
      });
  }
}
