/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../ScFrequentUsage/ScWrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {H_W} from '../ScFrequentUsage/ScResponsive';
import {colors} from '../ScFrequentUsage/ScColor';
import {Button, Overlay} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isFormValid} from '../ScFrequentUsage/Scvalidation';
import NavPointer from '../ScFrequentUsage/ScRefNavigation';
import {
  ScUserAction,
  ScresetCart,
  ScsetCurrentProductAction,
  ScsetFavAction,
  ScremoveFavAction,
} from '../ScStateManagement/ScActions';
import Toast from 'react-native-root-toast';
import Loop from '../ScFrequentUsage/ScFlatList';
import RefNavigation from '../ScFrequentUsage/ScRefNavigation';
import {ScHorizontalTile} from './ScHome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ConfirmOrder = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, []);

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.ScCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.ScCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const ScConfirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      props.ScUserAction({
        email: email,
        firstName: firstName,
        phone: phone,
        address: address,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      position: -60,
      backgroundColor: colors.secondary,
      opacity: 1,
      textColor: 'white',
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            address: address,
            phonenumber: phone,
            email: email,
            appname: 'BountiFul Bags',
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status ? setShowModal(true) : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setEmailErrMsg('');
      setFirstNameErrMsg(errMsg);
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  // const MoveToConfirmOrder = () => {
  //   props.ScresetCart();
  //   NavPointer.Push('ScConfirmOrder');
  // };

  const closeModal = () => {
    setShowModal(false);
    props.ScresetCart();
    NavPointer.Push('ScHome');
  };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const changeEmail = (t) => setEmail(t);
  const ScGoBack = () => NavPointer.GoBack();
  const changeFirstName = (t) => setFirstName(t);

  const ScGoToSingleProduct = (item) => {
    props.ScsetCurrentProductAction(item);
    RefNavigation.Navigate('ScSP');
  };

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <ScrollView style={styles.container} bounces={false}>
        <Loop
          style={{marginVertical: HEIGHT * 0.02}}
          data={HorizontalCartArray}
          renderItem={({item}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: H_W.width * 1,
              }}>
              <ScHorizontalTile
                item={item}
                ScFavs={props.ScFavs}
                ScGoToSingleProduct={ScGoToSingleProduct}
                ScsetFav={(sc) => props.ScsetFavAction(sc)}
                ScremoveFav={(sc) => props.ScremoveFavAction(sc)}
              />
            </View>
          )}
        />
        <View style={styles.ScPersonalInfoWrapper}>
          <View style={styles.ScSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.ScPersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              FULL NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.ScPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Your Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
                placeholderTextColor={colors.lightGrey3}
              />
            </View>
          </View>
          <View style={styles.ScSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.ScPersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.ScPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
                placeholderTextColor={colors.lightGrey3}
              />
            </View>
          </View>
          <View style={styles.ScSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.ScPersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              PHONE NUMBER<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.ScPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
                placeholderTextColor={colors.lightGrey3}
              />
            </View>
          </View>
          <View style={styles.ScSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.ScPersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              DELIVERY ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.ScPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: HEIGHT * 0.13}}
                onChangeText={changeAddress}
                multiline
                placeholderTextColor={colors.lightGrey3}
              />
            </View>
          </View>
        </View>
        <Overlay
          onBackdropPress={closeModal}
          isVisible={showModal}
          animationType="fade">
          <View
            style={{
              ...styles.ScModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <MaterialCommunityIcons
              name="bag-personal"
              size={H_W.width * 0.25}
              color="white"
            />
            <Text style={styles.ScModalHeadText}>
              YOUR ORDER HAS BEEN CONFIRMED!
            </Text>
          </View>
        </Overlay>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 20,
          }}>
          <Button
            raised
            loading={loading}
            onPress={ScConfirm}
            disabled={props.ScTotalItems === 0}
            title="CONFIRM ORDER"
            titleStyle={{fontWeight: 'bold', fontSize: 20}}
            containerStyle={{width: '100%', borderRadius: 50}}
            buttonStyle={{
              borderRadius: 50,
              paddingVertical: HEIGHT * 0.02,
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.46,
              shadowRadius: 11.14,
            }}
          />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    ScCart: state.ScCartReducer.items,
    total: state.ScCartReducer.totalAmount,
    ScFavs: state.ScToggleFav,
  };
};
const border = {
  borderWidth: 1,
  borderColor: 'red',
};
export default connect(mapStateToProps, {
  ScUserAction,
  ScresetCart,
  ScsetCurrentProductAction,
  ScsetFavAction,
  ScremoveFavAction,
})(React.memo(ConfirmOrder));

const styles = StyleSheet.create({
  ScContact2: {
    color: colors.primary,
    fontSize: 22,
  },
  ScModalHeadText: {
    fontSize: H_W.width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  ScModalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H_W.width * 0.8,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  Input: {
    width: H_W.width * 0.81,
    color: colors.primary,
    fontWeight: 'bold',
  },
  ScInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.secondary,
  },
  ScPersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightGrey4,
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 1,
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  ScPersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  ScSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  ScPersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
