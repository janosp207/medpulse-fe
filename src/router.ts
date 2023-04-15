const PATHS = {
  HOME: '/',
  PATIENT: {
    SHOW: '/patients/:id',
  }
};

const API_PATHS = {
  PATIENTS: {
    GET: '/api/patients',
    SHOW: '/api/patients/:id',
    LATEST_DATA: '/api/patients/:id/latestdata',
  }
}

export {
  PATHS,
  API_PATHS,
};
