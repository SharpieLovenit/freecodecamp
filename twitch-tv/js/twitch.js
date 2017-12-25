var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var endpoint = 'https://api.twitch.tv/kraken/';
var client_id = '3917l4p9kj2yrbkv3a0g53hdxofddv';

$(document).ready(function () {
    var channelData;
    $('.btn-group > .btn').click(function () {
        $(".btn-group > .btn").removeClass("active");
        $(this).addClass("active");
        //console.log("Button clicked, id "+this.id+", text "+this.innerHTML);
        getTwitchChannels(this.id);
    });

    function buildURL(type, channel) {
        return endpoint + type + '/' + channel + '?client_id=' + client_id;
    }

    function listChannel(isOnline, channel, channelData, streamData) {
        var status = isOnline ? 'online' : 'offline';

        name = channelData.display_name;
        logo = channelData.logo;
        url = channelData.url;

        if (isOnline) {
            game = streamData.game;
        }
        else {
            game = 'Offline'
        }

        console.log('name: ' + name);
        console.log('logo: ' + logo);
        console.log('url: ' + url);
        console.log('game: ' + game);

    }

    function getTwitchChannels(filter) {
        channels.forEach(function (channel) {
            $.getJSON(buildURL('streams', channel), function (data) {
                var isOnline = data.stream ? true : false;

                if (isOnline && (filter == "btn-all" || filter == "btn-online")) {
                    listChannel(true, channel, data.stream.channel, data.stream);
                }
                else if (!isOnline && (filter == "btn-all" || filter == "btn-offline")) {
                    // Get the channel info with a separate API call as this is not
                    // returned for offline streams
                    $.getJSON(buildURL('channels', channel), function (data2) {
                        listChannel(false, channel, data2);
                    });
                }
            });
        });
    }
});