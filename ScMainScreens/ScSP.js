/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {H_W} from '../ScFrequentUsage/ScResponsive';
import WrapperScreen from '../ScFrequentUsage/ScWrapperScreen';
import {connect} from 'react-redux';
import {colors} from '../ScFrequentUsage/ScColor';
import NavigationRef from '../ScFrequentUsage/ScRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ScremoveFavAction,
  ScsetFavAction,
  ScaddCartAction,
  ScremoveCartAction,
} from '../ScStateManagement/ScActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import StarRating from '../starRating';
import {Badge} from 'react-native-elements';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);
  const ScProduct = props.ScProduct;
  const [fav, setFav] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

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
    props.ScaddCartAction({...ScProduct});
  };

  const ScRemoveFromCart = () => {
    props.ScCart[ScProduct.id] !== undefined &&
      props.ScremoveCartAction(ScProduct);
  };

  const ScGotoCart = () => NavigationRef.Navigate('ScCart');
  const ScGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      style={{backgroundColor: ScProduct.bgcolor}}
      statusBar={ScProduct.bgcolor}>
      <KeyboardAwareScrollView bounces={false}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: H_W.width * 0.04,
              marginTop: HEIGHT * 0.03,
            }}>
            <TouchableOpacity onPress={ScGoBack}>
              <AntDesign name="arrowleft" size={23} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ScGotoCart}>
              <MaterialCommunityIcons name="cart-outline" size={23} />
              {props.totalItems > 0 && (
                <Badge
                  value={props.totalItems}
                  containerStyle={{position: 'absolute', bottom: 0, right: 0}}
                  badgeStyle={{
                    backgroundColor: 'red',
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <FastImage
            source={ScProduct.image}
            style={{
              width: H_W.width * 0.8,
              height: HEIGHT * 0.6,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 11,
              },
              shadowOpacity: 0.45,
              shadowRadius: 15.78,
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: H_W.width * 0.1,
          }}>
          <TouchableOpacity
            onPress={toggleFav}
            style={{
              backgroundColor: 'white',
              alignSelf: 'flex-end',
              padding: 10,
              borderRadius: 50,
              elevation: 4,
              marginTop: -HEIGHT * 0.028,
            }}>
            <Ionicons name={fav ? 'ios-heart' : 'heart-outline'} size={20} />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'flex-start',
              width: H_W.width * 0.65,
              fontWeight: 'bold',
              fontSize: 23,
            }}>
            {ScProduct.product}
          </Text>
          <View
            style={{
              alignSelf: 'flex-start',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <StarRating rating={2.5} size={H_W.width * 0.18} />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.lightBackground2,
                  marginLeft: H_W.width * 0.04,
                }}>
                {ScProduct.rating}
              </Text>
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 19}}>
              ${ScProduct.price}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              lineHeight: HEIGHT * 0.03,
              marginTop: HEIGHT * 0.02,
            }}>
            {ScProduct.dis}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: HEIGHT * 0.01,
            }}>
            <Text
              style={{
                color: colors.lightGrey3,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Quantity
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '35%',
              }}>
              <TouchableOpacity
                onPress={ScRemoveFromCart}
                style={{
                  padding: 6,
                  backgroundColor: colors.lightBackground,
                  borderRadius: 5,
                }}>
                <FontAwesome name="minus" color={colors.darkGray} />
              </TouchableOpacity>
              <View
                style={{
                  padding: 5,
                  backgroundColor: colors.lightBackground,
                  borderRadius: 5,
                }}>
                <Text style={{fontWeight: 'bold', color: colors.darkGray}}>
                  {props.ScCart[ScProduct.id] === undefined
                    ? 0
                    : props.ScCart[ScProduct.id].added}
                </Text>
              </View>
              <TouchableOpacity
                onPress={ScAddToCart}
                style={{
                  padding: 6,
                  backgroundColor: colors.lightBackground,
                  borderRadius: 5,
                }}>
                <FontAwesome name="plus" color={colors.darkGray} />
              </TouchableOpacity>
            </View>
          </View>
          <Button
            onPress={ScAddToCart}
            title="Add To My Cart"
            buttonStyle={{
              backgroundColor: colors.primary,
              borderRadius: 50,
              paddingVertical: HEIGHT * 0.02,
            }}
            icon={
              <MaterialCommunityIcons
                name="cart-outline"
                size={20}
                color="white"
                style={{marginRight: H_W.width * 0.01}}
              />
            }
            containerStyle={{
              width: H_W.width,
              borderRadius: 50,
              marginTop: HEIGHT * 0.02,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

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
