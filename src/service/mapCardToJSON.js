export function MapCardToJSON (card) {
  if (!card) return;
  const name = card['Full Project Name'];
  const displayName = card['Display Name'] ? card['Display Name'][0] : '';  // b/c it's a lookup field in AT?
  const reviewStatus = card['Review Status'] ? card['Review Status'][0] : '';
  const imageURL = card.HeaderImageURL !== '#ERROR!' ? card.HeaderImageURL : '';
  const description = card['Description'];
  const externalLink = card['Link'];
  const attributionOrg = card['Attribution Organization'];
  const creator = card['Creator'] || '';

  return {
    attributionOrg,
    creator,
    name,
    displayName,
    reviewStatus,
    imageURL,
    description,
    externalLink,
  }
}