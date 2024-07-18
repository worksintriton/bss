const qrcode = require("qrcode");
const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");

const qrcodeGenerator = async (payload) => {
  const code = await qrcode.toDataURL(payload);
  return code;
};

const qrcodeWithBottomText = async (empId, name) => {
  // Configuration
  const text = `EMPID:${empId}, Name:${name}`;
  const qrData = `${empId}`;
  const qrCodeSize = 400; // Size of the QR code
  const fontSize = 20; // Font size of the text
  const margin = -20; // Margin between QR code and text

  // Calculate total height for canvas (QR code + margin + text)
  const canvasHeight = qrCodeSize + margin + fontSize;

  // Create a canvas
  const canvas = createCanvas(qrCodeSize, canvasHeight);
  const ctx = canvas.getContext("2d");

  // Generate QR code
  QRCode.toCanvas(
    createCanvas(qrCodeSize, qrCodeSize),
    qrData,
    { width: qrCodeSize },
    (error, qrCanvas) => {
      if (error) {
        console.error("Error generating QR code:", error);
        return;
      }

      // Draw QR code on the main canvas
      ctx.drawImage(qrCanvas, 0, 0, qrCodeSize, qrCodeSize);

      // Set text properties
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.fillStyle = "black";

      // Add text below the QR code
      ctx.fillText(text, qrCodeSize / 2, qrCodeSize + margin + fontSize / 2);

      // Save the result to a file
      const buffer = canvas.toBuffer("image/png");
      // fs.writeFileSync("qr_code_with_text.png", buffer);
      console.log("QR code with text has been generated.");
      const dataUri = `data:image/png;base64,${buffer.toString("base64")}`;
      return dataUri;
    }
  );
};
module.exports = { qrcodeGenerator, qrcodeWithBottomText };
