export const getformattedDate = (date) =>
  new Date(date).toLocaleDateString('ko', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
