import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        }
    },
    customButton: {
        margin: theme.spacing(1),
        borderRadius: 15,
        width: 200,
        textTransform: "none",
        fontSize: ".8rem",
        color: "white",
        backgroundColor: theme.palette.secondary.light,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      },
}))

export default function Button(props) {

    const { children, color, variant, onClick, className, ...other } = props;
    const classes = useStyles();

    return (
        <MuiButton
            className={classes.customButton + ' ' + (className || '')}
            variant={variant || "contained"}
            color={color || "default"}
            onClick={onClick}
            {...other}>
            {children}
        </MuiButton>
    )
}
