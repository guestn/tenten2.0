/**
 * Material Design Switch
 * ideas from https://www.npmjs.com/package/react-native-material-design-switch
 */

import React, { Component } from 'react';
import { 
  View,
  TouchableHighlight,
  Animated,
  StyleSheet
} from 'react-native';

export default class CustomSwitch extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			active: props.active,
			position: new Animated.Value(-10),
		}
		this.onPress = this.onPress.bind(this)
	
	}

  componentDidMount() {

		const position = this.state.active ? 50: -10;
		this.setState({
			position: new Animated.Value(position)
		})
	}
	
	onPress(value) {
		this.setState({
			active: !this.state.active		
		})
		this.props.onChange(!this.state.active)
		const newPosition = this.state.active ? -10 : 50;
		this.animateToggle(newPosition);
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
		const position = this.state.position;
		const toggleColor = this.state.active ?  '#67B26F' : '#4ca2cd';

    return (
	    <TouchableHighlight 
	    	style={s.switchHolder} 
	    	onPress={this.onPress}
	    	active={this.state.active}
	    	>
	    	<Animated.View style={[s.switchToggle,
		    	{left: position, backgroundColor: toggleColor }
		    	]}>
	    	</Animated.View>
	    </TouchableHighlight>
    )
  }
};

const s = StyleSheet.create({
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
});