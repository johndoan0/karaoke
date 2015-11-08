var React = require('react')
var Parse = require('parse')

window.SR = SearchResults

var SearchView = React.createClass({

	render: function(){
		// <div id="searchView">
		// </div>

		return(
			<InputBox />
		)
	}
})

var InputBox = React.createClass({

	getInitialState: function(){
		return {resultsArr: []}
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
				<SelectFilter />			
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
	render: function(){
		
		// <option value="song">Song</option>

		// <select>
		// 		<option value="artist">Artist</option>		
		// </select>

		return(
			<div class="form-group">
			  <label for="sel1">Show all songs from:</label>
			  <select class="form-control" id="sel1">
			    <option>Spotlight</option>
			    <option>Glitter</option>
			    <option>Genjis</option>
			    <option>Ziller</option>
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
				<h1>JUST SING</h1>
				<p>Find your favorite songs at your favorite karaoke places</p>
			</div>
		)
	}
})

export {SearchView}