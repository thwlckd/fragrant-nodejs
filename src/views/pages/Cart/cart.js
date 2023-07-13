
const checkBoxOnOff = (items) => {
  const allCheckBox = document.querySelector('#allCheck-box');
 
  allCheckBox.addEventListener('change', async () => {
    const selectCheckBoxs = document.querySelectorAll('.selectCheck');
    if (allCheckBox.checked) {
      selectCheckBoxs.forEach((box) => {
        box.checked = true;
      });
    } else {
      selectCheckBoxs.forEach((box) => {
        box.checked = false;

      });
    }
  });
};

// 상품 삭제
const deleteLocalItem = async () => {
  
  if (isLogin) {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }
    } catch (error) {
      alert(error, '요청을 실패했습니다');
    }
  } else {
    const items = JSON.parse(localStorage.getItem('#')) || '';
    const values = Object.values(items);
    if (items) {
      const updateditems = values.filter((obj) => obj.id !== id);
      localStorage.setItem('carts', JSON.stringify(updateditems));
    }
  }

  window.location.reload();
};

// 상품 갯수 빼기
const minuscountItem = async (id, isLogin) => {
  if (isLogin) {
    try {
      const response = await fetch(`/api/user/cart/${id}/decrease`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }
    } catch (error) {
      alert(error, '요청을 실패했습니다');
    }
  } else {
    const books = JSON.parse(localStorage.getItem('carts')) || '';
    const values = Object.values(books);
    if (books) {
      const filteredBooks = values.filter((obj) => obj.id !== id);
      const findBook = values.find((obj) => obj.id == id);
      const index = values.findIndex((item) => item == findBook);
      const updatedBook =
        findBook.quantity > 1
          ? { ...findBook, quantity: findBook.quantity - 1 }
          : findBook;
      filteredBooks.splice(index, 0, updatedBook);
      localStorage.setItem('carts', JSON.stringify(filteredBooks));
    }
  }
  location.reload();
};

// 상품 갯수 더하기
const plusQuantityItem = async (id, isLogin) => {
  if (isLogin) {
    try {
      const response = await fetch(`/api/user/cart/${id}/increase`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }
    } catch (error) {
      alert(error, '요청을 실패했습니다');
    }
  } else {
-     const books = JSON.parse(localStorage.getItem('carts')) || '';
    const values = Object.values(books);
    if (books) {
      const filteredBooks = values.filter((obj) => obj.id !== id);
      const findBook = values.find((obj) => obj.id == id);
      const index = values.findIndex((item) => item == findBook);
      const updatedBook = { ...findBook, quantity: findBook.quantity + 1 };
      filteredBooks.splice(index, 0, updatedBook);
      localStorage.setItem('carts', JSON.stringify(filteredBooks));
    }
  }
  location.reload();
};

// 총 금액 계산
const paymentResult = (total) => {
  const totalPre = document.querySelector('.subCost');
  const totalPrice = document.querySelector('.totalCost');
 
  if (total == 0) { 
    totalPrice.textContent = `0원`;
    totalPre.textContent = `0원`;
    return;
  } else if (total < 100000) {
    totalPrice.textContent = `${total}원`;
    totalPre.textContent = `${total + 2500}원`;
    return;
  } else {
    totalPrice.textContent = `${total}원`;
    totalPre.textContent = `${total}원`;
  }
};


// 로컬스토리지에서 카트 정보 가져오기
const getitemsFromLocalStrorage = () => {
  const items = JSON.parse(localStorage.getItem('items'));
  return items;
};

window.addEventListener('load', async () => {
  const isLogin = getTokenFromCookie();
  const cartData =
    (isLogin ? await getCartFromDB() : getCartFromLocalStrorage()) ?? [];
  const ul = document.querySelector('.cart-list');
  checkBoxOnOff(cartData);

  let totalPrice = 0;

  if (cartData.length > 0) {
    const promises = cartData.map(async (book) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'cart-item');
      li.setAttribute('id', book.id);

      try {
        const response = await fetch(`/api/product/${book.id}`);
        if (!response.ok) {
          throw new Error(`DB에 해당 상품이 없습니다. id: ${book.id}`);
        }
        const bookData = await response.json();
        totalPrice += parseInt(bookData.price) * book.quantity;
        bookData.quantity = book.quantity;
        li.innerHTML = itemTemplate(bookData);

        // 버튼 이벤트
        li.querySelector('#deleteBtn').addEventListener('click', () =>
          deleteLocalItem(book.id, isLogin)
        );
        li.querySelector('#plusBtn').addEventListener('click', () =>
          plusQuantityItem(book.id, isLogin)
        );
        li.querySelector('#minusBtn').addEventListener('click', () =>
          minusQuantityItem(book.id, isLogin)
        );

        ul.append(li);
      } catch (error) {
        // DB에 해당 상품id가 없으면 로컬 스토래지에서도 삭제
        const books = getCartFromLocalStrorage();
        const updatedBooks = books.filter((b) => b.id !== book.id);
        localStorage.setItem('carts', JSON.stringify(updatedBooks));
      }
    });

    await Promise.all(promises);
  }

  paymentResult(totalPrice);
});








// 구매하기 버튼 눌렀을 때
buyBtn.addEventListener('click', () => {
 
  if (res.status) {
    const selectedCheckboxes = document.querySelectorAll(
      '.selectCheck:checked'
    );
    const selectedItems = Array.from(selectedCheckboxes).map((checkbox) => ({
      name: checkbox.dataset.name,
      capacity: checkbox.dataset.capacity,
      cntPrice: checkbox.dataset.cntPrice,
      count: checkbox.dataset.count,
      totalprice: checkbox.dataset.totalPrice,
    }));

    // localStorage에 저장
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    // 주문 페이지로 이동
    window.location.href = '/##';
  }
  if (!getTokenFromCookie()) {
    alert('로그인 상태가 아닙니다.');
    res.redirect('/login')
  }
});









// 수량 증감 버튼
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const result = document.querySelector('#result');
const priceCost = document.querySelector('.priceCost');

let i = 0;

plus.addEventListener('click', () => {
  i += 1;
  result.textContent = i;
  const totalCostNum = i * 20;
  priceCost.textContent = `\u00a0 ${totalCostNum.toLocaleString()}`;
});

minus.addEventListener('click', () => {
  if (i > 0) {
    i -= 1;
    result.textContent = i;
    const totalCostNum = i * 20;
    priceCost.textContent = `\u00a0 ${totalCostNum.toLocaleString()}`;
  } else {
    priceCost.textContent = `\u00a0 ${0}`; // 판매가
  }
});
