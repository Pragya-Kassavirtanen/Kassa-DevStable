export const chartDataFormat = (labels, percentData, bgColor, brColor, brWidth) => {
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