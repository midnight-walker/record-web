import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page,regionId,stationId }) {
    return request(`/api/defence?_page=${page}&_limit=${PAGE_SIZE}&regionId=${regionId}&stationId=${stationId}`);
}

export function remove(id) {
    return request(`/api/defence/${id}`, {
        method: 'DELETE',
    });
}

export function patch(id, values) {
    return request(`/api/defence/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
    });
}

export function create(values) {
    return request('/api/defence', {
        method: 'POST',
        body: JSON.stringify(values),
    });
}