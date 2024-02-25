import ServerResponse from "@/app/models/common/ServerResponse";
import PagingRequest from "@/app/models/paging/PagingRequest";
import axiosClientApiInstance from "../interceptor";

export const getAlbums = async (params: PagingRequest, filter: any) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>('/api/client/comicapp/paging', {
            params: { ...params, ...filter },
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};