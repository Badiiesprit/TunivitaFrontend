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
    url: '/admin/service',
    iconComponent: { name: 'cil-drop' },

    children: [
      {
        name: 'Liste Services',
        url: '/admin/service/lister',

      },
      {
        name: 'Formulaire',
        url: '/admin/service/form',

      },

    ],
  },
  {
    name: 'Offer',
    url: '/admin/offer',
    iconComponent: { name: 'cil-drop' },

    children: [
      {
        name: 'Liste offres',
        url: '/admin/offer/lister',

      },
      {
        name: 'Formulaire',
        url: '/admin/offer/form',

      },

    ],
  },
  {
    name: 'Post',
    url: '/admin/post',
    iconComponent: { name: 'cil-drop' },

    children: [
      {
        name: 'Liste Posts',
        url: '/admin/post/lister',

      },
      {
        name: 'Formulaire',
        url: '/admin/post/form',

      },

    ],
  },

  {
    name: 'Comment',
    url: '/admin/comment/lister',
    iconComponent: { name: 'cil-drop' },
  },



];

