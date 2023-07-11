import { $ } from '/js/util/dom.js';
import { check } from '/js/util/validate.js';

import { guideMsg } from '/js/util/constant.js';

const $postalCode = $('#postalCode');
const $address1 = $('#address1');
const $address2 = $('#address2');
const $addressMsg = $('.input-address small');

$('#address-search').addEventListener('click', () => {
  new daum.Postcode({
    oncomplete: (data) => {
      $postalCode.value = data.zonecode;
      $address1.value = data.address;
      $address2.value = '';

      $address2.readOnly = false;
      check.address = false;
      $addressMsg.textContent = guideMsg.ADDR_DETAIL_ADD_MSG.msg;
      $addressMsg.style.color = guideMsg.ADDR_DETAIL_ADD_MSG.color;
      $address2.focus();
    },
  }).open();
});
