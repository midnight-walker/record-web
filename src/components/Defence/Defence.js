import React from 'react';
import { connect } from 'dva';
import { Row,Table,Modal, Pagination, Popconfirm, Button,Select,DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { routerRedux } from 'dva/router';
import styles from './Defence.less';
import { PAGE_SIZE,DATE_FORMAT } from '../../constants';
import DefenceModal from './DefenceModal';
import LocationModal from '../Common/LocationModal';
import PictureModal from '../Common/PictureModal';
import Search from '../Common/StationSelect'
import moment from 'moment'


function Defence({ dispatch, list: dataSource, loading, total,regionList,stationList, page: current,searchRegion,searchStation,startDate,endDate }) {
    function deleteHandler(id) {
        dispatch({
            type: 'defence/remove',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/defence',
            query: { page,regionId:searchRegion,stationId:searchStation,startDate,endDate },
        }));
    }

    function filterChange(regionId,stationId) {
        searchRegion=regionId;
        searchStation=stationId;
        dispatch(routerRedux.push({
            pathname: '/defence',
            query: { page:1,regionId:searchRegion,stationId:searchStation,startDate,endDate }
        }));
    }

    function dateChange(momentList,strList) {
        startDate=strList[0];
        endDate=strList[1];
        dispatch(routerRedux.push({
            pathname: '/defence',
            query: { page:1,regionId:searchRegion,stationId:searchStation,startDate,endDate }
        }));
    }

    function editHandler(id, values) {
        dispatch({
            type: 'defence/patch',
            payload: { id, values },
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'defence/create',
            payload: values,
        });
    }

    const columns = [
        {
            title: '所属区县',
            dataIndex: 'regionId',
            key: 'regionId',
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
            key: 'village',
        },
        {
            title: '组',
            dataIndex: 'group',
            key: 'group',
        },
        {
            title: '小班',
            dataIndex: 'smallClass',
            key: 'smallClass',
        },
        {
            title: '小地名',
            dataIndex: 'placeName',
            key: 'placeName',
        },
        {
            title: '小班面积（亩）',
            dataIndex: 'smallClassArea',
            key: 'smallClassArea',
        },
        {
            title: '树种组成',
            dataIndex: 'treeCompose',
            key: 'treeCompose',
        },
        {
            title: '防治对象名称',
            dataIndex: 'targetName',
            key: 'targetName',
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
            key: 'mode',
        },
        {
            title: '防治数量',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: '防治效果（%）',
            dataIndex: 'effect',
            key: 'effect',
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
            title: '防治人员',
            dataIndex: 'operator',
            key: 'operator',
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
          <DefenceModal record={record} regionList={regionList} stationList={stationList} onOk={editHandler.bind(null, record.id)}>
              <a>编辑</a>
          </DefenceModal>
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
                        <DefenceModal record={{}} regionList={regionList} stationList={stationList} onOk={createHandler}>
                            <Button type="primary">创建防治记录</Button>
                        </DefenceModal>
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
    const { list, total, page,regionList,stationList,searchRegion,searchStation,startDate,endDate } = state.defence;
    return {
        loading: state.loading.models.defence,
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

export default connect(mapStateToProps)(Defence);