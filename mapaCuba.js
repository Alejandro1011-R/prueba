let data2;

const cubaCenter = [21.5218, -77.7812];

// Añade un fondo de mapa (puedes elegir otro proveedor)
const map2 = L.map('map2', {
  center: cubaCenter, // Centra el mapa en Cuba
  zoom: 7, // Establece el nivel de zoom inicial
  maxBounds: L.latLngBounds([19.5, -85.0], [23.5, -74.0]), // Establece límites para Cuba
  maxZoom: 10, // Establece el zoom máximo permitido
  minZoom: 5, // Establece el zoom mínimo permitido
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map2);

const getColorForBleaching = percent => {
  // Asegurar que los valores de r, g, y b estén dentro del rango permitido (0-255)
  const r = Math.min(255, Math.max(0, 255));
  const g = Math.min(255, Math.max(0, Math.round(255 - (percent * 2.55))));
  const b = Math.min(255, Math.max(0, 0));
  return `rgb(${r}, ${g}, ${b})`;
};


fetch('./location.json')
  .then(response => response.json())
  .then(dat => {
    data2 = dat;

    // Mueve el código que utiliza 'result' aquí
    if (data2 && data2.locations) {
      data2.locations.forEach(element => {
        const { latitud, longitud, percent_bleaching, name } = element;
        const color = getColorForBleaching(parseFloat(percent_bleaching.replace(',', '.')));

        L.circle([parseFloat(latitud.replace(',', '.')), parseFloat(longitud.replace(',', '.'))], {
          radius: 100,
          fillColor: color,
          color: color,
          weight: 7,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map2).bindPopup('Zona: ' + name + ', Por ciento de blanqueamiento: ' + percent_bleaching + '%');
      });
    } else {
      console.error('El objeto locations es undefined o no está definido.');
    }
  })
  .catch(error => console.error('Error al cargar el JSON:', error));



