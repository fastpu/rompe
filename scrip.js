document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('id', document.getElementById('id').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('uberAccount', document.getElementById('uber-account').value);
    formData.append('idCardPhoto', document.getElementById('id-card-photo').files[0]);
    formData.append('backgroundCheckPhoto', document.getElementById('background-check-photo').files[0]);
    formData.append('personalReferencePhoto', document.getElementById('personal-reference-photo').files[0]);
    formData.append('serviceBillPhoto', document.getElementById('service-bill-photo').files[0]);
    formData.append('housePhoto', document.getElementById('house-photo').files[0]);
    formData.append('googleMapsLink', document.getElementById('google-maps-link').value);

    fetch('/verify', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          showAlert(data.message, 'success');
      })
      .catch(error => {
          console.error('Error:', error);
          showAlert('Error al verificar la identidad', 'danger');
      });
});

function showAlert(message, type) {
    const alertPlaceholder = document.createElement('div');
    alertPlaceholder.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
    document.body.appendChild(alertPlaceholder);
}
