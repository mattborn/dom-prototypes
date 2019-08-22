if (!location.hostname.split('.')[0].startsWith('zeus')) {
  alert('This bookmarklet only works on zeus-*.internal-artemishealth.com')
} else {
  console.log('Bookmarketlet ran', Date.now())
}

(() => {
  const indicators = ['🤗', '🤔', '😟']

  function fakePage() {
    document.querySelector('.component-content').innerHTML = ''

    const card = document.createElement('div')
    card.className = 'card'

    const rows = document.createElement('div')
    rows.innerHTML = getRows([
      {
        name: 'Refresh Cycle',
        value: (Math.floor(Math.random() * 10) + 25) +' days',
        indicator: indicators[Math.floor(Math.random() * indicators.length)],
      },
      {
        name: 'File to Prod',
        value: ((Math.random() * 5) + 2).toFixed(1) +' days',
        indicator: indicators[Math.floor(Math.random() * indicators.length)],
      },
    ]).join('')
    card.append(rows)

    document.querySelector('.component-content').appendChild(card)
  }

  function getRows(rows) {
    return rows.map(row => {
      return '<div class="row">'+
        '<div>'+ row.name +'</div>'+
        '<div>'+ row.value +'</div>'+
        '<div>'+ row.indicator +'</div>'+
        '</div>'
    })
  }

  const customerNav = document.querySelector('.customer-navigation')
  const iconButton = customerNav.querySelector('.icon-button').cloneNode(true)
  iconButton.querySelector('.mat-icon').textContent = 'meeting_room'
  iconButton.addEventListener('click', fakePage)
  customerNav.appendChild(iconButton)
})()