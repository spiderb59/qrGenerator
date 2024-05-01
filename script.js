function generateQR() {
      var qrText = document.getElementById('qr-text').value;
      if (qrText === '') {
        document.getElementById("error").style.display = "block";
        document.getElementById('error').innerHTML = 'Please enter URL to generate QR code.';
        return;
      }

      var qrSize = parseInt(document.getElementById('qr-size').value);
      var qrColor = document.getElementById('qr-color').value;
      var qrBackgroundColor = document.getElementById('qr-background-color').value;
      var qrErrorCorrection = document.getElementById('qr-error-correction').value;

      var qr = new QRious({
        element: document.getElementById('qr-code'),
        value: qrText,
        size: qrSize,
        foreground: qrColor,
        background: qrBackgroundColor,
        level: qrErrorCorrection
      });

      document.getElementById('success').innerHTML = 'QR Code Generated for: '+qrText;
      document.getElementById("success").style.display = "block";
  
      var downloadLink = document.getElementById('download-link');
      downloadLink.href = document.getElementById('qr-code').toDataURL('image/png');
      downloadLink.style.display = 'inline-block';

       document.getElementById('error').innerHTML = '';
       document.getElementById('qr-text').value= '';

    }
