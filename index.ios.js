/**
 * TenTen Temperature app
 * 
 * 
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Image
} from 'react-native';
import S from './styles';

import Homepage from './components/Homepage';
import SettingsPage from './components/SettingsPage';

export default class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			tempSetting: 0,
			heaterSetting: false
		}
		this.renderScene = this.renderScene.bind(this)
		this.handleChanges = this.handleChanges.bind(this)
		this.props.tempSetting = this.handleChanges;
		this.props.heaterSetting = this.handleSwitchChanges;

	}
	
	handleChanges(value) {
		this.setState({
			tempSetting: value
		})
	}
	handleSwitchChanges(value) {
		console.log('rootvalue',value)
		this.setState({
			heaterSetting: value
		})
	}	

	renderScene(route, navigator) {
		if(route.index === 0) {
		  return <Homepage navigator={navigator} tempSetting={this.handleChanges} heaterSetting={this.handleSwitchChanges}/>
		}
		if(route.index === 1) {
     return <SettingsPage navigator={navigator} {...this.props} />
   	}
	}
	
  render() {
	  console.log(this.state)
	  
	  const routes = [
	    {title: 'Home', index: 0},
	    {title: 'Settings', index: 1},
	  ]
	  
	  return (
	    <Navigator
	      initialRoute={routes[0]}
	      initialRouteStack={routes}
	      renderScene={this.renderScene}
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
	      style={{padding: 20, paddingTop: 64}}
	    />
	  );
	}
}

AppRegistry.registerComponent('TenTen', () => App);
