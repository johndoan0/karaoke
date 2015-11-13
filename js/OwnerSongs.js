var React = require('react')
var Parse = require('parse')
var $ = require('jQuery')

import {PanelHeader} from './OwnerView.js'
import {GoBackOwnerViewButton} from './OwnerUploadSongs.js'

var OwnerSongsView = React.createClass({
	render: function(){
		return(
			<div className="panel panel-primary col-xs-offset-1 col-xs-10" id="ownerView">	
				<PanelHeader />				
				<div className="panel-body" id="ownerPanelBody">					
					<OwnerSongsTable />
				</div>
				<GoBackOwnerViewButton />
			</div>			
		)
	}
})

var OwnerSongsTable = React.createClass({

	getInitialState: function(){
		return {venueSongs: []}
	},

	componentWillMount: function(){
		this._venueSongs()
	},

	_venueSongs: function(){

		// console.log('_venueSongs')
		var self = this
		var venueName = Parse.User.current().getUsername()
		var venueQuery = new Parse.Query('karaoke')
		var venueContains = venueQuery.contains('VenueName', venueName)
		window.venuePromise = venueContains.find()

		var processSearchResults = function(searchResultsArr){
			
			var songInfoArr = searchResultsArr.map(function(ele){
				return(
					<tr>
						<td>{ele.attributes.Artist}</td>
						<td>{ele.attributes.Song}</td>
					</tr>
				) 	
			})

			self.setState({venueSongs:songInfoArr})
		}

		venuePromise.then(processSearchResults)
	},

	render: function(){

		return(
			<div className="panel panel-info" id="venueTable">
				<div className="panel-heading">{Parse.User.current().getUsername()} Songs</div>
					<table className="table table-striped" id="tableView">
						<thead>
							<tr>
								<th>Artist</th>
								<th>Song</th>
							</tr>
						</thead>
						<tbody>					
						{this.state.venueSongs}
						</tbody>
					</table>
			</div>
		)

	}
})

export{OwnerSongsView}

