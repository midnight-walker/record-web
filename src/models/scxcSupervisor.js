import * as scxcSupervisorService from '../services/scxcSupervisor';
import * as regionService from '../services/region';
import * as stationService from '../services/station';
import {getCurrStartDay,getCurrEndDay} from '../utils/date'

export default {
    namespace: 'scxcSupervisor',
    state: {
        list: [],
        regionList:[],
        stationList:[],
        startDate:'',
        endDate:'',
        total: null,
        page: null,
        searchRegion:0
    },
    reducers: {
        save(state, { payload: { data: list, total, page,regionList,stationList,searchRegion,searchStation,startDate,endDate } }) {
            return { ...state, list, total, page,regionList,stationList,searchRegion,searchStation,startDate,endDate };
        },
    },
    effects: {
        *fetch({ payload: { page = 1,regionId=0,stationId=0,startDate=getCurrStartDay(),endDate=getCurrEndDay() } }, { call, put }) {
            const { data, headers } = yield call(scxcSupervisorService.fetch, { page,regionId,stationId,startDate,endDate });
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
                    startDate,
                    endDate,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *remove({ payload: id }, { call, put }) {
            yield call(scxcSupervisorService.remove, id);
            yield put({ type: 'reload' });
        },
        *patch({ payload: { id, values } }, { call, put }) {
            yield call(scxcSupervisorService.patch, id, values);
            yield put({ type: 'reload' });
        },
        *create({ payload: values }, { call, put }) {
            yield call(scxcSupervisorService.create, values);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.scxcSupervisor.page);
            yield put({ type: 'fetch', payload: { page } });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/scxcSupervisor') {
                    dispatch({ type: 'fetch', payload: query });
                }
            });
        },
    },
};