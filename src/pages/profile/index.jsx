import React, {Component} from "react";
import ProfileTitle from "./ProfileTitle";
import ProfileMenu from "./ProfileMenu";
class Profile extends Component {
  render() {
    return (
      <div className="profile profile-page text-uppercase">
        <ProfileTitle />
        <ProfileMenu />
      </div>
    );
  }
}

export default Profile;
