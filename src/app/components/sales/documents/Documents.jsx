import React from 'react';
import { GridList, GridTile, IconButton, Subheader, } from 'material-ui';
import StarBorder from 'material-ui/svg-icons/file/cloud-download';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

export default class Documents extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      { this.props.files ?
        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
          >
            <Subheader>Files in root folder</Subheader>
            {this.props.files.map((file) => (
              <GridTile
                key={file.id}
                title={file.name}
                actionIcon={<IconButton
                  href={"/management/download/" + file.id}
                  ><StarBorder color="white" /></IconButton>}
              >
                <img src={"/management/thumbnail/" + file.id} alt="file" />
              </GridTile>
            ))}
          </GridList>
        </div>
        : <div>This is Documents page</div> }
        </div>
    );
  }
}
