import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetAll = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.name && params.append('name', data.name);

    return service.get(ApiUrl.Moods_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const CreateMoods = (body) => {
    return service.post(ApiUrl.Moods_Create, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdateMoods = (body) => {
    return service.post(ApiUrl.Moods_Update, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const DeleteMoods = (id) => {
    return service.postParams(ApiUrl.Moods_Delete(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetDetailMoods = (id) => {
    return service.get(ApiUrl.Moods_GetDetail(id))
        .then(res => { return res })
        .catch(err => { throw err });
}