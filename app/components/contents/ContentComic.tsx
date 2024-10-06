import ContentResponse from '@/app/models/contents/ContentResponse';
import ComicDetail from '@/app/models/comics/ComicDetail';
import dynamic from "next/dynamic";
import { useTranslations } from 'next-intl';
import { v4 as uuidv4 } from 'uuid';
import { getEnumValueFromString, getLangByLocale, percentAffImage, roundTimeTo30Minutes } from '@/app/utils/HelperFunctions';
import { ERoleType } from '@/app/models/enums/ERoleType';
import dayjs from "@/lib/dayjs/dayjs-custom";
import { pathnames } from '@/navigation';
import SupportButton from '../common/SupportButton';
import PreviousNextButton from './PreviousNextButton';
import { encryptUrl } from '@/lib/security/securityHelper';

const ScrollButton = dynamic(() => import('@/app/components/common/ScrollButton'), {
    ssr: false
});

const DynamiChooseChapButton = dynamic(() => import('@/app/components/contents/ChooseChapButton'), {
    ssr: true
});

const DynamicContentComicItemHoc = dynamic(() => import('./ContentComicItemHoc'), {
    ssr: true
})

// const DynamicAdBanner = dynamic(() => import('@/app/components/analytics/AdBanner'), {
//     ssr: false
// })

const DynamicProductBanner = dynamic(() => import('@/app/components/analytics/ProductBanner'), {
    ssr: false
})

