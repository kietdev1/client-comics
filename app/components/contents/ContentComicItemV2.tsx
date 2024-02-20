"use client"
import React from 'react';
import LazyLoad from 'react-lazyload';

export function ContentComicItemV2({ imageUrl }: { imageUrl: string }) {
    return (
        <div className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter">
            <LazyLoad height={500} once offset={300}>
                <img
                    src={imageUrl}
                    alt=""
                    width={800}
                />
            </LazyLoad>
        </div>
    )
}

export default ContentComicItemV2;