import React, { Component } from 'react';
import styles from '../css/main.styl';
import logo from '../images/logo.png';
import {Calendar } from 'antd';

class Header extends Component {
  render() {
    return (
    <div className={styles.header}>
    	<Calendar/>
        <h1><img src={logo} /></h1>
        <h2>与世界分享你的知识、经验和见解</h2>
    </div>
    );
  }
}

export default Header;