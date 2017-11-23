import React from 'react';
import { connect } from 'dva';
import { Row,Table,Modal, Pagination, Popconfirm, Button,Select,DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { routerRedux } from 'dva/router';
import styles from './ScxcSupervisor.less';
import { PAGE_SIZE,DATE_FORMAT } from '../../constants';
import ScxcSupervisorModal from './ScxcSupervisorModal';
import LocationModal from '../Common/LocationModal';
import PictureModal from '../Common/PictureModal';
import Search from '../Common/StationSelect'
import moment from 'moment'


function ScxcSupervisor({ dispatch, list: dataSource, loading, total,regionList,stationList, page: current,searchRegion,searchStation,startDate,endDate }) {
    function deleteHandler(id) {
        dispatch({
            type: 'scxcSupervisor/remove',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/scxcSupervisor',
            query: { page,regionId:searchRegion,stationId:searchStation,startDate,endDate },
        }));
    }

    function filterChange(regionId,stationId) {
        searchRegion=regionId;
        searchStation=stationId;
        dispatch(routerRedux.push({
            pathname: '/scxcSupervisor',
            query: { page:1,regionId:searchRegion,stationId:searchStation,startDate,endDate }
        }));
    }

    function dateChange(momentList,strList) {
        startDate=strList[0];
        endDate=strList[1];
        dispatch(routerRedux.push({
            pathname: '/scxcSupervisor',
            query: { page:1,regionId:searchRegion,stationId:searchStation,startDate,endDate }
        }));
    }

    function editHandler(id, values) {
        dispatch({
            type: 'scxcSupervisor/patch',
            payload: { id, values },
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'scxcSupervisor/create',
            payload: values,
        });
    }

    const columns = [
        {
            title: '所属区县',
            dataIndex: 'regionId',
            key: 'regionId',
            width: 100,
            fixed:'left',
            render: (text, record) => {
                let r=regionList.find(region=>region.id===record.regionId);
                if(r){
                    return (<span>{r.name}</span>)
                }
                return '';
            }
        },
        {
            title: '所属林场',
            dataIndex: 'stationId',
            key: 'stationId',
            width: 100,
            fixed:'left',
            render: (text, record) => {
                let r=stationList.find(station=>station.id===record.stationId);
                if(r){
                    return (<span>{r.name}</span>)
                }
                return '';
            }
        },
        {
            title: '村',
            dataIndex: 'village',
            key: 'village'
        },
        {
            title: '组',
            dataIndex: 'group',
            key: 'group'
        },
        {
            title: '小班',
            dataIndex: 'smallClass',
            key: 'smallClass'
        },
        {
            title: '小地名',
            dataIndex: 'placeName',
            key: 'placeName'
        },
        {
            title: '小班面积（亩）',
            dataIndex: 'smallClassArea',
            key: 'smallClassArea'
        },
        {
            title: '树种组成',
            dataIndex: 'treeCompose',
            key: 'treeCompose'
        },
        {
            title: '防治对象名称',
            dataIndex: 'targetName',
            key: 'targetName'
        },
        {
            title: '监测时间',
            dataIndex: 'time',
            key: 'time',
            render: (text, record) => {
                return (<span>{moment(record.time).format('YYYY-MM-DD')}</span>)
            }
        },
        {
            title: '施工作业单位名称',
            dataIndex: 'workGroup',
            key: 'workGroup'
        },
        {
            title: '施工作业质量描述',
            dataIndex: 'workQuality',
            key: 'workQuality'
        },
        {
            title: '主要问题',
            dataIndex: 'mainQuestion',
            key: 'mainQuestion'
        },
        {
            title: '防治效果（%）',
            dataIndex: 'effect',
            key: 'effect'
        },
        {
            title: '显眼枯死松树',
            dataIndex: 'fcXianyan',
            key: 'fcXianyan'
        },
        {
            title: '细小枯死松树',
            dataIndex: 'fcXixiao',
            key: 'fcXixiao'
        },
        {
            title: '高度达5厘米以上的松树桩头',
            dataIndex: 'fcGaodudayuwu',
            key: 'fcGaodudayuwu'
        },
        {
            title: '藤蔓缠着以及与活树连着的枯死松树',
            dataIndex: 'fcChanzhe',
            key: 'fcChanzhe'
        },
        {
            title: '藤蔓覆盖的枯死松树',
            dataIndex: 'fcFugai',
            key: 'fcFugai'
        },
        {
            title: '风折风倒的枯死松树',
            dataIndex: 'fcFengzhe',
            key: 'fcFengzhe'
        },
        {
            title: '火烧、雷击枯死松树',
            dataIndex: 'fcHuoshao',
            key: 'fcHuoshao'
        },
        {
            title: '悬崖边枯死松树',
            dataIndex: 'fcXuanya',
            key: 'fcXuanya'
        },
        {
            title: '悬挂或地面的松树梢头',
            dataIndex: 'fcXuangua',
            key: 'fcXuangua'
        },
        {
            title: '活松树上2厘米以上的当年度枯死的树枝',
            dataIndex: 'fcHuoshukuzhi',
            key: 'fcHuoshukuzhi'
        },
        {
            title: '伐除对象',
            dataIndex: 'jcFachu',
            key: 'jcFachu'
        },
        {
            title: '隐藏对象',
            dataIndex: 'jcYincang',
            key: 'jcYincang'
        },
        {
            title: '林地上1厘米以上的枯死松枝',
            dataIndex: 'jcKusi',
            key: 'jcKusi'
        },
        {
            title: '集材对象',
            dataIndex: 'fsJicai',
            key: 'fsJicai'
        },
        {
            title: '伐桩高度5厘米以下',
            dataIndex: 'fzFazhuang',
            key: 'fzFazhuang'
        },
        {
            title: '在横断面上砍“+字”口',
            dataIndex: 'fzJiahao',
            key: 'fzJiahao'
        },
        {
            title: '投药',
            dataIndex: 'fzTouyao',
            key: 'fzTouyao'
        },
        {
            title: '覆盖塑料布',
            dataIndex: 'fzShuliao',
            key: 'fzShuliao'
        },
        {
            title: '覆盖泥土厚度2厘以上',
            dataIndex: 'fzNitu',
            key: 'fzNitu'
        },
        {
            title: '防治位置',
            dataIndex: 'longitude',
            key: 'longitude',
            render: (text, record) => {
                return (
                    <LocationModal longitude={record.longitude} latitude={record.latitude}>

                    </LocationModal>
                )
            }
        },
        {
            title: '上传图片',
            dataIndex: 'picture',
            key: 'picture',
            render: (text, record) => {
                return (
                    <PictureModal picList={record.picture}>

                    </PictureModal>
                )
            }
        },
        {
            title: '监理员',
            dataIndex: 'operator',
            key: 'operator',
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record) => (
                <span className={styles.operation}>
          <ScxcSupervisorModal record={record} regionList={regionList} stationList={stationList} onOk={editHandler.bind(null, record.id)}>
              <a>编辑</a>
          </ScxcSupervisorModal>
          <Popconfirm title="确定要删除吗" onConfirm={deleteHandler.bind(null, record.id)}>
              <a href="">删除</a>
          </Popconfirm>
        </span>
            )
        }
    ];

    const allItem={
        name:'全部',
        id:0
    };
    console.log(startDate);
    return (
        <div className={styles.normal}>
            <div>
                <Row>
                    <div className={styles.create}>
                        <ScxcSupervisorModal record={{}} regionList={regionList} stationList={stationList} onOk={createHandler}>
                            <Button type="primary">创建防治记录</Button>
                        </ScxcSupervisorModal>
                    </div>
                    <div className={styles.date}>
                        <RangePicker onChange={dateChange} value={[moment(startDate, DATE_FORMAT), moment(endDate, DATE_FORMAT)]} />
                    </div>
                    <div className={styles.search}>
                        <Search
                            {...{
                                regionList:[allItem,...regionList],
                                stationList,
                                getList:(regionId,stationId)=>{
                                    filterChange(regionId,stationId);
                                }
                            }}
                        />
                    </div>
                </Row>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    rowKey={record => record.id}
                    scroll={{x:5000}}
                    pagination={false}
                />
                <Pagination
                    className="ant-table-pagination"
                    total={total}
                    current={current}
                    pageSize={PAGE_SIZE}
                    onChange={pageChangeHandler}
                />
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { list, total, page,regionList,stationList,searchRegion,searchStation,startDate,endDate } = state.scxcSupervisor;
    return {
        loading: state.loading.models.scxcSupervisor,
        list,
        total,
        page,
        regionList,
        stationList,
        searchRegion,
        searchStation,
        startDate,
        endDate
    };
}

export default connect(mapStateToProps)(ScxcSupervisor);