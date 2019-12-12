import React, { Component } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext'

class SignUp extends Component {
    static contextType = FirebaseContext
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        error: null
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { email, password, confirmPassword } = this.state
        if (password == confirmPassword) {
            this.context.auth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error })
            });
        }else{
            this.setState({ error:{message:""} })
        }
    }


    render() {
        return (
            <form className="col-lg-4 col-sm-12 mx-auto" onSubmit={this.handleSubmit}>
                <h1 className="display-6 my-4 mx-left text-primary ">Sign up</h1>
                <hr className="my-4 bg-light" />
                <div className="form-group">
                    <label for="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Email address" required onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label for="confirmPassword">Confirm password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" required onChange={this.handleChange} />
                </div>
                <button className="btn btn-lg btn-primary my-3" type="submit">Sign up</button>
                <div className="text-danger center">
                            {this.state.error ? <p>{this.state.error.message}</p> : null}
                        </div>
                <p className="mt-4 mb-3 text-muted text-center">CS385 Team Project</p>
            </form>
        );
    }
}

export default SignUp;