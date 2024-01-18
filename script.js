

const imageContainer = document.getElementById('image-container');
const slider = document.getElementById('slider');
const numberOfImages = 36;
const imageFolderPath = 'images/'; 
const imagePrefix = 'ezgif-frame-0'; 

// Función para cargar y mostrar una imagen en el contenedor
function showImage(imageNumber) {
  const imageURL = `${imageFolderPath}${imagePrefix}${imageNumber}.jpg`;
  const imageElement = document.createElement('img');
  imageElement.src = imageURL;
  imageElement.alt = `Imagen ${imageNumber}`;

  

  // Limpia el contenedor antes de agregar una nueva imagen
  imageContainer.innerHTML = '';

 
  imageContainer.appendChild(imageElement);
}

function loadLastImageDimensions() {
    const lastImage = new Image();
    lastImage.src = `${imageFolderPath}${imagePrefix}${numberOfImages}.jpg`;
  
    lastImage.onload = function() {
      imageContainer.style.width = lastImage.width + 'px';
      imageContainer.style.height = lastImage.height + 'px';
    };
  }
  


showImage(1);

slider.addEventListener('input', () => {
  const percentage = slider.value;
  const currentImage = Math.floor((percentage / 100) * numberOfImages) + 1;
  showImage(currentImage);
});


