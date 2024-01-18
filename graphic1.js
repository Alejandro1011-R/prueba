
const data = getData();

fetch('oceanos.json')
      .then(response => response.json())
      .then(dataa => {
          data = dataa;
          updateGraph();
      });


data.then(result => {
  const buttonsDiv = document.getElementById('buttons');
  const chartContainer = document.getElementById('chartContainer');

  Object.keys(result).forEach(className => {
    const button = createButton(className, chartContainer);
    buttonsDiv.appendChild(button);

    const chart = createChart(className, result[className]);
    chartContainer.appendChild(chart);

    button.classList.add('btn');
  });
});

function createButton(className, chartContainer) {
  const button = document.createElement('button');
  button.textContent = `${className}`;
  button.addEventListener('click', () => {
    // Ocultar todos los gráficos
    const allCharts = document.querySelectorAll('.class-chart');
    allCharts.forEach(chart => chart.style.display = 'none');

    // Mostrar el gráfico correspondiente
    const chartToShow = document.getElementById(`chart-${className}`);
    chartToShow.style.display = 'block';
  });

  return button;
}

function createChart(className, classData) {
  const chartContainer = document.createElement('div');
  chartContainer.className = 'class-chart-container';

  const graphic = document.createElement('canvas');
  graphic.width = 400;
  graphic.height = 300;
  chartContainer.appendChild(graphic);

  const ctx = graphic.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, graphic.height);
  gradient.addColorStop(0, 'rgba(255, 255, 0, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0.8)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: classData.map(item => item.año),
      datasets: [{
        label: 'Temperatura',
        backgroundColor: gradient,
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 2,
        data: classData.map(item => parseFloat(item.temperaturas.replace(',', '.'))),
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });

  chartContainer.style.display = 'none';
  chartContainer.id = `chart-${className}`;
  chartContainer.className = 'class-chart';

  return chartContainer;
}









