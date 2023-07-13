import { $ } from '/js/util/dom.js';
import { check } from '/js/util/validate.js';
import { guideMsg } from '/js/util/constant.js';

const $postCode = $('#post-code');
const $address1 = $('#address1');
const $address2 = $('#address2');
const $addressMsg = $('#requirement');

const popupApi = () => {
  new daum.Postcode({
    oncomplete: ({ zonecode, address }) => {
      $postCode.value = zonecode;
      $address1.value = address;
      $address2.value = '';

      $address2.readOnly = false;
      check.address = false;
      $address2.focus();
    },
  }).open();
};

$('#btn-address-api').addEventListener('click', popupApi);
$postCode.addEventListener('click', popupApi);
$address1.addEventListener('click', popupApi);

const listRenderer = () => {};
