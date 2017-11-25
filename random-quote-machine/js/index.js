$(document).ready(function() {
	$("#new-quote").on("click", function() {
		getQuote();
	});
	
	getQuote();
});

function getQuote() {
		var output = $.ajax({
			url: "https://andruxnet-random-famous-quotes.p.mashape.com/", // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
			type: "GET", // The HTTP Method, can be GET POST PUT DELETE etc
			data: {}, // Additional parameters here
			dataType: "json",
			success: function(data) {
				//
				//Change data.source to data.something , where something is whichever part of the object you want returned.
				//To see the whole object you can output it to your browser console using:
				console.log(data);
				$("#quote-text").html(data.quote);
				$("#author").html("— " + data.author);
        $("a#tweet-quote").attr("href", encodeURI("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&amp;text=\"" + data.quote + "\" " + data.author));
			},
			error: function(err) {
				alert(err);
			},
			beforeSend: function(xhr) {
				xhr.setRequestHeader(
					"X-Mashape-Authorization",
					"QpaLOixqpAmshTBmsSygN6niDgWip1A6JNKjsn1jgHNABdwUeM"
				); // Enter here your Mashape key
			}
		});
}