import { customColors } from "./constants.js";

function getColors(n) {
  /*
  select first n colors from customColors
  **/
  return customColors.slice(0, n);
}

export function makeChart(activityTypes, activityCounts) {
  const canvas = document.getElementById("myChart");
  const backgroundColors = getColors(activityTypes.length)

  new Chart(canvas, {
    type: 'bar', // Change to 'bar' for a bar chart
    data: {
      labels: activityTypes,
      datasets: [{
        label: '# of activities',
        data: activityCounts,
        borderWidth: 1,
        backgroundColor: backgroundColors,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 14
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            display: true,
          },
          ticks: {
            font: {
              size: 14
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}
