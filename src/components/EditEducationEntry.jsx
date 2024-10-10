import { format, isValid, parse } from 'date-fns';
import EditEntryButtons from './EditEntryButtons';

export default function EditEducationEntry({
  educationEntry,
  handleModifiedEducationChange,
  moveUp,
  moveDown,
  removeEntry,
}) {
  const { schoolName, titleOfStudy, startDate, endDate, id } = educationEntry;

  return (
    <div className='edit-education-entry'>
      <EditEntryButtons
        moveUp={moveUp}
        moveDown={moveDown}
        removeEntry={removeEntry}
      />
      <div className='date-pickers'>
        <label htmlFor='start-date'>
          Start date
          <input
            type='date'
            id='start-date'
            min='1900-01-01'
            max='2100-12-31'
            value={
              startDate === 'now' || startDate === '' || !isValid(startDate)
                ? ''
                : format(startDate, 'yyyy-MM-dd')
            }
            onChange={(e) =>
              handleModifiedEducationChange(id, {
                startDate: parse(e.target.value, 'yyyy-MM-dd', new Date()),
              })
            }
          />
        </label>
        <div className='end-date-container'>
          <label htmlFor='end-date'>
            End date
            <input
              type='date'
              id='end-date'
              min='1900-01-01'
              max='2100-12-31'
              value={
                endDate === 'now' || endDate === '' || !isValid(endDate)
                  ? ''
                  : format(endDate, 'yyyy-MM-dd')
              }
              onChange={(e) =>
                handleModifiedEducationChange(id, {
                  endDate: parse(e.target.value, 'yyyy-MM-dd', new Date()),
                })
              }
            />
          </label>
          <label htmlFor='ongoing-checkbox' className='ongoing-checkbox-label'>
            <input
              type='checkbox'
              checked={endDate === 'ongoing'}
              onChange={(e) =>
                handleModifiedEducationChange(id, {
                  endDate: e.target.checked ? 'ongoing' : '',
                })
              }
            />
            Ongoing
          </label>
        </div>
      </div>
      <label htmlFor='school-name'>
        School name
        <input
          required
          type='text'
          id='school-name'
          value={schoolName}
          onChange={(e) =>
            handleModifiedEducationChange(id, { schoolName: e.target.value })
          }
        />
      </label>
      <label htmlFor='study-title'>
        Title of Study
        <input
          required
          type='text'
          id='study-title'
          value={titleOfStudy}
          onChange={(e) =>
            handleModifiedEducationChange(id, { titleOfStudy: e.target.value })
          }
        />
      </label>
    </div>
  );
}
