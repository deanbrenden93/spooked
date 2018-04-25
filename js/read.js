if(window.localStorage.username == null){
    window.location.href = '/login.html';
}else{
    var username = window.localStorage.username;
}

var url_string = window.location.href
var url = new URL(url_string);
var storyid = url.searchParams.get("id"); 

$.ajax({
	url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/darknessprevailssubmissions/"+storyid+"?apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
	method: 'get',
	success: function(data){
        var text = data.story;
        text = text.replace(/\r?\n/g, '<br />');
		$('body').html(
		`<div class="storymeta">
          <h1 class="title"> `+data.title+` </h1>
          <hr class="break">
          <div class="postinfo">
            <h2 class="author"> By `+data.user+` <img src="/images/read/testuser.png" class="profilepic">
            </h2>
            <p class="stats"> `+data.category+` | `+(data.views).length+` view(s) | <img class="commenticon" src="/images/read/comment_icon.png">
              21 </p>
            <p class="usercontrols"> Edit | Report | Delete </p>
          </div>
          <div class="votes"> <button id="upvote" class="upvote" type="image" onclick='upvote(event, "`+storyid+`")'></button>
            <label class="votecount">`+data.votes+`</label> <button id="downvote" class="downvote" onclick='downvote(event, , "`+storyid+`")'></button>
          </div>
          <hr class="break">
          <div class="body">
            <p class="storybody">`+text+`</p>
            <hr class="break">
          </div>
          <p> End <br><br>Share this story:<br>(add share button or buttons, whatever is most efficient)</p>
          <div class="commentarea">
            <hr class="break">
            <p> Leave a comment </p>
            <textarea id="comment" class="autoExpand" rows="5" data-min-rows="5" placeholder="Tell Your Story"

        minlength="500" required="">        </textarea>
            <hr class="break"> </div>
          <p style="text-align: left; margin-left: 5%;"> 21 comments: </p>
          Comments go here
          <hr class="break"> </div>`
		)
	}
})

function upvote(e, storyid){
    e.stopPropagation();
    console.log("Upvote");
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/darknessprevailssubmissions/"+storyid+"?apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
        method: 'get',
        success: function(data){
            console.log(data.votes);
            console.log(data.voters);
            var voters = data.voters;
            var votetype = data.votetype;
            if(voters.indexOf(username) < 0 || votetype[voters.indexOf(username)] == 'D'){
                if(voters.indexOf(username) < 0){
                    voters.push(username);
                } else {
                    votetype[voters.indexOf(username)] = 'U';
                }
                var votes = data.votes + 1;
                updatestoryvotes(votes, voters, votetype, storyid);
            }
        }
    })
}

function downvote(e, storyid){
    e.stopPropagation();
    console.log("Downvote");
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/darknessprevailssubmissions/"+storyid+"?apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
        method: 'get',
        success: function(data){
            console.log(data.votes);
            console.log(data.voters);
            var voters = data.voters;
            var votetype = data.votetype;
            if(voters.indexOf(username) < 0 || votetype[voters.indexOf(username)] == 'U'){
                if(voters.indexOf(username) < 0){
                    voters.push(username);
                } else {
                    votetype[voters.indexOf(username)] = 'D';
                }
                var votes = data.votes - 1;
                updatestoryvotes(votes, voters, votetype, storyid);
            }
        }
    })
}

function updatestoryvotes(votes, voters, votetype, storyID){
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/darknessprevailssubmissions/"+storyID+"?apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify({ "$set" : {"votes": votes, "voters": voters, "votetype": votetype}}),
        success: function(data) {
            //... do something with the data...
          console.log(data);
          $('.votecount').html(votes);
          if(votes == 0){ 
              $('.upvote').css('background-image', 'url(/images/read/upvote_empty.png)');
              $('.downvote').css('background-image', 'url(/images/read/downvote_empty.png)');
          } else if(votes < 0) {
              $('.upvote').css('background-image', 'url(/images/read/upvote_empty.png)');
              $('.downvote').css('background-image', 'url(/images/read/downvote_clicked.png)');
          } else if(votes > 0) {
              $('.upvote').css('background-image', 'url(/images/read/upvote_clicked.png)');
              $('.downvote').css('background-image', 'url(/images/read/downvote_empty.png)');
          }

        }
    }); 
}

function getviews(storyid){
    $.ajax({
	url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/darknessprevailssubmissions/"+storyid+"?apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
	method: 'get',
	success: function(data){
        var views = data.views;
        if(views.indexOf(username) < 0){
            views.push(username);
            updateview(views, storyid);
        }
	}
})
}

function updateview(views, storyID){
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/darknessprevailssubmissions/"+storyID+"?apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify({ "$set" : {"views": views}}),
        success: function(data) {
            //... do something with the data...
          console.log(data);

        }
    }); 
}

getviews(storyid);
//$('.')