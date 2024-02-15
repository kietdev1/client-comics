'use client';
import { useTranslations } from "next-intl";
import Image from "next/image";
import FacebookImage from '@/public/assets/media/footer/facebook.png';

export default function Payment() {
    const t = useTranslations('upgrade');
    const typePage = typeof window !== 'undefined' ? new URLSearchParams(window.location.search)?.get('package') || "" : "";
    return (
        <section className="blog style-1 sec-mar">
            <div className="container">
                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12" />
                    <div className="col-lg-4 col-md-4 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                        <a className="inner-box">
                            <div className="image-box">
                                <img src={typePage ? `/assets/media/qrCode/${typePage}.png`: `/assets/media/qrCode/premium_1.png`} alt="" className="attachment-full size-full" />
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12" />
                    <div className="col-lg-6 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                        <h2 style={{ color: 'white' }}>{t('transaction_code')}</h2>
                        <form>
                            <div className="input-group form-group header-search-box">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="query"
                                    required={true}
                                    placeholder={t('enter_transaction_code')}
                                />
                                <button
                                    className="input-group-text anime-btn"
                                    type="submit"
                                    id="searchButton"
                                >
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </form>
                        <h5 style={{ color: 'white' }}>{t('note')}</h5>
                        <p>{t('note_1')}</p>
                        <p>{t('note_2')}</p>
                        <p>{t('note_3')}</p>
                        <p>{t('note_4')}</p>
                        <ul className="social-icons">
                            <a href="https://www.facebook.com/tonotdievietnam">
                                <Image src={FacebookImage} alt="facebook" />
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}