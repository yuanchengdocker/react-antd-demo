import React from 'react'
import { Calendar  } from 'antd';

export default class myCalendar extends React.Component {
    dateCellRender = (value) => {
        return <div>自定义日数据 {}</div>
    }

    monthCellRender = (value) => {
        return <div>自定义月数据 {}</div>
    }

    render() {
        return (
            <Calendar 
                dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
        )
    }
}