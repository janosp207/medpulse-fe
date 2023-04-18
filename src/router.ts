const PATHS = {
  HOME: '/',
  PATIENT: {
    SHOW: '/patients/:id',
    WEIGHT: '/patients/:id/weight',
  },
  SLEEP: {
    INDEX: '/patients/:id/sleep',
    SHOW: '/patients/:id/sleep/:sleepId',
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
    INDEX: '/api/patients/:id/sleep', 
    SHOW: '/api/patients/:id/sleep/:sleepId',
  }
}

export {
  PATHS,
  API_PATHS,
};
