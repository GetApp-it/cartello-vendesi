import QRCode from 'qrcode';

/**
 * ref: https://datatracker.ietf.org/doc/html/rfc6350
 * @param {*} param0
 * @returns
 */
function createVCard({
  streetSelector,
  citySelector,
  nameSelector,
  surnameSelector,
  telSelector,
  desc1Selector,
  desc2Selector,
  desc3Selector,
}) {
  const street = document.getElementById(streetSelector);
  const city = document.getElementById(citySelector);
  const name = document.getElementById(nameSelector);
  const surname = document.getElementById(surnameSelector);
  const tel = document.getElementById(telSelector);
  const desc1 = document.getElementById(desc1Selector);
  const desc2 = document.getElementById(desc2Selector);
  const desc3 = document.getElementById(desc3Selector);

  if (
    street.value === '' &&
    city.value === '' &&
    name.value === '' &&
    surname.value === '' &&
    tel.value === '' &&
    desc1.value === '' &&
    desc2.value === '' &&
    desc3.value === ''
  ) {
    return null;
  }

  const vcardTemplate = `BEGIN:VCARD
VERSION:3.0
FN: {full_name}
TEL;TYPE=HOME,VOICE: {telephone}
NOTE:{desc1}
  {desc2}
  {desc3}
REV:2008-04-24T19:52:43Z
END:VCARD`
    .replace(/{full_name}/gi, `${name.value} ${surname.value}`.trim())
    .replace(/{telephone}/gi, tel.value.trim())
    .replace(/{street}/gi, street.value.trim())
    .replace(/{city}/gi, city.value.trim())
    .replace(/{desc1}/gi, desc1.value.trim())
    .replace(/{desc2}/gi, desc2.value.trim())
    .replace(/{desc3}/gi, desc3.value.trim());

  return vcardTemplate;
}

function createQrCode(canvas, vCard) {
  if (canvas) {
    const options = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 1,
      height: 130,
      width: 130,
      scale: 4,
    };

    QRCode.toCanvas(canvas, vCard, options, function (error) {
      if (error) console.error(error);
      console.log('success!');
    });
  }
}

export { createQrCode, createVCard };
