import React from 'react';
import _ from 'lodash';
import {
  ViroARScene,
	ViroARSceneNavigator,
	ViroPolyline
} from 'react-viro';
let arrayFromMapScreen = null;
class ArScreen extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
			text : "Initializing AR..."
		}
		this._onInitialized = this._onInitialized.bind(this);
	}
	objectoToArray(object){
    let aux = [];
    for(let i = 0;i<object.length;i++){
      aux[i] = [object[i].x,object[i].y,object[i].z];
    }
    return aux;
  }

	arScene(){
		return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroPolyline position={[0,0,-2]} points={arrayFromMapScreen} thickness={0.2} />
			</ViroARScene>
		)
	}

	render() {
		const { navigation } = this.props;
		
		arrayFromMapScreen = this.objectoToArray(navigation.getParam('toArScreen',null));
		return(
		<ViroARSceneNavigator 
			apiKey="F86457F8-8FCD-4410-B410-5AD9E1BE5DA1"
      initialScene={{scene: this.arScene}}/>
		
    );
  }

  _onInitialized(state) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      //Tracking OK
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

  
  export default ArScreen;
