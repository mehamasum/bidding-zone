const styles = theme => ({
  root: {
    position: 'absolute',
    width: theme.spacing(50),
    outline: 'none',
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  },
  container: {
    padding: theme.spacing(2)
  },
  formItem: {
    marginBottom: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
});

export default styles;
