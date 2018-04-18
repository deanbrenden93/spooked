var url_string = window.location.href
var url = new URL(url_string);
var storyid = url.searchParams.get("id"); 

$.ajax({
	url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/darknessprevailssubmissions"+storyid+"?apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
	method: 'get',
	success: function(data){
        console.log(data);
		$('body').html(
		`<div class="storymeta">
          <h1 class="title"> `+data.title+` </h1>
          <hr class="break">
          <div class="postinfo">
            <h2 class="author"> By `+data.user+` <img src="/images/read/testuser.png" class="profilepic">
            </h2>
            <p class="stats"> `+data.category+` | `+(data.views).length+` views | <img class="commenticon" src="/images/read/comment_icon.png">
              21 </p>
            <p class="usercontrols"> Edit | Report | Delete </p>
          </div>
          <div class="votes"> <button id="upvote" class="upvote" type="image"></button>
            <label class="votecount">`+data.votes+`</label> <button id="downvote" class="downvote"></button>
          </div>
          <hr class="break">
          <div class="body">
            <p class="storybody">`+data.story+`</p>
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

/*`<div class="storymeta">
  <h1 class="title"> `+data.title+` </h1>
  <hr class="break">
  <div class="postinfo">
    <h2 class="author"> By `+data.user+` <img src="/images/read/testuser.png" class="profilepic">
    </h2>
    <p class="stats"> `+data.category+` | `+(data.views).length+` views | <img class="commenticon" src="/images/read/comment_icon.png">
      21 </p>
    <p class="usercontrols"> Edit | Report | Delete </p>
  </div>
  <div class="votes"> <button id="upvote" class="upvote" type="image"></button>
    <label class="votecount">`+data.views+`</label> <button id="downvote" class="downvote"></button>
  </div>
  <hr class="break">
  <div class="body">
    <p class="storybody">`+data.story+`</p>
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
  <hr class="break"> </div>`*/