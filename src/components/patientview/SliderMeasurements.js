import React from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    height: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

const StyledSlider = withStyles({
    root: {
      color: "black",
      height: 50
    },
    thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% - 14px)",
        color: "blue",
    },
    trackInverted: {
        height: 20,
        borderRadius: 20,
        color: 'red',
        width: 20,

    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 20,
        borderRadius: 4,
        width: 20,
    },
    vertical: {
        '& $rail': {
          width: 8
        },
        '& $track': {
          width: 8
        },
        '& $thumb': {
          marginLeft: -8,
          marginBottom: -11
        }
      }
})(Slider);

export default function SliderMeasurments() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography id="vertical-slider" gutterBottom>
        Temperature
      </Typography>
      <div className={classes.root}>
        <StyledSlider 
          orientation="vertical"
          track="inverted"
          valueLabelDisplay="on"
          defaultValue={[50, 60]}
          aria-labelledby="vertical-slider"
          getAriaValueText={valuetext}
          marks={marks}
          aria-label="pretto slider"
        />
      </div>
    </React.Fragment>
  );
}
