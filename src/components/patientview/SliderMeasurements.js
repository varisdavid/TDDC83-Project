import React from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {Button} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: 300,
  },
});

const StyledSlider = withStyles({
    root: {
      color: "grey",
      height: 50
    },
    thumb: {
    height: 20,
    width: 20,
    left: 15,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
    },
    active: {},
    valueLabel: {
      left: "calc(-70% - 14px)",
        top: 5,
        '& *': {
          background: 'transparent',
          color: '#000',
        },
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

function MyThumbComponent(props) {
  if (props["data-index"] === 0) {
    props.style.backgroundColor = "red";
  } else if (props["data-index"] === 1) {
    props.style.backgroundColor = "yellow";
  } else if (props["data-index"] === 2) {
    props.style.backgroundColor = "green";
  } else if (props["data-index"] === 3) {
    props.style.backgroundColor = "green";
  } else if (props["data-index"] === 4) {
    props.style.backgroundColor = "yellow";
  } else if (props["data-index"] === 5) {
    props.style.backgroundColor = "red";
  }
  return <span {...props} />;
}



const SliderMeasurments= ({marks, referenceValues, setReferenceValues}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(referenceValues);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <React.Fragment>
      <Typography id="vertical-slider" gutterBottom>
        Intervall
      </Typography>
      <div className={classes.root}>
        <StyledSlider 
          orientation="vertical"
          track={false}
          valueLabelDisplay="on"
          value={value}
          aria-labelledby="vertical-slider"
          marks={marks}
          aria-label="pretto slider"
          ThumbComponent={MyThumbComponent}
          max={referenceValues[5]+15}
          onChange={handleChange}
        />
      </div>
      <Button onClick={() => setReferenceValues(value)} 
            style={{
            textTransform: 'none',
            font: 'inherit', 
            background: 'none',
            border: 'none',
            padding: 0,
            color: '#069',
            }}>Spara</Button>
    </React.Fragment>
    
  );
}
export default SliderMeasurments;
