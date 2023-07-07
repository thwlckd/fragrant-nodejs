const url = "";

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

// .then(function (data) {
//     document.getElementById("id").value = data.email;
//     document.getElementById("name").value = data.userName;
//     document.getElementById("contact").value = data.phone;
//     document.getElementById("postcode").value = data.postalCode;
//     document.getElementById("address").value = data.address1;
//     document.getElementById("detail-address").value = data.address2;
//   });

//   .catch(function (error) {
//     console.log(error);
//     alert("Failed");
//   });

//카카오 주소 api 사용하여 주소 정보 입력
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

//onkeyup 이벤트를 사용하여 실시간 유효성 검사 진행 (예정)
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

    const name = document.getElementById("userName").value;
    const contact = document.getElementById("contact").value;
    const postCode = document.getElementById("postcode").value;
    const address = document.getElementById("address").value;
    const detailAddress = document.getElementById("detail-address").value;

    const data = {
      name: userName,
      contact: phone,
      postCode: postalCod,
      address: address1,
      detailAddress: address2,
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
