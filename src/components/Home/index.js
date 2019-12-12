import React, { Component } from 'react';

class Home extends Component {
    state = {}
    render() {
        // const jumbotronStyles = {
        //     'padding-bottom': '16%'
        //   };
        return (
            <div className="jumbotron  bg-white">
                <h1 className="display-4">Hello, world!</h1>
                <hr className="my-4 bg-light" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <a href="https://github.com/MU2019CS385Project/TodoList" className="btn btn-primary btn-lg" href="#" role="button">About us</a>
                {/* <button type="button" className="btn btn-default btn-lg btn-light text-primary btn-right" >Create new account</button> */}
                <a className="btn btn-default btn-lg btn-light text-primary btn-right mx-1" href="/signup" role="button">Create new account</a>
            </div>
        );
    }
}

export default Home;