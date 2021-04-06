/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {
  ScremoveFavAction,
  ScsetFavAction,
  ScsetCurrentProductAction,
} from '../ScStateManagement/ScActions';
import {H_W} from '../ScFrequentUsage/ScResponsive';
import ScHeader from '../ScFrequentUsage/ScHeader';
import {colors} from '../ScFrequentUsage/ScColor';
import WrapperScreen from '../ScFrequentUsage/ScWrapperScreen';
import Loop from '../ScFrequentUsage/ScFlatList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationRef from '../ScFrequentUsage/ScRefNavigation';
import {ScVerticalTile} from './ScHome';

const ScFavourites = (props) => {
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
      <View style={{flex: 1}}>
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
              <ScVerticalTile
                item={item}
                ScGoToSingleProduct={ScGoToSingleProduct}
                ScFavs={props.ScFavs}
                ScsetFav={(fd) => props.ScsetFavAction(fd)}
                ScremoveFav={(fd) => props.ScremoveFavAction(fd)}
              />
            </View>
          )}
          ListHeaderComponent={
            <ScHeader
              leftIcon={AntDesign}
              leftIconName="arrowleft"
              leftIconAction={ScGoBack}
              Title={
                <Text style={styles.ScFav2}>
                  {props.ScFavs.length} Favourites
                </Text>
              }
            />
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

const styles = StyleSheet.create({
  ScFav1: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  ScFav2: {
    color: colors.primary,
    fontSize: 22,
  },
  ScFav3: {},
  ScFav4: {},
});
