import React, { Component } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext'
import SignedInNavBar from './SignedInNavBar';
import SignedOutNavBar from './SignedOutNavBar';

class Navigation extends Component {
    static contextType = FirebaseContext;
    state = {
        user: null,
        error: null
    }

    componentDidMount() {
        this.context.auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user })
            }
        })
    }

    signOutUser = () => {
        this.context.auth.signOut()
            .then(window.location = "/")
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        return this.state.user ? <SignedInNavBar signOutUser={this.signOutUser} /> : <SignedOutNavBar />
        //return <SignedInNavBar signOutUser={this.signOutUser}/>
    }
}

export default Navigation;
