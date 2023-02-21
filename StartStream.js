import React, {useState} from 'react';
import {Dimensions, View, Image, Text, TouchableOpacity} from 'react-native';

import {NodeCameraView} from 'react-native-nodemediaclient';

const {width, height} = Dimensions.get('window');

const BroadcastScreen = () => {
  const cameraViewRef = React.useRef();

  const streamKey = '9f1e403f-d20a-8405-7a69-2194406610ca';
  const url = `rtmps://global-live.mux.com:443/app/${streamKey}`;
  const [startLive, setStartLive] = useState(false);

  const startViewHandler = () => {
    cameraViewRef.current.start();
    setStartLive(true);
  };
  const stopViewHandler = () => {
    cameraViewRef.current.stop();
    setStartLive(false);
  };

  return (
    <View>
      <NodeCameraView
        style={{width, height}}
        ref={
          cameraViewRef
            ? cameraViewRef
            : startLive
            ? startViewHandler()
            : stopViewHandler()
        }
        outputUrl={url}
        camera={{cameraId: 0, cameraFrontMirror: true}}
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

      <TouchableOpacity
        onPress={() => {
          startLive ? stopViewHandler() : startViewHandler();
        }}>
        <Image
          source={require('./assets/videoButton.png')}
          style={{
            height: 90,
            width: 90,
            position: 'absolute',
            bottom: 40,
            right: 0,
            left: 170,
            tintColor: startLive ? 'red' : 'white',
          }}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => {}}>
        <Image
          source={require('./assets/videoButton.png')}
          style={{
            height: 90,
            width: 90,
            position: 'absolute',
            bottom: 40,
            right: 0,
            left: 170,
            tintColor: 'white',
          }}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default BroadcastScreen;
