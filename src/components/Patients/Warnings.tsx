import Warning from '@/classes/Warning'
import { Stack } from '@mui/material'
import WarningBox from './InfoBoxes/WarningBox'

type Props = {
  warnings: Warning[] | undefined
}

const Warnings = ({ warnings }: Props): JSX.Element => {
  if (!warnings) return <></>

  return (
    <Stack pl={3} pt={3}> 
      {warnings.map(warning => (
        <WarningBox key={warning.type} warning={warning}/>
      ))}
    </Stack>
  )
}

export default Warnings