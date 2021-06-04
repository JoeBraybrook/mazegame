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
      x: 100,
      y: 0,
      height: 600,
      width: 600,
      attackDamage: 100,
    },
  },
  {
    attributes: {
      name: 'charizard',
      x: 250,
      y: 0,
      height: 600,
      width: 600,
      attackDamage: 200,
    },
  },
  {
    attributes: {
      name: 'venusaur',
      x: 100,
      y: 0,
      height: 600,
      width: 600,
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
  {
    attributes: {
      name: 'noEnemy',
      x: 0,
      y: 0,
      height: 0,
      width: 0,
      attackDamage: 0,
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
  coinValue: {
    TopLeft: number;
    TopRight: number;
    Center: number;
    BottomLeft: number;
    BottomRight: number;
  };
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
    hasNoEnemy: boolean;
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
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
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
      hasNoEnemy: true,
    },
  },
  //Dungeon 1
  {
    background: '#fd9644',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
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
      hasNoEnemy: true,
    },
  },
  //Dungeon 2
  {
    background: '#fed330',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
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
      hasNoEnemy: true,
    },
  },
  //Dungeon 3
  {
    background: '#26de81',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
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
      hasNoEnemy: false,
    },
  },
  //Dungeon 4
  {
    background: '#2bcbba',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
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
      hasNoEnemy: true,
    },
  },
  //Dungeon 5
  {
    background: '#eb3b5a',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
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
      hasNoEnemy: true,
    },
  },
  //Dungeon 6
  {
    background: '#8854d0',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
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
      hasNoEnemy: false,
    },
  },
  //Dungeon 7
  {
    background: '#f7b731',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
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
      hasNoEnemy: true,
    },
  },
  //Dungeon 8
  {
    background: '#20bf6b',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
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
      hasNoEnemy: true,
    },
  },
  //Dungeon 9
  {
    background: '#0fb9b1',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
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
      hasNoEnemy: true,
    },
  },
  //Dungeon 10
  {
    background: '#45aaf2',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
    doors: {
      hasNorthDoor: false,
      hasSouthDoor: false,
      hasEastDoor: true,
      hasWestDoor: false,
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
      hasNoEnemy: false,
    },
  },
  //Dungeon 11
  {
    background: '#eb3b5a',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
    doors: {
      hasNorthDoor: false,
      hasSouthDoor: false,
      hasEastDoor: true,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 0,
      southDungeon: 8,
      eastDungeon: 13,
      westDungeon: 9,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: true,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
      hasNoEnemy: false,
    },
  },
  //Dungeon 12
  {
    background: '#20bf6b',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
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
      hasNoEnemy: false,
    },
  },
  //Dungeon 13
  {
    background: '#a5b1c2',
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    hasCoins: true,
    coinValue: {
      TopLeft: 100,
      TopRight: 100,
      Center: 100,
      BottomLeft: 100,
      BottomRight: 100,
    },
    doors: {
      hasNorthDoor: false,
      hasSouthDoor: false,
      hasEastDoor: false,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 0,
      southDungeon: 0,
      eastDungeon: 0,
      westDungeon: 11,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVenusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
      hasNoEnemy: true,
    },
  },
];
