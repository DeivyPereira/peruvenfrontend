const Menu =  [
  { header: 'Apps' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
  },
  {
    title: 'Impuestos',
    group: 'apps',
    icon: 'fa fa-percent',
    name: 'Taxes',
  },
  {
    title: 'Categorización',
    group: 'categorizacion',
    component: 'Taxonomies',
    icon: 'local_offer',
    items: [
      { name: 'Categories', title: 'Categorias', component: 'Categories' },
      { name: 'SubCategory', title: 'Subcategorías', component: 'SubCategory' },
      //{ name: 'Brands', title: 'Marcas', component: 'Brands' },
      //{ name: 'measureUnits', title: 'Unidades de medida', component: 'measureUnits' },
      //{ name: 'Products', title: 'Productos', component: 'Products' },
    ]
  },  
  {
    title: 'Ordenes de envíos',
    group: 'ordenes-de-envios',
    component: 'shippingOrders',
    icon: 'local_shipping',
    items: [
      { name: 'Clients', title: 'Clientes', component: 'Clients' },
      { name: 'Afiliated', title: 'Afiliados', component: 'Afiliated' },
      { name: 'newShippOrder', title: 'Ordenes de Envío', component: 'ShippOrder' }
    ]
  },
  { divider: true },
];

export default Menu;
