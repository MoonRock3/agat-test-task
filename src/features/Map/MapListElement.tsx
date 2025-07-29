import { useAppDispatch } from '../../app/hooks';
import styles from './MapListElement.module.css';
import { remove } from './mapSlice';

export function MapListElement({ id, name }) {
  const dispatch = useAppDispatch();
  const shapeId = id;

  const removeElement = () =>{
    dispatch(remove(shapeId));
  }
  return (
    <div className={styles.mapListElement}>
      <div className={styles.mapListElement__name}>{name}</div>
      <div className={styles.mapListElement__button}>
        <button type="button" onClick={removeElement}>Удалить</button>
      </div>
    </div>
  );
}
