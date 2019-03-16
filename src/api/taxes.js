const Items =  [
    {
        'uuid': '65a6eb21-67b5-45c3-9af7-faca2d9b60d4',
        'tax_name': 'IGV',
        'description': 'Impuesto básico',
        'value': 18
    },
  ];
  
  const getTax = (uuid) => {
    return (uuid === undefined) ? Items[0] : Items.find(x => x.uuid === uuid);
  };
  
  const getTaxById = (limit) => {
    return (limit) ? Items.slice(0, limit) : Items;
  };
  
  export {
    Items,
    getTax,
    getTaxById
  };