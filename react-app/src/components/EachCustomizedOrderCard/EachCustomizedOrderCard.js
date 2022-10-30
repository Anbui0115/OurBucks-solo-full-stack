const EachCustomizedOrderCard = ({ el }) => {
  return (
    <div>
      <div>
        <img src={el.image_url} width="100" height="100"></img>
      </div>
      <div>customizedItems{el.customized_item_id}</div>
      <div>Quantity{el.quantity}</div>
    </div>
  );
};

export default EachCustomizedOrderCard;
