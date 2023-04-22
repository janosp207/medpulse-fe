import Warning from '@/classes/Warning';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Stack, Typography, styled } from '@mui/material';

type Props = {
  warning: Warning
}

type WarningColorProps = {
  [key: string]: string
}

const WarningColors: WarningColorProps = {
  'stable': '#4CAF50',
  'rising': '#FFC107',
  'rapidly rising': '#FF8A5B',
  'falling': '#FFC107',
  'rapidly falling': '#FF8A5B',
}

type WarningIconProps = {
  [key: string]: JSX.Element
}

const WarningIcons: WarningIconProps = {
  'stable': <TrendingFlatIcon sx={{ color: 'black', width: '100%', height: '100%' }} />,
  'rising': <TrendingUpIcon sx={{ color: '#FFC107', width: '100%', height: '100%' }} />,
  'rapidly rising': <TrendingUpIcon sx={{ color: '#FF8A5B', width: '100%', height: '100%' }} />,
  'falling': <TrendingDownIcon sx={{ color: '#FFC107', width: '100%', height: '100%' }} />,
  'rapidly falling': <TrendingDownIcon sx={{ color: '#FF8A5B', width: '100%', height: '100%' }} />,
}



const StyledBox = styled(Box) ({
  maxWidth: '15rem',
  height: '3rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0.4rem',
})


const WarningBox = ({ warning }: Props): JSX.Element => {
  const { warningTrendText, warningLimitText, type } = warning
  return ( 
    <StyledBox sx={{
      backgroundColor: WarningColors[warningTrendText],
      borderRadius: '0.5rem',
    }}>
      <Box sx={{
        backgroundColor: 'white',
        width: '2.8rem',
        height: '2.8rem',
        borderRadius: '0.5rem',
        mr: 2
      }}>
        {WarningIcons[warningTrendText]}
      </Box>
      <Stack>
        <Typography fontWeight='bold'>{type} - {warningLimitText}</Typography>
        <Typography>{warningTrendText}</Typography>
      </Stack>
    </StyledBox>
  )
}

export default WarningBox