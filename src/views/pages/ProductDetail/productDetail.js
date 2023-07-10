
// 밑이 수량 증감 수정본. 수량 증감에 따른 판매가가 보여짐
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const result = document.querySelector('#result');
const totalCost = document.querySelector('.totalCost');
let i = 1;
plus.addEventListener("click", () => {
  i += 1
  result.textContent = i;
  const totalCostNum = i * 200000;
  totalCost.textContent = `₩${  totalCostNum.toLocaleString()}`;
})
minus.addEventListener('click', () => {
  if (i > 0) {
  i -= 1;
  result.textContent = i;
  const totalCostNum = i * 200000;
  totalCost.textContent = `₩${  totalCostNum.toLocaleString()}`;
  } else {
    totalCost.textContent = `₩${  0}`; // 판매가
  }
});

// 장바구니에 넣었습니다라는 alert 창 띄우기, 이미 장바구니에 담긴 거면 이미 장바구니에 담겨있습니다라는 alert 창

// 구매하기 버튼 눌렀을 때 구매창 url 받아서 이동


// 별점 구현

// 리뷰 업로드 함수.

