const PATHS = {
  HOME: '/',
  PATIENT: {
    SHOW: '/patients/:id',
    WEIGHT: '/patients/:id/weight',
    BLOOD_PRESSURE: '/patients/:id/bloodpressure',
    BLOOD_OXYGEN: '/patients/:id/bloodoxygen',
    ACTIVITY: '/patients/:id/activity',
    WELLNESS: '/patients/:id/wellness',
  },
  SLEEP: {
    INDEX: '/patients/:id/sleep',
    SHOW: '/patients/:id/sleep/:sleepId',
  },
  DOCTOR: {
    LOGIN: '/login',
  }
};

const API_PATHS = {
  PATIENTS: {
    GET: '/api/patients/:doctorId',
    SHOW: '/api/patients/show/:id',
    LATEST_DATA: '/api/patients/:id/latestdata',
    MEASUREMENTS: '/api/patients/:id/measurements/:type',
    LIMIT_VALUES: '/api/patients/:id/limitvalues',
    BLOOD_PRESSURE: '/api/patients/:id/bloodpressure',
    BLOOD_OXYGEN: '/api/patients/:id/bloodoxygen',
    WARNINGS: '/api/patients/:id/warnings',
    ACTIVITY: '/api/patients/:id/activity',
    WELLNESS: '/api/patients/:id/wellness',
  },
  SLEEP: {
    INDEX: '/api/patients/:id/sleep', 
    SHOW: '/api/patients/:id/sleep/:sleepId',
  },
  DOCTORS: {
    LOGIN: '/api/doctors/login',
  }
}

export {
  PATHS,
  API_PATHS,
};
