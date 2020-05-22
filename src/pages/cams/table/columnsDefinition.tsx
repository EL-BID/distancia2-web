import { MUIDataTableColumn } from 'mui-datatables'

import { ActionHandler } from 'interfaces/Common'
import { 
  booleanColumn,
  formatDateTimeColumn,
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
    name: 'lastRecord.date',
    label: 'Última Conexión',
    options: {
      customBodyRender: formatDateTimeColumn
    }
  },
  {
    name: 'lastRecord.amount_people',
    label: 'Cantidad de personas'
  },
  {
    name: 'lastRecord.breaking_secure_distance',
    label: 'Rompiendo distaciamiento'
  },
  {
    name: 'lastRecord.average_distance',
    label: 'Distanciamiento promedio',
    options: {
      customBodyRender: (value: number) => value && `${value}m`
    }
  },
  {
    name: 'state',
    label: 'Estado'
  },
  {
    name: 'actions',
    label: 'Acciones',
    options: {
      customBodyRender: camsTableActionsColumn(onAction),
    }
  },
]
