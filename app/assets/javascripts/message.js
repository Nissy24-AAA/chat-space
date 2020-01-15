$(function(){ 
  function buildHTML(message){
    image = ( message.image ) ? `<img class="chat-main__content-box__message__image" src=${message.image} >` : "";
                var html =  
                ` <div class="chat-main__content-box" data-message-id="${message.id}">
                <div class="chat-main__content-box__info">
                  <div class="chat-main__content-box__info-name">
                    ${message.user_name}
                  </div>
                  <div class="chat-main__content-box__info-date">
                    ${message.date}
                  </div>
                </div>
                <div class="chat-main__content-box__message">
                  <p class="chat-main__content-box__message__text">
                  ${message.content}
                  </p>
                  ${image}
                </div>
              </div>`
          return html;
  }



  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.chat-main__content').append(html);      
       $('form')[0].reset();
       $('.chat-main__content').animate({ scrollTop: $('.chat-main__content')[0].scrollHeight});
     })
     .fail(function() {
       alert("メッセージ送信に失敗しました");
     })
     .always(function(){
      $('.chat-main__message-box__btn').prop('disabled', false);
     })
  })
  
  var reloadMessages = function() { 
    last_message_id = $('.chat-main__content-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__content').append(insertHTML);
        $('.chat-main__content').animate({ scrollTop: $('.chat-main__content')[0].scrollHeight});
        $("#new_message")[0].reset();
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
    .always(function(){
      $('.chat-main__message-box__btn').prop('disabled', false);
     })
  };
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
