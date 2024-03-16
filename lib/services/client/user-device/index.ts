import ServerResponse from "@/app/models/common/ServerResponse";
import axiosClientApiInstance from "../interceptor";
import UserDeviceRequest from "@/app/models/user-device/UserDeviceRequest";
import PagingRequest from "@/app/models/paging/PagingRequest";
import UserDeviceResponse from "@/app/models/user-device/UserDeviceResponse";
import { PagingResponse } from "@/app/models/paging/PagingResponse";

export const getUserDevices = async (request: PagingRequest) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<PagingResponse<UserDeviceResponse>>>('/api/userdevice', {
            params: request
        });
        return response.data;
    } catch (error) {
        return null;
    }
}

export const createUserDevice = async (request: UserDeviceRequest) => {
    try {
        const response = await axiosClientApiInstance.post<any>('/api/userdevice', request);
        return response.data;
    } catch (error) {
        return null;
    }
}

export const toggleUserDevice = async (id: number) => {
    try {
        const response = await axiosClientApiInstance.put<any>(`/api/userdevice/${id}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export const syncUserDevice = async (request: UserDeviceRequest) => {
    try {
        const response = await axiosClientApiInstance.post<any>('/api/userdevice/sync', request);
        return response.data;
    } catch (error) {
        return null;
    }
}