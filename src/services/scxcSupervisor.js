import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page,regionId,stationId,startDate,endDate }) {
    return request(`/api/scxcSupervisor?_page=${page}&_limit=${PAGE_SIZE}&regionId=${regionId}&stationId=${stationId}&startDate=${startDate}&endDate=${endDate}`);
}

export function remove(id) {
    return request(`/api/scxcSupervisor/${id}`, {
        method: 'DELETE',
    });
}

export function patch(id, values) {
    return request(`/api/scxcSupervisor/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
    });
}

export function create(values) {
    return request('/api/scxcSupervisor', {
        method: 'POST',
        body: JSON.stringify(values),
    });
}