const data = getData();

async function getData() {
  const data = await $.getJSON('https://github.com/AleTheCreation/Coral-Bleaching/blob/main/caracteristicas.json');
  return data;
}


data.then(result => {
    const pieContainer = document.getElementById('pie-container');
    const buttonContainer = document.getElementById('button2');
  
    const chartsContainer = document.createElement('div');
    chartsContainer.className = 'charts-container';
  
    // Crear gráficos y agregarlos al contenedor
    Object.keys(result).forEach(className => {
      const chart = createChart(className, result[className][0]);
      chartsContainer.appendChild(chart);
    });
  
    pieContainer.appendChild(chartsContainer);
  
    // Crear el botón y asignar evento de alternancia
    const button = document.createElement('button');
    button.textContent = 'Caracteristicas de los corales'; // Cambia según el gráfico inicial
    button.addEventListener('click', toggleChart);
    buttonContainer.appendChild(button);
    button.classList.add('btn');
    
  });
document.addEventListener('DOMContentLoaded', () => {
const button2 = document.getElementById('button2');
button2.classList.add('btn');


// Evento de clic para el botón
button2.addEventListener('click', toggleChart);
});

function createChart(className, classData) {
    const chartContainer = document.createElement('div');
    chartContainer.className = 'class-chart-container';
  
    const graphic = document.createElement('canvas');
    chartContainer.appendChild(graphic);
  
    const ctx = graphic.getContext("2d");
  
    const labels = Object.keys(classData);
    const data = Object.values(classData).map(value => parseFloat(value.replace(',', '.')));
  
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          backgroundColor: getRandomColors(labels.length),
          data: data,
        }]
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value, context) => '', // Evitar que aparezcan las descripciones de los colores
          }
        },
        tooltips: {
          enabled: false, // Desactivar las tooltips predeterminadas
          custom: (tooltipModel) => {
            const tooltipEl = document.getElementById('chartjs-tooltip');
  
            if (!tooltipEl) {
              const newTooltip = document.createElement('div');
              newTooltip.id = 'chartjs-tooltip';
              newTooltip.style.position = 'absolute';
              newTooltip.style.background = 'rgba(0, 0, 0, 0.7)';
              newTooltip.style.color = '#fff';
              newTooltip.style.borderRadius = '5px';
              newTooltip.style.padding = '5px';
              document.body.appendChild(newTooltip);
            }
  
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }
  
            const tooltipText = className; // Usar el nombre de la clase como texto
            tooltipEl.style.opacity = 1;
            tooltipEl.innerHTML = tooltipText;
            tooltipEl.style.width = 'auto'; 
            tooltipEl.style.left = `${tooltipModel.caretX}px`;
            tooltipEl.style.top = `${tooltipModel.caretY - 30}px`; 
            tooltipEl.style.transform = 'translateX(-50%)'; 
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
      }
    });
  
    chartContainer.id = `chart-${className}`;
    chartContainer.className = 'class-chart';
  
    return chartContainer;
  }

  

function getRandomColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 137.508) % 360;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
}


function createToggleButton(chartsContainer, result) {
    const button = document.createElement('button');
    button.textContent = 'Cambiar Gráficas';
    button.addEventListener('click', () => {
      // Ocultar todas las gráficas
      const allCharts = chartsContainer.querySelectorAll('.class-chart');
      allCharts.forEach(chart => chart.style.display = 'none');
  
      // Mostrar la siguiente gráfica
      const visibleChart = chartsContainer.querySelector('.class-chart:not([style*="none"])');
      if (visibleChart) {
        let nextChart = visibleChart.nextElementSibling;
        if (!nextChart) {
          // Si no hay siguiente, mostrar la primera
          nextChart = chartsContainer.querySelector('.class-chart');
        }
        nextChart.style.display = 'block';
      }
    });
  
    return button;
  }



  function toggleChart() {
    const chartsContainer = document.querySelector('.charts-container');
    const chart1 = chartsContainer.children[0];
    const chart2 = chartsContainer.children[1];
  
    // Alternar entre mostrar uno y ocultar el otro
    if (chart1.style.display === 'none') {
      chart1.style.display = 'flex';
      chart2.style.display = 'none';
      this.textContent = 'Mostrar Gráfico 1';
    } else {
      chart1.style.display = 'none';
      chart2.style.display = 'flex';
      this.textContent = 'Mostrar Gráfico 2';
    }

    if (this.textContent === 'Mostrar Gráfico 1') {
    this.textContent = 'Coral Sano';
  } else {
    this.textContent = 'Coral Blanqueado';
  }
  }