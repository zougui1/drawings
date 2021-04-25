import { DrawingData } from 'drawer';

import { palette } from './palette';

export const data: DrawingData = {
  danero: {
    head: {
      shape: {
        name: 'head shape',
        zIndex: 70,
        stroke: palette.borders,
        fill: palette.danero.fur1,
      },

      beard: {
        fluff: {
          name: 'beard fluff',
          zIndex: 150,
          stroke: palette.borders,
          fill: palette.danero.fur1,
        },
        braid: {
          name: 'braid',
          zIndex: 150,
          stroke: palette.borders,
          fill: palette.danero.fur1,
        },
        tip: {
          name: 'fluff tip',
          zIndex: 150,
          stroke: palette.borders,
          fill: palette.danero.fur1,
        },
        ring: {
          name: 'ring',
          zIndex: 160,
          stroke: palette.borders,
          fill: palette.danero.fur1,
        },

        color: {
          1: {
            name: 'beard color - 1',
            zIndex: 150,
            stroke: palette.none,
            fill: palette.danero.fur1,
          },
          2: {
            name: 'beard color - 2',
            zIndex: 150,
            fill: palette.danero.fur1,
          },
        },
      },

      ear: {
        shape: {
          name: 'ear shape',
          zIndex: 100,
          stroke: palette.borders,
        },

        piercing: {
          circles: {
            bottom: {
              name: 'ear - bottom circle piercing',
              zIndex: 110,
              stroke: palette.borders,
              fill: palette.danero.metal,
            },
            top: {
              name: 'ear - top circle piercing',
              zIndex: 110,
              stroke: palette.borders,
              fill: palette.danero.metal,
            },
          },

          rings: {
            bottom: {
              name: 'ear - bottom ring piercing',
              zIndex: 110,
              stroke: palette.borders,
              fill: palette.danero.metal,
            },
            middle: {
              name: 'ear - middle ring piercing',
              zIndex: 110,
              stroke: palette.borders,
              fill: palette.danero.metal,
            },
            top: {
              name: 'ear - top ring piercing',
              zIndex: 110,
              stroke: palette.borders,
              fill: palette.danero.metal,
            },
          },

          bars: {
            top: {
              outerBar: {
                name: 'ear - top bar piercing - outer bar',
                zIndex: 110,
                stroke: palette.borders,
                fill: palette.danero.metal,
              },
              innerBar: {
                name: 'ear - top bar piercing - inner bar',
                zIndex: 110,
                stroke: palette.borders,
                fill: palette.danero.metal,
              },
              circle: {
                name: 'ear - top bar piercing - circle',
                zIndex: 115,
                stroke: palette.borders,
                fill: palette.danero.metal,
              },
            },

            bottom: {
              outerBar: {
                name: 'ear - bottom bar piercing - outer bar',
                zIndex: 110,
                stroke: palette.borders,
                fill: palette.danero.metal,
              },
              innerBar: {
                name: 'ear - bottom bar piercing - inner bar',
                zIndex: 110,
                stroke: palette.borders,
                fill: palette.danero.metal,
              },
              circle: {
                name: 'ear - bottom bar piercing - circle',
                zIndex: 115,
                stroke: palette.borders,
                fill: palette.danero.metal,
              },
            },
          },
        },
      },

      eye: {
        iris: {
          name: 'iris',
          zIndex: 150,
          stroke: palette.borders,
          fill: palette.danero.eyes.iris,
        },
        pupil: {
          name: 'pupil',
          zIndex: 150,
          stroke: palette.borders,
          fill: palette.danero.eyes.pupil,
        },
        eyebrow: {
          name: 'eyebrow',
          zIndex: 150,
          stroke: palette.borders,
          strokeWidth: 2,
        },
        top: {
          name: 'top',
          zIndex: 150,
          stroke: palette.borders,
        },
        right: {
          name: 'right',
          zIndex: 150,
          stroke: palette.borders,
        },
        'top/left': {
          name: 'top/left',
          zIndex: 150,
          stroke: palette.borders,
          strokeWidth: 0.5,
        },
        'left/bottom': {
          name: 'left/bottom',
          zIndex: 150,
          stroke: palette.borders,
          strokeWidth: 0.7,
        },

        chamber: {
          1: {
            name: 'eye chamber color - 1',
            zIndex: 150,
            fill: palette.danero.eyes.chamber,
          },
          2: {
            name: 'eye chamber color - 2',
            zIndex: 150,
            fill: palette.danero.eyes.chamber,
          },
        },
      },

      horn: {
        left: {
          1: {
            name: '1st ridge',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          2: {
            name: '2nd ridge',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          3: {
            name: '3rd ridge',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          4: {
            name: '4th ridge',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          5: {
            name: '5th ridge',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          6: {
            name: '6th ridge',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          7: {
            name: '7th ridge',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          8: {
            name: '8th ridge',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          9: {
            name: '9th ridge',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          10: {
            name: '10th ridge',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          11: {
            name: '11th ridge',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          tip: {
            name: 'tip',
            zIndex: 25,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
        },

        right: {
          1: {
            name: '1st ridge',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          2: {
            name: '2nd ridge',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          3: {
            name: '3rd ridge',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          4: {
            name: '4th ridge',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          5: {
            name: '5th ridge',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          6: {
            name: '6th ridge',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          7: {
            name: '7th ridge',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          8: {
            name: '8th ridge',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          9: {
            name: '9th ridge',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          10: {
            name: '10th ridge',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          11: {
            name: '11th ridge',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
          tip: {
            name: 'tip',
            zIndex: 65,
            stroke: palette.borders,
            fill: palette.danero.horns,
          },
        },
      },

      nose: {
        nostrils: {
          name: 'nostrils',
          zIndex: 75,
          stroke: palette.borders,
        },
        ring: {
          name: 'nose ring',
          zIndex: 80,
          stroke: palette.borders,
          fill: palette.danero.metal,
        },
      },

      underlips: {
        piercing: {
          right: {
            name: 'underlips - right piercing',
            zIndex: 110,
            stroke: palette.borders,
            fill: palette.danero.metal,
          },
          left: {
            name: 'underlips - left piercing',
            zIndex: 110,
            stroke: palette.borders,
            fill: palette.danero.metal,
          },
        },
      },

      snout: {
        scratch: {
          name: 'snout scratch',
          zIndex: 110,
          stroke: palette.borders,
          fill: palette.danero.scratches,
        },
      },

      neck: {
        spikes: {
          1: {
            name: '1st spike',
            zIndex: 35,
            stroke: palette.borders,
            fill: palette.danero.spikes,
          },
          2: {
            name: '2nd spike',
            zIndex: 35,
            stroke: palette.borders,
            fill: palette.danero.spikes,
          },
          3: {
            name: '3rd spike',
            zIndex: 35,
            stroke: palette.borders,
            fill: palette.danero.spikes,
          },
          4: {
            name: '4th spike',
            zIndex: 35,
            stroke: palette.borders,
            fill: palette.danero.spikes,
          },
          5: {
            name: '5th spike',
            zIndex: 35,
            stroke: palette.borders,
            fill: palette.danero.spikes,
          },
          6: {
            name: '6th spike',
            zIndex: 35,
            stroke: palette.borders,
            fill: palette.danero.spikes,
          },
          7: {
            name: '7th spike',
            zIndex: 35,
            stroke: palette.borders,
            fill: palette.danero.spikes,
          },
          8: {
            name: '8th spike',
            zIndex: 35,
            stroke: palette.borders,
            fill: palette.danero.spikes,
          },
          9: {
            name: '9th spike',
            zIndex: 35,
            stroke: palette.borders,
            fill: palette.danero.spikes,
          },
        },
      },

      whisker: {
        right: {
          noodle: {
            name: 'right whisker',
            zIndex: 170,
            stroke: palette.borders,
            strokeWidth: 2.3,
          },
          tip: {
            name: 'right whisker - fluff tip',
            zIndex: 170,
            stroke: palette.borders,
            fill: palette.danero.fur2,
          },
        },

        left: {
          noodle: {
            name: 'left whisker',
            zIndex: 50,
            stroke: palette.borders,
            strokeWidth: 2,
          },
          tip: {
            name: 'left whisker - fluff tip',
            zIndex: 50,
            stroke: palette.borders,
            fill: palette.danero.fur2,
          },
        },
      },
    },
  },

  arcdanis: {
    head: {
      shape: {
        name: 'head shape',
        zIndex: 70,
        stroke: palette.borders,
      },
      tongue: {
        name: 'tongue',
        zIndex: 80,
        stroke: palette.borders,
        //fill: palette.Arcdanis.skin,
      },

      ear: {
        shape: {
          inner: {
            name: 'ear - inner shape',
            zIndex: 95,
            stroke: palette.borders,
          },
          outer: {
            name: 'ear - outer shape',
            zIndex: 100,
            stroke: palette.borders,
          },
        },
      },

      horn: {
        left: {
          name: 'left horn',
          zIndex: 65,
          stroke: palette.borders,
          //fill: palette.Arcdanis.body2,
        },
      },
    },
  },
};
