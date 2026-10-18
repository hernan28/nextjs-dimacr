const authorizedPartnersQuery = `
  *[_type == "authorizedPartner" && defined(name) && defined(website)]
    | order(order asc, name asc) {
      _id,
      name,
      description,
      category,
      website,
      "logoUrl": logo.asset->url
    }
`

export default authorizedPartnersQuery
