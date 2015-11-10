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

	_handleVenueValue: function(venVal){
		this.setState({resultsArr: venVal})
	},

	_inputValueHandler: function(event){
		if (event.which === 13){
			var inputBox = event.target
			var searchValue = inputBox.value
			console.log('search value', searchValue)
			inputBox.value = ''
			this._searchValueToParse(searchValue)
		}
	},

	_searchValueToParse: function(value){
		// console.log('enter parse function')
		var self = this
		var searchValueQuery = new Parse.Query('karaoke')
		var sVQContains = searchValueQuery.contains('Artist', value)
		var processSearchResults = function(searchResultsArr){
			var songInfoArr = searchResultsArr.map(function(ele){return ele.attributes})
			// console.log('song info arr ', songInfoArr)
			self.setState({resultsArr:songInfoArr})
		}
		window.searchPromise = sVQContains.find()
		var sInfoArr = searchPromise.then(processSearchResults)

	},

	render: function(){
		// <LoginButtonUser />
		return(
			<div id="searchView">
				<LoginButtonOwner />
				<SiteHeader />
				<div className="input-group input-group-lg" id="inputSearch">
					<input type='text' className="form-control"  placeholder="Search for Artist..." onKeyPress={this._inputValueHandler}/>
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
				<table className="table"id="tableView">
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
			<div className="form-group text-center col-xs-6 col-sm-6 col-md-6 col-lg-6">
			  <label for="sel1">Or show all songs from:</label>
			  <select className="form-control" id="sel1" onChange={this._venueResults}>
			  	<option>Select One:</option>
			    <option value="Spotlight">Spotlight</option>
			    <option value="Glitter">Glitter</option>
			    <option value="Genjis">Genjis</option>
			    <option value="Ziller">Ziller</option>
			  </select>
			</div>
		)
	}
})


var ShowResultsTableData = React.createClass({
	render: function(){
		var singleResult = this.props.results
		return(		
			<tr>
				<td>{singleResult.Song}</td>
				<td>{singleResult.Artist}</td>
				<td>{singleResult.VenueName}</td>
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
				<h1>SINGIT!</h1>
				<p>Find your favorite songs at your favorite karaoke places</p>
			</div>
		)
	}
})

export {SearchView}