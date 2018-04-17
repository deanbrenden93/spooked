
$.ajax({
	url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/darknessprevailssubmissions?apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
	method: 'get',
	success: function(data){
		console.log(data[0]._id.$oid);
		$('#outerstorycont').html(
		`<div class="container" onclick='gotoread(`+data[0].id+`)'>
			 <div class="story">
			<div class="entrytext">
					<p class="title">`+data[0].title+`</p>
					<p class="authordate"> By `+data[0].penname+` on `+(data[0].submitdate).substr(4, (data[0].submitdate).length-1)+`<br>
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
			`<div class="container">
			 <div class="story">
			<div class="entrytext">
					<p class="title">`+data[i].title+`</p>
					<p class="authordate"> By `+data[i].penname+` on `+(data[i].submitdate).substr(4, (data[i].submitdate).length-1)+`<br>
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

//https://dl.dropbox.com/s/bkmd8qhu038pmm3/feed.js