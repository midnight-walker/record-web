import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
    function deleteHandler(id) {
        dispatch({
            type: 'users/remove',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/users',
            query: { page },
        }));
    }

    function editHandler(id, values) {
        dispatch({
            type: 'users/patch',
            payload: { id, values },
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'users/create',
            payload: values,
        });
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password'
        },
        {
            title: '微信名',
            dataIndex: 'wxname',
            key: 'wxname'
        },
        {
            title: '电话号码',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
              <a>编辑</a>
          </UserModal>
          <Popconfirm title="确定要删除?" onConfirm={deleteHandler.bind(null, record.id)}>
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
                    <UserModal record={{}} onOk={createHandler}>
                        <Button type="primary">创建用户</Button>
                    </UserModal>
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
    const { list, total, page } = state.users;
    return {
        loading: state.loading.models.users,
        list,
        total,
        page
    };
}

export default connect(mapStateToProps)(Users);