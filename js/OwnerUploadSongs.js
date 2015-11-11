var React = require('react')
var Parse = require('parse')
var $ = require('jQuery')

import {PanelHeader} from './OwnerView.js'

var UploaderView = React.createClass({

	render: function(){

		return (
			<div className="panel panel-primary col-xs-4 col-sm-4 col-md-4 col-lg-4" id="ownerView">	
				<PanelHeader />				
				<div className="panel-body" id="ownerPanelBody">					
					<UploadSongs />
				</div>
				<GoBackOwnerViewButton />
			</div>				
		)
	}
})

var UploadSongs = React.createClass({

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
				var songsForParse = new Parse.Object('karaoke'),
					venueId = Parse.User.current().getUsername()
					songsForParse.set('VenueName',venueId)
				for (var i = 0; i < arrEle.length; i++) {
					var key = keysArr[i],
						val = arrEle[i]
					songsForParse.set(key, val)
				};

				return songsForParse			
			})

			window.s = songsRowObj
			console.log('Obj not filtered', songsRowObj)

			var PreviousSave = Parse.Object.extend('karaoke'),
				pSaveQuery = new Parse.Query(PreviousSave)
			var pSQFind = pSaveQuery.equalTo('VenueName', Parse.User.current().getUsername())
				.find()
			window.psqf = pSQFind
	
			var buildLookupTable = function(songsArray) {
				var table = {}
				// console.log('bare table', songsArray)
				for (var i = 0; i < songsArray.length; i++) {
					table[songsArray[i].attributes.Artist + 
						"_" + 
						songsArray[i].attributes.Song] = true
				};
				return table 
			}

			pSQFind.then(function(oldSongs){
				var newSongs = songsRowObj
				var oldSongSet = buildLookupTable(oldSongs)
				console.log('table with stuff', oldSongSet)
				var filteredNewSongs = newSongs.filter(function(songObj){
					var uniqueKey = songObj.get('Artist') + '_' + songObj.get('Song')
					if (oldSongSet[uniqueKey]) return false
					return true 
				})
				console.log('filtered songs to upload', filteredNewSongs)
				Parse.Object.saveAll(filteredNewSongs).then(function(){alert('New Songs Saved!')})
			})
		}

		reader.readAsText(uploadFile)
		document.getElementById('fileinput').value = ''
	},

	render: function(){
		return(
			<form id="ownerUpload">
				<h4>Upload a .csv song list</h4>
					<input type="file" accept="txt/*" id="fileinput"/>
					<input type="submit" onClick={this._readFile} />
			</form>
		)
	}
})

var GoBackOwnerViewButton = React.createClass({
	
	_hashOwnerView: function(){
		location.hash =  "ownerView"
	},

	render: function(){
		return(
			<button id="goBackOwnerView" type="button" onClick={this._hashOwnerView}>Go Back</button>
		)
	}

})


export{GoBackOwnerViewButton}
export{UploaderView}
export{UploadSongs}