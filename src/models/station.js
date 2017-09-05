import * as stationService from '../services/station';
import * as regionService from '../services/region';

export default {
    namespace: 'station',
    state: {
        list: [],
        regionList:[],
        total: null,
        page: null,
        searchRegion:0
    },
    reducers: {
        save(state, { payload: { data: list, total, page,regionList,searchRegion } }) {
            return { ...state, list, total, page,regionList,searchRegion };
        },
    },
    effects: {
        *fetch({ payload: { page = 1,regionId=0 } }, { call, put }) {
            const { data, headers } = yield call(stationService.fetch, { page,regionId });
            const region = yield call(regionService.fetch, {});
            yield put({
                type: 'save',
                payload: {
                    data,
                    regionList:region.data,
                    searchRegion:regionId,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *remove({ payload: id }, { call, put }) {
            yield call(stationService.remove, id);
            yield put({ type: 'reload' });
        },
        *patch({ payload: { id, values } }, { call, put }) {
            yield call(stationService.patch, id, values);
            yield put({ type: 'reload' });
        },
        *create({ payload: values }, { call, put }) {
            yield call(stationService.create, values);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.station.page);
            yield put({ type: 'fetch', payload: { page } });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/station') {
                    dispatch({ type: 'fetch', payload: query });
                }
            });
        },
    },
};