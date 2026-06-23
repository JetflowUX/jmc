export const manifest = {
  screens: {
    scr_mc8pt9: { name: "Home", route: "/", position: { "x": 0, "y": 0 }, isDefaultRow: true },
    scr_s7ltc8: { name: "Showroom", route: "/#showroom", position: { "x": 160, "y": 1820 } },
    scr_94oiqi: { name: "Finance Journey", route: "/#finance", position: { "x": 1560, "y": 1820 } },
    scr_9v0lkz: { name: "Part Exchange", route: "/#part-exchange", position: { "x": 2960, "y": 1820 } },
    scr_uod11x: { name: "About JMC", route: "/#about", position: { "x": 160, "y": 3800 } },
    scr_ystmjm: { name: "Contact", route: "/#contact", position: { "x": 1560, "y": 3800 } }
  },
  sections: {
    sec_s2hpzj: { name: "Customer Services", x: 0, y: 1600, width: 4320, height: 1180 },
    sec_qr3wvr: { name: "Company Information", x: 0, y: 3580, width: 2920, height: 1180 }
  },
  layers: [
  { kind: "screen", id: "scr_mc8pt9" },
  { kind: "section", id: "sec_s2hpzj", children: [
    { kind: "screen", id: "scr_s7ltc8" },
    { kind: "screen", id: "scr_94oiqi" },
    { kind: "screen", id: "scr_9v0lkz" }]
  },
  { kind: "section", id: "sec_qr3wvr", children: [
    { kind: "screen", id: "scr_uod11x" },
    { kind: "screen", id: "scr_ystmjm" }]
  }]

};