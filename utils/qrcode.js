const qrcode = require("qrcode");
const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");

const qrcodeGenerator = async (payload) => {
  const code = await qrcode.toDataURL(payload);
  return code;
};

const qrcodeWithBottomText = async (empId, name, line1, line2,label1,label2) => {
  // Configuration
  const text1 = `${label1}${line1}`;
  const text2 = `${label2}${line2}`;
  const fontSize = 8; // Font size of the text
  const margin = 10; // Margin between QR code and text
  const lineSpacing = 5; // Spacing between the two lines of text
  const backgroundColor = "white"; // Background color for the text
  const canvasBackgroundColor = "white"; // Background color for the canvas
  const textColor = "black"; // Text color
  const qrCodeText = `${empId}, ${name}`; // Text to encode in the QR code
  const qrCodeSize = 200; // Size of the QR code

  try {
    // Generate the QR code
    const qrDataUrl = await QRCode.toDataURL(qrCodeText, {
      width: qrCodeSize,
      margin: 3,
    });

    // Load the QR code image
    const qrImage = await loadImage(qrDataUrl);
    const canvasHeight = qrCodeSize + margin + fontSize * 2 + lineSpacing;

    // Create a canvas
    const canvas = createCanvas(qrCodeSize, canvasHeight);
    const ctx = canvas.getContext("2d");

    // Set the background color for the canvas
    ctx.fillStyle = canvasBackgroundColor;
    ctx.fillRect(0, 0, qrCodeSize, canvasHeight);

    // Draw the QR code onto the canvas
    ctx.drawImage(qrImage, 0, 0, qrCodeSize, qrCodeSize);

    // Set text properties
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";

    // Calculate text positions
    const textY1 = qrCodeSize + margin + fontSize / 2;
    const textY2 = textY1 + fontSize + lineSpacing;

    // Calculate the width of the text
    const textWidth1 = ctx.measureText(text1).width;
    const textWidth2 = ctx.measureText(text2).width;

    // Draw background rectangles for the text
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(
      (qrCodeSize - textWidth1) / 2 - 2,
      textY1 - fontSize,
      textWidth1 + 4,
      fontSize + 4
    );
    ctx.fillRect(
      (qrCodeSize - textWidth2) / 2 - 2,
      textY2 - fontSize,
      textWidth2 + 4,
      fontSize + 4
    );

    // Set fill style for the text again
    ctx.fillStyle = textColor;

    // Add first line of text below the QR code
    ctx.fillText(text1, qrCodeSize / 2, textY1);

    // Add second line of text below the first line
    ctx.fillText(text2, qrCodeSize / 2, textY2);

    // Convert buffer to base64
    const buffer = canvas.toBuffer("image/jpeg");
    const base64Image = buffer.toString("base64");
    const dataUri = `data:image/png;base64,${base64Image}`;

    // console.log("Base64 encoded image:", dataUri);

    return dataUri;
  } catch (err) {
    console.error("Error:", err);
  }
};
module.exports = { qrcodeGenerator, qrcodeWithBottomText };
