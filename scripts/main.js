

$(function() {


	$('body').on('click', 'button', function () {

		var value = $('.input-text').val()
		
		if (value == '') {
			console.log('dumb user')
		} else {
			$('ul').append("<li>" + value + "</li>")
			$('.input-text').val('')
		}


	})


});