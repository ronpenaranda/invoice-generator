import Button from "../components/button";

const Inventory = () => {
  const items = [
    {
      product: "",
      description: "",
      quantity: 1,
      unit: "pc",
      price: 0,
    },
  ];

  return (
    <div className="bg-gray-50 p-4 sm:p-6 flex flex-col">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
          Inventory
        </h1>
      </header>
      <div className="bg-white p-4 sm:p-8 grid gap-4 border rounded-md">
        <div className="w-full flex flex-col sm:flex-row sm:justify-end sm:gap-2 lg:gap-2">
          <Button
            title="Invoice"
            onClick={() => (window.location.href = "/")}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Search
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-sm text-xs"
              placeholder="type to search ..."
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-medium text-gray-600">
                  Product
                </th>
                <th className="p-3 text-left font-medium text-gray-600">
                  Description
                </th>
                <th className="p-3 text-right font-medium text-gray-600">
                  Quantity
                </th>
                <th className="p-3 text-right font-medium text-gray-600">
                  Unit
                </th>
                <th className="p-3 text-center font-medium text-gray-600">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 text-left">{item.product}</td>
                  <td className="p-3 text-left">{item.description}</td>
                  <td className="p-3 text-right">{item.quantity}</td>
                  <td className="p-3 text-right">{item.unit}</td>
                  <td className="p-3 text-center">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
