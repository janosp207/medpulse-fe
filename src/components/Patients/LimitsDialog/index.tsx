import LimitValues from '@/classes/LimitValues';
import Patient from '@/classes/Patient';
import { useLimitValues } from '@/hooks/patients';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';

type Props = {
  patient: Patient,
  onClose: () => void,
  open: boolean
}

const LimitsDialog = ({ patient, onClose, open }: Props): JSX.Element => {
  const { limitValues, store, isLoading } = useLimitValues(patient.user_id);

  const weightRef = useRef<HTMLInputElement>(null);
  const weightMinRef = useRef<HTMLInputElement>(null);
  const fatRatioRef = useRef<HTMLInputElement>(null);
  const bmiRef = useRef<HTMLInputElement>(null);
  const systolicMaxRef = useRef<HTMLInputElement>(null);
  const diastolicMaxRef = useRef<HTMLInputElement>(null);
  const systolicMinRef = useRef<HTMLInputElement>(null);
  const diastolicMinRef = useRef<HTMLInputElement>(null);
  const bloodOxygenMaxRef = useRef<HTMLInputElement>(null);
  const bloodOxygenMinRef = useRef<HTMLInputElement>(null);
  const sleepDurationRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!limitValues) {
    return <>Something went wrong</>;
  }
  
  const inputsList = [
    {
      name: 'weight',
      ref: weightRef
    },
    {
      name: 'weightMin',
      ref: weightMinRef
    },
    {
      name: 'fatRatio',
      ref: fatRatioRef
    },
    {
      name: 'bmi',
      ref: bmiRef
    },
    {
      name: 'systolicMax',
      ref: systolicMaxRef
    },
    {
      name: 'diastolicMax',
      ref: diastolicMaxRef
    },
    {
      name: 'systolicMin',
      ref: systolicMinRef
    },
    {
      name: 'diastolicMin',
      ref: diastolicMinRef
    },
    {
      name: 'bloodOxygenMax',
      ref: bloodOxygenMaxRef
    },
    {
      name: 'bloodOxygenMin',
      ref: bloodOxygenMinRef
    },
    {
      name: 'sleepDurationMin',
      ref: sleepDurationRef
    }
  ]

  const handleSubmit = async () => {
    const data = inputsList.reduce((acc, input) => {
      const value = input.ref.current?.value;
      if (value) {
        acc[input.name] = value;
      }
      return acc;
    }, {} as { [key: string]: string });
    const newLimitValues = new LimitValues({ ...limitValues, ...data });
    await store(newLimitValues);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xl'>
      <DialogTitle>Add threshold values for {patient.name}</DialogTitle>
      <DialogContent
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
          <Stack>
            <Typography variant='h5' mb={3}>Weight</Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Weight"
              defaultValue={limitValues.weight}
              name="weight"
              fullWidth
              variant="outlined"
              inputRef={weightRef}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Weight min"
              defaultValue={limitValues.weightMin}
              name="weightMin"
              fullWidth
              variant="outlined"
              inputRef={weightMinRef}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Fat ratio"
              defaultValue={limitValues.fatRatio}
              name="fatRatio"
              fullWidth
              variant="outlined"
              inputRef={fatRatioRef}
            />
            <TextField
              autoFocus
              margin="dense"
              label="BMI"
              defaultValue={limitValues.bmi}
              name="bmi"
              fullWidth
              variant="outlined"
              inputRef={bmiRef}
            />
          </Stack>

          <Stack>
            <Typography variant='h5' mb={3}>Measurements</Typography>
            <Typography>Hypertension</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
              <TextField
                autoFocus
                margin="dense"
                label="Systolic max"
                defaultValue={limitValues.systolicMax}
                name="systolicMax"
                fullWidth
                variant="outlined"
                inputRef={systolicMaxRef}
              /> 
              <Typography fontWeight='bold' variant='h4'> / </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Diastolic max"
                defaultValue={limitValues.diastolicMax}
                name="diastolicMax"
                fullWidth
                variant="outlined"
                inputRef={diastolicMaxRef}
              />
            </Box>
            <Typography>Hypotension</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
              <TextField
                autoFocus
                margin="dense"
                label="Systolic min"
                defaultValue={limitValues.systolicMin}
                name="systolicMin"
                fullWidth
                variant="outlined"
                inputRef={systolicMinRef}
              /> 
              <Typography fontWeight='bold' variant='h4'> / </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Diastolic min"
                defaultValue={limitValues.diastolicMin}
                name="diastolicMin"
                fullWidth
                variant="outlined"
                inputRef={diastolicMinRef}
              />
            </Box>
            <Typography>Hypoxemia</Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Blood oxygen min"
              defaultValue={limitValues.bloodOxygenMin}
              name="bloodOxygenMin"
              fullWidth
              variant="outlined"
              inputRef={bloodOxygenMinRef}
            />
          </Stack>

          <Stack>
            <Typography variant='h5' mb={3}>Sleep</Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Sleep duration"
              defaultValue={limitValues.sleepDurationMin}
              name="sleepDuration"
              fullWidth
              variant="outlined"
              inputRef={sleepDurationRef}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => handleSubmit()}>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LimitsDialog;