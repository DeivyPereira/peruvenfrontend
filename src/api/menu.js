const Menu =  [
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
    roles: [ {n:1} ]
  },
  {
    title: 'Impuestos',
    group: 'apps',
    icon: 'fa fa-percent',
    name: 'Taxes',
    roles: [ {n:1} ]
  },
  {
    title: 'Seguros',
    group: 'apps',
    icon: 'fa fa-balance-scale',
    name: 'Ensurance',
    roles: [ {n:1} ]
  },
  {
    title: 'Precios por kilo',
    group: 'apps',
    icon: 'fa fa-tachometer',
    name: 'Kilo',
    roles: [ {n:1} ]
  },
  {
    title: 'Categorización',
    group: 'categorizacion',
    component: 'Taxonomies',
    icon: 'local_offer',
    roles: [ {n:1}, {n:2} ],
    items: [
      { name: 'Categories', title: 'Categorias', component: 'Categories', roles: [ {n:1}, {n:2} ] },
      { name: 'SubCategory', title: 'Subcategorías', component: 'SubCategory', roles: [ {n:1}, {n:2} ] }
    ]
  },  
  {
    title: 'Ordenes de envíos',
    group: 'ordenes-de-envios',
    component: 'shippingOrders',
    icon: 'local_shipping',
    roles: [ {n:1}, {n:2}, {n:3} ],
    items: [
      { name: 'Clients', title: 'Clientes', component: 'Clients', roles: [ {n:1}, {n:2}, {n:3} ] },
      { name: 'Afiliated', title: 'Afiliados', component: 'Afiliated', roles: [ {n:1}, {n:2}, {n:3} ] },
      { name: 'Packaging', title: 'Fecha de Salida', component: 'Packaging', roles: [ {n:1}, {n:2} ] },
      { name: 'newShippOrder', title: 'Ordenes de Envío', component: 'ShippOrder', roles: [ {n:1}, {n:2}, {n:3} ] },
      { name: 'PackageTracking', title: 'Rastreo de Consolidados', component: 'PackageTracking', roles: [ {n:1}, {n:2}, {n:3} ] },
      { name: 'OrderTracking', title: 'Rastreo Ordenes de envío', component: 'OrderTracking', roles: [ {n:1}, {n:2}, {n:3} ] },
    ]
  },
  {
    title: 'Usuarios',
    group: 'Users',
    icon: 'fa fa-users',
    name: 'Users',
    roles: [ {n:1} ]
  },
  { divider: true },
];

export default Menu;
