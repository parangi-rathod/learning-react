import React, { useEffect, useState } from 'react'

function List({getItems}) {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
      setItems(getItems(1));
    }, [getItems]);
  return (
    <div>
      items: {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  )
}

export default List