import QRCode from 'qrcode';

function createQrCode(canvas) {
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

    const vcardTemplate = `BEGIN:VCARD
VERSION:3.0
FN:Forrest Gump
TEL;TYPE=HOME,VOICE:(404) 555-1212
ADR;TYPE=HOME:;;42 Plantation St.;Baytown;LA;30314;United States of America
EMAIL:forrestgump@example.com
REV:2008-04-24T19:52:43Z
END:VCARD`;

    QRCode.toCanvas(canvas, vcardTemplate, options, function (error) {
      if (error) console.error(error);
      console.log('success!');
    });
  }
}

export { createQrCode };

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
