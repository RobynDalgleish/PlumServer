const faker = require('faker');

const levelsList = [
  { 
    level: 1,
    xp: 1000
  },
  { 
    level: 2,
    xp: 2000
  },
  { 
    level: 3,
    xp: 3000
  },
  { 
    level: 4,
    xp: 4000
  }
];

module.exports = function(id) {
  faker.seed(Number(id));

  const points = faker.random.number({ min: 0, max: levelsList[levelsList.length-1].xp });
  const currentTier = levelslist.find((levelItem) => {
    return points > levelItem.xp
  });
  const obj = {
    id: id < 10 ? '0' + id : String(id) ,
    photo: faker.image.avatar(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    level: currentTier.level + 1,
    points: points, 
    homeStudio: {
      name: faker.company.companyName(),
      location: {
        streetNumber: faker.random.number(),
        streetName: faker.address.streetName(),
        unit: faker.random.number(),
        city: faker.address.city(),
        state: faker.address.state(),
        zipcode: faker.address.zipCode(),
        country: faker.address.country()
        },
      },
    // favClass: faker.random.word(),
    // favInstructor: faker.name.findName(),
    badges:generateBadges(Math.floor(Math.random() * 10)),
    // pastChallenges: generateChallenges(Math.floor(Math.random() * 5)),
    currentChallenges: generateChallenges(Math.floor(Math.random() * 5), true),
    // pastClasses: generateClasses(Math.floor(Math.random() * 5)),
    upcomingClasses: generateClasses(Math.floor(Math.random() * 5), true),
    friends: generateFriends(Math.floor(Math.random() * 10))
  }
  console.log(points, obj.level)
  return obj;
};

function generateBadges(count) {
  const badgesList = [];
  for (let i = 0; i < count; i++) {
    badgesList.push({
      photo: faker.image.sports(),
      badgeName: faker.random.word()
    });
  };

  return badgesList;
};

// function generateChallenges(count, isFuture) {
  function generateChallenges(count) {
    const challengesList = [];
    for (let i = 0; i < count; i++) {
      const pointsValue = faker.random.number({ min: 100, max: 500 });
      const userPoints = Math.floor(Math.random() * pointsValue);
      challengesList.push({
            achievementName: faker.random.word(),
            // achievementId: faker.random.number(),
            // achievementDate: isFuture ? faker.date.future() : faker.date.past(),
            // achievementDate: faker.date.future(),
            pointsValue,
            userPoints
      });
    };
  
    return challengesList;
  };

// function generateClasses(count, isFuture) {
  function generateClasses(count) {
  const classesList = [];
  for (let i = 0; i < count; i++) {
    classesList.push({
      nameOfClass: faker.random.word(),
      instructor: faker.name.findName(),
      // date: isFuture ? faker.date.future() : faker.date.past(),  
      date: faker.date.future(),  
    });
  };

  return classesList;
};

function generateFriends(count) {
  const friendsList = [];
  for (let i = 0; i < count; i++) {
    friendsList.push({
      photo: faker.image.avatar(),
      userName: faker.internet.userName(),
      id: faker.random.number()
    });
  };

  return friendsList;
};

