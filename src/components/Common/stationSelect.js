import React from 'react'
import PropTypes from 'prop-types'
import { Input, Select, Button, Icon } from 'antd'

const Option = Select.Option;

const allItem={
    name:'全部',
    id:0
}

let getStations=(stationList,region)=>{
    if(region && region.id){
        return [allItem,...stationList.filter(station=>station.regionId===region.id)];
    }
    return [allItem];
}

class StationSelect extends React.Component {
    state = {
        currRegion:0,
        currStations: getStations(this.props.stationList,this.props.regionList[0]),
        selectedStation: getStations(this.props.stationList,this.props.regionList[0])[0],
    }
    handleProvinceChange = (value) => {
        let list=getStations(this.props.stationList,{id:parseInt(value)});
        this.setState({
            currRegionId:value,
            currStations: list,
            selectedStation: list[0]
        });
        this.props.getList(value,0);
    }
    onSecondCityChange = (value) => {
        let station=this.state.currStations.find(station=>station.id===parseInt(value));
        this.setState({
            selectedStation: station
        });
        this.props.getList(this.state.currRegionId,value)
    }
    render() {
        const provinceOptions = this.props.regionList.map(region => <Option key={region.id}>{region.name}</Option>);
        const cityOptions = this.state.currStations.map(station => <Option key={station.id}>{station.name}</Option>);
        return (
            <div>
                <Select defaultValue={this.props.regionList[0].name} style={{ width: 90 }} onChange={this.handleProvinceChange}>
                    {provinceOptions}
                </Select>
                <Select value={this.state.selectedStation.name} style={{ width: 90 }} onChange={this.onSecondCityChange}>
                    {cityOptions}
                </Select>
            </div>
        );
    }
}

StationSelect.propTypes = {
    regionList: PropTypes.array,
    stationList: PropTypes.array,
    getList: PropTypes.func
}

export default StationSelect
