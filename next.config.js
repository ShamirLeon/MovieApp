/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
    images:{
        domains:['images.unsplash.com', 'www.hollywoodreporter.com', 'i.ytimg.com', 'akns-images.eonline.com']
    },
    sassOptions:{
        includePaths: [path.join(__dirname, 'styles')]
    }
}

module.exports = nextConfig
