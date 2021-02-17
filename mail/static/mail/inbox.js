document.addEventListener('DOMContentLoaded', function() {


  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click',() => {arch_inbox="compose";
    compose_email();});
  load_mailbox('inbox');

  document.querySelector('#but1').addEventListener('click', () =>{
  fetch('/emails',{
    method:'POST',
    body:JSON.stringify({
    recipients: document.querySelector('#compose-recipients').value,
    subject: document.querySelector('#compose-subject').value ,
    body: document.querySelector('#compose-body').value

    })
  })
  .then(response=>response.json())
  .then(result => {

  });});
  // By default, load the inbox

});
var a_id;
var arch_inbox;
var receiver;


function view_email(id) {

  fetch(`/emails/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
      read: true
  })
})

  a_id=id;
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#body-view').style.display = 'block';

fetch(`/emails/${id}`)
.then(response => response.json())
.then(data => {
document.querySelector('#from').innerHTML = `${data["sender"]}`
document.querySelector('#to').innerHTML = `${data["recipients"]}`
document.querySelector('#sub').innerHTML = `${data["subject"]}`
document.querySelector('#time').innerHTML = `${data["timestamp"]}`
document.querySelector('#body').innerHTML = `${data["body"]}`
if (arch_inbox==="sent"){
  receiver = `${data['recipients']}`.replace(",",", ");
  document.querySelector('#archive_button').style.display='none';
  document.querySelector('#unarchive_button').style.display='none';
}
else if(arch_inbox==="inbox"){
  receiver=data['sender'];
  document.querySelector('#archive_button').style.display='block';
  document.querySelector('#unarchive_button').style.display='none';
}
else if(arch_inbox==="archive"){
  receiver=data['sender'];
  document.querySelector('#archive_button').style.display='none';
  document.querySelector('#unarchive_button').style.display='block';
}

});


}


function archive_email(){
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#body-view').style.display = 'none';
  console.log(a_id);
  if(arch_inbox==="inbox"){
  fetch(`/emails/${a_id}`, {
  method: 'PUT',
  body: JSON.stringify({
      archived: true
  })
})}
else if (arch_inbox==="archive") {
  fetch(`/emails/${a_id}`, {
  method: 'PUT',
  body: JSON.stringify({
      archived: false
  })
})}
}



function compose_email() {
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#body-view').style.display = 'none';
  // Clear out composition fields

  if (arch_inbox==="compose"){
       document.querySelector('#compose-recipients').value = '';
     }
 else {
         document.querySelector('#compose-recipients').value = receiver;
     }

  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}


function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#body-view').style.display = 'none';
// Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(data => {
      // Print emails
      if(mailbox==='sent'){
        arch_inbox="sent"
      for(let i=0;i<data.length;i++){
        for (let j = 0; j < data[i]['recipients'].length; j++) {
          let dive=document.createElement('button');
          dive.setAttribute("class",'box');
          dive.setAttribute("id",data[i]['id']);

          dive.innerHTML = `<span id = ${data[i]['id']} class='receive'>${data[i]['recipients'][j]}</span><span id = ${data[i]['id']} class='time'>${data[i]['timestamp']}</span><span id = ${data[i]['id']} class='sub'>${data[i]['subject']}</span>`;
          document.querySelector('#emails-view').append(dive);

        }

      }}
      else if (mailbox==='inbox') {
        arch_inbox="inbox"
        for(let i=0;i<data.length;i++){
            let dive=document.createElement('button');
            dive.setAttribute("class",'box');
            dive.setAttribute("id",data[i]['id']);
            dive.innerHTML = `<span id = ${data[i]['id']} class='receive'>${data[i]['sender']}</span><span id = ${data[i]['id']} class='time'>${data[i]['timestamp']}</span><span id = ${data[i]['id']} class='sub'>${data[i]['subject']}</span>`;
            console.log(data[i]["read"]);
            if (data[i]['read']==false){
              dive.style.color = "#ff0000";
              dive.style.fontWeight = "900"

            }
            else if(data[i]['read']==true){
              console.log("her");
              dive.style.color = "blue";
            }

            document.querySelector('#emails-view').append(dive);
          }

        }

        else if (mailbox==='archive') {
          arch_inbox="archive"
          for(let i=0;i<data.length;i++){
              let dive=document.createElement('button');
              dive.setAttribute("class",'box');
              dive.setAttribute("id",data[i]['id']);
              dive.innerHTML = `<span id = ${data[i]['id']} class='receive'>${data[i]['sender']}</span><span id = ${data[i]['id']} class='time'>${data[i]['timestamp']}</span><span id = ${data[i]['id']} class='sub'>${data[i]['subject']}</span>`;
              document.querySelector('#emails-view').append(dive);

            }

          }


  });
  var classList = document.getElementsByClassName('box');
  setTimeout(function() {
  for (var i = 0; i < classList.length; i++) {
      classList[i].addEventListener('click', (event) => {let id=event.target.id;view_email(id);});
  }},500);

}
