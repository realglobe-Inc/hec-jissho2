const model = 'ReportInfo'
const formatReport = require('@self/helper/format_report')

let now = new Date()
const seed = (new Array(3 * 3)).fill(1).map((v, i) => v + i).map((i) => {
  return {
    id: i,
    report_full_id: formatReport.toReportFullId({actorKey: `qq:reporter:${i % 3 + 1}`, reportId: i % 3 + 1}),
    lat: 0,
    lng: 0,
    event: 'emergency',
    sent_at: new Date(now - i * 1000),
    info: {
      heart: 10
    }
  }
})

module.exports = {
  model, seed
}

if (!module.parent) {
  console.log(`[${model}Seed]`, JSON.stringify(seed, null, 2))
}
