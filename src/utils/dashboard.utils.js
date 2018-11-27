export const chartDataFormat = (
  labels,
  percentData,
  bgColor,
  brColor,
  brWidth
) => {
  let obj = {}
  obj = {
    labels: labels,
    datasets: [
      {
        data: percentData,
        backgroundColor: bgColor,
        borderColor: brColor,
        borderWidth: brWidth
      }
    ]
  }
  return obj
}

export const calcPercent = data => {
  let percent = []
  let total_sum = data.reduce((a, b) => a + b, 0)
  for (let i = 0; i < data.length; i++) {
    percent.push(Math.round((data[i] / total_sum) * 100))
  }
  return percent
}

export const convertDate = dateString => {
  let p = dateString.split(/\D/g)
  return [p[2], p[1], p[0]].join('.')
}

export const getNth = (s, c, n) => {
  let idx
  let i = 0
  let newS = ''
  do {
    idx = s.indexOf(c)
    newS += s.substring(0, idx)
    s = s.substring(idx + 1)
  } while (++i < n && (newS += c))
  return newS
}

//Input: '2018-10-10T06:44:00.6', Output: '10.10.2018 klo 06:44'
export const formatDateAndTime = dt => {
  let words = dt.split('T')
  let date = convertDate(words[0])
  let time = getNth(words[1], ':', 2)
  let fdt = date + ' klo ' + time
  return fdt
}

export const convertInvoiceStateNames = invoiceState => {
  switch (invoiceState) {
    case 'Draft':
      return 'Luonnos'
    case 'Sent':
      return 'Lähetetty'
    case 'Paid':
      return 'Maksettu'
    case 'UnderProcessing':
      return 'Käsittelyssä'
  }
}

export const convertMonthNames = month => {
  switch (month) {
    case 'January':
      return 'Tammikuu'
    case 'February':
      return 'Helmikuu'
    case 'March':
      return 'Maaliskuu'
    case 'April':
      return 'Huhtikuu'
    case 'May':
      return 'Toukokuu'
    case 'June':
      return 'Kesäkuu'
    case 'July':
      return 'Heinäkuu'
    case 'August':
      return 'Elokuu'
    case 'September':
      return 'Syyskuu'
    case 'October':
      return 'Lokakuu'
    case 'November':
      return 'Marraskuu'
    case 'December':
      return 'Joulukuu'
  }
}

export const labelInvoiceMonthlyArray = (array) => {
  let list = []
  for (var i = 0; i < array.length; i++) {
    list.push(convertMonthNames(array[i]))
  }
  return list
}

export const labelInvoiceArray = (array) => {
  let list = []
  for (var i = 0; i < array.length; i++) {
    list.push(convertInvoiceStateNames(array[i]))
  }
  return list
}