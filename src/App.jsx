import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';
import { useAppDispatch } from './app/hooks';
import { initialize } from './features/Map/mapSlice';
import { MapList } from './features/Map/MapList';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const map = L.map('map-id', { zoomControl: false }).setView([50, 40], 3);
    const shapeList = [];

    fetch('/shapes.json')
      .then((response) => response.json())
      .then((shapes) => {
        shapes.forEach(
          ({
            properties: { id, name },
            geometry: { coordinates, type: shapeType },
          }) => {
            let mapLayer = null;
            switch (shapeType) {
              case 'Polygon':
                mapLayer = L.polygon(coordinates[0]).addTo(map);
                break;
              case 'Point':
                mapLayer = L.marker(coordinates).addTo(map);
                break;
              default:
                console.error(`Неизвестный тип фигуры: ${shapeType}`);
                break;
            }
            shapeList.push({
              id,
              name,
              mapLayer,
            });
          }
        );
        dispatch(initialize({ value: map, shapes: shapeList }));
      })
      .catch((reason) => console.error(reason));

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }, []);

  return (
    <div id="map-id">
      <MapList />
      
    </div>
  );
}

export default App;
