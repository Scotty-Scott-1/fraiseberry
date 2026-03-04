export const createMockDiscoverUser = ({
  userId = 1,
  email = "test@test.com",
  password = "Test123456!",
  agree = true,
  isVerified = true,
  isBot = false,

  profileId = 1,
  profileName = "Bob",
  profileAge = 30,
  profileGender = "male",
  profileBio = null,
  latitude = 0,
  longitude = 0,

  prefPreferredGender = "female",
  prefAgeMin = 18,
  prefAgeMax = 30,
  prefMaxDistance = 100

} = {}) => {

  return {
    id: userId,
    email: email,
    password: password,
    agree: agree,
    isVerified: isVerified,
    isBot: isBot,
    verificationToken: null,
    tokenExpiry: null,
    mfaSecret: null,
    mfaEnabled: false,

    profile: {
      id: profileId,
      userId: userId,
      name: profileName,
      age: profileAge,
      gender: profileGender,
      bio: profileBio,
      profilePic: null,
      supportingPic1: null,
      supportingPic2: null,
      supportingPic3: null,
      latitude: latitude,
      longitude: longitude,
    },
    preferences: {
      id: 1,
      userId: userId,
      preferredGender: prefPreferredGender,
      ageRangeMin: prefAgeMin,
      ageRangeMax: prefAgeMax,
      maxDistanceKm: prefMaxDistance
    }
  };
};

export const createMockLikedUsers = (likedIds = []) => {
  return likedIds.map(id => ({
    likedId: id
  }));
};

export const createMockMatches = (pairs = []) => {

  return pairs.map(pair => ({
    userAId: pair[0],
    userBId: pair[1]
  }));

};

export const createMockProfiles = (profiles = []) => {

  return profiles.map(p => {

    const profile = {
      id: p.id ?? Math.floor(Math.random() * 10000),
      userId: p.userId ?? 1,
      name: p.name ?? "Bob",
      age: p.age ?? 25,
      gender: p.gender ?? "male",
      bio: p.bio ?? null,
      profilePic: null,
      supportingPic1: null,
      supportingPic2: null,
      supportingPic3: null,
      latitude: p.latitude ?? 0,
      longitude: p.longitude ?? 0,

      toJSON() {
        return {
          id: this.id,
          userId: this.userId,
          name: this.name,
          age: this.age,
          gender: this.gender,
          bio: this.bio,
          profilePic: this.profilePic,
          supportingPic1: this.supportingPic1,
          supportingPic2: this.supportingPic2,
          supportingPic3: this.supportingPic3,
          latitude: this.latitude,
          longitude: this.longitude
        };
      }
    };

    return profile;
  });
};
