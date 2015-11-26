

$(function(){

  function iFrameOn(){
    richTextField.document.designMode = 'On';
  }
  iFrameOn();
  function makeBold(){
    richTextField.document.execCommand('bold',false,null); 
  }
  function makeUnderline(){
    richTextField.document.execCommand('underline',false,null);
  }
  function makeItalic(){
    richTextField.document.execCommand('italic',false,null); 
  }
  function changeFontSize(){
    var size = prompt('Enter a size 1 - 7', '');
    richTextField.document.execCommand('FontSize',false,size);
  }
  function changeColor(){
    var color = prompt('Define a basic color or apply a hexadecimal color code for advanced colors:', '');
    richTextField.document.execCommand('ForeColor',false,color);
  }
  function insertUnorderedList(){
    richTextField.document.execCommand("InsertOrderedList", false,"newOL");
  }
  function insertOrderedList(){
    richTextField.document.execCommand("InsertUnorderedList", false,"newUL");
  }
  function createLink(){
    var linkURL = prompt("Enter the URL for this link:", "http://"); 
    richTextField.document.execCommand("CreateLink", false, linkURL);
  }
  function destroyLink(){
    richTextField.document.execCommand("Unlink", false, null);
  }
  function insertImage(){
    var imgSrc = prompt('Enter image location', '');
      if(imgSrc != null){
          richTextField.document.execCommand('insertimage', false, imgSrc); 
      }
  }
  function submit_form(){
    var theForm = document.getElementById("chat_form");
    theForm.elements["message"].value = window.frames['richTextField'].document.body.innerHTML;
  }
  document.getElementById("submit").onclick = function() {submit_form()};

  $( "#makeBold" ).click(makeBold);
  $( "#makeItalic" ).click(makeItalic);
  $( "#makeUnderline" ).click(makeUnderline);
  $( "#changeFontSize" ).click(changeFontSize);
  $( "#changeColor" ).click(changeColor);
  $( "#insertUnorderedList" ).click(insertUnorderedList);
  $( "#insertOrderedList" ).click(insertOrderedList);
  $( "#createLink" ).click(createLink);
  $( "#destroyLink" ).click(destroyLink);
  $( "#insertImage" ).click(insertImage);


  var chatBoxReload = function() {
    $("#chatbox").load("/" + " #chatbox");
  };

  chatBoxReload();
  setInterval(chatBoxReload, 5000);
  

$('#chat_form').on('submit', function(e){
e.preventDefault();
var username = $('#username').val();
var message = $('#message').val();
var since = $('#since').val();
var data = {'username': username, 'message': message, 'since': since };
$.ajax({
type: 'POST',
url: '/chat',
data: data,
  // beforeSend: function(){},
  success: function(data){
  $.each(data, function(i, message){
  $('#chatbox').prepend('<li><span title="04:35:16PM"><span class="username">&lt;'+ message.username +'&gt; </span><span class="message">'+ message.message +'</span></span></li>');
  });
  $('#since').val(data[data.length-1].timestamp);
  $('#message').val('');
  },
  complete: function(){$('#chat').text(message)}
});


});
// $("#chatbox").load(location.href + " #chatbox");



});


