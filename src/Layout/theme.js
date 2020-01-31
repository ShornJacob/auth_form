//https://material-ui.com/customization/palette/
//https://material-ui.com/customization/color/
import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

//https://material-ui.com/customization/default-theme/
const theme = createMuiTheme({
  palette: {
    primary : {
      main : grey[500],
    },
    secondary : {
      main : blue[300],
    }
  },
});

export default theme