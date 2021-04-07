/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import WrapperScreen from '../ScFrequentUsage/ScWrapperScreen';
import {H_W} from '../ScFrequentUsage/ScResponsive';
import NavigationRef from '../ScFrequentUsage/ScRefNavigation';
import {colors} from '../ScFrequentUsage/ScColor';
import Data from '../ScData';
import Loop from '../ScFrequentUsage/ScFlatList';
import {connect} from 'react-redux';
import {
  ScsetCurrentProductAction,
  ScsetFavAction,
  ScremoveFavAction,
} from '../ScStateManagement/ScActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ScSearchBar from '../ScFrequentUsage/ScSearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScHeader from '../ScFrequentUsage/ScHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {ScHorizontalTile} from './ScHome';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const ScGoToSingleProduct = (item) => {
    props.ScsetCurrentProductAction(item);
    NavigationRef.Navigate('ScSP');
  };

  const CardRender = (Arr) => {
    return (
      <Loop
        horizontal={false}
        data={Arr}
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
              ScsetFav={(Sc) => props.ScsetFavAction(Sc)}
              ScremoveFav={(Sc) => props.ScremoveFavAction(Sc)}
            />
          </View>
        )}
      />
    );
  };
  const ScGoBack = () => NavigationRef.GoBack();

  const ScchangeSearchText = (Sc) => setSearchText(Sc);
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
        }}
      />
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
      <View
        style={{
          alignItems: 'center',
          marginTop: HEIGHT * 0.045,
        }}>
        <TouchableOpacity
          // onPress={ScGotoSearch}
          style={{
            shadowColor: '#bcbcbc',
            shadowOffset: {
              width: 0,
              height: 15,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
          }}>
          <LinearGradient
            style={{
              width: H_W.width * 0.8,
              borderRadius: 15,
              padding: 2,
            }}
            colors={['white', colors.lightGrey1]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <LinearGradient
              colors={['white', colors.lightBackground]}
              style={{
                backgroundColor: 'white',
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: HEIGHT * 0.01,
                paddingHorizontal: H_W.width * 0.02,
              }}>
              <TextInput
                style={{
                  width: '85%',
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: 'black',
                }}
                placeholderTextColor={colors.lightGrey3}
                placeholder="Search Here..."
                onChangeText={ScchangeSearchText}
              />
              <LinearGradient
                colors={[colors.primary, `rgba(${colors.rgb_Primary},0.7)`]}
                end={{x: 1, y: 0}}
                start={{x: 0, y: 1}}
                style={{padding: 7, borderRadius: 7}}>
                <AntDesign name="search1" size={14} color="white" />
              </LinearGradient>
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: HEIGHT * 0.06, flex: 1}}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.product)}
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  ScFavs: state.ScToggleFav,
});

export default connect(mapStateToProps, {
  ScsetCurrentProductAction,
  ScsetFavAction,
  ScremoveFavAction,
})(Search);

const styles = StyleSheet.create({
  ScSearch2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.primary,
  },
  ScSearch3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ScSearch4: {
    width: '85%',
  },
  ScSearch5: {},
  ScSearch6: {},
});
