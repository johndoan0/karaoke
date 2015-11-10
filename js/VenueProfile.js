var React = require('react')
var Parse = require('parse')
var $ = require('jQuery')

var VenueProfile = React.createClass({
	render: function(){
		return(
			<div>	
				<div contentEditable={this.props.editable}>venue</div>
				<div contentEditable={this.props.editable}>address</div>
				<div contentEditable={this.props.editable}>phone number</div>
				<div contentEditable={this.props.editable}>description</div>
			</div>
		)
	}
})

export {VenueProfile}