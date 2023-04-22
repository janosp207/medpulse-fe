const PATHS = {
  HOME: '/',
  PATIENT: {
    SHOW: '/patients/:id',
    WEIGHT: '/patients/:id/weight',
    BLOOD_PRESSURE: '/patients/:id/bloodpressure',
    BLOOD_OXYGEN: '/patients/:id/bloodoxygen',
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
    BLOOD_PRESSURE: '/api/patients/:id/bloodpressure',
    BLOOD_OXYGEN: '/api/patients/:id/bloodoxygen',
    WARNINGS: '/api/patients/:id/warnings',
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
