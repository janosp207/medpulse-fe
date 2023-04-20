import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
  limit: number | string;
  unit?: string;
  backgroundColor?: string;
};

const LimitBox = ({ title, limit, unit, backgroundColor }: Props): JSX.Element => {
  return (
    <Box sx={{ 
      width: 130, 
      height: 130, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center', 
      backgroundColor: backgroundColor ? backgroundColor : '#D1DFE5', 
      borderRadius: 2 
    }}
    >
      <Box>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='h5' fontWeight='bold'>{limit}{unit}</Typography>
      </Box>
    </Box>
  );
};

export default LimitBox