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
			tempSetting: 0,
			heaterSetting: false,
			settings: true
		}
		this.renderScene = this.renderScene.bind(this)
		this.handleSliderChanges = this.handleSliderChanges.bind(this)
		this.handleSwitchChanges = this.handleSwitchChanges.bind(this)
		this.getStorage = this.getStorage.bind(this)
		this.props.tempSetting = this.handleSliderChanges;
		this.props.heaterSetting = this.handleSwitchChanges;

	}
	
	componentDidMount() {
		this.getStorage()
	}
	componentDidUpdate() {
		//this.getStorage()
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
		console.log('rootvalue',value)
		this.setState({
			heaterSetting: value
		})
	}

	renderScene(route, navigator) {
		if(route.index === 0) {
		  return <Homepage navigator={navigator} tempSetting={this.handleSliderChanges} heaterSetting={this.handleSwitchChanges} settings={this.state.settings}/>
		}
		if(route.index === 1) {
     return <SettingsPage navigator={navigator} settings={this.state.settings}/>
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
