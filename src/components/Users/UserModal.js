/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import styles from './UserModal.css';

const FormItem = Form.Item;

class UserEditModal extends Component {

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
        const { username, password, wxname,phone,groupid } = this.props.record;
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
            title="Edit User"
            visible={this.state.visible}
            onOk={this.okHandler}
            onCancel={this.hideModalHandler}
        >
            <Form layout="horizontal" onSubmit={this.okHandler}>
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                >
                    {
                        getFieldDecorator('username', {
                            initialValue: username,
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {
                        getFieldDecorator('password', {
                            initialValue: password,
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="微信名"
                >
                    {
                        getFieldDecorator('wxname', {
                            initialValue: wxname,
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电话号码"
                >
                    {
                        getFieldDecorator('phone', {
                            initialValue: phone,
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所属小组"
                >
                    {
                        getFieldDecorator('groupid', {
                            initialValue: groupid,
                        })(<Input />)
                    }
                </FormItem>
            </Form>
        </Modal>
      </span>
        );
    }
}

export default Form.create()(UserEditModal);