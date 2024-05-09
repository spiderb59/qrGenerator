function generateQR() {
  var qrName = document.getElementById('visitor-name').value.trim();
  var qrCompany = document.getElementById('visitor-company').value.trim();
  var qrPhoneNumber = document.getElementById('visitor-phone').value.trim();
  var qrEmail = document.getElementById('visitor-email').value.trim();
  var qrVisitDate = document.getElementById("visit-date").value.trim();
  // Validate visitor details
  if (qrName === '' || qrCompany === '' || qrPhoneNumber === '' || qrEmail === '' || qrVisitDate == '') {
    showError('Please fill in all fields.');
    return;
  }

  // Generate random ID
  var randomId = generateRandomId();

  // Get current date and time
  var formattedDateTime = getCurrentDateTime();

  var pass_path= "visitor-pass/"+randomId+'.pdf';

  // Send visitor details to backend
  fetch('/save-visitor-details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: randomId,
      name: qrName,
      company_name: qrCompany,
      phone: qrPhoneNumber,
      email: qrEmail,
      date: formattedDateTime,
      pass_path: pass_path,
      visit_date: qrVisitDate
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Success message
      document.getElementById('success').innerHTML = 'Visitor details saved successfully.';
      document.getElementById('visitor-name').value = '';

    } else {
      // Error message
      showError(data.message);
    }
  })
  .catch(error => {
    console.error('Error saving visitor details:', error);
    showError('Failed to save visitor details.');
  });
}

// Function to generate a random ID
function generateRandomId() {
  return Date.now() + '_' + Math.floor(Math.random() * 1000);
}

// Function to get current date and time
function getCurrentDateTime() {
  var currentDate = new Date();
  currentDate.setHours(currentDate.getHours());
  return currentDate.toISOString().slice(0, 19).replace('T', ' ');
}

// Function to display an error message
function showError(message) {
  document.getElementById('error').innerHTML = message;
}

// Function to clear the error message
function clearError() {
  document.getElementById('error').innerHTML = '';
}
