export function dateFormat() {
  const selectedDateTime = new Date();
  const year = selectedDateTime.getFullYear();
  const month = String(selectedDateTime.getMonth() + 1);
  const date = String(selectedDateTime.getDate());
  const hours = String(selectedDateTime.getHours()).padStart(2, '0');
  const minutes = String(selectedDateTime.getMinutes()).padStart(2, '0');

  const formattedDateTime = `${year}년 ${month}월 ${date}일`;

  return formattedDateTime;
}
