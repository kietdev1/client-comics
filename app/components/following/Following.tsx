"use client"
import { useTranslations } from "next-intl";

export default function Following({ session }: { session: any }) {
    const t = useTranslations('profile');
    return (
        <>
        <section className="breadcrumb">
            <div className="container">
                <div className="breadcrumb-content">
                    <ul>
                        <li><a href="/profile">{t('profile')}</a></li>
                        <li><a className="active">{t('following_history')}</a></li>
                    </ul>
                </div>
            </div>
        </section>
        <section className="schedule style-3  sec-mar">
            <div className="container">
                <div className="heading style-1">
                    <h2>{t('playlist')}</h2>
                </div>
                <div className="row">
                    <div className="col-xl-9 col-sm-12 col-12">
                        <div className="schedule-box">
                            <div className="card">
                                <div className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                                        <li className="nav-item">
                                            <a className="nav-link text-center active" aria-current="true" data-bs-toggle="tab"
                                                href="playlist.html#later">
                                                <h2>FOLLOWING</h2>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-center" aria-current="true" data-bs-toggle="tab"
                                                href="playlist.html#playlist">
                                                <h2>HISTORY READING</h2>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body style-1 tab-content">
                                    <div className="row justify-content-between ps-3 pe-3 pb-4">
                                        <div className="col-lg-6 col-sm-6 col-12">
                                            <h4 className="d-inline">Movie Details</h4>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 col-0 text-end">
                                            <h4 className="space-right d-inline">Seasons</h4>
                                            <h4 className="d-inline">Episode</h4>
                                        </div>
                                    </div>
                                    <div className="tab-pane active" id="later">
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-1.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle align-middle">
                                                                <p className="small-title">Darling in the Franxx!</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 04</p>
                                                    <p className="d-inline">Episode 04</p>
                                                </div>
                                            </div>
                                        </a>
                                        <hr />
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-2.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle">
                                                                <p className="small-title">Plastic Memories</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 06</p>
                                                    <p className="d-inline">Episode 06</p>
                                                </div>
                                            </div>
                                        </a>
                                        <hr />
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-3.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle">
                                                                <p className="small-title">That Time I Reincarnated As a Slime
                                                                    Season 2</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 12</p>
                                                    <p className="d-inline">Episode 12</p>
                                                </div>
                                            </div>
                                        </a>
                                        <hr />
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-4.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle">
                                                                <p className="small-title">Assassination classNameroom</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 09</p>
                                                    <p className="d-inline">Episode 09</p>
                                                </div>
                                            </div>
                                        </a>
                                        <hr />
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-5.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle">
                                                                <p className="small-title">Chainsaw Man</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 20</p>
                                                    <p className="d-inline">Episode 20</p>
                                                </div>
                                            </div>
                                        </a>
                                        <hr />
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-6.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle">
                                                                <p className="small-title">No Game No Life Zero</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 22</p>
                                                    <p className="d-inline">Episode 29</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="tab-pane" id="playlist">
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-2.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle">
                                                                <p className="small-title">Darling in the Franxx!</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 04</p>
                                                    <p className="d-inline">Episode 04</p>
                                                </div>
                                            </div>
                                        </a>
                                        <hr />
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-3.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle">
                                                                <p className="small-title">Plastic Memories</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 06</p>
                                                    <p className="d-inline">Episode 06</p>
                                                </div>
                                            </div>
                                        </a>
                                        <hr />
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-4.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle">
                                                                <p className="small-title">That Time I Reincarnated As a Slime
                                                                    Season 2</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 12</p>
                                                    <p className="d-inline">Episode 12</p>
                                                </div>
                                            </div>
                                        </a>
                                        <hr />
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-5.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle">
                                                                <p className="small-title">Assassination classNameroom</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 09</p>
                                                    <p className="d-inline">Episode 09</p>
                                                </div>
                                            </div>
                                        </a>
                                        <hr />
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-6.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle">
                                                                <p className="small-title">Chainsaw Man</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 20</p>
                                                    <p className="d-inline">Episode 20</p>
                                                </div>
                                            </div>
                                        </a>
                                        <hr />
                                        <a href="streaming-season.html">
                                            <div className="row ps-3 pe-3">
                                                <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                            <img src="assets/media/anime-sm-img/anime-img-1.png" alt="" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                            <div className="schedule-content align-middle">
                                                                <p className="small-title">No Game No Life Zero</p>
                                                                <p className="text-box">dub 8</p>
                                                                <p className="text-box">sub 12</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                    <p className="space-right d-inline">Season 22</p>
                                                    <p className="d-inline">Episode 22</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-12 order">
                        <div className="row align-items-end">
                            <div className="col-lg-12 col-sm-8 col-6">
                                <div className="img-box">
                                    <img src={session.user?.image ?? ''} alt="Avatar" className="rounded-circle shadow-4 px-2"/>
                                </div>
                            </div>
                            <div className="col-lg-12 col-sm-6 col-6">
                                <p className="small-text pt-1">{session.user?.email}</p>
                                <a href="/profile" className="d-inline"><h3>{session.user?.name}</h3></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pagination-wrape">
                    <ul className="pagination">
                        <li className="page-item">
                            <a href="playlist.html#" className="page-link arrow" aria-label="Previous">
                                <i className="fa fa-chevron-left"></i>
                            </a>
                        </li>
                        <li className="page-item">
                            <a href="playlist.html#" className="page-link current">1</a>
                        </li>
                        <li className="page-item">
                            <a href="playlist.html#" className="page-link">2</a>
                        </li>
                        <li className="page-item">
                            <a href="playlist.html#" className="page-link">3</a>
                        </li>
                        <li className="page-item">
                            <a href="playlist.html#" className="page-link">4</a>
                        </li>
                        <li className="page-item">
                            <a href="playlist.html#" className="page-link arrow" aria-label="next">
                                <i className="fa fa-chevron-right"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        </>
    );
}