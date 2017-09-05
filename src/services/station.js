import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page,regionId }) {
    return request(`/api/station?_page=${page}&_limit=${PAGE_SIZE}&regionId=${regionId}`);
}

export function remove(id) {
    return request(`/api/station/${id}`, {
        method: 'DELETE',
    });
}

export function patch(id, values) {
    return request(`/api/station/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
    });
}

export function create(values) {
    return request('/api/station', {
        method: 'POST',
        body: JSON.stringify(values),
    });
}