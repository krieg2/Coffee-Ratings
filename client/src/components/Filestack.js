import React, { Component } from 'react';
import ReactFilestack, { client } from 'filestack-react';
const filestack = client.init('A7egOJAeHQfyA0UeMv5xHz');

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
      fromSources:['local_file_system','url','imagesearch',
                   'facebook','instagram','dropbox','webcam'],
      maxFiles:1,
      minFiles:1
    };

    return(
      <div style={{margin: "10px 0 10px 0"}}>
		    <ReactFilestack
		      apikey={"A7egOJAeHQfyA0UeMv5xHz"}
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