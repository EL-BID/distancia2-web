import { MUIDataTableColumn } from 'mui-datatables'

import { ActionHandler } from 'interfaces/Common'
import { 
  booleanColumn,
  camsTableActionsColumn
} from 'components/TableColumn'

export const getColumnsDef = (onAction: ActionHandler): MUIDataTableColumn[] => [
  {
    name: 'id',
    label: 'ID',
    options: {
      display: 'excluded',
      filter: false,
    }
  },
  {
    name: 'name',
    label: 'Nombre',
  },
  {
    name: 'enabled',
    label: 'Habilitado',
      options: {
        customBodyRender: booleanColumn,
      }
  },
  {
    name: 'last_connection',
    label: 'Última Conexión',
  },
  {
    name: 'state',
    label: 'Estado',
  },
  {
    name: 'actions',
    label: 'Acciones',
    options: {
      customBodyRender: camsTableActionsColumn(onAction),
    }
  },
]
