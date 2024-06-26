import React, {useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';

import colors from '../assets/constants/colors';

import ServerIcon from '../assets/img/server.png';
import StartServerIcon from '../assets/img/server-start.png';
import ServerConnectIcon from '../assets/img/server-connect.png';
import QRCodeIcon from '../assets/img/qrcode.png';

import {setBooleanValueFor} from '../utils/storage';
import {SETTINGS_ONBOARDING_SHOW_FIRST_TIME} from '../assets/constants/constants';

const WIDTH = Dimensions.get('window').width;
const SERVER_LINK = 'https://peyara-remote-mouse.vercel.app';

function DownloadServer() {
  const openLink = () => {
    Linking.openURL(SERVER_LINK);
  };
  const copyLink = async () => {
    // TODO add clipboard
    Alert.alert('Link Copied');
  };
  return (
    <TouchableOpacity style={styles.downloadContainer} onPress={openLink}>
      <Image source={ServerIcon} style={styles.image} />

      <Text style={styles.whiteText}>Download for Windows, MacOS or Linux</Text>

      <Text style={styles.whiteText}>Click to visit website</Text>

      <TouchableOpacity onPress={openLink}>
        <Text style={styles.linkText}>{SERVER_LINK} </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={copyLink}>
        <Text style={styles.linkText}>Copy Link</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function StartServer() {
  return (
    <View style={[styles.downloadContainer]}>
      <Image source={StartServerIcon} style={{width: 280, height: 300}} />
    </View>
  );
}

function ScanQRCode() {
  return (
    <View style={[styles.downloadContainer]}>
      <Image source={QRCodeIcon} style={{width: 280, height: 300}} />
    </View>
  );
}

function ConnectServer() {
  return (
    <View style={[styles.downloadContainer]}>
      <Image
        source={ServerConnectIcon}
        style={{width: WIDTH, height: 120}}
        resizeMethod="scale"
        resizeMode="contain"
      />
    </View>
  );
}

const steps = [
  {
    label: 'Download Server Client on your desktop',
    component: <DownloadServer />,
  },
  {
    label: 'Install Server client and start server on your desktop',
    component: <StartServer />,
  },
  {
    label: 'Scan QRCode from  the mobile app',
    component: <ScanQRCode />,
  },
  {
    label: 'Select a Server and click to connect',
    component: <ConnectServer />,
  },
];

export default function Onboarding({navigation}) {
  const flatListRef = useRef();

  const goToNextStep = async index => {
    if (index < steps.length) {
      flatListRef.current.scrollToIndex({
        index: index,
        animated: true,
      });
    } else {
      // don't show this screen next time
      setBooleanValueFor(SETTINGS_ONBOARDING_SHOW_FIRST_TIME, false);
      navigation.navigate('Tabs');
    }
  };

  const StepsCard = useCallback(({item, index}) => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.label}>{item.label}</Text>
        {item.component}
        <TouchableOpacity
          onPress={() => goToNextStep(index + 1)}
          style={[styles.nextButton]}
          activeOpacity={0.8}>
          {/* <NextIcon /> */}

          <Text style={styles.nextButtonText}>
            {index == 0
              ? 'Done'
              : index == steps.length - 1
              ? "Let's Start"
              : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.containerSafe}>
      <FlatList
        ref={flatListRef}
        data={steps}
        renderItem={StepsCard}
        keyExtractor={(item, index) => index}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    backgroundColor: colors.PRIM_BG,
  },

  stepContainer: {
    width: WIDTH,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 48,
    // backgroundColor: "blue",
  },
  image: {
    width: 152,
    height: 152,
  },
  touchpad: {
    width: 200,
    height: 200,
    margin: 16,
    borderRadius: 8,
    backgroundColor: colors.TOUCHPAD,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  placeTop: {
    position: 'absolute',
    top: 10,
    left: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollbar: {
    width: 5,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.WHITE,
    position: 'absolute',
    right: 4,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dotContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotRed: {
    backgroundColor: 'red',
  },
  dotGreen: {
    backgroundColor: 'green',
  },
  dotYellow: {
    backgroundColor: 'yellow',
  },
  label: {
    fontFamily: 'Raleway-Regular',
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 24,
  },
  nextButton: {
    width: '60%',
    height: 40,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: colors.PRIM_ACCENT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'Raleway-Regular',
    color: colors.PRIM_BG,
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  downloadContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
    marginVertical: 16,
  },
  whiteText: {
    fontFamily: 'Raleway-Regular',
    color: colors.WHITE,
    fontSize: 16,
  },
  linkText: {
    fontFamily: 'Raleway-Regular',
    color: colors.PRIM_FRONT,
    textDecorationLine: 'underline',
  },
});
