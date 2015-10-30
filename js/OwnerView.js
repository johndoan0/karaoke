var React = require('react')
var Parse = require('parse')

var OwnerView = React.createClass({
	
	_logout: function(click){
		Parse.User.logOut();
		location.hash = "searchView"
	},

	_sendFileToParse: function(){
		var sendFile = document.getElementById('fileinput')
		if(sendFile.files.length > 0){
			var parseFile = sendFile.files[0]
			var nameFile = "testtxt.txt"
		}

		var pFile = new Parse.File(parseFile, nameFile)

		pFile.save().then(function(){alert('File Uploaded!')})

		var parseObj = Parse.Object("testing")

		parseObj.set("testcolumn", pFile)

		parseObj.save()
	},

	_submitFile: function(click){
		console.log('submit file')
		var reader = new FileReader()
		var	uploadFile = document.getElementById('fileinput').files[0]
		reader.onloadend = function(){
			console.log('file uploaded', reader.result)
			// alert('File Uploaded!')

		}
		// reader.readAsText(document.getElementById('fileinput').files[0])
		reader.readAsText(uploadFile)
		document.getElementById('fileinput').value = ''

	},

	render: function(){
		return(
			<div id="ownerView">
				<button type="button" onClick={this._logout}>Log Out</button>
				<form>
  					<input type="file" accept="txt/*" id="fileinput"/>
  					<input type="submit" onClick={this._sendFileToParse} />
				</form>
			</div>
		)
	}
})


export {OwnerView}