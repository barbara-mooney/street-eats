 import React, { Component } from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux';
import Register from './Register';
import OwnerRegister from './OwnerRegister';
import Login from './Login';
import Map from './Map';
import Owner from './Owner';
import Menu from './Menu';
import OwnerSettings from './OwnerSettings';
import OwnerEditMenu from './OwnerEditMenu';
import OwnerEditItem from './OwnerEditItem';
import OwnerAddItem from './OwnerAddItem';
import OwnerManageReviews from './OwnerManageReviews';
import OwnerReviewItem from './OwnerReviewItem';
import CustomerSettings from './CustomerSettings';
import DescriptionMenu from './DescriptionMenu';
import OwnerMap from './OwnerMap';
import DisplayReview from './DisplayReview';
import ReviewModal from './ReviewModal';
import PasswordResetForm from './PasswordResetForm';
import ResetPassword from './ResetPassword';

export default class Routes extends Component {
    render(){
        return(
        <Router>
            <Stack key='root'>
                <Scene key= 'login' component = { Login }   hideNavBar={true} />
                <Scene key= 'owner' component = { Owner } hideNavBar={true} />
                <Scene key= 'register' component = { Register } hideNavBar={true} />
                <Scene key= 'ownerRegister' component = { OwnerRegister } hideNavBar={true} />
                <Scene key= 'map' component = { Map } initial = {true} hideNavBar={true} />
                <Scene key= 'menu' component = { Menu } hideNavBar={true} />
                <Scene key= 'ownerSettings' component = { OwnerSettings } hideNavBar={true} />
                <Scene key= 'ownerEditMenu' component = { OwnerEditMenu } hideNavBar={true} />
                <Scene key= 'ownerEditItem' component = { OwnerEditItem } hideNavBar={true} />
                <Scene key= 'ownerAddItem' component = { OwnerAddItem } hideNavBar={true} />
                <Scene key= 'ownerManageReviews' component = { OwnerManageReviews } hideNavBar={true} />
                <Scene key= 'ownerReviewItem' component = { OwnerReviewItem } hideNavBar={true} />
                <Scene key= 'customerSettings' component = { CustomerSettings } hideNavBar={true} />
                <Scene key= 'descriptionMenu' component = { DescriptionMenu } hideNavBar={true} />
                <Scene key= 'ownerMap' component = { OwnerMap } hideNavBar={true} />
                <Scene key= 'displayReview' component = { DisplayReview } hideNavBar={true} />
                <Scene key= 'reviewModal' component = { ReviewModal } hideNavBar={true} />
                <Scene key= 'passwordResetForm' component = { PasswordResetForm } hideNavBar={true} />
                <Scene key= 'reset-Password' component = { ResetPassword } hideNavBar={true} />
            </Stack>
        </Router>
        );
    }
}
