import React from 'react'
import { Input, Select, Button, Icon } from 'antd'

const Option = Select.Option;

const regionList = [{"name":"渝中区1","code":"","pid":0,"id":1,"createdAt":1502778085934,"updatedAt":1504587790657,"operator":"0"},{"name":"渝北区","code":null,"pid":0,"id":2,"createdAt":1502778086721,"updatedAt":1502778086721,"operator":"0"},{"name":"江北区","code":null,"pid":0,"id":3,"createdAt":1502778087314,"updatedAt":1502778087314,"operator":"0"},{"name":"南岸区","code":null,"pid":0,"id":4,"createdAt":1502778187610,"updatedAt":1502778187610,"operator":"0"},{"name":"永川区","code":"400071","pid":0,"id":6,"createdAt":1504752393458,"updatedAt":1504752393458,"operator":null}];

const stationList = [{"name":"第一林场","regionId":2,"id":1,"createdAt":1504513028649,"updatedAt":1504591920640,"operator":null},{"name":"第二林场","regionId":1,"id":2,"createdAt":1504587700702,"updatedAt":1504587700702,"operator":null},{"name":"aa","regionId":2,"id":4,"createdAt":1504595439530,"updatedAt":1504595439530,"operator":null},{"name":"aa1","regionId":2,"id":5,"createdAt":1504595443649,"updatedAt":1504595443649,"operator":null},{"name":"aa12","regionId":2,"id":6,"createdAt":1504595446403,"updatedAt":1504595446403,"operator":null},{"name":"aa22","regionId":2,"id":7,"createdAt":1504595449679,"updatedAt":1504595449679,"operator":null},{"name":"aa223","regionId":2,"id":8,"createdAt":1504595452729,"updatedAt":1504595452729,"operator":null},{"name":"aa5","regionId":2,"id":9,"createdAt":1504595456071,"updatedAt":1504595456071,"operator":null},{"name":"aa4","regionId":2,"id":10,"createdAt":1504595459490,"updatedAt":1504595459490,"operator":null},{"name":"aa154","regionId":2,"id":11,"createdAt":1504595464195,"updatedAt":1504595464195,"operator":null},{"name":"aa52","regionId":2,"id":12,"createdAt":1504595469512,"updatedAt":1504595469512,"operator":null}];

let getStations=(stationList,id)=>{
    return stationList.filter(station=>station.regionId===id);
}

class StationSelect extends React.Component {

    state = {
        cities: getStations(regionList[0].id),
        secondCity: cityData[provinceData[0]][0],
    }
    handleProvinceChange = (value) => {
        this.setState({
            cities: cityData[value],
            secondCity: cityData[value][0],
        });
    }
    onSecondCityChange = (value) => {
        this.setState({
            secondCity: value,
        });
    }
    render() {
        const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
        const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
        return (
            <div>
                <Select defaultValue={provinceData[0]} style={{ width: 90 }} onChange={this.handleProvinceChange}>
                    {provinceOptions}
                </Select>
                <Select value={this.state.secondCity} style={{ width: 90 }} onChange={this.onSecondCityChange}>
                    {cityOptions}
                </Select>
            </div>
        );
    }
}

export default StationSelect
