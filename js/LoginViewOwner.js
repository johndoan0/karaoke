var React = require('react')
var Parse = require('parse')

var LoginViewOwner = React.createClass({

	_getLoginParams: function(event){

		if (event.which === 13){
			var password = event.target.value,
				username = this.refs.usernameInput.getDOMNode().value
			this.props.sendUserInfo(username,password)
		}
	},

	render: function(){
		return (
			<div id="loginBoxOwner">
				<input type="text" placeholder="username" ref="usernameInput"/>
				<input type="password" placeholder="password" onKeyPress={this._getLoginParams}/>
			</div>
		)
	}

})

export {LoginViewOwner}