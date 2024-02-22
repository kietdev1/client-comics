import ServerResponse from "@/app/models/common/ServerResponse";
import axiosClientApiInstance from "../interceptor";
import { ERegion } from "@/app/models/comics/ComicSitemap";

export const getTopRankUsers = async (region: ERegion) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>('/api/user/ranking', {
            params: region,
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};
