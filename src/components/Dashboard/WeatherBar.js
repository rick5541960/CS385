import React, { Component } from 'react';
import Forecast from './forecast/index';

class WeatherBar extends Component {
    state = {}
    render() {
        return (
            <div className="col-lg-4 col-sm-12"> 
            {/* add "style={{'background-color':'#5BE7C4'}}" change background color */}
				<Forecast/>
            </div>
        );
    }
}

export default WeatherBar;