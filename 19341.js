if (location.hostname.split('.')[1] !== 'artemishealth') {
  alert('This bookmarklet only works on *.artemishealth.com')
} else {
  console.log('Bookmarketlet ran', Date.now())
}

(() => {
  const benchmarkColor = '#f68'
  const menu = document.querySelector('.lib-metric-chooser-categories .component__group').cloneNode(true)
  document.querySelector('.lib-metric-chooser-categories').insertBefore(menu, document.querySelector('.lib-metric-chooser-categories .component__group'))
  document.querySelector('.lib-metric-chooser-categories .component__group--subject').style.backgroundColor = benchmarkColor
  document.querySelector('.lib-metric-chooser-categories .component__group--subject p').textContent = 'Benchmarks'
  document.querySelector('.lib-metric-chooser-categories .component__group--subject span').style.color = benchmarkColor
  const iconMap = ['icon-book', 'icon-milliman', 'icon-home']
  const renameMap = ['Custom', 'Milliman', 'Parent']
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
})()