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

import CircularSlider from './CircularSlider';
import MaterialSwitch from './MaterialSwitch';
import CustomSwitch from './CustomSwitch';

import LinearGradient from 'react-native-linear-gradient';


export default class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
      slider1: 220,
      switchBool: false,
      settings: this.props.settings
    }
    this.tempSetting = this.tempSetting.bind(this)
    this.heaterSetting = this.heaterSetting.bind(this)

	  console.log(this.props)

	}
	
	componentWillReceiveProps(nextProps) {
		//console.log('nextProps',nextProps)
		this.setState({
			settings: nextProps.settings
		})
	}
	
	tempSetting(value) {
		this.setState({
			slider1: value
		})
		this.props.tempSetting(value)
	}
	
	heaterSetting(value) {
		this.setState({
			switchBool: value
		})
		this.props.heaterSetting(value)
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
						onValueChange={(value) => this.tempSetting(value)}
						tempSetting={(value) => this.tempSetting(value)}
          	/>
	    	</View>
	    	<View style={S.switchCont}>
		    	<CustomSwitch active={(value) => {this.heaterSetting(value)}}/>
	    	</View>
	    	<View style={S.statusContainer}>
	    		<Text style={S.text}>Heating is currently { this.state.switchBool ? 'ON' : 'OFF' }</Text>
	    	</View>
	    	<View><Text>{
		    	this.state.settings ? 'Far' : 'Cel'}</Text></View>
	    </LinearGradient>
	  );
	}
}

//          	onValueChange={(value) => this.setState({slider1:value})}/>
