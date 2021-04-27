/* data.js */
// ["BANK", "BORDER", "CHALET", "CLUBHOUSE", "COASTLINE", "CONSULATE", "KAFE DOSTOYEVSKY", "KANAL", "OREGON", "SKYSCRAPER", "THEME PARK", "VILLA"],
module.exports = {
  MAP_NAMES: ["CLUBHOUSE", "CONSULATE", "OREGON"],
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
  ATTACKER_ROLES: {
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
  DEFENDER_ROLES: {
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
        }
      ]
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
    }
  },
  SNAP_TOLERANCE: 5
}
