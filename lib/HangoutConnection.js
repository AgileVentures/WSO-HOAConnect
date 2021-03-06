// Generated by CoffeeScript 1.7.1
(function() {
  this.HangoutApplication = function() {
    this.initialize = (function(_this) {
      return function() {
        if (gapi.hangout.data.getValue('updated') !== 'true') {
          $('button#update').click(function() {
            return _this.sendUrl();
          });
          $('button#notify').click(function() {
            return _this.sendUrl(true);
          });
          $('button#hide').click(gapi.hangout.hideApp);
          (new window.Timer).init();
          _this.sendUrl(true);
          return setInterval(_this.sendUrl, 300000);
        } else {
          return $('.controls__status').removeClass('controls__status--ok controls__status--error').addClass("controls__status--" + (gapi.hangout.data.getValue('status')));
        }
      };
    })(this);
    this.init = (function(_this) {
      return function() {
        return gapi.hangout.onApiReady.add(function(eventObj) {
          if (eventObj.isApiReady) {
            return _this.initialize();
          }
        });
      };
    })(this);
    this.sendUrl = (function(_this) {
      return function(notify) {
        var callbackUrl, err, hangoutUrl, isBroadcasting, participants, startData, youTubeLiveId;
        startData = gapi.hangout.getStartData();
        try {
          startData = JSON.parse(startData);
          callbackUrl = startData.callbackUrl + startData.hangoutId;
        } catch (_error) {
          err = _error;
          callbackUrl = startData;
        }
        hangoutUrl = gapi.hangout.getHangoutUrl();
        youTubeLiveId = gapi.hangout.onair.getYouTubeLiveId();
        participants = gapi.hangout.getParticipants();
        isBroadcasting = gapi.hangout.onair.isBroadcasting();
        return $.ajax({
          url: callbackUrl,
          dataType: 'text',
          type: 'PUT',
          data: {
            title: startData.title,
            project_id: startData.projectId,
            event_id: startData.eventId,
            category: startData.category,
            host_id: startData.hostId,
            participants: participants,
            hangout_url: hangoutUrl,
            yt_video_id: youTubeLiveId,
            notify: notify
          },
          success: function() {
            gapi.hangout.data.setValue('status', 'ok');
            if (gapi.hangout.data.getValue('updated') !== 'true') {
              gapi.hangout.layout.displayNotice('Connection to WebsiteOne established');
              gapi.hangout.data.setValue('updated', 'true');
            }
            return $('.controls__status').removeClass('controls__status--error').addClass('controls__status--ok');
          },
          error: function() {
            gapi.hangout.data.setValue('status', 'error');
            return $('.controls__status').removeClass('controls__status--ok controls__status--error').addClass('controls__status--error');
          }
        });
      };
    })(this);
    return true;
  };

  if (typeof gadgets !== "undefined" && gadgets !== null) {
    gadgets.util.registerOnLoadHandler((new HangoutApplication()).init);
  }

}).call(this);
