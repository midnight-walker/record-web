/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import styles from './RegionModal.css';

const FormItem = Form.Item;

class RegionEditModal extends Component {

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
        const { children } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { name, code } = this.props.record;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <span>
        <span onClick={this.showModalHandler}>
          { children }
        </span>
        <Modal
            title="编辑区县"
            visible={this.state.visible}
            onOk={this.okHandler}
            onCancel={this.hideModalHandler}
        >
            <Form layout="horizontal" onSubmit={this.okHandler}>
                <FormItem
                    {...formItemLayout}
                    label="区县名称"
                >
                    {
                        getFieldDecorator('name', {
                            initialValue: name,
                            rules:[{
                                required: true, message: '请输入区县名称'
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="区划代码"
                >
                    {
                        getFieldDecorator('code', {
                            initialValue: code,
                        })(<Input />)
                    }
                </FormItem>
            </Form>
        </Modal>
      </span>
        );
    }
}

export default Form.create()(RegionEditModal);