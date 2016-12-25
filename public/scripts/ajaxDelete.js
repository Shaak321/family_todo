$(document).ready(function() {
     var $delete_Btn = $('#delete')
      $delete_Btn.on('click', function(ev) {
        ev.preventDefault()
            const headers = {
                'csrf-token': $('[name="_csrf"]').val()
            }
            
            return Promise.resolve(
                $.ajax({
                url: `/ajax/delete`+window.location.pathname,
                method: 'GET',
                dataType: 'json',
                headers
                }).done(function(json){
                    if(json.success){
                        location.assign('/')
                    }else{
                        alert('You cannot delete this todo');     
                    }
                })
            )
})
})