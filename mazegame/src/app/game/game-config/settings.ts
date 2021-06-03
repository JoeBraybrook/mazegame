export const XBLOCKS = 25;
export const YBLOCKS = 25;
export const BLOCK_SIZE = 25;
export const DUNGEONS: Array<{
  amulets: [number, number][];
  doors: {
    hasNorthDoor: boolean;
    hasSouthDoor: boolean;
    hasEastDoor: boolean;
    hasWestDoor: boolean;
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
    hasVanusaur: boolean;
    hasEternatus: boolean;
    hasSnorlax: boolean;
  };
}> = [
  {
    amulets: [
      [0, 0],
      [0, 700],
      [700, 0],
      [700, 700],
      [350, 350],
    ],
    doors: {
      hasNorthDoor: true,
      hasSouthDoor: false,
      hasEastDoor: true,
      hasWestDoor: true,
    },
    passages: {
      northDungeon: 4,
      southDungeon: 1,
      eastDungeon: 3,
      westDungeon: 2,
    },
    threats: {
      hasBlastoise: false,
      hasCharizard: false,
      hasVanusaur: false,
      hasEternatus: false,
      hasSnorlax: false,
    },
  },
];
