"use client"
import { EStorageType } from '@/app/models/enums/EStorageType';
import { generateImageUrlByStorageType } from '@/app/utils/HelperFunctions';
import { decryptUrl } from '@/lib/security/securityHelper';
import React, { memo, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';

const ImageMemo = memo(({ originUrl, setOriginHeight, onError }: {
    originUrl: string,
    setOriginHeight: React.Dispatch<React.SetStateAction<number>>,
    onError: () => void
}) => {
    return (
        <img
            src={originUrl}
            onLoad={e => setOriginHeight(e.currentTarget.height)}
            onError={onError}
            alt=""
            width={800}
        />
    );
});

const ContentComicItemPlaceHolder = memo(({ height }: { height: number }) => {
    return (
        <img
            src={generateImageUrlByStorageType(EStorageType.S1, "1.1_abcda.jpg")}
            height={height}
            alt=""
            width={800}
        />
    );
});

export function ContentComicItemV3({ imageUrl, storageType }: { imageUrl: string, storageType: EStorageType }) {
    const [originUrl, setOriginUrl] = useState<string>('');
    const [originHeight, setOriginHeight] = useState<number>(0);

    useEffect(() => {
        const fileName = decryptUrl(imageUrl);
        const url = generateImageUrlByStorageType(storageType, fileName);
        setOriginUrl(url);
    }, []);

    const onError = () => {
        setOriginUrl("/assets/media/404/1.1_abcda.jpg");
    }

    return (
        <div className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter">
            <LazyLoad height={1000} once={true} offset={1600}
                placeholder={<ContentComicItemPlaceHolder height={originHeight} />}
                unmountIfInvisible={true}>
                <ImageMemo onError={onError} originUrl={originUrl} setOriginHeight={setOriginHeight} />
            </LazyLoad>
        </div >
    )
}

export default ContentComicItemV3;