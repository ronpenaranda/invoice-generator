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
    <div className="bg-gray-50 p-4 sm:p-6 flex flex-col">
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Invoice Preview"
      >
        <Invoice
          invoiceNumber={invoiceNumber}
          billTo={customer}
          from={{
            name: "Hardware",
            phone: "+123-456-7890",
            address: "Metro Manila",
          }}
          items={items}
          note={customer.remarks ?? ""}
        />
      </Modal>
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
          Generate Invoice
        </h1>
      </header>
      <div className="bg-white p-4 sm:p-8 grid gap-4 border rounded-md">
        <div className="w-full flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-2 lg:gap-2">
          <Button
            title="Inventory"
            onClick={() => (window.location.href = "/inventory")}
          />
          <Button
            title="New Invoice"
            onClick={() => window.location.reload()}
          />
          <Button
            title="View Invoice"
            onClick={() => (customer.name !== "" ? setOpen(true) : "")}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
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

          <div>
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
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

          <div>
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
        </div>
        <div className="overflow-y-auto max-h-72 overflow-x-auto ">
          <table className="w-full min-w-[600px] text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-medium text-gray-600">
                  Description
                </th>
                <th className="p-3 text-right font-medium text-gray-600">
                  Quantity
                </th>
                <th className="p-3 text-right font-medium text-gray-600">
                  Unit
                </th>
                <th className="p-3 text-right font-medium text-gray-600">
                  Price
                </th>
                <th className="p-3 text-right font-medium text-gray-600">
                  Total
                </th>
                <th className="p-3 text-center font-medium text-gray-600">
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
                      className="w-full p-1 border rounded-sm text-xs"
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
                      className="w-16 sm:w-20 p-1 text-right border rounded-sm text-xs"
                      min="1"
                    />
                  </td>
                  <td className="p-2 text-right">
                    <select
                      value={item.unit}
                      onChange={(e) =>
                        updateItem(index, "unit", e.target.value)
                      }
                      className="w-20 sm:w-24 p-1 border rounded-sm text-xs"
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
                      className="w-20 sm:w-24 p-1 text-right border rounded-sm text-xs"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="p-2 text-right text-gray-700 text-xs sm:text-sm">
                    ₱{(item.quantity * item.price).toFixed(2)}
                  </td>
                  <td className="p-2 text-center">
                    <Button title="Remove" onClick={() => removeItem(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-4 gap-4">
          <Button title="+ Add Item" onClick={addItem} />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-semibold">
            <span className="text-gray-700">Total:</span>
            <span className="text-3xl sm:text-5xl text-gray-800">
              ₱{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
