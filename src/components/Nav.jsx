import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand mx-auto text-white" href="/" style={{ textAlign: 'center' }}>
                        Student Management System
                    </a>
                </div>
            </nav>
        );
    }
}

export default Nav;
