import React from 'react';
import {
  RaisedButton, GridList, GridTile, IconButton, Subheader,
} from 'material-ui';
import { IP } from '../../../../config/config.js';
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

    this.state = {
      files: undefined,
    }
  }

  componentDidMount() {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let items = JSON.parse(httpRequest.responseText).files;
        let files = items.filter(function(item) {
          return item.type !== "folder";
        });
        // console.log(items);
        _this.setState({
          files: files,
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/management/files", true);
    httpRequest.send(null);
  }

  render() {
    return (
      <div>
      { this.state.files ?
        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
          >
            <Subheader>Files in root folder</Subheader>
            {this.state.files.map((file) => (
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
