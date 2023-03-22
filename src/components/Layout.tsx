import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Api from '../api/api';
import User from '../classes/user';
import { checkRedirect, getAccessRedirect } from '../helpers';

type Props = {
  user: User,
}

const Layout = ({user}: Props): JSX.Element => {

  useEffect(() => {
    checkRedirect();
  }, [])

  return (
    <>
      {user && <Typography variant="h1">Hello {user.userid}</Typography>}
      <Button onClick={() => Api.getNonce()}>getNonce</Button>
      <Button><a href={getAccessRedirect()} target="_blank" rel="noreferrer">get access token</a></Button>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    user: state.users.user,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUser: (user: User) => dispatch(user),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);