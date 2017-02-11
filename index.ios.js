/**
 * TenTen Temperature app
 * 
 * All async storage managed from root component
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Image,
  AsyncStorage
} from 'react-native';
import S from './styles';

import Homepage from './components/Homepage';
import SettingsPage from './components/SettingsPage';

export default class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			tempSetting: 180,
			heaterSetting: false,
			settings: true
		}
		this.renderScene = this.renderScene.bind(this)
		this.handleSliderChanges = this.handleSliderChanges.bind(this)
		this.handleSwitchChanges = this.handleSwitchChanges.bind(this)
		this.getStorage = this.getStorage.bind(this)
		this.handleSettingChanges = this.handleSettingChanges.bind(this)
		this.props.tempSetting = this.handleSliderChanges;
		this.props.onChange = this.handleSwitchChanges;
	}
	
	componentDidMount() {
		this.getStorage()
	}

	getStorage() {
		AsyncStorage.getItem('tempScale').then((value) => {
			if (value != null) {
				var val = (value === "true");
				this.setState({settings: val});
			}
    }).done();
    console.log('storageGot')
	}
	
	handleSliderChanges(value) {
		this.setState({
			tempSetting: value
		})
	}
	
	handleSwitchChanges(value) {
		this.setState({
			heaterSetting: value
		})
	}
	
	handleSettingChanges(value) {
		this.setState({
			settings: value
		})
		AsyncStorage.setItem('tempScale', JSON.stringify(value));
	}

	renderScene(route, navigator) {
		if(route.index === 0) {
		  return (
		  	<Homepage 
					navigator={navigator} 
					onSliderChange={(value) => this.handleSliderChanges(value)} 
					onSwitchChange={(value) => this.handleSwitchChanges(value)} 
					tempScale={this.state.settings} 
					onSettingChange={this.handleSettingChanges}
				/>
				)
		}
		if(route.index === 1) {
    	return (
				<SettingsPage 
					navigator={navigator} 
					active={this.state.settings} 
					onChange={(value) => {this.handleSettingChanges(value)}}
				/>
			)
   	}
	}
	
  render() {
		console.log('rootstate',this.state)
	  
	  const routes = [
	    {title: 'Home', index: 0},
	    {title: 'Settings', index: 1},
	  ]
	  
	  return (
	    <Navigator
	      initialRoute={routes[0]}
	      initialRouteStack={routes}
	      renderScene={this.renderScene}
	      style={S.navigator}
	      navigationBar={
					<Navigator.NavigationBar
						style={S.navbar}
						routeMapper={{
							LeftButton: (route, navigator, index, navState) => {
								if (route.index === 0) {
									return null;
								} else {
									return (
										<TouchableHighlight style={S.navbarIcon} onPress={() => navigator.pop()}
										activeOpacity={0.5}
										underlayColor='transparent'>
											<Image style={{width: 32, height: 32,}} source={require('./assets/arrow-icon.png')}/>
										</TouchableHighlight>
									);
								}
							},
							RightButton: (route, navigator, index, navState) => {
								if (route.index === 1) {
									return null;
								} else {
									return (
										<TouchableHighlight style={S.navbarIcon} onPress={() => navigator.push(routes[1])}
										activeOpacity={0.5}
										underlayColor='transparent'>
											<Image style={{width: 32, height: 32,}} source={require('./assets/settings-icon.png')}/>
										</TouchableHighlight>
									);
								}
							},
							Title: (route, navigator, index, navState) => {
								return (<Text style={S.navbarText}>TenTen</Text>); 
							},
						}}
					/>
			  }
	      	    />

	  );
	}
}

AppRegistry.registerComponent('TenTen', () => App);
