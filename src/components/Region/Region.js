import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Region.css';
import { PAGE_SIZE } from '../../constants';
import RegionModal from './RegionModal';

function Region({ dispatch, list: dataSource, loading, total, page: current }) {
    function deleteHandler(id) {
        dispatch({
            type: 'region/remove',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/region',
            query: { page },
        }));
    }

    function editHandler(id, values) {
        dispatch({
            type: 'region/patch',
            payload: { id, values },
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'region/create',
            payload: values,
        });
    }

    const columns = [
        {
            title: '区县名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '区划代码',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
          <RegionModal record={record} onOk={editHandler.bind(null, record.id)}>
              <a>编辑</a>
          </RegionModal>
          <Popconfirm title="确定要删除吗" onConfirm={deleteHandler.bind(null, record.id)}>
              <a href="">删除</a>
          </Popconfirm>
        </span>
            ),
        },
    ];

    return (
        <div className={styles.normal}>
            <div>
                <div className={styles.create}>
                    <RegionModal record={{}} onOk={createHandler}>
                        <Button type="primary">创建区县</Button>
                    </RegionModal>
                </div>
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
    const { list, total, page } = state.region;
    return {
        loading: state.loading.models.region,
        list,
        total,
        page
    };
}

export default connect(mapStateToProps)(Region);