export default [

  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404'
    }
  },  
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/NotFound.vue`
    )
  },
  {
    path: '/403',
    meta: {
      public: true,
    },
    name: 'AccessDenied',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Deny.vue`
    )
  },
  {
    path: '/500',
    meta: {
      public: true,
    },
    name: 'ServerError',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Error.vue`
    )
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Login.vue`
    )
  },
  {
    path: '/',
    meta: { },
    name: 'Root',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/dashboard',
    meta: { breadcrumb: true },
    name: 'Dashboard',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Dashboard.vue`
    )
  },

  /*
  {
    path: '/chat',
    meta: {
      public: true,
    },
    name: 'Chat',
    component: () => import(
      `@/components/chat/ChatLayout.vue`
    ),
    redirect: {
      path: '/chat/messaging'
    },
    children: [
      {
        path: '/chat/messaging/:uuid?',
        meta: {
          public: true,
        },
        name: 'ChatMessaging',
        props: true,
        components: {
          default: () => import(
            `@/components/chat/ChatMessaging.vue`
          ),  
        }   
      },
      {
        path: '/chat/contact/:uuid?',
        meta: {
          public: true,
        },
        name: 'ChatContact',
        components: {
          default: () => import(
            `@/components/chat/ChatContact.vue`
          ),  

        }     
      }             
    ]
  },    
  */
  // Rutas de la app
  {
    path: '/impuestos',
    meta: { breadcrumb: true },
    name: 'Taxes',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/taxes/Taxes.vue`
    )
  },
  // Almacen
  {
    path: '/categorizacion/categorias',
    meta: { breadcrumb: true },
    name: 'Categories',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/taxonomies/categories/Categories.vue`
    )
  },
  {
    path: '/categorizacion/subcategorias',
    meta: { breadcrumb: true },
    name: 'SubCategory',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/taxonomies/subcategories/Subcategories.vue`
    )
  },
  // Ordenes de envío
  {
    path: '/ordenes-de-envios/clientes',
    meta: { breadcrumb: true },
    name: 'Clients',
    component: () => import(
      `@/views/sales/clients/List.vue`
    )
  },
  {
    path: '/ordenes-de-envios/afiliados',
    meta: { breadcrumb: true },
    name: 'Afiliated',
    component: () => import(
      `@/views/sales/afiliated/Afiliated.vue`
    )
  },
  {
    path: '/ordenes-de-envios/listado',
    meta: { breadcrumb: true },
    name: 'ShippOrder',
    component: () => import(
      `@/views/sales/shipping_order/List.vue`
    )
  },
  {
    path: '/ordenes-de-envios/crear',
    meta: { breadcrumb: true },
    name: 'newShippOrder',
    component: () => import(
      `@/views/sales/shipping_order/Create.vue`
    )
  },
];
