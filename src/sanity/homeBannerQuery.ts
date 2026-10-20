const homeBannerQuery = `
  *[_type == "homeBanner"][0] {
    images[] {
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    "link": bannerLink,
    "mobileImages": [
      {
        "url": mobileImage1.asset->url,
        "width": mobileImage1.asset->metadata.dimensions.width,
        "height": mobileImage1.asset->metadata.dimensions.height
      },
      {
        "url": mobileImage2.asset->url,
        "width": mobileImage2.asset->metadata.dimensions.width,
        "height": mobileImage2.asset->metadata.dimensions.height
      },
      {
        "url": mobileImage3.asset->url,
        "width": mobileImage3.asset->metadata.dimensions.width,
        "height": mobileImage3.asset->metadata.dimensions.height
      }
    ]
  }
`;

export default homeBannerQuery;
