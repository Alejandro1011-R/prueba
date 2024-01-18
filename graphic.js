let data;


fetch('coordinates.json').then(response => response.json()).then(dataa => {
  data = dataa;
});

data.then(createMap);

function createMap(geoJsonData) {
  const map = L.map('map', {
    maxZoom: 10, 
    minZoom: 2, 
  }).setView([0, 0], 2);

  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Colorea las regiones según la propiedad 'coralblchp'
  L.geoJSON(geoJsonData, {
    style: feature => {
      const coralblchp = feature.properties.coralblchp;
      return {
        fillColor: getColor(coralblchp),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    },
    onEachFeature: (feature, layer) => {
      layer.bindPopup(feature.properties.popup_text);
    }
  }).addTo(map);
}


function getColor(coralblchp) {
   return coralblchp === -9998.0 ? 'gray' :
         coralblchp < 0 ? 'black' :
         coralblchp < 5 ? 'red' :
         'green';
}

const data2 = getData2();

async function getData2() {
  const data = await $.getJSON('../location.json');
  return data;
}

const cubaCenter = [21.5218, -77.7812];


const map2 = L.map('map2', {
  center: cubaCenter, 
  zoom: 7, 
  maxBounds: L.latLngBounds([19.5, -85.0], [23.5, -74.0]), // Establece límites para Cuba
  maxZoom: 10, 
  minZoom: 5, 
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map2);

const getColorForBleaching = percent => {
  
  const r = Math.min(255, Math.max(0, 255));
  const g = Math.min(255, Math.max(0, Math.round(255 - (percent * 2.55))));
  const b = Math.min(255, Math.max(0, 0));
  return `rgb(${r}, ${g}, ${b})`;
};

data2.then(result => {
  if (result && result.locations) {
    result.locations.forEach(element => {
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
});
