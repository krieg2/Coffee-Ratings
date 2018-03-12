import React, { Component } from 'react';
import ReactFilestack, { client } from 'filestack-react';
const filestack = client.init(process.env.REACT_APP_FILESTACK_KEY);

class Filestack extends Component {

  onSuccess = (result) => {

    if(result.filesUploaded.length > 0){
      let url = result.filesUploaded[0].url;
      let transformedUrl = filestack.transform(url, {resize: {width: 200}});
      this.props.callback(transformedUrl);
    }
  };

  onError = (error) => {
    console.error("error", error);
  };

  render(){

    const options = {
      fromSources: ['local_file_system','webcam','url',
                   'facebook','instagram','dropbox'],
      maxFiles: 1,
      minFiles: 1
    };

    return(
      <div style={{margin: "10px 0 10px 0"}}>
		    <ReactFilestack
		      apikey={process.env.REACT_APP_FILESTACK_KEY}
		      buttonText="Add photo"
          options={options}
		      buttonClass="btn btn-default"
		      onSuccess={this.onSuccess}
          onError={this.onError}
		    />
      </div>);
    }
}

export default Filestack;