import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import Video from 'react-native-video';
import SplashScreen from 'react-native-splash-screen';
import {initialWindowMetrics} from 'react-native-safe-area-context';

const App = () => {
  // Create Array of list which contain url's of video
  const [getVideoList] = useState([
    {
      id: '1',
      video: `https://stream.mux.com/MbvSFTul33LZ02hVpbRI8IiGCuSafVusnGr015YrTMISo.m3u8`,
    },
    {
      id: '2',
      video: `https://stream.mux.com/01SQ37SNv48NoQCKggj01LCIRnlkbf2zkd6bxuOLSZpdQ.m3u8`,
    },
    {
      id: '3',
      video: `https://stream.mux.com/00Kcm02QywCUYIsSpIKLf02b17GIq9n1BZ01SxUMzw9wuY8.m3u8`,
    },
    {
      id: '4',
      video: `https://stream.mux.com/aBEmBhxdcTHPY4QdJR7yUAnZVpCMoZlr2Jw01JGwiIl8.m3u8`,
    },
    {
      id: '5',
      video: `https://stream.mux.com/Uk9C4Y01FAnPYPPXyF8go4aAG1AJOqXQaYIMNdkoANRs.m3u8`,
    },
    {
      id: '6',
      video: `https://stream.mux.com/CVTDCCdbvidiVTv3iwRHh02IaY7ulNjCM4l1wr6qWki00.m3u8`,
    },
    {
      id: '7',
      video: `https://stream.mux.com/N5VdnZsQm00WSRe02RcoVXCa3xllTtRUZBYG1OK12pg01g.m3u8`,
    },
    {
      id: '8',
      video: `https://stream.mux.com/Tv9UaKaF8Rj02rlewrMvnJt0142qLezKyhXH7wvjQqjNA.m3u8`,
    },
    {
      id: '9',
      video: `https://stream.mux.com/QZSG1S02eJEMogyvNBteYe549XLrln9mPOweLPUzT501k.m3u8`,
    },
    {
      id: '10',
      video: `https://stream.mux.com/biagOkM501MEGmx3sdxExFiVNVc8d8xYojijnwQGhJmA.m3u8`,
    },
    {
      id: '11',
      video: `https://stream.mux.com/o6n01rZHe9c02znHAeMFsi4DEN00ccme01ItK5cbroOUz4c.m3u8`,
    },
    {
      id: '12',
      video: `https://stream.mux.com/SZ9Qj00RaWjkoBTEjYBaKQV9zQ02fgOFcZ5fNuKAhlUh00.m3u8`,
    },
  ]);

  // Used for hide the splash screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // Custom component to render video with memo function
  const MyComponent = React.memo(({item}) => {
    return (
      <View style={[style.mainView]}>
        <Video
          source={{uri: item.video}}
          style={style.backgroundVideo}
          resizeMode={'contain'}
          repeat={true}
        />
      </View>
    );
  });

  // To Pass custom component in flatlist
  const renderList = ({item}) => {
    return <MyComponent item={item} />;
  };

  // To extract keys from list of url's
  const keyExtractor = item => item.id;

  // Main component to render screen
  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={getVideoList}
        keyExtractor={keyExtractor}
        style={style.container}
        renderItem={renderList}
        pagingEnabled={true}
        windowSize={5}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

export default App;

// Create Stylesheet for add Internal styles to our component
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: initialWindowMetrics.frame.height, // Used to get dynamic height of device
    width: '100%',
    backgroundColor: '#282828',
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject, // Used to get full screen view
  },
});
