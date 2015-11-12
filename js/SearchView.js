var React = require('react')
var Parse = require('parse')

window.SR = SearchResults

var SearchView = React.createClass({

	render: function(){

		return(
			<InputBox />
		)
	}
})

var InputBox = React.createClass({

	getInitialState: function(){
		return {resultsArr: []}
	},

	_getArtistorSongChange: function(){
		var artistOrSong = document.querySelector('#artOrSong'),
			artistOrSongChange = artistOrSong.options[artistOrSong.selectedIndex].text
		return artistOrSongChange
	},

	_handleVenueValue: function(venVal){
		this.setState({resultsArr: venVal})
	},

	_inputValueHandlerArtist: function(event){
		if (event.which === 13){
			var inputBox = event.target
			var searchValue = inputBox.value
			console.log('search value', searchValue)
			inputBox.value = ''
			this._searchValueToParseArtist(searchValue)
		}
	},

	_inputValueHandlerSong: function(event){
		if (event.which === 13){
			var inputBox = event.target
			var searchValue = inputBox.value
			console.log('search value', searchValue)
			inputBox.value = ''
			this._searchValueToParseSong(searchValue)
		}
	},

	_searchValueToParseArtist: function(value){
		// console.log('enter parse function')
		var self = this
		// var artistOrSongValue = {this._getArtistorSongChange}
		var searchValueQuery = new Parse.Query('karaoke')
		var sVQContains = searchValueQuery.contains("Artist", value)
		var processSearchResults = function(searchResultsArr){
			var songInfoArr = searchResultsArr.map(function(ele){return ele.attributes})
			// console.log('song info arr ', songInfoArr)
			self.setState({resultsArr:songInfoArr})
		}
		window.searchPromise = sVQContains.find()
		var sInfoArr = searchPromise.then(processSearchResults)
	},

	_searchValueToParseSong: function(value){
		// console.log('enter parse function')
		var self = this
		// var artistOrSongValue = {this._getArtistorSongChange}
		var searchValueQuery = new Parse.Query('karaoke')
		var sVQContains = searchValueQuery.contains("Song", value)
		var processSearchResults = function(searchResultsArr){
			var songInfoArr = searchResultsArr.map(function(ele){return ele.attributes})
			// console.log('song info arr ', songInfoArr)
			self.setState({resultsArr:songInfoArr})
		}
		window.searchPromise = sVQContains.find()
		var sInfoArr = searchPromise.then(processSearchResults)
	},

	render: function(){
		
		return(
			<div id="searchView">
				<SiteHeader />
				<LoginButtonOwner />
				<div className="input-group input-group-lg" id="inputSearch">
					<input type='text' className="form-control"  placeholder="Search for Artist..." onKeyPress={this._inputValueHandlerArtist}/>
					<input type='text' className="form-control"  placeholder="Search for Song..." onKeyPress={this._inputValueHandlerSong}/>
				</div>
				<SelectFilter onVenueValue={this._handleVenueValue} />			
				<SearchResults resultsArr={this.state.resultsArr}/>
			</div>
		)
	}
})

var LoginButtonOwner = React.createClass({

	_changeHashLoginViewOwner: function(click){
		return (location.hash = "loginViewOwner")
	},
	
	render: function(){
		return(
			<button id="loginOwnerButton" type="button" onClick={this._changeHashLoginViewOwner}>Owner Login</button>
		)
	}
})

var LoginButtonUser = React.createClass({

	_changeHashLoginViewUser: function(click){
		return (location.hash = "loginViewUser")

	},
	
	render: function(){
		return(
			<button type="button" onClick={this._changeHashLoginViewUser}>User Login</button>
		)
	}
})

var SearchResults = React.createClass({

	_resultsTableData: function(resultsArr){
		console.log('resultsTable', resultsArr)
		return(<ShowResultsTableData results={resultsArr} />)
	},

	render: function(){
		var resultsArr = this.props.resultsArr
		console.log('searchresults', resultsArr)
		return(
			<div className="panel panel-default searchResults">
				<table className="table table-striped" id="tableView">
					<ShowResultsTableHeaders />
					<tbody id="tableData">
						{resultsArr.map(this._resultsTableData)}
					</tbody>
				</table>
			</div>
		)
	}
})

var SelectFilter = React.createClass({

	_venueResults: function(change){
		var venueSelector = document.getElementById('sel1')
		var venueValue = venueSelector.options[venueSelector.selectedIndex].value
		console.log(venueValue)
		var self = this
		var searchValueQuery = new Parse.Query('karaoke')
		var sVQContains = searchValueQuery.contains('VenueName', venueValue)
		window.venuePromise = sVQContains.find()
		
		var processSearchResults = function(searchResultsArr){
			var songInfoArr = searchResultsArr.map(function(ele){return ele.attributes})		
			// send songInfoArr to parent InfoBox method ._handleVenueValue
			self.props.onVenueValue(songInfoArr)
		}

		venuePromise.then(processSearchResults)
	},

	render: function(){

		// ****{this._getOptions} to render options instead of hard code****

		return(
			<div className="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6" id="venueSel">
			  <label for="sel1"><h5>Or show all songs from:</h5></label>
			  <select className="form-control" id="sel1" onChange={this._venueResults}>
			  	<option>Select One:</option>
			    <option value="Spotlight">Spotlight Midtown</option>
			    <option value="Glitter">Glitter</option>
			    <option value="Genjis">Genjis</option>
			    <option value="Ziller">Ziller</option>
			  </select>
			</div>	
		)
	}
})


var ShowResultsTableData = React.createClass({

	_hashVenueProfile: function(){
		location.hash = "venueProfile/" + this.props.results.VenueName
	},

	render: function(){
		var singleResult = this.props.results
		return(		
			<tr>
				<td>{singleResult.Song}</td>
				<td>{singleResult.Artist}</td>
				<td><a onClick={this._hashVenueProfile}>{singleResult.VenueName}</a></td>
			</tr>	
		)
	}
})

var ShowResultsTableHeaders = React.createClass({

	render: function(){
		return(
			<thead id="tableHeaders">
				<tr>
					<th>Song</th>
					<th>Artist</th>
					<th>Venue</th>
				</tr>
			</thead>
		)
	}
})

var SiteHeader = React.createClass({
	render: function(){
		return(
			<div className="jumbotron" id="siteHeader" >
				<div className="site-title"> 
					<h1>SINGIT!</h1>
					<p>Find your favorite songs at your favorite karaoke places</p>
				</div>
				<i className="fa fa-angle-double-down downer"></i>
			</div>
		)
	}
})

export {SearchView}