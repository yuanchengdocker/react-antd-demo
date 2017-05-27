/**
 * 
 * @authors luozh@snail.com
 * @date    2016-03-21 16:42:35
 * @description 主入口模块
 */

import React from 'react'
import { render } from 'react-dom'

// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router'

// 引入Antd的导航组件
import { Menu, Icon, Switch } from 'antd'
const SubMenu = Menu.SubMenu

import './main.css';
//会编译为css文件到style.css
import styles from './css/main.styl';
//let logo = require('./images/logo.png');
import logo from './images/logo.png'

// 引入单个页面（组件导入）
import myTable from './components/table.js'
import myForm from './components/form.js'
import myChart from './components/chart.js'
import myAnimate from './components/animate.js'
import myCalendar from './components/calendar.js'
import myCard from './components/fetch.js'
import myAntdTest from './components/myStudio/studio.js'
import person from './components/personer/single.js'

const ACTIVE = { color: 'red' }

class Sider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '',
            username: ''
        }
    }
    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    }
    componentDidUpdate(){}
    componentWillUpdate(){}
    //组件接收到新的props时调用
    componentWillReceiveProps(nextProps){}
    //首次渲染之前调用完成后执行
    componentWillMount(){}
    //首次渲染之后调用完成后执行
    componentDidMount() {
        this.getUser()
    }
    getUser(){
        this.setState({
            username: 'luozh'
        })
    }
    render() {
        return (
            <div>
                <div id="leftMenu"> 
                    <img src={logo} width="50" id="logo"/>
                    <Menu theme="dark"
                        onClick={this.handleClick.bind(this)}
                        style={{ width: 185 }}
                        defaultOpenKeys={['sub1', 'sub2']}
                        defaultSelectedKeys={[this.state.current]}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一</span></span>}>
                            <Menu.Item key="1"><Link to="/myTable">表格</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/myForm">表单</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/myChart">图表</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/myCalendar">日历</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/myCard">布局</Link></Menu.Item>
                            <Menu.Item key="7"><Link to="/myAntdTest">我的测试</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div id="rightWrap">
                    <Menu mode="horizontal">
                        <SubMenu title={<span><Icon type="user" />{ this.state.username }</span>}>
                            <Menu.Item key="setting:1">退出</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="right-box">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}


// 配置路由
render((
    <Router history={hashHistory} >
        <Route path="/" component={Sider}>
            <Route path="myTable" component={myTable} />
            <Route path="myForm" component={myForm} />
            <Route path="myChart" component={myChart} />
            <Route path="myCalendar" component={myCalendar} />
            <Route path="myAnimate" component={myAnimate} />
            <Route path="myCard" component={myCard} />
            <Route path="myAntdTest" component={myAntdTest} />
            <Route path="person" component={person} />
        </Route>
    </Router>
), document.getElementById('root'));


