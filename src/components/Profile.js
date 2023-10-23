import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: '/v2/user/me',
      });

      console.log(data);
      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>{user_id}</h2>
      <h2>닉네임 : {nickName}</h2>
      <img src={profileImage} style={{ width: '200px', height: '200px' }}></img>
    </div>
  );
};

export default Profile;