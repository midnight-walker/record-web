import * as defenceService from '../services/defence';
import * as regionService from '../services/region';
import * as stationService from '../services/station';

export default {
    namespace: 'defence',
    state: {
        list: [],
        regionList:[],
        stationList:[],
        total: null,
        page: null,
        searchRegion:0
    },
    reducers: {
        save(state, { payload: { data: list, total, page,regionList,stationList,searchRegion,searchStation } }) {
            return { ...state, list, total, page,regionList,stationList,searchRegion,searchStation };
        },
    },
    effects: {
        *fetch({ payload: { page = 1,regionId=0,stationId=0 } }, { call, put }) {
            const { data, headers } = yield call(defenceService.fetch, { page,regionId,stationId });
            const region = yield call(regionService.fetch, {});
            const station = yield call(stationService.fetch, {});
            yield put({
                type: 'save',
                payload: {
                    data,
                    regionList:region.data,
                    stationList:station.data,
                    searchRegion:regionId,
                    searchStation:stationId,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *remove({ payload: id }, { call, put }) {
            yield call(defenceService.remove, id);
            yield put({ type: 'reload' });
        },
        *patch({ payload: { id, values } }, { call, put }) {
            yield call(defenceService.patch, id, values);
            yield put({ type: 'reload' });
        },
        *create({ payload: values }, { call, put }) {
            yield call(defenceService.create, values);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.defence.page);
            yield put({ type: 'fetch', payload: { page } });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/defence') {
                    dispatch({ type: 'fetch', payload: query });
                }
            });
        },
    },
};