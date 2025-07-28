import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';

function App() {
  useEffect(() => {
    const map = L.map('map-id', { zoomControl: false }).setView([50, 40], 3);

    fetch('/shapes.json')
      .then((response) => response.json())
      .then((shapes) =>
        shapes.forEach(
          ({
            properties: { id, name },
            geometry: { coordinates, type: shapeType },
          }) => {
            let shape = null;
            switch (shapeType) {
              case 'Polygon':
                shape = L.polygon(coordinates[0]).addTo(map);
                break;
              case 'Point':
                shape = L.marker(coordinates).addTo(map);
                break;
              default:
                console.error(`Неизвестный тип фигуры: ${shapeType}`);
                break;
            }
          }
        )
      );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }, []);

  return <div id="map-id"></div>;
}

export default App;
