/**
 * Circular Slider
 */

import React, { Component } from 'react';
import { PanResponder, View, Animated } from 'react-native'
import Svg,{Path,Circle,G,Text, Defs,Stop,LinearGradient} from 'react-native-svg'

export default class CircularSlider extends Component {

  constructor(props){
    super(props)
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
    this.cartesianToPolar = this.cartesianToPolar.bind(this)
    this.polarToCartesian = this.polarToCartesian.bind(this)
    const {width,height} = props;
    const smallestSide = (Math.min(width,height))

    this.state = {
      cx: width/2,
      cy: height/2,
      r: (smallestSide / 2) * 0.85,
      bounceValue: new Animated.Value(0),
    }
  }
  
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove
    })
  }
  
  componentDidMount() {
	  this.state.bounceValue.setValue(1.25);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.8,                         // Animate to smaller size
        friction: 2,                          // Bouncier spring
      }
    ).start();   
  }
  
  polarToCartesian(angle){
    const { cx, cy, r } = this.state,
      a = (angle - 270) * Math.PI / 180.0
      x = cx + (r * Math.cos(a)),
      y = cy + (r * Math.sin(a));
    return { x, y }
  }
  
  cartesianToPolar(x,y){
    const {cx,cy} = this.state
    return Math.round((Math.atan((y-cy)/(x-cx)))/(Math.PI/180)+((x>cx) ? 270 : 90))
  }
  
  handlePanResponderMove({nativeEvent:{locationX,locationY}}){
    this.props.onValueChange(this.cartesianToPolar(locationX,locationY))
  }
  
  render() {
    const { width, height, value, meterColor, textColor, onValueChange } = this.props,
      { cx, cy, r } = this.state,
      startCoord = this.polarToCartesian(0),
      endCoord = this.polarToCartesian(value),
      temperatureValue = Math.floor(value/18 + 60);
      //console.log(this.props)
    return (
	    <Animated.View 
	    style={{
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
      >
      <Svg onLayout={this.onLayout} width={width} height={height}>
 
        <Text key={value+''} x={158} y={80} fontSize={96} fill={textColor} textAnchor="middle">{temperatureValue+''}&#176;</Text>
      	<Defs>
					<LinearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
						<Stop offset="0" stopColor="#67B26F" stopOpacity="1" />
						<Stop offset="1" stopColor="#4ca2cd" stopOpacity="1" />
					</LinearGradient>
				</Defs>
				<Circle cx={cx} cy={cy} r={r} stroke='#ddd' strokeWidth={10} fill='none'/>
        <Circle cx={cx} cy={cy} r={r+6} stroke='#ccc' strokeWidth={2} fill='none'/>
        <Circle cx={cx} cy={cy} r={r-6} stroke='#ccc' strokeWidth={2} fill='none'/>

        <Path stroke="url(#grad)" strokeWidth={20} fill="transparent" strokeLinecap="round" 
          d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value>180?1:0} 1 ${endCoord.x} ${endCoord.y}`}/>
        <G x={endCoord.x-7.5} y={endCoord.y-7.5}>
          <Circle cx={7.5} cy={7.5} r={22} fill="url(#grad)" {...this._panResponder.panHandlers}/>
          <Text key={value+''} x={7.5} y={1} fontSize={10} fill={textColor} textAnchor="middle">{temperatureValue+''}</Text>
        </G>
				
      </Svg>
      </Animated.View>

    )
  }
}