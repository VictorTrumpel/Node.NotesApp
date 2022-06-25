const createPaginator = (itemsPerPage) => {
  return (allItems, page) => {
    const items = allItems.slice((page - 1) * itemsPerPage);

    // console.log("items length: ", items.length);
    // console.log("items sliced: ", items.slice(0, itemsPerPage));
    // console.log("hasMore: ", items.length > itemsPerPage);

    return { items: items.slice(0, itemsPerPage), hasMore: items.length > itemsPerPage };
  };
};

module.exports = createPaginator;
