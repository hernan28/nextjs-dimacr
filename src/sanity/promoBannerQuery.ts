const promoBannerQuery = `
  *[_type == "promoBanner"][0] {
    altText,
    "imageUrl": image.asset->url,
    "mobileImageUrl": mobileImage.asset->url
  }
`;

export default promoBannerQuery;
