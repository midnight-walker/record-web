/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
import React, { Component } from 'react';
import { Modal, Form, Input,Select } from 'antd';
import styles from './DefenceModal.css';

const FormItem = Form.Item;

class DefenceEditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    showModalHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            visible: true,
        });
    };

    hideModalHandler = () => {
        this.setState({
            visible: false,
        });
    };

    okHandler = () => {
        const { onOk } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onOk(values);
                this.hideModalHandler();
            }
        });
    };

    render() {
        const { children,regionList } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { name, regionId } = this.props.record;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        let initialRegion=regionList.find(region=>region.id===regionId);

        return (
            <span>
        <span onClick={this.showModalHandler}>
          { children }
        </span>
        <Modal
            title="编辑林场"
            visible={this.state.visible}
            onOk={this.okHandler}
            onCancel={this.hideModalHandler}
        >
            <Form layout="horizontal" onSubmit={this.okHandler}>
                <FormItem
                    {...formItemLayout}
                    label="林场名称"
                >
                    {
                        getFieldDecorator('name', {
                            initialValue: name,
                            rules:[{
                                required: true, message: '请输入林场名称',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所属区县"
                >
                    {
                        getFieldDecorator('regionId', {
                            initialValue: initialRegion?initialRegion.name:'',
                            rules:[{
                                required: true, message: '请选择所属区县'
                            }]
                        })(<Select
                            showSearch
                            placeholder="选择区县"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {regionList.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                        </Select>)
                    }
                </FormItem>
            </Form>
        </Modal>
      </span>
        );
    }
}

export default Form.create()(DefenceEditModal);