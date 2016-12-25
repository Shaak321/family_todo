$(document).ready(function() {
     var $delete_Btn = $('#delete_family')
      $delete_Btn.on('click', function(ev) {
        ev.preventDefault()
            const headers = {
                'csrf-token': $('[name="_csrf"]').val()
            }
            
            return Promise.resolve(
                $.ajax({
                url: `/ajax/family_delete/`+window.location.pathname.split('/')[2],
                method: 'GET',
                dataType: 'json',
                headers
                }).done(function(json){
                    if(json.success){
                        location.assign('/')
                    }else{
                        alert('You cannot delete this family');     
                    }
                })
            )
})
})