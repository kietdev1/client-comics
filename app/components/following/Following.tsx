"use client"
import { useTranslations } from "next-intl";
import PagingRequest from "@/app/models/paging/PagingRequest";
import axiosClientApiInstance from "@/lib/services/client/interceptor";
import ServerResponse from "@/app/models/common/ServerResponse";
import { Fragment, useEffect, useMemo, useState } from "react";
import FollowingRequestModel from "@/app/models/comics/FollowingRequestModel";
import { getEnumValueFromString, getRoleBadge, getUserNameClass, handleRedirect, shortNumberViews, unFollow } from "@/app/utils/HelperFunctions";
import Pagination from "../common/Pagination";
import { v4 as uuidv4 } from 'uuid';
import { parseJsonFromString } from "@/lib/json";
import { DynamicObject } from "@/app/types/dynamic-object";

const getFollowings = async (params: PagingRequest) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>('/api/following/paging', {
            params: { ...params },
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};

export default function Following({ session }: { session: any }) {
    const t = useTranslations('profile');
    const [followings, setFollowings] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [toggleRemove, setToggleRemove] = useState(false);
    const [isHistoryPage, setIsHistoryPage] = useState(false);
    const [pagingParams, setPagingParams] = useState<PagingRequest>(useMemo(() => {
        const pagingStateObject = parseJsonFromString<DynamicObject<number>>(sessionStorage.getItem(`paging-state`));
        const pageNumber = pagingStateObject?.['following'] ?? 1;

        return {
            PageNumber: pageNumber,
            PageSize: 6,
            SearchTerm: '',
            SortColumn: 'updatedOnUtc',
            SortDirection: 'desc'
        };
    }, []));
    const [totalRecords, setTotalRecords] = useState(0);
    const [listHistory, setListHistory] = useState([]);

    const handleUnfollow = async (albumId: any) => {
        const followModel: FollowingRequestModel = {
            AlbumId: albumId
        };
        await unFollow(followModel);
        setToggleRemove(!toggleRemove);
    };

    const roleUser = getEnumValueFromString(session.user?.token?.roles);

    useEffect(() => {
        getFollowings(pagingParams).then((response: any) => {
            const pagingStateObject = parseJsonFromString<DynamicObject<number>>(sessionStorage.getItem(`paging-state`));

            if (!pagingStateObject) {
                sessionStorage.setItem(`paging-state`, JSON.stringify({
                    ['following']: pagingParams.PageNumber
                }));
            } else {
                pagingStateObject['following'] = pagingParams.PageNumber;
                sessionStorage.setItem(`paging-state`, JSON.stringify(pagingStateObject));
            }

            if (response && response.data) {
                setFollowings(response.data);
                setTotalRecords(response.rowNum);
                if (response.data != null)
                    setLoading(false)
            }
        });

        const storedHistory = sessionStorage.getItem("history");
        try {
            setListHistory(storedHistory ? JSON.parse(storedHistory) : []);
        }
        catch (ex) {
            setListHistory([]);
        }
    }, [toggleRemove, pagingParams]);

    return (
        <>
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="/">{t('home_page')}</a></li>
                            <li><a href="/profile">{t('profile')}</a></li>
                            <li><a className="active">{t('following_history')}</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="schedule style-3  sec-mar">
                <div className="container">
                    <div className="heading style-1">
                        <h1>{t('playlist')}</h1>
                    </div>
                    <div className="row">
                        <div className="col-xl-9 col-sm-12 col-12">
                            <div className="schedule-box">
                                <div className="card">
                                    <div className="card-header">
                                        <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                                            <li className="nav-item">
                                                <a className="nav-link text-center active" aria-current="true" data-bs-toggle="tab"
                                                    href="playlist.html#later" onClick={() => setIsHistoryPage(false)}>
                                                    <h1>{t('following')}</h1>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link text-center" aria-current="true" data-bs-toggle="tab"
                                                    href="playlist.html#playlist" onClick={() => setIsHistoryPage(true)}>
                                                    <h1>{t('reading_history')}</h1>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-body style-1 tab-content">
                                        <div className="row justify-content-between ps-3 pe-3 pb-4">
                                            <div className="col-lg-6 col-sm-6 col-12">
                                                <h4 className="d-inline">{t('name')}</h4>
                                            </div>
                                            <div className="col-lg-6 col-sm-6 col-0 text-end">
                                                <h4 className="space-right d-inline">{t('views')}</h4>
                                                <h4 className="d-inline">{t('lastest_name')}</h4>
                                            </div>
                                        </div>
                                        <div className="tab-pane active" id="later">
                                            {loading && (
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                        <p className="space-right d-inline">Season 04</p>
                                                        <p className="d-inline">Episode 04</p>
                                                    </div>
                                                </div>
                                            )}
                                            {followings && followings.length > 0 && followings?.map((fl: any) => (
                                                <Fragment key={uuidv4()}>
                                                    <div className="row ps-3 pe-3">
                                                        <div className="col-xl-6 col-lg-8 col-12 col-md-7 col-sm-8">
                                                            <div className="row">
                                                                <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                                    <a onClick={() => handleRedirect(`truyen-tranh/${fl.friendlyName}`, roleUser)}>
                                                                        <img src={fl.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={fl.title} />
                                                                    </a>
                                                                </div>
                                                                <div className="col-lg-10 col-sm-9 col-9">
                                                                    <div className="schedule-content align-middle align-middle">
                                                                        <a onClick={() => handleRedirect(`truyen-tranh/${fl.friendlyName}`, roleUser)}>
                                                                            <p className="small-title">{fl.title}</p>
                                                                            <p className="small-title d-block d-sm-none">{fl.lastCollectionTitle}</p>
                                                                        </a>
                                                                        <a className="follow" onClick={() => handleUnfollow(fl.albumId)}>
                                                                            <p className="text-box"><i className="fa fa-times" /> {t('unfollow')}</p>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className=" col-xl-3 col-lg-2 col-md-3 col-sm-2 col-0 space-top text-end">
                                                            <p className="space-right d-inline">{shortNumberViews(fl.views)}</p>
                                                        </div>
                                                        <div className=" col-xl-3 col-lg-2 col-md-3 col-sm-2 col-0 space-top text-end">
                                                            <p className="d-inline">{fl.lastCollectionTitle}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </Fragment>
                                            ))}
                                            {!loading && followings && followings.length === 0 && (
                                                <div className="no-data-message">
                                                    {t('no_data')}
                                                </div>
                                            )}
                                        </div>
                                        <div className="tab-pane" id="playlist">
                                            {listHistory && listHistory.length > 0 && listHistory?.map((history: any) => (
                                                <Fragment key={uuidv4()}>
                                                    <div className="row ps-3 pe-3">
                                                        <div className="col-xl-6 col-lg-8 col-12 col-md-7 col-sm-8">
                                                            <div className="row">
                                                                <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                                    <a onClick={() => handleRedirect(`truyen-tranh/${history.friendlyName}`, roleUser)}>
                                                                        <img src={history.thumbnailUrl ?? "/assets/media/404/none.jpg"} alt={history.title} />
                                                                    </a>
                                                                </div>
                                                                <div className="col-lg-10 col-sm-9 col-9">
                                                                    <div className="schedule-content align-middle align-middle">
                                                                        <a onClick={() => handleRedirect(`truyen-tranh/${history.friendlyName}`, roleUser)}>
                                                                            <p className="small-title">{history.title}</p>
                                                                            <p className="small-title d-block d-sm-none">{history.contents[0]?.title}</p>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className=" col-xl-3 col-lg-2 col-md-3 col-sm-2 col-0 space-top text-end">
                                                            <p className="space-right d-inline">{history.views.toLocaleString()}</p>
                                                        </div>
                                                        <div className=" col-xl-3 col-lg-2 col-md-3 col-sm-2 col-0 space-top text-end">
                                                            <p className="d-inline">{history.contents[0]?.title}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-12 order">
                            <div className="row align-items-end">
                                <div className="col-lg-12 col-sm-8 col-6">
                                    <div className="img-box">
                                        <img src={session.user?.image ?? ''} alt="Avatar" className="rounded-circle shadow-4 px-2" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                                    <a href="/profile" className="d-inline"><h3 className={`${getUserNameClass(roleUser)}`} style={{ display: 'block', marginLeft: '10px' }}>{session.user?.name} <div className="role-badge">{getRoleBadge(roleUser)}</div></h3></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!isHistoryPage &&
                        <div className="pagination-wrape">
                            <Pagination
                                pageIndex={pagingParams.PageNumber}
                                totalCounts={totalRecords}
                                pageSize={pagingParams.PageSize}
                                onPageChange={page => setPagingParams({ ...pagingParams, PageNumber: page })} />
                        </div>
                    }
                    <div className="text-details mt-4">
                        <div className="text-box mb-4 text-center">
                            {t('follow_directive')}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}