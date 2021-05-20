/* data.js */
//           ["BANK", "BORDER", "CHALET", "CLUBHOUSE", "COASTLINE", "CONSULATE", "KAFE DOSTOYEVSKY", "KANAL", "OREGON", "SKYSCRAPER", "THEME PARK", "VILLA"],
module.exports = {
  MAP_NAMES: ["BANK", "BORDER", "CHALET", "CLUBHOUSE", "COASTLINE", "CONSULATE", "KAFE DOSTOYEVSKY", "KANAL", "OREGON", "SKYSCRAPER", "THEME PARK", "VILLA"],
  SITES: {
    "BANK": ["B Lockers/B CCTV Room", "1F Teller's Office/1F Archives", "1F Staff Room/1F Open Area", "2F Executive Lounge/2F CEO Office"],
    "BORDER": ["1F Customs Inspection/1F Supply Room", "1F Ventilation Room/1F Workshop", "1F Bathroom/1F Tellers", "2F Armory Lockers/2F Archives"],
    "CHALET": ["B Wine Cellar/B Snowmobile Garage", "1F Bar/1F Gaming Room", "1F Dining Room/1F Kitchen", "2F Master Bedroom/2F Office"],
    "CLUBHOUSE": ["B Church/B Armory", "1F Bar/1F Stock Room", "2F Cash Room/2F CCTV", "2F Gym/2F Master Bedroom"],
    "COASTLINE": ["1F Kitchen/1F Service Entrace", "1F Sunrise Bar/1F Blue Bar", "2F Hookah Lounge/2F Billiards Room", "2F Penthouse/2F Theater"],
    "CONSULATE": ["B Garage/B Cafeteria", "B Archives/1F Tellers", "1F Lobby/1F Press Room", "2F Consul Office/2F Meeting Room"],
    "KAFE DOSTOYEVSKY": ["1F Kitchen Cooking/1F Kitchen Service", "2F Fireplace Hall/2F Mining Room", "2F Fireplace Hall/2F Reading Room", "3F Cocktail Bar/3F Bar"],
    "KANAL": ["B Supply Room/B Kayaks", "1F Coast Guard Meeting Room/1F Lounge", "1F Security Room/1F Maps Room", "2F Radar Room/2F Server Room"],
    "OREGON": ["B Laundry/B Supply Room", "1F Kitchen/1F Dining Room", "1F Kitchen/1F Meeting Room", "2F Kid's Dorm/2F Dorms Main Hall"],
    "SKYSCRAPER": ["1F Kitchen/1F BBQ", "1F Bedroom/1F Bathroom", "2F Tea Room/2F Karaoke", "2F Exhibition Room/2F Office"],
    "THEME PARK": ["1F Armory Room/1F Throne Room", "1F Lab/1F Storage", "2F Office/2F Initiation Room", "2F Bunk/2F Day Care"],
    "VILLA": ["1F Living Room/1F Library", "1F Kitchen/1F Dining Room", "2F Trophy Room/2F Statuary Room", "2F Aviator Room/2F Games Room"]
  },
  FLOORS: {
    "BANK": ["Basement", "First Floor", "Second Floor"],
    "BORDER": ["First Floor", "Second Floor"],
    "CHALET": ["Basement", "First Floor", "Second Floor"],
    "CLUBHOUSE": ["Basement", "First Floor", "Second Floor"],
    "COASTLINE": ["First Floor", "Second Floor"],
    "CONSULATE": ["Basement", "First Floor", "Second Floor"],
    "KAFE DOSTOYEVSKY": ["First Floor", "Second Floor", "Third Floor"],
    "KANAL": ["Basement", "First Floor", "Second Floor"],
    "OREGON": ["Basement", "First Floor", "Second Floor", "Tier 3"],
    "SKYSCRAPER": ["First Floor", "Second Floor"],
    "THEME PARK": ["First Floor", "Second Floor"],
    "VILLA": ["Basement", "First Floor", "Second Floor"]
  },
  GADGETS: {
    "SLEDGE": {
      gadget: "Sledgehammer",
      count: 25
    },
    "THATCHER": {
      gadget: "EMP Grenade",
      count: 3
    },
    "SMOKE": {
      gadget: "Remote Gas Grenade",
      count: 3
    },
    "MUTE": {
      gadget: "Signal Disruptor",
      count: 4
    },
    "ASH": {
      gadget: "Breaching Round",
      count: 3
    },
    "THERMITE": {
      gadget: "Exothermic Charge",
      count: 2
    },
    "CASTLE": {
      gadget: "Armored Panel",
      count: 3
    },
    "PULSE": {
      gadget: "Cardiac Sensor",
      count: 0
    },
    "GLAS": {
      gadget: "Flip Sight",
      count: 0
    },
    "FUZE": {
      gadget: "Cluster Charge",
      count: 4
    },
    "KAPKAN": {
      gadget: "Entry Denial Device",
      count: 5
    },
    "TACHANKA": {
      gadget: "Shumikha",
      count: 10
    },
    "BLITZ": {
      gadget: "Flash Shield",
      count: 0
    },
    "IQ": {
      gadget: "Electronics Detector",
      count: 0
    },
    "JAGER": {
      gadget: "Active Defense System",
      count: 3
    },
    "BANDIT": {
      gadget: "Shock Wire",
      count: 4
    },
    "TWITCH": {
      gadget: "Shock Drone",
      count: 2
    },
    "MONTAGNE": {
      gadget: "Extendable Shield",
      count: 0
    },
    "DOC": {
      gadget: "Stim Pistol",
      count: 0
    },
    "ROOK": {
      gadget: "Armor Pack",
      count: 0
    },
    "FROST": {
      gadget: "Welcome Mat",
      count: 3
    },
    "BUCK": {
      gadget: "Skeleton Key",
      count: 16
    },
    "VALKYRIE": {
      gadget: "Black Eye",
      count: 3
    },
    "BLACKBEARD": {
      gadget: "Rifle Shield",
      count: 0
    },
    "CAPITAO": {
      gadget: "Tactical Crossbow",
      count: 4
    },
    "CAVEIRA": {
      gadget: "Silent Step",
      count: 0
    },
    "ECHO": {
      gadget: "Yokai Drone",
      count: 2
    },
    "HIBANA": {
      gadget: "X-Kairos Pellets",
      count: 9
    },
    "JACKAL": {
      gadget: "Eyenox Model III",
      count: 0
    },
    "MIRA": {
      gadget: "Black Mirror",
      count: 2
    },
    "LESION": {
      gadget: "Gu Mine",
      count: 8
    },
    "YING": {
      gadget: "Candela",
      count: 3
    },
    "ELA": {
      gadget: "Grzmot Mine",
      count: 3
    },
    "ZOFIA": {
      gadget: "KS79 Lifeline",
      count: 4
    },
    "DOKKAEBI": {
      gadget: "Logic Bomb",
      count: 0
    },
    "VIGIL": {
      gadget: "ERC-7",
      count: 0
    },
    "FINKA": {
      gadget: "Adrenal Surge",
      count: 0
    },
    "LION": {
      gadget: "EE-ONE-D",
      count: 0
    },
    "ALIBI": {
      gadget: "Prisma",
      count: 3
    },
    "MAESTRO": {
      gadget: "Evil Eye",
      count: 2
    },
    "MAVERICK": {
      gadget: "Breaching Torch",
      count: 0
    },
    "CLASH": {
      gadget: "CCE Shield",
      count: 0
    },
    "KAID": {
      gadget: "RTILA Electroclaw",
      count: 2
    },
    "NOMAD": {
      gadget: "Airjab",
      count: 3
    },
    "GRIDLOCK": {
      gadget: "Trax Stinger",
      count: 3
    },
    "MOZZIE": {
      gadget: "Pest",
      count: 3
    },
    "WARDEN": {
      gadget: "GLANCE SMART GLASSES",
      count: 0
    },
    "NOKK": {
      gadget: "Hel Presence Reduction",
      count: 0
    },
    "GOYO": {
      gadget: "Volcan Shield",
      count: 2
    },
    "AMARU": {
      gadget: "Garra Hook",
      count: 0
    },
    "KALI": {
      gadget: "LV Explosive Lance",
      count: 3
    },
    "WAMAI": {
      gadget: "Mag-net System",
      count: 4
    },
    "IANA": {
      gadget: "Gemini Replicator",
      count: 0
    },
    "ORYX": {
      gadget: "Remah Dash",
      count: 0
    },
    "MELUSI": {
      gadget: "Banshee Sonic Defense",
      count: 3
    },
    "ACE": {
      gadget: "SELMA Aqua Breacher",
      count: 3
    },
    "ZERO": {
      gadget: "Argus Launcher",
      count: 4
    },
    "ARUNI": {
      gadget: "Surya Gate",
      count: 3
    },
    "FLORES": {
      gadget: "RCE Ratero Charge",
      count: 2
    }
  },
  ATTACKER_ROLES: ["NONE", "HARD BREACH", "SOFT BREACH", "ENTRY FRAG", "AREA DENIAL/FLANK WATCH", "INTEL", "UTILIY CLEAR", "SUPPORT", "ROAM CLEAR"],
  ATTACKER_ROLE_GUIDE: {
    "ACE": "HARD BREACH",
    "AMARU": "ENTRY FRAG",
    "ASH": "UTILITY CLEAR",
    "BLACKBEARD": "SUPPORT",
    "BLITZ": "ENTRY FRAG",
    "BUCK": "SOFT BREACH",
    "CAPITAO": "AREA DENIAL/FLANK WATCH",
    "DOKKAEBI": "ROAM CLEAR",
    "FINKA": "SUPPORT",
    "FLORES": "INTEL",
    "FUZE": "UTILITY CLEAR",
    "GLAZ": "SUPPORT",
    "GRIDLOCK": "AREA DENIAL/FLANK WATCH",
    "HIBANA": "HARD BREACH",
    "IANA": "INTEL",
    "IQ": "INTEL",
    "JACKAL": "ROAM CLEAR",
    "KALI": "UTILITY CLEAR",
    "LION": "ROAM CLEAR",
    "MAVERICK": "HARD BREACH",
    "MONTAGNE": "SUPPORT",
    "NOKK": "ENTRY FRAG",
    "NOMAD": "AREA DENIAL/FLANK WATCH",
    "SLEDGE": "SOFT BREACH",
    "THATCHER": "UTILITY CLEAR",
    "THERMITE": "HARD BREACH",
    "TWITCH": "UTILITY CLEAR",
    "YING": "SUPPORT",
    "ZERO": "INTEL",
    "ZOFIA": "UTILITY CLEAR"
  },
  ATTACKERS: ["ACE", "AMARU", "ASH", "BLACKBEARD", "BLITZ", "BUCK", "CAPITAO", "DOKKAEBI", "FINKA", "FLORES", "FUZE", "GLAZ", "GRIDLOCK", "HIBANA", "IANA", "IQ", "JACKAL", "KALI", "LION", "MAVERICK", "MONTAGNE", "NOKK", "NOMAD", "SLEDGE", "THATCHER", "THERMITE", "TWITCH", "YING", "ZERO", "ZOFIA"],
  DEFENDER_ROLES: ["NONE", "HARD BREACH DENIAL", "INTEL DENIAL", "INTEL", "AREA DENIAL", "TRAPS", "UTILITY SOAK", "SUPPORT", "ROAM"],
  DEFENDER_ROLE_GUIDE: {
    "ALIBI": "ROAM",
    "ARUNI": "UTILITY SOAK",
    "BANDIT": "HARD BREACH DENIAL",
    "CASTLE": "UTILITY SOAK",
    "CAVEIRA": "ROAM",
    "CLASH": "AREA DENIAL",
    "DOC": "SUPPORT",
    "ECHO": "INTEL",
    "ELA": "TRAPS",
    "FROTS": "TRAPS",
    "GOYO": "UTILITY SOAK",
    "JAGER": "UTILITY SOAK",
    "KAID": "HARD BREACH DENIAL",
    "KAPKAN": "TRAPS",
    "LESION": "TRAPS",
    "MAESTRO": "INTEL",
    "MELUSI": "AREA DENIAL",
    "MIRA": "AREA DENIAL",
    "MOZZIE": "INTEL DENIAL",
    "MUTE": "INTEL DENIAL",
    "ORYX": "ROAM",
    "PULSE": "INTEL",
    "ROOK": "SUPPORT",
    "SMOKE": "AREA DENIAL",
    "TACHANKA": "AREA DENIAL",
    "VALKYRIE": "INTEL",
    "VIGIL": "ROAM",
    "WAMAI": "UTILITY SOAK",
    "WARDEN": "SUPPORT"
  },
  DEFENDERS: ["ALIBI", "ARUNI", "BANDIT", "CASTLE", "CAVEIRA", "CLASH", "DOC", "ECHO", "ELA", "FROST", "GOYO", "JAGER", "KAID", "KAPKAN", "LESION", "MAESTRO", "MELUSI", "MIRA", "MOZZIE", "MUTE", "ORYX", "PULSE", "ROOK","SMOKE", "TACHANKA", "VALKYRIE", "VIGIL", "WAMAI", "WARDEN"],
  MAPS: ["BANK", "BORDER", "CHALET", "CLUBHOUSE", "COASTLINE", "CONSULATE", "KAFE DOSTOYEVSKY", "KANAL", "OREGON", "OUTBACK", "THEME PARK", "VILLA"],
  UTILITY: {
    attack: {
      "OPERATOR": ["BREACH CHARGES", "CLAYMORE", "FRAG GRENADES", "HARD BREACH CHARGE", "SMOKE GRENADES", "STUN GRENADES"],
      "SLEDGE": ["FRAG GRENADES", "STUN GRENADES"],
      "THATCHER": ["BREACH CHARGES", "CLAYMORE"],
      "ASH": ["BREACH CHARGES", "CLAYMORE"],
      "THERMITE": ["SMOKE GRENADES", "STUN GRENADES"],
      "TWITCH": ["CLAYMORE", "SMOKE GRENADES"],
      "MONTAGNE": ["HARD BREACH CHARGE", "SMOKE GRENADES"],
      "BLITZ": ["BREACH CHARGES", "SMOKE GRENADES"],
      "IQ": ["BREACH CHARGES", "CLAYMORE"],
      "GLAZ": ["FRAG GRENADES", "SMOKE GRENADES"],
      "FUZE": ["BREACH CHARGES", "HARD BREACH CHARGE"],
      "BUCK": ["HARD BREACH CHARGE", "STUN GRENADES"],
      "BLACKBEARD": ["BREACH CHARGES", "STUN GRENADES"],
      "CAPITAO": ["CLAYMORE", "HARD BREACH CHARGE"],
      "HIBANA": ["BREACH CHARGES", "STUN GRENADES"],
      "JACKAL": ["CLAYMORE", "SMOKE GRENADES"],
      "YING": ["HARD BREACH CHARGE", "SMOKE GRENADES"],
      "ZOFIA": ["BREACH CHARGES", "CLAYMORE"],
      "DOKKAEBI": ["SMOKE GRENADES", "STUN GRENADES"],
      "LION": ["CLAYMORE", "STUN GRENADES"],
      "FINKA": ["HARD BREACH CHARGE", "STUN GRENADES"],
      "MAVERICK": ["CLAYMORE", "FRAG GRENADES"],
      "NOMAD": ["BREACH CHARGES", "STUN GRENADES"],
      "GRIDLOCK": ["BREACH CHARGES", "SMOKE GRENADES"],
      "NOKK": ["HARD BREACH CHARGE", "FRAG GRENADES"],
      "AMARU": ["HARD BREACH CHARGE", "STUN GRENADES"],
      "KALI": ["BREACH CHARGES", "CLAYMORE"],
      "IANA": ["FRAG GRENADES", "SMOKE GRENADES"],
      "ACE": ["BREACH CHARGES", "CLAYMORE"],
      "ZERO": ["CLAYMORE", "HARD BREACH CHARGE"],
      "FLORES": ["CLAYMORE", "STUN GRENADES"]
    },
    defense: {
      "OPERATOR": ["BARBED WIRE", "BULLETPROOF CAMERA", "DEPLOYABLE SHIELD", "IMPACT GRENADES", "NITRO CELL", "PROXIMITY ALARMS"],
      "SMOKE": ["BARBED WIRE", "DEPLOYABLE SHIELD"],
      "MUTE": ["BULLETPROOF CAMERA", "NITRO CELL"],
      "CASTLE": ["BULLETPROOF CAMERA", "PROXIMITY ALARMS"],
      "PULSE": ["BARBED WIRE", "NITRO CELL"],
      "DOC": ["BARBED WIRE", "BULLETPROOF CAMERA"],
      "ROOK": ["IMPACT GRENADES", "PROXIMITY ALARMS"],
      "KAPKAN": ["IMPACT GRENADES", "NITRO CELL"],
      "TACHANKA": ["BARBED WIRE", "PROXIMITY ALARMS"],
      "JAGER": ["BARBED WIRE", "BULLETPROOF CAMERA"],
      "BANDIT": ["BARBED WIRE", "NITRO CELL"],
      "FROST": ["BULLETPROOF CAMERA", "DEPLOYABLE SHIELD"],
      "VALKYRIE": ["IMPACT GRENADES", "NITRO CELL"],
      "CAVEIRA": ["IMPACT GRENADES", "PROXIMITY ALARMS"],
      "ECHO": ["DEPLOYABLE SHIELD", "IMPACT GRENADES"],
      "MIRA": ["NITRO CELL", "PROXIMITY ALARMS"],
      "LESION": ["BULLETPROOF CAMERA", "IMPACT GRENADES"],
      "ELA": ["BARBED WIRE", "DEPLOYABLE SHIELD"],
      "VIGIL": ["BULLETPROOF CAMERA", "IMPACT GRENADES"],
      "MAESTRO": ["BARBED WIRE", "IMPACT GRENADES"],
      "ALIBI": ["DEPLOYABLE SHIELD", "IMPACT GRENADES"],
      "CLASH": ["BARBED WIRE", "IMPACT GRENADES"],
      "KAID": ["BARBED WIRE", "NITRO CELL"],
      "MOZZIE": ["BARBED WIRE", "NITRO CELL"],
      "WARDEN": ["DEPLOYABLE SHIELD", "NITRO CELL"],
      "GOYO": ["NITRO CELL", "PROXIMITY ALARMS"],
      "WAMAI": ["IMPACT GRENADES", "PROXIMITY ALARMS"],
      "ORYX": ["BARBED WIRE", "PROXIMITY ALARMS"],
      "MELUSI": ["IMPACT GRENADES", "NITRO CELL"],
      "ARUNI": ["BULLETPROOF CAMERA", "BARBED WIRE"]
    }
  },
  UTILITY_GUIDE: {
    "BREACH CHARGES": 3,
    "CLAYMORE": 1,
    "FRAG GRENADES": 2,
    "HARD BREACH CHARGE": 1,
    "SMOKE GRENADES": 2,
    "STUN GRENADES": 3,
    "BARBED WIRE": 2,
    "BULLETPROOF CAMERA": 1,
    "DEPLOYABLE SHIELD": 1,
    "IMPACT GRENADES": 2,
    "NITRO CELL": 1,
    "PROXIMITY ALARMS": 2
  },
  CURRENT_SEASON: "crimson_heist",
  RANKS: {
    "None": 0,
    "Silver III": 2300,
    "Silver II": 2400,
    "Silver I": 2500,
    "Gold III": 2600,
    "Gold II": 2800,
    "Gold I": 3000,
    "Platinum III": 3200,
    "Platinum II": 3600,
    "Platinum I": 4000,
    "Diamond": 4400
  },
  MMR_THRESHOLDS: {
    0: "None",
    2300: "Silver III",
    2400: "Silver II",
    2500: "Silver I",
    2600: "Gold III",
    2800: "Gold II",
    3000: "Gold I",
    3200: "Platinum III",
    3600: "Platinum II",
    4000: "Platinum I",
    4400: "Diamond"
  },
  CANVAS_WIDTH: 900,
  CANVAS_HEIGHT: 480,
  SNAPS: {
    "BANK": {
      0: [
        {
          x0: 359,
          x: 478,
          y0: 253,
          y: 337,
          locations: [
            {
              x: 364,
              y: 279
            },
            {
              x: 364,
              y: 297
            },
            {
              x: 386,
              y: 332
            },
            {
              x: 408,
              y: 332
            },
            {
              x: 473,
              y: 322
            },
            {
              x: 473,
              y: 302
            },
            {
              x: 473,
              y: 278
            },
            {
              x: 473,
              y: 258
            }
          ]
        },
        {
          x0: 483,
          x: 625,
          y0: 234,
          y: 377,
          locations: [
            {
              x: 488,
              y: 372
            },
            {
              x: 520,
              y: 321
            },
            {
              x: 520,
              y: 302
            },
            {
              x: 520,
              y: 277
            },
            {
              x: 520,
              y: 258
            },
            {
              x: 579,
              y: 239
            },
            {
              x: 620,
              y: 253
            }
          ]
        }
      ],
      1: [
        {
          x0: 177,
          x: 344,
          y0: 251,
          y: 371,
          locations: [
            {
              x: 182,
              y: 295
            },
            {
              x: 204,
              y: 295
            },
            {
              x: 255,
              y: 295
            },
            {
              x: 273,
              y: 295
            },
            {
              x: 290,
              y: 305
            },
            {
              x: 290,
              y: 326
            },
            {
              x: 339,
              y: 256
            },
            {
              x: 309,
              y: 366
            }
          ]
        },
        {
          x0: 278,
          x: 473,
          y0: 143,
          y: 305,
          locations: [
            {
              x: 404,
              y: 207
            },
            {
              x: 404,
              y: 187
            },
            {
              x: 383,
              y: 300
            },
            {
              x: 405,
              y: 300
            },
            {
              x: 468,
              y: 148
            },
            {
              x: 468,
              y: 167
            },
            {
              x: 468,
              y: 187
            },
            {
              x: 468,
              y: 207
            }
          ]
        },
        {
          x0: 467,
          x: 553,
          y0: 252,
          y: 397,
          locations: [
            {
              x: 472,
              y: 318
            },
            {
              x: 520,
              y: 281
            },
            {
              x: 490,
              y: 257
            },
            {
              x: 512,
              y: 257
            },
            {
              x: 533,
              y: 257
            },
            {
              x: 548,
              y: 268
            },
            {
              x: 548,
              y: 288
            },
            {
              x: 548,
              y: 312
            },
            {
              x: 548,
              y: 366
            },
            {
              x: 548,
              y: 392
            }
          ]
        },
        {
          x0: 556,
          x: 672,
          y0: 185,
          y: 385,
          locations: [
            {
              x: 609,
              y: 190
            },
            {
              x: 572,
              y: 255
            },
            {
              x: 591,
              y: 255
            },
            {
              x: 607,
              y: 255
            },
            {
              x: 628,
              y: 255
            },
            {
              x: 666,
              y: 257
            },
            {
              x: 667,
              y: 278
            },
            {
              x: 561,
              y: 380
            },
            {
              x: 584,
              y: 380
            },
            {
              x: 602,
              y: 380
            }
          ]
        }
      ],
      2: [
        {
          x0: 341,
          x: 454,
          y0: 264,
          y: 406,
          locations: [
            {
              x: 346,
              y: 364
            },
            {
              x: 360,
              y: 289
            },
            {
              x: 360,
              y: 269
            },
            {
              x: 449,
              y: 401
            },
            {
              x: 399,
              y: 310
            },
            {
              x: 425,
              y: 310
            },
            {
              x: 445,
              y: 310
            }
          ]
        },
        {
          x0: 384,
          x: 473,
          y0: 172,
          y: 246,
          locations: [
            {
              x: 389,
              y: 240
            },
            {
              x: 389,
              y: 220
            },
            {
              x: 468,
              y: 177
            },
            {
              x: 468,
              y: 198
            },
            {
              x: 468,
              y: 241
            }
          ]
        },
        {
          x0: 483,
          x: 557,
          y0: 144,
          y: 256,
          locations: [
            {
              x: 488,
              y: 251
            },
            {
              x: 507,
              y: 251
            },
            {
              x: 523,
              y: 251
            },
            {
              x: 543,
              y: 251
            },
            {
              x: 552,
              y: 149
            },
            {
              x: 552,
              y: 169
            },
            {
              x: 552,
              y: 223
            },
            {
              x: 552,
              y: 243
            }
          ]
        },
        {
          x0: 445,
          x: 531,
          y0: 265,
          y: 406,
          locations: [
            {
              x: 497,
              y: 283
            },
            {
              x: 497,
              y: 333
            },
            {
              x: 450,
              y: 401
            },
            {
              x: 485,
              y: 366
            },
            {
              x: 507,
              y: 366
            },
            {
              x: 526,
              y: 366
            },
            {
              x: 469,
              y: 290
            },
            {
              x: 469,
              y: 270
            }
          ]
        }
      ]
    },
    "BORDER": {
      0: [
        {
          x0: 213,
          x: 345,
          y0: 192,
          y: 366,
          locations: [
            {
              x: 218,
              y: 341
            },
            {
              x: 218,
              y: 361
            },
            {
              x: 284,
              y: 197
            },
            {
              x: 284,
              y: 221
            },
            {
              x: 284,
              y: 244
            },
            {
              x: 284,
              y: 264
            },
            {
              x: 284,
              y: 284
            },
            {
              x: 325,
              y: 283
            },
            {
              x: 340,
              y: 283
            }
          ]
        },
        {
          x0: 311,
          x: 477,
          y0: 75,
          y: 254,
          locations: [
            {
              x: 316,
              y: 80
            },
            {
              x: 316,
              y: 100
            },
            {
              x: 316,
              y: 120
            },
            {
              x: 316,
              y: 140
            },
            {
              x: 381,
              y: 249
            },
            {
              x: 390,
              y: 192
            },
            {
              x: 431,
              y: 192
            },
            {
              x: 452,
              y: 192
            },
            {
              x: 472,
              y: 192
            }
          ]
        },
        {
          x0: 417,
          x: 600,
          y0: 217,
          y: 367,
          locations: [
            {
              x: 422,
              y: 340
            },
            {
              x: 422,
              y: 362
            },
            {
              x: 484,
              y: 337
            },
            {
              x: 484,
              y: 361
            },
            {
              x: 528,
              y: 254
            },
            {
              x: 595,
              y: 254
            },
            {
              x: 514,
              y: 242
            },
            {
              x: 514,
              y: 222
            }
          ]
        },
        {
          x0: 478,
          x: 600,
          y0: 103,
          y: 210,
          locations: [
            {
              x: 514,
              y: 205
            },
            {
              x: 483,
              y: 173
            },
            {
              x: 483,
              y: 152
            },
            {
              x: 483,
              y: 128
            },
            {
              x: 483,
              y: 108
            },
            {
              x: 544,
              y: 148
            },
            {
              x: 578,
              y: 161
            },
            {
              x: 595,
              y: 161
            }
          ]
        }
      ],
      1: [
        {
          x0: 254,
          x: 355,
          y0: 149,
          y: 365,
          locations: [
            {
              x: 280,
              y: 236
            },
            {
              x: 302,
              y: 236
            },
            {
              x: 349,
              y: 254
            },
            {
              x: 350,
              y: 360
            },
            {
              x: 259,
              y: 187
            },
            {
              x: 283,
              y: 187
            },
            {
              x: 333,
              y: 176
            },
            {
              x: 315,
              y: 154
            },
            {
              x: 315,
              y: 176
            }
          ]
        },
        {
          x0: 383,
          x: 489,
          y0: 198,
          y: 345,
          locations: [
            {
              x: 388,
              y: 285
            },
            {
              x: 409,
              y: 285
            },
            {
              x: 451,
              y: 285
            },
            {
              x: 472,
              y: 285
            },
            {
              x: 484,
              y: 297
            },
            {
              x: 484,
              y: 319
            },
            {
              x: 484,
              y: 340
            },
            {
              x: 409,
              y: 236
            },
            {
              x: 409,
              y: 203
            }
          ]
        },
        {
          x0: 404,
          x: 555,
          y0: 84,
          y: 163,
          locations: [
            {
              x: 409,
              y: 89
            },
            {
              x: 409,
              y: 143
            },
            {
              x: 424,
              y: 158
            },
            {
              x: 449,
              y: 113
            },
            {
              x: 468,
              y: 158
            },
            {
              x: 498,
              y: 158
            },
            {
              x: 527,
              y: 118
            },
            {
              x: 550,
              y: 151
            }
          ]
        },
        {
          x0: 477,
          x: 588,
          y0: 182,
          y: 291,
          locations: [
            {
              x: 482,
              y: 203
            },
            {
              x: 567,
              y: 187
            },
            {
              x: 500,
              y: 286
            },
            {
              x: 562,
              y: 286
            },
            {
              x: 583,
              y: 200
            },
            {
              x: 583,
              y: 221
            },
            {
              x: 583,
              y: 242
            }
          ]
        }
      ]
    },
    "CHALET": {
      0: [
        {
          x0: 443,
          x: 453,
          y0: 0,
          y: 67,
          locations: [
            {
              x: 448,
              y: 3
            },
            {
              x: 448,
              y: 22
            },
            {
              x: 448,
              y: 43
            },
            {
              x: 448,
              y: 62
            }
          ]
        },
        {
          x0: 450,
          x: 478,
          y0: 321,
          y: 454,
          locations: [
            {
              x: 473,
              y: 449
            },
            {
              x: 455,
              y: 449
            },
            {
              x: 471,
              y: 356
            },
            {
              x: 460,
              y: 346
            },
            {
              x: 460,
              y: 326
            },
          ]
        },
        {
          x0: 502,
          x: 582,
          y0: 218,
          y: 303,
          locations: [
            {
              x: 577,
              y: 278
            },
            {
              x: 577,
              y: 298
            },
            {
              x: 525,
              y: 223
            },
            {
              x: 507,
              y: 223
            }
          ]
        },
      ],
      1: [
        {
          x0: 315,
          x: 516,
          y0: 355,
          y: 446,
          locations: [
            {
              x: 320,
              y: 425
            },
            {
              x: 343,
              y: 425
            },
            {
              x: 373,
              y: 441
            },
            {
              x: 354,
              y: 418
            },
            {
              x: 354,
              y: 394
            },
            {
              x: 354,
              y: 378
            },
            {
              x: 354,
              y: 360
            },
            {
              x: 511,
              y: 405
            }
          ]
        },
        {
          x0: 379,
          x: 564,
          y0: 231,
          y: 303,
          locations: [
            {
              x: 428,
              y: 298
            },
            {
              x: 384,
              y: 298
            },
            {
              x: 492,
              y: 264
            },
            {
              x: 515,
              y: 264
            },
            {
              x: 480,
              y: 236
            },
            {
              x: 480,
              y: 255
            },
            {
              x: 559,
              y: 252
            }
          ]
        },
        {
          x0: 497,
          x: 534,
          y0: 105,
          y: 176,
          locations: [
            {
              x: 529,
              y: 171
            },
            {
              x: 529,
              y: 151
            },
            {
              x: 503,
              y: 142
            },
            {
              x: 519,
              y: 142
            },
            {
              x: 529,
              y: 131
            },
            {
              x: 529,
              y: 110
            }
          ]
        },
        {
          x0: 456,
          x: 570,
          y0: 0,
          y: 73,
          locations: [
            {
              x: 461,
              y: 68
            },
            {
              x: 482,
              y: 68
            },
            {
              x: 540,
              y: 68
            },
            {
              x: 565,
              y: 68
            },
            {
              x: 559,
              y: 6
            }
          ]
        },
      ],
      2: [
        {
          x0: 287,
          x: 404,
          y0: 327,
          y: 399,
          locations: [
            {
              x: 292,
              y: 372
            },
            {
              x: 352,
              y: 363
            },
            {
              x: 388,
              y: 363
            },
            {
              x: 387,
              y: 332
            },
            {
              x: 399,
              y: 332
            },
            {
              x: 399,
              y: 349
            },
            {
              x: 399,
              y: 374
            },
            {
              x: 399,
              y: 394
            }
          ]
        },
        {
          x0: 482,
          x: 578,
          y0: 183,
          y: 326,
          locations: [
            {
              x: 500,
              y: 321
            },
            {
              x: 523,
              y: 321
            },
            {
              x: 487,
              y: 309
            },
            {
              x: 487,
              y: 286
            },
            {
              x: 573,
              y: 187
            },
            {
              x: 551,
              y: 187
            }
          ]
        },
        {
          x0: 496,
          x: 575,
          y0: 66,
          y: 173,
          locations: [
            {
              x: 570,
              y: 168
            },
            {
              x: 527,
              y: 149
            },
            {
              x: 510,
              y: 149
            },
            {
              x: 501,
              y: 121
            },
            {
              x: 501,
              y: 140
            },
            {
              x: 501,
              y: 102
            },
            {
              x: 501,
              y: 82
            },
            {
              x: 513,
              y: 71
            },
            {
              x: 527,
              y: 71
            }
          ]
        },
      ]
    },
    "CLUBHOUSE": {
      0: [
        {
          x0: 363,
          x: 373,
          y0: 155,
          y: 205,
          locations: [
            {
              x: 368,
              y: 200
            },
            {
              x: 368,
              y: 180
            },
            {
              x: 368,
              y: 160
            }
          ]
        },
        {
          x0: 371,
          x: 441,
          y0: 120,
          y: 130,
          locations: [
            {
              x: 376,
              y: 125
            },
            {
              x: 396,
              y: 125
            },
            {
              x: 416,
              y: 125
            },
            {
              x: 436,
              y: 125
            }
          ]
        },
        {
          x0: 469,
          x: 479,
          y0: 191,
          y: 241,
          locations: [
            {
              x: 474,
              y: 236
            },
            {
              x: 474,
              y: 216
            },
            {
              x: 474,
              y: 196
            }
          ]
        },
        {
          x0: 482,
          x: 512,
          y0: 181,
          y: 191,
          locations: [
            {
              x: 487,
              y: 186
            },
            {
              x: 507,
              y: 186
            }
          ]
        }
      ],
      1: [
        {
          x0: 92,
          x: 266,
          y0: 154,
          y: 383,
          locations: [
            {
              x: 97,
              y: 227
            },
            {
              x: 117,
              y: 227
            },
            {
              x: 101,
              y: 357
            },
            {
              x: 101,
              y: 378
            },
            {
              x: 241,
              y: 237
            },
            {
              x: 241,
              y: 257
            }
          ]
        },
        {
          x0: 345,
          x: 437,
          y0: 78,
          y: 234,
          locations: [
            {
              x: 357,
              y: 157
            },
            {
              x: 368,
              y: 157
            },
            {
              x: 432,
              y: 83
            },
            {
              x: 350,
              y: 229
            },
            {
              x: 407,
              y: 156
            },
            {
              x: 422,
              y: 156
            }
          ]
        },
        {
          x0: 468,
          x: 525,
          y0: 181,
          y: 218,
          locations: [
            {
              x: 473,
              y: 186
            },
            {
              x: 473,
              y: 201
            },
            {
              x: 520,
              y: 213
            }
          ]
        },
        {
          x0: 368,
          x: 529,
          y0: 305,
          y: 419,
          locations: [
            {
              x: 509,
              y: 310
            },
            {
              x: 524,
              y: 310
            },
            {
              x: 473,
              y: 338
            },
            {
              x: 473,
              y: 357
            },
            {
              x: 473,
              y: 394
            },
            {
              x: 473,
              y: 414
            }
          ]
        }
      ],
      2: [
        {
          x0: 515,
          x: 597,
          y0: 166,
          y: 316,
          locations: [
            {
              x: 520,
              y: 311
            },
            {
              x: 540,
              y: 311
            },
            {
              x: 592,
              y: 281
            },
            {
              x: 592,
              y: 261
            },
            {
              x: 531,
              y: 253
            },
            {
              x: 550,
              y: 253
            },
            {
              x: 552,
              y: 191
            },
            {
              x: 552,
              y: 171
            }
          ]
        },
        {
          x0: 285,
          x: 350,
          y0: 129,
          y: 260,
          locations: [
            {
              x: 345,
              y: 255
            },
            {
              x: 345,
              y: 235
            },
            {
              x: 345,
              y: 215
            },
            {
              x: 345,
              y: 195
            },
            {
              x: 320,
              y: 177
            },
            {
              x: 320,
              y: 157
            },
            {
              x: 290,
              y: 134
            },
            {
              x: 290,
              y: 154
            },
            {
              x: 304,
              y: 233
            }
          ]
        },
        {
          x0: 399,
          x: 490,
          y0: 130,
          y: 231,
          locations: [
            {
              x: 438,
              y: 135
            },
            {
              x: 463,
              y: 135
            },
            {
              x: 463,
              y: 207
            },
            {
              x: 473,
              y: 178
            },
            {
              x: 475,
              y: 148
            },
            {
              x: 485,
              y: 206
            },
            {
              x: 485,
              y: 226
            },
            {
              x: 404,
              y: 145
            },
            {
              x: 418,
              y: 145
            }
          ]
        }
      ]
    },
    "COASTLINE": {
      0: [
        {
          x0: 239,
          x: 304,
          y0: 121,
          y: 131,
          locations: [
            {
              x: 244,
              y: 126
            },
            {
              x: 257,
              y: 126
            },
            {
              x: 283,
              y: 126
            },
            {
              x: 299,
              y: 126
            }
          ]
        },
        {
          x0: 295,
          x: 356,
          y0: 193,
          y: 294,
          locations: [
            {
              x: 352,
              y: 198
            },
            {
              x: 352,
              y: 214
            },
            {
              x: 300,
              y: 222
            },
            {
              x: 316,
              y: 222
            },
            {
              x: 328,
              y: 222
            },
            {
              x: 343,
              y: 222
            },
            {
              x: 331,
              y: 289
            },
            {
              x: 346,
              y: 289
            }
          ]
        },
        {
          x0: 385,
          x: 488,
          y0: 106,
          y: 286,
          locations: [
            {
              x: 390,
              y: 230
            },
            {
              x: 390,
              y: 249
            },
            {
              x: 390,
              y: 263
            },
            {
              x: 390,
              y: 281
            },
            {
              x: 415,
              y: 194
            },
            {
              x: 433,
              y: 194
            },
            {
              x: 444,
              y: 194
            },
            {
              x: 457,
              y: 194
            },
            {
              x: 483,
              y: 129
            },
            {
              x: 483,
              y: 111
            }
          ]
        },
        {
          x0: 486,
          x: 601,
          y0: 142,
          y: 199,
          locations: [
            {
              x: 491,
              y: 194
            },
            {
              x: 505,
              y: 194
            },
            {
              x: 519,
              y: 194
            },
            {
              x: 538,
              y: 147
            },
            {
              x: 559,
              y: 147
            },
            {
              x: 577,
              y: 147
            },
            {
              x: 596,
              y: 147
            }
          ]
        },
      ],
      1: [
        {
          x0: 300,
          x: 361,
          y0: 127,
          y: 231,
          locations: [
            {
              x: 356,
              y: 132
            },
            {
              x: 356,
              y: 156
            },
            {
              x: 356,
              y: 193
            },
            {
              x: 356,
              y: 215
            },
            {
              x: 315,
              y: 200
            },
            {
              x: 305,
              y: 226
            },
            {
              x: 323,
              y: 226
            },
            {
              x: 338,
              y: 226
            }
          ]
        },
        {
          x0: 298,
          x: 480,
          y0: 229,
          y: 348,
          locations: [
            {
              x: 305,
              y: 343
            },
            {
              x: 303,
              y: 312
            },
            {
              x: 319,
              y: 312
            },
            {
              x: 394,
              y: 234
            },
            {
              x: 394,
              y: 250
            },
            {
              x: 394,
              y: 263
            },
            {
              x: 394,
              y: 281
            },
            {
              x: 475,
              y: 321
            }
          ]
        },
        {
          x0: 400,
          x: 561,
          y0: 106,
          y: 210,
          locations: [
            {
              x: 405,
              y: 196
            },
            {
              x: 422,
              y: 196
            },
            {
              x: 460,
              y: 196
            },
            {
              x: 476,
              y: 196
            },
            {
              x: 488,
              y: 186
            },
            {
              x: 488,
              y: 169
            },
            {
              x: 488,
              y: 150
            },
            {
              x: 556,
              y: 111
            },
            {
              x: 556,
              y: 133
            },
            {
              x: 528,
              y: 205
            }
          ]
        },
        {
          x0: 513,
          x: 572,
          y0: 220,
          y: 314,
          locations: [
            {
              x: 567,
              y: 225
            },
            {
              x: 530,
              y: 225
            },
            {
              x: 559,
              y: 309
            },
            {
              x: 538,
              y: 309
            },
            {
              x: 518,
              y: 305
            },
            {
              x: 518,
              y: 288
            },
            {
              x: 518,
              y: 258
            },
            {
              x: 518,
              y: 236
            }
          ]
        },
      ],
    },
    "CONSULATE": {
      0: [
        {
          x0: 183,
          x: 330,
          y0: 233,
          y: 323,
          locations: [
            {
              x: 188,
              y: 238
            },
            {
              x: 188,
              y: 256
            },
            {
              x: 188,
              y: 274
            },
            {
              x: 325,
              y: 243
            },
            {
              x: 325,
              y: 263
            },
            {
              x: 325,
              y: 300
            },
            {
              x: 325,
              y: 318
            }
          ]
        },
        {
          x0: 330,
          x: 426,
          y0: 171,
          y: 282,
          locations: [
            {
              x: 335,
              y: 176
            },
            {
              x: 354,
              y: 176
            },
            {
              x: 379,
              y: 176
            },
            {
              x: 392,
              y: 176
            },
            {
              x: 347,
              y: 187
            },
            {
              x: 347,
              y: 206
            },
            {
              x: 347,
              y: 221
            },
            {
              x: 359,
              y: 234
            },
            {
              x: 377,
              y: 234
            },
            {
              x: 421,
              y: 277
            }
          ]
        },
        {
          x0: 461,
          x: 500,
          y0: 172,
          y: 225,
          locations: [
            {
              x: 475,
              y: 219
            },
            {
              x: 466,
              y: 177
            },
            {
              x: 477,
              y: 177
            },
            {
              x: 495,
              y: 177
            },
            {
              x: 478,
              y: 220
            },
            {
              x: 487,
              y: 209
            },
            {
              x: 501,
              y: 221
            }
          ]
        },
        {
          x0: 511,
          x: 542,
          y0: 224,
          y: 298,
          locations: [
            {
              x: 516,
              y: 284
            },
            {
              x: 516,
              y: 293
            },
            {
              x: 516,
              y: 229
            },
            {
              x: 516,
              y: 248
            },
            {
              x: 516,
              y: 264
            },
            {
              x: 525,
              y: 277
            },
            {
              x: 537,
              y: 277
            }
          ]
        }
      ],
      1: [
        {
          x0: 240,
          x: 287,
          y0: 203,
          y: 324,
          locations: [
            {
              x: 245,
              y: 208
            },
            {
              x: 272,
              y: 208
            },
            {
              x: 274,
              y: 319
            },
            {
              x: 282,
              y: 219
            },
            {
              x: 282,
              y: 235
            },
            {
              x: 282,
              y: 254
            }
          ]
        },
        {
          x0: 288,
          x: 404,
          y0: 173,
          y: 269,
          locations: [
            {
              x: 293,
              y: 217
            },
            {
              x: 295,
              y: 207
            },
            {
              x: 293,
              y: 178
            },
            {
              x: 307,
              y: 178
            },
            {
              x: 337,
              y: 178
            },
            {
              x: 349,
              y: 178
            },
            {
              x: 331,
              y: 207
            },
            {
              x: 349,
              y: 207
            },
            {
              x: 327,
              y: 264
            },
            {
              x: 399,
              y: 263
            }
          ]
        },
        {
          x0: 459,
          x: 596,
          y0: 191,
          y: 320,
          locations: [
            {
              x: 464,
              y: 315
            },
            {
              x: 516,
              y: 280
            },
            {
              x: 530,
              y: 280
            },
            {
              x: 591,
              y: 312
            },
            {
              x: 540,
              y: 268
            },
            {
              x: 540,
              y: 196
            }
          ]
        },
        {
          x0: 460,
          x: 627,
          y0: 154,
          y: 190,
          locations: [
            {
              x: 465,
              y: 185
            },
            {
              x: 490,
              y: 185
            },
            {
              x: 508,
              y: 185
            },
            {
              x: 527,
              y: 185
            },
            {
              x: 487,
              y: 163
            },
            {
              x: 622,
              y: 159
            },
            {
              x: 541,
              y: 160
            }
          ]
        }
      ],
      2: [
        {
          x0: 200,
          x: 283,
          y0: 150,
          y: 243,
          locations: [
            {
              x: 205,
              y: 238
            },
            {
              x: 209,
              y: 203
            },
            {
              x: 229,
              y: 203
            },
            {
              x: 249,
              y: 203
            },
            {
              x: 213,
              y: 220
            },
            {
              x: 250,
              y: 237
            },
            {
              x: 278,
              y: 155
            },
            {
              x: 278,
              y: 172
            }
          ]
        },
        {
          x0: 289,
          x: 344,
          y0: 176,
          y: 342,
          locations: [
            {
              x: 294,
              y: 181
            },
            {
              x: 313,
              y: 181
            },
            {
              x: 339,
              y: 181
            },
            {
              x: 294,
              y: 258
            },
            {
              x: 315,
              y: 258
            },
            {
              x: 315,
              y: 337
            },
            {
              x: 308,
              y: 268
            },
            {
              x: 308,
              y: 290
            },
            {
              x: 308,
              y: 310
            }
          ]
        },
        {
          x0: 371,
          x: 447,
          y0: 241,
          y: 269,
          locations: [
            {
              x: 380,
              y: 264
            },
            {
              x: 376,
              y: 246
            },
            {
              x: 397,
              y: 246
            },
            {
              x: 418,
              y: 246
            },
            {
              x: 442,
              y: 246
            },
          ]
        },
        {
          x0: 477,
          x: 557,
          y0: 151,
          y: 315,
          locations: [
            {
              x: 482,
              y: 188
            },
            {
              x: 504,
              y: 188
            },
            {
              x: 503,
              y: 251
            },
            {
              x: 517,
              y: 251
            },
            {
              x: 539,
              y: 310
            },
            {
              x: 552,
              y: 219
            },
            {
              x: 526,
              y: 200
            },
            {
              x: 526,
              y: 219
            },
            {
              x: 526,
              y: 238
            },
            {
              x: 541,
              y: 180
            },
            {
              x: 541,
              y: 156
            }
          ]
        }
      ]
    },
    "KAFE DOSTOYEVSKY": {
      0: [
        {
          x0: 276,
          x: 354,
          y0: 197,
          y: 338,
          locations: [
            {
              x: 306,
              y: 310
            },
            {
              x: 306,
              y: 333
            },
            {
              x: 281,
              y: 202
            },
            {
              x: 316,
              y: 203
            },
            {
              x: 349,
              y: 240
            },
            {
              x: 349,
              y: 262
            }
          ]
        },
        {
          x0: 378,
          x: 468,
          y0: 204,
          y: 266,
          locations: [
            {
              x: 383,
              y: 209
            },
            {
              x: 403,
              y: 209
            },
            {
              x: 438,
              y: 238
            },
            {
              x: 438,
              y: 261
            },
            {
              x: 463,
              y: 214
            }
          ]
        },
        {
          x0: 533,
          x: 603,
          y0: 213,
          y: 377,
          locations: [
            {
              x: 567,
              y: 218
            },
            {
              x: 538,
              y: 308
            },
            {
              x: 538,
              y: 327
            },
            {
              x: 579,
              y: 372
            },
            {
              x: 598,
              y: 372
            }
          ]
        },
      ],
      1: [
        {
          x0: 356,
          x: 444,
          y0: 192,
          y: 262,
          locations: [
            {
              x: 361,
              y: 257
            },
            {
              x: 381,
              y: 257
            },
            {
              x: 423,
              y: 257
            },
            {
              x: 439,
              y: 257
            },
            {
              x: 359,
              y: 197
            },
            {
              x: 378,
              y: 197
            },
            {
              x: 394,
              y: 197
            },
            {
              x: 408,
              y: 197
            }
          ]
        },
        {
          x0: 403,
          x: 453,
          y0: 164,
          y: 187,
          locations: [
            {
              x: 408,
              y: 169
            },
            {
              x: 428,
              y: 169
            },
            {
              x: 448,
              y: 182
            }
          ]
        },
        {
          x0: 492,
          x: 607,
          y0: 201,
          y: 271,
          locations: [
            {
              x: 497,
              y: 206
            },
            {
              x: 515,
              y: 206
            },
            {
              x: 497,
              y: 266
            },
            {
              x: 515,
              y: 266
            },
            {
              x: 583,
              y: 266
            },
            {
              x: 602,
              y: 266
            }
          ]
        },
        {
          x0: 445,
          x: 546,
          y0: 287,
          y: 347,
          locations: [
            {
              x: 450,
              y: 300
            },
            {
              x: 450,
              y: 342
            },
            {
              x: 514,
              y: 334
            },
            {
              x: 541,
              y: 330
            },
            {
              x: 541,
              y: 307
            },
            {
              x: 463,
              y: 292
            },
            {
              x: 477,
              y: 292
            },
            {
              x: 511,
              y: 292
            },
            {
              x: 524,
              y: 292
            }
          ]
        },
      ],
      2: [
        {
          x0: 360,
          x: 481,
          y0: 168,
          y: 251,
          locations: [
            {
              x: 365,
              y: 203
            },
            {
              x: 386,
              y: 203
            },
            {
              x: 437,
              y: 181
            },
            {
              x: 421,
              y: 173
            },
            {
              x: 421,
              y: 187
            },
            {
              x: 459,
              y: 246
            },
            {
              x: 476,
              y: 246
            }
          ]
        },
        {
          x0: 418,
          x: 512,
          y0: 248,
          y: 318,
          locations: [
            {
              x: 422,
              y: 313
            },
            {
              x: 482,
              y: 253
            },
            {
              x: 482,
              y: 270
            },
            {
              x: 482,
              y: 288
            },
            {
              x: 482,
              y: 307
            },
            {
              x: 488,
              y: 281
            },
            {
              x: 507,
              y: 281
            }
          ]
        },
        {
          x0: 543,
          x: 604,
          y0: 169,
          y: 293,
          locations: [
            {
              x: 548,
              y: 253
            },
            {
              x: 548,
              y: 269
            },
            {
              x: 599,
              y: 288
            },
            {
              x: 575,
              y: 230
            },
            {
              x: 575,
              y: 191
            },
            {
              x: 575,
              y: 174
            }
          ]
        },
      ]
    },
    "KANAL": {
      0: [
        {
          x0: 241,
          x: 295,
          y0: 190,
          y: 355,
          locations: [
            {
              x: 248,
              y: 350
            },
            {
              x: 290,
              y: 299
            },
            {
              x: 290,
              y: 280
            },
            {
              x: 277,
              y: 264
            },
            {
              x: 259,
              y: 264
            },
            {
              x: 289,
              y: 253
            },
            {
              x: 289,
              y: 234
            },
            {
              x: 269,
              y: 195
            },
            {
              x: 246,
              y: 195
            }
          ]
        }
      ],
      1: [
        {
          x0: 272,
          x: 365,
          y0: 110,
          y: 200,
          locations: [
            {
              x: 339,
              y: 130
            },
            {
              x: 319,
              y: 130
            },
            {
              x: 277,
              y: 115
            },
            {
              x: 277,
              y: 132
            },
            {
              x: 277,
              y: 166
            },
            {
              x: 312,
              y: 173
            },
            {
              x: 289,
              y: 195
            },
            {
              x: 360,
              y: 193
            }
          ]
        },
        {
          x0: 217,
          x: 329,
          y0: 215,
          y: 305,
          locations: [
            {
              x: 324,
              y: 220
            },
            {
              x: 222,
              y: 255
            },
            {
              x: 301,
              y: 256
            },
            {
              x: 301,
              y: 275
            },
            {
              x: 260,
              y: 300
            },
            {
              x: 279,
              y: 300
            }
          ]
        },
        {
          x0: 464,
          x: 635,
          y0: 176,
          y: 235,
          locations: [
            {
              x: 511,
              y: 230
            },
            {
              x: 526,
              y: 211
            },
            {
              x: 469,
              y: 193
            },
            {
              x: 489,
              y: 193
            },
            {
              x: 579,
              y: 181
            },
            {
              x: 579,
              y: 202
            },
            {
              x: 579,
              y: 222
            },
            {
              x: 630,
              y: 216
            }
          ]
        },
      ],
      2: [
        {
          x0: 459,
          x: 505,
          y0: 135,
          y: 285,
          locations: [
            {
              x: 464,
              y: 251
            },
            {
              x: 472,
              y: 280
            },
            {
              x: 490,
              y: 280
            },
            {
              x: 500,
              y: 269
            },
            {
              x: 500,
              y: 250
            },
            {
              x: 469,
              y: 170
            },
            {
              x: 486,
              y: 140
            }
          ]
        },
        {
          x0: 513,
          x: 567,
          y0: 165,
          y: 229,
          locations: [
            {
              x: 518,
              y: 170
            },
            {
              x: 533,
              y: 177
            },
            {
              x: 533,
              y: 199
            },
            {
              x: 562,
              y: 211
            },
            {
              x: 562,
              y: 224
            }
          ]
        },
        {
          x0: 581,
          x: 620,
          y0: 135,
          y: 241,
          locations: [
            {
              x: 586,
              y: 141
            },
            {
              x: 615,
              y: 140
            },
            {
              x: 615,
              y: 160
            },
            {
              x: 615,
              y: 206
            },
            {
              x: 615,
              y: 226
            },
            {
              x: 606,
              y: 236
            },
            {
              x: 586,
              y: 236
            }
          ]
        },
      ]
    },
    "OREGON": {
      0: [
        {
          x0: 425,
          x: 504,
          y0: 259,
          y: 292,
          locations: [
            {
              x: 430,
              y: 274
            },
            {
              x: 430,
              y: 287
            },
            {
              x: 499,
              y: 264
            },
            {
              x: 464,
              y: 264
            },
            {
              x: 477,
              y: 264
            }
          ]
        },
        {
          x0: 459,
          x: 516,
          y0: 161,
          y: 243,
          locations: [
            {
              x: 511,
              y: 224
            },
            {
              x: 511,
              y: 238
            },
            {
              x: 464,
              y: 191
            },
            {
              x: 488,
              y: 166
            },
            {
              x: 502,
              y: 166
            },
            {
              x: 509,
              y: 171
            },
            {
              x: 509,
              y: 185
            }
          ]
        }
      ],
      1: [
        {
          x0: 256,
          x: 327,
          y0: 241,
          y: 317,
          locations: [
            {
              x: 261,
              y: 246
            },
            {
              x: 261,
              y: 263
            },
            {
              x: 261,
              y: 298
            },
            {
              x: 261,
              y: 312
            },
            {
              x: 301,
              y: 272
            },
            {
              x: 316,
              y: 272
            },
            {
              x: 322,
              y: 277
            },
            {
              x: 322,
              y: 293
            }
          ]
        },
        {
          x0: 337,
          x: 436,
          y0: 239,
          y: 296,
          locations: [
            {
              x: 342,
              y: 244
            },
            {
              x: 350,
              y: 271
            },
            {
              x: 365,
              y: 271
            },
            {
              x: 403,
              y: 273
            },
            {
              x: 404,
              y: 291
            },
            {
              x: 431,
              y: 261
            },
            {
              x: 431,
              y: 245
            }
          ]
        },
        {
          x0: 434,
          x: 483,
          y0: 143,
          y: 356,
          locations: [
            {
              x: 439,
              y: 294
            },
            {
              x: 457,
              y: 294
            },
            {
              x: 465,
              y: 301
            },
            {
              x: 465,
              y: 313
            },
            {
              x: 465,
              y: 336
            },
            {
              x: 465,
              y: 351
            },
            {
              x: 467,
              y: 148
            },
            {
              x: 478,
              y: 148
            },
            {
              x: 441,
              y: 271
            }
          ]
        },
        {
          x0: 476,
          x: 559,
          y0: 176,
          y: 342,
          locations: [
            {
              x: 487,
              y: 181
            },
            {
              x: 510,
              y: 272
            },
            {
              x: 487,
              y: 318
            },
            {
              x: 509,
              y: 295
            },
            {
              x: 534,
              y: 337
            },
            {
              x: 554,
              y: 337
            }
          ]
        }
      ],
      2: [
        {
          x0: 347,
          x: 430,
          y0: 220,
          y: 322,
          locations: [
            {
              x: 425,
              y: 225
            },
            {
              x: 425,
              y: 238
            },
            {
              x: 352,
              y: 247
            },
            {
              x: 366,
              y: 271
            },
            {
              x: 380,
              y: 271
            },
            {
              x: 417,
              y: 317
            }
          ]
        },
        {
          x0: 443,
          x: 561,
          y0: 273,
          y: 332,
          locations: [
            {
              x: 448,
              y: 327
            },
            {
              x: 461,
              y: 327
            },

            {
              x: 507,
              y: 298
            },
            {
              x: 507,
              y: 313
            },
            {
              x: 525,
              y: 278
            },
            {
              x: 525,
              y: 294
            },
            {
              x: 556,
              y: 315
            }
          ]
        },
        {
          x0: 470,
          x: 497,
          y0: 143,
          y: 256,
          locations: [
            {
              x: 476,
              y: 251
            },
            {
              x: 490,
              y: 251
            },
            {
              x: 478,
              y: 148
            },
            {
              x: 492,
              y: 148
            },
            {
              x: 475,
              y: 186
            }
          ]
        },
      ],
      3: [{
        x0: 0,
        x: 0,
        y0: 0,
        y: 0
      }]
    },
    "SKYSCRAPER": {
      0: [
        {
          x0: 172,
          x: 277,
          y0: 105,
          y: 192,
          locations: [
            {
              x: 272,
              y: 110
            },
            {
              x: 265,
              y: 119
            },
            {
              x: 245,
              y: 119
            },
            {
              x: 177,
              y: 148
            },
            {
              x: 196,
              y: 148
            },
            {
              x: 270,
              y: 167
            },
            {
              x: 270,
              y: 187
            }
          ]
        },
        {
          x0: 171,
          x: 319,
          y0: 238,
          y: 311,
          locations: [
            {
              x: 176,
              y: 243
            },
            {
              x: 199,
              y: 243
            },
            {
              x: 244,
              y: 243
            },
            {
              x: 260,
              y: 243
            },
            {
              x: 295,
              y: 285
            },
            {
              x: 295,
              y: 306
            },
            {
              x: 314,
              y: 280
            }
          ]
        },
        {
          x0: 353,
          x: 659,
          y0: 216,
          y: 337,
          locations: [
            {
              x: 358,
              y: 280
            },
            {
              x: 378,
              y: 280
            },
            {
              x: 508,
              y: 292
            },
            {
              x: 508,
              y: 314
            },
            {
              x: 634,
              y: 221
            },
            {
              x: 654,
              y: 221
            },
            {
              x: 575,
              y: 293
            },
            {
              x: 575,
              y: 317
            },
            {
              x: 586,
              y: 332
            },
            {
              x: 603,
              y: 332
            }
          ]
        },
      ],
      1: [
        {
          x0: 186,
          x: 294,
          y0: 89,
          y: 203,
          locations: [
            {
              x: 191,
              y: 94
            },
            {
              x: 214,
              y: 94
            },
            {
              x: 252,
              y: 111
            },
            {
              x: 252,
              y: 129
            },
            {
              x: 252,
              y: 181
            },
            {
              x: 252,
              y: 198
            },
            {
              x: 289,
              y: 147
            },
            {
              x: 289,
              y: 162
            }
          ]
        },
        {
          x0: 184,
          x: 339,
          y0: 216,
          y: 356,
          locations: [
            {
              x: 189,
              y: 221
            },
            {
              x: 217,
              y: 221
            },
            {
              x: 309,
              y: 221
            },
            {
              x: 334,
              y: 221
            },
            {
              x: 264,
              y: 262
            },
            {
              x: 281,
              y: 262
            },
            {
              x: 301,
              y: 284
            },
            {
              x: 301,
              y: 298
            },
            {
              x: 277,
              y: 301
            },
            {
              x: 328,
              y: 333
            },
            {
              x: 309,
              y: 351
            }
          ]
        },
        {
          x0: 375,
          x: 594,
          y0: 129,
          y: 243,
          locations: [
            {
              x: 380,
              y: 148
            },
            {
              x: 380,
              y: 162
            },
            {
              x: 475,
              y: 238
            },
            {
              x: 589,
              y: 134
            },
            {
              x: 517,
              y: 208
            },
            {
              x: 517,
              y: 225
            }
          ]
        },
        {
          x0: 510,
          x: 651,
          y0: 241,
          y: 377,
          locations: [
            {
              x: 518,
              y: 246
            },
            {
              x: 518,
              y: 267
            },
            {
              x: 515,
              y: 361
            },
            {
              x: 590,
              y: 279
            },
            {
              x: 609,
              y: 279
            },
            {
              x: 622,
              y: 279
            },
            {
              x: 576,
              y: 328
            },
            {
              x: 576,
              y: 342
            },
            {
              x: 576,
              y: 358
            },
            {
              x: 584,
              y: 372
            },
            {
              x: 598,
              y: 372
            },
            {
              x: 646,
              y: 352
            }
          ]
        }
      ],
    },
    "THEME PARK": {
      0: [
        {
          x0: 382,
          x: 562,
          y0: 244,
          y: 361,
          locations: [
            {
              x: 499,
              y: 340
            },
            {
              x: 499,
              y: 356
            },
            {
              x: 387,
              y: 333
            },
            {
              x: 387,
              y: 321
            },
            {
              x: 557,
              y: 281
            },
            {
              x: 557,
              y: 261
            },
            {
              x: 463,
              y: 249
            },
            {
              x: 421,
              y: 249
            }
          ]
        },
        {
          x0: 236,
          x: 532,
          y0: 126,
          y: 165,
          locations: [
            {
              x: 527,
              y: 146
            },
            {
              x: 526,
              y: 131
            },
            {
              x: 460,
              y: 155
            },
            {
              x: 439,
              y: 155
            },
            {
              x: 320,
              y: 131
            },
            {
              x: 241,
              y: 141
            },
            {
              x: 361,
              y: 160
            }
          ]
        },
        {
          x0: 298,
          x: 384,
          y0: 176,
          y: 262,
          locations: [
            {
              x: 361,
              y: 181
            },
            {
              x: 361,
              y: 198
            },
            {
              x: 361,
              y: 214
            },
            {
              x: 349,
              y: 225
            },
            {
              x: 329,
              y: 225
            },
            {
              x: 379,
              y: 257
            },
            {
              x: 363,
              y: 257
            },
            {
              x: 319,
              y: 257
            },
            {
              x: 303,
              y: 257
            }
          ]
        },
      ],
      1: [
        {
          x0: 375,
          x: 582,
          y0: 75,
          y: 149,
          locations: [
            {
              x: 380,
              y: 80
            },
            {
              x: 439,
              y: 80
            },
            {
              x: 440,
              y: 129
            },
            {
              x: 440,
              y: 144
            },
            {
              x: 577,
              y: 123
            }
          ]
        },
        {
          x0: 425,
          x: 606,
          y0: 164,
          y: 258,
          locations: [
            {
              x: 507,
              y: 169
            },
            {
              x: 507,
              y: 189
            },
            {
              x: 601,
              y: 200
            },
            {
              x: 587,
              y: 200
            },
            {
              x: 541,
              y: 200
            },
            {
              x: 520,
              y: 200
            },
            {
              x: 451,
              y: 201
            },
            {
              x: 430,
              y: 201
            },
            {
              x: 483,
              y: 253
            }
          ]
        },
        {
          x0: 305,
          x: 498,
          y0: 300,
          y: 367,
          locations: [
            {
              x: 493,
              y: 344
            },
            {
              x: 493,
              y: 361
            },
            {
              x: 421,
              y: 321
            },
            {
              x: 421,
              y: 305
            },
            {
              x: 411,
              y: 331
            },
            {
              x: 390,
              y: 331
            },
            {
              x: 310,
              y: 344
            },
            {
              x: 310,
              y: 361
            }
          ]
        },
        {
          x0: 312,
          x: 395,
          y0: 176,
          y: 325,
          locations: [
            {
              x: 325,
              y: 320
            },
            {
              x: 341,
              y: 270
            },
            {
              x: 359,
              y: 270
            },
            {
              x: 371,
              y: 270
            },
            {
              x: 390,
              y: 223
            },
            {
              x: 370,
              y: 181
            },
            {
              x: 353,
              y: 181
            },
            {
              x: 334,
              y: 181
            },
            {
              x: 317,
              y: 181
            }
          ]
        }
      ],
    },
    "VILLA": {
      0: [
        {
          x0: 387,
          x: 599,
          y0: 5,
          y: 285,
          locations: [
            {
              x: 392,
              y: 280
            },
            {
              x: 411,
              y: 280
            },
            {
              x: 421,
              y: 164
            },
            {
              x: 527,
              y: 164
            },
            {
              x: 508,
              y: 164
            },
            {
              x: 413,
              y: 102
            },
            {
              x: 427,
              y: 102
            },
            {
              x: 458,
              y: 102
            },
            {
              x: 472,
              y: 102
            },
            {
              x: 423,
              y: 10
            },
            {
              x: 594,
              y: 21
            }
          ]
        }
      ],
      1: [
        {
          x0: 346,
          x: 441,
          y0: 277,
          y: 359,
          locations: [
            {
              x: 351,
              y: 354
            },
            {
              x: 351,
              y: 334
            },
            {
              x: 378,
              y: 334
            },
            {
              x: 378,
              y: 354
            },
            {
              x: 378,
              y: 314
            },
            {
              x: 378,
              y: 294
            },
            {
              x: 413,
              y: 282
            },
            {
              x: 436,
              y: 282
            }
          ]
        },
        {
          x0: 318,
          x: 421,
          y0: 123,
          y: 251,
          locations: [
            {
              x: 323,
              y: 253
            },
            {
              x: 340,
              y: 253
            },
            {
              x: 416,
              y: 246
            },
            {
              x: 416,
              y: 228
            },
            {
              x: 416,
              y: 211
            },
            {
              x: 396,
              y: 179
            },
            {
              x: 367,
              y: 128
            },
            {
              x: 405,
              y: 128
            }
          ]
        },
        {
          x0: 454,
          x: 540,
          y0: 98,
          y: 137,
          locations: [
            {
              x: 459,
              y: 132
            },
            {
              x: 476,
              y: 132
            },
            {
              x: 508,
              y: 132
            },
            {
              x: 526,
              y: 132
            },
            {
              x: 535,
              y: 125
            },
            {
              x: 535,
              y: 103
            }
          ]
        },
        {
          x0: 447,
          x: 547,
          y0: 21,
          y: 94,
          locations: [
            {
              x: 452,
              y: 89
            },
            {
              x: 452,
              y: 74
            },
            {
              x: 452,
              y: 58
            },
            {
              x: 523,
              y: 42
            },
            {
              x: 542,
              y: 26
            }
          ]
        },
      ],
      2: [
        {
          x0: 274,
          x: 432,
          y0: 335,
          y: 408,
          locations: [
            {
              x: 427,
              y: 403
            },
            {
              x: 358,
              y: 369
            },
            {
              x: 358,
              y: 350
            },
            {
              x: 368,
              y: 340
            },
            {
              x: 387,
              y: 340
            },
            {
              x: 279,
              y: 373
            },
            {
              x: 279,
              y: 352
            }
          ]
        },
        {
          x0: 253,
          x: 363,
          y0: 213,
          y: 337,
          locations: [
            {
              x: 358,
              y: 332
            },
            {
              x: 358,
              y: 316
            },
            {
              x: 358,
              y: 300
            },
            {
              x: 358,
              y: 284
            },
            {
              x: 278,
              y: 306
            },
            {
              x: 278,
              y: 285
            },
            {
              x: 320,
              y: 253
            },
            {
              x: 258,
              y: 218
            }
          ]
        },
        {
          x0: 358,
          x: 439,
          y0: 46,
          y: 197,
          locations: [
            {
              x: 399,
              y: 192
            },
            {
              x: 399,
              y: 172
            },
            {
              x: 385,
              y: 51
            },
            {
              x: 362,
              y: 71
            },
            {
              x: 377,
              y: 71
            },
            {
              x: 393,
              y: 71
            },
            {
              x: 408,
              y: 71
            },
            {
              x: 434,
              y: 96
            }
          ]
        },
        {
          x0: 489,
          x: 564,
          y0: 23,
          y: 148,
          locations: [
            {
              x: 494,
              y: 78
            },
            {
              x: 494,
              y: 96
            },
            {
              x: 494,
              y: 114
            },
            {
              x: 522,
              y: 28
            },
            {
              x: 522,
              y: 53
            },
            {
              x: 559,
              y: 143
            }
          ]
        }
      ]
    }
  },
  SNAP_TOLERANCE: 5,
  ZOOM_TOLERANCE: 0.1,
  ATTRIBUTES: {
    "OPERATOR" : [],
    "GADGET": [],
    "UTILITY": [],
    "DRONE": [],
    "BREACH": [],
    "ROTATE": ["Full Rotate", "Crouch Rotate", "Vault Rotate", "Footholes", "Line of sight", "Vertical holes"],
    "REINFORCEMENT": []
  }
}
