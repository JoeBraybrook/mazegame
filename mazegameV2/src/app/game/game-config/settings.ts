export const BLOCK_SIZE = 50;
export const XAXIS = 15;
export const YAXIS = 15;
export const ENEMIES: Array<{
  attributes: {
    name: string;
    x: number;
    y: number;
    height: number;
    width: number;
    attackDamage: number;
  };
}> = [
  {
    attributes: {
      name: 'Blastoise',
      x: 350,
      y: 150,
      height: 300,
      width: 300,
      attackDamage: 100,
    },
  },
  {
    attributes: {
      name: 'charizard',
      x: 350,
      y: 150,
      height: 400,
      width: 400,
      attackDamage: 200,
    },
  },
  {
    attributes: {
      name: 'venusaur',
      x: 350,
      y: 150,
      height: 400,
      width: 400,
      attackDamage: 50,
    },
  },
  {
    attributes: {
      name: 'eternatus',
      x: 350,
      y: 150,
      height: 400,
      width: 400,
      attackDamage: 150,
    },
  },
  {
    attributes: {
      name: 'snorlax',
      x: 350,
      y: 50,
      height: 300,
      width: 300,
      attackDamage: 50,
    },
  },
];

export const DUNGEONS: Array<{
  background: string;
  amulets: [number, number][];
  doors: {
    hasNorthDoor: boolean;
    hasSouthDoor: boolean;
    hasEastDoor: boolean;
    hasWestDoor: boolean;
  };
  hasCoins: boolean;
  passages: {
    northDungeon: number;
    southDungeon: number;
    eastDungeon: number;
    westDungeon: number;
  };
  threats: {
    hasBlastoise: boolean;
    hasCharizard: boolean;
    hasVenusaur: boolean;
    hasEternatus: boolean;
    hasSnorlax: boolean;
  };
}> = [
  //Dungeon 0

  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    doors: {
      hasNorthDoor: true,
      hasSouthDoor: false,
      hasEastDoor: true,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 3,
      southDungeon: 0,
      eastDungeon: 2,
      westDungeon: 1,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
  //Dungeon 1
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    doors: {
      hasNorthDoor: false,
      hasSouthDoor: false,
      hasEastDoor: true,
      hasWestDoor: false,
    },
    passages: {
      northDungeon: 4,
      southDungeon: 0,
      eastDungeon: 0,
      westDungeon: 0,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
  //Dungeon 2
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    doors: {
      hasNorthDoor: false,
      hasSouthDoor: false,
      hasEastDoor: false,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 5,
      southDungeon: 0,
      eastDungeon: 0,
      westDungeon: 0,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
  //Dungeon 3
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: false,
    doors: {
      hasNorthDoor: true,
      hasSouthDoor: true,
      hasEastDoor: true,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 6,
      southDungeon: 0,
      eastDungeon: 5,
      westDungeon: 4,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: true,
    },
  },
  //Dungeon 4
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    doors: {
      hasNorthDoor: false,
      hasSouthDoor: false,
      hasEastDoor: true,
      hasWestDoor: false,
    },
    passages: {
      northDungeon: 7,
      southDungeon: 1,
      eastDungeon: 3,
      westDungeon: 0,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
  //Dungeon 5
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    doors: {
      hasNorthDoor: false,
      hasSouthDoor: false,
      hasEastDoor: false,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 8,
      southDungeon: 2,
      eastDungeon: 0,
      westDungeon: 3,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
  //Dungeon 6
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: false,
    doors: {
      hasNorthDoor: true,
      hasSouthDoor: true,
      hasEastDoor: true,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 9,
      southDungeon: 3,
      eastDungeon: 8,
      westDungeon: 7,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: true,
      hasSnorlax: false,
    },
  },
  //Dungeon 7
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    doors: {
      hasNorthDoor: false,
      hasSouthDoor: false,
      hasEastDoor: true,
      hasWestDoor: false,
    },
    passages: {
      northDungeon: 10,
      southDungeon: 4,
      eastDungeon: 6,
      westDungeon: 0,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
  //Dungeon 8
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    doors: {
      hasNorthDoor: false,
      hasSouthDoor: false,
      hasEastDoor: false,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 11,
      southDungeon: 5,
      eastDungeon: 0,
      westDungeon: 6,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
  //Dungeon 9
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: false,
    doors: {
      hasNorthDoor: true,
      hasSouthDoor: true,
      hasEastDoor: true,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 12,
      southDungeon: 6,
      eastDungeon: 11,
      westDungeon: 10,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
  //Dungeon 10
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: false,
    doors: {
      hasNorthDoor: true,
      hasSouthDoor: false,
      hasEastDoor: true,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 0,
      southDungeon: 7,
      eastDungeon: 9,
      westDungeon: 0,
    },
    threats: {
      hasBlastoise: true,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
  //Dungeon 11
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: false,
    doors: {
      hasNorthDoor: true,
      hasSouthDoor: false,
      hasEastDoor: true,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 0,
      southDungeon: 8,
      eastDungeon: 0,
      westDungeon: 9,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: true,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
  //Dungeon 12
  {
    background: '#1abc9c',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: false,
    doors: {
      hasNorthDoor: false,
      hasSouthDoor: true,
      hasEastDoor: false,
      hasWestDoor: false,
    },
    passages: {
      northDungeon: 0,
      southDungeon: 9,
      eastDungeon: 0,
      westDungeon: 0,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: true,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
];
