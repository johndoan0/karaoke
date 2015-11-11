var React = require('react')
var Parse = require('parse')
var $ = require('jQuery')

import {GoBackOwnerViewButton} from './OwnerUploadSongs.js'

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
		}
		var venueProfileQuery = new Parse.Query('venueProfile')
		var vPQContains = venueProfileQuery.contains('venueName', vName)
		window.vPQCFind = vPQContains.find()

		var processFind = function(venProfileArr){
			
			var vPArrProcess = venProfileArr.map(function(ele){
				var eleAtt = ele.attributes
				return(
					<div>
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
									}
								}
							)
	},

	render: function(){
		if (this.props.editable === 'true'){
			return(
				<div>	
					{this.state.vProfileInfo}
					<button type="button" onClick={this._saveEdits}>Save</button>
					<GoBackOwnerViewButton />
				</div>
			)	
		}

		if (this.props.editable === 'false'){
			return(
				<div>
					{this.state.vProfileInfo}
					<button type="button" onClick={this._backToSearchView}>Back to Search</button>
				</div>
			)
		}
	}
})

export {VenueProfile}