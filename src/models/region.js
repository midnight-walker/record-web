import * as regionService from '../services/region';

export default {
    namespace: 'region',
    state: {
        list: [],
        total: null,
        page: null,
    },
    reducers: {
        save(state, { payload: { data: list, total, page } }) {
            return { ...state, list, total, page };
        },
    },
    effects: {
        *fetch({ payload: { page = 1 } }, { call, put }) {
            const { data, headers } = yield call(regionService.fetch, { page });
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *remove({ payload: id }, { call, put }) {
            yield call(regionService.remove, id);
            yield put({ type: 'reload' });
        },
        *patch({ payload: { id, values } }, { call, put }) {
            yield call(regionService.patch, id, values);
            yield put({ type: 'reload' });
        },
        *create({ payload: values }, { call, put }) {
            yield call(regionService.create, values);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.region.page);
            yield put({ type: 'fetch', payload: { page } });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/region') {
                    dispatch({ type: 'fetch', payload: query });
                }
            });
        },
    },
};