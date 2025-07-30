import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Shape } from '../../app/shape';
import L from 'leaflet';
import { RootState } from '../../app/store';

export interface MapState {
  value: typeof L.Map | null;
  shapes: Array<Shape | null>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MapState = { value: null, shapes: [], status: 'idle' };

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<object>) => {
      if (!state.value) {
        return;
      }
      const shapeInfo = action.payload;
      const shape: Shape = {
        id: Date.now(),
        name: shapeInfo.name,
        mapLayer: L.marker(shapeInfo.coordinates).addTo(state.value),
      };

      state.shapes.push(shape);
    },
    /**
     * Удаление фигуры с карты по id
     * @param state текущее состояние
     * @param action объект действия. Хранит id.
     */
    remove: (state, action: PayloadAction<number>) => {
      const shapeToRemove = state.shapes.find(
        (shape) => shape?.id === action.payload
      );
      shapeToRemove?.mapLayer.removeFrom(state.value);
      state.shapes = state.shapes.filter(
        (shape) => shape?.id !== shapeToRemove?.id
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initializeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initializeAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload.map;
        state.shapes = action.payload.shapeList;
      })
      .addCase(initializeAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { add, remove } = mapSlice.actions;
export default mapSlice.reducer;

export const selectShapes = (state: RootState) => state.map.shapes;

export const initializeAsync = createAsyncThunk('map/fetchShapes', async () => {
  const map = L.map('map-id', { zoomControl: false }).setView([50, 40], 3);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const shapes = await fetch('/shapes.json')
    .then((response) => response.json())
    .catch((reason) => {
      console.error(reason);
      alert('Не удалось загрузить метки!');
    });
  const shapeList: Shape[] = [];
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
          return;
      }
      shapeList.push({
        id,
        name,
        mapLayer,
      });
    }
  );
  return { map, shapeList };
});
