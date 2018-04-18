
$.ajax({
	url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/darknessprevailssubmissions?s={'submitdate':-1}&apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
	method: 'get',
	success: function(data){
		console.log(data[0]._id.$oid);
		$('#outerstorycont').html(
		`<div class="container" onclick='gotoread("`+data[0]._id.$oid+`")'>
			 <div class="story">
			<div class="entrytext">
					<p class="title">`+data[0].title+`</p>
					<p class="authordate"> By `+data[0].penname+` on `+fixdate(data[0].submitdate)+`<br>
`+data[0].category+` | `+(data[0].views).length+` Views </p>
			</div>
			<div class="votes"> <button id="upvote" class="upvote" type="image"></button>
					<p class="votecount">`+data[0].votes+`</p>
				<button id="downvote" class="downvote"></button> </div>
		<hr class="break"> </div>
	</div>`
		)
		for(i=1;i<data.length;i++){
			$('#outerstorycont').append(
			`<div class="container" onclick='gotoread("`+data[i]._id.$oid+`")>
			 <div class="story">
			<div class="entrytext">
					<p class="title">`+data[i].title+`</p>
					<p class="authordate"> By `+data[i].penname+` on `+fixdate(data[i].submitdate)+`<br>
`+data[i].category+` | `+(data[i].views).length+` Views </p>
			</div>
			<div class="votes"> <button id="upvote" class="upvote" type="image"></button>
					<p class="votecount">`+data[i].votes+`</p>
				<button id="downvote" class="downvote"></button> </div>
		<hr class="break"> </div>
	</div>`
		)
		}
	}
})

function fixdate(datechange){
    var feeddate = new Date(datechange);
    feeddate = feeddate.toDateString();
    return feeddate.substr(4, feeddate.length-1);
}

function gotoread(storyId){
    window.location.href = '/read.html?id='+storyId;
}

//https://dl.dropbox.com/s/bkmd8qhu038pmm3/feed.js