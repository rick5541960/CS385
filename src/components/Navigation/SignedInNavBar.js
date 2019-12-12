import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function SignedInNavBar(props) {
    SignedInNavBar.propTypes = {
        props: PropTypes.func.isRequired,
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-inverse navbar-dark bg-primary navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">TODO LIST</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/home" className="nav-link">Home<span className="sr-only">(current)</span></Link>
                            {/* <a className="nav-link" to="/home">Home <span className="sr-only">(current)</span></a> */}
                        </li>
                        <li className="nav-item active">
                            <Link to="/dashboard" className="nav-link">Todos<span className="sr-only"></span></Link>
                        </li>
                        {/* <li className="nav-item">
                                <a className="nav-link" href="#">Sign in</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Sign up</a>
                            </li> */}
                    </ul>
                </div>
                <svg width="38" height="38" className="mr-3">
                    <circle cx="19" cy="19" r="16" strokeWidth="0" fill="white" />
                    <text fill="#000000" fontSize="18" x="7" y="24">AA</text>
                </svg>
                {/* <svg width="100" height="100">
                    <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="4" fill="white" />
                    Sorry, your browser does not support inline SVG.
   <text fill="#000000" fontSize="18" font-family="Verdana"
                        x="15" y="60">ASHISH</text>
                </svg>
                <div class="rounded-circle bg-light text-center"><p>AAA</p></div> */}
                <Link to="/" className="btn btn-default navbar-btn btn-outline-light navbar-right btn-right" onClick={props.signOutUser}>Sign out</Link>
            </div>
        </nav>
    );
}

export default SignedInNavBar;
