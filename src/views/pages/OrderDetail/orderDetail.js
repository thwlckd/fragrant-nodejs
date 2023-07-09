const payment = document.querySelector('#payment-amount');
payment.innerHTML = `총 결제금액 | 000,000원`;

const open = () => {
  document.querySelector('.modal').classList.remove('hidden');
};

const close = () => {
  document.querySelector('.modal').classList.add('hidden');
};

document.querySelector('.order-cancel-btn').addEventListener('click', open);
document.querySelector('.close-btn').addEventListener('click', close);
document.querySelector('.background').addEventListener('click', close);
// document.gquerySelector('modal').scrollTo(0, 0);
