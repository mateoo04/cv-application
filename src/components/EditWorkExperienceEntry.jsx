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

  return (
    <>
      <label htmlFor='company-name'>
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
      {
        <ul>
          {mainResponsibilities.map((responsibility) => {
            return (
              <li key={'modifiable-responsibility-' + responsibility.id}>
                <input
                  type='text'
                  value={responsibility.value}
                  onChange={(e) =>
                    updateResponsibilityList(responsibility.id, e.target.value)
                  }
                />
              </li>
            );
          })}
        </ul>
      }
      <button type='button' value='' onClick={addResponsibilityItem}>
        ADD
      </button>
      <label htmlFor='start-date'>
        <input
          type='date'
          id='start-date'
          min='1900-01-01'
          max='2100-12-31'
          value={startDate}
          onChange={(e) =>
            handleModifiedWorkExperienceChange(id, {
              startDate: e.target.value,
            })
          }
        />
      </label>
      <label htmlFor='end-date'>
        <input
          type='date'
          id='end-date'
          min='1900-01-01'
          max='2100-12-31'
          value={endDate}
          onChange={(e) =>
            handleModifiedWorkExperienceChange(id, { endDate: e.target.value })
          }
        />
      </label>
    </>
  );
}
