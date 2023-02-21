import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import muxReactNativeVideo from '@mux/mux-data-react-native-video';
import axios from 'axios';

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
  const [streamStarted, setStreamStarted] = useState(false);
  const [playbackID, setPlaybackID] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    streamStarted && getPlaybackResponse();
  }, [streamStarted]);

  const getPlaybackResponse = async () => {
    setLoader(true);
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };
    const url = `https://stream.mux.com/${playbackID}.m3u8`;
    await axios
      .get(url, config)
      .then(response => {
        console.log('Response: ', response.data);
        setLoader(false);
      })
      .catch(e => {
        console.log('Error: ', e.response.data.error.messages);
        if (e?.response?.data?.error?.messages) {
          setStreamStarted(false);
          alert(e.response.data.error.messages);
          setLoader(false);
        }
      });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ],
        {
          title: 'Mux App Camera And Microphone Permission',
          message: 'Mux App needs access to your camera',
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
    <View style={style.container}>
      {streamStarted ? (
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
      ) : loader ? (
        <View style={style.inputView}>
          <ActivityIndicator color={'teal'} size={'large'} />
        </View>
      ) : (
        <View style={style.inputView}>
          <Text style={style.labelText}>{'Enter Playback ID: '}</Text>
          <TextInput
            style={style.textInputView}
            placeholder={'PlayBack ID'}
            placeholderTextColor={'white'}
            onChangeText={text => {
              setPlaybackID(text);
            }}
          />
          <TouchableOpacity
            style={style.buttonView}
            onPress={() => {
              if (playbackID === '') {
                alert('Please add PlayBack ID first !');
              } else {
                setStreamStarted(true);
              }
            }}>
            <Text style={style.buttonText}>{'View Stream'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ViewStream;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  inputView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
    color: 'white',
  },
  textInputView: {
    height: 50,
    width: '80%',
    borderRadius: 15,
    borderWidth: 1,
    marginVertical: 20,
    paddingHorizontal: 15,
    borderColor: 'white',
  },
  buttonView: {
    marginVertical: 20,
    height: 50,
    width: '80%',
    backgroundColor: 'teal',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});
