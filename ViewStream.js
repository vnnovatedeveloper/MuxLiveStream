import React, {useEffect} from 'react';
import {Dimensions, Text, View, PermissionsAndroid} from 'react-native';
import Video from 'react-native-video';
import muxReactNativeVideo from '@mux/mux-data-react-native-video';

const {width, height} = Dimensions.get('window');

const config = {
  cameraConfig: {
    cameraId: 1,
    cameraFrontMirror: false,
  },
  videoConfig: {
    preset: 4,
    bitrate: 2000000,
    profile: 2,
    fps: 30,
    videoFrontMirror: true,
  },
  audioConfig: {
    bitrate: 128000,
    profile: 1,
    samplerate: 44100,
  },
};

const ViewStream = () => {
  const Enviroment_Key = 'ogdfkgicd398hvl84p2thk9vv';
  const playback_URL =
    'https://stream.mux.com/nIhn9fGqzCy9GjCRlU3GySPfT2Vp0001t9Px8xQE8pu4g.m3u8';

  const MuxVideo = muxReactNativeVideo(Video);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ],
        {
          title: 'Mux App Camera And Microphone Permission',
          message:
            'Mux App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('Granted value: ', granted);
      if (granted) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text>{'Hey'}</Text>
      <MuxVideo
        style={{
          width: width,
          height: height,
        }}
        source={{
          uri: playback_URL,
        }}
        controls
        muted
        muxOptions={{
          application_name: 'MuxApp', // (required) the name of your application
          application_version: '1.0', // the version of your application (optional, but encouraged)
          data: {
            env_key: Enviroment_Key, // (required)
            player_software_version: '5.0.2', // (optional, but encouraged) the version of react-native-video that you are using
            player_name: 'React Native Player', // See metadata docs for available metadata fields https://docs.mux.com/docs/web-integration-guide#section-5-add-metadata
            video_id: 'my_video_123456789',
            video_title: 'My_Awesome_Video',
          },
        }}
      />
    </View>
  );
};

export default ViewStream;
