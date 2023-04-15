import { Typography } from '@mui/material'


const PatientsProfile = ({ id } : {id: string}): JSX.Element => {
  return (
    <Typography>{id}</Typography>
  )
}

type ServerSideProps = {
  params: {
    id: string
  }
}

type SSPReturn = {
  props: {
    id: string
  }
}

//get the id from the url
export async function getServerSideProps({ params }: ServerSideProps): Promise<SSPReturn> {
  const { id } = params
  return {
    props: {
      id
    }
  }
}

export default PatientsProfile