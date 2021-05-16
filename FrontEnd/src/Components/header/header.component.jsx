import React, { Component } from 'react';
import './header.style.css'
class Header extends Component {
    
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">MedScrape</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link" aria-current="page" href="/">Home</a>
                            <a class="nav-link" href="/add">Add Medicine</a>
                        </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;