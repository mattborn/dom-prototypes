if (!location.hostname.split('.')[0].startsWith('zeus')) {
  alert('This bookmarklet only works on zeus-*.internal-artemishealth.com')
} else {
  console.log('Bookmarketlet ran', Date.now())
}

/**
 * injectColumn
 * 
 * @param {Array} targetTables 
 * @param {Array} columns // expects name, index + data function forEach
 */
function injectColumns (targetTables, columns) {
  targetTables.forEach(table => {
    const firstRow = table.querySelector('.mat-header-row')

    columns.forEach(column => {
      const columnHeader = firstRow.querySelector('.mat-header-cell').cloneNode(true)
      columnHeader.textContent = column.name
      firstRow.appendChild(columnHeader)
      
      table.querySelectorAll('.mat-row').forEach((row, i) => {
        const cell = row.querySelector('.mat-cell').cloneNode(true)
        cell.innerHTML = column.data()
        row.appendChild(cell)
      })
    })
  })
}

function randomJobStatus() {
  const statuses = [
    '<span style="color:#2be">Staging<span> <i class="material-icons">timelapse</i>',
    '<span style="color:#e32">Failed Stage<span>',
    'Staged',
    '<span style="color:#fa4">Rejected<span> <i class="material-icons">block</i>',
    '<span style="color:#5c2">Deployed<span> <i class="material-icons">cloud_done</i>',
  ]
  return statuses[Math.floor(Math.random() * statuses.length)]
}

function timestamp() {
  return Date.now() - Math.floor(Math.random() * 3600)
}

function runButtons() {
  return '<button class="basic-button primary-button">Run Landers</button> <button class="basic-button primary-button">Run Integration</button>'
}

(() => {
  injectColumns(document.querySelectorAll('.mat-table'), [
    {
      name: 'Last Job Status',
      index: -1,
      data: randomJobStatus,
    },
    {
      name: 'Last Job Run On',
      index: -1,
      data: timestamp,
    },
    {
      name: 'Actions',
      index: -1,
      data: runButtons,
    },
  ])
})()