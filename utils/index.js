export function getNFTIdFromURL(url) {
  const URL = new URL(url)
  let newURL = ""
  switch (URL.hostname) {
    case "magiceden.io":
      newURL = URL.pathname.split("/")[1]
      break
    case "solanart.io":
      newURL = URL.pathname.split("/")[1]
      break
    case "coralcube.io":
      newURL = URL.pathname.split("/")[1]
      break
    case "www.yawww.io":
      newURL = URL.pathname.split("/")[2]
      break
    case "opensea.io":
      newURL = URL.pathname.split("/")[2]
      break

  }
  return newURL
}