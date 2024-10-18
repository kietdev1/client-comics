import UserSession from "@/app/models/auth/UserSession";
import { getComments, pushComment } from "@/lib/services/client/comment/commentService";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { getDayjsByLocale, getHoverText, getLevelBadgeClass, getLevelNameById, getRoleBadge, getUserClass, getUserNameClass } from '@/app/utils/HelperFunctions';
import { getPercentByDivdeTwoNumber } from "@/lib/math/mathHelper";

const editorStyle = {
    width: '100%',
    marginBottom: '5vh',
    color: 'white',
};

export default function ReplyComic({ comment, comicId, commentId, replyCount, index, hideComment }: {
    comment: any,
    comicId: number,
    commentId: number, replyCount: number,
    index: string,
    hideComment: boolean
}) {
    const t = useTranslations('comic_detail');
    const locale = useLocale();
    const [replies, setReplies] = useState<any[]>([]);
    const [reply, setReply] = useState('');
    const [error, setError] = useState('');

    const [isOpenToggle, setIsOpenToggle] = useState<boolean>(false);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const toggleEditorRef = useRef<any>(null);
    const toggleMoreReplyRef = useRef<any>(null);

    const [loading, setLoading] = useState(false);
    const userSession = useMemo<UserSession>(() => {
        const session = localStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    }, []);

    // Calculate count when user firstly reply
    const [trueReplyCount, setTrueReplyCount] = useState(replyCount);

    useEffect(() => {
        if (trueReplyCount > 0 && isOpenToggle) {
            const query = {
                albumId: comicId,
                pageNumber: 1,
                pageSize: 10,
                sortColumn: 'createdOnUtc',
                sortDirection: 'asc',
                isReply: true,
                parentCommentId: commentId
            };

            setLoading(true);

            getComments(query)
                .then((response) => {
                    if (response?.data) {
                        setReplies(response.data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching types:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
            // automatic open morre reply when user firstly sucessful reply
        } else if (trueReplyCount > 0 && replyCount === 0 && !isOpenToggle) {
            toggleMoreReplyRef.current?.click();
        }
    }, [trueReplyCount, reloadTrigger, isOpenToggle]);

    const toggleReplies = async () => {
        setIsOpenToggle(!isOpenToggle);
    };

    const handlePostReply = async (event: any, commentId: any) => {
        event.preventDefault();
        if (reply.trim() === '') {
            return;
        }

        const regexEmpty = /<p><br><\/p>$/;
        let modifiedComment;

        if (regexEmpty.test(reply))
            modifiedComment = reply.slice(0, reply.lastIndexOf('<p><br></p>'));
        else
            modifiedComment = reply;
        const commentData = {
            Text: modifiedComment,
            AlbumId: comicId,
            CollectionId: null,
            ParentCommentId: commentId
        };

        const response = await pushComment(commentData);
        if (response === 'level') {
            setError(`${t('please_level_up_reply')}`);
            setReply('');
            setReloadTrigger((prev) => !prev);

            return;
        }
        setReply('');
        setReloadTrigger((prev) => !prev);

        if (trueReplyCount === 0) {
            setTrueReplyCount(1);
        }
    };

    const scrollToReplyEditor = () => {
        const section = document.querySelector(`#reply${index}1`);
        if (section) {
            if (!section.classList.contains('show')) {
                toggleEditorRef.current?.click();
            }

            if (!section.classList.contains('shake-highlight')) {
                section.classList.add('shake-highlight');

                setTimeout(() => {
                    section.classList.remove('shake-highlight');
                }, 1000);
            }
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            {userSession && !hideComment && <button
                className=" accordion-button comment-btn"
                data-bs-toggle="collapse"
                data-bs-target={`#reply${index}1`}
                aria-expanded="true"
                ref={toggleEditorRef}
            >
                {t('reply')}
            </button>
            }
            <div
                id={`reply${index}1`}
                className="accordion-collapse collapse "
                data-bs-parent={`#accordionExample${index}1`}
            >
                <div className="card card-body">
                    <form onSubmit={(event) => handlePostReply(event, comment.id)}>
                        <div className="input-group form-group footer-email-box">
                            <ReactQuill style={editorStyle} theme="snow" value={reply} onChange={setReply} />
                        </div>
                        {error && <p dangerouslySetInnerHTML={{ __html: error }} />}
                        <button className="input-group-text post-btn" type="submit">
                            {t('post')}
                        </button>
                    </form>
                </div>
            </div>
            {loading && <div className="spinner-border text-primary" role="status"></div>}
            {!loading && trueReplyCount > 0 && <a
                className={'accordion-button comment-btn active'}
                data-bs-toggle="collapse"
                data-bs-target={`#reply${index}`}
                aria-expanded={true}
                aria-controls={`reply${index}`}
                onClick={() => toggleReplies()}
                ref={toggleMoreReplyRef}
            >
                {t('view_more_replies')}
            </a>}
            <div
                id={`reply${index}`}
                className="accordion-collapse collapse "
                data-bs-parent={`#accordionExample${index}`}
            >
                <div className="card card-body">
                    <div className="row pt-3">
                        {replies?.map((rl: any, rlIndex: number) => (
                            <div key={rlIndex} className="col-lg-11 offset-lg-1 offset-0 col-9 pb-4">
                                <div className="d-inline-flex align-items-start">
                                    <a data-hover-text={getHoverText(rl.roleType)} className={getUserClass(rl.roleType)}>
                                        <img src={rl.avatar} className="avatar-reply" alt="" />
                                        <span className={getLevelBadgeClass(rl.roleType)}>{getLevelNameById(rl.levelId)}</span>
                                        <div className="hover-text">{getPercentByDivdeTwoNumber(rl.currentExp, rl.nextLevelExp)}%</div>
                                    </a>
                                    <div className="replies">
                                        <h5>
                                            {getRoleBadge(rl.roleType)}
                                            <a href="#" className={getUserNameClass(rl.roleType)}>{rl.userName}</a>
                                            {rl.collectionId && <b className='relation-chap'><a href={`/truyen-tranh/${rl.albumFriendlyName}/${rl.friendlyName}`}>{rl.title}</a></b>}
                                        </h5>
                                        <div dangerouslySetInnerHTML={{ __html: rl.text }} />
                                        <span className='date-comment'>{getDayjsByLocale(locale, rl.createdOnUtc).format('DD-MM-YYYY HH:mm')}</span>
                                        {userSession && !hideComment &&
                                            <button
                                                className=" accordion-button comment-btn"
                                                data-bs-toggle=""
                                                data-bs-target={`#reply${index}1`}
                                                aria-expanded="true"
                                                onClick={scrollToReplyEditor}
                                            >
                                                {t('reply')}
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}