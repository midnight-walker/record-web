/**
 * Created by tqj <2482366539@qq.com> on 2017/9/19.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd';
import { Map, Marker } from 'react-amap';
import { AMAP_KEY } from '../../constants';

class locationModal extends React.Component {
    constructor(){
        super();
        this.state = {
            visible: false
        };
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        const { longitude,latitude } = this.props;
        const pointer={
            longitude,
            latitude
        }
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>查看</Button>
                <Modal
                    title=""
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div id="j-map-container" style={{width: '100%', height: '400px'}}>
                        <Map center={pointer}
                             zoom={15}
                        >
                            <Marker position={pointer} />
                        </Map>
                    </div>

                </Modal>
            </div>
        );
    }
}

export default locationModal
