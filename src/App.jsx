import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./style.css";

function App() {
  useEffect(() => {
    const map = L.map("map-id", { zoomControl: false }).setView(
      [51.505, -0.09],
      13
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }, []);

  return <div id="map-id"></div>;
}

export default App;
