import React from 'react';
import { DatePicker, Button, Alert } from 'antd';
import {merge} from 'lodash';

import { getDoctorHomePageService } from '../services/studioService.js';
import Summary from '../common/Summary.js';
import style from './single.css';
let icon = require('../img/icon.png');

class Single extends React.Component{
    constructor(props) {
        super(props);
        this.state = merge({
           person : {},
           goodAt : []
        },this.state);
    }
   
    componentDidMount(){
        let self = this;
        getDoctorHomePageService(location.hash.split("?")[1].split("&")[0].split("=")[1],function(result){
            self.setState({ 
                person : result,
                goodAt : result.expertiseTag
            });
        });
    }

    render() {
        let person = this.state.person;
        return(
            <div id="personalHomePage">
                <DatePicker/>
                <header className="studio-cover">
                    <div className="avatar">
                        <div className="avatar-img">
                            <img src={person.avatarUrl?person.avatarUrl:icon}/>
                        </div>
                        <span className="auth"></span>
                    </div>
                    <div className="user"><span className="name">{person.doctorName}</span><span className="job">{person.professionalTitleName}</span></div>
                    <div className="address">
                        <span>{person.subDepartmentName}</span><span className="vertical-line">|</span><span>{person.hospitalName}</span>
                    </div>
                    <a href="javascript:void(0);" className="add-friend" id="addFriend">+加为好友</a>
                </header>
                <Summary userDescribe={person.userDescribe}/>
                <section className="box disease" >
                    <h3>擅长疾病</h3>
                        {
                            !person.expertiseTag || person.expertiseTag.length <= 0 ? <p>暂无擅长疾病</p> : ""
                        }
                        <ul className="tags">
                            {
                                this.state.goodAt.map(function(item){
                                    return <li>{item}</li>
                                })
                            }
                        </ul>
                </section>
            </div>
                
        );
    }
}
export default Single;