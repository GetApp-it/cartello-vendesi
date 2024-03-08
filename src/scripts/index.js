import _ from 'lodash';
import printMe from './print.js';
import * as QrCodeManager from './qr-code.js';

// load styles
import '../styles/style.scss';

// load images
import faviconImage from '../images/favicon.png';
import shareImage from '../images/share.jpg';
import qrcodeImage from '../images/qr-code.jpg';
import arrowImage from '../images/arrow.svg';
import saleSignImage from '../images/sale-sign.svg';
import saleSignNoQrcImage from '../images/sale-sign-no-qrc.svg';
import introImage from '../images/intro-img.svg';
import introQrImage from '../images/intro-img-qr.jpg';
import favicong from '../images/favicon.ico';

function onQrCodeSwitcherChange(event) {
  const qrcodeElements = document.getElementById('qrcode-elements');
  const saleSign = document.getElementById('cartello');
  if (event.target.checked) {
    qrcodeElements.classList.remove('hidden');
    saleSign.classList.remove('no-qr');
  } else {
    qrcodeElements.classList.add('hidden');
    saleSign.classList.add('no-qr');
  }
}

function createQrCode(qrcodeElementSelectors) {
  const vCard = QrCodeManager.createVCard(qrcodeElementSelectors);
  console.log('vCard', vCard);

  const qrcode = document.getElementById('qrcode');
  const qrcodePlaceholder = document.getElementById('qrcode-placeholder');

  if (!vCard) {
    qrcodePlaceholder.classList.remove('hidden');
    qrcode.classList.add('hidden');
  } else {
    QrCodeManager.createQrCode(qrcode, vCard);
    console.log('QrCodeManager.createQrCode');
    qrcodePlaceholder.classList.add('hidden');
    qrcode.classList.remove('hidden');
  }
}

function bindEvents() {
  document.getElementById('btn-print').addEventListener('click', printMe);
  document.getElementById('btn-print-ex').addEventListener('click', printMe);

  const saleSignElementSelectors = [
    'name',
    'surname',
    'tel',
    'desc1',
    'desc2',
    'desc3',
  ];
  saleSignElementSelectors.forEach((element) => {
    document.getElementById(element).addEventListener('keyup', function () {
      document.getElementById(`${element}-show`).innerHTML = this.value;
    });
  });

  // Show/Hide qrcode
  document
    .getElementById('qrcode-switcher')
    .addEventListener('change', onQrCodeSwitcherChange);

  const qrcodeElementSelectors = {
    streetSelector: 'qrcode-elements-street',
    citySelector: 'qrcode-elements-city',
    nameSelector: 'name',
    surnameSelector: 'surname',
    telSelector: 'tel',
  };

  Object.entries(qrcodeElementSelectors).forEach(([, selector]) => {
    document.getElementById(selector).addEventListener(
      'keyup',
      _.debounce(function (event) {
        createQrCode(qrcodeElementSelectors);
      }, 300)
    );
  });
}

function init() {
  console.log('init');

  // Show content only when page is loaded
  document.body.style = 'display: auto';

  // binding
  bindEvents();
}

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
