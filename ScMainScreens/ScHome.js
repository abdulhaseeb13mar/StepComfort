/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import WrapperScreen from '../ScFrequentUsage/ScWrapperScreen';
import {colors} from '../ScFrequentUsage/ScColor';
import {H_W} from '../ScFrequentUsage/ScResponsive';
import Data from '../ScData';
import Loop from '../ScFrequentUsage/ScFlatList';
import RefNavigation from '../ScFrequentUsage/ScRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ScsetCurrentProductAction,
  ScremoveFavAction,
  ScsetFavAction,
} from '../ScStateManagement/ScActions';
import Entypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import MaskedViewIOS from '@react-native-community/masked-view';
import {Badge} from 'react-native-elements';

function ScHome(props) {
  useEffect(() => {
    ScchangeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [ScCategories, setScCategories] = useState(Data.category);
  const [ScCurrentCat, setScCurrentCat] = useState(Data.category[0]);
  const [ScTabProducts, setScTabProducts] = useState([]);
  // const [popularProducts, setPopularProducts] = useState(Data.Popular);

  const ScchangeTab = (tab) => {
    setScCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.categoryid === tab.id,
    );
    setScTabProducts(filteredProducts);
  };

  const ScGotoFav = () => RefNavigation.Navigate('ScFav');
  const ScGotoCart = () => RefNavigation.Navigate('ScContact');
  const ScGotoSearch = () => RefNavigation.Navigate('ScSearch');
  const ScGoToSingleProduct = (item) => {
    props.ScsetCurrentProductAction(item);
    RefNavigation.Navigate('ScSP');
  };

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <Loop
        ListHeaderComponent={
          <ScrollView bounces={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: H_W.width * 0.05,
                marginTop: HEIGHT * 0.01,
              }}>
              <TouchableOpacity onPress={ScGotoFav}>
                <MaskedViewIOS
                  maskElement={
                    <AntDesign
                      name="heart"
                      size={H_W.width * 0.07}
                      style={{
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 8,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 10.32,
                      }}
                    />
                  }>
                  <LinearGradient
                    colors={[colors.darkGray, colors.lightBackground2]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}>
                    <AntDesign
                      name="heart"
                      size={H_W.width * 0.07}
                      style={{
                        opacity: 0,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 8,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 10.32,
                      }}
                    />
                  </LinearGradient>
                </MaskedViewIOS>
              </TouchableOpacity>
              <TouchableOpacity onPress={ScGotoCart}>
                <MaskedViewIOS
                  maskElement={
                    <Entypo
                      name="shopping-bag"
                      size={H_W.width * 0.07}
                      style={{
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 8,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 10.32,
                      }}
                    />
                  }>
                  <LinearGradient
                    colors={[colors.darkGray, colors.lightBackground2]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}>
                    <Entypo
                      name="shopping-bag"
                      size={H_W.width * 0.07}
                      style={{
                        opacity: 0,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 8,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 10.32,
                      }}
                    />
                  </LinearGradient>
                </MaskedViewIOS>
                {props.SctotalItems > 0 && (
                  <Badge
                    value={props.SctotalItems}
                    containerStyle={{position: 'absolute', bottom: 0, right: 0}}
                    badgeStyle={{backgroundColor: 'red'}}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: HEIGHT * 0.045,
              }}>
              <TouchableOpacity
                onPress={ScGotoSearch}
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
                    <Text style={{color: colors.darkGray}}>
                      Find your Favourite Shoes
                    </Text>
                    <LinearGradient
                      colors={[
                        colors.primary,
                        `rgba(${colors.rgb_Primary},0.7)`,
                      ]}
                      end={{x: 1, y: 0}}
                      start={{x: 0, y: 1}}
                      style={{padding: 7, borderRadius: 7}}>
                      <AntDesign name="search1" size={14} color="white" />
                    </LinearGradient>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Loop
              data={ScCategories}
              renderItem={({item}) => (
                <TabList
                  item={item}
                  ScCurrentCat={ScCurrentCat}
                  ScchangeTab={ScchangeTab}
                />
              )}
            />
            <Loop
              data={ScTabProducts}
              renderItem={({item}) => (
                <ScVerticalTile
                  item={item}
                  ScGoToSingleProduct={ScGoToSingleProduct}
                  ScFavs={props.ScFavs}
                  ScsetFav={(sc) => props.ScsetFavAction(sc)}
                  ScremoveFav={(sc) => props.ScremoveFavAction(sc)}
                />
              )}
            />
            <Text
              style={{
                fontSize: 22,
                marginLeft: H_W.width * 0.045,
                marginVertical: HEIGHT * 0.01,
              }}>
              <Text style={{fontWeight: 'bold'}}>Popular </Text>Shoes
            </Text>
          </ScrollView>
        }
        horizontal={false}
        data={ScTabProducts}
        renderItem={({item}) => (
          <ScHorizontalTile
            item={item}
            ScFavs={props.ScFavs}
            ScGoToSingleProduct={ScGoToSingleProduct}
            ScsetFav={(sc) => props.ScsetFavAction(sc)}
            ScremoveFav={(sc) => props.ScremoveFavAction(sc)}
          />
        )}
      />
    </WrapperScreen>
  );
}

