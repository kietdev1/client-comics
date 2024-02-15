"use client";
import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from "next-intl";
import { countryFlags, handleRedirect, shortNumberViews } from '@/app/utils/HelperFunctions';

export default function ComicSearchResult({ albums, pagingCount, setPagingParams, pagingParams, roleUser }: { albums: any, pagingCount: any, setPagingParams: any, pagingParams: any, roleUser: any }) {
    const [loading, setLoading] = useState(false);
    const pageSize = pagingParams.PageSize;
    const totalAlbums = pagingCount.pageLength;
    const totalPages = Math.ceil(totalAlbums / pageSize);
    const t = useTranslations('search');

    useEffect(() => {
        setLoading(false);
        if (albums == null)
            setLoading(true)
    }, [albums]);

    const handlePageClick = (page: number) => {
        setPagingParams({ ...pagingParams, PageNumber: page });
    };
    const handlePrevClick = () => {
        const prevPage = pagingParams.PageNumber - 1;
        if (prevPage >= 1) {
            setPagingParams({ ...pagingParams, PageNumber: prevPage });
        }
    };

    const handleNextClick = () => {
        const nextPage = pagingParams.PageNumber + 1;
        if (nextPage <= totalPages) {
            setPagingParams({ ...pagingParams, PageNumber: nextPage });
        }
    };
    const renderPagination = useMemo(() => {
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        return (
            <ul className="pagination">
                <li className="page-item">
                    <a className="hover page-link arrow" aria-label="Previous" onClick={handlePrevClick}>
                        <i className="fa fa-chevron-left"></i>
                    </a>
                </li>
                {pages.map((page) => (
                    <li key={page} className="page-item">
                        <a className={`hover page-link ${page === pagingParams.PageNumber ? 'active' : ''}`} onClick={() => handlePageClick(page)}>{page}</a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="hover page-link arrow" aria-label="Next" onClick={handleNextClick}>
                        <i className="fa fa-chevron-right"></i>
                    </a>
                </li>
            </ul>
        );
    }, [pagingParams.PageNumber, totalPages]);

    return (
        <>
            <section className="anime sec-mar">
                <div className="container">
                    {loading && (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    {albums && albums.length > 0 &&
                        <>
                            <div className="row">
                                {albums?.map((album: any) => (
                                    <div key={album.id} className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                                        <div className="anime-box bg-color-black">
                                            <a onClick={()=>handleRedirect(`truyen-tranh/${album.friendlyName}`, roleUser)}>
                                                <div className="row m-0">
                                                    <div className="p-0 col-2">
                                                        <img src={album.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={album.title} />
                                                    </div>
                                                    <div className="p-0 col-9">
                                                        <div className="anime-blog">
                                                            <p>{album.title}</p>
                                                            <p className="text">
                                                                {t('views')}: {album.viewByTopType !== null ? shortNumberViews(album.viewByTopType) : shortNumberViews(album.views)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="p-0 col-1 show-type">
                                                        <span className="show-type">
                                                            {album.tags && <span className={(countryFlags as any)[album.tags]}></span>}
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pagination-wrape">
                                {renderPagination}
                            </div>
                        </>
                    }
                    {!loading && albums && albums.length === 0 && (
                        <div className="no-data-message">
                            {t('no_data')}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}