import { EnumDictionary } from "../enums/EnumDictionary";

export default interface UserDeviceResponse {
    id: number;
    registrationToken: string;
    deviceType: EDeviceType;
    deviceTypeName: string;
    browserVersion?: string | null;
    screenResolution?: string | null;
    isEnabled: boolean;
    userId: number;
    createdOnUtc: Date;
    updatedOnUtc?: Date | null;
}

export enum EDeviceType {
    Unknown = 0,
    iOS = 1,
    Android = 2
}

export const deviceTypeEnumMapping: EnumDictionary<EDeviceType, string> = {
    [EDeviceType.Unknown]: "Unknown",
    [EDeviceType.iOS]: "iOS",
    [EDeviceType.Android]: "Android"
}