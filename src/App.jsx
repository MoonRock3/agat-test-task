import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import './style.css';
import { useAppDispatch } from './app/hooks';
import MapList from './features/Map/MapList';
import MarkerForm from './features/Map/MarkerForm';
import { initializeAsync } from './features/Map/mapSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAsync());
  }, []);

  return (
    <div>
      <div id="map-id"></div>
      <MapList />
      <MarkerForm />
    </div>
  );
}

export default App;
