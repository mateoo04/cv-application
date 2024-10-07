import { format, parse } from 'date-fns';
import TextAreaAutosize from 'react-textarea-autosize';

export default function EditWorkExperienceEntry({
  workExperienceEntry,
  handleModifiedWorkExperienceChange,
}) {
  const {
    companyName,
    position,
    mainResponsibilities,
    startDate,
    endDate,
    id,
  } = workExperienceEntry;

  function updateResponsibilityList(responsibilityId, modifiedValue) {
    const list = mainResponsibilities.map((responsibility) => {
      if (responsibilityId === responsibility.id) {
        return { ...responsibility, value: modifiedValue };
      }
      return responsibility;
    });

    handleModifiedWorkExperienceChange(id, { mainResponsibilities: list });
  }

  function addResponsibilityItem() {
    handleModifiedWorkExperienceChange(id, {
      mainResponsibilities: [
        ...mainResponsibilities,
        {
          value: '',
          id: mainResponsibilities[mainResponsibilities.length - 1].id + 1,
        },
      ],
    });
  }

  console.log(`start date: ${startDate}, end date: ${endDate}`);

  return (
    <div className='edit-work-experience-entry'>
      <div className='date-pickers'>
        <label htmlFor='start-date'>
          Start date
          <input
            type='date'
            id='start-date'
            min='1900-01-01'
            max='2100-12-31'
            value={
              startDate === 'now' || startDate === ''
                ? ''
                : format(startDate, 'yyyy-MM-dd')
            }
            onChange={(e) => {
              console.log(e.target.value);
              handleModifiedWorkExperienceChange(id, {
                startDate: parse(e.target.value, 'yyyy-MM-dd', new Date()),
              });
            }}
          />
        </label>
        <label htmlFor='end-date'>
          End date
          <input
            type='date'
            id='end-date'
            min='1900-01-01'
            max='2100-12-31'
            value={
              endDate === 'now' || endDate === ''
                ? ''
                : format(endDate, 'yyyy-MM-dd')
            }
            onChange={(e) => {
              console.log(e.target.value);
              handleModifiedWorkExperienceChange(id, {
                endDate: parse(e.target.value, 'yyyy-MM-dd', new Date()),
              });
            }}
          />
        </label>
      </div>
      <label htmlFor='company-name'>
        Company name
        <input
          type='text'
          id='company-name'
          value={companyName}
          onChange={(e) =>
            handleModifiedWorkExperienceChange(id, {
              companyName: e.target.value,
            })
          }
        />
      </label>
      <label htmlFor='position'>
        Position
        <input
          type='text'
          id='position'
          value={position}
          onChange={(e) =>
            handleModifiedWorkExperienceChange(id, {
              position: e.target.value,
            })
          }
        />
      </label>
      <p>Responsibilities</p>
      <div className='edit-list-container'>
        <ul>
          {mainResponsibilities.map((responsibility) => {
            return (
              <li key={'modifiable-responsibility-' + responsibility.id}>
                <TextAreaAutosize
                  className='responsibility-textarea'
                  value={responsibility.value}
                  onChange={(e) =>
                    updateResponsibilityList(responsibility.id, e.target.value)
                  }
                />
              </li>
            );
          })}
        </ul>

        <button
          type='button'
          className='add-responsibility'
          value=''
          onClick={addResponsibilityItem}
        >
          +
        </button>
      </div>
    </div>
  );
}
