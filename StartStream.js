import React from 'react';
import {Dimensions, View} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';

const {width, height} = Dimensions.get('window');

const BroadcastScreen = () => {
  const cameraViewRef = React.useRef();

  const streamKey = '9f1e403f-d20a-8405-7a69-2194406610ca';
  const url = `rtmps://global-live.mux.com:443/app/${streamKey}`;

  return (
    <View>
      <NodeCameraView
        style={{width, height}}
        ref={cameraViewRef.current.start()}
        outputUrl={url}
        camera={{cameraId: 0, cameraFrontMirror: false}}
        audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
        video={{
          preset: 4,
          bitrate: 2000000,
          profile: 2,
          fps: 30,
          videoFrontMirror: true,
        }}
        autopreview={true}
      />
    </View>
  );
};

export default BroadcastScreen;
