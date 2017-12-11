/**
 * Created by tqj <2482366539@qq.com> on 2017/9/19.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd';
class pictureModal extends React.Component {
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
        this.setState({
            visible: false,
        });
    }
    render() {
        const { picList } = this.props;
        let list=[];
        if(typeof picList==='string'){
            list=picList.split(',')
        }
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>查看</Button>
                <Modal
                    title=""
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="1000"
                >
                    <div style={{width: '100%'}}>
                        {list.map(d => <img style="max-width:100%" src={d}/>)}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default pictureModal
