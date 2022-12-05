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
  return lamports / 1000000000
}

export function ISOdateToReadable(isoTimestamp) {
    const date = new Date(isoTimestamp);
    const options = {
        weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
    };
    const readableDate = date.toLocaleDateString("en-US", options);
    return readableDate;

}

export  function truncateInTheMiddle(fullStr, strLen, separator) {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || '...';

    const sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars);
}

export function isoToDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
}