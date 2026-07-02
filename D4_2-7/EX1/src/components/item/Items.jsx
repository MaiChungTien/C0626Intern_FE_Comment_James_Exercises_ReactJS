import { useState, useEffect } from "react";
import {
  addItem,
  getItemByName,
  getItems,
  removeItem,
} from "../../service/itemService";
import DeleteModal from "../modal/DeleteModal";
import "./items.css";

const Items = () => {
  const [Items, setItems] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      return items;
    };
    fetchItems().then((items) => setItems(items));
  }, [reload]);

  const handleSearch = async (event) => {
    const keyword = event.target.value;
    try {
      const results = await getItemByName(keyword);
      setItems(results);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };

  const handleOpenDeleteModal = (item) => {
    setDeleteItem(item);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (deleteItem) {
      await removeItem(deleteItem.id);
      setReload(!reload);
      setShowModal(false);
      setDeleteItem(null);
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    if (!newItemName.trim() || !newItemPrice) {
      return;
    }
    try {
      await addItem(newItemName, newItemPrice);
      setReload(!reload);
      setNewItemName("");
      setNewItemPrice("");
    } catch (error) {
      console.error("Lỗi khi thêm mới:", error);
    }
  };

  return (
    <div className="layout-container">
      <div className="search-section">
        <input onChange={handleSearch} type="text" placeholder="Search..." />
      </div>
      <div className="main-content">
        <h1>Instrument List</h1>
        <table className="instrument-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Items &&
              Items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleOpenDeleteModal(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="add-item-section">
        <h1>Add New Item</h1>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <br />
          <input
            type="number"
            placeholder="Price"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
          />
          <br />
          <button type="submit">Add</button>
        </form>
      </div>
      {showModal && (
        <DeleteModal
          name={deleteItem.name}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Items;
