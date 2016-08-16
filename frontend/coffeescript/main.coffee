React = require "react"
ReactDOM = require "react-dom"

require "../jade/index.jade"
require "../stylus/main.styl"
require "../images/jersey.jpg"

MyComponent = require "./components/my-component"

MyApp = React.createClass
	render: ->
		<MyComponent name="world" />

ReactDOM.render <MyApp />, document.querySelectorAll(".js-my-app")[0]