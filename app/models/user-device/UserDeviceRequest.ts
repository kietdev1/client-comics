export default interface UserDeviceRequest {
    deviceTypeName: string | null;
    registrationToken: string;
    browserVersion: string | null;
    screenResolution: string | null;
}