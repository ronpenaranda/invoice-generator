import React, { useState, useMemo, type ChangeEvent } from "react";
import Button from "../components/button";
import { generateInvoiceNumber } from "../utils/helper";
import Modal from "../components/modal";
import Invoice from "../components/preview";

interface Customer {
  name: string;
  phone: string;
  address: string;
  remarks: string;
}

const CreateInvoice: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { description: "", quantity: 1, unit: "pc", price: 0 },
  ]);
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    address: "",
    remarks: "",
  });

  const invoiceNumber = useMemo(() => generateInvoiceNumber(), []);

  const addItem = () => {
    setItems([
      ...items,
      { description: "", quantity: 1, unit: "pc", price: 0 },
    ]);
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    // @ts-ignore
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="bg-gray-50 p-6 flex flex-col">
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Invoice Preview"
      >
        <Invoice
          invoiceNumber={invoiceNumber}
          billTo={customer}
          from={{
            name: "Lucky P&A Hardware",
            phone: "+123-456-7890",
            address: "Brgy Bacong Ilaya General Luna, Quezon",
          }}
          items={items}
          note={customer.remarks}
        />
      </Modal>
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Invoice Generator</h1>
      </header>

      <div className="bg-white p-8 grid gap-4 border">
        <div className="col-span-12">
          <div className="flex gap-2 justify-end">
            <Button
              title="New Invoice"
              onClick={() => window.location.reload()}
            />
            <Button
              title="View Invoice"
              onClick={() => (customer.name !== "" ? setOpen(true) : "")}
            />
          </div>
        </div>
        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-600">
            Invoice Number
          </label>
          <input
            type="text"
            value={invoiceNumber}
            className="w-full mt-1 p-2 border rounded-sm text-xs"
            disabled
            placeholder="INV-001"
          />
        </div>

        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-600">
            Invoice Date
          </label>
          <input
            type="date"
            disabled
            className="w-full mt-1 p-2 border rounded-sm text-xs"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-600">
            Bill To
          </label>
          <input
            name="name"
            value={customer.name}
            onChange={handleChange}
            type="text"
            className="w-full mt-1 p-2 border rounded-sm text-xs"
            placeholder="Customer Name"
          />
          <input
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            type="text"
            className="w-full mt-1 p-2 border rounded-sm text-xs"
            placeholder="+639"
          />
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-sm text-xs"
            placeholder="Address"
          />
        </div>

        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-600">
            Notes
          </label>
          <textarea
            name="remarks"
            value={customer.remarks}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-sm text-xs"
            placeholder="Remarks"
          />
        </div>

        <div className="grid col-span-12">
          <table className="w-full text-sm border overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left font-medium text-gray-600">
                  Description
                </th>
                <th className="p-4 text-right font-medium text-gray-600">
                  Quantity
                </th>
                <th className="p-4 text-right font-medium text-gray-600">
                  Unit
                </th>
                <th className="p-4 text-right font-medium text-gray-600">
                  Price
                </th>
                <th className="p-4 text-right font-medium text-gray-600">
                  Total
                </th>
                <th className="p-4 text-center font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                      className="w-full p-1 border rounded-sm"
                      placeholder="Item description"
                    />
                  </td>
                  <td className="p-2 text-right">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", Number(e.target.value))
                      }
                      className="w-20 p-1 text-right border rounded-sm"
                      min="1"
                    />
                  </td>
                  <td className="p-2 text-right">
                    <select
                      value={item.unit}
                      onChange={(e) =>
                        updateItem(index, "unit", e.target.value)
                      }
                      className="w-24 p-1 border rounded-sm text-xs"
                    >
                      <option value="pc">pc</option>
                      <option value="kg">kg</option>
                      <option value="box">box</option>
                      <option value="set">set</option>
                      <option value="pack">pack</option>
                    </select>
                  </td>
                  <td className="p-2 text-right">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(index, "price", Number(e.target.value))
                      }
                      className="w-24 p-1 text-right border rounded-sm"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="p-2 text-right text-gray-700">
                    ₱{(item.quantity * item.price).toFixed(2)}
                  </td>
                  <td className="p-2 text-center">
                    <Button title="Remove" onClick={() => removeItem(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <Button title="+ Add Item" onClick={addItem} />
          </div>
          <div className="flex justify-end mt-2">
            <div className="flex gap-6 text-right font-semibold">
              Total:
              <span className="text-5xl text-gray-800">
                ₱{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
