/*`
  Please add all Javascript code to this file.
*/

Handlebars.registerHelper('tagsList', function(tags) {
	var tagLine = ''
    for (var i = 0; i < tags.length; i = i + 1) {
    	tagLine += tags[i].display
    	tagLine += ', '
	}

	tagLine = tagLine.substring(0, tagLine.length-2)

	return tagLine
});	




$('li.digg').on('click', function(){

	$.ajax({
		type: 'GET',
		url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',

		beforeSend: function() {
			$('#main').empty()
			$('body').append('<div class="ajaxLoader"></div>')
		},

		success: function(response) {
			console.log(response);

			$('body > div:last-child').remove();

	    	var templateSource = $('#feedItems').html()
			var compiledTemplate = Handlebars.compile(templateSource)

			response.data.feed.forEach(function(article) {
                var generatedHtml = compiledTemplate(article)

                var $articleContainer = $(generatedHtml).appendTo('#main')

                $articleContainer.on('click', '.titleLink', function(event) {
                    console.log(article)
                    console.log('click')

                    var templateSource = $('#popUpArticle').html()
					var compiledTemplate = Handlebars.compile(templateSource)
                
					var generatedHtml = compiledTemplate(article)
                	
                	var $popUpContent = $(generatedHtml).appendTo('body')

                })
            })
		},

		error: function() {
        	$('#main').html('Something went wrong...')

    	}
	});	
})


$('li.reddit').on('click', function(){

	$.ajax({
		type: 'GET',
		url: 'https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/r/news.json',
		
		beforeSend: function() {
			$('#main').empty()
			$('body').append('<div class="ajaxLoader"></div>')
		},

		success: function(response) {
			console.log(response);

			$('body > div:last-child').remove();

	    	var templateSource = $('#feedItems2').html()
			var compiledTemplate = Handlebars.compile(templateSource)


			response.data.children.forEach(function(article) {
                var generatedHtml = compiledTemplate(article)

                var $articleContainer = $(generatedHtml).appendTo('#main')

                $articleContainer.on('click', '.titleLink', function(event) {
                    console.log(article)

                    var templateSource = $('#popUpArticle2').html()
					var compiledTemplate = Handlebars.compile(templateSource)
                
					var generatedHtml = compiledTemplate(article)
                	
                	var $popUpContent = $(generatedHtml).appendTo('body')
                })
            })
		},

		error: function() {
        	$('#main').html('Something went wrong...')

    	}
	});	
})


$('li.google').on('click', function(){

	$.ajax({
		type: 'GET',
		url: 'https://accesscontrolalloworiginall.herokuapp.com/http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss',
		
		beforeSend: function() {
			$('#main').empty()
			$('body').append('<div class="ajaxLoader"></div>')
		},

		success: function(response) {
			console.log(response);

			$('body > div:last-child').remove();

	    	var templateSource = $('#feedItems3').html()
			var compiledTemplate = Handlebars.compile(templateSource)


			var generatedHtml = compiledTemplate(response.responseData.feed)
	        		
	        response.responseData.feed.entries.forEach(function(article) {
                var generatedHtml = compiledTemplate(article)

                var $articleContainer = $(generatedHtml).appendTo('#main')

                $articleContainer.on('click', '.titleLink', function(event) {
                    console.log(article)

                    var templateSource = $('#popUpArticle3').html()
					var compiledTemplate = Handlebars.compile(templateSource)
                
					var generatedHtml = compiledTemplate(article)
                	
                	var $popUpContent = $(generatedHtml).appendTo('body')
                })
            })
		
		},

		error: function() {
        	$('#main').html('Something went wrong...')

    	}
	});	
})



$('#main').on('click', function() {

	$('#popUp').removeClass('hidden');
	setTimeout(function(){
            $('#popUp').removeClass('loader');
    }, 1000);
});



$('body').on('click', '.closePopUp', function() {
	console.log('close');
	$('#popUp').remove()
})



