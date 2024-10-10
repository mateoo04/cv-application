import { format, isValid } from 'date-fns';
import '../styles/CV.css';
import envelopeIcon from '../assets/envelope.svg';
import phoneIcon from '../assets/phone.svg';

function formatDate(date) {
  if (!(date instanceof Date) || !isValid(date)) return '';
  return format(date, 'd MMMM y');
}

function getDateInterval(startDate, endDate) {
  if (startDate !== '' || endDate !== '')
    return (
      <p>
        {formatDate(startDate) +
          ' - ' +
          (endDate === 'ongoing' ? 'Present' : formatDate(endDate))}
      </p>
    );

  return null;
}

export default function CV({
  fullName,
  email,
  phoneNum,
  education,
  workExperience,
}) {
  return (
    <div className='cv-element'>
      <h1>{fullName}</h1>
      <div className='email-container'>
        <img src={envelopeIcon} className='icon' alt='' />
        <p>{email}</p>
      </div>
      <div className='phone-number-container'>
        <img src={phoneIcon} className='icon' alt='' />
        <p>{phoneNum}</p>
      </div>
      <h2>Education</h2>
      <div className='education-list'>
        {education.map((entry) => {
          return (
            <div className='item' key={'education-list-item-' + entry.id}>
              {getDateInterval(entry.startDate, entry.endDate)}
              <p>
                <span style={{ fontWeight: 'bold' }}>{entry.schoolName}</span>,
                {' ' + entry.titleOfStudy}
              </p>
            </div>
          );
        })}
      </div>
      <h2>Work Experience</h2>
      <div className='work-experience-list'>
        {workExperience.map((entry) => {
          return (
            <div className='item' key={'work-experience-list-item-' + entry.id}>
              {getDateInterval(entry.startDate, entry.endDate)}
              <p>
                <span style={{ fontWeight: 'bold' }}>{entry.position}</span>,
                {' ' + entry.companyName}
              </p>
              {entry.mainResponsibilities.length !== 0 &&
                entry.mainResponsibilities[0].value !== '' && (
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
    </div>
  );
}
