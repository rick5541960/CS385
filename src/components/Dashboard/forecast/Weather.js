import React, {Component} from 'react';
import './App.css';
import cityList from './cities_full.json';
import { findDOMNode } from 'react-dom';
import Daily from './daily';
//import logo from './fanart.jpg';

class Weather extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			error: '',
			areaName: '',
			locationList: cityList,
			WeatherbitKey: process.env.REACT_APP_WEATHERAPI_KEY,
			WeatherbitAPI: process.env.REACT_APP_WEATHER_URL,        //this.state.openAPI +'city_id='+ this.state.cityID +'&key='+ this.state.openKey
			cityID: '',
			WeatherbitInfo: [],
			switch: true,
			currentCity: ''
		}
		
		this.api = this.api.bind(this);
		this.btnHandler = this.btnHandler.bind(this);
		this.filterCallBack = this.filterCallBack.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.formChangeHandler = this.formChangeHandler.bind(this);
	} // end of constructor

	
	// calls weather api for forecast information
	async api(){
		try{
			
			const response = await fetch(this.state.WeatherbitAPI +'city_id='+ this.state.cityID +'&key='+ this.state.WeatherbitKey);
			const result = await response.json(); 
			
			
			await this.setState({WeatherbitInfo: result.data});
			
			// console.log(this.state.WeatherbitInfo);
			// console.log('update successful');			
			
		}catch(e){
			//console.log(e.message);
			await this.setState({error: 'weather information not available at this location!'});

		}
		
	}
	

	// filters out country names that don't match search term
	filterCallBack(areaName){
		return function(object){
			return object.city_name.toLowerCase().includes(areaName.toLowerCase());
		}
	}
	
	// handles submit
	// saves selected item into state
	// then calls api for forecast
	async submitHandler(e){
		if(findDOMNode(this.refs.dynamic).value!=''){
			e.preventDefault();
		
			//console.log('CityID: '+ findDOMNode(this.refs.dynamic).value);
			if(this.state.cityID!=findDOMNode(this.refs.dynamic).value){
				let temp = this.state.locationList.filter(item => item.id==findDOMNode(this.refs.dynamic).value);
				await this.setState({
					cityID: findDOMNode(this.refs.dynamic).value,
					switch: !this.state.switch,
					currentCity: temp[0].city_name
				});
				this.api();
				// console.log(this.state.cityID);
				// console.log(this.state.currentCity);
				// console.log(temp[0].city_name);
			}
			// else{
			// 	await this.setState({switch: !this.state.switch});
			// }
		}
	}


	// handles input form change
	// saves input into state
	async formChangeHandler(e){
		
		if(isNaN(e.target.value)||e.target.value==''){
			await this.setState({areaName: e.target.value});
			//console.log('formChangeHandler isNaN');
		}
		
	}
	
	btnHandler(){
		this.setState({
			switch: !this.state.switch,
			cityID: '',
			areaName: ''
		});
		findDOMNode(this.refs.dynamic).value = '';
	}

	
	render(){
	  return (
	  <div className = 'App'>
			{/*style = {{position: 'fixed', marginTop: 10, paddingLeft: 0}} position 'fixed' fixes item to screen disregarding scoller*/}
			<div class = 'col-lg-4 col-sm-12 mb-lg-0' style = {{marginTop: 10}} >
				{/*button to expand/shrink weather search form*/}
	  			<button class = 'input-group-text bg-primary text-white border-primary' onClick={this.btnHandler}>{this.state.switch?'X':'Forecast'}</button>
				
			</div>
			
			<div style = {{display: this.state.switch?'none':'block'}}>
				<h1><b>{this.state.currentCity.toUpperCase()}</b></h1>
			</div>

			<div ref = 'display' style = {{display: this.state.switch?'block':'none'}}>
				{/*<img src = {logo} class = 'col-lg-6 col-sm-4'/>*/}
				<p class='lead'>DEFINITELY NOT SPONSORED</p>
				
				<h4 class = 'lead'><b>Area: {this.state.areaName}</b></h4>
				<br/>
				<form onSubmit = {this.submitHandler}  align='center'>
					<input class = 'form-group mx-sm-3 mb-2' style = {{height: 35}} ref = 'dynamic' list='country' onChange = {this.formChangeHandler}/>
					<datalist id='country'>
						{this.state.locationList.filter(this.filterCallBack(this.state.areaName)).slice(0,20).map(item =>
							<option value = {item.id} id = {item.city_name}>City: {item.city_name} &nbsp;&nbsp; Country: {item.country_name}</option>
						)}
					</datalist>
					<input class = 'btn btn-primary mb-2 text-white' type='submit' value='Select'/>
				</form>
			</div>

			{this.state.WeatherbitInfo.slice(0,7).map((item, index)=>
			<div id="index">
				<Daily areaCode = {this.state.cityID} date = {item.datetime} weather = {item.weather.description} pop = {item.pop} temp = {item.temp}/>					
				<br/>
			</div>
			)}
			

			
		</div>
	  )
	}
}

export default Weather;
