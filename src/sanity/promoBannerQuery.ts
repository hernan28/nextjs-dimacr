const promoBannerQuery = `
  *[_type == "promoBanner"][0] {
    altText,
    "imageUrl": image.asset->url,
    "imageWidth": image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height,
    "mobileImageUrl": mobileImage.asset->url,
    "mobileImageWidth": mobileImage.asset->metadata.dimensions.width,
    "mobileImageHeight": mobileImage.asset->metadata.dimensions.height
  }
`;

export default promoBannerQuery;
