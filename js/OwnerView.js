var React = require('react')
var Parse = require('parse')
var $ = require('jQuery')

var OwnerView = React.createClass({
	
	_logout: function(click){
		Parse.User.logOut();
		location.hash = "searchView"
	},

	render: function(){

		return(
			<div className="panel panel-primary col-xs-4 col-sm-4 col-md-4 col-lg-4" id="ownerView">	
				<PanelHeader />				
				<div className="panel-body" id="ownerPanelBody">					
					<ButtonOwnerNav />
				</div>
			</div>
		)
	}
})

var ButtonOwnerNav = React.createClass({

	_hashVenueProfile: function(){
		var id = Parse.User.current().getUsername()
		location.hash = "venueProfile/" + id
	},

	_hashOwnerSongs: function(){
		location.hash = "ownerView/ownerSongs"
	},

	_hashUploadSongs: function(){
		location.hash = "ownerView/uploadSongs"
	},

	render: function(){
		return(
			<div className="btn-group-vertical" role="group" aria-label="...">
				<button type="button" className="btn btn-success" onClick={this._hashVenueProfile}>My Profile</button>
				<button type="button" className="btn btn-primary" onClick={this._hashOwnerSongs}>My Songs</button>
				<button type="button" className="btn btn-info" onClick={this._hashUploadSongs}>Upload Songs</button>
			</div>
		)
	}
})

var PanelHeader = React.createClass({
	render: function(){
		return(

			<div className="panel-heading">
				<button type="button" className="btn btn-default btn-xs ownerLogOut" onClick={this._logout}>Log Out</button>
				<h5 className="panel-title">{Parse.User.current().getUsername()} is logged in!</h5>
			</div>
		)
	}
})


export {OwnerView}
export {PanelHeader}