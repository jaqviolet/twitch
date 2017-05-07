
$(document).ready(function() {
  var followed = [];
  var id = "client_id=a15l6rqzg62ac3xsvjulo78bjqid6v";
  var jaqApi = 'https://api.twitch.tv/kraken/users/jaqviolet/follows/channels?&client_id=a15l6rqzg62ac3xsvjulo78bjqid6v';

  //gets user names
  $.getJSON(jaqApi, function(data) {

    for (i = 0; i < data.follows.length; i++) {
      var user = (data.follows[i].channel.display_name);
      followed.push(user);

      /* close for loop i, followed array complete */
    };
   
    for (j = 0; j < followed.length; j++) {
      $.getJSON('https://api.twitch.tv/kraken/streams/' + followed[j] + '?&client_id=a15l6rqzg62ac3xsvjulo78bjqid6v', function(data2) {
        var viewers = "";
        var game = "";
        var display_name = "";
        var logo = "";
        var url = "";
        var preview = "";

        if (data2.stream == null) {
          $.getJSON(data2._links.channel + "/?" + id, function(data4) {

            display_name = (data4.display_name);
            url = (data4.url);
            logo = (data4).logo;
            game = "offline";
            viewers = 0;
            preview = "http://www.halolfg.com/img/stream_offline.jpg";

             $("<div class='row streamer'>\
                  <div class='col-md-2'>\
                    <a href='" + url +"'target='_blank'>\
                    <img class='logo' src='" + logo +"'></a>\
                  </div>\
                  <div class='col-md-6'>\
                    <div class='streamerInfo'>\
                    <h3>" + display_name + "</h3>\
                    <p>currently streaming:" + game + "</p>\
                    <p>viewers:" + viewers + "</p>\
                    </div>\
                  </div>\
                  <div class='col-xs-2'>\
                    <img class='view' src=" + preview + ">\
                  </div>\
              </div>").appendTo("#offline");
          
          });

        } else {
          viewers = (data2.stream.viewers);
          game = (data2.stream.game);
          display_name = (data2.stream.channel.display_name);
          logo = (data2.stream.channel.logo);
          url = (data2.stream.channel.url);
          preview = (data2.stream.preview.medium);

         $("<div class='row no-gutter streamer'>\
              <div class='col-md-2'>\
                <a href='" + url +"'target='_blank'>\
                <img class='logo' src='" + logo +"'></a>\
              </div>\
              <div class='col-md-6'>\
                <div class='streamerInfo'>\
                  <h3>" + display_name + "</h3>\
                  <p>currently streaming:" + game + "</p>\
                  <p>viewers:" + viewers + "</p>\
                </div>\
              </div>\
              <div class='col-md-2'>\
                <img class='view' src=" + preview + ">\
              </div>\
           </div>").appendTo("#online");
        }

      });
    }

    /*close for getJSON api */
  });
  /*close document ready*/
});