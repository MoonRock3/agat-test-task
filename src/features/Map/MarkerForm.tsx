import { useAppDispatch } from '../../app/hooks';
import { add } from './mapSlice';
import styles from './MarkerForm.module.css';

import { useRef } from 'react';

export default function MarkerForm() {
  const nameElement = useRef(null);
  const altitudeElement = useRef(null);
  const longitudeElement = useRef(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameElement.current?.value;
    const altitude = altitudeElement.current?.value;
    const longitude = longitudeElement.current?.value;
    if (name && altitude && longitude) {
      dispatch(add({ name, coordinates: [altitude, longitude] }));
      nameElement.current.value = '';
    } else {
      alert('Заполните все поля ввода!');
    }
  };

  return (
    <div className={styles.markerForm}>
      <form className={styles.markerForm__form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>Имя</legend>
          <input
            ref={nameElement}
            type="text"
            name="name"
            placeholder="Новая Метка"
            maxLength={20}
            required
          />
        </fieldset>
        <fieldset>
          <legend>Широта</legend>
          <input
            ref={altitudeElement}
            type="number"
            name="altitude"
            placeholder='0'
            min={-90}
            max={90}
            step="any"
            required
          />
        </fieldset>
        <fieldset>
          <legend>Долгота</legend>
          <input
            ref={longitudeElement}
            type="number"
            name="longitude"
            placeholder='0'
            min={-180}
            max={180}
            step="any"
            required
          />
        </fieldset>
        <div>
          <button type="submit">СОХРАНИТЬ</button>
        </div>
      </form>
    </div>
  );
}
