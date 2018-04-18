/*
Title: Darkness Prevails Submit
Written by: Jonathan Forrider
Date: April 15 2018
Description: This is the javascript for handling the submission at 'darkness prevails' in their 'Spooked' app. 
CDN Link: https://dl.dropbox.com/s/0tzktfzq502vd9e/darknessprevailssubmit.js
Link to debug: https://horrorcast.goodbarber.com/pview/horrorcast/custom-submit
*/

$(function() {
    //hang on event of form with id=myform
    $("#myform").submit(function(e) {
      
      e.preventDefault();
      yay();

    });

});

function yay(){
 var storytype;
 var category;
 var trmcnd;
 var user;
 var userlogin = 'Failed';
 var inputdate = new Date();
 var date1 = inputdate.toUTCString();
 if(window.localStorage.user == null) {
   userlogin = window.localStorage.lastValidLogin
 } else {
   user = JSON.parse(window.localStorage.user);
   userlogin = user.login;
 }

 if(userlogin == null) {
    userlogin = "Cannot get username";
 }
 
  if($('#fictional').is(':checked')) storytype = 'Fictional Story';
  else if($('#true').is(':checked')) storytype = 'True Story';
  
  if($('#para').is(':checked')) category = 'Paranormal';
  else if($('#mons').is(':checked')) category = 'Monsters';
  else if($('#people').is(':checked')) category = 'People';

  trmcnd = ($('#agree').is(':checked'));
  //do your own request an handle the results
        $.ajax({
                url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/darknessprevailssubmissions?apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({"user": userlogin, "title": $('#title').val(), "penname": $('#penname').val(), "storytype": storytype, "category": category, "story": $('#story').val(), "trmcnd": trmcnd, "votes": 0, "submitdate": date1, "views": [] }),
                success: function(data) {
                    //... do something with the data...
                  console.log(data);
                  $('#myform')[0].reset();
                  window.location.href = '/read.html?id='+data._id.$oid;
                }
        });
}


