//-------------------------------------+----------------------------------------
const getUsers = async (url) => {
  // TODO: implement more rigorous error handling

  const users = await fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err));

  return users;
}

const renderUsers = (users) => {
  /** TODO:
   * render in reverse order?
   */
  const e_userTmplt = document.querySelector('.user-wrapper');
  let   e_users = [];
  
  for (let i = 0; i < users.length; i++) {
    let e_newUser = e_userTmplt.cloneNode(true);

    e_newUser.id = users[i].id;
    e_newUser.querySelector('#name-of-user').innerHTML = `${users[i].name}`;
    e_newUser.querySelector('#username').innerHTML = `${users[i].username}`;
    e_newUser.querySelector('#user-email').innerHTML = `${users[i].email}`;
    e_newUser.style.display = 'block';
    e_userTmplt.after(e_newUser);
    e_users.push(e_newUser);
  }
  e_userTmplt.remove();

  return e_users;
}

const handleFilter = (e_users) => {
  /** TODO:
   * implement input validation
   * https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
   */
  const e_fltrBtn = document.getElementById('filter-btn');

  e_fltrBtn.addEventListener('click', (evt) => {
    console.log('WARNING: input value has not been validated.');
    const fltrByThis = document.getElementById('filter-by').value;

    for (let i = 0; i < e_users.length; i++) {
      if (e_users[i].id != fltrByThis) {
        e_users[i].style.display = 'none';
      }
    }
  })
}

const main = async () => {
  const dataEndPoint = 'https://jsonplaceholder.typicode.com/users';
  const e_users = renderUsers(await getUsers(dataEndPoint));
  handleFilter(e_users);
  // handleEdit();
  // handleDelete();
}

main();
