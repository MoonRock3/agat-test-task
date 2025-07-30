import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Shape } from '../../app/shape';
import L from 'leaflet';
import { RootState } from '../../app/store';

export interface MapState {
  value: typeof L.Map | null;
  shapes: Array<Shape | null>;
}

const initialState: MapState = { value: null, shapes: [] };

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<MapState>) => {
      state.value = action.payload.value;
      state.shapes = action.payload.shapes;
    },
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
});

export const { initialize, add, remove } = mapSlice.actions;
export default mapSlice.reducer;

export const selectShapes = (state: RootState) => state.map.shapes;
