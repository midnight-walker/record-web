import React from 'react';
import { connect } from 'dva';
import { Row,Table, Pagination, Popconfirm, Button,Select } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Defence.less';
import { PAGE_SIZE } from '../../constants';
import DefenceModal from './DefenceModal';
import Search from '../Common/StationSelect'


function Defence({ dispatch, list: dataSource, loading, total,regionList,stationList, page: current,searchRegion,searchStation }) {
    function deleteHandler(id) {
        dispatch({
            type: 'defence/remove',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/defence',
            query: { page,regionId:searchRegion,stationId:searchStation },
        }));
    }

    function regionChange(regionId) {
        console.log(this);
        searchRegion=regionId;
        searchStation=0;
        dispatch(routerRedux.push({
            pathname: '/defence',
            query: { page:1,regionId:searchRegion,stationId:searchStation }
        }));
    }
    function stationChange(stationId) {
        searchStation=stationId;
        dispatch(routerRedux.push({
            pathname: '/defence',
            query: { page:1,regionId:searchRegion,stationId:searchStation }
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
            title: '林场名',
            dataIndex: 'name',
            key: 'name',
        },
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

    return (
        <div className={styles.normal}>
            <div>
                <Row>
                    <div className={styles.create}>
                        <DefenceModal record={{}} regionList={regionList} stationList={stationList} onOk={createHandler}>
                            <Button type="primary">创建防治记录</Button>
                        </DefenceModal>
                    </div>

                    <div className={styles.search}>
                        <Search
                            {...{
                                regionList:[allItem,...regionList],
                                stationList,
                                getList:(regionId,stationId)=>{
                                    console.log(regionId,stationId)
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
    const { list, total, page,regionList,stationList,searchRegion,searchStation } = state.defence;
    return {
        loading: state.loading.models.defence,
        list,
        total,
        page,
        regionList,
        stationList,
        searchRegion,
        searchStation
    };
}

export default connect(mapStateToProps)(Defence);