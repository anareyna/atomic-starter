React = require "react"

MyComponent = React.createClass
	render: ->
		<div>Hello {this.props.name}!</div>

module.exports = MyComponent