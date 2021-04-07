/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity} from 'react-native';
import {
  ScremoveFavAction,
  ScsetFavAction,
  ScsetCurrentProductAction,
} from '../ScStateManagement/ScActions';
import {H_W} from '../ScFrequentUsage/ScResponsive';
import {colors} from '../ScFrequentUsage/ScColor';
import WrapperScreen from '../ScFrequentUsage/ScWrapperScreen';
import Loop from '../ScFrequentUsage/ScFlatList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NavigationRef from '../ScFrequentUsage/ScRefNavigation';
import {ScHorizontalTile} from './ScHome';
import LinearGradient from 'react-native-linear-gradient';

const ScFavourites = (props) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const ScGoToSingleProduct = (item) => {
    props.ScsetCurrentProductAction(item);
    NavigationRef.Navigate('ScSP');
  };

  const ScGoBack = () => NavigationRef.Navigate('ScHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: 'rgba(188,188,188,0.15)',
          transform: [{scaleX: H_W.width * 0.016}, {scaleY: H_W.width * 0.017}],
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      />
      <View
        style={{
          flex: 1,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
        }}>
        <Loop
          horizontal={false}
          data={props.ScFavs}
          renderItem={({item}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}>
              <ScHorizontalTile
                item={item}
                ScGoToSingleProduct={ScGoToSingleProduct}
                ScFavs={props.ScFavs}
                ScsetFav={(fd) => props.ScsetFavAction(fd)}
                ScremoveFav={(fd) => props.ScremoveFavAction(fd)}
              />
            </View>
          )}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: H_W.width * 0.05,
                marginTop: HEIGHT * 0.01,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={ScGoBack}
                  style={{
                    shadowColor: '#bcbcbc',
                    shadowOffset: {
                      width: 5,
                      height: 8,
                    },
                    shadowOpacity: 0.56,
                    shadowRadius: 8.68,
                  }}>
                  <LinearGradient
                    style={{padding: 2, borderRadius: 10}}
                    colors={['white', colors.lightGrey3]}
                    locations={[0.3, 1]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}>
                    <LinearGradient
                      style={{padding: 5, borderRadius: 10}}
                      colors={['white', colors.lightBackground]}
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 0}}>
                      <Ionicons
                        name="arrow-back-outline"
                        size={23}
                        color={colors.lightGrey3}
                      />
                    </LinearGradient>
                  </LinearGradient>
                </TouchableOpacity>
                <Text
                  style={{
                    marginLeft: H_W.width * 0.02,
                    color: colors.darkGray,
                  }}>
                  Back
                </Text>
              </View>
            </View>
          }
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    ScFavs: state.ScToggleFav,
  };
};

export default connect(mapStateToProps, {
  ScsetFavAction,
  ScsetCurrentProductAction,
  ScremoveFavAction,
})(ScFavourites);
