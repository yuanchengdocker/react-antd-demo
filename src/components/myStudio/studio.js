import React from 'react';
import { DatePicker, Button, Alert } from 'antd';
import {merge} from 'lodash';

import { getStudioDetail } from '../services/studioService.js';
import Summary from '../common/Summary.js';
import GoodAt from '../common/GoodAt.js';
import style from './studio.css';
let icon = require('../img/icon.png');

class myAntdTest extends React.Component{
    constructor(props) {
        super(props);
        this.state = merge({
            page:1,
            introduce : {},
            goodAtLabels: [],
            members : []
        },this.state);
    }
   
    componentDidMount(){
        let self = this;
        getStudioDetail("688163231398629376",function(result){
            let introduce = result[0];
            let members = result[1];
            if(members&&members.length>0){
                members.sort(function(m1,m2){
                    if(m2.role == m1.role){
                        return (m2.name+ '').localeCompare(m1.name + '');
                    }
                    return m2.role - m1.role;
                });
            }
            self.setState({ 
                introduce : introduce,
                goodAtLabels : introduce.goodAtLabel,
                members : members
            });
        });
    }

    tabClick(page){
        if(this.state.page != page)
            this.setState({
                page:page
            });
    }

    openPersonPage(doctorUserId){
        window.open("/#/person?personalId=" + doctorUserId )
    }

    render() {
        let self = this;
        return(
            <div>
                <div className="studio-cover-com"></div>
                <div className="tabs" id="tabs">
                    <a href="javascript:void(0);" className={this.state.page==1?"active":""} onClick={this.tabClick.bind(this,1)}>介绍</a>
                    <a href="javascript:void(0);" className={this.state.page==2?"active":""} onClick={this.tabClick.bind(this,2)}>成员</a>
                </div>
                <div className="tab-items" id="tabItems">
                    <div className={this.state.page==1?"item show":"item"}>
                        <Summary userDescribe={this.state.introduce.introduction}/>
                        <GoodAt goodAtLabels={this.state.goodAtLabels}/>
                    </div>
                    <div className={this.state.page==2?"item show":"item"}>
                        {
                            !this.state.members||this.state.members.length<=0?<p className="member-list">暂无成员</p>:""
                        }
                        <ul className="member-list">
                            {
                                this.state.members.map(function(item){
                                    return (
                                        <li>
                                            <a href="javascript:void(0);" onClick={self.openPersonPage.bind(this,item.doctorUserId)}>
                                                <div className="avatar"><img src={item.avatar?item.avatar:icon}/></div>
                                                <div className="info">
                                                    <div className="user">
                                                        <span className="name">{item.name}</span>
                                                        <span className="job">{item.professionalTitleName}</span>
                                                        {
                                                            item.role?<span className="leader"></span>:""
                                                        }
                                                    </div>
                                                    <div className="address">
                                                        <span>{item.professionalDepartmentName}</span><span className="vertical-line">|</span><span>{item.hospitalName}</span>
                                                    </div>
                                                    <div className="tags">
                                                        {
                                                            !item.goodAt||item.goodAt.length<=0?<p>暂无擅长疾病</p>:""
                                                        }
                                                        <ul>
                                                            {
                                                                item.goodAt.slice(0,5).map(function(ele){
                                                                    return (<li>{ele}</li>)
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
                
        );
    }
}
export default myAntdTest;