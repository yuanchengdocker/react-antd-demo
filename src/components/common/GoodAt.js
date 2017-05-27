import React from 'react';
import style from '../myStudio/studio.css';

class Summary extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		let goodAtLabels = this.props.goodAtLabels?this.props.goodAtLabels:[];
		return <section className="box disease">
	                <h3>擅长疾病</h3>
	                {
                        !goodAtLabels || goodAtLabels.length <= 0 ? <p>暂无擅长疾病</p> : ""
                    }
	                <ul className="tags">
	                    {
	                        goodAtLabels.map(function(item){
	                            return <li>{item}</li>
	                        })
	                    }
	                </ul>
	            </section>
	}
}

export default Summary;