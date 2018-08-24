
const faker = require('faker');
const momentRandom = require('moment-random');
const makeImagePath = (imagePath) => {
  return process.env.BASE_URL + '/assets' + imagePath;
}
const studios = [
  {
    name: 'Spokehause',
    location: {
      streetNumber: 70,
      streetName: 'Dan Leckie Way',
      unit: null,
      city: 'Toronto',
      state: 'Ontario',
      zipcode: 'M5V 0K1',
      country: 'Canada'
    }
  },
  {
    name: 'Ride Cycle Club',
    location: {
      streetNumber: 2,
      streetName: 'Humber Street',
      unit: null,
      city: 'Toronto',
      state: 'Ontario',
      zipcode: 'M6J 2Y7',
      country: 'Canada'
    }
  },
  {
    name: 'Pure Barre',
    location: {
      streetNumber: 737,
      streetName: 'Queen Street West',
      unit: null,
      city: 'Toronto',
      state: 'Ontario',
      zipcode: 'M6J 1G1',
      country: 'Canada'
    }
  }
];

const levelsList = [
  { 
    level: 'Bronze',
    xpLimit: 1000
  },
  { 
    level: 'Silver',
    xpLimit: 2000
  },
  { 
    level: 'Gold',
    xpLimit: 3000
  },
  { 
    level: 'Platinum',
    xpLimit: 4000
  }
];

const challenges = [
  {
    badgePhoto: makeImagePath('/earlyRiser.png'),
    name: 'Early Riser',
    points: 400,
    rewardName: 'Reserve a Shower',
    badgeDescription: 'Attend 10 morning classes between 6 am - 8:30am'
  },
  {
    badgePhoto: makeImagePath('/beYou.png'),
    name: '#BeYou',
    points: 200,
    rewardName: 'Free Swag',
    badgeDescription: 'Take a photo of yourself working out with the #BeYou on Instagram and tag our studio'
  },
  {
    badgePhoto: makeImagePath('/inviteABuddy.png'),
    name: 'Invite a Buddy',
    points: 300,
    rewardName: 'Priority Booking',
    badgeDescription: 'Bring a friend to the studio for their first class'
  },
  {
    badgePhoto: makeImagePath('/30in30.png'),
    name: '30 in 30',
    points: 500,
    rewardName: 'Towel Service',
    badgeDescription: 'Attend 30 classes within 30 days'
  },
];

const classes = [
  {
    name: 'Intervals 4 Daze'
  },
  {
    name: 'EDM party'
  },
  {
    name: 'Work It Out'
  },
  {
    name: 'Freestylin'
  },
  {
    name: 'Leg Day'
  },
  {
    name: 'Heat It Up'
  },
];

module.exports = function(id) {
  faker.seed(Number(id));

  const points = faker.random.number({ min: 0, max: levelsList[levelsList.length-1].xpLimit});
  const currentLevel = levelsList.find((levelItem, i) => {
    return points < levelItem.xpLimit || i >= levelsList.length-1;
  });
  const obj = {
    id: String(id) ,
    photo: faker.image.avatar(),
    firstName: faker.name.firstName(),
    // lastName: faker.name.lastName(),
    // userName: faker.internet.userName(),
    points: points, 
    level: currentLevel.level,
    levelsList,
    homeStudio: generateStudio(),
    // favClass: faker.random.word(),
    // favInstructor: faker.name.findName(),
    badges:generateBadges(3),
    // pastChallenges: generateChallenges(Math.floor(Math.random() * 5)),
    currentChallenges: generateChallenges(Math.floor(Math.random() * 4), true),
    // pastClasses: generateClasses(Math.floor(Math.random() * 5)),
    upcomingClasses: generateClasses(Math.floor(Math.random() * 5), true),
    // friends: generateFriends(Math.floor(Math.random() * 10))
  }
  return obj;
};

function generateStudio(){
  const randomstudioIndex = (Math.floor(Math.random() * studios.length))
  return studios[randomstudioIndex]
};

function generateBadges(count) {
  const badgesList = [
    {
      badgePhoto: makeImagePath('/bronzeMember.png'),
      badgeName: 'Bronze Member',
      badgeDescription: 'You joined Plum!'
    }
  ];
  for (let i = 0; i < count; i++) {
    const randomBadge = (Math.floor(Math.random() * challenges.length))
    badgesList.push({
      badgePhoto: challenges[randomBadge].badgePhoto,
      badgeName: challenges[randomBadge].name,
      BadgeDescription: challenges[randomBadge].badgeDescription
    });
  };

  return badgesList;
};

// function generateChallenges(count, isFuture) {
  function generateChallenges(count) {
    const challengesList = [
      {
        name: 'Early Riser',
        rewardName: 'Reserve a Shower',
        pointsValue: 400,
        userPoints: 400
      },
      {
        name: '#BeYou',
        rewardName: 'Free Swag',
        pointsValue: 200,
        userPoints: 150,
      },
    ];
    for (let i = 0; i < count; i++) {
      const randomChallengeIndex = (Math.floor(Math.random() * challenges.length))
      const name = challenges[randomChallengeIndex].name;
      const rewardName = challenges[randomChallengeIndex].rewardName;
      const pointsValue = challenges[randomChallengeIndex].points;
      const userPoints = Math.floor(Math.random() * pointsValue) + 1;
      challengesList.push({
            name,
            // achievementId: faker.random.number(),
            // achievementDate: isFuture ? faker.date.future() : faker.date.past(),
            // achievementDate: faker.date.future(),
            rewardName,
            pointsValue,
            userPoints
      });
    };
  
    return challengesList;
  };

// function generateClasses(count, isFuture) {
  function generateClasses(count) {
  const classesList = [
    {
      nameOfClass: 'Leg Day',
      instructor: faker.name.firstName(),  
      date: momentRandom("2018-09-30 23:00", "2018-09-01 10:00")
    }
  ];
  for (let i = 0; i < count; i++) {
    const randomClassIndex = (Math.floor(Math.random() * classes.length))
    const nameOfClass = classes[randomClassIndex].name
    const date = momentRandom("2018-09-30 23:00", "2018-09-01 10:00")
    classesList.push({
      nameOfClass,
      instructor: faker.name.firstName(),
      // date: isFuture ? faker.date.future() : faker.date.past(),  
      date  
    });
  };

  return classesList;
};

// function generateFriends(count) {
//   const friendsList = [];
//   for (let i = 0; i < count; i++) {
//     friendsList.push({
//       photo: faker.image.avatar(),
//       userName: faker.internet.userName(),
//       id: faker.random.number()
//     });
//   };

//   return friendsList;
// };

