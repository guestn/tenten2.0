/**
 * Settings Page
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
import MaterialSwitch from './MaterialSwitch';


export default class SettingsPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			farenheitBool: true
		}
	}
  render() {
	  return (
	    <LinearGradient colors={['#f7f7f7', '#ddd']} start={{x: 0.0, y: 0.0}} end={{x: 0.5, y: 1.0}} style={S.pageCont}>
	    	<Text  style={[S.text, S.bigText]}>Settings</Text>
	    	<View style={S.settingsSwitchCont}>
	    		<Text style={S.text}>Celcius</Text>
	    		<View style={S.switchCont}>
		    	<MaterialSwitch 
		    		active={this.state.farenheitBool} 
		    		onChangeState={(value)=>{this.setState({farenheitBool:value})}}
		    	/>
		    	</View>
		    	<Text style={S.text}>Farenheit</Text>
	    	</View>
	    </LinearGradient>
	  );
	}
}

AppRegistry.registerComponent('TenTen', () => App);
