import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(12),
    display: "flex",
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: theme.palette.success,
    },
    "& .MuiSvgIcon-root.MuiStepIcon-completed": {
      color: theme.palette.secondary.dark,
    },

  },
  container: {
    backgroundColor: theme.palette.primary.main,
  },
}));
