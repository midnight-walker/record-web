/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
import React, { Component } from 'react';
import { Modal, Form, Input,Select,DatePicker,TimePicker } from 'antd';
import styles from './ScxcSupervisorModal.css';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants';

const FormItem = Form.Item;

class ScxcSupervisorEditModal extends Component {

    constructor(props) {
        super(props);
        let currStationList=props.stationList.filter(station=>station.regionId==props.record.regionId);
        this.state = {
            visible: false,
            currStationList
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
                if(values.time && typeof values.time.format === 'function'){
                    values.time=values.time.format('x');
                }else{
                    values.time=moment().format('x');
                }
                console.log(values);
                onOk(values);
                this.hideModalHandler();
            }
        });
    };

    handleRegionChange=(regionId)=>{
        this.setState({
            currStationList:this.props.stationList.filter(station=>station.regionId==regionId)
        });
        this.props.form.setFieldsValue({
            stationId: '',
        });
    };

    render() {
        const { children,regionList,stationList } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { name, regionId,stationId,village,group,smallClass,placeName,smallClassArea,treeCompose,targetName,time,workGroup,fcXianyan,fcXixiao,fcGaodudayuwu,fcChanzhe,fcFugai,fcFengzhe,fcHuoshao,fcXuanya,fcXuangua,fcHuoshukuzhi,fcTotal,jcFcXianyan,jcFcXixiao,jcFcGaodudayuwu,jcFcChanzhe,jcFcFugai,jcFcFengzhe,jcFcHuoshao,jcFcXuanya,jcFcXuangua,jcFcHuoshukuzhi,jcFcTotal,jcYcCaogai,jcYcKuye,jcYcTurang,jcYcTengman,jcYcDigou,jcYcDongxue,jcYcTotal,jcKusi,fsFcXianyan,fsFcXixiao,fsFcGaodudayuwu,fsFcChanzhe,fsFcFugai,fsFcFengzhe,fsFcHuoshao,fsFcXuanya,fsFcXuangua,fsFcHuoshukuzhi,fsFcTotal,fsYcCaogai,fsYcKuye,fsYcTurang,fsYcTengman,fsYcDigou,fsYcDongxue,fsYcTotal,fsKusi,fzFazhuang,fzBopi,fzJiahao,fzTouyao,fzShuliao,fzNitu,fzTotal,fzNumber,longitude,latitude,picture,operator } = this.props.record;
        const formItemLayout = {
            labelCol: { span: 12 },
            wrapperCol: { span: 8 }
        };
        let initialRegion=regionList.find(region=>region.id===regionId);
        let initialStation=stationList.find(station=>station.id===stationId);
        //this.handleRegionChange(regionId);

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
                    label="所属区县"
                >
                    {
                        getFieldDecorator('regionId', {
                            initialValue: regionId || '',
                            rules:[{
                                required: true, message: '请选择所属区县',
                            }]
                        })(<Select
                            showSearch
                            placeholder="选择区县"
                            optionFilterProp="children"
                            onChange={this.handleRegionChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {regionList.map(d => <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>)}
                        </Select>)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所属林场"
                >
                    {
                        getFieldDecorator('stationId', {
                            initialValue: stationId || '',
                            rules:[{
                                required: true, message: '请选择所属林场'
                            }]
                        })(<Select
                            showSearch
                            placeholder="选择区县"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.state.currStationList.map(d => <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>)}
                        </Select>)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="村（管护站）名"
                >
                    {
                        getFieldDecorator('village', {
                            initialValue: village,
                            rules:[{
                                required: true, message: '请填写村（管护站）名',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="组（社、林班）号"
                >
                    {
                        getFieldDecorator('group', {
                            initialValue: group,
                            rules:[{
                                required: true, message: '请填写组（社、林班）号',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="小班号"
                >
                    {
                        getFieldDecorator('smallClass', {
                            initialValue: smallClass,
                            rules:[{
                                required: true, message: '请填写小班号',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="小地名"
                >
                    {
                        getFieldDecorator('placeName', {
                            initialValue: placeName,
                            rules:[{
                                required: true, message: '请填写小地名',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="小班面积（亩）"
                >
                    {
                        getFieldDecorator('smallClassArea', {
                            initialValue: smallClassArea,
                            rules:[{
                                required: true, message: '请填写小班面积（亩）',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="树种组成"
                >
                    {
                        getFieldDecorator('treeCompose', {
                            initialValue: treeCompose,
                            rules:[{
                                required: true, message: '请填写树种组成',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="防治对象名称"
                >
                    {
                        getFieldDecorator('targetName', {
                            initialValue: targetName,
                            rules:[{
                                required: true, message: '请填写防治对象名称',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="监测时间（年、月、日）"
                >
                    {
                        getFieldDecorator('time', {
                            initialValue: time ? moment(time):moment(),
                            rules:[{
                                required: true,
                                message: '请填写监测时间（年、月、日）',
                            }]
                        })(
                            <DatePicker size="small" format={DATE_FORMAT} />
                        )
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="施工作业单位名称"
                >
                    {
                        getFieldDecorator('workGroup', {
                            initialValue: workGroup,
                            rules:[{
                                required: true, message: '请填写施工作业单位名称',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐除对象-显眼枯死松树"
                >
                    {
                        getFieldDecorator('fcXianyan', {
                            initialValue: fcXianyan,
                            rules:[{
                                required: true, message: '请填写显眼枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐除对象-细小枯死松树"
                >
                    {
                        getFieldDecorator('fcXixiao', {
                            initialValue: fcXixiao,
                            rules:[{
                                required: true, message: '请填写细小枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐除对象-高度5厘米以上的树桩"
                >
                    {
                        getFieldDecorator('fcGaodudayuwu', {
                            initialValue: fcGaodudayuwu,
                            rules:[{
                                required: true, message: '请填写高度5厘米以上的树桩',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐除对象-藤蔓或活树连着枯死树"
                >
                    {
                        getFieldDecorator('fcChanzhe', {
                            initialValue: fcChanzhe,
                            rules:[{
                                required: true, message: '请填写藤蔓或活树连着枯死树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐除对象-藤蔓覆盖的枯死松树"
                >
                    {
                        getFieldDecorator('fcFugai', {
                            initialValue: fcFugai,
                            rules:[{
                                required: true, message: '请填写藤蔓覆盖的枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐除对象-风折风倒的枯死松树"
                >
                    {
                        getFieldDecorator('fcFengzhe', {
                            initialValue: fcFengzhe,
                            rules:[{
                                required: true, message: '请填写风折风倒的枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐除对象-火烧、雷击枯死松树"
                >
                    {
                        getFieldDecorator('fcHuoshao', {
                            initialValue: fcHuoshao,
                            rules:[{
                                required: true, message: '请填写火烧、雷击枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐除对象-悬崖边枯死松树"
                >
                    {
                        getFieldDecorator('fcXuanya', {
                            initialValue: fcXuanya,
                            rules:[{
                                required: true, message: '请填写悬崖边枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐除对象-悬挂或地面的松树梢头"
                >
                    {
                        getFieldDecorator('fcXuangua', {
                            initialValue: fcXuangua,
                            rules:[{
                                required: true, message: '悬挂或地面的松树梢头',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐除对象-活松树上枯死树枝"
                >
                    {
                        getFieldDecorator('fcHuoshukuzhi', {
                            initialValue: fcHuoshukuzhi,
                            rules:[{
                                required: true, message: '请填写活松树上枯死树枝',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐除对象-伐除小计"
                >
                    {
                        getFieldDecorator('fcTotal', {
                            initialValue: fcTotal,
                            rules:[{
                                required: true, message: '请填写伐除小计',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-显眼枯死松树"
                >
                    {
                        getFieldDecorator('jcFcXianyan', {
                            initialValue: jcFcXianyan,
                            rules:[{
                                required: true, message: '请填写显眼枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-细小枯死松树"
                >
                    {
                        getFieldDecorator('jcFcXixiao', {
                            initialValue: jcFcXixiao,
                            rules:[{
                                required: true, message: '请填写细小枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-高度5厘米以上的树桩"
                >
                    {
                        getFieldDecorator('jcFcGaodudayuwu', {
                            initialValue: jcFcGaodudayuwu,
                            rules:[{
                                required: true, message: '请填写高度5厘米以上的树桩',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-藤蔓或活树连着枯死树"
                >
                    {
                        getFieldDecorator('jcFcChanzhe', {
                            initialValue: jcFcChanzhe,
                            rules:[{
                                required: true, message: '请填写藤蔓或活树连着枯死树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-藤蔓覆盖的枯死松树"
                >
                    {
                        getFieldDecorator('jcFcFugai', {
                            initialValue: jcFcFugai,
                            rules:[{
                                required: true, message: '请填写藤蔓覆盖的枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-风折风倒的枯死松树"
                >
                    {
                        getFieldDecorator('jcFcFengzhe', {
                            initialValue: jcFcFengzhe,
                            rules:[{
                                required: true, message: '请填写风折风倒的枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-火烧、雷击枯死松树"
                >
                    {
                        getFieldDecorator('jcFcHuoshao', {
                            initialValue: jcFcHuoshao,
                            rules:[{
                                required: true, message: '请填写火烧、雷击枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-悬崖边枯死松树"
                >
                    {
                        getFieldDecorator('jcFcXuanya', {
                            initialValue: jcFcXuanya,
                            rules:[{
                                required: true, message: '请填写悬崖边枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-悬挂或地面的松树梢头"
                >
                    {
                        getFieldDecorator('jcFcXuangua', {
                            initialValue: jcFcXuangua,
                            rules:[{
                                required: true, message: '悬挂或地面的松树梢头',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-活松树上枯死树枝"
                >
                    {
                        getFieldDecorator('jcFcHuoshukuzhi', {
                            initialValue: jcFcHuoshukuzhi,
                            rules:[{
                                required: true, message: '请填写活松树上枯死树枝',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-伐除小计"
                >
                    {
                        getFieldDecorator('jcFcTotal', {
                            initialValue: jcFcTotal,
                            rules:[{
                                required: true, message: '请填写伐除小计',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-用草覆盖"
                >
                    {
                        getFieldDecorator('jcYcCaogai', {
                            initialValue: jcYcCaogai,
                            rules:[{
                                required: true, message: '请填写用草覆盖',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-用枯枝落叶覆盖"
                >
                    {
                        getFieldDecorator('jcYcKuye', {
                            initialValue: jcYcKuye,
                            rules:[{
                                required: true, message: '请填写用枯枝落叶覆盖',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-用土壤覆盖"
                >
                    {
                        getFieldDecorator('jcYcTurang', {
                            initialValue: jcYcTurang,
                            rules:[{
                                required: true, message: '请填写用土壤覆盖',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-用藤蔓覆盖的松材"
                >
                    {
                        getFieldDecorator('jcYcTengman', {
                            initialValue: jcYcTengman,
                            rules:[{
                                required: true, message: '请填写用藤蔓覆盖的松材',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-隐藏于地沟"
                >
                    {
                        getFieldDecorator('jcYcDigou', {
                            initialValue: jcYcDigou,
                            rules:[{
                                required: true, message: '请填写隐藏于地沟',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-洞穴中的松材"
                >
                    {
                        getFieldDecorator('jcYcDongxue', {
                            initialValue: jcYcDongxue,
                            rules:[{
                                required: true, message: '请填写洞穴中的松材',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-隐藏小计"
                >
                    {
                        getFieldDecorator('jcYcTotal', {
                            initialValue: jcYcTotal,
                            rules:[{
                                required: true, message: '请填写隐藏小计',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="集材对象-1厘米以上枯死松枝"
                >
                    {
                        getFieldDecorator('jcKusi', {
                            initialValue: jcKusi,
                            rules:[{
                                required: true, message: '请填写1厘米以上枯死松枝',
                            }]
                        })(<Input />)
                    }
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-显眼枯死松树"
                >
                    {
                        getFieldDecorator('fsFcXianyan', {
                            initialValue: fsFcXianyan,
                            rules:[{
                                required: true, message: '请填写显眼枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-细小枯死松树"
                >
                    {
                        getFieldDecorator('fsFcXixiao', {
                            initialValue: fsFcXixiao,
                            rules:[{
                                required: true, message: '请填写细小枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-高度5厘米以上的树桩"
                >
                    {
                        getFieldDecorator('fsFcGaodudayuwu', {
                            initialValue: fsFcGaodudayuwu,
                            rules:[{
                                required: true, message: '请填写高度5厘米以上的树桩',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-藤蔓或活树连着枯死树"
                >
                    {
                        getFieldDecorator('fsFcChanzhe', {
                            initialValue: fsFcChanzhe,
                            rules:[{
                                required: true, message: '请填写藤蔓或活树连着枯死树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-藤蔓覆盖的枯死松树"
                >
                    {
                        getFieldDecorator('jcFcFugai', {
                            initialValue: jcFcFugai,
                            rules:[{
                                required: true, message: '请填写藤蔓覆盖的枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-风折风倒的枯死松树"
                >
                    {
                        getFieldDecorator('fsFcFengzhe', {
                            initialValue: fsFcFengzhe,
                            rules:[{
                                required: true, message: '请填写风折风倒的枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-火烧、雷击枯死松树"
                >
                    {
                        getFieldDecorator('fsFcHuoshao', {
                            initialValue: fsFcHuoshao,
                            rules:[{
                                required: true, message: '请填写火烧、雷击枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-悬崖边枯死松树"
                >
                    {
                        getFieldDecorator('fsFcXuanya', {
                            initialValue: fsFcXuanya,
                            rules:[{
                                required: true, message: '请填写悬崖边枯死松树',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-悬挂或地面的松树梢头"
                >
                    {
                        getFieldDecorator('fsFcXuangua', {
                            initialValue: fsFcXuangua,
                            rules:[{
                                required: true, message: '悬挂或地面的松树梢头',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-活松树上枯死树枝"
                >
                    {
                        getFieldDecorator('fsFcHuoshukuzhi', {
                            initialValue: fsFcHuoshukuzhi,
                            rules:[{
                                required: true, message: '请填写活松树上枯死树枝',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-伐除小计"
                >
                    {
                        getFieldDecorator('fsFcTotal', {
                            initialValue: fsFcTotal,
                            rules:[{
                                required: true, message: '请填写伐除小计',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-用草覆盖"
                >
                    {
                        getFieldDecorator('fsYcCaogai', {
                            initialValue: fsYcCaogai,
                            rules:[{
                                required: true, message: '请填写用草覆盖',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-用枯枝落叶覆盖"
                >
                    {
                        getFieldDecorator('fsYcKuye', {
                            initialValue: fsYcKuye,
                            rules:[{
                                required: true, message: '请填写用枯枝落叶覆盖',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-用土壤覆盖"
                >
                    {
                        getFieldDecorator('fsYcTurang', {
                            initialValue: fsYcTurang,
                            rules:[{
                                required: true, message: '请填写用土壤覆盖',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-用藤蔓覆盖的松材"
                >
                    {
                        getFieldDecorator('fsYcTengman', {
                            initialValue: fsYcTengman,
                            rules:[{
                                required: true, message: '请填写用藤蔓覆盖的松材',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-隐藏于地沟"
                >
                    {
                        getFieldDecorator('fsYcDigou', {
                            initialValue: fsYcDigou,
                            rules:[{
                                required: true, message: '请填写隐藏于地沟',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-洞穴中的松材"
                >
                    {
                        getFieldDecorator('fsYcDongxue', {
                            initialValue: fsYcDongxue,
                            rules:[{
                                required: true, message: '请填写洞穴中的松材',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-隐藏小计"
                >
                    {
                        getFieldDecorator('fsYcTotal', {
                            initialValue: fsYcTotal,
                            rules:[{
                                required: true, message: '请填写隐藏小计',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="焚烧对象-1厘米以上枯死松枝"
                >
                    {
                        getFieldDecorator('fsKusi', {
                            initialValue: fsKusi,
                            rules:[{
                                required: true, message: '请填写1厘米以上枯死松枝',
                            }]
                        })(<Input />)
                    }
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="伐桩高度5厘米以下"
                >
                    {
                        getFieldDecorator('fzFazhuang', {
                            initialValue: fzFazhuang,
                            rules:[{
                                required: true, message: '请填写伐桩高度5厘米以下',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐桩剥皮"
                >
                    {
                        getFieldDecorator('fzBopi', {
                            initialValue: fzBopi,
                            rules:[{
                                required: true, message: '请填写伐桩剥皮',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="在横断面上砍“+字”口"
                >
                    {
                        getFieldDecorator('fzJiahao', {
                            initialValue: fzJiahao,
                            rules:[{
                                required: true, message: '请填写在横断面上砍“+字”口述',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="投药"
                >
                    {
                        getFieldDecorator('fzTouyao', {
                            initialValue: fzTouyao,
                            rules:[{
                                required: true, message: '请填写投药',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="覆盖塑料布"
                >
                    {
                        getFieldDecorator('fzShuliao', {
                            initialValue: fzShuliao,
                            rules:[{
                                required: true, message: '请填写覆盖塑料布',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="覆盖泥土厚度2厘以上"
                >
                    {
                        getFieldDecorator('fzNitu', {
                            initialValue: fzNitu,
                            rules:[{
                                required: true, message: '请填写覆盖泥土厚度2厘以上',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐桩小计"
                >
                    {
                        getFieldDecorator('fzTotal', {
                            initialValue: fzTotal,
                            rules:[{
                                required: true, message: '请填写伐桩小计',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="伐桩个数"
                >
                    {
                        getFieldDecorator('fzNumber', {
                            initialValue: fzNumber,
                            rules:[{
                                required: true, message: '请填写伐桩个数',
                            }]
                        })(<Input />)
                    }
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="经度"
                >
                    {
                        getFieldDecorator('longitude', {
                            initialValue: longitude,
                            rules:[{
                                required: true, message: '请填写经度',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="纬度"
                >
                    {
                        getFieldDecorator('latitude', {
                            initialValue: latitude,
                            rules:[{
                                required: true, message: '请填写纬度',
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="图片"
                >
                    {
                        getFieldDecorator('picture', {
                            initialValue: picture
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="防治人员"
                >
                    {
                        getFieldDecorator('operator', {
                            initialValue: operator,
                            rules:[{
                                required: true, message: '请填写防治人员',
                            }]
                        })(<Input />)
                    }
                </FormItem>
            </Form>
        </Modal>
      </span>
        );
    }
}

export default Form.create()(ScxcSupervisorEditModal);