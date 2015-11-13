var React = require('react')
var Parse = require('parse')
var $ = require('jQuery')

import {GoBackOwnerViewButton} from './OwnerUploadSongs.js'
import {PanelHeader} from './OwnerView.js'


var VenueProfile = React.createClass({

	componentWillMount: function(){
		this._getProfileInfo()
	},

	getInitialState: function(){
		return {
			vProfileInfo: []
		}
	},

	_backToSearchView: function(click){
		
		location.hash = "searchView"
	},

	_getProfileInfo: function(click){

		var self = this
		if(Parse.User.current()){
			var vName = Parse.User.current().getUsername()
		}
		else{
			var vName = location.hash.split('/')[1]
			// var vName = document.querySelector('.venueLink')[0].innerHTML
		}
		var venueProfileQuery = new Parse.Query('venueProfile')
		var vPQContains = venueProfileQuery.contains('venueName', vName)
		window.vPQCFind = vPQContains.find()

		var processFind = function(venProfileArr){
			
			var vPArrProcess = venProfileArr.map(function(ele){
				var eleAtt = ele.attributes
				return(
					<div id="venueProfile">
						<div id="venueName">{eleAtt.venueName}</div>
						<div id="address" contentEditable={self.props.editable}>{eleAtt.address}</div>
						<div id="phone" contentEditable={self.props.editable}>{eleAtt.phone}</div>
						<a id="link" href={eleAtt.link} contentEditable={self.props.editable}>{eleAtt.link}</a>
						<div id="description" contentEditable={self.props.editable}>{eleAtt.description}</div>
					</div>
				)	
			})

			self.setState({vProfileInfo: vPArrProcess})
		}

		vPQCFind.then(processFind)
	},

	_saveEdits: function(click){
		
		var	vNameHtml = document.querySelector("#venueName").innerHTML,
			addressHtml = document.querySelector("#address").innerHTML,
			phoneHtml = document.querySelector("#phone").innerHTML,
			linkHtml = document.querySelector("#link").innerHTML,
			descHtml = document.querySelector("#description").innerHTML,
			username = Parse.User.current().getUsername(),
			SaveEdits = new Parse.Query('venueProfile')

		window.sEdits = SaveEdits.equalTo("venueName", vNameHtml)
							.first({
									success: function(results){
										results.set({
											address: addressHtml,
											phone: phoneHtml,
											link: linkHtml,
											description: descHtml
										})
										results.save()
										alert('Updates to Profile Saved!')
										location.hash = "ownerView"
									}
								}
							)
	},

	render: function(){
		if (this.props.editable === 'true'){
			return(
				<div className="panel panel-primary col-xs-offset-1 col-xs-10" id="ownerView">	
					<PanelHeader />
					<div className="panel panel-info col-xs-offset-1 col-xs-10" id="editProfilePanel">
						<h6 id="editProfileHeader" className="panel-heading text-center">Edit Your Profile</h6>
						<div className="panel-body">	
							{this.state.vProfileInfo}
						</div>
					</div>
					<button id="saveProfileEdits" type="button" onClick={this._saveEdits}>Save</button>
					<GoBackOwnerViewButton />
				</div>
			)	
		}

		if (this.props.editable === 'false' && this.props.popup === 'true'){

			var vName = document.querySelector('.venueLink').innerHTML

			return(
				<div id="popup" className="panel panel-primary col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6">	
					<div className="panel-heading">{vName} Profile</div>			
					{this.state.vProfileInfo}
				</div>
			)

		}

		if (this.props.editable === 'false'){

			var vName = location.hash.split('/')[1]
			
			return(
				<div className="panel panel-primary col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6" id="userViewProfile">	
					<div className="panel-heading">{vName} Profile</div>			
					{this.state.vProfileInfo}
					<button id="backToSearch" type="button" onClick={this._backToSearchView}>Back to Search</button>
				</div>
			)
		}
	}
})

export {VenueProfile}