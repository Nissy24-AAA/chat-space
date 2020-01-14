$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat-main__content-box" data-message-id=${message.id}>
         <div class="chat-main__content-box__info">
           <div class="chat-main__content-box__info-name">
             ${message.user_name}
           </div>
           <div class="chat-main__content-box__info-date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__content-box__message">
           <p class="chat-main__content-box__message__text">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} > 
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__content-box" data-message-id=${message.id}>
         <div class="chat-main__content-box__info">
           <div class="chat-main__content-box__info-name">
             ${message.user_name}
           </div>
           <div class="chat-main__content-box__info-date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__content-box__message">
           <p class="chat-main__content-box__message__text">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
  }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
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
     $('.chat-main__message-box__btn').prop('disabled', false);
   })
   .fail(function() {
     alert("メッセージ送信に失敗しました");
   });
})
});
