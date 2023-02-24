import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import SplashScreen from 'react-native-splash-screen';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const App = () => {
  // Create Array of list which contain url's of video
  const [getVideoList] = useState([
    {
      id: '1',
      video: `https://stream.mux.com/Aw3GhX02w22k75SNWJ202pmek85FAzcn6XyIkrtM00bmpY.m3u8`,
      poster: 'Aw3GhX02w22k75SNWJ202pmek85FAzcn6XyIkrtM00bmpY',
    },
    {
      id: '2',
      video: `https://stream.mux.com/YM8Z6fB5CkFvbdYdnVdF5CCK3Dgl2cRT01IldS7TNxLI.m3u8`,
      poster: 'YM8Z6fB5CkFvbdYdnVdF5CCK3Dgl2cRT01IldS7TNxLI',
    },
    {
      id: '3',
      video: `https://stream.mux.com/kcyvx71tK8TM6AP2dmqy4ctD9m5013xPN5FP1BNMVLZQ.m3u8`,
      poster: 'kcyvx71tK8TM6AP2dmqy4ctD9m5013xPN5FP1BNMVLZQ',
    },
    {
      id: '4',
      video: `https://stream.mux.com/jbjKzbIhx154LxNiN1NxMla6YVi02Wg4d73SmRfrGNWk.m3u8`,
      poster: 'jbjKzbIhx154LxNiN1NxMla6YVi02Wg4d73SmRfrGNWk',
    },
    {
      id: '5',
      video: `https://stream.mux.com/IWa16i502MVoNNQg0201cIXUm01ivvuZFpKQz1P17VA0163U.m3u8`,
      poster: 'IWa16i502MVoNNQg0201cIXUm01ivvuZFpKQz1P17VA0163U',
    },
    {
      id: '6',
      video: `https://stream.mux.com/Aw3GhX02w22k75SNWJ202pmek85FAzcn6XyIkrtM00bmpY.m3u8`,
      poster: 'Aw3GhX02w22k75SNWJ202pmek85FAzcn6XyIkrtM00bmpY',
    },
    {
      id: '7',
      video: `https://stream.mux.com/YM8Z6fB5CkFvbdYdnVdF5CCK3Dgl2cRT01IldS7TNxLI.m3u8`,
      poster: 'YM8Z6fB5CkFvbdYdnVdF5CCK3Dgl2cRT01IldS7TNxLI',
    },
    {
      id: '8',
      video: `https://stream.mux.com/Aw3GhX02w22k75SNWJ202pmek85FAzcn6XyIkrtM00bmpY.m3u8`,
      poster: 'Aw3GhX02w22k75SNWJ202pmek85FAzcn6XyIkrtM00bmpY',
    },
    {
      id: '9',
      video: `https://stream.mux.com/YM8Z6fB5CkFvbdYdnVdF5CCK3Dgl2cRT01IldS7TNxLI.m3u8`,
      poster: 'YM8Z6fB5CkFvbdYdnVdF5CCK3Dgl2cRT01IldS7TNxLI',
    },
  ]);
  const [viewPlaceholder, setViewPlaceholder] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);

  // Used for hide the splash screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {}, [viewPlaceholder]);

  // Custom component to render video with memo function
  const FullScreenScrollableVideoComponent = React.memo(({item}) => {
    return (
      <View style={[style.mainView]}>
        <Video
          source={{uri: item.video}}
          style={style.backgroundVideo}
          pictureInPicture={true}
          resizeMode={isFullScreen ? 'cover' : 'contain'}
          repeat={true}
          poster={`https://image.mux.com/${item?.poster}/thumbnail.png?fit_mode=smartcrop&time=5`}
          posterResizeMode={isFullScreen ? 'cover' : 'contain'}
          onLoadStart={() => {
            // console.log('Loading start....');
          }}
          onLoad={() => {
            // console.log('Loading done');
            setViewPlaceholder(false);
          }}
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
              {'Abraham Lincoln'}
            </Text>
          </View>
          <Text numberOfLines={1} style={style.dateText}>
            {'23 Feb 2023'}
          </Text>
          <Text numberOfLines={1} style={style.userNameText}>
            {'@abraham_lincoln_1234'}
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
        <TouchableOpacity
          style={style.fullScreenView}
          onPress={() => setFullScreen(!isFullScreen)}>
          <Image
            source={{
              uri: isFullScreen
                ? 'https://img.icons8.com/external-zen-filled-royyan-wijaya/24/null/external-so-arrow-resize-min-arrow-zen-filled-royyan-wijaya.png'
                : 'https://img.icons8.com/external-zen-filled-royyan-wijaya/24/null/external-so-arrow-resize-max-arrow-zen-filled-royyan-wijaya.png',
            }}
            style={style.commentImage}
          />
        </TouchableOpacity>
      </View>
    );
  });

  // To Pass custom component in flatlist
  const renderList = ({item}) => {
    return <FullScreenScrollableVideoComponent item={item} />;
  };

  // To extract keys from list of url's
  const keyExtractor = item => item.id;

  // To show animation placeholder view
  const AnimatedPlaceholderViewComponent = () => {
    return (
      <View
        style={{
          height:
            Platform.OS === 'ios'
              ? initialWindowMetrics.frame.height -
                (initialWindowMetrics.insets.bottom +
                  initialWindowMetrics.insets.top)
              : initialWindowMetrics.frame.height,
          width: '100%',
        }}>
        <SkeletonPlaceholder borderRadius={4} backgroundColor={'grey'}>
          <SkeletonPlaceholder.Item
            height={
              Platform.OS === 'ios'
                ? initialWindowMetrics.frame.height -
                  (initialWindowMetrics.insets.bottom +
                    initialWindowMetrics.insets.top)
                : initialWindowMetrics.frame.height - 200
            }
            marginHorizontal={10}
            marginTop={30}
            borderRadius={10}
          />
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            marginTop={50}>
            <SkeletonPlaceholder.Item
              width={60}
              height={60}
              borderRadius={50}
              marginLeft={20}
            />
            <SkeletonPlaceholder.Item marginLeft={20}>
              <SkeletonPlaceholder.Item width={200} height={20} />
              <SkeletonPlaceholder.Item
                marginTop={10}
                width={150}
                height={20}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    );
  };

  // Main component to render screen
  return (
    <SafeAreaView style={style.container}>
      <FlatList
        pos
        decelerationRate={'fast'}
        scrollEventThrottle={3}
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
      {viewPlaceholder && <AnimatedPlaceholderViewComponent />}
    </SafeAreaView>
  );
};

export default App;

// Create Stylesheet for add Internal styles to our component
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    height:
      Platform.OS === 'ios'
        ? initialWindowMetrics.frame.height -
          (initialWindowMetrics.insets.bottom + initialWindowMetrics.insets.top)
        : initialWindowMetrics.frame.height, // Used to get dynamic height of device
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
  fullScreenView: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 30,
    right: 10,
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
