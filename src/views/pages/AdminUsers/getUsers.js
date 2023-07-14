import { $, $create, $append } from '/js/util/dom.js';

async function getUsers(url) {
  const users = await fetch(url);
  return users.json();
}

// const $deleteAllBtn = $('.delete-all');
// let deleteList = [];

// getUsers('/dummy/getUsers.json').then((res) => {
getUsers('/api/users').then((res) => {
  const $tbody = $('.main-tbody');

  const tdCreate = (data) => {
    const $td = $create('td', 'list', { title: data });
    $td.textContent = data;
    return $td;
  };
  const usersMap = res.map((data) => {
    // console.log(data);
    const $tr = $create('tr');

    const $email = tdCreate(data.email);
    // const $isAdmin = tdCreate(data.isAdmin);
    const $userName = tdCreate(data.userName);
    const $address = tdCreate(data.address ? Object.values(data.address).join(' ') : '');

    const $phone = tdCreate(data.phone || '');

    // const $select = $create('td', 'list');
    // const $checkbox = $create('input', '', { type: 'checkbox' });

    // $checkbox.addEventListener('click', () => {
    //   // console.dir($checkbox);
    //   if ($checkbox.checked) {
    //     deleteList.push($tr);
    //   } else {
    //     // console.log($tr.children[0].textContent)
    //     deleteList = deleteList.filter(
    //       (node) =>
    //         // console.log(node.children[0].textContent);
    //         $tr.children[0].textContent !== node.children[0].textContent,
    //     );
    //   }
    //   if (deleteList.length === 0) $deleteAllBtn.classList.remove('delete-all-visible');
    //   else $deleteAllBtn.classList.add('delete-all-visible');
    // });

    // $select.append($checkbox);

    const $userInfo = $create('td', 'list');
    const $userIcon = $create('img', '', { src: '/asset/icon/account.svg' });
    $userIcon.addEventListener('click', () => {
      const { _id } = data;
      window.location.href = `/admin/users/${_id}`;
    });
    $userInfo.append($userIcon);

    // const $delete = $create('td', 'list');
    // const $deleteIcon = $create('img', '', { src: '/asset/icon/delete.svg' });
    // $delete.append($deleteIcon);

    $append($tr, $email, $userName, $address, $phone,  $userInfo);

    return $tr;
  });

  $tbody.append(...usersMap);
});
