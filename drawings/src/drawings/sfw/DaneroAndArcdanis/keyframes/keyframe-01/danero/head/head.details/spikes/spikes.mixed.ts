import { Group } from 'drawer'

import { data } from '../../../../../../data';

export const spikesMixed = (drawer: Group) => {
  //#region 1st spike
  drawer
    .path(data.danero.head.neck.spikes['1'])

    .move(600.7, 230)
    .curve(625, 220, 631, 200, 630, 171).absolute()
    .curve(610, 200, 586.3, 190).absolute()
  //#endregion

  //#region 2nd spike
  drawer
    .path(data.danero.head.neck.spikes['2'])

    .move(563, 143)
    .curve(580, 134, 615, 110, 590, 52).absolute()
    .curve(570, 110, 530, 98, 522.8, 88.64).absolute()
  //#endregion

  //#region 3rd spike
  drawer
    .path(data.danero.head.neck.spikes['3'])

    .move(460, 35.5)
    .curve(480, 18, 490, -23, 468, -58).absolute()
    .curve(460, -14, 425, 10, 410, 8).absolute()
  //#endregion

  //#region 4th spike
  drawer
    .path(data.danero.head.neck.spikes['4'])

    .move(216, -16)
    .curve(215, -40, 210, -80, 140, -95).absolute()
    .curve(180, -62, 170, -20, 140, -0.5).absolute()
  //#endregion

  //#region 5th spike
  drawer
    .path(data.danero.head.neck.spikes['5'])

    .move(70, 26.8)
    .curve(40, 0, 15, -15, -43, -8).absolute()
    .curve(10, 10, 10, 50, 2, 71.8).absolute()
  //#endregion

  //#region 6th spike
  drawer
    .path(data.danero.head.neck.spikes['6'])

    .move(-74, 152.2)
    .curve(-100, 135, -160, 130, -190, 160).absolute()
    .curve(-135, 155, -115, 200, -125.4, 228.5).absolute()
  //#endregion

  //#region 7th spike
  drawer
    .path(data.danero.head.neck.spikes['7'])

    .move(-175, 320)
    .curve(-210, 305, -260, 312, -287, 340).absolute()
    .curve(-217, 335, -200, 370, -207.32, 400).absolute()
  //#endregion

  //#region 8th spike
  drawer
    .path(data.danero.head.neck.spikes['8'])

    .move(-236, 490)
    .curve(-260, 479, -330, 480, -360, 520).absolute()
    .curve(-311, 520, -268, 522, -260.8, 585).absolute()
  //#endregion

  //#region 9th spike
  drawer
    .path(data.danero.head.neck.spikes['9'])

    .move(-293.6, 685)
    .curve(-325, 655, -400, 645, -425, 675).absolute()
    .curve(-370, 675, -335, 742, -360, 775.7).absolute()
    .curve(-308, 735).absolute()
  //#endregion
}
