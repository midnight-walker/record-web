import React from 'react';
import { connect } from 'dva';
import { Row,Table, Pagination, Popconfirm, Button,Select } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Station.css';
import { PAGE_SIZE } from '../../constants';
import StationModal from './StationModal';

function Station({ dispatch, list: dataSource, loading, total,regionList, page: current,searchRegion }) {
    function deleteHandler(id) {
        dispatch({
            type: 'station/remove',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/station',
            query: { page,regionId:searchRegion },
        }));
    }

    function regionChange(regionId) {
        searchRegion=regionId;
        dispatch(routerRedux.push({
            pathname: '/station',
            query: { page:1,regionId:searchRegion }
        }));
    }

    function editHandler(id, values) {
        dispatch({
            type: 'station/patch',
            payload: { id, values },
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'station/create',
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
          <StationModal record={record} regionList={regionList} onOk={editHandler.bind(null, record.id)}>
              <a>编辑</a>
          </StationModal>
          <Popconfirm title="确定要删除吗" onConfirm={deleteHandler.bind(null, record.id)}>
              <a href="">删除</a>
          </Popconfirm>
        </span>
            )
        }
    ];
    return (
        <div className={styles.normal}>
            <div>
                <Row>
                    <div className={styles.create}>
                        <StationModal record={{}} regionList={regionList} onOk={createHandler}>
                            <Button type="primary">创建林场</Button>
                        </StationModal>
                    </div>

                    <div className={styles.search}>
                        <Select
                            showSearch
                            placeholder="选择区县"
                            style={{ width: '200px' }}
                            optionFilterProp="children"
                            onChange={regionChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Select.Option key={0}>所有</Select.Option>
                            {regionList.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
                        </Select>
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
    const { list, total, page,regionList,searchRegion } = state.station;
    return {
        loading: state.loading.models.station,
        list,
        total,
        page,
        regionList,
        searchRegion
    };
}

export default connect(mapStateToProps)(Station);