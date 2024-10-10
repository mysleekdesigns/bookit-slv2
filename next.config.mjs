/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL : "http://localhost:3000/",
        DB_LOCAL_URI: "mongodb://127.0.0.1:27017/bookit",
        DB_URI: "",

        STRIPE_WEBHOOK_SECRET: "whsec_2d385444e1b531c4638bcf6c10307e4b385bebc10b63be952f5bdd977bad1317",
        STRIPE_SECRET_KEY: "sk_test_51Q3LINHwjthzi6nTT840ZT6jwpTCmbJ8baufmjQpSiZHOW3sFaj9ExmRuugs0r2Pqq7Xu42KSGpeqnlyIWXQOHD500k5cqOEc0",

        CLOUDINARY_CLOUD_NAME : "bookit-sl",
        CLOUDINARY_API_KEY : "498665668129615",
        CLOUDINARY_API_SECRET : "nY4RGXMYfKMQvKXtbIi-Hd1G_UA",

        SMTP_HOST: "sandbox.smtp.mailtrap.io",
        SMTP_PORT: 2525,
        SMTP_USER: "20416c0ba3aff0",
        SMTP_PASSWORD: "89a55736bff8e8",
        SMTP_FROM_EMAIL: 'noreply@bookit.com',
        SMTP_FROM_NAME: 'bookit',

        // you can use google maps instead
        GEOCODER_API_KEY: 'N0KEnM6rQMZE2W3cwT4Y0XLWjNJyrrMx',
        GEOCODER_PROVIDER: 'mapquest',

        MAPBOX_ACCESS_TOKEN: "pk.eyJ1Ijoic2x5bWVzMTk3NSIsImEiOiJjbTFnaWN6M2MwNGliMmpwcXd0em81a2duIn0.MI7FLTk4HUIsfEcoOLpEjg",

        NEXTAUTH_URL: "http://localhost:3000",
        NEXTAUTH_SECRET: "thisIsMyNextAuthSecretKey",
        REVALIDATE_TOKEN: "sJGFayRcFUqxjcWzEtaCshr0l6iALHXO96ywB6u9iJ02rLPkiPXYRTTrWiXuErUV",
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
};

export default nextConfig;
