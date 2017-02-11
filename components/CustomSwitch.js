/**
 * Material Design Switch
 * updated from https://www.npmjs.com/package/react-native-material-design-switch
 */

import React, { Component } from 'react';
import { 
	PanResponder,
  View,
  TouchableHighlight,
  Animated,
  Text,
  StyleSheet
} from 'react-native'


export default class CustomSwitch extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			position: new Animated.Value(-10),
		}

		this.onPress = this.onPress.bind(this)
	
	}

  componentDidMount() {
		
	}
	
	onPress(value) {
		//console.log('value',value)
		this.setState({
			active: !this.state.active		
		})
		this.props.active(!this.state.active)
		//console.log('click',this.state.active);
		const position = this.state.active ? -10 : 50
			
		this.animateToggle(position) 
	}
	
	animateToggle(position) {
			Animated.timing(
	      this.state.position,
	      {
	        toValue: position,
	        duration: 200,
	      }
	    ).start();
	}
  
  render() {
		//const position = this.state.active ? 50 : -10
		const position = this.state.position; 

    return (
	    <TouchableHighlight 
	    	style={s.switchHolder} 
	    	onPress={this.onPress}
	    	active={this.state.active}
	    	>
	    	<Animated.View style={[s.switchToggle,
		    	{left: position }
		    	]}>
	    	</Animated.View>
	    </TouchableHighlight>
    )
  }
};
var s = StyleSheet.create({
	switchHolder: {
		width: 100,
		height: 40,
		backgroundColor: '#ddd',
		borderRadius: 20,
		borderWidth: 2,
		borderColor: '#ccc'
	},
	switchToggle: {
		position:'absolute',
		backgroundColor: '#4ca2cd',
		height: 60,
		width:60,
		left: -10,
		top: -12,
		borderRadius: 30,
		shadowColor: 'black',
		shadowOpacity: 0.1,
		shadowOffset: {width:0, height:5},
		shadowRadius: 5,
	}
	
});3