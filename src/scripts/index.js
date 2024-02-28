import _ from 'lodash';
import printMe from './print.js';
import * as QrCodeManager from './qr-code.js';

// load styles
import '../styles/style.scss';

// load images
import qrcodeImage from '../images/qr-code.jpg';
import arrowImage from '../images/arrow.svg';
import saleSignImage from '../images/sale-sign.svg';
import introImage from '../images/intro-img.svg';
import introImageQr from '../images/intro-img-qr.jpg';

function bindEvents() {
  document.getElementById('btn-print').addEventListener('click', printMe);
  document.getElementById('btn-print-ex').addEventListener('click', printMe);

  const saleSignElements = [
    'name',
    'surname',
    'tel',
    'desc1',
    'desc2',
    'desc3',
  ];
  saleSignElements.forEach((element) => {
    document.getElementById(element).addEventListener('keyup', function () {
      document.getElementById(`${element}-show`).innerHTML = this.value;
    });
  });
}

function init() {
  console.log('init');

  // Show content only when page is loaded
  document.body.style = 'display: auto';

  // binding
  bindEvents();

  // Create Default QRCode
  QrCodeManager.createQrCode(document.getElementById('qrcode'));
}

// $('#nome').keyup(function () {
//   $('#nome-show').text($(this).val());
// });
// $('#cognome').keyup(function () {
//   $('#cognome-show').text($(this).val());
// });
// $('#tel').keyup(function () {
//   $('#tel-show').text($(this).val());
// });
// $('#desc1').keyup(function () {
//   $('#desc1-show').text($(this).val());
// });
// $('#desc2').keyup(function () {
//   $('#desc2-show').text($(this).val());
// });
// $('#desc3').keyup(function () {
//   $('#desc3-show').text($(this).val());
// });

window.onload = init;

// function component() {
//   const element = document.createElement('div');
//   const btn = document.createElement('button');

//   // Lodash, now imported by this script
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   btn.innerHTML = 'Click me and check the console!!!';
//   btn.onclick = printMe;

//   element.appendChild(btn);

//   return element;
// }

// document.body.appendChild(component());
