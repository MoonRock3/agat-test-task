import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { selectShapes } from './mapSlice';

import styles from './MapList.module.css';
import { MapListElement } from './MapListElement';

export default function MapList() {
  const dispatch = useAppDispatch();
  const shapes = useSelector(selectShapes);

  return (
    <div className={styles.mapList}>
      {shapes.map((shape) => (
        <MapListElement key={shape?.id} id={shape?.id} name={shape?.name} />
      ))}
    </div>
  );
}
