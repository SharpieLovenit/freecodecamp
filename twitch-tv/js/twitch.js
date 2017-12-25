var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var endpoint = 'https://api.twitch.tv/kraken/';
var client_id = '3917l4p9kj2yrbkv3a0g53hdxofddv';

$(document).ready(function () {
    getTwitchChannels("btn-all");

    var channelData;
    $('.btn-group > .btn').click(function () {
        $(".btn-group > .btn").removeClass("active");
        $(this).addClass("active");
        $("#channels").empty();
        getTwitchChannels(this.id);
    });

    function buildURL(type, channel) {
        return endpoint + type + '/' + channel + '?client_id=' + client_id;
    }

    function listChannel(isOnline, channel, channelData, streamData) {
        var status = isOnline ? 'online' : 'offline';
        
        var name = channelData.display_name;
        var logo = channelData.logo;
        var url = channelData.url;

        if (isOnline) {
            game = streamData.game;
        }
        else {
            game = 'Offline'
        }
       
        var html = '<div class="row well-sm channel ' + status + '">';
        html += '<div class="col-xs-2"><img class="img-rounded channel-logo" src="' + logo + '"></div>';
        html += '<div class="col-xs-10"><a href=" ' + url + '" target="_blank">' + name + '</a></div>';
        html += '<div class="col-xs-10">' + game + '</div>';
        html += '</div>';
        
        if (isOnline) {
            $("#channels").prepend(html);
        }
        else {
            $("#channels").append(html);
        }

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