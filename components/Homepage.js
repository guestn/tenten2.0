/**
 * Homepage
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import S from '../styles';
import LinearGradient from 'react-native-linear-gradient';

import CircularSlider from './CircularSlider';
import CustomSwitch from './CustomSwitch';

export default class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
      slider1: 220,
      switchBool: false,
      settings: props.settings
    }
    this.tempSetting = this.tempSetting.bind(this)
    this.heaterSetting = this.heaterSetting.bind(this)

	  console.log(this.props)

	}
	
	tempSetting(value) {
		this.setState({
			slider1: value
		})
		this.props.onSliderChange(value)
	}
	
	heaterSetting(value) {
		this.setState({
			switchBool: value
		})
		this.props.onSwitchChange(value)
	}
	
  render() {
	  return (
	    <LinearGradient colors={['#f7f7f7', '#ddd']} start={{x: 0.0, y: 0.0}} end={{x: 0.5, y: 1.0}} style={S.pageCont}>
	    	<Text style={[S.text, S.bigText]}>Temperature</Text>
	    	<View>
					<CircularSlider 
						width={300} 
						height={300} 
						meterColor='#0cd' 
						textColor='#999'
						value={this.state.slider1}
						tempScale={this.props.tempScale}
						onValueChange={(value) => this.tempSetting(value)}
						tempSetting={(value) => this.tempSetting(value)}
          	/>
	    	</View>
	    	<View style={S.switchCont}>
		    	<CustomSwitch onChange={(value) => {this.heaterSetting(value)}}/>
	    	</View>
	    	<View style={S.statusContainer}>
	    		<Text style={S.text}>Heating is currently { this.state.switchBool ? 'ON' : 'OFF' }</Text>
	    	</View>
	    </LinearGradient>
	  );
	}
}
