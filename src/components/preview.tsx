import React from "react";

interface PartyInfo {
  name: string;
  phone: string;
  address: string;
}

interface Item {
  description: string;
  quantity: number;
  unit: string;
  price: number;
}

interface InvoiceProps {
  invoiceNumber: string;
  billTo: PartyInfo;
  from: PartyInfo;
  date?: string;
  items: Item[];
  taxRate?: number;
  note?: string;
}

const Invoice: React.FC<InvoiceProps> = ({
  invoiceNumber,
  billTo,
  from,
  date = new Date().toISOString().slice(0, 19).replace("T", " "),
  items,
  taxRate = 12,
  note = "",
}) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = (total * taxRate) / 100;
  const subtotal = total - tax;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-md overflow-hidden border text-sm p-6">
      <div className="bg-gray-500 text-white p-7 flex justify-between items-center">
        <h1 className="text-2xl font-bold">INVOICE</h1>
        <p className="text-sm font-semibold">NO: {invoiceNumber}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-6">
        <div>
          <h2 className="font-semibold text-gray-700 mb-1">Bill To:</h2>
          <p>{billTo.name}</p>
          <p>{billTo.phone}</p>
          <p>{billTo.address}</p>
        </div>
        <div className="text-right">
          <h2 className="font-semibold text-gray-700 mb-1">From:</h2>
          <p>{from.name}</p>
          <p>{from.phone}</p>
          <p>{from.address}</p>
        </div>
      </div>

      <div className="px-6 pb-2">
        <p className="text-gray-600">
          <span className="font-semibold">Date: </span>
          {date}
        </p>
      </div>

      <div className="p-6">
        <table className="w-full text-left border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-3 py-2">Description</th>
              <th className="border border-gray-200 px-3 py-2 text-center">
                Qty
              </th>
              <th className="border border-gray-200 px-3 py-2 text-center">
                Unit
              </th>
              <th className="border border-gray-200 px-3 py-2 text-right">
                Price
              </th>
              <th className="border border-gray-200 px-3 py-2 text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="border border-gray-200 px-3 py-2 text-gray-600">
                  {item.description}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-center">
                  {item.quantity}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-center">
                  {item.unit}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-right">
                  ₱{item.price.toFixed(2)}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-right">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="text-right font-semibold px-3 py-2">
                Sub Total
              </td>
              <td className="text-right px-3 py-2 font-semibold">
                ₱{subtotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-right font-semibold px-3 py-2">
                Tax ({taxRate}%)
              </td>
              <td className="text-right px-3 py-2 font-semibold">
                ₱{tax.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-right font-semibold px-3 py-2">
                Total
              </td>
              <td className="text-right px-3 py-2 font-semibold">
                ₱{total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="px-6">
        <p className="font-semibold text-gray-700 mb-1">Note:</p>
        <div className="border border-gray-300 rounded-md p-2 text-gray-600 min-h-16">
          {note || "—"}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
