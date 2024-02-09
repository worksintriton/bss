const qrcode = require("qrcode");

const qrcodeGenerator = async (payload) => {
  const code = await qrcode.toDataURL(payload);
  return code;
};

module.exports = { qrcodeGenerator };
