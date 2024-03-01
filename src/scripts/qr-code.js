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
ADR;TYPE=HOME:;;{street};{city};
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

  // EMAIL:forrestgump@example.com

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
      // color: {
      //   dark: '#010599FF',
      //   light: '#FFBF60FF',
      // },
    };

    QRCode.toCanvas(canvas, vCard, options, function (error) {
      if (error) console.error(error);
      console.log('success!');
    });
  }
}

export { createQrCode, createVCard };

/*
BEGIN:VCARD
VERSION:3.0
N:Gump;Forrest;;Mr.;
FN:Forrest Gump
ORG:Bubba Gump Shrimp Co.
TITLE:Shrimp Man
PHOTO;TYPE=JPEG;VALUE=URI:https://upload.wikimedia.org/wikipedia/commons/8/87/My_Dog_%2861220578%29.jpeg
TEL;TYPE=WORK,VOICE:(111) 555-1212
TEL;TYPE=HOME,VOICE:(404) 555-1212
ADR;TYPE=WORK,PREF:;;100 Waters Edge;Baytown;LA;30314;United States of America
LABEL;TYPE=WORK,PREF:100 Waters Edge\nBaytown\, LA 30314\nUnited States of America
ADR;TYPE=HOME:;;42 Plantation St.;Baytown;LA;30314;United States of America
LABEL;TYPE=HOME:42 Plantation St.\nBaytown\, LA 30314\nUnited States of America
EMAIL:forrestgump@example.com
REV:2008-04-24T19:52:43Z
END:VCARD
*/
