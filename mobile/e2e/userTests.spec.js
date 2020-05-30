// const {reloadApp}=require('detox-expo-helpers');

// describe('UserFlow', () => {
//   // before(async () => {
//   //   await reloadApp();
//   // });

//   it('should launch app with location permission', async () => {
//    await device.launchApp({Permissions: {location: 'inuse'}});
//   });
  
//   it('should login successfully', async () => {
//     const burger = await element(by.id('hamburger'));
//     burger.tap();
//     const login = await element(by.id('login_button'));
//     login.tap();
//     const email = await element(by.id('email'));
//     email.typeText('t');
//     const password = await element(by.id('password'));
//     password.typeText('t');
//     const login_owner = await element(by.id('login_owner'));
//     login_owner.tap();
//     await element(by.type('MapView'));
//   });

//   it('should show trucks on map', async () => {
//     const foodtruck_marker = await element(by.id('foodtruck_marker'));
//     foodtruck_marker.tap();
//     await element(by.type('TouchableOpacity'));
//   });

//   it('should display detailed menu item', async () => {
//     await element(by.id('food_item_desc'));
//     const TouchableOpacity = await element(by.type('TouchableOpacity'));
//     TouchableOpacity.tap();
//     const gobacktomenu_btn = await element(by.id('gobacktomenu_btn'));
//     gobacktomenu_btn.tap();
//     await element(by.id('food_item_desc'));
//   });
// });
