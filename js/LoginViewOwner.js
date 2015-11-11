var React = require('react')
var Parse = require('parse')
var swal = require('sweetalert')

var LoginViewOwner = React.createClass({

	_cancel: function(click){
		location.hash = "searchView"
	},

	_getLoginParams: function(event){

		if (event.which === 13){
			var password = event.target.value,
				username = this.refs.usernameInput.getDOMNode().value
			this.props.sendUserInfo(username,password)
		}
	},

	_logIn: function(click){
		var password = this.refs['passwordInput'].getDOMNode().value,
			username = this.refs.usernameInput.getDOMNode().value
		this.props.sendUserInfo(username,password)
	},

	render: function(){
	
		return (		
			<form className="form-signin">       
      			<h2 className="form-signin-heading">SINGIT!</h2>
      			<h3	className="form-signin-heading">Please Login</h3>
      			<div className="input-group">
      				<input type="text" className="form-control loginOwnerInputs" name="username" placeholder="Username" 
      					ref="usernameInput" autofocus="" />
      				<input type="password" className="form-control loginOwnerInputs" name="password" 
      					placeholder="Password" required="" ref="passwordInput" onKeyPress={this._getLoginParams} />
      			</div>
      			<div className="btn-group center-block" role="group" aria-label="...">
      				<button type="button" className="btn btn-default" onClick={this._logIn}>Log In</button>			 			
      				<button type="button" className="btn btn-default" onClick={this._cancel}>Cancel</button>			
  				</div>
  			</form>
		)
	}

})

export {LoginViewOwner}