export default async function ContentComic({ content, comic, session, locale, isBot }: { content?: ContentResponse | null, comic?: ComicDetail | null, session: any, locale: any, isBot: boolean }) {
    const t = useTranslations('comic_detail');
    const routeChapter = locale === 'vi' ? pathnames['/comics/[comicid]/[contentid]'][getLangByLocale(locale)] : `/${getLangByLocale(locale)}${pathnames['/comics/[comicid]/[contentid]'][getLangByLocale(locale)]}`;

    let albumFriendlyName = content?.albumFriendlyName;
    let currentFriendlyName = content?.friendlyName;
    let prevChap, nextChap, isLastChap, isFirstChap;
    const roleUser = getEnumValueFromString(session?.user?.token?.roles);

    const generateContentUrlByLocale = (template: string, comicId: string, contentId: string) => {
        return template.replace('[comicid]', comicId).replace('[contentid]', contentId);
    }

    if (currentFriendlyName !== null && currentFriendlyName !== undefined) {
        let currentChapNumber = parseInt(currentFriendlyName.split("-")[1]);
        let endChapNumber = parseInt((comic?.contents[0]?.friendlyName ?? "0").split("-")[1]);
        let startChapNumber = parseInt((comic?.contents[comic?.contents.length - 1]?.friendlyName ?? "0").split("-")[1]);
        prevChap = generateContentUrlByLocale(routeChapter, albumFriendlyName ?? '', currentFriendlyName.replace(currentFriendlyName, 'chap-' + (currentChapNumber - 1) ?? ''));
        nextChap = generateContentUrlByLocale(routeChapter, albumFriendlyName ?? '', currentFriendlyName.replace(currentFriendlyName, 'chap-' + (currentChapNumber + 1) ?? ''));
        isLastChap = parseInt(currentFriendlyName.split("-")[1]) < endChapNumber || false;
        isFirstChap = parseInt(currentFriendlyName.split("-")[1]) > startChapNumber || false;
    }

    // Encrypt url
    if (content?.contentItems) {
        content.contentItems = content?.contentItems?.map((item) => {
            return encryptUrl(item);
        })
    }

    return (
        <>
            {/*=====================================*/}
            {/*=        Chapter Area Start       	=*/}
            {/*=====================================*/}
            <section className="chapter sec-mar">
                <div className="container">
                    <div className="heading style-1">
                        <h1>{content?.albumTitle} - {content?.title}</h1>
                    </div>
                    <SupportButton prevLink={isFirstChap ? prevChap : null} nextLink={isLastChap ? nextChap : null} />
                    <ScrollButton />
                    <div className="d-flex justify-content-between mb-4">
                        <div className="left">
                            <a
                                href="#"
                                className="anime-btn btn-dark border-change dropdown-toggle"
                                id="country"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                aria-expanded="false"
                            >
                                {content?.title}
                                <span className='chevron-down'>
                                    <i className="fa fa-chevron-down" />
                                </span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="country">
                                <div className='chapter-list-content'>
                                    {comic?.contents?.map((content, index) => (
                                        <li key={index} className="grid-item">
                                            {isBot && (
                                                <a className='page-link' href={`${generateContentUrlByLocale(routeChapter, content.albumFriendlyName ?? '', content.friendlyName ?? '')}`}>
                                                    {content.title}
                                                </a>
                                            )}
                                            {!isBot && <DynamiChooseChapButton
                                                targeLink={generateContentUrlByLocale(routeChapter, content.albumFriendlyName ?? '', content.friendlyName ?? '')}
                                                title={content.title}
                                                albumFriendlyName={content.albumFriendlyName}
                                                collectionfriendlyName={content.friendlyName}
                                                isActive={content.friendlyName === currentFriendlyName} />}
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        </div>
                        <div className="right">
                            {isFirstChap && isBot &&
                                <a href={prevChap}
                                    className="anime-btn btn-dark">
                                    {t('previous')}
                                </a>
                            }
                            {isLastChap && isBot &&
                                <a
                                    href={nextChap}
                                    className="anime-btn btn-dark border-change ms-1"
                                >
                                    {t('next')}
                                </a>
                            }
                            {isFirstChap && !isBot &&
                                <PreviousNextButton isNext={false} targeLink={prevChap} />
                            }
                            {isLastChap && !isBot &&
                                <PreviousNextButton isNext={true} targeLink={nextChap} />
                            }
                        </div>
                    </div>
                    {(content && roleUser && roleUser >= content.levelPublic) || (content && content.levelPublic == 0) ?
                        (
                            <div className="row text-center pt-4">
                                {/* {!isBot && process.env.ACTIVE_BANNER && percentBanner(roleUser) && (
                                    <div className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter"
                                        style={{ display: 'flex', justifyContent: 'center' }}>
                                        <DynamicAdBanner />
                                    </div>
                                )} */}
                                {!isBot && percentAffImage(roleUser) && (
                                    <div className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter">
                                        <DynamicProductBanner />
                                    </div>
                                )}
                                {process.env.LAZY_LOADING_IMAGE == 'false' && content?.contentItems && content?.contentItems.map((item: any) => (
                                    <div key={uuidv4()} className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter">
                                        <img
                                            loading='lazy'
                                            src={item}
                                            alt=""
                                            width={800}
                                        />
                                    </div>
                                ))}
                                {process.env.LAZY_LOADING_IMAGE == 'true' && content?.contentItems &&
                                    <DynamicContentComicItemHoc storageType={content.storageType} imageUrls={content?.contentItems} />
                                }
                                {/* {!isBot && process.env.ACTIVE_BANNER && percentBanner(roleUser) && (
                                    <div className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter"
                                        style={{ display: 'flex', justifyContent: 'center' }}>
                                        <DynamicAdBanner />
                                    </div>
                                )} */}
                                {!isBot && percentAffImage(roleUser) && (
                                    <div className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter">
                                        <DynamicProductBanner />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="row text-center pt-4" style={{ color: 'white' }}>
                                <h1>{t('priority')}</h1>
                                {roleUser === ERoleType.UserPremium &&
                                    <h3>{t('will_publish_pre')} {locale == 'vi' ? (
                                        <>
                                            <span>{dayjs.utc(roundTimeTo30Minutes(content?.createdOnUtc)).add(11, 'hours').format('HH:mm A DD-MM-YYYY')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{dayjs.utc(roundTimeTo30Minutes(content?.createdOnUtc)).add(4, 'hours').format('HH:mm A DD-MM-YYYY')}</span>
                                        </>
                                    )}</h3>
                                }
                                {roleUser !== ERoleType.UserPremium && roleUser !== ERoleType.UserSuperPremium &&
                                    <h3>{t('will_publish')} {locale == 'vi' ? (
                                        <>
                                            <span>{dayjs.utc(roundTimeTo30Minutes(content?.createdOnUtc)).add(22, 'hours').format('HH:mm A DD-MM-YYYY')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{dayjs.utc(roundTimeTo30Minutes(content?.createdOnUtc)).add(15, 'hours').format('HH:mm A DD-MM-YYYY')}</span>
                                        </>
                                    )}</h3>
                                }
                                <p>{t('refer')} <a style={{ color: 'var(--color-primary)' }} href="/upgrade-package">{t('here')}</a></p>
                                {/* {!isBot && process.env.ACTIVE_BANNER && percentBanner(roleUser) && (
                                    <div className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter"
                                        style={{ display: 'flex', justifyContent: 'center' }}>
                                        <DynamicAdBanner />
                                    </div>
                                )} */}
                            </div>
                        )}
                    <br></br>

                    {((content && roleUser && roleUser >= content.levelPublic) || (content && content.levelPublic == 0)) &&
                        <div className="d-flex justify-content-between mb-4">
                            <div className="left">
                                <a
                                    href="#"
                                    className="anime-btn btn-dark border-change dropdown-toggle"
                                    id="country"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    {content?.title}
                                    <span className='chevron-down'>
                                        <i className="fa fa-chevron-down" />
                                    </span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="country">
                                    <div className='chapter-list-content'>
                                        {comic?.contents?.map((content, index) => (
                                            <li key={index} className="grid-item">
                                                <a className='page-link' href={`${generateContentUrlByLocale(routeChapter, content.albumFriendlyName ?? '', content.friendlyName ?? '')}`}>
                                                    {content.title}
                                                </a>
                                            </li>
                                        ))}
                                    </div>
                                </ul>
                            </div>
                            <div className="right">
                                {isFirstChap && isBot &&
                                    <a href={prevChap}
                                        className="anime-btn btn-dark">
                                        {t('previous')}
                                    </a>
                                }
                                {isLastChap && isBot &&
                                    <a
                                        href={nextChap + "?previousCollectionId=" + content?.id}
                                        className="anime-btn btn-dark border-change ms-1"
                                    >
                                        {t('next')}
                                    </a>
                                }
                                {isFirstChap && !isBot &&
                                    <PreviousNextButton isNext={false} targeLink={prevChap} />
                                }
                                {isLastChap && !isBot &&
                                    <PreviousNextButton
                                        isNext={true}
                                        targeLink={nextChap}
                                        alternativeTargertLink={nextChap + "?previousCollectionId=" + content?.id}
                                    />
                                }
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    );
}