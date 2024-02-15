import ContentResponse from "@/app/models/contents/ContentResponse";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import dayjs from "@/lib/dayjs/dayjs-custom";
import { Session } from "next-auth";
import { useTranslations } from 'next-intl';

export default function ChapterComic({ contents, locale, session }: {
    contents?: ContentResponse[] | null, locale: any, session: Session | null
}) {
    const t = useTranslations('comic_detail');
    const checkVisibility = (createdOnUtc: any) => {
        const currentTime = dayjs();
        const createdTime = dayjs.utc(createdOnUtc).local();
        const timeDifference = currentTime.diff(createdTime, 'hours');
        return timeDifference <= 4;
    };
    const roleUser = getEnumValueFromString(session?.user?.token?.roles);
    return (
        <>
            {/*=====================================*/}
            {/*=         Release Area Start         =*/}
            {/*=====================================*/}
            <section className="relese sec-mar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <h3 className="small-title">{t('chapter_list')}</h3>
                            <div className=" chapter-list-container">
                                {contents?.map((content, index) => (
                                    <div key={index}>
                                        <h5 className="chapter-list">
                                            {(roleUser && roleUser >= content.levelPublic) || content.levelPublic == 0 ?
                                                (
                                                    <a href={`/truyen-tranh/${content.albumFriendlyName}/${content.friendlyName}`}>{content.title}</a>
                                                ) : (
                                                    <a href="#">{content.title}</a>
                                                )}
                                            <div className="new-chap">
                                                {checkVisibility(content.createdOnUtc) &&
                                                    <>
                                                        <p>new</p>
                                                    </>
                                                }
                                            </div>
                                            {(roleUser && roleUser >= content.levelPublic) || content.levelPublic == 0 ?
                                                (
                                                    <>
                                                        {locale == 'vi' ? (
                                                            <>
                                                                <span>{dayjs.utc(content.createdOnUtc).local().format('DD-MM-YYYY HH:mm')}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>{dayjs.utc(content.createdOnUtc).format('DD-MM-YYYY HH:mm')}</span>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span>{t('priority')}</span>
                                                )}
                                            <p><i className="fas fa-eye"></i> {content.views.toLocaleString()}</p>
                                        </h5>

                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-3 offset-sm-2 mt-lg-0 mt-3">
                            <h3 className="small-title">{t('similar')}</h3>
                            <div className="anime-box bg-color-black">
                                <a href="#">
                                    <div className="row m-0">
                                        <div className="p-0 col-2">
                                            <img src="" alt="" />
                                        </div>
                                        <div className="p-0 col-9">
                                            <div className="anime-blog">
                                                <p>86</p>
                                                <p className="text-box">dub 8</p>
                                                <p className="text-box">sub 12</p>
                                            </div>
                                        </div>
                                        <div className="p-0 col-1 show-type">
                                            <span className="show-type">TV</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}