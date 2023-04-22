import Warning from '@/classes/Warning'
import { Box, Typography } from '@mui/material'
import WarningBox from './InfoBoxes/WarningBox'

type Props = {
  warnings: Warning[] | undefined
}

const Warnings = ({ warnings }: Props): JSX.Element => {
  if (!warnings) return <></>

  return (
    <Box pl={3} pt={3}>
      <Typography variant='h6' mb={2}>Based on data from last 30 days</Typography>
      <Box display='flex' flexDirection='row' gap={3}> 
        {warnings.map(warning => (
          <WarningBox key={warning.type} warning={warning}/>
        ))}
      </Box>
    </Box>
  )
}

export default Warnings