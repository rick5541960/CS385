import React, {Component} from 'react';
import './App.css';
import { findDOMNode } from 'react-dom';

/* 
* formatting daily forecast
* 
* 
*/ 
class Daily extends Component {
	
	constructor(props){
        super(props);
        this.state = {
          areaCode: '',
          date: '',
          weather: '',
          pop: '',
          temp: ''
        };

    }

    // receives props
    async componentDidMount(){
      await this.setState({
        areaCode: this.props.areaCode,
        date: this.props.date,
        weather: this.props.weather,
        pop: this.props.pop,
        temp: this.props.temp
      });
    }
    
    // refreshes on props update
    async shouldComponentUpdate(){
      //console.log('received update');
      if(this.props.areaCode != this.state.areaCode){
        //console.log('comparison successful');
        await this.setState({
          areaCode: this.props.areaCode,
          date: this.props.date,
          weather: this.props.weather,
          pop: this.props.pop,
          temp: this.props.temp
        });
        return true;
      }
    }

  
	render(){
	  return (
		<div class="container-fluid">
		  <div class='row'>
        <div class='col'>
          {this.state.date}
        </div>
        <div class='col'>
          {this.state.weather}
        </div>
        <div class='col'>
          {this.state.pop}
        </div>
        <div class='col'>
          {this.state.temp}
        </div>
		  </div>
		</div>
	  )
	}
}

export default Daily;
