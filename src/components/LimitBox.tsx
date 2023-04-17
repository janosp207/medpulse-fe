import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
  limit: number;
  unit?: string;
};

const LimitBox = ({ title, limit, unit }: Props): JSX.Element => {
  return (
    <Box sx={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: '#D1DFE5', borderRadius: 2 }}>
      <Box>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='h5' fontWeight='bold'>{limit}{unit}</Typography>
      </Box>
    </Box>
  );
};

export default LimitBox