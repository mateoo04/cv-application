import { format } from 'date-fns';

function formatDate(dateString) {
  if (!dateString || dateString.length < 10) return '';

  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month, day);

  return format(date, 'do MMMM y');
}

export default function CV({
  fullName,
  email,
  phoneNum,
  education,
  workExperience,
}) {
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
              <p>
                {formatDate(entry.startDate) +
                  ' - ' +
                  formatDate(entry.endDate)}
              </p>
            </div>
          );
        })}
      </div>
      <h2>Work Experience</h2>
      <div className='work-experience-list'>
        {workExperience.map((entry) => {
          return (
            <div key={'work-experience-list-item-' + entry.id}>
              <h3>{entry.position}</h3>
              <p>{entry.companyName}</p>
              <p>
                {formatDate(entry.startDate) +
                  ' - ' +
                  formatDate(entry.endDate)}
              </p>
              {entry.mainResponsibilities.length !== 0 && (
                <>
                  <p>Responsibilities</p>
                  <ul>
                    {entry.mainResponsibilities.map((responsibility) => {
                      return (
                        <li
                          key={
                            'responsibilities-list-item-' + responsibility.id
                          }
                        >
                          {responsibility.value}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
