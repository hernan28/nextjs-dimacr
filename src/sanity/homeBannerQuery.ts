const homeBannerQuery = `
  *[_type == "homeBanner"][0] {
    images[] {
      "url": asset->url
    },
    "mobileImageUrls": [
      mobileImage1.asset->url,
      mobileImage2.asset->url,
      mobileImage3.asset->url
    ]
  }
`;

export default homeBannerQuery;
