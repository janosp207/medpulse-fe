import { Box, Typography, styled } from '@mui/material'

const StyledBox = styled(Box)({
  backgroundColor: '#D1DFE5',
  width: 200,
  borderRadius: 20,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 5,
  paddingBottom: 5,
  textAlign: 'center',
})

type SmallInfoBoxProps = {
  title: string
  date: string
  value: string
}

const SmallInfoBox = ({ title, date, value }: SmallInfoBoxProps): JSX.Element => {
  return (
    <StyledBox>
      <Typography>{title}</Typography>
      <Typography fontWeight='bold'>{date}</Typography>
      <Typography variant='h5' fontWeight='bold'>{value}</Typography>
    </StyledBox>
  )
}

export default SmallInfoBox