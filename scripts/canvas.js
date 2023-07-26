export function makePieChart(activityTypes, activityCounts) {
  const canvas = document.getElementById("myChart");

  new Chart(canvas, {
    type: 'pie',
    data: {
      labels: activityTypes,
      datasets: [{
        label: '# of activities',
        data: activityCounts,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
      legend: {
        position: 'bottom',
      }
    }
    }
  });
  return;
}
