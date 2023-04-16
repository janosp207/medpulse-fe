const PATHS = {
  HOME: '/',
  PATIENT: {
    SHOW: '/patients/:id',
    WEIGHT: '/patients/:id/weight',
  }
};

const API_PATHS = {
  PATIENTS: {
    GET: '/api/patients',
    SHOW: '/api/patients/:id',
    LATEST_DATA: '/api/patients/:id/latestdata',
    MEASUREMENTS: '/api/patients/:id/measurements/:type',
    LIMIT_VALUES: '/api/patients/:id/limitvalues',
  }
}

export {
  PATHS,
  API_PATHS,
};
