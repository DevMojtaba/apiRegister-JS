// Sidebar
//#region 
let nav = document.querySelector(".header-ul");
document.querySelector("#menu-bar").onclick = () => {
  nav.classList.toggle("active");
};

document.querySelector("#close").onclick = () => {
  nav.classList.remove("active");
};

window.onscroll = () => {
  nav.classList.remove("active");
};
//#endregion

// Theme
//#region 
let themeToggler = document.querySelector("#theme-toggler");

themeToggler.onclick = () => {
  themeToggler.classList.toggle("fa-sun");
  if (themeToggler.classList.contains("fa-sun")) {
    document.querySelector("body").classList.add("active3");
  } else {
    document.querySelector("body").classList.remove("active3");
  }
}
//#endregion

// API GET
//#region
const ul = document.querySelector(".text");
const list = document.createDocumentFragment();
const url = "https://jsonplaceholder.typicode.com/users";
fetch(url)
  .then(response => response.json())
  .then(data => {
    let show = data;
    let li;
    show.map(e => {
      li = document.createElement("li");

      let first = document.createElement("div");
      let second = document.createElement("div");

      let id = document.createElement("h2");
      let name = document.createElement("h3");
      let email = document.createElement("h4");
      let address = document.createElement("h4");
      let company = document.createElement("h4");
      
      first.innerHTML = `<img src="../images/R.png">`
      id.innerHTML = `ID : ${e.id}`;
      name.innerHTML = `Name : ${e.name}`;
      email.innerHTML = `Email : ${e.email}`;
      address.innerHTML = `City : ${e.address.city}`;
      company.innerHTML = `Company Name : ${e.company.name}`;
      // console.log(e);


      second.appendChild(id);
      second.appendChild(name);
      second.appendChild(email);
      second.appendChild(address);
      second.appendChild(company);
      li.appendChild(first);
      li.appendChild(second);
      list.appendChild(li);
    });
    ul.appendChild(list);
  });

//#endregion

// API POST_Comments
//#region 
fetch('https://api.freerealapi.com/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: "Mojtabaaaaa",
    })
  })
    .then(res => res.json())
    .then(json => {
      const {text, id} = json
      console.log(id)
      console.log(text)
      console.log(json)

    })
//#endregion


// API GET_Comments
//#region 
fetch('https://api.freerealapi.com/comments')
  .then(res => res.json())
  .then(json => {
    const {comments} = json;
    comments.map(e => {
      // console.log(e)
    })
    console.log(comments)
  })
//#endregion



