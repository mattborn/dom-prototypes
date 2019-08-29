if (!location.hostname.split('.')[0].startsWith('zeus')) {
  alert('This bookmarklet only works on zeus-*.internal-artemishealth.com')
} else {
  console.log('Bookmarketlet ran', Date.now())
}

/**
 * 
 * @param {Node} parent
 * @param {Node} newChild
 * @param {Number} index
 */
function insertFork (parent, newChild, index) {
  if (index < 0) {
    parent.appendChild(newChild)
  } else {
    parent.insertBefore(newChild, parent.children[index])
  }
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
      columnHeader.title = column.tooltip
      insertFork(firstRow, columnHeader, column.index)
      
      table.querySelectorAll('.mat-row').forEach((row, i) => {
        const cell = row.querySelector('.mat-cell').cloneNode(true)
        cell.innerHTML = column.data()
        insertFork(row, cell, column.index)
      })
    })
  })
}

function randomADBR() {
  return (25 + Math.random() * 10).toFixed(1) +' days'
}

(() => {
  injectColumns(document.querySelectorAll('.mat-table'), [
    {
      name: 'ADBR',
      index: 4,
      data: randomADBR,
      tooltip: 'Average Days Between Refreshes is the average number of days between the last 3 refreshes.',
    },
  ])
})()