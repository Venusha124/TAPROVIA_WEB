import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://taprovia.com';

    // Static routes
    const routes = [
        '',
        '/about',
        '/explore',
        '/products',
        '/stories',
        '/contact',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'yearly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}