export const ScVerticalTile = ({
  item,
  ScGoToSingleProduct,
  ScFavs,
  ScremoveFav,
  ScsetFav,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const checkIfFav = () => {
    for (let Sc = 0; Sc < ScFavs.length; Sc++) {
      if (ScFavs[Sc].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? ScremoveFav(item.id) : ScsetFav(item);
    setFav(!fav);
  };
  return (
    <TouchableOpacity
      onPress={() => ScGoToSingleProduct(item)}
      style={{marginHorizontal: H_W.width * 0.05}}>
      <LinearGradient
        style={{width: H_W.width * 0.48, padding: 2, borderRadius: 20}}
        colors={['white', colors.lightGrey1]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <LinearGradient
          colors={['white', colors.lightBackground]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          locations={[0.7, 1]}
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            paddingHorizontal: H_W.width * 0.02,
            paddingVertical: HEIGHT * 0.02,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 19,
              fontStyle: 'italic',
              color: colors.darkGray,
            }}>
            ${item.price}
          </Text>
          <FastImage
            source={item.images}
            style={{
              width: '100%',
              height: HEIGHT * 0.2,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.1,
              shadowRadius: 15.46,
              transform: [{rotate: '-25deg'}],
            }}
            resizeMode="contain"
          />
          <Text
            numberOfLines={2}
            style={{
              width: '95%',
              fontFamily: 'PingFangHK-Semibold',
              fontSize: 15.5,
              marginTop: HEIGHT * 0.01,
            }}>
            {item.name}
          </Text>
          <View
            style={{
              marginTop: HEIGHT * 0.008,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <TouchableOpacity onPress={toggleFav}>
              <AntDesign
                name="heart"
                size={18}
                color={fav ? colors.primary : colors.lightGrey3}
              />
            </TouchableOpacity>
            <LinearGradient
              colors={[colors.primary, `rgba(${colors.rgb_Primary},0.7)`]}
              end={{x: 1, y: 0}}
              start={{x: 0, y: 1}}
              style={{padding: 7, borderRadius: 7}}>
              <Entypo name="chevron-right" size={14} color="white" />
            </LinearGradient>
          </View>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const ScHorizontalTile = ({
  item,
  ScGoToSingleProduct,
  ScremoveFav,
  ScsetFav,
  ScFavs,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const checkIfFav = () => {
    for (let Sc = 0; Sc < ScFavs.length; Sc++) {
      if (ScFavs[Sc].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? ScremoveFav(item.id) : ScsetFav(item);
    setFav(!fav);
  };
  return (
    <TouchableOpacity
      onPress={() => ScGoToSingleProduct(item)}
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: H_W.width * 0.9,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: H_W.width * 0.25,
            height: H_W.width * 0.25,
            borderRadius: 13,
            padding: 2,
            shadowColor: '#000',
            shadowOffset: {
              width: 5,
              height: 8,
            },
            shadowOpacity: 0.26,
            shadowRadius: 10.68,
          }}>
          <LinearGradient
            colors={['white', colors.lightBackground]}
            style={{borderRadius: 13, width: '100%', height: '100%'}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <FastImage
              source={item.images}
              style={{
                width: '90%',
                height: H_W.width * 0.19,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                transform: [{rotate: '-13deg'}],
              }}
              resizeMode="contain"
            />
          </LinearGradient>
        </View>
        <View
          style={{
            width: H_W.width * 0.6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              numberOfLines={2}
              style={{
                color: 'black',
                width: H_W.width * 0.45,
                fontSize: 15.5,
              }}>
              {item.name}
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                alignSelf: 'flex-start',
                marginTop: HEIGHT * 0.015,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 18.5,
                  fontStyle: 'italic',
                }}>
                ${item.price}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={toggleFav}>
            <MaskedViewIOS
              maskElement={
                <AntDesign
                  name="heart"
                  size={H_W.width * 0.07}
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 8,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 10.32,
                  }}
                />
              }>
              <LinearGradient
                colors={
                  fav
                    ? [colors.primary, `rgba(${colors.rgb_Primary}, 0.4)`]
                    : [colors.lightGrey3, colors.lightGrey2]
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <AntDesign
                  name="heart"
                  size={H_W.width * 0.07}
                  style={{
                    opacity: 0,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 8,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 10.32,
                  }}
                />
              </LinearGradient>
            </MaskedViewIOS>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TabList = ({item, ScchangeTab, ScCurrentCat}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 15,
        marginTop: HEIGHT * 0.04,
        height: H_W.width * 0.1, //1%
        paddingHorizontal: H_W.width * 0.02,
        paddingTop: H_W.width * 0.02,
      }}
      onPress={() => ScchangeTab(item)}>
      <Text
        style={{
          color: item.id === ScCurrentCat.id ? 'black' : colors.lightGrey3,
          fontSize: 18,
          fontFamily: 'Arial',
        }}>
        {item.category}
      </Text>
      {item.id === ScCurrentCat.id ? (
        <View
          style={{
            width: 8,
            borderWidth: 1.8,
            borderRadius: 10,
            marginTop: 4,
            borderColor: colors.primary,
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    SctotalItems: state.ScCartReducer.totalItems,
    ScFavs: state.ScToggleFav,
  };
};

export default connect(mapStateToProps, {
  ScsetCurrentProductAction,
  ScremoveFavAction,
  ScsetFavAction,
})(ScHome);
