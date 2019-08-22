if (location.hostname.split('.')[0].startsWith('zeus')) {
  alert('This bookmarklet only works on zeus-*.internal-artemishealth.com')
} else {
  console.log('Bookmarketlet ran', Date.now())
}

(() => {
  alert('⚡️')
})()