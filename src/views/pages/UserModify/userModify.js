const url = "/users/1";
fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
}).then(function (response) {
  if (response.ok) {
    // console.log(response.body.json());
    return response.json();
  } else {
    throw new Error("Failed.");
  }
});
/*
  .then(function (data) {
    document.getElementById("id").value = data.id;
    document.getElementById("name").value = data.name;
    document.getElementById("contact").value = data.contact;
    document.getElementById("postcode").value = data.postcode;
    document.getElementById("address").value = data.address;
    document.getElementById("detail-address").value = data.detailAddress;
  });
  */
/*
  .catch(function (error) {
    console.log(error);
    alert("Failed");
  });
  */

document
  .getElementById("address-button")
  .addEventListener("click", function () {
    new daum.Postcode({
      oncomplete: function (data) {
        console.log(data);
        document.getElementById("postcode").value = data.zonecode;
        document.getElementById("address").value = data.address;
        document.getElementById("detail-address").focus();
      },
    }).open();
  });

//회원탈퇴 모달
const open = () => {
  document.querySelector(".modal").classList.remove("hidden");
};

const close = () => {
  document.querySelector(".modal").classList.add("hidden");
};

document.querySelector(".delete-account-btn").addEventListener("click", open);
document.querySelector(".close-btn").addEventListener("click", close);
document.querySelector(".background").addEventListener("click", close);
document.gquerySelector("modal").scrollTo(0, 0);

//onkeyup 이벤트를 사용하여 실시간 유효성 검사 진행
// document.getElementById("password-new-confirm").onkeyup = function () {
//   var msg = "",
//     val = this.value;
//   if (val.length > 7) {
//     msg = GetAjaxPW(val);
//   } else {
//     msg = "비밀번호는 8자 이상의 영문으로 입력해주세요.";
//   }
//   document.getElementById("password-noti-1").textContent = msg;
// };

// const GetAjaxPW = function (val) {
//   return val + " 사용가능한 비밀번호입니다.";
// };

document
  .getElementById("update-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const address = document.getElementById("address").value;
    const detailAddress = document.getElementById("detail-address").value;

    const data = {
      name: name,
      contact: contact,
      address: address,
      detailAddress: detailAddress,
    };

    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.ok) {
          alert("회원정보가 성공적으로 수정되었습니다.");
        } else if (!detailAddress) {
          alert("상세 주소를 입력해주세요.");
        } else {
          alert("회원정보 수정에 실패했습니다.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      });
  });
