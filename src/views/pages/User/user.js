async function getOrderList() {
  const orders = await fetch("/orders/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODg4MjY2OTJ9.h30XrRfX7cAuwfvGgyxB5e6DTB-WLaCeQVbhH_NaXwQ",
    },
  });
  if (orders.ok) {
    return orders.json();
  } else {
    throw new Error("Failed.");
  }
}

async function displayOrderList() {
  const orderList = await getOrderList();

  console.log(orderList);

  // 주문 내역 데이터를 리스트에 추가
  const orderListDiv = document.getElementById("order-history-list");

  for (let i = 0; i < orderList.length; i++) {
    const orderItem = orderList[i];
    const products = orderItem.products;

    const paymentUnit = orderItem.price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let productName = products[0].name;
    if (products.length > 1) {
      productName += " 외 " + (products.length - 1) + " 건";
    }

    let listItem = document.createElement("li");
    listItem.innerHTML = `<div class="order-list"> 
      <div class="order-header">
        <p class="order-date">${orderItem.createdAt}</p>
        <a class="view-order-detail" href="../orders/:orderId">
          주문내역 상세보기
        </a>
      </div>
      <div class="order-list-1">
        <div class="order-list-component">
          <a href="/products/:productId">
            <img
              class="product-image"
              src="/asset/perfume/red_elice.png"
              style="width: 100px; height: 100px"
            />
          </a>
          <div class="order-info">
            <div class="order-contents-value">상품명<span>${productName}</span>
      </div>
            <div class="order-contents-value">주문번호<span>${orderItem._id}</div>
            <div class="order-contents-value">결제금액<span>${paymentUnit} 원</span></div>
          </div>
          <div class="order-status-box">
            <p class="order-status">${orderItem.orderStatus}</p>
            <button type="button"  class="order-cancel">
              주문취소
            </button>
          </div>
        </div>
      </div>
    </div>`;
    orderListDiv.appendChild(listItem);

    // let btnOrderCancel = document.querySelector(".order-cancel");
    // btnOrderCancel.classList.add("order-cancel-hidden");
  }
}

displayOrderList();
