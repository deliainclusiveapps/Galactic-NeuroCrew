const UNEXPECTED_EVENTS_LEVEL_5 = [
  {
    id: 'sim-dust-solar',
    title: 'Simulated Event: Lunar Dust Coated Solar Panels',
    sourceTag: 'Educational Simulation Event (Not live NASA data)',
    description: 'Fine lunar dust reduced solar electricity output during shift operations.',
    impacts: { energy: -10 },
    recommendedFocus: 'Clean panels and trim non-essential lights so life support stays strong.'
  },
  {
    id: 'sim-water-valve',
    title: 'Simulated Event: Water Recycling Valve Slowdown',
    sourceTag: 'Educational Simulation Event (Not live NASA data)',
    description: 'The water recovery filter slowed down, lowering clean water flow.',
    impacts: { water: -10 },
    recommendedFocus: 'Pause heavy irrigation and inspect the recycling loop carefully.'
  },
  {
    id: 'sim-greenhouse-lamp',
    title: 'Simulated Event: Greenhouse Grow-Lamp Surge',
    sourceTag: 'Educational Simulation Event (Not live NASA data)',
    description: 'A grow-lamp circuit tripped, risking food crops unless power is balanced.',
    impacts: { food: -8, energy: -6 },
    recommendedFocus: 'Stabilize power first and protect stored food rations.'
  }
];

export function selectUnexpectedEvent(attemptNumber, donkiInfo) {
  if (donkiInfo && donkiInfo.hasActiveEvents && attemptNumber % 2 === 1) {
    const first = donkiInfo.events[0];
    return {
      id: 'nasa-donki-informed',
      title: `NASA-Informed Alert: ${first.typeName} Observed`,
      sourceTag: `Real NASA DONKI Record (${first.date}) + Educational Simulation Impact`,
      description: `NASA DONKI recorded ${first.typeName} (${first.id}). In our game simulation, Mission Control raises shelter readiness.`,
      impacts: { radiationShield: -8, energy: -5 },
      recommendedFocus: 'Prioritize shelter shielding and battery reserves while keeping oxygen steady.'
    };
  }
  const index = Math.abs(Number(attemptNumber || 0)) % UNEXPECTED_EVENTS_LEVEL_5.length;
  return UNEXPECTED_EVENTS_LEVEL_5[index];
}

