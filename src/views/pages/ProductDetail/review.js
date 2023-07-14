import { $, $create, $append } from '/js/util/dom.js';

fetch('/api/auth/is-sign-in').then((res) => {
  if (!res.ok) {
    $('.write_box').remove();
  }
});

const productId = window.location.pathname.split('/').slice(-2)[0];

let page = 1;

const $reviewList = $('#reviews');
const $reviewTitle = $('#reviews-title');
const $write = $('#submitBtn');
const $newReview = $('#commentText');

const getReviews = async (paged) => {
  const { reviews, totalPage, total } = await fetch(`/api/reviews/${productId}?page=${paged}`).then(
    (res) => res.json(),
  );

  return { reviews, totalPage, total };
};

const reviewsRenderer = async () => {
  const { reviews, totalPage, total } = await getReviews(page);
  if ($('.next')) $('.next').remove();

  if (totalPage === 0) {
    const $li = $create('li', 'no-result');
    $li.textContent = '등록 된 리뷰가 없습니다.';
    $reviewList.append($li);
  } else {
    const $cnt = $create('span', 'review-cnt');
    $cnt.textContent = total;
    const $text = document.createTextNode(' 개의 리뷰');

    $reviewTitle.replaceChildren($cnt, $text);

    const $fragment = document.createDocumentFragment();

    reviews.forEach(({ author, comment }) => {
      const $item = $create('li', 'review-item');
      const $author = $create('span', 'author');
      $author.textContent = author;

      const $comment = $create('p', 'review');
      $comment.textContent = comment;

      $append($item, $author, $comment);
      $append($fragment, $item);
    });

    if (totalPage > page) {
      page += 1;
      const $next = $create('li', 'next');
      $next.textContent = '이전 리뷰 더보기';
      const nextHandler = async () => {
        await reviewsRenderer(page);
        $next.removeEventListener('click', nextHandler);
      };
      $next.addEventListener('click', nextHandler);
      $append($fragment, $next);
    }

    $reviewList.append($fragment);
  }
};

reviewsRenderer();

$write.addEventListener('click', async () => {
  if ($newReview.value.length < 10) {
    alert('10글자 이상 적어주세요.');
  } else {
    await fetch(`/api/reviews/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: $newReview.value,
      }),
    }).then((res) => {
      if (res.ok) {
        window.location.reload();
      }
    });
  }
});
