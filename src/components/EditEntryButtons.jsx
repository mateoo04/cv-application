import upIcon from '../assets/chevron-up.svg';
import downIcon from '../assets/chevron-down.svg';
import trashIcon from '../assets/trash.svg';

export default function EditEntryButtons({ moveUp, moveDown, removeEntry }) {
  return (
    <div className='entry-buttons'>
      <button type='button' onClick={moveUp}>
        <img src={upIcon} alt='' />
      </button>
      <button type='button' onClick={moveDown}>
        <img src={downIcon} alt='' />
      </button>
      <button type='button' onClick={removeEntry}>
        <img src={trashIcon} alt='' />
      </button>
    </div>
  );
}
