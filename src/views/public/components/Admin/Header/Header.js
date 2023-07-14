import { headerFetch } from '../../../js/util/admin.js';
import { $ } from '../../../js/util/dom.js';

const render = async () => {
  const { $head, $header, $closeBtn } = await headerFetch();

  document.head.append($head);
  $('#app').prepend($closeBtn);
  $('#app').prepend($header);

  const $headerClostBtn = $('.header-close-btn');
  $headerClostBtn.addEventListener('click', () => {
    $header.classList.toggle('header-off');
  });

  const $logout = $('#logout');
  $logout.addEventListener('click', async () => {
    await fetch('/api/auth/sign-out', {
      method: 'POST',
    });
    alert("로그아웃 되었습니다");
    window.location.href = "/admin/login/"
  });

  // 임시코드
  // $header.classList.add('header-off');
};

render();
