export const generateInvoiceNumber = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const timePart = now.getTime().toString().slice(-5);
  const random = Math.floor(Math.random() * 9000 + 1000);

  return `INV-${year}${month}${day}-${timePart}-${random}`;
};
