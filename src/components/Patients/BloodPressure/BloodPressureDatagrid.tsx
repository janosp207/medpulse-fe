import { BloodPressureData } from '@/classes/LatestData';
import LimitValues from '@/classes/LimitValues';
import { formatDate } from '@/utils/helpers';
import { Box, Typography, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { classifyBloodPressure, prepareBloodPressureDataGrid } from './helpers';

type Props = {
  bloodPressureData: BloodPressureData[]
  limitValues? : LimitValues
}

const BloodPressureDatagrid = ({ bloodPressureData, limitValues }: Props): JSX.Element => {
  const rows = prepareBloodPressureDataGrid(bloodPressureData)

  return (
    <Box width='60%'>
      <Typography>Values</Typography>
      <DataGrid
        rows={rows}
        columns={[
          { field: 'systolic', headerName: 'Systolic', width: 130, valueFormatter: ({ value }) => value + ' mmHg' },
          { field: 'diastolic', headerName: 'Diastolic', width: 130, valueFormatter: ({ value }) => value + ' mmHg' },
          { field: 'pulsePressure', headerName: 'Pulse Pressure', width: 130, valueFormatter: ({ value }) => value + ' mmHg' },
          { field: 'date',
            headerName: 'Date', 
            width: 300,
            valueFormatter: ({ value }) => formatDate(value)
          },
        ]}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        getRowClassName={params => limitValues ? `super-app-theme--${classifyBloodPressure(params.row.systolic, params.row.diastolic, limitValues)}`: ''}
        pageSizeOptions={[10]}
        sx={{
          '& .super-app-theme--high': {
            backgroundColor: 'rgb(255, 30, 30, 0.2)',
          },
          '& .super-app-theme--low': {
            backgroundColor: 'rgb(30, 30, 255, 0.2)',
          },
        }}
      />
    </Box>
  )
}

export default BloodPressureDatagrid