import Patient from '@/classes/Patient';
import { Box } from '@mui/material';
import PatientItem from './PatientItem';

type Props = {
  patients: Patient[];
}

const PatientsList = ({ patients }: Props): JSX.Element => {

  return (
    <Box maxWidth='100%'>
      {patients.map(patient => (
        <PatientItem key={patient.user_id} patient={patient} />
      ))}
    </Box>
  );
};

export default PatientsList;
