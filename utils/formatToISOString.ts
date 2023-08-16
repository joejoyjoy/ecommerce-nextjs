export default function formatToISOString(date: any) {
  const updatedAtDate = new Date(Date.parse(date));
  const updatedAtISOString = updatedAtDate.toISOString();
  return updatedAtISOString;
}
