/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {H_W} from '../ScFrequentUsage/ScResponsive';
import WrapperScreen from '../ScFrequentUsage/ScWrapperScreen';
import {connect} from 'react-redux';
import {colors} from '../ScFrequentUsage/ScColor';
import NavigationRef from '../ScFrequentUsage/ScRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  ScremoveFavAction,
  ScsetFavAction,
  ScaddCartAction,
  ScremoveCartAction,
} from '../ScStateManagement/ScActions';
import LinearGradient from 'react-native-linear-gradient';
import MaskedViewIOS from '@react-native-community/masked-view';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarRating from '../starRating';
import Data from '../ScData';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
    getSizeColor();
  }, []);
  const ScProduct = props.ScProduct;
  const [fav, setFav] = useState(false);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [currColor, setCurrColor] = useState(availableColors[0]);
  const [currSize, setCurrSize] = useState(availableSizes[0]);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const getSizeColor = () => {
    let sizesArr = [];
    let colorsArr = [];

    for (let Sc = 0; Sc < Data.details.length; Sc++) {
      const element = Data.details[Sc];
      if (element.productid === ScProduct.id) {
        sizesArr.push(element.size);
        colorsArr.push(element.color);
        if (sizesArr.length > 3) {
          break;
        }
      }
    }
    setCurrColor(colorsArr[0]);
    setCurrSize(sizesArr[0]);
    setAvailableColors(colorsArr);
    setAvailableSizes(sizesArr);
  };

  const checkIfFav = () => {
    for (let Sc = 0; Sc < props.ScFavs.length; Sc++) {
      if (props.ScFavs[Sc].id === ScProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.ScremoveFavAction(ScProduct.id)
      : props.ScsetFavAction(ScProduct);
    setFav(!fav);
  };

  const ScAddToCart = () => {
    props.ScaddCartAction({...ScProduct, color: currColor, size: currSize});
  };

  const ScRemoveFromCart = () => {
    props.ScCart[`${ScProduct.id}_${currColor}_${currSize}`] !== undefined &&
      props.ScremoveCartAction({
        ...ScProduct,
        color: currColor,
        size: currSize,
      });
  };

  const ScGotoCart = () => NavigationRef.Navigate('ScContact');
  const ScGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen>
      <KeyboardAwareScrollView bounces={false}>
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
              style={{marginLeft: H_W.width * 0.02, color: colors.darkGray}}>
              Back
            </Text>
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
                    : [colors.lightGrey3, colors.lightGrey4]
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
        <Text
          style={{
            paddingLeft: H_W.width * 0.045,
            width: H_W.width * 0.8,
            marginTop: HEIGHT * 0.03,
            fontSize: 26,
            color: '#142A4D',
            fontFamily: 'HelveticaNeue-Medium',
          }}>
          {ScProduct.name}
        </Text>
        <View
          style={{marginLeft: H_W.width * 0.045, marginTop: HEIGHT * 0.005}}>
          <StarRating rating={ScProduct.rating} size={H_W.width * 0.23} />
        </View>
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={ScProduct.images}
            imageStyle={{
              transform: [{rotate: '-23deg'}],
            }}
            style={{
              width: H_W.width * 0.9,
              height: HEIGHT * 0.4,
              shadowColor: currColor,
              shadowOffset: {
                width: 0,
                height: 15,
              },
              shadowOpacity: 0.79,
              shadowRadius: 15.3,
            }}
            resizeMode="contain">
            <Text
              style={{
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 29,
                fontStyle: 'italic',
                color: colors.darkBlue,
                marginLeft: H_W.width * 0.0,
                marginTop: HEIGHT * 0.03,
              }}>
              ${ScProduct.price}
            </Text>
          </ImageBackground>
        </View>
        <View
          style={{
            marginTop: HEIGHT * 0.02,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            backgroundColor: 'white',
            shadowColor: '#bcbcbc',
            shadowOffset: {
              width: 0,
              height: -20,
            },
            shadowOpacity: 0.25,
            shadowRadius: 12.3,
            paddingHorizontal: H_W.width * 0.07,
          }}>
          <Text
            style={{
              marginTop: HEIGHT * 0.04,
              color: colors.darkGray,
              lineHeight: HEIGHT * 0.027,
            }}>
            {ScProduct.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: HEIGHT * 0.02,
            }}>
            <Text style={{marginRight: H_W.width * 0.02, fontSize: 17.5}}>
              Color
            </Text>
            {availableColors.map((item) => (
              <TouchableOpacity
                onPress={() => setCurrColor(item)}
                style={{
                  marginHorizontal: H_W.width * 0.02,
                  width: H_W.width * 0.095,
                  height: H_W.width * 0.095,
                  borderRadius: 50,
                  backgroundColor: item,
                  shadowColor: '#bcbcbc',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.72,
                  shadowRadius: 8.46,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {currColor === item && (
                  <View
                    style={{
                      width: H_W.width * 0.035,
                      height: H_W.width * 0.035,
                      borderRadius: 50,
                      backgroundColor: 'white',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                    }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: HEIGHT * 0.03,
            }}>
            <Text style={{marginRight: H_W.width * 0.02, fontSize: 17.5}}>
              Size
            </Text>
            {availableSizes.map((item) => (
              <TouchableOpacity
                onPress={() => setCurrSize(item)}
                style={{
                  shadowColor: '#bcbcbc',
                  shadowOffset: {
                    width: 5,
                    height: 8,
                  },
                  shadowOpacity: 0.56,
                  shadowRadius: 8.68,
                  marginHorizontal: H_W.width * 0.02,
                }}>
                <LinearGradient
                  style={{
                    padding: 2,
                    borderRadius: 10,
                    minWidth: H_W.width * 0.08,
                    height: HEIGHT * 0.05,
                  }}
                  colors={['white', colors.lightGrey3]}
                  locations={[0.3, 1]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}>
                  <LinearGradient
                    style={{
                      padding: 5,
                      height: '100%',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    colors={
                      currSize === item
                        ? [colors.primary, `rgba(${colors.rgb_Primary},0.4)`]
                        : ['white', colors.lightBackground]
                    }
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}>
                    <Text
                      style={{
                        color: currSize === item ? 'white' : colors.darkGray,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {item}
                    </Text>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: HEIGHT * 0.02,
            shadowColor: '#bcbcbc',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.45,
            shadowRadius: 8.27,
          }}>
          <TouchableOpacity onPress={ScAddToCart}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              locations={[0.3, 0.4, 1]}
              colors={['white', colors.lightBackground, 'white']}
              style={{padding: 5, borderRadius: 50}}>
              <LinearGradient
                style={{
                  paddingVertical: HEIGHT * 0.015,
                  width: H_W.width * 0.6,
                  borderRadius: 50,
                  borderWidth: 0.5,
                  borderColor: colors.lightGrey3,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent:
                    props.ScCart[`${ScProduct.id}_${currColor}_${currSize}`] !==
                    undefined
                      ? 'space-evenly'
                      : 'center',
                }}
                colors={['white', colors.blueGray]}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}>
                {props.ScCart[`${ScProduct.id}_${currColor}_${currSize}`] !==
                undefined ? (
                  <>
                    <TouchableOpacity onPress={ScRemoveFromCart}>
                      <FontAwesome name="minus" size={20} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 17}}>
                      {
                        props.ScCart[`${ScProduct.id}_${currColor}_${currSize}`]
                          .added
                      }
                    </Text>
                    <TouchableOpacity onPress={ScAddToCart}>
                      <FontAwesome name="plus" size={20} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={{fontSize: 18}}>Add to cart</Text>
                    <Ionicons name="ios-chevron-forward" size={17} />
                    <Ionicons
                      name="ios-chevron-forward"
                      size={17}
                      style={{marginLeft: -H_W.width * 0.03}}
                    />
                    <Ionicons
                      name="ios-chevron-forward"
                      size={17}
                      style={{marginLeft: -H_W.width * 0.03}}
                    />
                  </>
                )}
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={ScGotoCart}>
            <LinearGradient
              colors={[colors.primary, `rgba(${colors.rgb_Primary},0.6)`]}
              end={{x: 1, y: 0}}
              start={{x: 0, y: 1}}
              style={{
                padding: 13,
                borderRadius: 50,
                marginLeft: H_W.width * 0.02,
              }}>
              <Feather name="shopping-bag" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const border = {
  borderWidth: 1,
  borderColor: 'red',
};

const mapStateToProps = (state) => {
  return {
    ScProduct: state.ScCrntPrdtReducer,
    ScFavs: state.ScToggleFav,
    totalItems: state.ScCartReducer.totalItems,
    ScCart: state.ScCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  ScsetFavAction,
  ScremoveFavAction,
  ScremoveCartAction,
  ScaddCartAction,
})(React.memo(SingleProduct));
