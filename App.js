import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
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
  const FullScreenScrollableVideoComponent = React.memo(({item}) => {
    return (
      <View style={[style.mainView]}>
        <Video
          source={{uri: item.video}}
          style={style.backgroundVideo}
          resizeMode={'contain'}
          repeat={true}
        />
        <View style={style.userDetailsView}>
          <View style={style.imageWithFullNameView}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
              }}
              style={style.profileImage}
            />
            <Text numberOfLines={1} style={style.fullNameText}>
              {'Krishankant Sharma'}
            </Text>
          </View>
          <Text numberOfLines={1} style={style.dateText}>
            {'23 Feb 2023'}
          </Text>
          <Text numberOfLines={1} style={style.userNameText}>
            {'@krishankant_sharma_1234'}
          </Text>
        </View>
        <View style={style.sideIconsView}>
          <TouchableOpacity style={style.likeImageView}>
            <Image
              source={{
                uri: 'https://img.icons8.com/fluency-systems-regular/48/null/thumb-up.png',
              }}
              style={style.likeImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.likeImageView}>
            <Image
              source={{
                uri: 'https://img.icons8.com/external-inkubators-basic-outline-inkubators/32/null/external-comment-dashboard-ui-inkubators-basic-outline-inkubators.png',
              }}
              style={style.commentImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.likeImageView}>
            <Image
              source={{
                uri: 'https://img.icons8.com/ios-glyphs/30/null/share-rounded.png',
              }}
              style={style.shareImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  // To Pass custom component in flatlist
  const renderList = ({item}) => {
    return <FullScreenScrollableVideoComponent item={item} />;
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
  userDetailsView: {
    width: '70%',
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: 30,
    left: 10,
    justifyContent: 'center',
  },
  imageWithFullNameView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  profileImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  fullNameText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    paddingHorizontal: 15,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  sideIconsView: {
    height: 200,
    width: '15%',
    // backgroundColor: 'green',
    position: 'absolute',
    bottom: 100,
    right: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  likeImageView: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeImage: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    borderRadius: 50,
    tintColor: 'white',
  },
  commentImage: {
    height: 30,
    width: 30,
    resizeMode: 'cover',
    tintColor: 'white',
  },
  shareImage: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    borderRadius: 50,
    tintColor: 'white',
  },
});
