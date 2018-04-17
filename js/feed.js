
$.ajax({
	url: "https://api.mlab.com/api/1/databases/darknessprevails/collections/darknessprevailssubmissions?apiKey=aDwl-yLfA68HFnJWjDsZmF8akGTu3lKJ",
	method: 'get',
	success: function(data){
		console.log(data[data.length-1]._id.$oid);
		$('#outerstorycont').html(
		`<div class="container" onclick='gotoread(`+data[data.length-1].id+`)'>
			 <div class="story">
			<div class="entrytext">
					<p class="title">`+data[data.length-1].title+`</p>
					<p class="authordate"> By `+data[0].penname+` on `+(data[data.length-1].submitdate).substr(4, (data[data.length-1].submitdate).length-1)+`<br>
`+data[0].category+` | `+(data[data.length-1].views).length+` Views </p>
			</div>
			<div class="votes"> <button id="upvote" class="upvote" type="image"></button>
					<p class="votecount">`+data[data.length-1].votes+`</p>
				<button id="downvote" class="downvote"></button> </div>
		<hr class="break"> </div>
	</div>`
		)
		for(i=data.length-2;i>0;i--){
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