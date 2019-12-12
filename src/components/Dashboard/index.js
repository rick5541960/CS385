import React, { Component } from 'react';
import WeatherBar from './WeatherBar';
import TodoList from './TodoList';

class Dashboard extends Component {
    state = {}
    render() {
        return (
            <div className="container-fluid">
                <div className="row" style={{height: "calc(100vh - 57px)" }} >
                    
                    <WeatherBar/>
                    
                    <TodoList/>
                    
                </div>
            </div >
        );
    }
}

export default Dashboard;