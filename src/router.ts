const PATHS = {
  HOME: '/',
  PATIENT: {
    SHOW: '/patients/:id',
    WEIGHT: '/patients/:id/weight',
  },
  SLEEP: {
    SHOW: '/patients/:id/sleep',
  }
};

const API_PATHS = {
  PATIENTS: {
    GET: '/api/patients',
    SHOW: '/api/patients/:id',
    LATEST_DATA: '/api/patients/:id/latestdata',
    MEASUREMENTS: '/api/patients/:id/measurements/:type',
    LIMIT_VALUES: '/api/patients/:id/limitvalues',
  },
  SLEEP: {
    SHOW: '/api/patients/:id/sleep',
  }
}

export {
  PATHS,
  API_PATHS,
};
