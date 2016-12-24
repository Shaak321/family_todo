$(document).ready(function() {

      var $login_Btn = $('#login')
      $login_Btn.on('click', function(ev) {
        ev.preventDefault()

        var $modal_view = $(
          `<div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="loginModal">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
            <div class="modal-body">
                <div class="alert alert-danger"></div>
                <div class="form-area"></div>
            </div>
            </div>
        </div>
      </div>`)

        var $error = $modal_view.find('.alert')
        $error.text('Wrong credentials.').hide()

        var $formArea = $modal_view.find('.form-area')
        $formArea.load('/login #login_form', function() {
          var $loginForm = $formArea.find('form')
          $loginForm.on('submit', function(ev) {
            ev.preventDefault();
            $error.hide();

            $.ajax({
                url: '/ajax/login',
                method: 'POST',
                data: $(this).serializeArray(),
                dataType: 'json'
              })
              .done(function(json) {
                if (json.success) {
                     $('.navbar').load('/ .navbar .container-fluid', function () {
                         $modal_view.modal('hide')
                     })
                } else {
                  $error.show()
                }
              })
          });

          $modal_view.modal('show')
        })
      })
    })