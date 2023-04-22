import Warning from '@/classes/Warning'
import { Box } from '@mui/material'
import WarningBox from './InfoBoxes/WarningBox'

type Props = {
  warnings: Warning[] | undefined
}

const Warnings = ({ warnings }: Props): JSX.Element => {
  if (!warnings) return <></>

  return (
    <Box display='flex' flexDirection='row' gap={3} pl={3} pt={3}> 
      {warnings.map(warning => (
        <WarningBox key={warning.type} warning={warning}/>
      ))}
    </Box>
  )
}

export default Warnings