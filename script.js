function generateQR() {
  var qrName = document.getElementById('visitor-name').value.trim();
  var qrCompany = document.getElementById('visitor-company').value.trim();
  var qrPhoneNumber = document.getElementById('visitor-phone').value.trim();
  var qrEmail = document.getElementById('visitor-email').value.trim();

  // Validate visitor details
  if (qrName === '') {
    showError('Please enter the visitor name.');
    return;
  }

  if (qrCompany === '') {
    showError('Please enter the visitor company name.');
    return;
  }

  if (qrPhoneNumber === '') {
    showError('Please enter the visitor phone number.');
    return;
  } else if (qrPhoneNumber.length < 10 || qrPhoneNumber.length > 15) {
    showError('Please enter a valid phone number.');
    return;
  }

  if (qrEmail === '') {
    showError('Please enter the visitor email.');
    return;
  } else if (!isValidEmail(qrEmail)) {
    showError('Please enter a valid email address.');
    return;
  }

  // Create a random ID for the visitor pass
  var randomId = Date.now() + '_' + Math.floor(Math.random() * 1000);

  // Get the current date and time in the Asia/Tokyo timezone
  var currentDate = new Date();
  currentDate.setHours(currentDate.getHours());
  var formattedDateTime = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });

  // Encode the random ID for use in the QR code
  var encodedRandomId = encodeURIComponent(randomId);

  // Generate the QR code with the visitor pass details
  var qrText = "http://localhost:8000?id=" + encodedRandomId;
  var qr = new QRious({
    element: document.getElementById('qr-code'),
    value: qrText,
    size: 150, 
    level: "H"
  });

  // Display success message
  document.getElementById('success').innerHTML = 'Visitor Pass QR Code Generated';

  // Create a download link for the visitor pass image
  var downloadLink = document.getElementById('download-link');

  // Create a canvas to draw the visitor pass details and QR code
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  // Set canvas size
  canvas.width = 400;
  canvas.height = 500;

  // Apply background color
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the visitor pass details
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#000000';
  ctx.fillText('Company Name: Visitor Pass', 40, 30);
  ctx.font = '14px Arial';
  ctx.fillText('ID: ' + randomId, 20, 70);
  ctx.fillText('Name: ' + qrName, 20, 100);
  ctx.fillText('Company Name: ' + qrCompany, 20, 130);
  ctx.fillText('Phone Number: ' + qrPhoneNumber, 20, 160);
  ctx.fillText('Date: ' + formattedDateTime, 20, 190);

  // Draw the QR code
  var qrImage = new Image();
  qrImage.src = qr.toDataURL('image/png');
  qrImage.onload = function() {
    ctx.drawImage(qrImage, 100, 200, 200, 200); // Position and size of QR code

    // Convert canvas to data URL
    var dataURL = canvas.toDataURL('image/png');

    // Set download link attributes

    downloadLink.href = dataURL;
    downloadLink.style = 'btn btn-secondary';

    downloadLink.download = 'visitor_pass.png';
    downloadLink.textContent = 'Download Visitor Pass Image';
    downloadLink.style.display = 'inline-block';

    document.body.appendChild(downloadLink);
  };

  // Clear any previous error messages
  clearError();

  // Clear input fields
  document.getElementById('visitor-name').value = '';
  document.getElementById('visitor-company').value = '';
  document.getElementById('visitor-phone').value = '';
  document.getElementById('visitor-email').value = '';

}

// Function to display an error message
function showError(message) {
  document.getElementById('error').innerHTML = message;
}

// Function to clear the error message
function clearError() {
  document.getElementById('error').innerHTML = '';
}

// Function to validate email format
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
