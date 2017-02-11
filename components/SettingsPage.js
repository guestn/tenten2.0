/**
 * Settings Page
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  Switch
} from 'react-native';
import S from '../styles';

import LinearGradient from 'react-native-linear-gradient';
import MaterialSwitch from './MaterialSwitch';


export default class SettingsPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			farenheitScale: null
		}
	}
	
	componentDidMount() {
		AsyncStorage.getItem('tempScale').then((value) => {
			if (value != null) {
				console.log('there is storage',value)
				var val = (value === "true");
				console.log('val',val)
				this.setState({farenheitScale: val});
			}
    }).done();
	}

	
	saveData(value) {
		this.setState({farenheitScale: value})
		console.log(value)
    AsyncStorage.setItem('tempScale', JSON.stringify(value));
    AsyncStorage.getItem('tempScale').then((value) => {
	    console.log('storageIs',value)
	  }).done();
  }
	
  render() {
	  return (
	    <LinearGradient colors={['#f7f7f7', '#ddd']} start={{x: 0.0, y: 0.0}} end={{x: 0.5, y: 1.0}} style={S.pageCont}>
	    	<Text  style={[S.text, S.bigText]}>Settings</Text>
	    	<View style={S.settingsSwitchCont}>
	    		<Text style={S.text}>Celcius</Text>
	    		<View style={S.switchCont}>
		    	
		    	<Switch
		    		value={this.state.farenheitScale}
          	onValueChange={(value)=>{ this.saveData(value) }}
          />
		    	</View>
		    	<Text style={S.text}>Farenheit</Text>
	    	</View>
	    </LinearGradient>
	  );
	}
}
/*
<MaterialSwitch
		    		active={this.state.farenheitScale}
		    		onChangeState={(value)=>{ this.saveData(value) }}
		    	/>
*/