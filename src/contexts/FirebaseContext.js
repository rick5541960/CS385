import React, { Component, createContext } from 'react';
import { authProvider, auth, db } from './Firebase'

export const FirebaseContext = createContext();

class FirebaseContextProvider extends Component {
    state = {
        authProvider, auth, db
    }

    // componentDidMount() {
    //     this.state.auth.onAuthStateChanged(user => {
    //         if (user) {
    //             this.setState({ user })
    //             console.log(this.state)
    //         }
    //     })
    // }

    render() {
        return (
            <FirebaseContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </FirebaseContext.Provider>
        )
    }
}

export default FirebaseContextProvider