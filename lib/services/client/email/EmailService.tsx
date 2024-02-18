import axiosClientApiInstance from "@/lib/services/client/interceptor";
import ServerResponse from "../../../../app/models/common/ServerResponse";
import { portalServer } from "@/lib/services/client/baseUrl";

export const sendEmail = async (requestModel: SendEmailMessage) => {
    try {
        const response = await axiosClientApiInstance.post<ServerResponse<any>>(portalServer + '/api/email', requestModel);
        return response.data;
    } catch (error) {
        return null;
    }
};