let chosenUser = []; //Global Variable
let resultA;    
    //Fetch Function
    const fetchUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/`).then(response => {
                    if(response.status !== 200) { // I got some error
                        console.log("error");
                    }
                    if(response.status === 404){
                        alert("user not found. Please enter a valid user")
                     }
                    //convert data
                    response.json().then(searchInput => {
                    chosenUser = searchInput; //sign the search result to Global Variavel
                    // localStorage.setItem('allUsers',JSON.stringify(chosenUser));

                    //Append the result in the html
                    for(let i=0; i<chosenUser.length;i++){
                        let displayInfo = document.createElement('span'); //create the element
                        displayInfo.innerHTML = `<br><div class="card">ID: ${chosenUser[i].id}<div>Name: ${chosenUser[i].name}<div>Username: ${chosenUser[i].username}</div><button class="submit btn btn-primary" onClick="deleteButton(this.value)" value="${i}" id="${i}deleteUser">Delete User</button>
                                <button class="submit btn btn-primary"  value="${i}" id="${i}editUser">Edit User</button><br>`;
                        document.getElementById("displayResult").appendChild(displayInfo);
                    }

                    }).catch(error => { // catch the error
                        console.log(error)
                    })
                })
        }
    const deleteButton=(x)=>{
        chosenUser.splice(x, 1);
        document.getElementById("displayResult").innerHTML = ""; // Clean the results
        for(let i=0; i<chosenUser.length;i++){
                let displayInfo = document.createElement('span'); //create the element
                displayInfo.innerHTML = `<br><div class="card">ID: ${chosenUser[i].id}<div>Name: ${chosenUser[i].name}<div>Username: ${chosenUser[i].username}</div><button class="submit btn btn-primary" onClick="deleteButton(this.value)" value="${i}" id="${i}deleteUser">Delete User</button>
                                <button class="submit btn btn-primary" value="${i}" id="${i}editUser">Edit User</button><br>`;
                document.getElementById("displayResult").appendChild(displayInfo);
        }
    }

    /* Function to search by ID number*/
    const searchID = (x)=>{
        document.getElementById("displayResult").innerHTML = ""; // Clean the results
        let displayInfo = document.createElement('span'); //create the element
        displayInfo.innerHTML = `<br><div class="card">ID: ${chosenUser[x].id}<div>Name: ${chosenUser[x].name}<div>Username: ${chosenUser[x].username}</div><button class="submit btn btn-primary" id="deleteUser">Delete User</button> <button class="submit btn btn-primary" id="editUser">Edit User</button><br>`;
        document.getElementById("displayResult").appendChild(displayInfo);
    }
    //Function for the search button
    const searchBtn = ()=> {
        //Grab the values from the form
        let nameuser= document.getElementById("userID").value;
        resultA = Number(nameuser); //Convert the input to number.
        let resultB = resultA-1; // input -1 becuase id start from 1, but the object start form 0.
        if(nameuser === "") {
            alert("Enter User ID")
        }
        if(resultA>chosenUser.length || resultA<1){
            document.getElementById("displayResult").innerHTML = "ID doesn't exist";
        } else {
            document.getElementById("displayResult").innerHTML = ""; // Clean the results
            searchID(resultB);
        }
    }
fetchUser();

const newUserButton = ()=> {
    document.getElementById("displayResult").innerHTML = ""; // Clean the results
    let displayNewUser = document.createElement('span'); //create the element
    displayNewUser.innerHTML = `<br><div class="card"><input type="text"  name="name" id="newName" placeholder="Name"/>
    <input type="text"  name="username" id="newUsername" placeholder="Username"/>
    <button class="submit btn btn-primary" onclick="event.preventDefault(); submitUser()" id="addUser">Create User</button><br>`;
    document.getElementById("displayNewUser").appendChild(displayNewUser);
}

//Manually input ID
//in button:
{/* <input type="number"  name="userID"d id="newUserID" placeholder="User ID"/> */}
//in submitUser Function:
// let newID= document.getElementById("newUserID").value;

const submitUser = ()=> {
    let newName= document.getElementById("newName").value;
    
    let newID = chosenUser.length+1;
    let newUsername= document.getElementById("newUsername").value;
    if(newName === "" || newUsername === ""){
        alert("Insert Valid Data")
    }else {
        let addedUser = {id:newID,name:newName,username:newUsername};
        chosenUser.push(addedUser)
        document.getElementById("displayNewUser").innerHTML = ""; // Clean the results
        for(let i=0; i<chosenUser.length;i++){
            let displayInfo = document.createElement('span'); //create the element
            displayInfo.innerHTML = `<br><div class="card">ID: ${chosenUser[i].id}<div>Name: ${chosenUser[i].name}<div>Username: ${chosenUser[i].username}</div><button class="submit btn btn-primary" onClick="deleteButton(this.value)" value="${i}" id="${i}deleteUser">Delete User</button>
            <button class="submit btn btn-primary"  value="${i}" id="${i}editUser">Edit User</button><br>`;
            document.getElementById("displayResult").appendChild(displayInfo);
        }
    }
}
