var React = require('react')
var Parse = require('parse')
var $ = require('jQuery')

var OwnerView = React.createClass({
	
	_logout: function(click){
		Parse.User.logOut();
		location.hash = "searchView"
	},

	_readFile: function(){
		var fileObj = {},
		    valsArr = [],
		    artistsStr = '',
		    songsStr = '',
		    venuesStr = '',
		    valsStrAddComma = '',
		    reader = new FileReader(),
		   	uploadFile = document.getElementById('fileinput').files[0]

		reader.onloadend = function(){
			// console.log('results', reader.result)
			var resultFile = reader.result.split('\n')
			var keysArr = resultFile[0].split(',')
			resultFile.shift()
			var valsMatrix = resultFile.map(function(ele){return ele.toLowerCase().split(',')})
			
			var songsRowObj = valsMatrix.map(function(arrEle){
				var songsForParse = new Parse.Object('Song'),
					venueId = Parse.User.current().id
					songsForParse.set('venueId',venueId)
				for (var i = 0; i < arrEle.length; i++) {
					var key = keysArr[i],
						val = arrEle[i]
					songsForParse.set(key, val)
				};

				// window.sfp = songsForParse
				// songsForParse.saveAll()
				return songsForParse			
			})

			window.s = songsRowObj
			console.log('Obj being saved', songsRowObj)

			// constrain(vID,'sadfa').find().then(()=>{this.destroy().then(()=>p.o.saveAll())})

			var PreviousSave = Parse.Object.extend('Song'),
				pSaveQuery = new Parse.Query(PreviousSave)
			window.psq=pSaveQuery
			var pSQDestroyAll = pSaveQuery.equalTo('venueId', Parse.User.current().id)
				.find({
					success: function(posts){
        						Parse.Object.destroyAll(posts)
        					}
        			}
        		)
        	pSQDestroyAll.then(function(){
        		Parse.Object.saveAll(songsRowObj, {success: alert('file uploaded!')})
        	})



			// pSaveQuery.get("venueId", Parse.User.current().id)
			// 	.then(function(previousData){console.log(previousData);return previousData.destroy()})
			// 	.then(function(destroyedPD){return destroyedPD.saveAll()})
			// .then(function(){Parse.Object.saveAll(songsRowObj, {success: alert('file uploaded!')})})

			// Parse.Object.saveAll(songsRowObj, {success: alert('file uploaded!')})
		}

		reader.readAsText(uploadFile)
		document.getElementById('fileinput').value = ''
	},

	render: function(){
		return(
			<div id="ownerView">
				<button type="button" onClick={this._logout}>Log Out</button>
				<form>
  					<input type="file" accept="txt/*" id="fileinput"/>
  					<input type="submit" onClick={this._readFile} />
				</form>
			</div>
		)
	}
})


export {OwnerView}