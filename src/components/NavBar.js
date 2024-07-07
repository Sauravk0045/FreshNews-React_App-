import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
export class NavBar extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">FreshFocus News</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <li><Link className="nav-link active" aria-current="page" to="/home">Home</Link></li>
        <li><Link className="nav-link" to="/business">Business</Link>   </li>     
        <li><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
       <li> <Link className="nav-link" to="/health">Health</Link></li>
        <li><Link className="nav-link" to="/science">Science</Link></li>
        <li><Link className="nav-link" to="/sports">Sports</Link></li>
        <li><Link className="nav-link" to="/technology">Technology</Link></li>
        
        {/* <Link className="nav-link disabled" aria-disabled="true">Disabled</Link> */}
      </div>
    </div>
  </div>
</nav>
      </div>
    )
  }
}

export default NavBar;
