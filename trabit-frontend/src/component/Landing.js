import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [1, 2, 3] };
  }
  render() {
    return (<React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div style={{ 'padding-top': '30px' }}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Wellcome to Trabit!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              The next level habit tracker app which helps you define, track and measure your habits.
            </Typography>
          </Container>
        </div>
        <Container maxWidth="md">
          <img src="https://crossfitodyssey.com/wp-content/uploads/2017/08/rocks-balancing-on-driftwood-sea-in-background-153081592-591bbc3f5f9b58f4c0b7bb16-1080x675.jpg"/>

        </Container>
      </main>
    </React.Fragment>)
  }
}

export default Landing;