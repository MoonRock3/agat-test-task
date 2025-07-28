import L from 'leaflet';

export interface Shape {
  id: number;
  name: string;
  mapLayer: typeof L.Layer;
}
