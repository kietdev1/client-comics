"use client";

import { useTranslations } from "next-intl";
import Pagination from "../common/Pagination";
import { useEffect, useState } from "react";
import PagingRequest from "@/app/models/paging/PagingRequest";
import { getUserDevices, toggleUserDevice } from "@/lib/services/client/user-device";
import UserDeviceResponse, { EDeviceType, deviceTypeEnumMapping } from "@/app/models/user-device/UserDeviceResponse";
import { Session } from "next-auth";
import { getEnumValueFromString, getRoleBadge, getUserNameClass } from "@/app/utils/HelperFunctions";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';

type Props = {
    session: Session | null
}

export default function Device({ session }: Props) {
    const t = useTranslations('profile');

    const [pagingParams, setPagingParams] = useState<PagingRequest>({
        PageNumber: 1,
        PageSize: 6
    });

    const [userDevices, setUserDevices] = useState<UserDeviceResponse[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserDevices(pagingParams).then((response) => {
            if (response && response.data) {
                setUserDevices(response.data.data);
                setTotalRecords(response.data.rowNum);
            }
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    const roleUser = getEnumValueFromString(session?.user?.token?.roles);

    const getDeviceImage = (deviceType: EDeviceType) => {
        if (deviceType === EDeviceType.iOS) {
            return '/assets/media/devices/apple.png';
        }
        else if (deviceType === EDeviceType.Android) {
            return '/assets/media/devices/android.png';
        }
        else return '/assets/media/devices/computer.png'
    }

    const toggleNotification = (id: number) => {
        setLoading(true);
        toggleUserDevice(id).then(() => {
            // Reload paging
            setLoading(true);
            getUserDevices(pagingParams).then((response) => {
                if (response && response.data) {
                    setUserDevices(response.data.data);
                    setTotalRecords(response.data.rowNum);
                }
            }).finally(() => {
                setLoading(false);
            })
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <>
            <section className="schedule style-3  sec-mar">
                <div className="container">
                    <div className="heading style-1">
                        <h1>{t('devices_tile')}</h1>
                    </div>
                    <div className="row">
                        <div className="col-xl-9 col-sm-12 col-12">
                            <div className="schedule-box">
                                <div className="card">
                                    <div className="card-body style-1 tab-content">
                                        <div className="row justify-content-between ps-3 pe-3 pb-4">
                                            <div className="col-lg-6 col-sm-6 col-12">
                                                <h4 className="d-inline">{t('device_name')}</h4>
                                            </div>
                                            <div className="col-lg-6 col-sm-6 col-0 text-end">
                                                <h4 className="space-right d-inline">{t('device_browser_version')}</h4>
                                                <h4 className="d-inline">{t('device_screen_resolution')}</h4>
                                            </div>
                                        </div>
                                        <div className="tab-pane active" id="devices">
                                            {loading && (
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            )}
                                            {!loading && userDevices && userDevices.length > 0 &&
                                                <>
                                                    {userDevices?.map((item) => (
                                                        <div key={uuidv4()}>
                                                            <div className="row ps-3 pe-3">
                                                                <div className="col-xl-6 col-lg-8 col-12 col-md-7 col-sm-8">
                                                                    <div className="row">
                                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                                            <Image src={getDeviceImage(item.deviceType)} alt="device_img" width={128} height={128} />
                                                                        </div>
                                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                                            <div className="schedule-content align-middle align-middle">
                                                                                <p className="small-title">{deviceTypeEnumMapping[item.deviceType]}</p>
                                                                                <a className="follow" onClick={() => toggleNotification(item.id)}>
                                                                                    <p className="text-box">
                                                                                        {t(item.isEnabled ? 'device_toggle_off' : 'device_toggle_on')}
                                                                                    </p>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className=" col-xl-3 col-lg-2 col-md-3 col-sm-2 col-0 space-top text-end">
                                                                    <p className="space-right d-inline">{item.browserVersion}</p>
                                                                </div>
                                                                <div className=" col-xl-3 col-lg-2 col-md-3 col-sm-2 col-0 space-top text-end">
                                                                    <p className="d-inline">{item.screenResolution}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </div>
                                                    ))}
                                                </>
                                            }
                                            {!loading && userDevices && userDevices.length === 0 && (
                                                <div className="no-data-message">
                                                    {t('no_data')}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-12 order">
                            <div className="row align-items-end">
                                <div className="col-lg-12 col-sm-8 col-6">
                                    <div className="img-box">
                                        <img src={session?.user?.image ?? ''} alt="Avatar" className="rounded-circle shadow-4 px-2" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                                    <a href="/profile" className="d-inline"><h3 className={`${getUserNameClass(roleUser)}`} style={{ display: 'block', marginLeft: '10px' }}>{session?.user?.name} <div className="role-badge">{getRoleBadge(roleUser)}</div></h3></a>
                                </div>
                            </div>
                        </div>
                        <div className="pagination-wrape">
                            <Pagination
                                pageIndex={pagingParams.PageNumber}
                                totalCounts={totalRecords}
                                pageSize={pagingParams.PageSize}
                                onPageChange={page => setPagingParams({ ...pagingParams, PageNumber: page })} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}