import { Box, styled, Typography } from '@mui/material'

type BigInfoBoxProps = {
  title: string
  date: string
  value: string
}

const StyledBox = styled(Box)({
  backgroundColor: '#D1DFE5',
  width: 200,
  borderRadius: 20,
  paddingTop: 20,
  textAlign: 'center',
})

const StyledLinkBox = styled(Box)({
  paddingTop: 10,
  paddingBottom: 10,
  marginTop: 10,
  backgroundColor: '#7B949F',
  width: '100%',
  borderRadius: '0 0 20px 20px',
  //lighten up on hover
  '&:hover': {
    backgroundColor: '#7B949F',
    opacity: 0.8,
    cursor: 'pointer'
  },
})

const BigInfoBox = ({ title, date, value }: BigInfoBoxProps): JSX.Element => {
  return (
    <StyledBox>
      <Typography>{title}</Typography>
      <Typography fontWeight='bold'>{date}</Typography>
      <Typography variant='h4' mt={1} mb={1} fontWeight='bold'>{value}</Typography>
      <StyledLinkBox>
        <Typography variant='body2' fontWeight='bold'>More info</Typography>
      </StyledLinkBox>
    </StyledBox>
  )
}

export default BigInfoBox
