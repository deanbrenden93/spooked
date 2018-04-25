/*
Title: Darkness Prevails Submit
Written by: Jonathan Forrider
Date: April 15 2018
Description: This is the javascript for handling the submission at 'darkness prevails' in their 'Spooked' app. 
CDN Link: https://dl.dropbox.com/s/0tzktfzq502vd9e/darknessprevailssubmit.js
Link to debug: https://horrorcast.goodbarber.com/pview/horrorcast/custom-submit
*/

if(window.localStorage.username == null){
    var url_string = window.location.href;
    var url = new URL(url_string);
    try{
        var username = url.searchParams.get("username"); 
        var salt = url.searchParams.get("salt");
    } catch(e){
        var username = parse_query_string(location.search.substring(1))["username"];
        var salt = parse_query_string(location.search.substring(1))["salt"];
    }
    
        
    if(username == null || salt == null){
        window.location.href = '/login.html';
    } else {
        $.ajax({
            url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/users?q={'username':'"+username+"', 'salt':'"+sha1(salt)+"'}&apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
            type: 'get',
            contentType: 'application/json',
            //data: JSON.stringify({"username": data.email, "salt": sha1(data.salt)}),
            success: function(d) {
                //... do something with the data...
              console.log(d);
              //console.log(data);
              if(d.length){
                  //updateusersalt(data, d[0]._id.$oid);
                  window.localStorage.setItem('username', d[0].username);
              } else {
                  window.location.href = '/login.html';
              }
              //return [data.length, data._id.$oid];
            }
        });
        //window.localStorage.setItem('username', username);
    }
}else{
    var username = window.localStorage.username;
}

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
 //var user;
 //var userlogin = 'Failed';
 var inputdate = new Date();
 var date1 = inputdate.toUTCString();
 //if(window.localStorage.user == null) {
//   userlogin = window.localStorage.lastValidLogin
// } else {
  // user = JSON.parse(window.localStorage.user);
//   userlogin = user.login;
 //}

// if(userlogin == null) {
  //  userlogin = "Cannot get username";
 //}
 
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
                data: JSON.stringify({"user": username, "title": $('#title').val(), "penname": $('#penname').val(), "storytype": storytype, "category": category, "story": $('#story').val(), "trmcnd": trmcnd, "votes": [], "submitdate": date1, "views": [] }),
                success: function(data) {
                    //... do something with the data...
                  console.log(data);
                  $('#myform')[0].reset();
                  window.location.href = '/read.html?id='+data._id.$oid;
                }
        });
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}

function sha1(msg) //borrowed from 'https://softwareengineering.stackexchange.com/questions/76939/why-almost-no-webpages-hash-passwords-in-the-client-before-submitting-and-hashi'
{
    function rotl(n, s) { return n << s | n >>> 32 - s; }
    function tohex(i) { for (var h = "", s = 28; ; s -= 4) { h += (i >>> s & 0xf).toString(16); if (!s) return h; } }
    var H0 = 0x67452301, H1 = 0xEFCDAB89, H2 = 0x98BADCFE, H3 = 0x10325476, H4 = 0xC3D2E1F0, M = 0x0ffffffff;
    var i, t, W = new Array(80), ml = msg.length, wa = new Array();
    msg += String.fromCharCode(0x80);
    while (msg.length % 4) msg += String.fromCharCode(0);
    for (i = 0; i < msg.length; i += 4) wa.push(msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3));
    while (wa.length % 16 != 14) wa.push(0);
    wa.push(ml >>> 29), wa.push((ml << 3) & M);
    for (var bo = 0; bo < wa.length; bo += 16) {
        for (i = 0; i < 16; i++) W[i] = wa[bo + i];
        for (i = 16; i <= 79; i++) W[i] = rotl(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        var A = H0, B = H1, C = H2, D = H3, E = H4;
        for (i = 0; i <= 19; i++) t = (rotl(A, 5) + (B & C | ~B & D) + E + W[i] + 0x5A827999) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
        for (i = 20; i <= 39; i++) t = (rotl(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
        for (i = 40; i <= 59; i++) t = (rotl(A, 5) + (B & C | B & D | C & D) + E + W[i] + 0x8F1BBCDC) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
        for (i = 60; i <= 79; i++) t = (rotl(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
        H0 = H0 + A & M; H1 = H1 + B & M; H2 = H2 + C & M; H3 = H3 + D & M; H4 = H4 + E & M;
    }
    return tohex(H0) + tohex(H1) + tohex(H2) + tohex(H3) + tohex(H4);
}


