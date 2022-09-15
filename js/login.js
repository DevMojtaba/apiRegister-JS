const nameInput = document.querySelector(".name-input");
const usernameInput = document.querySelector(".user-input");
const passwordInput = document.querySelector(".pass-input");
const passwordConInput = document.querySelector(".pass-input");
const emailMsg = document.querySelector(".email-msg");
const passwordMsg = document.querySelector(".password-msg");
const sigininMsg = document.querySelector(".signin-status");
const siginBtn = document.querySelector(".signin-button");
const email = document.querySelector(".email");
const pass = document.querySelector(".password");

const loginBtn = document.querySelector(".login");

loginBtn.addEventListener("click", () => {
  window.location.href = '../index.html'
});

siginBtn.addEventListener("click", signIn);

function signIn(event) {
  event.preventDefault();
  emailMsg.innerText = "";
  passwordMsg.innerText = "";

  const usernameValue = usernameInput.value;
  const passwordValue = passwordInput.value;
  let ifSendData = true;

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

  //#region 
  function saveData() {
    let usernameValue = usernameInput.value;
    let passwordValue = passwordInput.value;

    let user_records = new Array();
    user_records = JSON.parse(localStorage.getItem("users"))
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    console.log(user_records);
    if (
      user_records.some((v) => {
        return (
          v.usernameValue == usernameValue && v.passwordValue == passwordValue
        );
      })
    ) {
     // alert("Login Pass");
      let current_user = user_records.filter((v) => {
        return (
          v.usernameValue == usernameValue && v.passwordValue == passwordValue
        );
      })[0];
      localStorage.setItem("name", current_user.name);
      localStorage.setItem("email", current_user.email);
      window.location.href = "../pages/dashboard.html";
    } else {
      alert("Email or password is not correct");
    }
  }

  //#endregion

  if (ifSendData) {
    const body = JSON.stringify({
      email: usernameValue,
      password: passwordValue,
    });
    const headers = { "Content-Type": "application/json" };
    fetch("https://apingweb.com/api/login", {
      method: "POST",
      body: body,
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        saveData();
        if (json) {
          sigininMsg.innerText = "Email or password is not correct";
        }
      });
  }
}
