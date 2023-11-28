/** @type {import('next').NextConfig} */
require("dotenv").config(); 
const nextConfig = {
  reactStrictMode: false,
  env:{
    HOST: process.env.baseUrl,
  }
}

module.exports = nextConfig
