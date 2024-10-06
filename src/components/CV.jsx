export default function CV({ fullName, email, phoneNum, education }) {
  return (
    <>
      <h1>{fullName}</h1>
      <p>{email}</p>
      <p>{phoneNum}</p>
      <h2>Education</h2>
      <div className='education-list'>
        {education.map((entry) => {
          return (
            <div key={'education-list-item-' + entry.id}>
              <h3>{entry.schoolName}</h3>
              <p>{entry.titleOfStudy}</p>
              <p>{entry.startDate + ' - ' + entry.endDate}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
