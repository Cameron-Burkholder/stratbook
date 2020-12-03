/* data.js */

module.exports = {
  MAP_NAMES: ["BANK", "BORDER", "CHALET", "CLUBHOUSE", "COASTLINE", "CONSULATE", "KAFE DOSTOYEVSKY", "KANAL", "OREGON", "OUTBACK", "THEME PARK", "VILLA"],
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
    "OUTBACK": ["1F Compressor Room/1F Gear Store", "1F Nature Room/1F Bushranger Room", "2F Office/2F Party Room", "2F Laundry Room/2F Games Room"],
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
    "OREGON": ["Basement", "First Floor", "Second Floor", "Third Floor"],
    "OUTBACK": ["First Floor", "Second Floor"],
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
      gadget: "Grenade Launcher",
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
      count: 1
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
      gadget: "Black Eye Camera",
      count: 3
    },
    "BLACKBEARD": {
      gadget: "Rifle Shield",
      count: 0
    },
    "CAPITAO": {
      gadget: "Tactical Crossbolt",
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
      gadget: "X-Kairos Pellet",
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
      gadget: "KS79",
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
    }
  },
  ATTACKER_ROLES: ["ROLE", "HARD BREACH", "SOFT BREACH", "ENTRY FRAG", "AREA DENIAL/FLANK WATCH", "INTEL", "UTILITY CLEAR", "SUPPORT", "ROAM CLEAR"],
  ATTACKER_OPERATORS: {
    "HARD BREACH": ["ACE", "HIBANA", "MAVERICK", "THERMITE"],
    "SOFT BREACH": ["ASH", "BUCK", "SLEDGE", "ZOFIA"],
    "ENTRY FRAG": ["AMARU", "ASH", "BLITZ", "FINKA", "IANA", "IQ", "MONTAGNE", "NOKK", "TWITCH", "ZOFIA"],
    "AREA DENIAL/FLANK WATCH": ["CAPITAO", "GRIDLOCK", "NOMAD", "ZERO"],
    "INTEL": ["DOKKAEBI", "IANA", "IQ", "LION", "MONTAGNE", "TWITCH", "ZERO"],
    "UTILITY CLEAR": ["ASH", "FUZE", "KALI", "MAVERICK", "SLEDGE", "THATCHER", "TWITCH"],
    "SUPPORT": ["ACE", "BLACKBEARD", "CAPITAO", "DOKKAEBI", "FINKA", "GLAZ", "IANA", "LION", "MAVERICK", "MONTAGNE", "YING", "ZERO"],
    "ROAM CLEAR": ["DOKKAEBI", "JACKAL", "LION", "NOKK", "SLEDGE", "TWITCH", "ZOFIA"]
  },
  ATTACKERS: ["SLEDGE", "THATCHER", "ASH", "THERMITE", "TWITCH", "MONTAGNE", "GLAZ", "FUZE", "BLITZ", "IQ", "BUCK", "BLACKBEARD", "CAPITAO", "HIBANA", "JACKAL", "YING", "ZOFIA", "DOKKAEBI", "LION", "FINKA", "MAVERICK", "NOMAD", "GRIDLOCK", "NOKK", "AMARU", "KALI", "IANA", "ACE", "ZERO"],
  DEFENDER_ROLES: ["ROLE", "HARD BREACH DENIAL", "INTEL DENIAL", "INTEL", "AREA DENIAL", "TRAPS", "UTILITY SOAK", "SUPPORT", "ROAM"],
  DEFENDER_OPERATORS: {
    "HARD BREACH DENIAL": ["BANDIT", "KAID", "MUTE"],
    "INTEL DENIAL": ["MOZZIE", "MUTE", "VIGIL"],
    "INTEL": ["ECHO", "MAESTRO", "MIRA", "MOZZIE", "PULSE", "VALKYRIE"],
    "AREA DENIAL": ["CLASH", "GOYO", "LESION", "MELUSI", "MIRA", "SMOKE", "TACHANKA"],
    "TRAPS": ["ELA", "FROST", "KAPKAN", "LESION", "MELUSI"],
    "UTILITY SOAK": ["CASTLE", "GOYO", "JAGER", "WAMAI"],
    "SUPPORT": ["CLASH", "DOC", "ECHO", "GOYO", "JAGER", "MAESTRO", "MIRA", "PULSE", "ROOK", "TACHANKA", "VALKYRIE", "WARDEN"],
    "ROAM": ["ALIBI", "BANDIT", "CAVEIRA", "ELA", "JAGER", "KAPKAN", "LESION", "MELUSI", "MOZZIE", "ORYX", "VIGIL", "WARDEN"]
  },
  DEFENDERS: ["SMOKE", "MUTE", "CASTLE", "PULSE", "DOC", "ROOK", "KAPKAN", "TACHANKA", "JAGER", "BANDIT", "FROST", "VALKYRIE", "CAVEIRA", "ECHO", "MIRA", "LESION", "ELA", "VIGIL", "MAESTRO", "ALIBI", "CLASH", "KAID", "MOZZIE", "WARDEN", "GOYO", "WAMAI", "ORYX", "MELUSI"],
  MAPS: ["BANK", "BORDER", "CHALET", "CLUBHOUSE", "COASTLINE", "CONSULATE", "KAFE DOSTOYEVSKY", "KANAL", "OREGON", "OUTBACK", "THEME PARK", "VILLA"],
  UTILITY: {
    attack: {
      "OPERATOR": ["BREACH CHARGES", "CLAYMORE", "FRAG GRENADES", "HARD BREACH CHARGE", "SMOKE GRENADES", "STUN GRENADES"],
      "SLEDGE": ["FRAG GRENADES", "STUN GRENADES"],
      "THATCHER": ["BREACH CHARGES", "CLAYMORE"],
      "ASH": ["BREACH CHARGES", "CLAYMORE"],
      "THERMITE": ["CLAYMORE", "STUN GRENADES"],
      "TWITCH": ["BREACH CHARGES", "STUN GRENADES"],
      "MONTAGNE": ["HARD BREACH CHARGE", "SMOKE GRENADES"],
      "BLITZ": ["BREACH CHARGES", "SMOKE GRENADES"],
      "IQ": ["BREACH CHARGES", "CLAYMORE"],
      "GLAZ": ["FRAG GRENADES", "SMOKE GRENADES"],
      "FUZE": ["BREACH CHARGES", "HARD BREACH CHARGE"],
      "BUCK": ["CLAYMORE", "STUN GRENADES"],
      "BLACKBEARD": ["BREACH CHARGES", "STUN GRENADES"],
      "CAPITAO": ["CLAYMORE", "HARD BREACH CHARGE"],
      "HIBANA": ["BREACH CHARGES", "STUN GRENADES"],
      "JACKAL": ["CLAYMORE", "SMOKE GRENADES"],
      "YING": ["HARD BREACH CHARGE", "SMOKE GRENADES"],
      "ZOFIA": ["BREACH CHARGES", "CLAYMORE"],
      "DOKKAEBI": ["SMOKE GRENADES", "STUN GRENADES"],
      "LION": ["HARD BREACH CHARGE", "STUN GRENADES"],
      "FINKA": ["HARD BREACH CHARGE", "FRAG GRENADES"],
      "MAVERICK": ["CLAYMORE", "FRAG GRENADES"],
      "NOMAD": ["BREACH CHARGES", "STUN GRENADES"],
      "GRIDLOCK": ["BREACH CHARGES", "SMOKE GRENADES"],
      "NOKK": ["HARD BREACH CHARGE", "FRAG GRENADES"],
      "AMARU": ["HARD BREACH CHARGE", "STUN GRENADES"],
      "KALI": ["BREACH CHARGES", "CLAYMORE"],
      "IANA": ["FRAG GRENADES", "SMOKE GRENADES"],
      "ACE": ["BREACH CHARGES", "SMOKE GRENADES"],
      "ZERO": ["CLAYMORE", "FRAG GRENADES"]
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
      "VALKYRIE": ["DEPLOYABLE SHIELD", "NITRO CELL"],
      "CAVEIRA": ["IMPACT GRENADES", "PROXIMITY ALARMS"],
      "ECHO": ["BARBED WIRE", "IMPACT GRENADES"],
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
      "WAMAI": ["DEPLOYABLE SHIELD", "PROXIMITY ALARMS"],
      "ORYX": ["BARBED WIRE", "PROXIMITY ALARMS"],
      "MELUSI": ["IMPACT GRENADES", "NITRO CELL"]
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
  }
}
