export default function CV({ fullName, email, phoneNum }) {
  return (
    <>
      <h1>{fullName}</h1>
      <p>{email}</p>
      <p>{phoneNum}</p>
    </>
  );
}
