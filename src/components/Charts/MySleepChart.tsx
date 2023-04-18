import { SleepData, SleepStates } from '@/classes/SleepLog'
import { Box, Typography, styled } from '@mui/material'

const ChartWrapper = styled(Box)({
  maxWidth: '100%',
  backgroundColor: '#D1DFE5',
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  borderRadius: 30
})

const LeftSide = styled(Box)({
  width: 120,
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  position: 'absolute',
  marginLeft: 0,
  backgroundColor: '#D1DFE5',
  borderRadius: '30px 0 0 30px',
  zIndex: 1,
})

const Row = styled(Typography)({
  borderRight: '1px solid black',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
})

const RightSide = styled(Box)({
  width: '100%',
  height: 400,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginLeft: 120,
  overflowY: 'auto',
})

const RowLines = styled(Box)({
  width: '100%',
  position: 'absolute',
  borderTop: '1px solid black',
})

type Props = {
  sleepData: SleepData[]
}

const MySleepChart = ({ sleepData }: Props): JSX.Element => {
  const heights = {
    [SleepStates.Awake]: 50,
    [SleepStates.LightSleep]: 150,
    [SleepStates.DeepSleep]: 250,
    [SleepStates.REM]: 350,
  }

  const colors = {
    [SleepStates.Awake]: 'red',
    [SleepStates.LightSleep]: 'blue',
    [SleepStates.DeepSleep]: 'green',
    [SleepStates.REM]: 'yellow',
  }

  const calculateWidth = (start: number, end: number): number => {
    const diff = end - start
    return diff * 0.1
  }

  return (
    <ChartWrapper>
      <LeftSide>
        <Row>REM-</Row>
        <Row>Light sleep-</Row>
        <Row>Deep sleep-</Row>
        <Row>Awake-</Row>
      </LeftSide>
      <RowLines sx={{ bottom: 50 }}/>
      <RowLines sx={{ bottom: 150 }}/>
      <RowLines sx={{ bottom: 250 }}/>
      <RowLines sx={{ bottom: 350 }}/>

      <RightSide>
        {sleepData.map((data, index) => (
          <Box
            key={'box' + index}
            minWidth={calculateWidth(sleepData[index].startdate, sleepData[index].enddate)} 
            height={heights[sleepData[index].state]}
            sx={{
              backgroundColor: colors[sleepData[index].state],
            }}
          />
        ))}
      </RightSide>
    </ChartWrapper>
  )
}

export default MySleepChart;