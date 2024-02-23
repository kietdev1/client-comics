import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_BASE_URL!;

    return {
        rules: {
            userAgent: '*',
            allow: [
                '/',
                '/*?typePage=day',
                '/*?typePage=month',
                '/*?typePage=year',
                '/*?typePage=manga',
                '/*?typePage=manhwa',
                '/*?typePage=manhua',
                '/*?typePage=manga',
                '/*?typePage=manhwa',
                '/*?typePage=comic',
                '/*?typePage=bande_dessinée',
                '/*tim-kiem?value=*',
                '/*search?value=*',
                '/en/comics/*'
            ],
            disallow: [
                '/profile',
                '/theo-doi',
                '/following',
                '/vi',
                '/vi/*',
                '/truyen-tranh/*?previousCollectionId=*',
                '/en/comics/*?previousCollectionId=*',
                '/*?typePage=*',
                '/*tim-kiem*',
                '/*search*',
                '/comics*'
            ],
        },
        sitemap: [
            `${baseUrl}/sitemap/0.xml`,
            `${baseUrl}/sitemap/1.xml`,
        ]
    }
}