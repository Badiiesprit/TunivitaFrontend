import { INavData } from '@coreui/angular';
export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },

  {
    name: 'User',
    url: '/admin/user',
    children: [
      {
        name: 'Liste',
        url: '/admin/user'
      },
      {
        name: 'Ajouter',
        url: '/admin/user/add'
      },

    ],
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Center',
    url: '/admin/center',
    children: [
      {
        name: 'Liste',
        url: '/admin/center'
      },
      {
        name: 'Ajouter',
        url: '/admin/center/add'
      }
    ] ,
    iconComponent: { name: 'cil-cursor' }
  },
  {
    name: 'Category',
    url: '/admin/category',
    children: [
      {
        name: 'Liste',
        url: '/admin/category'
      },
      {
        name: 'Ajouter',
        url: '/admin/category/add'
      }
    ],
    iconComponent: { name: 'cil-calculator' }
  },
  {
    name: 'Service',
    url: '/service',
    iconComponent: { name: 'cil-drop' },

    children: [
      {
        name: 'Liste Services',
        url: '/service/lister',

      },
      {
        name: 'Formulaire',
        url: '/service/form',

      },

    ],
  },
  {
    name: 'Post',
    url: '/post',
    iconComponent: { name: 'cil-drop' },

    children: [
      {
        name: 'Liste Posts',
        url: '/post/lister',

      },
      {
        name: 'Formulaire',
        url: '/post/form',

      },

    ],
  },

  {
    name: 'Comment',
    url: '/comment/lister',
    iconComponent: { name: 'cil-drop' },
  },



];

