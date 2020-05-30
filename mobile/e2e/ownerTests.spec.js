const {reloadApp}=require('detox-expo-helpers');

describe('OwnerFlow', () => {
  before(async () => {
    await reloadApp();
  });

  // it('should launch app with location permission', async () => {
  //  await device.launchApp({Permissions: {location: 'inuse'}});
  // //  await element(by.text('Allow While Using App')).tap();
  // //  done();
  // });

  it('should login successfully', async () => {
    const burger = await element(by.id('hamburger'));
    burger.tap();
    const login = await element(by.id('login_button'));
    login.tap();
    // const email = await element(by.id('email'));
    // email.typeText('t');
    // const password = await element(by.id('password'));
    // password.typeText('t');
    // const login_owner = await element(by.id('login_owner'));
    // login_owner.tap();
    // await element(by.type('MapView'));
  });

//   it('should broadcast food truck', async () => {
//     const burger = await element(by.id('hamburger'));
//     burger.tap();
//     const linktobroadcastpage = await element(by.id('linktobroadcastpage'));
//     linktobroadcastpage.tap();
//     const Switch = await element(by.type('Switch'));
//     Switch.tap();
//  });

});
