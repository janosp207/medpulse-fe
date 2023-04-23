import { BloodOxygenData } from '@/classes/LatestData';
import LimitValues from '@/classes/LimitValues';
import { Box, Typography, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { classifyBloodOxygen, prepareBloodOxygenDatagrid } from './helpers';

type Props = {
  bloodOxygenData: BloodOxygenData[]
  limitValues? : LimitValues
}

const BloodOxygenDatagrid = ({ bloodOxygenData, limitValues }: Props): JSX.Element => {
  const rows = prepareBloodOxygenDatagrid(bloodOxygenData)

  return (
    <Box width='60%'>
      <Typography>Values</Typography>
      <DataGrid
        rows={rows}
        columns={[
          { field: 'bloodOxygen', headerName: 'Blood oxygen', width: 130, valueFormatter: ({ value }) => value + ' %' },
          { field: 'date',
            headerName: 'Date', 
            width: 300,
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
        getRowClassName={params => limitValues ? `super-app-theme--${classifyBloodOxygen(params.row.bloodOxygen, limitValues.bloodOxygenMin)}`: ''}
        pageSizeOptions={[10]}
        sx={{
          '& .super-app-theme--low': {
            backgroundColor: 'rgb(255, 30, 30, 0.2)',
          },
        }}
      />
    </Box>
  )
}

export default BloodOxygenDatagrid