export function getChallengeById(challengeId, context = {}) {
  const { resources, donkiInfo, attemptNumber = 0 } = context;

  const baseChallenges = {
    '1.1': {
      id: '1.1',
      levelId: 1,
      title: 'Challenge 1.1 — Oxygen Supply',
      narrative:
        'Your crew just arrived at the lunar outpost! Oxygen tanks are connected to the habitat, but day-one reserves are limited.',
      problem: 'A science team wants to run an extra moonwalk outside, which uses extra spacesuit oxygen.',
      objective: 'Choose whether to save oxygen reserves or spend air for an extra moonwalk.',
      sceneFocus: 'oxygen-tank',
      astroX: 280,
      astroPose: 'pointing-left',
      vocab: {
        term: 'Oxygen Reserve',
        definition: 'Extra breathable air saved in tanks for crew safety and emergencies.'
      },
      options: [
        {
          id: 'conserve-o2',
          label: 'Conserve Oxygen Inside Habitat',
          description: 'Seal airlocks and save tank air for crew safety.',
          pictogram: 'p1_1a',
          sceneEffect: 'oxygen-conserve',
          tradeoffHint: 'Oxygen +8% · Energy -4%',
          deltas: { oxygen: 8, energy: -4 },
          whatHappened:
            'You postponed the extra moonwalk and checked habitat seals. Oxygen tanks climbed safely while fans used a bit of electricity.',
          whyItMatters:
            'On the Moon there is no breathable air outside. Mission planners protect life-support safety margins before optional tasks.',
          lesson: 'Always keep enough oxygen reserve before starting optional outside work.'
        },
        {
          id: 'extra-eva',
          label: 'Use Oxygen for Extra Moonwalk Activity',
          description: 'Refill spacesuits to collect extra Moon rocks outside.',
          pictogram: 'p1_1b',
          sceneEffect: 'oxygen-eva',
          tradeoffHint: 'Oxygen -16% · Energy -6%',
          deltas: { oxygen: -16, energy: -6 },
          whatHappened:
            'Your astronaut explored nearby craters and gathered samples, but spacesuit refills noticeably lowered the oxygen tanks.',
          whyItMatters:
            'Every spacewalk consumes suit oxygen and airlock power. Real missions calculate air margins carefully before opening the hatch.',
          lesson: 'Extra exploration outside costs oxygen and energy that must be replaced.'
        }
      ]
    },
    '1.2': {
      id: '1.2',
      levelId: 1,
      title: 'Challenge 1.2 — Water Management',
      narrative:
        'Water is very heavy to launch from Earth, so every drop in the outpost tanks is precious.',
      problem: 'The crew needs drinking water, wash water, and cooling water for science instruments.',
      objective: 'Choose how to manage water containers and recycling equipment.',
      sceneFocus: 'water-tank',
      astroX: 335,
      astroPose: 'pointing-left',
      vocab: {
        term: 'Water Recycling',
        definition: 'Cleaning and reusing water again and again inside a spacecraft or lunar base.'
      },
      options: [
        {
          id: 'recycle-priority',
          label: 'Conserve & Recycle Water Supply',
          description: 'Run the water recycling unit to keep containers full.',
          pictogram: 'p1_2a',
          sceneEffect: 'water-conserve',
          tradeoffHint: 'Water +8% · Energy -10%',
          deltas: { water: 8, energy: -10 },
          whatHappened:
            'You routed wash water through the recycler. Water containers stayed healthy, though cleaning pumps used extra electricity.',
          whyItMatters:
            'Space stations recycle over 90% of their water! Saving water often trades electrical energy to run filters and pumps.',
          lesson: 'Recycling water protects crew hydration, even though filters need electricity.'
        },
        {
          id: 'split-usage',
          label: 'Allocate Stored Water to Science Gear',
          description: 'Cool science equipment directly from fresh storage tanks.',
          pictogram: 'p1_2b',
          sceneEffect: 'water-allocate',
          tradeoffHint: 'Water -14% · Energy +4%',
          deltas: { water: -14, energy: 4 },
          whatHappened:
            'You saved pump electricity by drawing straight from fresh water tanks, visibly lowering your water level.',
          whyItMatters:
            'Using stored water without recycling shrinks reserves fast. Planners must watch tank levels before the next resupply.',
          lesson: 'Water saved from recycling today reduces how fast storage tanks run down.'
        }
      ]
    },
    '1.3': {
      id: '1.3',
      levelId: 1,
      title: 'Challenge 1.3 — Emergency Life Support',
      narrative:
        'An equipment alert glows on the habitat air scrubber module!',
      problem: 'Carbon dioxide filters are slowing down, and the crew needs clean air while diagnosing the unit.',
      objective: 'Choose whether to protect essential life support first or inspect and repair directly.',
      sceneFocus: 'habitat',
      astroX: 525,
      astroPose: 'pointing-left',
      vocab: {
        term: 'Life Support System',
        definition: 'Equipment that keeps air, water, and temperature safe for astronauts.'
      },
      options: [
        {
          id: 'backup-scrubber',
          label: 'Protect Essential Life Support System',
          description: 'Switch immediately to backup habitat scrubber for crew safety.',
          pictogram: 'p1_3a',
          sceneEffect: 'lifesupport-protect',
          tradeoffHint: 'Oxygen +6% · Energy -12% · Radiation Shield +4%',
          deltas: { oxygen: 6, energy: -12, radiationShield: 4 },
          whatHappened:
            'You activated the backup air scrubber right away. Habitat oxygen stabilized safely while backup fans drew battery power.',
          whyItMatters:
            'Real spacecraft include backup life-support systems ("redundancy") so one problem never puts astronauts in danger.',
          lesson: 'Backup systems keep life support safe while engineers plan repairs.'
        },
        {
          id: 'inspect-repair',
          label: 'Inspect & Repair Primary Equipment',
          description: 'Open the scrubber panel to fix the clogged valve.',
          pictogram: 'p1_3b',
          sceneEffect: 'lifesupport-repair',
          tradeoffHint: resources && resources.oxygen >= 70 ? 'Oxygen -10% · Energy +2%' : 'Oxygen -15% · Energy +2% · Water -4%',
          deltas: resources && resources.oxygen >= 70
            ? { oxygen: -10, energy: 2 }
            : { oxygen: -15, energy: 2, water: -4 },
          whatHappened:
            resources && resources.oxygen >= 70
              ? 'Because your starting oxygen reserve was strong, you repaired the primary filter cleanly with manageable air loss.'
              : 'Fixing the primary scrubber without switching to backup allowed carbon dioxide to rise and drained your tight air margin.',
          whyItMatters:
            'Inspecting primary hardware saves backup power when air margins are high, but switching to backup is safer when reserves are tight.',
          lesson: 'Check your safety margins before deciding between direct repair and backup protection.'
        }
      ]
    },
    '2.1': {
      id: '2.1',
      levelId: 2,
      title: 'Challenge 2.1 — Solar Power',
      narrative:
        'Bright sunlight hits your lunar energy station! Solar panels and battery banks work side by side.',
      problem: 'You must decide whether to focus on solar collection for immediate tasks or charge backup batteries.',
      objective: 'Balance solar generation and battery storage for the lunar outpost.',
      sceneFocus: 'solar-array',
      astroX: 255,
      astroPose: 'pointing-left',
      vocab: {
        term: 'Solar Array',
        definition: 'Large panels that capture sunlight and convert it into electrical energy.'
      },
      options: [
        {
          id: 'collect-sunlight',
          label: 'Run Solar Panels at Peak Collection',
          description: 'Power active habitat heaters and science tools right away.',
          pictogram: 'p2_1a',
          sceneEffect: 'solar-collect',
          tradeoffHint: 'Energy -10% · Food +4% · Oxygen +2%',
          deltas: { energy: -10, food: 4, oxygen: 2 },
          whatHappened:
            'Your solar array beamed power straight into habitat warmers and plant lights, boosting comfort while leaving batteries uncharged.',
          whyItMatters:
            'Spending electricity as fast as solar panels make it works during bright sun, but leaves less reserve if shadows arrive.',
          lesson: 'Direct solar power helps active systems, while batteries protect future shifts.'
        },
        {
          id: 'charge-batteries',
          label: 'Store Solar Energy in Batteries',
          description: 'Angle panels to fill battery storage for later operations.',
          pictogram: 'p2_1b',
          sceneEffect: 'battery-store',
          tradeoffHint: 'Energy +14% · Oxygen -4%',
          deltas: { energy: 14, oxygen: -4 },
          whatHappened:
            'You routed solar electricity straight into the battery bank, visibly raising stored energy bars for upcoming challenges.',
          whyItMatters:
            'On the Moon, shadows and lunar night cut off sunlight. Storing energy in batteries keeps life support running when sunlight drops.',
          lesson: 'Storing solar energy in batteries prepares the outpost for dark or busy periods.'
        }
      ]
    },
    '2.2': {
      id: '2.2',
      levelId: 2,
      title: 'Challenge 2.2 — Energy Distribution',
      narrative:
        'Multiple modules at the energy station need electricity at the same time!',
      problem: 'Both essential habitat systems and scientific lab tools are requesting power from your battery bank.',
      objective: 'Distribute your limited electrical budget between habitat survival and science.',
      sceneFocus: 'battery-bank',
      astroX: 410,
      astroPose: 'pointing-right',
      vocab: {
        term: 'Power Budget',
        definition: 'A careful plan showing how much electricity each system is allowed to use.'
      },
      options: [
        {
          id: 'essential-first',
          label: 'Send Energy to Essential Habitat Systems',
          description: 'Route power to life support, air fans, and comms first.',
          pictogram: 'p2_2a',
          sceneEffect: 'power-habitat',
          tradeoffHint: 'Energy +6% · Oxygen +4% · Radiation Shield +4%',
          deltas: { energy: 6, oxygen: 4, radiationShield: 4 },
          whatHappened:
            'Power cables lit up the life-support dome and radios smoothly while science equipment stayed on low standby.',
          whyItMatters:
            'Astronauts use strict power budgets, keeping air, water, and radios powered before optional experiments.',
          lesson: 'A smart power budget gives electricity to essential survival systems first.'
        },
        {
          id: 'science-priority',
          label: 'Send Energy to Scientific Equipment',
          description: 'Power the spectrometer and lunar rock analyzer.',
          pictogram: 'p2_2b',
          sceneEffect: 'power-science',
          tradeoffHint: 'Energy -16% · Water -4%',
          deltas: { energy: -16, water: -4 },
          whatHappened:
            'The science lab powered up brightly, but heavy instrument draw drained the battery bank and slowed water pumps.',
          whyItMatters:
            'When scientific demand exceeds available power, essential habitat equipment can run low on reserves.',
          lesson: 'Check battery levels before sending heavy electricity to science labs.'
        }
      ]
    },
    '2.3': {
      id: '2.3',
      levelId: 2,
      title: 'Challenge 2.3 — Science or Survival',
      narrative:
        'Earth scientists request a deep lunar ice-drilling experiment right now.',
      problem:
        resources && resources.energy >= 68
          ? `Your batteries are strong (${resources.energy}%), so careful science is possible—or you can build an even bigger safety buffer.`
          : `Your batteries are low (${resources ? resources.energy : 55}%), so running the heavy ice drill carries real risk!`,
      objective: 'Choose between running the lab experiment or protecting essential life-support power.',
      sceneFocus: 'science-lab',
      astroX: 590,
      astroPose: 'pointing-right',
      vocab: {
        term: 'Engineering Trade-Off',
        definition: 'Giving up a little of one goal (like extra science) to protect another goal (like crew safety).'
      },
      options: [
        {
          id: 'run-ice-drill',
          label: 'Run Laboratory Ice-Drilling Experiment',
          description: 'Use heavy electrical power to extract and test lunar ice.',
          pictogram: 'p2_3a',
          sceneEffect: 'science-drill',
          tradeoffHint: 'Energy -16% · Water +10%',
          deltas: { energy: -16, water: 10 },
          whatHappened:
            'The lab drill extracted lunar ice samples and boosted water reserves, at a steep electrical cost to the batteries.',
          whyItMatters:
            'When batteries are healthy, science missions can discover useful water ice—but doing it on low power endangers the base!',
          lesson: 'High-energy science experiments are only safe when battery reserves are strong.'
        },
        {
          id: 'safe-standby',
          label: 'Keep Essential Life-Support Equipment Protected',
          description: 'Hold the drill until solar charge is higher.',
          pictogram: 'p2_3b',
          sceneEffect: 'survival-protect',
          tradeoffHint: 'Energy +8% · Oxygen +4% · Water +4%',
          deltas: { energy: 8, oxygen: 4, water: 4 },
          whatHappened:
            'You kept the drill parked safely, letting solar panels recharge batteries and stabilize habitat air and water.',
          whyItMatters:
            'Good mission commanders check real resource numbers first; waiting for a safer power window is smart engineering.',
          lesson: 'The best choice depends on your current resources—never guess blindly.'
        }
      ]
    },
    '3.1': {
      id: '3.1',
      levelId: 3,
      title: 'Challenge 3.1 — Solar Activity',
      narrative:
        donkiInfo && donkiInfo.hasActiveEvents
          ? `NASA DONKI reports real space-weather activity (${donkiInfo.events[0].typeName} on ${donkiInfo.events[0].date}). Remember: solar flares, CMEs, SEPs, and geomagnetic storms are different!`
          : 'Your space-weather monitor watches the Sun for flares, CMEs, and particle events. In this simulation, solar activity is rising.',
      problem:
        'Not every solar event creates dangerous radiation on the Moon—crews must inspect data and prepare wisely.',
      objective: 'Examine the space-weather monitor and choose how the crew prepares.',
      sceneFocus: 'solar-monitor',
      astroX: 525,
      astroPose: 'pointing-right',
      vocab: {
        term: 'Solar Flare vs. CME vs. SEP',
        definition: 'A solar flare is a flash of energy; a CME is a slower cloud of solar plasma; an SEP event sends fast energetic particles.'
      },
      options: [
        {
          id: 'check-monitor',
          label: 'Inspect Solar Monitor & Track Sensors',
          description: 'Read NASA DONKI observations and keep crew inside on alert.',
          pictogram: 'p3_1a',
          sceneEffect: 'monitor-track',
          tradeoffHint: 'Radiation Shield +6% · Energy -6%',
          deltas: { radiationShield: 6, energy: -6 },
          whatHappened:
            'Your astronaut checked the space-weather station and local particle sensors, keeping the crew ready indoors.',
          whyItMatters:
            'NASA DONKI tracks solar events near the Sun and Earth. Combining that with local lunar sensors prevents unnecessary risk.',
          lesson: 'Monitoring real data and local sensors helps crews prepare without panic.'
        },
        {
          id: 'prepare-crew-shield',
          label: 'Prepare Crew & Seal Habitat Shielding',
          description: 'Move tools indoors and power up radiation defenses.',
          pictogram: 'p3_1b',
          sceneEffect: 'shield-prep',
          tradeoffHint: 'Radiation Shield +12% · Energy -10% · Oxygen +2%',
          deltas: { radiationShield: 12, energy: -10, oxygen: 2 },
          whatHappened:
            'You brought outdoor gear inside early and raised habitat shielding, giving strong protection at a moderate energy cost.',
          whyItMatters:
            'Unlike Earth, the Moon has no thick atmosphere or global magnetic shield to block fast solar energetic particles.',
          lesson: 'Preparing shielding early keeps lunar crews safer if solar particles arrive.'
        }
      ]
    },
    '3.2': {
      id: '3.2',
      levelId: 3,
      title: 'Challenge 3.2 — Radiation Shelter',
      narrative:
        'Space-weather conditions indicate the crew should use the reinforced radiation shelter.',
      problem: 'Moving inside the shelter protects astronauts, while reinforcing water-wall shields uses extra resources.',
      objective: 'Choose how to operate the protective lunar shelter.',
      sceneFocus: 'radiation-shelter',
      astroX: 295,
      astroPose: 'pointing-left',
      vocab: {
        term: 'Radiation Shielding',
        definition: 'Thick walls made of lunar soil (regolith) or water bags that block harmful space particles.'
      },
      options: [
        {
          id: 'enter-shelter',
          label: 'Move Astronaut Into Protected Shelter',
          description: 'Close the blast door and wait safely inside regolith walls.',
          pictogram: 'p3_2a',
          sceneEffect: 'shelter-enter',
          tradeoffHint: 'Radiation Shield +8% · Energy -6% · Oxygen -4%',
          deltas: { radiationShield: 8, energy: -6, oxygen: -4 },
          whatHappened:
            'Your astronaut stepped into the reinforced shelter and slid the thick blast door shut, safely reducing exposure.',
          whyItMatters:
            'Thick lunar regolith (soil) and shelter walls absorb incoming space particles when astronauts step inside.',
          lesson: 'Entering a protected shelter reduces radiation exposure during space-weather alerts.'
        },
        {
          id: 'boost-water-shield',
          label: 'Allocate Resources to Boost Water-Wall Shield',
          description: 'Pump water into shelter barrier panels and run extra air scrubbers.',
          pictogram: 'p3_2b',
          sceneEffect: 'shelter-boost',
          tradeoffHint: 'Radiation Shield +16% · Energy -12% · Water -6%',
          deltas: { radiationShield: 16, energy: -12, water: -6 },
          whatHappened:
            'Water-filled barrier panels surrounded the shelter walls, giving maximum protection while costing battery energy and water.',
          whyItMatters:
            'Water is rich in hydrogen, making it one of the best materials for blocking space radiation in real spacecraft designs.',
          lesson: 'Stronger active shielding improves protection, but costs energy and water.'
        }
      ]
    },
    '3.3': {
      id: '3.3',
      levelId: 3,
      title: 'Challenge 3.3 — Mission Response',
      narrative:
        'Mission Control is reviewing space-weather updates and your outpost battery level.',
      problem: 'Decide whether to hold all crew inside for maximum safety or carefully resume outdoor solar maintenance.',
      objective: 'Select the best response at the habitat mission-control station.',
      sceneFocus: 'weather-radar',
      astroX: 525,
      astroPose: 'pointing-right',
      vocab: {
        term: 'Operational Context',
        definition: 'Checking all real conditions—data, shielding, energy, and crew health—before choosing an action.'
      },
      options: [
        {
          id: 'prioritize-safety',
          label: 'Prioritize Crew Safety & Shelter Hold',
          description: 'Wait for sensor clearance before anyone goes outside.',
          pictogram: 'p3_3a',
          sceneEffect: 'safety-hold',
          tradeoffHint: 'Radiation Shield +8% · Oxygen +4% · Energy -6%',
          deltas: { radiationShield: 8, oxygen: 4, energy: -6 },
          whatHappened:
            'You kept the crew safe inside the shelter until particle sensors cleared, maintaining strong oxygen and shielding.',
          whyItMatters:
            'Real mission planners combine solar observations, local radiation monitors, and power margins before clearing moonwalks.',
          lesson: 'Real space decisions combine measurements, shelter status, and crew safety.'
        },
        {
          id: 'resume-monitored-work',
          label: 'Resume Selected Mission Work While Monitoring',
          description: 'Clean dust from solar panels briefly while watching sensors.',
          pictogram: 'p3_3b',
          sceneEffect: 'monitored-work',
          tradeoffHint: resources && resources.radiationShield >= 70 ? 'Energy +10% · Radiation Shield -10%' : 'Energy +10% · Radiation Shield -16% · Oxygen -6%',
          deltas: resources && resources.radiationShield >= 70
            ? { energy: 10, radiationShield: -10 }
            : { energy: 10, radiationShield: -16, oxygen: -6 },
          whatHappened:
            'Brushing dust off solar panels boosted electricity, though stepping outside lowered your crew’s radiation safety margin.',
          whyItMatters:
            'Gaining extra electricity is risky if shielding margins are already low. Only strong margins allow brief monitored tasks.',
          lesson: 'Crew protection always comes first when radiation shield reserves are low.'
        }
      ]
    },
    '4.1': {
      id: '4.1',
      levelId: 4,
      title: 'Challenge 4.1 — Lunar Greenhouse',
      narrative:
        'Inside the transparent greenhouse dome, trays hold tiny sprouts, young leaves, and taller crops!',
      problem: 'Growing fresh food on the Moon requires both precision watering and bright grow-lamp electricity.',
      objective: 'Choose how to support plant growth inside the lunar greenhouse.',
      sceneFocus: 'greenhouse',
      astroX: 255,
      astroPose: 'pointing-left',
      vocab: {
        term: 'Hydroponics',
        definition: 'Growing plants using nutrient-rich water and special LED lights instead of Earth soil.'
      },
      options: [
        {
          id: 'water-care-plants',
          label: 'Water & Care for Growing Plants',
          description: 'Deliver precision water droplets and nutrients to crop trays.',
          pictogram: 'p4_1a',
          sceneEffect: 'greenhouse-water',
          tradeoffHint: 'Food +12% · Water -10% · Oxygen +4%',
          deltas: { food: 12, water: -10, oxygen: 4 },
          whatHappened:
            'Roots drank up the nutrient water! Crops grew taller and released a small boost of fresh oxygen, while water tanks dropped.',
          whyItMatters:
            'NASA plant experiments on the Space Station show that careful water delivery is tricky in low gravity.',
          lesson: 'Plants give food and oxygen, but depend directly on your water reserves.'
        },
        {
          id: 'greenhouse-lighting',
          label: 'Power Greenhouse LED Lighting & Climate',
          description: 'Turn on full-spectrum grow lamps and warm air circulation.',
          pictogram: 'p4_1b',
          sceneEffect: 'greenhouse-lights',
          tradeoffHint: 'Food +14% · Energy -12% · Water -4%',
          deltas: { food: 14, energy: -12, water: -4 },
          whatHappened:
            'Purple-pink grow lamps illuminated the dome! Photosynthesis sped up crop growth using battery electricity.',
          whyItMatters:
            'Lunar nights last 14 Earth days, so greenhouses need electric LED lighting and temperature control to keep plants alive.',
          lesson: 'Growing food in space links energy, lighting, and water together.'
        }
      ]
    },
    '4.2': {
      id: '4.2',
      levelId: 4,
      title: 'Challenge 4.2 — Food Reserves',
      narrative:
        'The next supply rocket from Earth is weeks away. Look at your pantry crates and greenhouse dome.',
      problem: 'Should the crew rely on packaged stored food or harvest fresh greenhouse crops now?',
      objective: 'Balance stored rations and locally grown food for mission sustainability.',
      sceneFocus: 'food-storage',
      astroX: 390,
      astroPose: 'pointing-left',
      vocab: {
        term: 'Mission Sustainability',
        definition: 'Making food, water, and power last a long time without needing constant deliveries from Earth.'
      },
      options: [
        {
          id: 'use-stored-food',
          label: 'Use Stored Food Rations',
          description: 'Open sealed pantry crates while letting greenhouse plants mature.',
          pictogram: 'p4_2a',
          sceneEffect: 'food-stored',
          tradeoffHint: 'Food -10% · Water +4% · Energy +4%',
          deltas: { food: -10, water: 4, energy: 4 },
          whatHappened:
            'Using packaged rations saved water and electricity today, though your stored food crates noticeably shrank.',
          whyItMatters:
            'Stored food is dependable and saves water/power short term, but shrinks steadily until a supply ship arrives.',
          lesson: 'Relying only on stored food works briefly, but reduces long-term reserves.'
        },
        {
          id: 'use-local-food',
          label: 'Harvest Locally Grown Greenhouse Food',
          description: 'Serve fresh crops and replant trays for continuous harvests.',
          pictogram: 'p4_2b',
          sceneEffect: 'food-local',
          tradeoffHint: 'Food +10% · Water -6% · Energy -6%',
          deltas: { food: 10, water: -6, energy: -6 },
          whatHappened:
            'Fresh lunar greens boosted food reserves and crew morale, trading water and grow-lamp electricity.',
          whyItMatters:
            'Local food production helps crews stay healthy on long missions far from Earth, as long as water and power stay balanced.',
          lesson: 'Combining stored food and local crops makes long missions sustainable.'
        }
      ]
    },
    '4.3': {
      id: '4.3',
      levelId: 4,
      title: 'Challenge 4.3 — Communication Delay',
      narrative:
        'Your dish antenna beams a question toward Earth—but radio signals take ~2.6 seconds round-trip, and Earth teams need time to review telemetry!',
      problem:
        'Communication delay is a physical limit of distance, not a resource you spend. You must decide what to do while waiting.',
      objective: 'Act safely when Earth cannot answer immediately.',
      sceneFocus: 'antenna',
      astroX: 485,
      astroPose: 'pointing-right',
      vocab: {
        term: 'Communication Delay',
        definition: 'The time it takes radio waves traveling at light speed to cross space between Earth and an outpost.'
      },
      options: [
        {
          id: 'follow-playbook',
          label: 'Follow Established Mission Procedure',
          description: 'Use your trained crew checklist safely while Earth replies.',
          pictogram: 'p4_3a',
          sceneEffect: 'comms-procedure',
          tradeoffHint: 'Food +6% · Energy -4% · Oxygen +2%',
          deltas: { food: 6, energy: -4, oxygen: 2 },
          whatHappened:
            'Following your safe checklist stabilized the greenhouse pump before Earth’s delayed reply arrived.',
          whyItMatters:
            'Astronauts train on clear emergency procedures so they can act safely even when radio replies are delayed (up to 22 minutes each way at Mars!).',
          lesson: 'Training and safe procedures help crews operate autonomously across space.'
        },
        {
          id: 'wait-for-earth',
          label: 'Wait Safely for Earth Confirmation',
          description: 'Pause non-urgent equipment until Earth’s signal returns.',
          pictogram: 'p4_3b',
          sceneEffect: 'comms-wait',
          tradeoffHint: 'Food -6% · Energy +4%',
          deltas: { food: -6, energy: 4 },
          whatHappened:
            'You kept the system safely paused while waiting for Earth’s radio wave, saving power though plants missed a watering cycle.',
          whyItMatters:
            'When a situation is not urgent, waiting safely for Mission Control prevents mistakes—trading a little time and crop growth.',
          lesson: 'Knowing when to act by checklist vs. when to wait safely is vital in deep space.'
        }
      ]
    },
    '5.1': {
      id: '5.1',
      levelId: 5,
      title: 'Challenge 5.1 — Mission Preparation',
      narrative:
        'Welcome to full Outpost Command! Habitat, solar farm, greenhouse, shelter, antenna, landing pad, and rover all work together.',
      problem: 'Every base module needs preparation before the next lunar shift begins.',
      objective: 'Inspect all base systems and choose your opening preparation priority.',
      sceneFocus: 'habitat',
      astroX: 420,
      astroPose: 'pointing-left',
      vocab: {
        term: 'Systems Integration',
        definition: 'How oxygen, water, energy, food, and shielding all depend on one another.'
      },
      options: [
        {
          id: 'prioritize-essentials',
          label: 'Prioritize Essential Resources & Crew Safety',
          description: 'Check air seals, water recyclers, and radiation shelter first.',
          pictogram: 'p5_1a',
          sceneEffect: 'base-safety',
          tradeoffHint: 'Oxygen +6% · Water +6% · Energy -8% · Radiation Shield +6%',
          deltas: { oxygen: 6, water: 6, energy: -8, radiationShield: 6 },
          whatHappened:
            'Air, water, and shelter systems passed inspection with high readiness, trading some battery power for strong crew safety.',
          whyItMatters:
            'In a complete lunar base, every system is connected: water recycling uses electricity, and strong safety margins protect against surprises.',
          lesson: 'Whole-base readiness prepares the crew before unexpected events occur.'
        },
        {
          id: 'prioritize-science',
          label: 'Allocate Resources to Rover & Science Goals',
          description: 'Fast-charge the lunar rover and science sensors first.',
          pictogram: 'p5_1b',
          sceneEffect: 'base-science',
          tradeoffHint: 'Energy -12% · Oxygen -4% · Food -4%',
          deltas: { energy: -12, oxygen: -4, food: -4 },
          whatHappened:
            'The rover charged quickly for crater exploration, leaving batteries and habitat reserves lower before shift surprises.',
          whyItMatters:
            'Focusing only on exploration vehicles before checking core habitat systems leaves less margin if an emergency hits.',
          lesson: 'Check core survival systems before committing heavy power to rover missions.'
        }
      ]
    },
    '5.2': (() => {
      const event = selectUnexpectedEvent(attemptNumber, donkiInfo);
      return {
        id: '5.2',
        levelId: 5,
        title: 'Challenge 5.2 — Unexpected Event',
        narrative: `${event.title} (${event.sourceTag}). ${event.description}`,
        problem: `Your base plan must adapt fast! Tip: ${event.recommendedFocus}`,
        objective: 'Respond to the unexpected event while protecting connected base systems.',
        sceneFocus: event.id === 'sim-dust-solar' ? 'solar-array' : event.id === 'sim-water-valve' ? 'greenhouse' : 'radiation-shelter',
        astroX: event.id === 'sim-dust-solar' ? 175 : event.id === 'sim-water-valve' ? 280 : 540,
        astroPose: 'pointing-left',
        eventMeta: event,
        vocab: {
          term: 'Contingency Plan',
          definition: 'A backup plan astronauts practice so they can adapt fast when something unexpected happens.'
        },
        options: [
          {
            id: 'conserve-protect-core',
            label: 'Conserve Reserves & Protect Essential Systems',
            description: 'Trim optional loads so oxygen, water, and shield stay safe.',
            pictogram: 'p5_2a',
            sceneEffect: 'event-conserve',
            tradeoffHint: 'Limits event damage and preserves safety margins',
            deltas: {
              oxygen: (event.impacts.oxygen || 0) + 4,
              water: (event.impacts.water || 0) + 4,
              energy: (event.impacts.energy || 0) + 6,
              food: (event.impacts.food || 0) + 2,
              radiationShield: (event.impacts.radiationShield || 0) + 4
            },
            whatHappened:
              'By trimming non-essential power and conserving reserves, you kept every life-support meter safely above caution thresholds.',
            whyItMatters:
              'Conserving reserves prevents one localized problem from cascading into the rest of the base.',
            lesson: 'Protective conservation keeps the whole crew safe during unexpected events.'
          },
          {
            id: 'redirect-repair-system',
            label: 'Redirect Resources to Fix Affected System',
            description: 'Spend energy and crew effort to restore the damaged module fast.',
            pictogram: 'p5_2b',
            sceneEffect: 'event-redirect',
            tradeoffHint: 'Restores affected system (+10% Shield/Energy boost) at minor resource cost',
            deltas: {
              oxygen: (event.impacts.oxygen || 0) + 2,
              water: (event.impacts.water || 0) + 6,
              energy: (event.impacts.energy || 0) + 10,
              food: (event.impacts.food || 0) + 6,
              radiationShield: (event.impacts.radiationShield || 0) + 8
            },
            whatHappened:
              'You redirected power and tools directly to the affected module, repairing the issue and restoring full base operations.',
            whyItMatters:
              'When reserves are healthy enough to redirect, fixing the root cause restores long-term base performance.',
            lesson: 'Good commanders adapt their plan calmly whenever conditions change.'
          }
        ]
      };
    })(),
    '5.3': {
      id: '5.3',
      levelId: 5,
      title: 'Challenge 5.3 — Final Decision',
      narrative:
        'Your command shift is complete! Look across the entire lunar outpost as Earth requests your final strategy.',
      problem: 'Choose the long-term plan for the next lunar day-night cycle using all remaining resources.',
      objective: 'Balance crew safety, resource sustainability, and scientific discovery.',
      sceneFocus: 'rover',
      astroX: 430,
      astroPose: 'pointing-right',
      vocab: {
        term: 'Mission Sustainability',
        definition: 'Running a space base safely over months by keeping every vital resource in healthy balance.'
      },
      options: [
        {
          id: 'sustainable-command',
          label: 'Prioritize Crew Safety & Long-Term Sustainability',
          description: 'Keep all five resources balanced for the next crew shift.',
          pictogram: 'p5_3a',
          sceneEffect: 'final-sustain',
          tradeoffHint: 'Oxygen +6% · Water +6% · Energy +6% · Food +8% · Radiation Shield +6%',
          deltas: { oxygen: 6, water: 6, energy: 6, food: 8, radiationShield: 6 },
          whatHappened:
            'Every module—habitat, solar panels, greenhouse, shelter, and rover—enters the next lunar cycle healthy and balanced!',
          whyItMatters:
            'Space exploration succeeds when engineers balance human safety, careful resource math, and steady scientific curiosity.',
          lesson: 'Every resource in space is connected—thoughtful trade-offs keep astronauts safe and exploring.'
        },
        {
          id: 'balanced-science-push',
          label: 'Prioritize Science Objectives With Remaining Reserves',
          description: 'Launch a final rover survey while carefully watching tank minimums.',
          pictogram: 'p5_3b',
          sceneEffect: 'final-science',
          tradeoffHint: resources && Math.min(resources.oxygen, resources.water, resources.energy) >= 55
            ? 'Energy -10% · Oxygen -6% · Water -6% (safe because reserves are high!)'
            : 'Energy -16% · Oxygen -12% · Water -10% (risky when reserves are low!)',
          deltas: resources && Math.min(resources.oxygen, resources.water, resources.energy) >= 55
            ? { energy: -10, oxygen: -6, water: -6 }
            : { energy: -16, oxygen: -12, water: -10 },
          whatHappened:
            resources && Math.min(resources.oxygen, resources.water, resources.energy) >= 55
              ? 'Because you kept strong reserves earlier, your rover completed an extra crater survey safely without endangering the base!'
              : 'Running an ambitious science sprint with modest reserves left the next crew shift tight on air and power.',
          whyItMatters:
            'Ambitious science is awesome when earlier planning built strong safety margins—and risky when reserves are already stretched.',
          lesson: 'Smart planning earlier gives future astronauts safe room to explore.'
        }
      ]
    }
  };

  return baseChallenges[challengeId];
}
