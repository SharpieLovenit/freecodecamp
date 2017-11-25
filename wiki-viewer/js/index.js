$(document).ready(function() {
   var endpoint = "https://en.wikipedia.org/w/api.php?";
   var parameters = {
      action: "opensearch",
      format: "json",
      limit: 10
   };
   $("#usersearch").keypress(function(event){
      if (event.which == 13) {
         event.preventDefault();
         $("#hitme").click();   
      }
   });
   
   $("#hitme").click(function() {
      parameters.search = $("#usersearch").val();
      $("#usersearch").val('');
      
      endpoint += $.param(parameters);
      console.log("Endpoint: " + endpoint);

      $.ajax({
         url: endpoint,
         dataType: "json",
         data: {
            origin: "*"
         },
         type: "GET",
         success: function(data) {
            console.log(data);
            link_generator(data);
         }
      });
   });
   
   
   // Link generator
   function link_generator(data){
      var myResult ="";
       var i = 0,
       title = data[1],
       description = data[2],
       link = data[3];

       for(i; i < data[3].length; i++){
         var  list_link = '<a href="'+link[i]+'">'+title[i]+'</a>',
   list_description = '<li>'+list_link+'</br>'+description[i]+'</li>';
           //$('#results').append(list_description);
          myResult += list_description;
       }
      //console.log(myResult);
      $('#results').html(myResult);
   }
});