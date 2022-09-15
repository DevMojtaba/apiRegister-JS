const siginBtn = document.querySelector(".signin-button");

const nameInput = document.querySelector(".name-input");
const usernameInput = document.querySelector(".user-input");
const passwordInput = document.querySelector(".pass-input");
const passwordConInput = document.querySelector(".pass-input-2");

const nameMsg = document.querySelector(".username-msg");
const emailMsg = document.querySelector(".email-msg");
const passwordMsg = document.querySelector(".password-msg");
const passwordMsg2 = document.querySelector(".password-2-msg");
const sigininMsg = document.querySelector(".signin-status");

const name = document.querySelector(".name");
const email = document.querySelector(".email");
const pass = document.querySelector(".password");
const pass2 = document.querySelector(".password-2");

const loginBtn = document.querySelector(".login");

loginBtn.addEventListener("click", () => {
  window.location.href = './pages/login.html'
});

siginBtn.addEventListener("click", signIn);

function signIn(event) {
  event.preventDefault();
  nameMsg.innerText = "";
  emailMsg.innerText = "";
  passwordMsg.innerText = "";
  passwordMsg2.innerText = "";
 
  const nameValue = nameInput.value;
  const usernameValue = usernameInput.value;
  const passwordValue = passwordInput.value;
  const passwordConValue = passwordConInput.value;
  let ifSendData = true;

   localStorage.setItem("username", usernameValue);
   localStorage.setItem("password", passwordValue);

  // #region
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
    ifSendData = false;
  } else {
    pass.classList.add("success");
    pass.classList.remove("error");
  }

  if (passwordConValue.length === 0 ) {
    passwordMsg2.innerText = "Please enter your password";
    pass2.classList.add("error");
    ifSendData = false;
  }else if(passwordValue.length <= 4){
    passwordMsg2.innerText = "Your password is too short";
    ifSendData = false;
  }else if(passwordValue.length !== passwordConValue.length){
    passwordMsg2.innerText = "The passwords are not the same";
    ifSendData = false;
  } else {
    pass2.classList.add("success");
    pass2.classList.remove("error");
  }

// #endregion
  

//#region 
function saveData() {
  let usernameValue = usernameInput.value;
  let passwordValue = passwordInput.value;
  
  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  if (
    user_records.some((v) => {
      return v.usernameValue == usernameValue;
    })
  ) {} else {
    user_records.push({
      usernameValue: usernameValue,
      passwordValue: passwordValue,
    });
    localStorage.setItem("users", JSON.stringify(user_records));
  }
}
//#endregion
  
if (ifSendData) {
    const body = JSON.stringify({
      name: nameValue,
      email: usernameValue,
      password: passwordValue,
      password_confirmation: passwordConValue,
    });
    const headers = { "Content-Type": "application/json" };
    fetch("https://apingweb.com/api/register", {
      method: "POST",
      body: body,
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          saveData();
          window.location.href = "./pages/login.html";
        }
      });
  }
}
