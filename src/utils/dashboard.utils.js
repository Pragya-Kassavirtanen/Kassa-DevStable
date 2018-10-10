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