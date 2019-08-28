if (location.hostname.split('.')[1] !== 'artemishealth') {
  alert('This bookmarklet only works on *.artemishealth.com')
} else {
  console.log('Bookmarketlet ran', Date.now())
}

function setPageTitle() {
  const headerText = document.querySelector('.header-text')
  document.title = headerText ? headerText.textContent.trim() : document.querySelector('.app-name').textContent.trim()
}

function resetStyles() {
  // brute force removal of inline styles
  document.querySelectorAll('[style]').forEach(el => {
    el.style.backgroundColor = ''
    el.style.color = 'inherit'
  })
}

function isChronos() {
  return location.pathname.split('/')[1] === 'v2'
}

(() => {
  const css = document.createElement('link')
  css.href='https://raw.githack.com/mattborn/dom-prototypes/master/19351.css?v='+Date.now()
  css.rel='stylesheet'
  document.querySelector('head').appendChild(css)

  document.body.classList.add('theme-light')
  resetStyles()
  setPageTitle()

  if (isChronos()) console.warn('Themes are not compatible with Chronos')
  if (!document.querySelector('.chronos')) {
    document.querySelectorAll('[ng-click^="nav.navigate(\'\/v2"]').forEach(el => {
      const badge = document.createElement('span')
      badge.className = 'beta-tag chronos'
      badge.textContent = 'Chronos'
      el.appendChild(badge)
    })
  }
  
  // this runs for every click in the main nav
  document.querySelector('.navigation-container').addEventListener('click', () => {
    setTimeout(() => {
      resetStyles()
      setPageTitle()
    }, 500)
  })
})()