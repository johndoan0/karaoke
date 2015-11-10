var React = require('react')
var Parse = require('parse')
var $ = require('jQuery')

import {PanelHeader} from './OwnerView.js'
import {GoBackOwnerViewButton} from './OwnerUploadSongs.js'


var OwnerProfileEditView = React.createClass({
	render: function(){
		return(
			<div className="panel panel-primary col-xs-9 col-sm-9 col-md-9 col-lg-9" id="ownerView">	
				<PanelHeader />				
				<div className="panel-body" id="ownerPanelBody">					
					<OwnerProfileEdit editable="true"/>
				</div>
				<GoBackOwnerViewButton />
			</div>			
		)
	}
})

var OwnerProfileEdit = React.createClass({
	render: function(){
		return(
			<div className="panel panel-info" id="editProfile">
				<div className="panel-heading">Edit Profile</div>
				<div className="panel-body">
					<form className="navbar-form navbar-left">
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Venue Name"/>
							<div contentEditable={this.props.editable}>edit me</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
})

export{OwnerProfileEditView}