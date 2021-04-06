/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
import ScHeader from '../ScFrequentUsage/ScHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScVerticalTile} from './ScHome';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.Product.filter((item) =>
      item.product.toLowerCase().includes(searchText.toLowerCase()),
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
            <ScVerticalTile
              item={item}
              ScGoToSingleProduct={ScGoToSingleProduct}
              ScFavs={props.ScFavs}
              ScsetFav={(fd) => props.ScsetFavAction(fd)}
              ScremoveFav={(fd) => props.ScremoveFavAction(fd)}
            />
          </View>
        )}
      />
    );
  };
  const ScGoBack = () => NavigationRef.GoBack();

  const ScchangeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: colors.lightBackground}}>
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
      <View style={styles.ScSearch1}>
        <ScHeader
          leftIcon={AntDesign}
          leftIconName="arrowleft"
          leftIconColor={colors.primary}
          leftIconAction={ScGoBack}
          Title={<Text style={styles.ScSearch2}>Search</Text>}
        />
        <View style={styles.ScSearch3}>
          <View
            style={{
              marginTop: HEIGHT * 0.01,
              marginBottom: -HEIGHT * 0.02,
              ...styles.ScSearch4,
            }}>
            <ScSearchBar changeSearchText={ScchangeSearchText} />
          </View>
        </View>
      </View>
      <View style={{marginTop: HEIGHT * 0.06, flex: 1}}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.Product)}
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
  ScSearch1: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
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
