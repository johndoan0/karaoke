// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

var $ = require('jQuery'),
	Backbone = require('backbone'),
	React = require('react'),
	Parse = require('parse')
let fetch = require('./fetcher')
console.log('javascript loaded')

var APPID = 'QbwOKJXltHzsP9jnxBzVd0ACt4Nfp1LNl6yI0FlQ',
	JSKEY = 'fak75RLEK6liSqyro7iWfMyTigQ8xvpDG3GMQIKU',
	MKEY  = 'IuTQaqkcImF9qQRFkW5YmyRwveoje4EfnNG6DQrK',
	RESTAPIKEY = 'lKLL6dquas7qWutl2DrnGRhPq4izyCs7vUPNm79H'

Parse.initialize(APPID, JSKEY)

window.P = Parse

var KaraokeList = Parse.Object.extend('karaoke')

window.KL = KaraokeList

var Klistquery = new Parse.Query(KaraokeList)

// var KLQContains = Klistquery.contains('Artist', 'Taylor')

// var karaokeObjs = function(listele){console.log(listele.attributes)}

// var KLQCFind = KLQContains.find()
// 						.then(function(listArr){listArr.forEach(karaokeObjs)})

// var KlqFind = Klistquery.find()
// 						.then(function(listArr){listArr.forEach(karaokeObjs)})


import {SearchView} 		from './SearchView.js'
import {LoginViewUser} 		from './LoginViewUser.js'
import {LoginViewOwner} 	from './LoginViewOwner.js'
import {OwnerView} 			from './OwnerView.js'
import {UploaderView} 		from './OwnerUploadSongs.js'
import {OwnerSongsView}		from './OwnerSongs.js'
import {VenueProfile}		from './VenueProfile.js'

var KaraokeRouter = Backbone.Router.extend({

	routes: {
		"searchView": "showSearchView",
		"loginViewUser": "showLoginUser",
		"loginViewOwner": "showLoginOwner",
		"ownerView": "showOwnerView",
		"ownerView/uploadSongs": "showUploadSongs",
		"ownerView/ownerSongs": "showOwnerSongs",
		"venueProfile/:username": "showVenueProfile",
		"venueProfileUser": "showVenueProfileUser",
		"*anyroute": "routetoSearchView"
	},

	processOwnerInfo: function(username,password){
		console.log("owner username: " + username + " owner password: " + password)
		// sign up a new user
		var newUsr = new Parse.User()
		newUsr.set('username',username)
		newUsr.set('password',password)
		newUsr.set('type', 'Owner')
		newUsr.signUp()
			.then(
				//success 
				function(usr){
					//new user signup
					console.log(username + ' signed up!')
					console.log(usr)
					// location.hash 
					console.log(Parse.User.current())
			})
			.fail(
				//previous user relogging
				function(err){
					return newUsr.logIn()
					}
			)
			.then(
				// new user logging in
				function(){
					console.log(username + ' logged in!')
					location.hash = "ownerView"
				},
				// previous username logged, wrong password
				function(){
					alert('username and password combination not valid!')
				}
			)
	},

	processUserInfo: function(username,password){
		console.log("username: " + username + " password: " + password)
		// sign up a new user
		var newUsr = new Parse.User()
		newUsr.set('username',username)
		newUsr.set('password',password)
		newUsr.set('Type', 'User')
		newUsr.signUp()
			.then(
				//success 
				function(usr){
					//new user signup
					console.log(username + ' signed up!')
					console.log(usr)
					// location.hash
					console.log(Parse.User.current())
			})
			.fail(
				//previous user relogging
				function(err){
					return newUsr.logIn()
					}
			)
			.then(
				// new user logging in
				function(){
					console.log(username + ' logged in!')
					location.hash = "userView"
				},
				// previous username logged, wrong password
				function(){
					alert('username and password combination not valid!')
				}
			)
	},

	routetoSearchView: function(){
		location.hash = "searchView"
	},

	showLoginOwner: function(){
		React.render(<LoginViewOwner sendUserInfo={this.processOwnerInfo} />, document.querySelector("#wrapper"))
	},

	showUploadSongs: function(){
		React.render(<UploaderView />, document.querySelector("#wrapper"))
	},

	showLoginUser: function(){
		React.render(<LoginViewUser sendUserInfo={this.processUserInfo} />, document.querySelector("#wrapper"))
	},

	showVenueProfile: function(username){
		console.log("username", username)
		// console.log("parse user", Parse.User.current().getUsername())
	
		var editProfile = false
		if (Parse.User.current()){
			console.log('current user exists')
			//prevents User A from editing User B data
			if (username === Parse.User.current().getUsername()){ 
				editProfile = true
				React.render(<VenueProfile editable="true" />, document.querySelector("#wrapper"))
			}	
		}
		
		if (!editProfile) {
			console.log('rendering uneditable user profile')
			React.render(<VenueProfile editable="false" />, document.querySelector("#wrapper"))
		}
	},

	showVenueProfileUser: function(){
		React.render(<VenueProfile editable="false"/>, document.querySelector("#wrapper"))
	},

	showOwnerSongs: function(){
		React.render(<OwnerSongsView />, document.querySelector("#wrapper"))
	},

	showOwnerView: function(){
		React.render(<OwnerView />, document.querySelector("#wrapper"))
	},

	showSearchView: function(){
		React.render(<SearchView />, document.querySelector("#wrapper"))
	}
})


var kr = new KaraokeRouter()
Backbone.history.start()
