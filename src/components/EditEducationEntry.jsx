export default function EditEducationEntry({
  educationEntry,
  handleModifiedEducationChange,
}) {
  const { schoolName, titleOfStudy, startDate, endDate, id } = educationEntry;

  return (
    <>
      <label htmlFor='school-name'>
        School name
        <input
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
          type='text'
          id='study-title'
          value={titleOfStudy}
          onChange={(e) =>
            handleModifiedEducationChange(id, { titleOfStudy: e.target.value })
          }
        />
      </label>
      <label htmlFor='start-date'>
        Start date
        <input
          type='date'
          id='start-date'
          min='1900-01-01'
          max='2100-12-31'
          value={startDate}
          onChange={(e) =>
            handleModifiedEducationChange(id, { startDate: e.target.value })
          }
        />
      </label>
      <label htmlFor='end-date'>
        End date
        <input
          type='date'
          id='end-date'
          min='1900-01-01'
          max='2100-12-31'
          value={endDate}
          onChange={(e) =>
            handleModifiedEducationChange(id, { endDate: e.target.value })
          }
        />
      </label>
    </>
  );
}
