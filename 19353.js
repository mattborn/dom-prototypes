if (!location.hostname.split('.')[0].startsWith('zeus')) {
  alert('This bookmarklet only works on zeus-*.internal-artemishealth.com')
} else {
  console.log('Bookmarketlet ran', Date.now())
}

(() => {
  // insert continue refresh button
  // insert view toggle buttons
  // loop through nodes and render
  // add node detail popup
  // add stepper to swap datasets
})()