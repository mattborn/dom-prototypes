if (location.hostname.split('.')[1] !== 'artemishealth') {
  alert('This bookmarklet only works on *.artemishealth.com')
} else {
  console.log('Bookmarketlet ran', Date.now())
}

(() => {
  // borrowed from hecate.js  
  const css = document.createElement('link')
  css.href = 'https://raw.githack.com/mattborn/dom-prototypes/master/19361.css?v='+Date.now()
  css.rel = 'stylesheet'
  document.querySelector('head').appendChild(css)

  showDemoIndicator()
  const parentLabel = prompt('Please enter a label for parent benchmarks', 'Our Book of Business')

  const observer = new MutationObserver((mutationsList, observer) => {
    for(let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if (mutation.target.classList.contains('modal')) {
          if (mutation.target.querySelector('.lib-metric-chooser-entry')) {
            injectBenchmarks()
          }
        }
      }
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  function showDemoIndicator() {
    const div = document.createElement('div')
    div.className = 'demo-indicator'
    div.textContent = 'Benchmarks Demo'
    if (!document.querySelector('.demo-indicator')) {
      document.body.appendChild(div)
    }
  }

  function injectBenchmarks() {
    const benchmarkColor = '#f68'
    const menu = document.querySelector('.lib-metric-chooser-categories .component__group').cloneNode(true)
    document.querySelector('.lib-metric-chooser-categories').insertBefore(menu, document.querySelector('.lib-metric-chooser-categories .component__group'))
    document.querySelector('.lib-metric-chooser-categories .component__group--subject').style.backgroundColor = benchmarkColor
    document.querySelector('.lib-metric-chooser-categories .component__group--subject p').textContent = 'Benchmarks'
    document.querySelector('.lib-metric-chooser-categories .component__group--subject span').style.color = benchmarkColor
    const iconMap = ['icon-book', 'icon-milliman', 'icon-home']
    let renameMap = ['Custom', 'Milliman']
    renameMap.push(parentLabel)
    document.querySelector('.lib-metric-chooser-categories .component__group').querySelectorAll('.component__group--item').forEach((item, i) => {
      const icon = document.createElement('i')
      icon.className = iconMap[i]
      icon.style.marginRight = '4px'
      icon.style.width = '16px'
      item.prepend(icon)
      item.style.borderColor = benchmarkColor
      item.style.color = benchmarkColor
      item.querySelector('p').style.flex = 1
      item.querySelector('p').textContent = renameMap[i]
      item.querySelector('span').style.backgroundColor = benchmarkColor
    })
  }
})()