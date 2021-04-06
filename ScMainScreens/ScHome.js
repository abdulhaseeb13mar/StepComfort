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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ScHeader from '../ScFrequentUsage/ScHeader';

function ScHome(props) {
  useEffect(() => {
    ScchangeTab(Data.Category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Sccategories, setSccategories] = useState(Data.Category);
  const [SccurrentCat, setScCurrentCat] = useState(Data.Category[0]);
  const [SctabProducts, setScTabProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState(Data.Popular);

  const ScchangeTab = (tab) => {
    setScCurrentCat(tab);
    const filteredProducts = Data.Product.filter(
      (item) => item.categoryid === tab.id,
    );
    setScTabProducts(filteredProducts);
  };

  const ScGotoFav = () => RefNavigation.Navigate('ScFav');
  const ScGotoCart = () => RefNavigation.Navigate('ScCart');
  const ScGotoSearch = () => RefNavigation.Navigate('ScSearch');
  const ScGoToSingleProduct = (item) => {
    props.ScsetCurrentProductAction(item);
    RefNavigation.Navigate('ScSP');
  };

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
          top: 0,
        }}
      />
      <ScrollView style={{marginTop: 10}} bounces={false}>
        <ScHeader
          leftIcon={Ionicons}
          leftIconName="ios-heart-circle"
          leftIconColor={colors.primary}
          leftIconAction={ScGotoFav}
          rightIconColor="black"
          rightIcon={MaterialCommunityIcons}
          rightIconName="cart-outline"
          rightIconAction={ScGotoCart}
          Title=""
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: H_W.width * 0.06,
            marginBottom: HEIGHT * 0.02,
            marginTop: HEIGHT * 0.02,
          }}>
          <View>
            <Text style={{fontSize: 24}}>Our</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 24,
              }}>
              Products
            </Text>
          </View>
          <TouchableOpacity
            onPress={ScGotoSearch}
            style={{
              padding: 8,
              backgroundColor: 'white',
              borderRadius: 50,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
            }}>
            <Ionicons
              name="md-search"
              size={20}
              color={colors.darkGray}
              style={{}}
            />
          </TouchableOpacity>
        </View>
        <Loop
          style={{marginBottom: HEIGHT * 0.02}}
          data={Sccategories}
          renderItem={({item}) => (
            <TabList
              item={item}
              SccurrentCat={SccurrentCat}
              ScchangeTab={ScchangeTab}
            />
          )}
        />
        <Loop
          style={{marginVertical: HEIGHT * 0.03}}
          data={SctabProducts}
          renderItem={({item}) => (
            <ScVerticalTile
              item={item}
              ScGoToSingleProduct={ScGoToSingleProduct}
              ScFavs={props.ScFavs}
              ScremoveFav={(Sc) => props.ScremoveFavAction(Sc)}
              ScsetFav={(Sc) => props.ScsetFavAction(Sc)}
            />
          )}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            marginLeft: H_W.width * 0.06,
            marginTop: HEIGHT * 0.01,
          }}>
          Popular Bags
        </Text>
        <Loop
          style={{marginTop: HEIGHT * 0.03}}
          data={popularProducts}
          renderItem={({item}) => (
            <ScVerticalTile
              item={item}
              ScGoToSingleProduct={ScGoToSingleProduct}
              ScFavs={props.ScFavs}
              ScremoveFav={(Sc) => props.ScremoveFavAction(Sc)}
              ScsetFav={(Sc) => props.ScsetFavAction(Sc)}
            />
          )}
        />
      </ScrollView>
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
      style={{
        width: H_W.width * 0.55,
        paddingHorizontal: H_W.width * 0.03,
        paddingTop: H_W.width * 0.03,
        paddingBottom: H_W.width * 0.06,
        borderRadius: 19,
        backgroundColor: item.bgcolor,
        marginHorizontal: H_W.width * 0.05,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 18.65,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View>
          <Text style={{color: 'black', fontSize: 18}}>
            {item.product.split(' ')[0]}
          </Text>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {item.product.split(' ')[1]}
          </Text>
        </View>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
          ${item.price}
        </Text>
      </View>
      <FastImage
        source={item.image}
        style={{
          width: '100%',
          height: HEIGHT * 0.3,
          marginLeft: H_W.width * 0.15,
          marginBottom: HEIGHT * 0.015,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          width: '100%',
          bottom: 0,
          right: 0,
        }}>
        <TouchableOpacity onPress={toggleFav}>
          <AntDesign name={fav ? 'heart' : 'hearto'} color="white" size={20} />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'white',
            borderBottomRightRadius: 19,
            borderTopLeftRadius: 19,
            paddingVertical: HEIGHT * 0.007,
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Entypo name="plus" size={23} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TabList = ({item, ScchangeTab, SccurrentCat}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => ScchangeTab(item)}
      style={{
        paddingHorizontal: H_W.width * 0.06,
        paddingVertical: HEIGHT * 0.009,
        borderRadius: 50,
        backgroundColor:
          SccurrentCat.id === item.id ? colors.primary : colors.lightBackground,
        marginHorizontal: H_W.width * 0.02,
        shadowColor:
          SccurrentCat.id === item.id
            ? `rgba(${colors.rgb_Primary},1)`
            : '#000',
        shadowOffset: {
          width: 0,
          height: SccurrentCat.id === item.id ? 10 : 3,
        },
        shadowOpacity: SccurrentCat.id === item.id ? 0.47 : 0.27,
        shadowRadius: SccurrentCat.id === item.id ? 10.65 : 4.65,
      }}>
      <Text
        style={{
          fontSize: 15.5,
          color: SccurrentCat.id === item.id ? 'white' : colors.lightGrey3,
          fontWeight: 'bold',
        }}>
        {item.category}
      </Text>
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
