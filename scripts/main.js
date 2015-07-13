

$(function() {


	$('body').on('click', 'button', function () {
		var value = $('.input-text').val()
		$('ul').append("<li>" + value + "</li>")
		$('.input-text').val('')
	})


});