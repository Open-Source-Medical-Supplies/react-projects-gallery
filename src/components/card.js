import { GridListTile } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});

export default function ProjectCard({data}) {
  const classes = useStyles();
  const name = data['Full Project Name'];
  const displayName = data['Display Name'] ? data['Display Name'][0] : '';  // b/c it's a lookup field in AT?
  const reviewStatus = data['Review Status'] ? data['Review Status'][0] : '';
  const imageURL = data.HeaderImageURL !== '#ERROR!' ? data.HeaderImageURL : '';

  if (typeof data.HeaderImageURL !== 'string') {
    console.warn('no image url: ' + data['Base ID'])
  }
  return (
    <GridListTile key={data['Base ID']} cols={2} rows={2}>
      <Card className={classes.root}>
        <CardActionArea>
          {
            imageURL.length ?
            <CardMedia
              component="img"
              alt={name}
              height="140"
              image={imageURL}
              title={name}
            /> : null
          }
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {displayName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            View
          </Button>
        </CardActions>
      </Card>
    </GridListTile>
  );
}
