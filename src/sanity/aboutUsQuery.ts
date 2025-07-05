const aboutUsQuery = `
  *[_type == "about"][0] {
    aboutHeader,
    aboutTitle,
    trajectoryLabel,
    description,
    buttonText,
    image {
      asset->{
        url
      }
    }
  }
`;

export default aboutUsQuery;