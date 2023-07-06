// Get the logged-in user's information using a GET request
const url = "/users/:userId"; // Replace with your server-side endpoint
fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to retrieve user information.");
    }
  })
  .then(function (data) {
    // Fill the input fields with the retrieved user information
    document.getElementById("id").value = data.id;
    document.getElementById("name").value = data.name;
    document.getElementById("contact").value = data.contact;
    document.getElementById("address").value = data.address;
    document.getElementById("detail-address").value = data.detailAddress;
  })
  .catch(function (error) {
    console.log(error);
    alert("Failed");
  });

document
  .getElementById("address-button")
  .addEventListener("click", function () {
    new daum.Postcode({
      oncomplete: function (data) {
        document.getElementById("address").value = data.address;
        document.getElementById("detail-address").focus();
      },
    }).open();
  });

document
  .getElementById("update-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const address = document.getElementById("address").value;
    const detailAddress = document.getElementById("detail-address").value;

    // Perform AJAX request to update the user information on the server
    // Replace the URL with your server-side endpoint
    const data = {
      name: name,
      contact: contact,
      address: address,
      detailAddress: detailAddress,
    };

    // Send the data to the server using the Fetch API
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
