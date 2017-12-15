$(document).ready(function() {

    $('.btn-group > .btn').click(function(){
        $(".btn-group > .btn").removeClass("active");
        $(this).addClass("active");
        //alert("Button clicked, id "+this.id+", text "+this.innerHTML);
        getTwitchChannels();
    });

function getTwitchChannels(){
    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/kraken/channels/twitch',
        headers: {
        'Client-ID': '3917l4p9kj2yrbkv3a0g53hdxofddv'
        },
         success: function(data) {
           console.log(data);
         }
    });
   
}

});