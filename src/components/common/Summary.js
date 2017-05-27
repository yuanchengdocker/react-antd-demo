import React from 'react';
import style from '../myStudio/studio.css';

class Summary extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			tagIntroduce : false
		};
	}

	tagIntroduceClick(){
        this.setState({
            tagIntroduce : !this.state.tagIntroduce
        });
    }
    //组件中的props是一种父级向子级传递数据的方式
	render() {
		return <section className="box introduction" id="introduction">
            <h3>简介</h3>
            <p className={this.state.tagIntroduce?"show":""}>{this.props.userDescribe}
            	<a href="javascript:void(0);" className="arrow-down" onClick={this.tagIntroduceClick.bind(this)}></a>
            </p>
        </section>
	}
}

export default Summary;