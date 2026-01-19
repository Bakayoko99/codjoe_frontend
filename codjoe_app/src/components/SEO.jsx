import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title = 'CODJOE - Premium Fashion & Streetwear',
    description = 'Discover CODJOE\'s exclusive collection of premium streetwear, tops, and bottoms. Shop the latest trends in fashion with fast shipping.',
    keywords = 'fashion, streetwear, tops, bottoms, clothing, premium fashion, CODJOE, online shopping',
    image = '/codjoe_logo.png',
    url = typeof window !== 'undefined' ? window.location.href : '',
    type = 'website',
    robots = 'index, follow'
}) => {
    const siteUrl = 'https://codjoe.com'; // À remplacer par votre URL de production
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content="CODJOE" />
            <meta property="og:locale" content="en_US" />
            
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImage} />
            <meta property="twitter:creator" content="@codjoe" />
            
            {/* Canonical URL */}
            <link rel="canonical" href={fullUrl} />
            
            {/* Additional SEO */}
            <meta name="robots" content={robots} />
            <meta name="language" content="English" />
            <meta name="author" content="CODJOE" />
            <meta name="theme-color" content="#C29F75" />
            
            {/* Mobile Optimization */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        </Helmet>
    );
};

export default SEO;
