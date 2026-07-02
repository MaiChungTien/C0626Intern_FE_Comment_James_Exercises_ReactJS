const itemList = [
  {
    id: 1,
    name: "Piano",
    price: 3000,
  },
  {
    id: 2,
    name: "Guitar",
    price: 1500,
  },
  {
    id: 3,
    name: "Drums",
    price: 2000,
  },
  {
    id: 4,
    name: "Violin",
    price: 2500,
  },
  {
    id: 5,
    name: "Flute",
    price: 800,
  },
  {
    id: 6,
    name: "Saxophone",
    price: 1200,
  },
];

export function getItems() {
  //CALL API
  return itemList;
}

export function getItemByName(item_name) {
  //CAll API
  if (!item_name || item_name.trim() === "") {
    return getItems();
  }

  const keyword = item_name.toLowerCase();
  return itemList.filter((item) => item.name.toLowerCase().includes(keyword));
}

export function addItem(item_name, item_price) {
  //CALL API
  const nextId =
    itemList.length > 0 ? Math.max(...itemList.map((item) => item.id)) + 1 : 1;
  const newItem = {
    id: nextId,
    name: item_name,
    price: item_price,
  };
  itemList.push(newItem);
}

export function removeItem(item_id) {
  //CALL API
  const index = itemList.findIndex((item) => item.id === item_id);
  if (index !== -1) {
    itemList.splice(index, 1);
  }
}
