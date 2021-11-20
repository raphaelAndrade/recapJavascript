/*Create function to fetch the data
  EndPoint: https://jsonplaceholder.typicode.com/users
*/
let listUsers = null; //Global Variable
const fetchUser = () => {
    fetch("https://jsonplaceholder.typicode.com/users").then(response => {
        if(response.status !== 200){ // check if the response status is good
            console.log("Error");
        }
        if(response.status === 404) {
            alert("It looks like you are lost! Try again");
        }

        response.json().then(data => {
            listUsers = data;
            let list = document.getElementById("listUsers");
            let item = null;
            listUsers.map(user => {
              item = document.createElement("li");
              item.innerHTML = userCardTemplateHTML(user);
              list.append(item)
            })
        })
    })
}

//Create the function to filter users
const filterUsers = () => {
    let userId = document.getElementById("filterUser").value;
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(response => {
        if(response.status !== 200){ // check if the response status is good
            console.log("Error");
        }
        if(response.status === 404) {
            alert("It looks like you are lost! Try again");
        }
        response.json().then(user => {
            let list = document.getElementById("listUsers");
            list.innerHTML = "";
            let item = null;
            item = document.createElement("li");
            item.innerHTML = userCardTemplateHTML(user);
            list.append(item)
        })
    })
}

const deleteUser = (elm) => {
  const toDelete = document.querySelector(`#user-card-${elm.value}`);
  toDelete.style.display = 'none';
}

const userCardTemplateHTML = (user) => `
  <div class="card" id="user-card-${user.id}">
    <ul>
      <li>name: ${user.name}</li>
      <li>email: ${user.email}</li>
      <li>username: ${user.username}</li>
      <button type="button" class="btn btn-info">Edit</button>
      <button type="button" value=${user.id} class="btn btn-warning" onclick="deleteUser(this)">delete</button>
    </ul>
  </div>
`;

fetchUser()
