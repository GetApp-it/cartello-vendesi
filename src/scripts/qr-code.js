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
}) {
  const street = document.getElementById(streetSelector);
  const city = document.getElementById(citySelector);
  const name = document.getElementById(nameSelector);
  const surname = document.getElementById(surnameSelector);
  const tel = document.getElementById(telSelector);

  if (
    street.value === '' &&
    city.value === '' &&
    name.value === '' &&
    surname.value === '' &&
    tel.value === ''
  ) {
    return null;
  }

  const vcardTemplate = `BEGIN:VCARD
VERSION:3.0
FN: {full_name}
TEL;TYPE=HOME,VOICE: {telephone}
REV: ${new Date().toISOString()}
END:VCARD`
    .replace(/{full_name}/gi, `${name.value} ${surname.value}`.trim())
    .replace(/{telephone}/gi, tel.value.trim())
    .replace(/{street}/gi, street.value.trim())
    .replace(/{city}/gi, city.value.trim());

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
