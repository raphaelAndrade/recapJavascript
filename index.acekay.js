//-------------------------------------+----------------------------------------
const getUsers = async (url) => {
  // TODO: implement more rigorous error handling

  const users = await fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err));

  return users;
}

const renderUsers = (users) => {
  const e_userTmplt = document.getElementById('user-wrapper');
  
  for (let i = 0; i < users.length; i++) {
    let e_newUser = e_userTmplt.cloneNode(true);

    e_newUser.querySelector('#name-of-user').innerHTML = `${users[i].name}`;
    e_newUser.querySelector('#username').innerHTML = `${users[i].username}`;
    e_newUser.querySelector('#user-email').innerHTML = `${users[i].email}`;
    e_newUser.style.display = 'block';
    e_userTmplt.after(e_newUser);
  }
}

const main = async () => {
  const dataEndPoint = 'https://jsonplaceholder.typicode.com/users';

  renderUsers(await getUsers(dataEndPoint));
  // handleFilter();
  // handleEdit();
  // handleDelete();
}

main();
