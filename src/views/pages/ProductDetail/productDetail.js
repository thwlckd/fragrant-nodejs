//상품 수량 늘리는 버튼 아직 미완!ㅂ
function count(type)  {

    const resultElement = document.getElementsByClassName('num');
    
    let number = resultElement.innerText;
    
    if(type === 'plus') {
      number = parseInt(number) + 1;
    }else if(type === 'minus')  {
      number = parseInt(number) - 1;
    }
    

    resultElement.innerText = number;
  }

//장바구니버튼 눌렀을때 장바구니로 이동,
//구매하기버튼 눌렀을 때 결제하는 곳으로 이동
//둘 다 로그인했는지 체크하고 false시 alert()팝업창 띄우기












//리뷰 작성칸/현재 시간(연월일 시분), username, 댓글 최솟값설정10자, 등록하면 리뷰창에 올라가기
//별점
const drawStar = (target) => {
    document.querySelector('.star span').style.width = `${target.value * 10}%`;
}


