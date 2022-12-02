export function getNFTIdFromURL(url) {
  const tempURL = new URL(url)
  let newURL = ""
  switch (tempURL.hostname) {
    case "magiceden.io":
      newURL = tempURL.pathname.split("/")[2]
      break
    case "solanart.io":
      newURL = tempURL.pathname.split("/")[2]
      break
    case "coralcube.io":
      newURL = tempURL.pathname.split("/")[2]
      break
    case "www.yawww.io":
      newURL = tempURL.pathname.split("/")[3]
      break
    case "opensea.io":
      newURL = tempURL.pathname.split("/")[3]
      break

  }
  return newURL
}

export function getCollectionName(collection_name) {
  return collection_name.split("/")[1]
}

export function lamportsToSol(lamports) {
  return lamports / 100000000
}

export function ISOdateToReadable(isoTimestamp) {
  const date = new Date(isoTimestamp)
  return date.toLocaleString("day month year time")

}